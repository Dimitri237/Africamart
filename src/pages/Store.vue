
<template>
  <main class="store-page">
    <!-- HERO -->
    <section class="store-hero">
      <div class="container hero-content">
        <div class="hero-copy">
          <span class="eyebrow">
            AUTHENTIC AFRICAN MARKETPLACE
          </span>

          <h1>
            Discover the taste
            <span>of Africa.</span>
          </h1>

          <p>
            Authentic African groceries, carefully selected
            to bring tradition, freshness and quality
            closer to your home.
          </p>

          <a href="#catalogue" class="hero-button">
            Explore our products
            <span>↗</span>
          </a>
        </div>

        <div class="hero-brand">
          <img
            src="../assets/images/logos/logos.png"
            alt="Africa Mart"
          />
        </div>
      </div>
    </section>

    <!-- CATALOGUE -->
    <section id="catalogue" class="catalogue">
      <div class="container">
        <div class="section-heading">
          <div>
            <span class="section-label">
              OUR COLLECTION
            </span>

            <h2>Shop our products</h2>

            <p>
              Find your favorite African essentials.
            </p>
          </div>

          <RouterLink to="/cart" class="cart-link">
            <span>🛒</span>
            My cart
            <span class="cart-count">
              {{ cartCount }}
            </span>
          </RouterLink>
        </div>

        <div class="toolbar">
          <div class="search-box">
            <span>⌕</span>

            <input
              v-model="search"
              placeholder="Search for a product..."
              aria-label="Search products"
            />
          </div>

          <select
            v-model="stockFilter"
            aria-label="Filter products"
          >
            <option value="all">All products</option>
            <option value="available">In stock</option>
            <option value="out">Out of stock</option>
          </select>

          <select
            v-model="sortBy"
            aria-label="Sort products"
          >
            <option value="name">Name: A–Z</option>
            <option value="priceAsc">Price: Low to high</option>
            <option value="priceDesc">Price: High to low</option>
          </select>
        </div>

        <div class="results-line">
          <span>
            {{ filteredProducts.length }}
            product(s) found
          </span>

          <button
            type="button"
            class="reload-button"
            :disabled="loading"
            @click="loadProducts"
          >
            ↻ Refresh
          </button>
        </div>

        <div v-if="loading" class="status-box">
          <div class="spinner"></div>
          Loading products...
        </div>

        <div v-else-if="errorMessage" class="status-box error">
          {{ errorMessage }}
          <button @click="loadProducts">Try again</button>
        </div>

        <div
          v-else-if="!filteredProducts.length"
          class="status-box"
        >
          No products found.
        </div>

        <div v-else class="products-grid">
          <article
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="product-image">
           <span class="stock-badge" >
               Available
              </span>

              <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                loading="lazy"
              />

              <div v-else class="image-placeholder">
                📦
              </div>
            </div>

            <div class="product-content">
              <span class="product-category">
                AFRICAN GROCERY
              </span>

              <h3>{{ product.name }}</h3>

              <p>
                Authentic products selected for
                your everyday needs.
              </p>

              <div class="product-prices">
                <div>
                  <small>Unit price</small>
                  <strong>
                    {{ formatMoney(product.boxPrice) }}
                  </strong>
                </div>

                <div>
                  <small>Carton price</small>
                  <strong>
                    {{ formatMoney(product.cartonPrice) }}
                  </strong>
                </div>
              </div>

              <div class="product-footer">
                <RouterLink
                  :to="`/product/${product.id}`"
                  class="details-button"
                >
                  View details
                  <span>↗</span>
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FLOATING CART -->
    <RouterLink
      v-if="cartCount"
      to="/cart"
      class="floating-cart"
      aria-label="Open shopping cart"
    >
      🛒
      <span>{{ cartCount }}</span>
    </RouterLink>
  </main>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted
} from "vue";

import { RouterLink } from "vue-router";

import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { useCart } from "../composables/useCart";

const { cartCount } = useCart();

const products = ref([]);
const search = ref("");
const stockFilter = ref("all");
const sortBy = ref("name");
const loading = ref(true);
const errorMessage = ref("");

function getStock(product) {
  const stocks = product.stocks;

  if (stocks && typeof stocks === "object") {
    return Object.values(stocks).reduce(
      (sum, qty) => sum + (Number(qty) || 0),
      0
    );
  }

  return Number(product.stock) || 0;
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(Number(value) || 0);
}

const filteredProducts = computed(() => {
  let list = products.value.filter(product =>
    String(product.name || "")
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );

  if (stockFilter.value === "available") {
    list = list.filter(p => getStock(p) > 0);
  }

  if (stockFilter.value === "out") {
    list = list.filter(p => getStock(p) <= 0);
  }

  return [...list].sort((a, b) => {
    if (sortBy.value === "priceAsc") {
      return Number(a.boxPrice || 0) -
        Number(b.boxPrice || 0);
    }

    if (sortBy.value === "priceDesc") {
      return Number(b.boxPrice || 0) -
        Number(a.boxPrice || 0);
    }

    return String(a.name || "").localeCompare(
      String(b.name || "")
    );
  });
});

async function loadProducts() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const snapshot = await getDocs(
      collection(db, "products")
    );

    products.value = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
  } catch (error) {
    console.error(error);

    errorMessage.value =
      "Unable to load products. Please try again.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadProducts);
</script>

<style scoped>
.store-page {
  min-height: 100vh;
  background: #f8faf9;
  color: #142b23;
  font-family: Inter, Poppins, sans-serif;
}

* {
  box-sizing: border-box;
}

.container {
  width: min(1200px, 92%);
  margin: auto;
}

.store-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    125deg,
    #064e3b,
    #047857,
    #065f46
  );
  color: white;
}

