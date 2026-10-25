
<template>
  <footer class="footer">

    <!-- TOP CTA -->
    <div class="footer-top">
      <div class="container footer-top-content">

        <div>
          <span class="top-label">
            DISCOVER AUTHENTIC AFRICAN PRODUCTS
          </span>

          <h2>
            Bring Africa
            <span>closer to home.</span>
          </h2>

          <p>
            Discover the flavors, traditions and essentials
            that connect us to our roots.
          </p>
        </div>

        <RouterLink to="/store" class="shop-btn">
          {{ language === "fr" ? "Découvrir la boutique" : "Explore our store" }}
          <span>↗</span>
        </RouterLink>

      </div>
    </div>


    <!-- MAIN FOOTER -->
    <div class="footer-main">
      <div class="container footer-grid">

        <!-- BRAND -->
        <div class="footer-brand">

          <RouterLink to="/" class="brand-link">
            <div class="logo-box">
              <img
                src="../assets/images/logos/logos.png"
                alt="Africa Mart"
              />
            </div>

            <div class="brand-text">
              <strong>AFRICA <span>MART</span></strong>
              <small>AUTHENTIC AFRICAN ESSENTIALS</small>
            </div>
          </RouterLink>

          <p class="brand-description">
            {{
              language === "fr"
                ? "Africa Mart vous rapproche des saveurs et traditions africaines grâce à une sélection de produits authentiques."
                : "Africa Mart brings you closer to African flavors and traditions through a carefully selected collection of authentic products."
            }}
          </p>

          <div class="brand-promise">
            <span class="promise-icon">✦</span>

            <span>
              {{
                language === "fr"
                  ? "L'Afrique à votre porte"
                  : "Africa at your doorstep"
              }}
            </span>
          </div>

          <!-- SOCIAL LINKS -->
          <div class="social-links">

            <a
              v-if="socialLinks.facebook"
              :href="socialLinks.facebook"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z"
                />
              </svg>
            </a>

            <a
              v-if="socialLinks.instagram"
              :href="socialLinks.instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>

            <a
              v-if="whatsappLink"
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5Z"
                />
                <path d="M9 9c.5 3 2 4.5 5 5l1.5-1"/>
              </svg>
            </a>

            <a
              v-if="socialLinks.tiktok"
              :href="socialLinks.tiktok"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M16.7 2c.3 2.5 1.7 4 4.3 4.2v4.2a9.4 9.4 0 0 1-4.3-1.1v6.3c0 4-3.2 6.4-6.5 6.4A6.5 6.5 0 0 1 3.7 15.5 6.5 6.5 0 0 1 12 9.2v4.3a2.5 2.5 0 1 0 .7 2V2h4Z"
                />
              </svg>
            </a>

          </div>

        </div>


        <!-- QUICK LINKS -->
        <div class="footer-column">
          <h3>
            {{ language === "fr" ? "Navigation" : "Quick Links" }}
          </h3>

          <div class="footer-links">
            <RouterLink to="/">
              {{ t("nav.home") }}
            </RouterLink>

            <RouterLink to="/store">
              {{ t("nav.store") }}
            </RouterLink>

            <RouterLink to="/gallery">
              {{ t("nav.gallery") }}
            </RouterLink>

            <RouterLink to="/about">
              {{ t("nav.about") }}
            </RouterLink>

            <RouterLink to="/contact">
              {{ t("nav.contact") }}
            </RouterLink>
          </div>
        </div>


        <!-- SHOP -->
        <div class="footer-column">
          <h3>
            {{ language === "fr" ? "Notre boutique" : "Our Store" }}
          </h3>

          <div class="footer-links">
            <RouterLink to="/store">
              {{ language === "fr" ? "Tous les produits" : "All Products" }}
            </RouterLink>

            <RouterLink to="/cart">
              {{ language === "fr" ? "Mon panier" : "My Cart" }}
            </RouterLink>

            <RouterLink to="/gallery">
              {{ language === "fr" ? "Notre galerie" : "Our Gallery" }}
            </RouterLink>

            <RouterLink to="/contact">
              {{ language === "fr" ? "Assistance" : "Customer Support" }}
            </RouterLink>
          </div>

          <div class="shop-highlight">
            <span class="highlight-dot"></span>

            <span>
              {{
                language === "fr"
                  ? "Découvrez notre collection"
                  : "Explore our collection"
              }}
            </span>
          </div>
        </div>


        <!-- CONTACT -->
        <div class="footer-column contact-column">
          <h3>
            {{ language === "fr" ? "Contactez-nous" : "Get in Touch" }}
          </h3>

          <p class="contact-intro">
            {{
              language === "fr"
                ? "Une question sur un produit ou une commande ? Contactez notre équipe."
                : "Questions about a product or an order? Reach out to our team."
            }}
          </p>

          <div class="contact-items">

            <div v-if="contactInfo.location" class="contact-item">
              <span class="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>

              <span>{{ contactInfo.location }}</span>
            </div>

            <a
              v-if="contactInfo.phone"
              :href="`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`"
              class="contact-item"
            >
              <span class="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.8L7.1 10a16 16 0 0 0 6 6l1.7-1.9a2 2 0 0 1 1.8-.6l2.8.5a2 2 0 0 1 1.6 2.9Z"
                  />
                </svg>
              </span>

              <span>{{ contactInfo.phone }}</span>
            </a>

            <a
              v-if="contactInfo.email"
              :href="`mailto:${contactInfo.email}`"
              class="contact-item"
            >
              <span class="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 6 10 7 10-7"/>
                </svg>
              </span>

              <span>{{ contactInfo.email }}</span>
            </a>

          </div>

          <RouterLink to="/contact" class="contact-btn">
            {{ language === "fr" ? "Nous écrire" : "Send us a message" }}
            <span>↗</span>
          </RouterLink>

        </div>

      </div>
    </div>


    <!-- BOTTOM BAR -->
    <div class="footer-bottom">
      <div class="container bottom-content">

        <p>
          © {{ currentYear }} <strong>Africa Mart.</strong>
          {{
            language === "fr"
              ? "Tous droits réservés."
              : "All rights reserved."
          }}
        </p>

        <div class="bottom-center">
          <span class="bottom-heart">♥</span>
          {{ language === "fr"
            ? "Inspiré par l'Afrique"
            : "Inspired by Africa"
          }}
        </div>

        <button
          type="button"
          class="back-to-top"
          @click="scrollToTop"
        >
          {{ language === "fr" ? "Retour en haut" : "Back to top" }}
          <span>↑</span>
        </button>

      </div>
    </div>

  </footer>
