
<template>
  <main class="home-page">

    <!-- =========================
         HERO SECTION
    ========================== -->
    <section class="hero">

      <div class="hero-pattern"></div>

      <div class="container hero-grid">

        <div class="hero-content reveal">

          <div class="hero-badge">
            <span class="badge-dot"></span>
            AUTHENTIC AFRICAN MARKETPLACE
          </div>

          <span class="hero-eyebrow">
            Welcome to Africa Mart
          </span>

          <h1>
            {{ t("hero.title") }}
          </h1>

          <p class="hero-description">
            {{ t("hero.subtitle") }}
          </p>

          <div class="hero-buttons">

            <RouterLink to="/store" class="btn-primary">
              <span>🛒</span>
              {{ t("hero.store") }}
              <span class="arrow">↗</span>
            </RouterLink>

            <a href="#about" class="btn-outline">
              Discover our story
              <span>→</span>
            </a>

          </div>

          <div class="hero-features">

            <div class="hero-feature">
              <span class="feature-icon">✓</span>
              Authentic products
            </div>

            <div class="hero-feature">
              <span class="feature-icon">✓</span>
              Premium quality
            </div>

            <div class="hero-feature">
              <span class="feature-icon">✓</span>
              Easy ordering
            </div>

          </div>

        </div>

        <!-- HERO VISUAL -->
        <div class="hero-visual reveal">

          <div class="hero-glow"></div>

          <div class="hero-image-card">

            <img
              src="../assets/images/logos/logos.png"
              alt="Africa Mart"
              class="hero-logo"
            />

            <div class="hero-image-caption">
              <span>AFRICA MART</span>
              <strong>
                Bringing Africa closer to home.
              </strong>
            </div>

          </div>

          <div class="floating-tag tag-one">
            <span>🌿</span>
            <div>
              <strong>100% Authentic</strong>
              <small>African essentials</small>
            </div>
          </div>

          <div class="floating-tag tag-two">
            <span>🛍️</span>
            <div>
              <strong>Shop with ease</strong>
              <small>Simple & convenient</small>
            </div>
          </div>

        </div>

      </div>

      <div class="hero-bottom">
        <span>DISCOVER AFRICAN FLAVORS</span>
        <a href="#featured" aria-label="Scroll to products">
          ↓
        </a>
      </div>

    </section>


    <!-- =========================
         TRUST BAR
    ========================== -->
    <section class="trust-section">

      <div class="container trust-grid">

        <div class="trust-item">
          <div class="trust-icon">🌍</div>
          <div>
            <strong>Authentic Africa</strong>
            <span>Traditional African products</span>
          </div>
        </div>

        <div class="trust-item">
          <div class="trust-icon">🌿</div>
          <div>
            <strong>Premium Quality</strong>
            <span>Carefully selected essentials</span>
          </div>
        </div>

        <div class="trust-item">
          <div class="trust-icon">🛒</div>
          <div>
            <strong>Easy Shopping</strong>
            <span>Order your favorites online</span>
          </div>
        </div>

        <div class="trust-item">
          <div class="trust-icon">💚</div>
          <div>
            <strong>Made with Care</strong>
            <span>Culture, taste and tradition</span>
          </div>
        </div>

      </div>

    </section>


    <!-- =========================
         FEATURED PRODUCTS
    ========================== -->
    <section id="featured" class="featured-section">

      <div class="container">

        <div class="section-header reveal">

          <div class="section-heading">

            <span class="section-eyebrow">
              HANDPICKED FOR YOU
            </span>

            <h2>
              Discover our
              <span>products.</span>
            </h2>

            <p>
              Explore a selection of authentic African
              groceries, carefully chosen for quality,
              flavor and tradition.
            </p>

          </div>

          <RouterLink to="/store" class="view-all">
            View all products
            <span>↗</span>
          </RouterLink>

        </div>


        <!-- LOADING -->
        <div v-if="loading" class="products-loading">

          <div class="spinner"></div>

          <p>Discovering our products...</p>

        </div>


        <!-- ERROR -->
        <div v-else-if="errorMessage" class="products-empty">

          <div class="empty-icon">⚠️</div>

          <h3>Unable to load products</h3>

          <p>{{ errorMessage }}</p>

          <button class="retry-btn" @click="loadProducts">
            Try again
          </button>

        </div>


        <!-- EMPTY -->
        <div v-else-if="!featuredProducts.length" class="products-empty">

          <div class="empty-icon">📦</div>

          <h3>Our collection is coming soon</h3>

          <p>
            New products will be available shortly.
          </p>

        </div>


        <!-- PRODUCTS GRID -->
        <div v-else class="products-grid">

          <article
            v-for="product in featuredProducts"
            :key="product.id"
            class="product-card reveal"
          >

            <div class="product-image">

              <span class="product-badge">
                IN STOCK
              </span>

              <RouterLink
                :to="`/product/${product.id}`"
                class="image-link"
              >

                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  loading="lazy"
                />

                <div v-else class="product-placeholder">
                  📦
                </div>

              </RouterLink>

              <button
                class="quick-add"
                type="button"
                :disabled="!canQuickAdd(product)"
                :title="
                  canQuickAdd(product)
                    ? 'Add one unit to cart'
                    : 'Unavailable for unit purchase'
                "
                @click="quickAdd(product)"
              >
                +
              </button>

            </div>


            <div class="product-info">

              <span class="product-category">
                AFRICAN ESSENTIALS
              </span>

              <RouterLink
                :to="`/product/${product.id}`"
                class="product-title"
              >
                {{ product.name }}
              </RouterLink>

              <p class="product-description">
                {{
                  product.description ||
                  "Authentic African quality, selected with care."
                }}
              </p>

              <div class="product-bottom">

                <div class="product-price">
                  <small>From</small>

                  <strong>
                    {{ formatMoney(product.boxPrice) }}
                  </strong>

                  <span>/ unit</span>
                </div>

                <RouterLink
                  :to="`/product/${product.id}`"
                  class="product-details"
                >
                  View details ↗
                </RouterLink>

              </div>

            </div>

          </article>

        </div>


        <div
          v-if="featuredProducts.length"
          class="products-action"
        >

          <RouterLink to="/store" class="browse-button">
            Explore the full collection
            <span>→</span>
          </RouterLink>

        </div>

      </div>

    </section>


    <!-- =========================
         ABOUT / STORY
    ========================== -->
    <section id="about" class="about-section">

      <div class="container about-grid">

        <div class="about-visual reveal">

          <div class="about-image">

            <img
              src="../assets/images/logos/logos.png"
              alt="Africa Mart brand"
            />

          </div>

          <div class="about-decoration">
            <span>🌍</span>

            <div>
              <strong>Africa Mart</strong>
              <small>Rooted in tradition</small>
            </div>
          </div>

        </div>


        <div class="about-content reveal">

          <span class="section-eyebrow">
            OUR STORY
          </span>

          <h2>
            {{ t("story.title") }}
          </h2>

          <div class="about-line"></div>

          <p>
            {{ t("story.text") }}
          </p>

          <p class="about-extra">
            At Africa Mart, we believe every product
            carries a story. From traditional African
            ingredients to everyday essentials,
            our mission is to celebrate the richness
            of African culture through authentic
            products and memorable experiences.
          </p>

          <RouterLink to="/store" class="about-button">
            Explore our store
            <span>↗</span>
          </RouterLink>

        </div>

      </div>

    </section>


    <!-- =========================
         BRAND SHOWCASE
    ========================== -->
    <section class="brand-showcase">

      <div class="container showcase-grid">

        <div class="showcase-content reveal">

          <span class="showcase-eyebrow">
            YOUR AFRICAN MARKETPLACE
          </span>

          <h2>
            The flavors you love.
            <span>The quality you deserve.</span>
          </h2>

          <p>
            Authentic African groceries, traditional
            products and flavors carefully selected
            for you and your family.
          </p>

          <RouterLink to="/store" class="showcase-button">
            Shop Africa Mart
            <span>↗</span>
          </RouterLink>

        </div>

        <div class="showcase-symbol reveal">
          <img
            src="../assets/images/logos/logos.png"
            alt="Africa Mart"
          />
        </div>

      </div>

    </section>


    <!-- =========================
         OUR VALUES
    ========================== -->
    <section class="values-section">

      <div class="container">

        <div class="values-heading reveal">

          <span class="section-eyebrow">
            WHAT MAKES US DIFFERENT
          </span>

          <h2>
            More than a store.
            <span>A connection to home.</span>
          </h2>

          <p>
            We bring together quality, culture
            and exceptional customer experiences.
          </p>

        </div>


        <div class="values-grid">

          <div
            v-for="(item, index) in values"
            :key="item.title"
            class="value-card reveal"
          >

            <span class="value-number">
              0{{ index + 1 }}
            </span>

            <div class="value-icon">
              {{ item.icon }}
            </div>

            <h3>{{ item.title }}</h3>

            <p>{{ item.text }}</p>

            <div class="value-line"></div>

          </div>

        </div>

      </div>

    </section>


    <!-- =========================
         FINAL CTA
    ========================== -->
    <section class="final-cta">

      <div class="container">

        <div class="cta-content reveal">

          <span class="cta-eyebrow">
            EXPERIENCE AFRICA MART
          </span>

          <h2>
            Bring the taste of
            <span>Africa home.</span>
          </h2>

          <p>
            Discover authentic products,
            explore our collection and order
            your favorites today.
          </p>

          <RouterLink to="/store" class="cta-button">
            🛒 Start shopping
            <span>↗</span>
          </RouterLink>

        </div>

      </div>

    </section>


    <!-- =========================
         FLOATING CART
    ========================== -->
    <RouterLink
      v-if="cartCount > 0"
      to="/cart"
      class="floating-cart"
      aria-label="Open shopping cart"
    >
      🛒

      <span>{{ cartCount }}</span>
    </RouterLink>


    <!-- TOAST -->
    <Transition name="toast">
      <div
        v-if="toastMessage"
        class="toast-message"
        role="status"
      >
        <span>✓</span>
        {{ toastMessage }}
      </div>
    </Transition>

  </main>
