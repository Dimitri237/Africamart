
<template>
  <main class="about-page">

    <!-- HERO -->
    <section class="about-hero">
      <div class="hero-pattern"></div>
      <div class="hero-circle circle-one"></div>
      <div class="hero-circle circle-two"></div>

      <div class="container hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          GET TO KNOW AFRICA MART
        </div>

        <h1>
          More than a store.
          <span>A celebration of Africa.</span>
        </h1>

        <p>
          Bringing authentic African flavors, cherished traditions
          and carefully selected products closer to your home.
        </p>

        <div class="hero-actions">
          <a href="#our-story" class="primary-btn">
            Discover our story
            <span>↓</span>
          </a>

          <RouterLink to="/store" class="secondary-btn">
            Explore our store
            <span>↗</span>
          </RouterLink>
        </div>
      </div>
    </section>


    <!-- STORY -->
    <section id="our-story" class="story-section">
      <div class="container story-grid">

        <div class="story-visual">
          <div class="story-image">
            <img
              src="../assets/images/logos/infoS.jpg"
              alt="Africa Mart - Our story"
              loading="lazy"
            />
          </div>

          <div class="story-stamp">
            <span>ROOTED IN</span>
            <strong>AFRICA</strong>
            <span>MADE WITH LOVE</span>
          </div>

          <div class="story-decoration"></div>
        </div>

        <div class="story-content">
          <span class="section-label">OUR STORY</span>

          <h2>
            Rooted in culture.
            <span>Driven by passion.</span>
          </h2>

          <div class="heading-line"></div>

          <p>
            Africa Mart was born from a simple passion:
            sharing the richness of African culture through
            authentic food and traditional products.
          </p>

          <p>
            We believe that food is more than nourishment.
            It is a connection to our roots, our families,
            our memories and the traditions that bring
            communities together.
          </p>

          <p>
            From carefully selected African groceries to
            everyday essentials, our mission is to make
            authentic African products accessible while
            preserving their original character and taste.
          </p>

          <div class="story-highlight">
            <div class="highlight-icon">✦</div>

            <p>
              Every product tells a story.
              Every flavor brings us closer to home.
            </p>
          </div>

          <RouterLink to="/store" class="text-link">
            Discover our products
            <span>↗</span>
          </RouterLink>
        </div>

      </div>
    </section>


    <!-- BRAND -->
    <section class="brand-section">
      <div class="container">

        <div class="section-heading">
          <span class="section-label">THE AFRICA MART EXPERIENCE</span>

          <h2>
            A little piece of Africa,
            <span>wherever you are.</span>
          </h2>

          <p>
            Authenticity, tradition and quality are at
            the heart of everything we offer.
          </p>
        </div>

        <div class="brand-showcase">
          <div class="brand-information">
            <div class="brand-label">
              <span class="brand-dot"></span>
              OUR BRAND
            </div>

            <h3>Africa Mart</h3>

            <p>
              Your destination for authentic African groceries,
              spices, traditional ingredients and carefully
              selected everyday essentials.
            </p>

            <div class="brand-features">
              <div class="brand-feature">
                <span>✓</span>
                Authentic African products
              </div>

              <div class="brand-feature">
                <span>✓</span>
                Carefully selected essentials
              </div>

              <div class="brand-feature">
                <span>✓</span>
                A shopping experience built around you
              </div>
            </div>

            <RouterLink to="/store" class="brand-btn">
              Shop Africa Mart
              <span>↗</span>
            </RouterLink>
          </div>

          <div class="brand-visual">
            <img
              src="../assets/images/logos/logos.png"
              alt="Africa Mart logo"
              loading="lazy"
            />

            <span>AUTHENTIC AFRICAN ESSENTIALS</span>
          </div>
        </div>

      </div>
    </section>


    <!-- VALUES -->
    <section class="values-section">
      <div class="container">

        <div class="section-heading">
          <span class="section-label">WHAT WE BELIEVE IN</span>

          <h2>
            Our values.
            <span>Our promise.</span>
          </h2>

          <p>
            Three principles that guide the Africa Mart experience.
          </p>
        </div>

        <div class="values-grid">
          <article
            v-for="(value, index) in values"
            :key="value.title"
            class="value-card"
          >
            <div class="value-top">
              <div class="value-icon">
                {{ value.icon }}
              </div>

              <span class="value-number">
                {{ String(index + 1).padStart(2, "0") }}
              </span>
            </div>

            <h3>{{ value.title }}</h3>

            <p>{{ value.text }}</p>

            <div class="value-line"></div>
          </article>
        </div>

      </div>
    </section>


    <!-- MISSION -->
    <section class="mission-section">
      <div class="container mission-grid">

        <div class="mission-content">
          <span class="mission-label">OUR MISSION</span>

          <h2>
            Keeping traditions alive,
            <span>one product at a time.</span>
          </h2>

          <p>
            Our mission is to celebrate African heritage
            through the products we share, helping families
            reconnect with familiar tastes while introducing
            new generations to the richness of African culture.
          </p>

          <RouterLink to="/store" class="mission-btn">
            Explore our collection
            <span>↗</span>
          </RouterLink>
        </div>

        <div class="mission-art">
          <div class="mission-orbit orbit-one"></div>
          <div class="mission-orbit orbit-two"></div>

          <div class="mission-center">
            <span>🌍</span>
            <strong>AFRICA</strong>
            <small>OUR INSPIRATION</small>
          </div>
        </div>

      </div>
    </section>


    <!-- CUSTOMER EXPERIENCE -->
    <section class="experience-section">
      <div class="container">

        <div class="section-heading">
          <span class="section-label">WHY AFRICA MART</span>

          <h2>
            Made for the moments
            <span>that matter.</span>
          </h2>

          <p>
            More than products, we want to bring you
            a meaningful shopping experience.
          </p>
        </div>

        <div class="experience-grid">

          <div class="experience-item">
            <div class="experience-icon">🌿</div>

            <h3>Authentic selection</h3>

            <p>
              Discover familiar African ingredients
              and traditional essentials.
            </p>
          </div>

          <div class="experience-item">
            <div class="experience-icon">🤝</div>

            <h3>Customer care</h3>

            <p>
              We value your trust and aim to make
              every interaction welcoming.
            </p>
          </div>

          <div class="experience-item">
            <div class="experience-icon">🛍️</div>

            <h3>Easy shopping</h3>

            <p>
              Browse our collection and find
              the products you love.
            </p>
          </div>

          <div class="experience-item">
            <div class="experience-icon">💚</div>

            <h3>Connected to our roots</h3>

            <p>
              Sharing the flavors and traditions
              that make African culture special.
            </p>
          </div>

        </div>

      </div>
    </section>


    <!-- FINAL CTA -->
    <section class="about-cta">
      <div class="container cta-content">

        <div class="cta-badge">
          DISCOVER AFRICA MART
        </div>

        <h2>
          Bring the taste of Africa
          <span>to your home.</span>
        </h2>

        <p>
          Explore our collection of authentic African
          products and discover your next favorite.
        </p>

        <div class="cta-actions">
          <RouterLink to="/store" class="cta-primary">
            🛒 Shop our products
            <span>↗</span>
          </RouterLink>

          <RouterLink to="/contact" class="cta-secondary">
            Contact us
            <span>↗</span>
          </RouterLink>
        </div>

      </div>
    </section>

  </main>
