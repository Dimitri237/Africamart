
<template>
  <main class="gallery-page">

    <!-- HERO -->
    <section class="gallery-hero">
      <div class="hero-decoration decoration-one"></div>
      <div class="hero-decoration decoration-two"></div>

      <div class="container hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          THE AFRICA MART COLLECTION
        </div>

        <h1>
          Explore our
          <span>Gallery.</span>
        </h1>

        <p>
          Discover the authentic products, beautiful colors
          and African traditions that make our collection special.
        </p>

        <div class="hero-actions">
          <a href="#gallery-collection" class="primary-btn">
            Explore gallery
            <span>↓</span>
          </a>

          <RouterLink to="/store" class="outline-btn">
            Shop our products
            <span>↗</span>
          </RouterLink>
        </div>

        <div class="hero-stats">
          <div>
            <strong>{{ images.length }}</strong>
            <span>Product photos</span>
          </div>

          <div class="stat-divider"></div>

          <div>
            <strong>{{ categories.length - 1 }}</strong>
            <span>Collections</span>
          </div>

          <div class="stat-divider"></div>

          <div>
            <strong>100%</strong>
            <span>African inspiration</span>
          </div>
        </div>
      </div>
    </section>


    <!-- INTRO -->
    <section class="gallery-intro">
      <div class="container intro-content">
        <span class="section-label">A WORLD OF AFRICAN FLAVORS</span>

        <h2>
          Every product has
          <span>a story to tell.</span>
        </h2>

        <p>
          Browse our collection and discover the richness,
          authenticity and beauty of African essentials.
        </p>
      </div>
    </section>


    <!-- GALLERY -->
    <section id="gallery-collection" class="gallery-section">
      <div class="container">

        <div class="gallery-heading">
          <div>
            <span class="section-label">OUR COLLECTION</span>
            <h2>Discover the collection</h2>
            <p>Explore products available at Africa Mart.</p>
          </div>

          <div class="gallery-count" v-if="!loading">
            <span class="count-dot"></span>
            {{ filteredImages.length }} photos
          </div>
        </div>


        <!-- FILTERS -->
        <div class="gallery-toolbar">

          <div class="filters">
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              class="filter-btn"
              :class="{ active: selectedCategory === category }"
              @click="changeCategory(category)"
            >
              {{ category }}
            </button>
          </div>

          <div class="search-box">
            <svg
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              v-model="search"
              type="search"
              placeholder="Search products..."
              aria-label="Search gallery products"
            />
          </div>
        </div>


        <!-- LOADING -->
        <div v-if="loading" class="gallery-grid">
          <div
            v-for="n in 6"
            :key="n"
            class="skeleton-card"
          >
            <div class="skeleton-image"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>


        <!-- ERROR -->
        <div v-else-if="errorMessage" class="empty-state">
          <div class="empty-icon">⚠️</div>
          <h3>Unable to load the gallery</h3>
          <p>{{ errorMessage }}</p>

          <button class="reset-btn" @click="loadGallery">
            Try again
          </button>
        </div>


        <!-- EMPTY -->
        <div v-else-if="!filteredImages.length" class="empty-state">
          <div class="empty-icon">🖼️</div>

          <h3>No photos found</h3>

          <p>
            {{
              images.length
                ? "Try another search or category."
                : "Our product gallery will be available soon."
            }}
          </p>

          <button
            v-if="images.length"
            class="reset-btn"
            @click="resetFilters"
          >
            Clear filters
          </button>
        </div>


        <!-- GRID -->
        <div v-else class="gallery-grid">

          <article
            v-for="(item, index) in visibleImages"
            :key="item.id"
            class="gallery-card"
          >

            <button
              class="image-button"
              type="button"
              :aria-label="`View ${item.name}`"
              @click="openLightbox(item)"
            >
              <div class="image-wrapper">
                <img
                  :src="item.image"
                  :alt="item.name"
                  loading="lazy"
                />

                <div class="image-overlay">
                  <span class="zoom-icon">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-4-4M11 8v6M8 11h6" />
                    </svg>
                  </span>

                  <span class="overlay-text">
                    View photo
                  </span>
                </div>
              </div>
            </button>

            <div class="card-content">
              <div class="card-meta">
                <span class="category-label">
                  {{ item.category }}
                </span>

                <span class="photo-number">
                  {{ String(index + 1).padStart(2, "0") }}
                </span>
              </div>

              <h3>{{ item.name }}</h3>

              <p>
                {{ item.description || "Authentic African product." }}
              </p>

              <div class="card-footer">
                <strong v-if="item.price > 0">
                  {{ formatMoney(item.price) }}
                </strong>

                <span v-else class="price-unavailable">
                  See details
                </span>

                <RouterLink
                  :to="`/product/${item.productId}`"
                  class="product-link"
                >
                  View product
                  <span>↗</span>
                </RouterLink>
              </div>
            </div>

          </article>

        </div>


        <!-- LOAD MORE -->
        <div
          v-if="!loading && !errorMessage && hasMore"
          class="load-more-wrapper"
        >
          <button
            type="button"
            class="load-more-btn"
            @click="loadMore"
          >
            Load more photos
            <span>↓</span>
          </button>

          <p>
            Showing {{ visibleImages.length }} of
            {{ filteredImages.length }} photos
          </p>
        </div>

      </div>
    </section>


    <!-- BRAND CTA -->
    <section class="gallery-cta">
      <div class="container">
        <div class="cta-content">
          <span class="cta-label">DISCOVER AFRICA MART</span>

          <h2>
            Inspired by Africa.
            <span>Made for your home.</span>
          </h2>

          <p>
            Explore our authentic African products
            and find your next favorite.
          </p>

          <RouterLink to="/store" class="cta-btn">
            🛒 Shop the collection
            <span>↗</span>
          </RouterLink>
        </div>
      </div>
    </section>


    <!-- LIGHTBOX -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="selectedImage"
          class="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          :aria-label="`Photo of ${selectedImage.name}`"
          @click.self="closeLightbox"
        >
          <button
            type="button"
            class="lightbox-close"
            aria-label="Close gallery"
            @click="closeLightbox"
          >
            ✕
          </button>

          <button
            v-if="filteredImages.length > 1"
            type="button"
            class="lightbox-arrow prev"
            aria-label="Previous image"
            @click="previousImage"
          >
            ‹
          </button>

          <div class="lightbox-content">
            <div class="lightbox-image-wrapper">
              <img
                :src="selectedImage.image"
                :alt="selectedImage.name"
              />
            </div>

            <div class="lightbox-info">
              <div>
                <span class="lightbox-category">
                  {{ selectedImage.category }}
                </span>

                <h3>{{ selectedImage.name }}</h3>

                <p v-if="selectedImage.description">
                  {{ selectedImage.description }}
                </p>
              </div>

              <RouterLink
                :to="`/product/${selectedImage.productId}`"
                class="lightbox-product-btn"
                @click="closeLightbox"
              >
                View product
                <span>↗</span>
              </RouterLink>
            </div>

            <div class="lightbox-counter">
              {{ selectedIndex + 1 }} /
              {{ filteredImages.length }}
            </div>
          </div>

          <button
            v-if="filteredImages.length > 1"
            type="button"
            class="lightbox-arrow next"
            aria-label="Next image"
            @click="nextImage"
          >
            ›
          </button>
        </div>
      </Transition>
    </Teleport>

  </main>