</template>


<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

import { useLanguage } from "../composables/useLanguage";

const { language, t } = useLanguage();


// ============================
// COPYRIGHT
// ============================
const currentYear = new Date().getFullYear();


// ============================
// BUSINESS INFORMATION
// ============================
// Replace these with your real
// business contact details.
const contactInfo = {
  location: "",
  phone: "",
  email: ""
};


// ============================
// SOCIAL NETWORKS
// ============================
// Add verified links only.
// Empty links are not displayed.
const socialLinks = {
  facebook: "",
  instagram: "",
  tiktok: ""
};


// ============================
// WHATSAPP
// ============================
// International format, digits only.
const whatsappNumber = "";

const whatsappLink = computed(() => {
  const number = whatsappNumber.replace(/\D/g, "");

  if (!number) return "";

  const message = encodeURIComponent(
    "Hello Africa Mart! I would like to know more about your products."
  );

  return `https://wa.me/${number}?text=${message}`;
});


// ============================
// SCROLL TO TOP
// ============================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap");

* {
  box-sizing: border-box;
}

.footer {
  --green: #065f46;
  --green-dark: #022c22;
  --green-light: #059669;

  overflow: hidden;
  background: #022c22;
  color: white;
  font-family: "DM Sans", sans-serif;
}

.container {
  width: min(1200px, 92%);
  margin: 0 auto;
}

h2,
h3 {
  font-family: "Outfit", sans-serif;
}

a {
  text-decoration: none;
}


/* ============================
   TOP CTA
============================ */
.footer-top {
  position: relative;
  overflow: hidden;
  padding: 55px 0;
  border-bottom: 1px solid rgba(255,255,255,.1);
  background:
    radial-gradient(
      circle at 85% 50%,
      rgba(110,231,183,.16),
      transparent 40%
    ),
    #064e3b;
}

.footer-top-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 35px;
}

.top-label {
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.footer-top h2 {
  margin: 15px 0 12px;
  font-size: clamp(28px, 3.5vw, 41px);
  line-height: 1.2;
  letter-spacing: -.5px;
}

.footer-top h2 span {
  color: #a7f3d0;
}

.footer-top p {
  max-width: 520px;
  margin: 0;
  color: #c6e8d8;
  font-size: 13px;
  line-height: 1.8;
}

.shop-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-shrink: 0;
  min-height: 51px;
  padding: 0 25px;
  border-radius: 11px;
  background: white;
  color: #065f46;
  font-size: 12px;
  font-weight: 800;
  transition: .3s;
}

.shop-btn:hover {
  transform: translateY(-3px);
  background: #d1fae5;
}


/* ============================
   MAIN FOOTER
============================ */
.footer-main {
  padding: 85px 0 75px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.25fr;
  gap: 55px;
}