</template>


<script setup>
import { RouterLink } from "vue-router";

const values = [
  {
    icon: "🌿",
    title: "Quality",
    text:
      "We believe in carefully selected products that bring authentic flavors and quality to your everyday life."
  },
  {
    icon: "🌍",
    title: "Culture",
    text:
      "We celebrate African heritage by sharing the ingredients, flavors and traditions that connect generations."
  },
  {
    icon: "⭐",
    title: "Experience",
    text:
      "We aim to offer a welcoming, convenient and enjoyable shopping experience for every customer."
  }
];
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap");

* {
  box-sizing: border-box;
}

.about-page {
  --green: #065f46;
  --green-dark: #022c22;
  --green-light: #059669;
  --text: #172d23;
  --muted: #789085;

  min-height: 100vh;
  overflow-x: hidden;
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


/* ============================
   HERO
============================ */
.about-hero {
  position: relative;
  overflow: hidden;
  padding: 125px 0 120px;
  background:
    radial-gradient(
      circle at 75% 25%,
      rgba(52,211,153,.2),
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

.hero-pattern {
  position: absolute;
  inset: 0;
  opacity: .25;
  background-image:
    radial-gradient(
      rgba(255,255,255,.16) 1px,
      transparent 1px
    );
  background-size: 27px 27px;
}

.hero-circle {
  position: absolute;
  width: 430px;
  height: 430px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 50%;
  pointer-events: none;
}

.circle-one {
  top: -220px;
  right: -100px;
}

.circle-two {
  bottom: -310px;
  left: -150px;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 950px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 18px;
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
  margin: 28px 0 24px;
  font-size: clamp(43px, 6vw, 76px);
  line-height: 1.1;
  letter-spacing: -2px;
}

.hero-content h1 span {
  display: block;
  color: #a7f3d0;
}

.hero-content > p {
  max-width: 660px;
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
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 53px;
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

.secondary-btn {
  border: 1px solid rgba(255,255,255,.35);
  color: white;
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-3px);
}

.secondary-btn:hover {
  background: rgba(255,255,255,.1);
}


/* ============================
   STORY
============================ */
.story-section {
  padding: 120px 0;
  background: white;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 85px;
}

.story-visual {
  position: relative;
  padding: 0 20px 25px 0;
}

.story-image {
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 570px;
  border-radius: 24px;
  background: #ecfdf5;
  box-shadow: 0 20px 50px rgba(6,78,59,.09);
}

.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-stamp {
  position: absolute;
  z-index: 2;
  right: -15px;
  bottom: -5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 170px;
  border: 7px solid white;
  border-radius: 50%;
  background: #065f46;
  color: white;
  box-shadow: 0 12px 30px rgba(6,78,59,.2);
}

.story-stamp span {
  color: #a7f3d0;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
}

.story-stamp strong {
  margin: 8px 0;
  font-family: "Outfit", sans-serif;
  font-size: 26px;
  letter-spacing: 1px;
}

.story-decoration {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 150px;
  height: 150px;
  border-radius: 22px;
  background: #d1fae5;
}

.section-label {
  color: #059669;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.story-content h2 {
  margin: 18px 0 20px;
  font-size: clamp(35px, 4vw, 52px);
  line-height: 1.13;
  letter-spacing: -1.5px;
}

.story-content h2 span {
  display: block;
  color: #059669;
}

.heading-line {
  width: 55px;
  height: 4px;
  margin-bottom: 30px;
  border-radius: 5px;
  background: #10b981;
}

.story-content > p {
  margin-bottom: 18px;
  color: #789085;
  font-size: 14px;
  line-height: 2;
}

.story-highlight {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin: 30px 0;
  padding: 22px;
  border-left: 4px solid #059669;
  border-radius: 0 12px 12px 0;
  background: #f0fdf4;
}

.highlight-icon {
  color: #059669;
  font-size: 25px;
}

.story-highlight p {
  margin: 0;
  color: #065f46;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.8;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  color: #047857;
  font-size: 13px;
  font-weight: 800;
}

.text-link:hover {
  color: #059669;
}


/* ============================
   BRAND
============================ */
.brand-section {
  padding: 110px 0;
  background: #f8faf9;
}

.section-heading {
  max-width: 700px;
  margin: 0 auto 55px;
  text-align: center;
}

.section-heading h2 {
  margin: 17px 0;
  font-size: clamp(33px, 4vw, 48px);
  line-height: 1.15;
  letter-spacing: -1px;
}

.section-heading h2 span {
  color: #059669;
}

.section-heading p {
  max-width: 550px;
  margin: 0 auto;
  color: #789085;
  font-size: 14px;
  line-height: 1.9;
}

.brand-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  min-height: 460px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 15px 45px rgba(6,78,59,.06);
}

.brand-information {
  padding: 60px;
}

.brand-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #059669;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.brand-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
}

.brand-information h3 {
  margin: 20px 0;
  font-size: 46px;
  letter-spacing: -1px;
}

.brand-information > p {
  color: #789085;
  font-size: 14px;
  line-height: 1.9;
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 28px;
}

.brand-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #334b3d;
  font-size: 12px;
  font-weight: 700;
}

