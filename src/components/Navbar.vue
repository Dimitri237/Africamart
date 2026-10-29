
<template>
  <header
    ref="navbarRef"
    class="navbar"
    :class="{
      scrolled: scrolled,
      'menu-open': mobileMenu,
      'solid-nav': !isHome
    }"
  >
    <div class="nav-container">

      <!-- LOGO -->
      <RouterLink
        to="/"
        class="brand"
        aria-label="Africa Mart - Home"
        @click="closeMenu"
      >
        <div class="brand-logo">
          <img
            src="../assets/images/logos/logos.png"
            alt="Africa Mart"
          />
        </div>

        <div class="brand-name">
          <strong>AFRICA <span>MART</span></strong>
          <small>AUTHENTIC AFRICAN ESSENTIALS</small>
        </div>
      </RouterLink>


      <!-- DESKTOP NAVIGATION -->
      <nav class="desktop-nav" aria-label="Main navigation">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="{ 'active-link': isActive(link.to) }"
        >
          {{ t(link.label) }}
        </RouterLink>
      </nav>


      <!-- ACTIONS -->
      <div class="nav-actions">

        <!-- LANGUAGE -->
        <div class="language-switch" aria-label="Language">
          <button
            type="button"
            :class="{ active: language === 'en' }"
            :aria-pressed="language === 'en'"
            @click="changeLanguage('en')"
          >
            EN
          </button>

          <button
            type="button"
            :class="{ active: language === 'fr' }"
            :aria-pressed="language === 'fr'"
            @click="changeLanguage('fr')"
          >
            FR
          </button>
        </div>


        <!-- CART -->
        <RouterLink
          to="/cart"
          class="cart-button"
          :aria-label="`Shopping cart, ${cartCount} items`"
          @click="closeMenu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path
              d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"
            />
          </svg>

          <span
            v-if="cartCount > 0"
            class="cart-count"
          >
            {{ cartCount > 99 ? "99+" : cartCount }}
          </span>
        </RouterLink>


        <!-- MOBILE MENU BUTTON -->
        <button
          type="button"
          class="menu-toggle"
          :aria-expanded="mobileMenu"
          aria-controls="mobile-navigation"
          :aria-label="mobileMenu ? 'Close menu' : 'Open menu'"
          @click="toggleMenu"
        >
          <span :class="{ top: mobileMenu }"></span>
          <span :class="{ middle: mobileMenu }"></span>
          <span :class="{ bottom: mobileMenu }"></span>
        </button>

      </div>
    </div>


    <!-- MOBILE OVERLAY -->
    <Transition name="fade">
      <div
        v-if="mobileMenu"
        class="mobile-backdrop"
        aria-hidden="true"
        @click="closeMenu"
      ></div>
    </Transition>


    <!-- MOBILE NAVIGATION -->
    <Transition name="slide">
      <nav
        v-if="mobileMenu"
        id="mobile-navigation"
        class="mobile-nav"
        aria-label="Mobile navigation"
      >
        <div class="mobile-nav-heading">
          <span>EXPLORE AFRICA MART</span>
          <span class="mobile-decoration">✦</span>
        </div>

        <RouterLink
          v-for="(link, index) in navLinks"
          :key="link.to"
          :to="link.to"
          class="mobile-link"
          :class="{ active: isActive(link.to) }"
          @click="closeMenu"
        >
          <span class="mobile-link-number">
            {{ String(index + 1).padStart(2, "0") }}
          </span>

          <span>{{ t(link.label) }}</span>

          <span class="mobile-arrow">↗</span>
        </RouterLink>

        <div class="mobile-bottom">
          <div class="mobile-language">
            <span>LANGUAGE</span>

            <div>
              <button
                type="button"
                :class="{ active: language === 'en' }"
                @click="changeLanguage('en')"
              >
                English
              </button>

              <button
                type="button"
                :class="{ active: language === 'fr' }"
                @click="changeLanguage('fr')"
              >
                Français
              </button>
            </div>
          </div>

          <RouterLink
            to="/cart"
            class="mobile-cart-link"
            @click="closeMenu"
          >
            🛒 {{ language === "fr" ? "Mon panier" : "My cart" }}
            <span>{{ cartCount }} →</span>
          </RouterLink>

          <div class="mobile-tagline">
            AFRICA MART · AUTHENTIC AFRICAN ESSENTIALS
          </div>
        </div>
      </nav>
    </Transition>

  </header>