</template>


<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick
} from "vue";

import { RouterLink } from "vue-router";

import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { useLanguage } from "../composables/useLanguage";

import { useCart } from "../composables/useCart";


// =========================
// LANGUAGE
// =========================
const { t } = useLanguage();


// =========================
// CART
// =========================
const {
  cart,
  cartCount,
  addToCart
} = useCart();


// =========================
// STATE
// =========================
const products = ref([]);

const loading = ref(true);

const errorMessage = ref("");

const toastMessage = ref("");

let toastTimer = null;

let observer = null;


// =========================
// VALUES
// =========================
const values = [
  {
    icon: "🌿",
    title: "Quality",
    text:
      "Carefully selected products, authentic ingredients and premium quality for your everyday needs."
  },
  {
    icon: "🌍",
    title: "Culture",
    text:
      "Celebrating African heritage, traditions and the flavors that connect us to our roots."
  },
  {
    icon: "💚",
    title: "Experience",
    text:
      "A simple and welcoming shopping experience, built around your needs and satisfaction."
  }
];


// =========================
// STOCK
// =========================
function getStock(product) {
  if (
    product.stocks &&
    typeof product.stocks === "object"
  ) {
    return Object.values(product.stocks).reduce(
      (sum, qty) =>
        sum + (Number(qty) || 0),
      0
    );
  }

  return Number(product.stock) || 0;
}