.brand-feature span {
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: #d1fae5;
  color: #047857;
  font-size: 12px;
}

.brand-btn {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 35px;
  padding: 16px 24px;
  border-radius: 10px;
  background: #065f46;
  color: white;
  font-size: 12px;
  font-weight: 800;
  transition: .3s;
}

.brand-btn:hover {
  background: #047857;
  transform: translateY(-2px);
}

.brand-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  padding: 45px;
  background:
    radial-gradient(
      circle,
      rgba(110,231,183,.2),
      transparent 60%
    ),
    linear-gradient(135deg, #064e3b, #022c22);
}

.brand-visual img {
  width: min(280px, 85%);
  max-height: 280px;
  object-fit: contain;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,.2));
}

.brand-visual span {
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
  text-align: center;
}


/* ============================
   VALUES
============================ */
.values-section {
  padding: 115px 0;
  background: white;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 25px;
}

.value-card {
  padding: 35px;
  border: 1px solid #e5eee8;
  border-radius: 20px;
  background: white;
  transition: .3s;
}

.value-card:hover {
  transform: translateY(-8px);
  border-color: #a7f3d0;
  box-shadow: 0 20px 40px rgba(6,78,59,.08);
}

.value-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.value-icon {
  display: grid;
  place-items: center;
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: #ecfdf5;
  font-size: 33px;
}