</template>


<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch
} from "vue";

import { RouterLink } from "vue-router";

import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";


// ============================
// STATE
// ============================
const images = ref([]);
const loading = ref(true);
const errorMessage = ref("");

const selectedCategory = ref("All");
const search = ref("");

const visibleCount = ref(9);
const selectedImage = ref(null);


// ============================
// PRICE FORMAT
// ============================
function formatMoney(amount) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(Number(amount) || 0);
}


// ============================
// CATEGORY
// ============================
const categories = computed(() => {
  const values = images.value
    .map(item => item.category)
    .filter(Boolean);

  return [
    "All",
    ...new Set(values)
  ];
});


// ============================
// FILTER
// ============================
const filteredImages = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase();

  return images.value.filter(item => {
    const matchCategory =
      selectedCategory.value === "All" ||
      item.category === selectedCategory.value;

    const matchSearch =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });
});


// ============================
// PAGINATION
// ============================
const visibleImages = computed(() => {
  return filteredImages.value.slice(
    0,
    visibleCount.value
  );
});

const hasMore = computed(() => {
  return visibleCount.value < filteredImages.value.length;
});

function loadMore() {
  visibleCount.value += 9;
}

function changeCategory(category) {
  selectedCategory.value = category;
}

function resetFilters() {
  search.value = "";
  selectedCategory.value = "All";
  visibleCount.value = 9;
}

watch(
  [selectedCategory, search],
  () => {
    visibleCount.value = 9;
  }
);