// =========================
// FORMAT PRICE
// =========================
function formatMoney(value) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(Number(value) || 0);
}


// =========================
// FEATURED PRODUCTS
// =========================
const featuredProducts = computed(() => {
  return products.value
    .filter(product => getStock(product) > 0)
    .sort((a, b) =>
      String(a.name || "").localeCompare(
        String(b.name || "")
      )
    )
    .slice(0, 4);
});


// =========================
// QUICK ADD VALIDATION
// =========================
function canQuickAdd(product) {
  if (!product) return false;

  const unitPrice = Number(product.boxPrice);

  const unitsPerCarton = Math.max(
    1,
    Number(product.boxesPerCarton) || 1
  );

  const availablePieces = Math.floor(
    getStock(product) * unitsPerCarton +
    0.000001
  );

  return (
    Number.isFinite(unitPrice) &&
    unitPrice > 0 &&
    availablePieces >= 1
  );
}


// =========================
// QUICK ADD
// =========================
function quickAdd(product) {
  if (!canQuickAdd(product)) {
    showToast("This product is unavailable.");
    return;
  }

  const unitsPerCarton = Math.max(
    1,
    Number(product.boxesPerCarton) || 1
  );

  const availablePieces = Math.floor(
    getStock(product) * unitsPerCarton +
    0.000001
  );

  const alreadyInCart = cart.value
    .filter(item => item.productId === product.id)
    .reduce((sum, item) => {
      return sum + (
        item.mode === "carton"
          ? item.quantity * unitsPerCarton
          : item.quantity
      );
    }, 0);

  if (alreadyInCart + 1 > availablePieces) {
    showToast(
      "The requested quantity exceeds available stock."
    );
    return;
  }

  try {
    addToCart(product, "unit", 1);

    showToast(
      `${product.name} added to cart!`
    );
  } catch (error) {
    showToast(
      error.message || "Unable to add product."
    );
  }
}