/* BRAND */
.footer-brand {
  max-width: 340px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.logo-box {
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  border: 1px solid rgba(167,243,208,.15);
  border-radius: 13px;
  background: rgba(255,255,255,.08);
}

.logo-box img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.brand-text strong {
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 23px;
  font-weight: 900;
  letter-spacing: -.5px;
  white-space: nowrap;
}

.brand-text strong span {
  color: #6ee7b7;
}

.brand-text small {
  color: #a7c9b9;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 1px;
  white-space: nowrap;
}

.brand-description {
  margin: 25px 0;
  color: #b1cfc0;
  font-size: 13px;
  line-height: 2;
}

.brand-promise {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 13px;
  border: 1px solid rgba(167,243,208,.15);
  border-radius: 9px;
  background: rgba(255,255,255,.05);
  color: #a7f3d0;
  font-size: 11px;
  font-weight: 700;
}

.promise-icon {
  color: #6ee7b7;
  font-size: 17px;
}


/* SOCIAL */
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 25px;
}

.social-links a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(167,243,208,.15);
  border-radius: 11px;
  background: rgba(255,255,255,.06);
  color: #d1fae5;
  transition: .25s;
}

.social-links a svg {
  width: 19px;
  height: 19px;
}

.social-links a:hover {
  transform: translateY(-3px);
  border-color: #10b981;
  background: #059669;
  color: white;
}


/* COLUMNS */
.footer-column h3 {
  position: relative;
  margin: 10px 0 30px;
  padding-bottom: 15px;
  color: white;
  font-size: 17px;
  font-weight: 800;
}

.footer-column h3::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 35px;
  height: 3px;
  border-radius: 5px;
  background: #34d399;
  content: "";
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.footer-links a {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  color: #b1cfc0;
  font-size: 12px;
  transition: .25s;
}

.footer-links a::before {
  width: 0;
  overflow: hidden;
  color: #6ee7b7;
  content: "›";
  font-size: 17px;
  transition: .25s;
}

.footer-links a:hover,
.footer-links a.router-link-active {
  color: #6ee7b7;
}

.footer-links a:hover::before {
  width: 14px;
}

.shop-highlight {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 30px;
  padding: 11px 13px;
  border-radius: 9px;
  background: rgba(16,185,129,.12);
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 700;
}

.highlight-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
}


/* CONTACT */
.contact-intro {
  margin: 0 0 25px;
  color: #b1cfc0;
  font-size: 12px;
  line-height: 1.9;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #b1cfc0;
  font-size: 12px;
  line-height: 1.7;
  overflow-wrap: anywhere;
  transition: .25s;
}

a.contact-item:hover {
  color: #6ee7b7;
}

.contact-icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(16,185,129,.12);
  color: #6ee7b7;
}

.contact-icon svg {
  width: 16px;
  height: 16px;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  margin-top: 25px;
  padding: 13px 17px;
  border: 1px solid rgba(167,243,208,.25);
  border-radius: 9px;
  color: #a7f3d0;
  font-size: 11px;
  font-weight: 800;
  transition: .25s;
}

.contact-btn:hover {
  background: rgba(16,185,129,.15);
}


/* ============================
   BOTTOM
============================ */
.footer-bottom {
  padding: 24px 0;
  border-top: 1px solid rgba(255,255,255,.1);
  background: #01261d;
}

.bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.bottom-content p {
  margin: 0;
  color: #9bbdad;
  font-size: 11px;
}

.bottom-content p strong {
  color: white;
}

.bottom-center {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #9bbdad;
  font-size: 11px;
}

.bottom-heart {
  color: #34d399;
  font-size: 15px;
}

.back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 13px;
  border: 1px solid rgba(167,243,208,.15);
  border-radius: 8px;
  background: rgba(255,255,255,.05);
  color: #d1fae5;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: .25s;
}

.back-to-top:hover {
  border-color: #34d399;
  background: rgba(16,185,129,.15);
}

.back-to-top span {
  font-size: 16px;
}


/* ============================
   RESPONSIVE
============================ */
@media (max-width: 1100px) {
  .footer-grid {
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 45px;
  }

  .contact-column {
    grid-column: span 3;
  }

  .contact-items {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 800px) {
  .footer-top-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 45px;
  }

  .contact-column {
    grid-column: auto;
  }

  .contact-items {
    flex-direction: column;
  }

  .bottom-content {
    flex-wrap: wrap;
  }
}

@media (max-width: 550px) {
  .footer-top {
    padding: 50px 0;
  }

  .footer-top h2 {
    font-size: 31px;
  }

  .shop-btn {
    width: 100%;
  }

  .footer-main {
    padding: 65px 0 55px;
  }

  .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 22px;
  }

  .footer-brand {
    grid-column: span 2;
  }

  .footer-column h3 {
    font-size: 15px;
  }

  .footer-links a {
    font-size: 11px;
  }

  .contact-column {
    grid-column: span 2;
  }

  .bottom-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .bottom-center {
    order: 3;
  }

  .brand-text strong {
    font-size: 21px;
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