// ============================
// FIREBASE
// ============================
async function loadGallery() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const snapshot = await getDocs(
      collection(db, "products")
    );

    images.value = snapshot.docs
      .map(document => {
        const product = document.data();

        return {
          id: document.id,
          productId: document.id,
          name: product.name || "African Product",
          description: product.description || "",
          category: product.category || "African Essentials",
          image: product.image || "",
          price: Number(product.boxPrice) || 0
        };
      })
      .filter(item => item.image)
      .sort((a, b) =>
        a.name.localeCompare(b.name)
      );

  } catch (error) {
    console.error(
      "Error loading gallery:",
      error
    );

    errorMessage.value =
      "Please check your internet connection and try again.";
  } finally {
    loading.value = false;
  }
}


// ============================
// LIGHTBOX
// ============================
const selectedIndex = computed(() => {
  if (!selectedImage.value) return -1;

  return filteredImages.value.findIndex(
    item => item.id === selectedImage.value.id
  );
});

function openLightbox(item) {
  selectedImage.value = item;
}

function closeLightbox() {
  selectedImage.value = null;
}

function nextImage() {
  if (!filteredImages.value.length) return;

  const index = selectedIndex.value;
  const next = (index + 1) % filteredImages.value.length;

  selectedImage.value = filteredImages.value[next];
}

function previousImage() {
  if (!filteredImages.value.length) return;

  const index = selectedIndex.value;
  const previous =
    (index - 1 + filteredImages.value.length) %
    filteredImages.value.length;

  selectedImage.value = filteredImages.value[previous];
}

function handleKeydown(event) {
  if (!selectedImage.value) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    previousImage();
  }
}


// ============================
// PREVENT BACKGROUND SCROLL
// ============================
watch(selectedImage, value => {
  document.body.style.overflow = value ? "hidden" : "";
});


// ============================
// LIFECYCLE
// ============================
onMounted(() => {
  loadGallery();

  window.addEventListener(
    "keydown",
    handleKeydown
  );
});

onBeforeUnmount(() => {
  window.removeEventListener(
    "keydown",
    handleKeydown
  );

  document.body.style.overflow = "";
});
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap");

* {
  box-sizing: border-box;
}

.gallery-page {
  --green: #065f46;
  --green-dark: #022c22;
  --green-light: #059669;
  --text: #172d23;
  --muted: #789085;

  min-height: 100vh;
  background: white;
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

button,
input {
  font-family: inherit;
}


/* ============================
   HERO
============================ */
.gallery-hero {
  position: relative;
  overflow: hidden;
  padding: 115px 0 100px;
  background:
    radial-gradient(
      circle at 75% 20%,
      rgba(52, 211, 153, .18),
      transparent 35%
    ),
    linear-gradient(
      125deg,
      #022c22,
      #064e3b 60%,
      #047857
    );
  color: white;
}

.hero-decoration {
  position: absolute;
  width: 420px;
  height: 420px;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 50%;
  pointer-events: none;
}

.decoration-one {
  top: -180px;
  right: -100px;
}

.decoration-two {
  bottom: -300px;
  left: -150px;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 850px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 17px;
  border: 1px solid rgba(167,243,208,.25);
  border-radius: 50px;
  background: rgba(255,255,255,.07);
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6ee7b7;
}

.hero-content h1 {
  margin: 26px 0 20px;
  font-size: clamp(46px, 6vw, 78px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -2px;
}

.hero-content h1 span {
  color: #a7f3d0;
}

.hero-content > p {
  max-width: 620px;
  margin: 0 auto;
  color: #d1fae5;
  font-size: 16px;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 35px;
}

.primary-btn,
.outline-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 52px;
  padding: 0 25px;
  border-radius: 11px;
  font-size: 12px;
  font-weight: 800;
  transition: .3s;
}

.primary-btn {
  background: white;
  color: #065f46;
}

.outline-btn {
  border: 1px solid rgba(255,255,255,.35);
  color: white;
}

.primary-btn:hover,
.outline-btn:hover {
  transform: translateY(-3px);
}

.outline-btn:hover {
  background: rgba(255,255,255,.1);
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 35px;
  margin-top: 55px;
}

.hero-stats > div:not(.stat-divider) {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.hero-stats strong {
  font-family: "Outfit", sans-serif;
  font-size: 27px;
}

.hero-stats span {
  color: #a7f3d0;
  font-size: 11px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,.2);
}


/* ============================
   INTRO
============================ */
.gallery-intro {
  padding: 90px 0 45px;
  background: white;
}

.intro-content {
  max-width: 750px;
  text-align: center;
}

.section-label {
  color: #059669;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.intro-content h2 {
  margin: 17px 0;
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.15;
  letter-spacing: -1px;
}

.intro-content h2 span {
  color: #059669;
}

.intro-content p {
  color: #789085;
  font-size: 14px;
  line-height: 1.9;
}


/* ============================
   GALLERY SECTION
============================ */
.gallery-section {
  padding: 55px 0 110px;
  background: white;
}

.gallery-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 25px;
  margin-bottom: 30px;
}