// =========================
// TOAST
// =========================
function showToast(message) {
  toastMessage.value = message;

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toastMessage.value = "";
  }, 3000);
}


// =========================
// FIREBASE PRODUCTS
// =========================
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

    await nextTick();

    observeElements();

  } catch (error) {
    console.error(
      "Error loading Africa Mart products:",
      error
    );

    errorMessage.value =
      "Please check your connection and try again.";

  } finally {
    loading.value = false;
  }
}


// =========================
// SCROLL ANIMATIONS
// =========================
function observeElements() {
  if (typeof IntersectionObserver === "undefined") {
    document
      .querySelectorAll(".home-page .reveal")
      .forEach(element => {
        element.classList.add("show");
      });

    return;
  }

  if (!observer) {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px 40px 0px"
      }
    );
  }

  document
    .querySelectorAll(".home-page .reveal:not(.show)")
    .forEach(element => {
      observer.observe(element);
    });
}


// =========================
// LIFECYCLE
// =========================
onMounted(async () => {
  await nextTick();

  observeElements();

  await loadProducts();
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (toastTimer) {
    clearTimeout(toastTimer);
  }
});
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap");


/* =========================
   GLOBAL
========================= */
* {
  box-sizing: border-box;
}

.home-page {
  --green-dark: #064e3b;
  --green: #065f46;
  --green-medium: #047857;
  --green-light: #059669;
  --mint: #d1fae5;
  --text: #152e24;
  --muted: #718579;

  min-height: 100vh;
  overflow-x: hidden;
  background: #fff;
  color: var(--text);
  font-family: "DM Sans", sans-serif;
}

.container {
  width: min(1200px, 92%);
  margin: 0 auto;
}

h1,
h2,
h3 {
  font-family: "Outfit", sans-serif;
}

a {
  text-decoration: none;
}

button {
  font-family: inherit;
}


/* =========================
   HERO
========================= */
.hero {
  position: relative;
  overflow: hidden;
  min-height: 660px;
  background:
    radial-gradient(
      circle at 78% 40%,
      rgba(52, 211, 153, .22),
      transparent 35%
    ),
    linear-gradient(
      125deg,
      #022c22 0%,
      #064e3b 48%,
      #047857 100%
    );
  color: white;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .25;
  background-image:
    radial-gradient(
      rgba(255,255,255,.12) 1px,
      transparent 1px
    );
  background-size: 26px 26px;
}

.hero-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: 65px;
  min-height: 620px;
  padding: 85px 0 95px;
}

.hero-content {
  max-width: 660px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border: 1px solid rgba(167,243,208,.25);
  border-radius: 50px;
  background: rgba(255,255,255,.07);
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6ee7b7;
  box-shadow: 0 0 0 5px rgba(110,231,183,.1);
}

.hero-eyebrow {
  display: block;
  margin-top: 35px;
  color: #a7f3d0;
  font-size: 16px;
  font-weight: 700;
}

.hero h1 {
  margin: 18px 0 22px;
  font-size: clamp(42px, 5.4vw, 75px);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -2.5px;
}