</template>


<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted
} from "vue";
import { useCart } from "../composables/useCart";
import {
  RouterLink,
  useRoute
} from "vue-router";

import { useLanguage } from "../composables/useLanguage";


const route = useRoute();


const { cartCount } = useCart();
const {
  language,
  t,
  changeLanguage
} = useLanguage();


// ==============================
// NAVIGATION
// ==============================
const navLinks = [
  { to: "/", label: "nav.home" },
  { to: "/store", label: "nav.store" },
  { to: "/gallery", label: "nav.gallery" },
  { to: "/about", label: "nav.about" },
  { to: "/contact", label: "nav.contact" }
];

const navbarRef = ref(null);
const mobileMenu = ref(false);
const scrolled = ref(false);

const isHome = computed(() => route.path === "/");

function isActive(path) {
  if (path === "/") {
    return route.path === "/";
  }

  return (
    route.path === path ||
    route.path.startsWith(`${path}/`) ||
    (path === "/store" && route.path.startsWith("/product/"))
  );
}

function toggleMenu() {
  mobileMenu.value = !mobileMenu.value;
}

function closeMenu() {
  mobileMenu.value = false;
}

function handleScroll() {
  scrolled.value = window.scrollY > 35;
}

function handleResize() {
  if (window.innerWidth > 900) {
    closeMenu();
  }
}

function handleOutsideClick(event) {
  if (
    mobileMenu.value &&
    navbarRef.value &&
    !navbarRef.value.contains(event.target)
  ) {
    closeMenu();
  }
}

function handleEscape(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
}


// ==============================
// CART
// ==============================
// Compatible with a cart stored in
// localStorage under the key "cart".
//
// Also listens to a custom "cart-updated"
// event dispatched after cart changes.


// ==============================
// WATCH ROUTE / MENU
// ==============================

watch(
  () => route.fullPath,
  () => {
    closeMenu();

    // Remonter en haut après le changement de page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  { flush: "post" }
);


watch(mobileMenu, (isOpen) => {
  if (typeof document === "undefined") return;

  document.body.classList.toggle(
    "africa-menu-open",
    isOpen
  );
});


// ==============================
// LIFECYCLE
// ==============================
onMounted(() => {
  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  window.addEventListener("resize", handleResize);

  document.addEventListener("click", handleOutsideClick);

  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);

  document.removeEventListener("click", handleOutsideClick);
  document.removeEventListener("keydown", handleEscape);

  document.body.classList.remove("africa-menu-open");
});
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap");

* {
  box-sizing: border-box;
}

.navbar {
  --green: #065f46;
  --green-dark: #022c22;
  --green-light: #059669;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  padding: 15px 0;
  background: transparent;
  font-family: "DM Sans", sans-serif;
  transition:
    padding .3s ease,
    background .3s ease,
    box-shadow .3s ease,
    backdrop-filter .3s ease;
}

.navbar.scrolled,
.navbar.solid-nav,
.navbar.menu-open {
  padding: 11px 0;
  background: rgba(255,255,255,.97);
  border-bottom: 1px solid #e7efe9;
  box-shadow: 0 8px 35px rgba(6,78,59,.07);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.nav-container {
  position: relative;
  z-index: 1003;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  width: min(1300px, 94%);
  margin: auto;
}


/* BRAND */
.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
  text-decoration: none;
}

.brand-logo {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 13px;
  background: rgba(255,255,255,.12);
  transition: .3s;
}

.brand-logo img {
  width: 55px;
  height: 55px;
  object-fit: contain;
  transition: .3s;
}