.gallery-heading h2 {
  margin: 12px 0 8px;
  font-size: clamp(27px, 3vw, 36px);
}

.gallery-heading p {
  margin: 0;
  color: #94a3b8;
  font-size: 13px;
}

.gallery-count {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 1px solid #e1eee6;
  border-radius: 50px;
  background: #f0fdf4;
  color: #047857;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.count-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
}


/* FILTERS */
.gallery-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 35px;
  padding: 18px;
  border: 1px solid #e7efe9;
  border-radius: 15px;
  background: #f8faf9;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  padding: 11px 16px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: white;
  color: #64748b;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  transition: .2s;
}

.filter-btn:hover {
  color: #047857;
  border-color: #d1fae5;
}

.filter-btn.active {
  background: #065f46;
  color: white;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 250px;
  padding: 0 15px;
  border: 1px solid #e2e8e5;
  border-radius: 10px;
  background: white;
  color: #94a3b8;
}

.search-box:focus-within {
  border-color: #059669;
}

.search-box input {
  width: 100%;
  height: 42px;
  border: none;
  outline: none;
  background: transparent;
  color: #172d23;
  font-size: 12px;
}


/* GRID */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 25px;
}

.gallery-card {
  overflow: hidden;
  border: 1px solid #e6eee8;
  border-radius: 19px;
  background: white;
  transition: transform .3s, box-shadow .3s;
}

.gallery-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(6,78,59,.09);
}

.image-button {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  height: 275px;
  background: #eef7f0;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 18px;
  transition: transform .5s;
}

.gallery-card:hover .image-wrapper img {
  transform: scale(1.07);
}

.image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(2,44,34,.6);
  color: white;
  opacity: 0;
  transition: opacity .3s;
}

.gallery-card:hover .image-overlay,
.image-button:focus-visible .image-overlay {
  opacity: 1;
}

.zoom-icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border: 1px solid rgba(255,255,255,.35);
  border-radius: 50%;
  background: rgba(255,255,255,.15);
}

.overlay-text {
  font-size: 12px;
  font-weight: 800;
}

.card-content {
  padding: 23px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.category-label {
  color: #059669;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .6px;
  text-transform: uppercase;
}

.photo-number {
  color: #cbd5e1;
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 800;
}

.card-content h3 {
  margin: 12px 0 9px;
  color: #172d23;
  font-size: 21px;
}

.card-content > p {
  display: -webkit-box;
  overflow: hidden;
  min-height: 42px;
  margin: 0;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.8;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid #edf2ef;
}

.card-footer strong {
  color: #065f46;
  font-size: 18px;
}

.price-unavailable {
  color: #94a3b8;
  font-size: 12px;
}

.product-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #047857;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.product-link:hover {
  color: #059669;
}


/* LOADING */
.skeleton-card {
  overflow: hidden;
  border: 1px solid #e7efe9;
  border-radius: 18px;
  padding-bottom: 25px;
}

.skeleton-image {
  height: 275px;
  background: linear-gradient(
    90deg,
    #edf2ef 25%,
    #f8faf9 50%,
    #edf2ef 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-line {
  width: 75%;
  height: 15px;
  margin: 20px 20px 0;
  border-radius: 5px;
  background: #edf2ef;
}

.skeleton-line.short {
  width: 45%;
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}


/* EMPTY */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 350px;
  padding: 35px;
  border: 1px dashed #cbded2;
  border-radius: 18px;
  background: #f8faf9;
  text-align: center;
}

.empty-icon {
  font-size: 55px;
}

.empty-state h3 {
  margin: 15px 0 5px;
  font-size: 23px;
}

.empty-state p {
  color: #94a3b8;
  font-size: 13px;
}

.reset-btn {
  margin-top: 20px;
  padding: 12px 22px;
  border: none;
  border-radius: 10px;
  background: #065f46;
  color: white;
  cursor: pointer;
}