.hero-description {
  max-width: 550px;
  color: #d1fae5;
  font-size: 16px;
  line-height: 1.95;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 35px;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  min-height: 54px;
  padding: 0 25px;
  border-radius: 11px;
  font-size: 13px;
  font-weight: 800;
  transition: .3s;
}

.btn-primary {
  background: white;
  color: #065f46;
  box-shadow: 0 12px 30px rgba(0,0,0,.1);
}

.btn-primary:hover {
  transform: translateY(-4px);
  background: #d1fae5;
}

.btn-outline {
  border: 1px solid rgba(255,255,255,.35);
  color: white;
}

.btn-outline:hover {
  background: rgba(255,255,255,.1);
  transform: translateY(-4px);
}

.arrow {
  font-size: 18px;
}

.hero-features {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 45px;
}

.hero-feature {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #d1fae5;
  font-size: 11px;
  font-weight: 600;
}

.feature-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(110,231,183,.2);
  color: #a7f3d0;
  font-size: 11px;
}


/* HERO VISUAL */
.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 440px;
}

.hero-glow {
  position: absolute;
  width: 430px;
  height: 430px;
  max-width: 100%;
  border-radius: 50%;
  background: rgba(110,231,183,.13);
  filter: blur(30px);
}

.hero-image-card {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  min-height: 390px;
  padding: 35px;
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 32px;
  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.16),
      rgba(255,255,255,.05)
    );
  box-shadow: 0 30px 60px rgba(0,0,0,.16);
  backdrop-filter: blur(15px);
  transform: rotate(-4deg);
}

.hero-logo {
  width: min(230px, 90%);
  height: 230px;
  object-fit: contain;
  filter: drop-shadow(0 12px 20px rgba(0,0,0,.15));
}

.hero-image-caption {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
  text-align: center;
}

.hero-image-caption span {
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 3px;
}

.hero-image-caption strong {
  color: white;
  font-size: 14px;
}

.floating-tag {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 17px;
  border-radius: 13px;
  background: white;
  color: #064e3b;
  box-shadow: 0 15px 35px rgba(0,0,0,.16);
}

.floating-tag > span {
  font-size: 26px;
}

.floating-tag div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.floating-tag strong {
  font-size: 12px;
}

.floating-tag small {
  color: #94a3b8;
  font-size: 10px;
}

.tag-one {
  top: 60px;
  right: -10px;
  animation: float 5s ease-in-out infinite;
}

.tag-two {
  bottom: 40px;
  left: -20px;
  animation: float 6s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.hero-bottom {
  position: absolute;
  z-index: 3;
  bottom: 25px;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 20px;
  transform: translateX(-50%);
  white-space: nowrap;
}

.hero-bottom span {
  color: #a7f3d0;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 2px;
}

.hero-bottom a {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255,255,255,.3);
  border-radius: 50%;
  color: white;
}


/* =========================
   TRUST BAR
========================= */
.trust-section {
  border-bottom: 1px solid #edf2ef;
  background: white;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  padding: 28px 0;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 13px;
}

.trust-icon {
  display: grid;
  place-items: center;
  width: 45px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #ecfdf5;
  font-size: 21px;
}

.trust-item > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.trust-item strong {
  font-size: 12px;
}

.trust-item span {
  color: #94a3b8;
  font-size: 10px;
}


/* =========================
   SECTIONS
========================= */
.section-eyebrow {
  color: #059669;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
}

.section-heading h2,
.about-content h2,
.values-heading h2 {
  margin: 15px 0;
  font-size: clamp(32px, 4vw, 49px);
  line-height: 1.15;
  letter-spacing: -1.5px;
}

.section-heading h2 span,
.values-heading h2 span {
  color: #059669;
}

.section-heading p,
.values-heading p {
  max-width: 570px;
  color: #718579;
  font-size: 14px;
  line-height: 1.9;
}


/* =========================
   FEATURED PRODUCTS
========================= */
.featured-section {
  padding: 105px 0;
  background: #f8faf9;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 38px;
}

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 13px 18px;
  border: 1px solid #d1e8db;
  border-radius: 10px;
  background: white;
  color: #065f46;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.view-all:hover {
  border-color: #059669;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.product-card {
  overflow: hidden;
  border: 1px solid #e7efe9;
  border-radius: 18px;
  background: white;
  transition: transform .3s, box-shadow .3s;
}