.store-hero::after {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  right: -180px;
  top: -170px;
  border: 70px solid rgba(255,255,255,.04);
  border-radius: 50%;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  align-items: center;
  gap: 40px;
  min-height: 420px;
  padding: 65px 0;
}

.eyebrow,
.section-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

.eyebrow {
  color: #a7f3d0;
}

.hero-copy h1 {
  max-width: 650px;
  margin: 20px 0;
  font-size: clamp(36px, 5vw, 65px);
  line-height: 1.1;
  letter-spacing: -2px;
}

.hero-copy h1 span {
  display: block;
  color: #a7f3d0;
}

.hero-copy p {
  max-width: 490px;
  color: #d1fae5;
  line-height: 1.9;
  font-size: 14px;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
  padding: 15px 23px;
  border-radius: 11px;
  background: white;
  color: #065f46;
  text-decoration: none;
  font-weight: 800;
  font-size: 13px;
}

.hero-brand {
  display: grid;
  place-items: center;
}

.hero-brand img {
  width: min(280px, 100%);
  max-height: 290px;
  object-fit: contain;
  filter: drop-shadow(0 15px 30px rgba(0,0,0,.2));
}

.catalogue {
  padding: 75px 0 100px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}

.section-label {
  color: #059669;
}

.section-heading h2 {
  margin: 10px 0;
  font-size: clamp(27px, 4vw, 38px);
  letter-spacing: -1px;
}

.section-heading p {
  margin: 0;
  color: #81918a;
  font-size: 13px;
}

.cart-link {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  padding: 13px 18px;
  border: 1px solid #d1fae5;
  border-radius: 12px;
  background: white;
  color: #065f46;
  text-decoration: none;
  font-weight: 800;
  white-space: nowrap;
}

.cart-count {
  display: grid;
  place-items: center;
  min-width: 24px;
  height: 24px;
  padding: 0 5px;
  border-radius: 50%;
  background: #059669;
  color: white;
  font-size: 11px;
}

.toolbar {
  display: grid;
  grid-template-columns: 1fr 190px 190px;
  gap: 13px;
  margin-bottom: 19px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 17px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: white;
}

.search-box span {
  font-size: 25px;
  color: #94a3b8;
}

.search-box input,
.toolbar select {
  width: 100%;
  height: 52px;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 12px;
}

.toolbar select {
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: white;
}

.results-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: #94a3b8;
  font-size: 12px;
}

.reload-button {
  border: none;
  background: transparent;
  color: #059669;
  font-weight: 800;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.product-card {
  overflow: hidden;
  border: 1px solid #e7efea;
  border-radius: 18px;
  background: white;
  transition: transform .25s, box-shadow .25s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 35px rgba(0,0,0,.07);
}

.product-image {
  position: relative;
  display: grid;
  place-items: center;
  height: 235px;
  padding: 22px;
  background: #f0f7f2;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.stock-badge {
  position: absolute;
  z-index: 2;
  top: 13px;
  left: 13px;
  padding: 7px 10px;
  border-radius: 7px;
  background: #d1fae5;
  color: #047857;
  font-size: 10px;
  font-weight: 800;
}

.stock-badge.unavailable {
  background: #fee2e2;
  color: #b91c1c;
}

.image-placeholder {
  font-size: 65px;
}

.product-content {
  padding: 20px;
}

.product-category {
  color: #059669;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1px;
}

.product-content h3 {
  margin: 11px 0;
  font-size: 19px;
}

.product-content p {
  min-height: 45px;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.8;
}

.product-prices {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 18px 0;
  padding: 15px 0;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.product-prices > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.product-prices small {
  color: #94a3b8;
  font-size: 10px;
}

.product-prices strong {
  color: #065f46;
  font-size: 14px;
}

.details-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  border-radius: 10px;
  background: #065f46;
  color: white;
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
}

.details-button:hover {
  background: #047857;
}

.floating-cart {
  position: fixed;
  z-index: 50;
  right: 25px;
  bottom: 25px;
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #065f46;
  color: white;
  box-shadow: 0 10px 30px rgba(6,95,70,.3);
  font-size: 25px;
  text-decoration: none;
}

.floating-cart span {
  position: absolute;
  top: -5px;
  right: -5px;
  display: grid;
  place-items: center;
  min-width: 23px;
  height: 23px;
  padding: 0 5px;
  border-radius: 50%;
  background: #f97316;
  font-size: 11px;
}

.status-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 220px;
  padding: 25px;
  border-radius: 15px;
  background: white;
  color: #64748b;
  text-align: center;
}

.status-box.error {
  color: #b91c1c;
}

.status-box button {
  padding: 9px 12px;
  border: none;
  border-radius: 8px;
  background: #065f46;
  color: white;
  cursor: pointer;
}

.spinner {
  width: 23px;
  height: 23px;
  border: 3px solid #d1fae5;
  border-top-color: #059669;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1100px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 800px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-copy p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-brand img {
    width: 170px;
  }

  .toolbar {
    grid-template-columns: 1fr 1fr;
  }

  .search-box {
    grid-column: 1 / -1;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .catalogue {
    padding-top: 45px;
  }

  .section-heading {
    align-items: flex-start;
  }

  .section-heading h2 {
    font-size: 25px;
  }

  .cart-link {
    padding: 10px;
    font-size: 11px;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-image {
    height: 270px;
  }
}
</style>