.value-number {
  color: #dce9e0;
  font-family: "Outfit", sans-serif;
  font-size: 29px;
  font-weight: 900;
}

.value-card h3 {
  margin: 30px 0 15px;
  font-size: 25px;
}

.value-card p {
  min-height: 95px;
  margin: 0;
  color: #789085;
  font-size: 13px;
  line-height: 1.9;
}

.value-line {
  width: 45px;
  height: 4px;
  margin-top: 30px;
  border-radius: 5px;
  background: #10b981;
  transition: width .3s;
}

.value-card:hover .value-line {
  width: 90px;
}


/* ============================
   MISSION
============================ */
.mission-section {
  overflow: hidden;
  padding: 110px 0;
  background:
    radial-gradient(
      circle at 80% 50%,
      rgba(110,231,183,.14),
      transparent 40%
    ),
    linear-gradient(135deg, #064e3b, #022c22);
  color: white;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 80px;
}

.mission-label {
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.mission-content h2 {
  margin: 20px 0;
  font-size: clamp(35px, 4vw, 52px);
  line-height: 1.15;
}

.mission-content h2 span {
  display: block;
  color: #a7f3d0;
}

.mission-content p {
  max-width: 530px;
  color: #d1fae5;
  font-size: 14px;
  line-height: 2;
}

.mission-btn {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
  padding: 17px 25px;
  border-radius: 11px;
  background: white;
  color: #065f46;
  font-size: 12px;
  font-weight: 800;
}

.mission-btn:hover {
  background: #d1fae5;
}

.mission-art {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 390px;
}

.mission-orbit {
  position: absolute;
  border: 1px solid rgba(167,243,208,.2);
  border-radius: 50%;
}

.orbit-one {
  width: 350px;
  height: 350px;
}

.orbit-two {
  width: 270px;
  height: 270px;
  border-style: dashed;
}

.mission-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 205px;
  height: 205px;
  border: 1px solid rgba(167,243,208,.3);
  border-radius: 50%;
  background: rgba(255,255,255,.07);
  box-shadow: 0 0 60px rgba(16,185,129,.12);
}

.mission-center > span {
  font-size: 52px;
}

.mission-center strong {
  margin-top: 10px;
  font-family: "Outfit", sans-serif;
  font-size: 23px;
  letter-spacing: 2px;
}

.mission-center small {
  margin-top: 7px;
  color: #a7f3d0;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
}


/* ============================
   EXPERIENCE
============================ */
.experience-section {
  padding: 110px 0;
  background: #f8faf9;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.experience-item {
  padding: 30px 24px;
  border: 1px solid #e7efe9;
  border-radius: 17px;
  background: white;
  transition: .3s;
}

.experience-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(6,78,59,.07);
}