.product-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 20px 40px rgba(6,78,59,.09);
}

.product-image {
  position: relative;
  height: 240px;
  background: #edf7f0;
}

.image-link {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.image-link img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform .4s;
}

.product-card:hover .image-link img {
  transform: scale(1.06);
}

.product-placeholder {
  font-size: 60px;
}

.product-badge {
  position: absolute;
  z-index: 2;
  top: 13px;
  left: 13px;
  padding: 8px 10px;
  border-radius: 7px;
  background: #d1fae5;
  color: #047857;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .5px;
}

.quick-add {
  position: absolute;
  z-index: 3;
  right: 13px;
  bottom: 13px;
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  border: none;
  border-radius: 12px;
  background: #065f46;
  color: white;
  font-size: 25px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(6,95,70,.2);
  transition: .25s;
}

.quick-add:hover {
  transform: scale(1.08);
  background: #059669;
}

.quick-add:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.product-info {
  padding: 22px;
}

.product-category {
  color: #059669;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1.2px;
}

.product-title {
  display: block;
  margin: 10px 0;
  color: #152e24;
  font-family: "Outfit", sans-serif;
  font-size: 19px;
  font-weight: 800;
}

.product-title:hover {
  color: #059669;
}

.product-description {
  display: -webkit-box;
  min-height: 43px;
  overflow: hidden;
  color: #81938a;
  font-size: 12px;
  line-height: 1.8;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
  padding-top: 17px;
  border-top: 1px solid #edf2ef;
}

.product-price {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-price small,
.product-price span {
  color: #94a3b8;
  font-size: 10px;
}

.product-price strong {
  color: #065f46;
  font-size: 20px;
}

.product-details {
  color: #059669;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.products-action {
  margin-top: 45px;
  text-align: center;
}

.browse-button {
  display: inline-flex;
  align-items: center;
  gap: 22px;
  padding: 16px 25px;
  border-radius: 11px;
  background: #065f46;
  color: white;
  font-size: 12px;
  font-weight: 800;
}

.browse-button:hover {
  background: #047857;
}

.products-loading,
.products-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-height: 280px;
  padding: 30px;
  border: 1px solid #e5ede8;
  border-radius: 18px;
  background: white;
  text-align: center;
}

.products-loading p,
.products-empty p {
  color: #94a3b8;
  font-size: 13px;
}

.empty-icon {
  font-size: 45px;
}

.spinner {
  width: 35px;
  height: 35px;
  border: 3px solid #d1fae5;
  border-top-color: #059669;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: #065f46;
  color: white;
  cursor: pointer;
}


/* =========================
   ABOUT
========================= */
.about-section {
  padding: 120px 0;
  background: white;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 90px;
}

.about-visual {
  position: relative;
  padding: 25px 35px 35px 15px;
}

.about-image {
  display: grid;
  place-items: center;
  min-height: 430px;
  padding: 50px;
  border-radius: 25px;
  background:
    radial-gradient(
      circle at center,
      rgba(167,243,208,.18),
      transparent 60%
    ),
    linear-gradient(135deg, #064e3b, #047857);
}

.about-image img {
  width: min(300px, 100%);
  max-height: 300px;
  object-fit: contain;
  filter: drop-shadow(0 12px 25px rgba(0,0,0,.2));
}

.about-decoration {
  position: absolute;
  right: 0;
  bottom: 5px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 15px 40px rgba(0,0,0,.1);
}

.about-decoration > span {
  font-size: 32px;
}

.about-decoration div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.about-decoration strong {
  color: #065f46;
  font-size: 14px;
}

.about-decoration small {
  color: #94a3b8;
  font-size: 11px;
}

.about-content h2 {
  margin-top: 18px;
}

.about-line {
  width: 60px;
  height: 4px;
  margin: 25px 0;
  border-radius: 5px;
  background: #059669;
}

.about-content p {
  color: #718579;
  font-size: 15px;
  line-height: 2;
}

.about-extra {
  margin-top: 20px;
}

.about-button {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
  padding: 16px 24px;
  border-radius: 10px;
  background: #065f46;
  color: white;
  font-size: 12px;
  font-weight: 800;
}


/* =========================
   SHOWCASE
========================= */
.brand-showcase {
  overflow: hidden;
  padding: 90px 0;
  background:
    radial-gradient(
      circle at 85% 50%,
      rgba(110,231,183,.18),
      transparent 40%
    ),
    #064e3b;
  color: white;
}

.showcase-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  align-items: center;
  gap: 60px;
}