.brand:hover .brand-logo img {
  transform: scale(1.06);
}

.brand-name {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.brand-name strong {
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 21px;
  font-weight: 900;
  letter-spacing: -.5px;
  white-space: nowrap;
}

.brand-name strong span {
  color: #b9582b;
}

.brand-name small {
  color: rgba(255,255,255,.7);
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 1.1px;
  white-space: nowrap;
}

.navbar.scrolled .brand-name strong,
.navbar.solid-nav .brand-name strong,
.navbar.menu-open .brand-name strong {
  color: #064e3b;
}

.navbar.scrolled .brand-name strong span,
.navbar.solid-nav .brand-name strong span,
.navbar.menu-open .brand-name strong span {
  color: #cf602c;
}

.navbar.scrolled .brand-name small,
.navbar.solid-nav .brand-name small,
.navbar.menu-open .brand-name small {
  color: #789085;
}

.navbar.scrolled .brand-logo,
.navbar.solid-nav .brand-logo,
.navbar.menu-open .brand-logo {
  background: #ecfdf5;
}


/* DESKTOP NAV */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.desktop-nav a {
  position: relative;
  padding: 10px 0;
  color: rgba(255,255,255,.9);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: .25s;
  white-space: nowrap;
}

.desktop-nav a::after {
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 0;
  height: 2px;
  border-radius: 5px;
  background: #34d399;
  content: "";
  transition: .25s;
}

.desktop-nav a:hover,
.desktop-nav a.active-link {
  color: #a7f3d0;
}

.desktop-nav a:hover::after,
.desktop-nav a.active-link::after {
  width: 100%;
}

.navbar.scrolled .desktop-nav a,
.navbar.solid-nav .desktop-nav a,
.navbar.menu-open .desktop-nav a {
  color: #53685b;
}

.navbar.scrolled .desktop-nav a:hover,
.navbar.scrolled .desktop-nav a.active-link,
.navbar.solid-nav .desktop-nav a:hover,
.navbar.solid-nav .desktop-nav a.active-link {
  color: #047857;
}


/* ACTIONS */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 13px;
}

.language-switch {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 30px;
  background: rgba(255,255,255,.1);
}

.language-switch button {
  min-width: 39px;
  padding: 8px 10px;
  border: none;
  border-radius: 30px;
  background: transparent;
  color: white;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
  transition: .2s;
}

.language-switch button.active {
  background: white;
  color: #065f46;
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
}

.navbar.scrolled .language-switch,
.navbar.solid-nav .language-switch,
.navbar.menu-open .language-switch {
  border-color: #e4ede7;
  background: #f1f8f4;
}

.navbar.scrolled .language-switch button,
.navbar.solid-nav .language-switch button,
.navbar.menu-open .language-switch button {
  color: #647c6e;
}

.navbar.scrolled .language-switch button.active,
.navbar.solid-nav .language-switch button.active,
.navbar.menu-open .language-switch button.active {
  background: #065f46;
  color: white;
}


/* CART */
.cart-button {
  position: relative;
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 12px;
  background: rgba(255,255,255,.1);
  color: white;
  text-decoration: none;
  transition: .25s;
}

.cart-button svg {
  width: 20px;
  height: 20px;
}

.cart-button:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,.2);
}

.navbar.scrolled .cart-button,
.navbar.solid-nav .cart-button,
.navbar.menu-open .cart-button {
  border-color: #e2eee6;
  background: #ecfdf5;
  color: #047857;
}

.navbar.scrolled .cart-button:hover,
.navbar.solid-nav .cart-button:hover {
  background: #d1fae5;
}

.cart-count {
  position: absolute;
  top: -7px;
  right: -7px;
  display: grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border: 2px solid white;
  border-radius: 50px;
  background: #10b981;
  color: white;
  font-size: 9px;
  font-weight: 900;
}


/* MOBILE TOGGLE */
.menu-toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 43px;
  height: 43px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 12px;
  background: rgba(255,255,255,.1);
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 3px;
  background: white;
  transition: .3s;
}