.experience-icon {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: #ecfdf5;
  font-size: 27px;
}

.experience-item h3 {
  margin: 25px 0 12px;
  font-size: 19px;
}

.experience-item p {
  margin: 0;
  color: #789085;
  font-size: 12px;
  line-height: 1.9;
}


/* ============================
   CTA
============================ */
.about-cta {
  padding: 115px 20px;
  background: white;
}

.cta-content {
  max-width: 800px;
  text-align: center;
}

.cta-badge {
  display: inline-block;
  padding: 10px 17px;
  border-radius: 50px;
  background: #ecfdf5;
  color: #047857;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.cta-content h2 {
  margin: 23px 0;
  font-size: clamp(36px, 5vw, 57px);
  line-height: 1.15;
  letter-spacing: -1px;
}

.cta-content h2 span {
  display: block;
  color: #059669;
}

.cta-content > p {
  max-width: 550px;
  margin: 0 auto;
  color: #789085;
  font-size: 14px;
  line-height: 1.9;
}

.cta-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 35px;
}

.cta-primary,
.cta-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 17px 25px;
  border-radius: 11px;
  font-size: 12px;
  font-weight: 800;
  transition: .3s;
}

.cta-primary {
  background: #065f46;
  color: white;
}

.cta-secondary {
  border: 1px solid #cfe5d7;
  color: #065f46;
}

.cta-primary:hover,
.cta-secondary:hover {
  transform: translateY(-3px);
}

.cta-primary:hover {
  background: #047857;
}

.cta-secondary:hover {
  background: #ecfdf5;
}


/* ============================
   RESPONSIVE
============================ */
@media (max-width: 1050px) {
  .story-grid {
    gap: 45px;
  }

  .brand-information {
    padding: 40px;
  }

  .experience-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 850px) {
  .story-grid,
  .mission-grid {
    grid-template-columns: 1fr;
    gap: 55px;
  }

  .story-visual {
    max-width: 600px;
    margin: 0 auto;
  }

  .story-image {
    height: 430px;
  }

  .brand-showcase {
    grid-template-columns: 1fr;
  }

  .brand-visual {
    min-height: 350px;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .value-card p {
    min-height: 0;
  }

  .mission-art {
    min-height: 320px;
  }
}

@media (max-width: 600px) {
  .about-hero {
    padding: 85px 0 90px;
  }

  .hero-content h1 {
    font-size: 42px;
    letter-spacing: -1px;
  }

  .hero-content > p {
    font-size: 14px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }

  .story-section {
    padding: 75px 0;
  }

  .story-image {
    height: 340px;
  }

  .story-stamp {
    right: 0;
    width: 125px;
    height: 125px;
    border-width: 5px;
  }

  .story-stamp strong {
    font-size: 19px;
  }

  .story-stamp span {
    font-size: 7px;
  }

  .brand-section,
  .values-section,
  .experience-section {
    padding: 75px 0;
  }

  .brand-information {
    padding: 30px 22px;
  }

  .brand-information h3 {
    font-size: 37px;
  }

  .brand-visual {
    min-height: 280px;
  }

  .value-card {
    padding: 27px;
  }

  .mission-section {
    padding: 75px 0;
  }

  .mission-art {
    min-height: 290px;
  }

  .orbit-one {
    width: 280px;
    height: 280px;
  }

  .orbit-two {
    width: 220px;
    height: 220px;
  }

  .mission-center {
    width: 170px;
    height: 170px;
  }

  .experience-grid {
    grid-template-columns: 1fr;
  }

  .about-cta {
    padding: 80px 15px;
  }

  .cta-actions {
    flex-direction: column;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
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