.showcase-eyebrow {
  color: #a7f3d0;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
}

.showcase-content h2 {
  max-width: 700px;
  margin: 18px 0;
  font-size: clamp(33px, 4vw, 52px);
  line-height: 1.15;
  letter-spacing: -1px;
}

.showcase-content h2 span {
  display: block;
  color: #a7f3d0;
}

.showcase-content p {
  max-width: 560px;
  color: #d1fae5;
  font-size: 14px;
  line-height: 1.9;
}

.showcase-button {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
  padding: 16px 24px;
  border-radius: 10px;
  background: white;
  color: #065f46;
  font-size: 12px;
  font-weight: 800;
}

.showcase-symbol {
  display: grid;
  place-items: center;
  min-height: 280px;
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 25px;
  background: rgba(255,255,255,.05);
}

.showcase-symbol img {
  width: 220px;
  max-width: 80%;
  height: 220px;
  object-fit: contain;
}


/* =========================
   VALUES
========================= */
.values-section {
  padding: 115px 0;
  background: #f8faf9;
}

.values-heading {
  max-width: 700px;
  margin: 0 auto 50px;
  text-align: center;
}

.values-heading p {
  margin-left: auto;
  margin-right: auto;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.value-card {
  position: relative;
  overflow: hidden;
  min-height: 290px;
  padding: 35px;
  border: 1px solid #e7efe9;
  border-radius: 20px;
  background: white;
  transition: transform .3s, box-shadow .3s;
}

.value-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 35px rgba(6,78,59,.07);
}

.value-number {
  position: absolute;
  top: 27px;
  right: 28px;
  color: #dcece3;
  font-family: "Outfit", sans-serif;
  font-size: 37px;
  font-weight: 900;
}

.value-icon {
  display: grid;
  place-items: center;
  width: 65px;
  height: 65px;
  border-radius: 17px;
  background: #ecfdf5;
  font-size: 30px;
}

.value-card h3 {
  margin: 25px 0 10px;
  font-size: 23px;
}

.value-card p {
  color: #81938a;
  font-size: 13px;
  line-height: 1.9;
}

.value-line {
  width: 40px;
  height: 3px;
  margin-top: 22px;
  border-radius: 3px;
  background: #059669;
}