/* LOAD MORE */
.load-more-wrapper {
  margin-top: 45px;
  text-align: center;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  padding: 16px 25px;
  border: 1px solid #cfe5d7;
  border-radius: 11px;
  background: white;
  color: #065f46;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: .25s;
}

.load-more-btn:hover {
  background: #ecfdf5;
  border-color: #059669;
}

.load-more-wrapper p {
  margin-top: 13px;
  color: #94a3b8;
  font-size: 11px;
}


/* CTA */
.gallery-cta {
  padding: 100px 20px;
  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(110,231,183,.13),
      transparent 60%
    ),
    linear-gradient(135deg, #064e3b, #022c22);
  color: white;
}

.cta-content {
  max-width: 750px;
  margin: auto;
  text-align: center;
}

.cta-label {
  color: #a7f3d0;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
}

.cta-content h2 {
  margin: 20px 0;
  font-size: clamp(34px, 5vw, 56px);
  line-height: 1.15;
}

.cta-content h2 span {
  display: block;
  color: #a7f3d0;
}

.cta-content p {
  max-width: 550px;
  margin: 0 auto;
  color: #d1fae5;
  font-size: 14px;
  line-height: 1.9;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 17px 27px;
  border-radius: 11px;
  background: white;
  color: #065f46;
  font-size: 12px;
  font-weight: 800;
}

.cta-btn:hover {
  background: #d1fae5;
}


/* LIGHTBOX */
.lightbox-backdrop {
  position: fixed;
  z-index: 9999;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 90px;
  background: rgba(1,20,15,.94);
  backdrop-filter: blur(12px);
}

.lightbox-content {
  position: relative;
  width: min(850px, 100%);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-image-wrapper {
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 0;
  flex: 1;
}

.lightbox-image-wrapper img {
  display: block;
  max-width: 100%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: 12px;
}

.lightbox-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  width: 100%;
  margin-top: 20px;
  color: white;
}

.lightbox-category {
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.lightbox-info h3 {
  margin: 8px 0;
  font-size: 24px;
}

.lightbox-info p {
  max-width: 480px;
  margin: 0;
  color: #cbd5e1;
  font-size: 12px;
  line-height: 1.7;
}

.lightbox-product-btn {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 14px 20px;
  border-radius: 10px;
  background: #10b981;
  color: #022c22;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 25px;
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 50%;
  background: rgba(255,255,255,.1);
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 50%;
  background: rgba(255,255,255,.1);
  color: white;
  font-size: 35px;
  cursor: pointer;
  transform: translateY(-50%);
}

.lightbox-arrow:hover,
.lightbox-close:hover {
  background: rgba(255,255,255,.2);
}

.lightbox-arrow.prev {
  left: 25px;
}

.lightbox-arrow.next {
  right: 25px;
}

.lightbox-counter {
  margin-top: 15px;
  color: #94a3b8;
  font-size: 12px;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity .25s;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}


/* RESPONSIVE */
@media (max-width: 1000px) {
  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .gallery-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: 0;
  }
}

@media (max-width: 650px) {
  .gallery-hero {
    padding: 80px 0 70px;
  }

  .hero-content h1 {
    font-size: 45px;
  }

  .hero-content > p {
    font-size: 14px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .primary-btn,
  .outline-btn {
    width: 100%;
  }

  .hero-stats {
    gap: 18px;
    margin-top: 40px;
  }

  .hero-stats strong {
    font-size: 22px;
  }

  .hero-stats span {
    font-size: 9px;
  }

  .gallery-intro {
    padding: 65px 0 25px;
  }

  .gallery-section {
    padding: 40px 0 70px;
  }

  .gallery-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .image-wrapper {
    height: 300px;
  }

  .filters {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 5px;
  }

  .filter-btn {
    flex-shrink: 0;
  }

  .gallery-cta {
    padding: 75px 15px;
  }

  .lightbox-backdrop {
    padding: 70px 15px 35px;
  }

  .lightbox-arrow {
    width: 35px;
    height: 35px;
    font-size: 27px;
  }

  .lightbox-arrow.prev {
    left: 10px;
  }

  .lightbox-arrow.next {
    right: 10px;
  }

  .lightbox-image-wrapper img {
    max-height: 48vh;
  }

  .lightbox-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .lightbox-info h3 {
    font-size: 20px;
  }

  .lightbox-product-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
</style>