.navbar.scrolled .menu-toggle,
.navbar.solid-nav .menu-toggle,
.navbar.menu-open .menu-toggle {
  border-color: #e2eee6;
  background: #ecfdf5;
}

.navbar.scrolled .menu-toggle span,
.navbar.solid-nav .menu-toggle span,
.navbar.menu-open .menu-toggle span {
  background: #065f46;
}

.menu-toggle span.top {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle span.middle {
  opacity: 0;
}

.menu-toggle span.bottom {
  transform: translateY(-7px) rotate(-45deg);
}


/* MOBILE BACKDROP */
.mobile-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1001;
  background: rgba(2,44,34,.55);
  backdrop-filter: blur(5px);
}


/* MOBILE NAV */
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  width: min(410px, 100%);
  height: 100dvh;
  padding: 115px 28px 30px;
  overflow-y: auto;
  background: #fff;
  box-shadow: -20px 0 60px rgba(0,0,0,.12);
}

.mobile-nav-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e7efe9;
}

.mobile-nav-heading span:first-child {
  color: #059669;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.mobile-decoration {
  color: #10b981;
  font-size: 20px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 19px 5px;
  border-bottom: 1px solid #edf3ef;
  color: #172d23;
  font-family: "Outfit", sans-serif;
  font-size: 23px;
  font-weight: 700;
  text-decoration: none;
  transition: .2s;
}

.mobile-link.active,
.mobile-link:hover {
  color: #059669;
}

.mobile-link-number {
  color: #9cb5a7;
  font-family: "DM Sans", sans-serif;
  font-size: 10px;
  font-weight: 800;
}

.mobile-arrow {
  margin-left: auto;
  color: #94a3b8;
  font-size: 20px;
}

.mobile-link.active .mobile-arrow {
  color: #059669;
}

.mobile-bottom {
  margin-top: auto;
  padding-top: 30px;
}

.mobile-language {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 22px;
}

.mobile-language > span {
  color: #94a3b8;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
}

.mobile-language > div {
  display: flex;
  gap: 7px;
}

.mobile-language button {
  padding: 9px 12px;
  border: 1px solid #e2eee6;
  border-radius: 8px;
  background: white;
  color: #647c6e;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
}

.mobile-language button.active {
  border-color: #065f46;
  background: #065f46;
  color: white;
}

.mobile-cart-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 19px;
  border-radius: 11px;
  background: #065f46;
  color: white;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
}

.mobile-tagline {
  margin-top: 30px;
  color: #a5b8ac;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 1px;
  text-align: center;
}


/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .35s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}


/* RESPONSIVE */
@media (max-width: 1100px) {
  .desktop-nav {
    gap: 18px;
  }

  .brand-name small {
    display: none;
  }

  .brand-name strong {
    font-size: 18px;
  }
}

@media (max-width: 900px) {
  .navbar {
    padding: 11px 0;
  }

  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .brand-logo {
    width: 52px;
    height: 52px;
  }

  .brand-logo img {
    width: 49px;
    height: 49px;
  }

  .brand-name small {
    display: block;
  }

  .language-switch {
    display: none;
  }
}

@media (max-width: 520px) {
  .nav-container {
    width: 92%;
    gap: 10px;
  }

  .brand {
    gap: 7px;
  }

  .brand-logo {
    width: 45px;
    height: 45px;
  }

  .brand-logo img {
    width: 43px;
    height: 43px;
  }

  .brand-name strong {
    font-size: 16px;
  }

  .brand-name small {
    font-size: 6px;
    letter-spacing: .4px;
  }

  .nav-actions {
    gap: 8px;
  }

  .cart-button,
  .menu-toggle {
    width: 40px;
    height: 40px;
  }

  .mobile-nav {
    padding: 100px 22px 25px;
  }
}

@media (max-width: 360px) {
  .brand-name small {
    display: none;
  }

  .brand-name strong {
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}
</style>