/* =========================
   FINAL CTA
========================= */
.final-cta {
  position: relative;
  overflow: hidden;
  padding: 100px 20px;
  background:
    radial-gradient(
      circle at center,
      rgba(167,243,208,.15),
      transparent 55%
    ),
    linear-gradient(135deg, #065f46, #022c22);
  color: white;
}

.cta-content {
  max-width: 730px;
  margin: auto;
  text-align: center;
}

.cta-eyebrow {
  color: #a7f3d0;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
}

.cta-content h2 {
  margin: 20px 0;
  font-size: clamp(37px, 5vw, 60px);
  line-height: 1.15;
}

.cta-content h2 span {
  display: block;
  color: #a7f3d0;
}

.cta-content p {
  max-width: 560px;
  margin: 0 auto;
  color: #d1fae5;
  font-size: 15px;
  line-height: 1.9;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 17px 28px;
  border-radius: 12px;
  background: white;
  color: #065f46;
  font-size: 13px;
  font-weight: 800;
}

.cta-button:hover {
  background: #d1fae5;
}


/* =========================
   FLOATING CART
========================= */
.floating-cart {
  position: fixed;
  z-index: 50;
  right: 25px;
  bottom: 25px;
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #065f46;
  color: white;
  box-shadow: 0 12px 30px rgba(6,95,70,.3);
  font-size: 25px;
}

.floating-cart > span {
  position: absolute;
  top: -5px;
  right: -5px;
  display: grid;
  place-items: center;
  min-width: 24px;
  height: 24px;
  padding: 0 5px;
  border-radius: 50%;
  background: #f97316;
  font-size: 11px;
  font-weight: 800;
}


/* =========================
   TOAST
========================= */
.toast-message {
  position: fixed;
  z-index: 100;
  right: 25px;
  bottom: 100px;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: min(360px, 90vw);
  padding: 16px 20px;
  border-radius: 12px;
  background: #064e3b;
  color: white;
  box-shadow: 0 15px 35px rgba(0,0,0,.2);
  font-size: 12px;
  font-weight: 700;
}

.toast-message span {
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(255,255,255,.15);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity .3s, transform .3s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(15px);
}


/* =========================
   SCROLL ANIMATIONS
========================= */
.reveal {
  opacity: 0;
  transform: translateY(35px);
  transition:
    opacity .8s ease,
    transform .8s ease;
}

.reveal.show {
  opacity: 1;
  transform: translateY(0);
}


/* =========================
   RESPONSIVE
========================= */
@media (max-width: 1100px) {
  .hero-grid {
    gap: 35px;
  }

  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .trust-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-grid {
    gap: 45px;
  }
}

@media (max-width: 850px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 35px;
    padding: 75px 0 100px;
  }

  .hero-content {
    max-width: 100%;
    text-align: center;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons,
  .hero-features {
    justify-content: center;
  }

  .hero-visual {
    min-height: 350px;
  }

  .hero-image-card {
    width: min(350px, 80%);
    min-height: 310px;
  }

  .hero-logo {
    width: 170px;
    height: 170px;
  }

  .tag-one {
    right: 5%;
  }

  .tag-two {
    left: 5%;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-visual {
    max-width: 550px;
    margin: auto;
  }

  .showcase-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .showcase-content p {
    margin-left: auto;
    margin-right: auto;
  }

  .showcase-symbol {
    min-height: 230px;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .value-card {
    min-height: auto;
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: auto;
  }

  .hero-grid {
    padding: 65px 0 100px;
  }

  .hero h1 {
    font-size: 42px;
    letter-spacing: -1.5px;
  }

  .hero-description {
    font-size: 14px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn-primary,
  .btn-outline {
    width: 100%;
  }

  .hero-features {
    gap: 12px;
  }

  .hero-feature {
    font-size: 10px;
  }

  .hero-visual {
    min-height: 300px;
  }

  .hero-image-card {
    min-height: 270px;
    padding: 20px;
  }

  .hero-logo {
    width: 140px;
    height: 140px;
  }

  .floating-tag {
    padding: 10px;
  }

  .floating-tag > span {
    font-size: 20px;
  }

  .floating-tag strong {
    font-size: 10px;
  }

  .floating-tag small {
    font-size: 9px;
  }

  .tag-one {
    top: 30px;
    right: 0;
  }

  .tag-two {
    bottom: 10px;
    left: 0;
  }

  .trust-grid {
    gap: 20px;
    padding: 25px 0;
  }

  .trust-item {
    align-items: flex-start;
    gap: 9px;
  }

  .trust-icon {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .trust-item strong {
    font-size: 10px;
  }

  .trust-item span {
    font-size: 9px;
  }

  .featured-section,
  .about-section,
  .values-section {
    padding: 70px 0;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-image {
    height: 280px;
  }

  .about-visual {
    padding: 0 15px 20px 0;
  }

  .about-image {
    min-height: 310px;
    padding: 25px;
  }

  .about-image img {
    width: 190px;
  }

  .about-decoration {
    padding: 12px;
  }

  .brand-showcase {
    padding: 70px 0;
  }

  .showcase-symbol img {
    width: 160px;
    height: 160px;
  }

  .final-cta {
    padding: 80px 15px;
  }

  .floating-cart {
    right: 15px;
    bottom: 15px;
    width: 55px;
    height: 55px;
  }

  .toast-message {
    right: 15px;
    bottom: 85px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .floating-tag {
    animation: none;
  }
}
</style>
