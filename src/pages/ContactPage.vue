
<template>
  <main class="contact-page">

    <!-- HERO -->
    <section class="contact-hero">
      <div class="hero-pattern"></div>

      <div class="container hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          WE'D LOVE TO HEAR FROM YOU
        </div>

        <h1>
          Let's get
          <span>in touch.</span>
        </h1>

        <p>
          Have a question about our products, your order,
          or Africa Mart? Our team is here to help.
        </p>

        <div class="hero-actions">
          <a href="#contact-form" class="hero-primary">
            Send a message
            <span>↗</span>
          </a>

          <a href="#contact-info" class="hero-secondary">
            Contact information
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>


    <!-- QUICK CONTACT -->
    <section id="contact-info" class="quick-contact">
      <div class="container quick-grid">

        <div class="quick-card">
          <div class="quick-icon">
            <svg viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8">
              <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>

          <div>
            <span>OUR LOCATION</span>
            <h3>{{ contactInfo.location }}</h3>
            <p>Visit or contact our team</p>
          </div>
        </div>

        <div class="quick-card">
          <div class="quick-icon">
            <svg viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2
                19.8 19.8 0 0 1-8.6-3.1
                19.5 19.5 0 0 1-6-6
                19.8 19.8 0 0 1-3.1-8.7
                A2 2 0 0 1 4.1 2h3
                a2 2 0 0 1 2 1.7l.5 2.8
                a2 2 0 0 1-.6 1.8L7.1 10
                a16 16 0 0 0 6 6l1.7-1.9
                a2 2 0 0 1 1.8-.6l2.8.5
                a2 2 0 0 1 1.6 2.9Z"/>
            </svg>
          </div>

          <div>
            <span>PHONE & WHATSAPP</span>
            <h3>{{ contactInfo.phone || "Contact us online" }}</h3>
            <p>Questions and order assistance</p>
          </div>
        </div>

        <div class="quick-card">
          <div class="quick-icon">
            <svg viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m2 6 10 7 10-7"/>
            </svg>
          </div>

          <div>
            <span>EMAIL US</span>
            <h3>{{ contactInfo.email || "Send us a message" }}</h3>
            <p>We'll get back to you</p>
          </div>
        </div>

      </div>
    </section>


    <!-- MAIN CONTACT -->
    <section id="contact-form" class="contact-main">
      <div class="container contact-grid">

        <!-- LEFT -->
        <div class="contact-intro">
          <span class="section-label">CONTACT AFRICA MART</span>

          <h2>
            We're always
            <span>happy to help.</span>
          </h2>

          <p class="intro-text">
            Whether you're looking for an authentic African
            product, need assistance with an order, or simply
            want to learn more about Africa Mart, we'd love
            to hear from you.
          </p>

          <div class="contact-benefits">
            <div class="benefit">
              <div class="benefit-icon">✓</div>
              <div>
                <strong>Product inquiries</strong>
                <p>Ask about availability, formats and prices.</p>
              </div>
            </div>

            <div class="benefit">
              <div class="benefit-icon">✓</div>
              <div>
                <strong>Order assistance</strong>
                <p>Get help with your shopping experience.</p>
              </div>
            </div>

            <div class="benefit">
              <div class="benefit-icon">✓</div>
              <div>
                <strong>Customer support</strong>
                <p>Share your questions, comments and feedback.</p>
              </div>
            </div>
          </div>

          <div class="brand-card">
            <img
              src="../assets/images/logos/infoS.jpg"
              alt="Africa Mart"
            />

            <div class="brand-card-content">
              <span>AFRICA MART</span>
              <h3>Authentic African essentials.</h3>
              <p>Culture, quality and tradition.</p>
            </div>
          </div>
        </div>


        <!-- FORM -->
        <div class="form-card">
          <div class="form-header">
            <div class="form-icon">✉</div>

            <div>
              <span>LET'S CONNECT</span>
              <h2>Send us a message</h2>
              <p>Fill in the form below to contact our team.</p>
            </div>
          </div>

          <div
            v-if="successMessage"
            class="feedback success-feedback"
            role="status"
          >
            <span>✓</span>
            {{ successMessage }}
          </div>

          <div
            v-if="errorMessage"
            class="feedback error-feedback"
            role="alert"
          >
            <span>!</span>
            {{ errorMessage }}
          </div>

          <form @submit.prevent="submitContact">

            <div class="form-row">
              <div class="form-group">
                <label for="contact-name">
                  Full name <span>*</span>
                </label>

                <input
                  id="contact-name"
                  v-model.trim="form.name"
                  type="text"
                  placeholder="Your full name"
                  autocomplete="name"
                  maxlength="100"
                  required
                />
              </div>

              <div class="form-group">
                <label for="contact-email">
                  Email address <span>*</span>
                </label>

                <input
                  id="contact-email"
                  v-model.trim="form.email"
                  type="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  maxlength="150"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="contact-phone">
                  Phone number
                </label>

                <input
                  id="contact-phone"
                  v-model.trim="form.phone"
                  type="tel"
                  placeholder="Your phone number"
                  autocomplete="tel"
                  maxlength="30"
                />
              </div>

              <div class="form-group">
                <label for="contact-subject">
                  Subject <span>*</span>
                </label>

                <select
                  id="contact-subject"
                  v-model="form.subject"
                  required
                >
                  <option value="" disabled>
                    Select a subject
                  </option>

                  <option value="Product inquiry">
                    Product inquiry
                  </option>

                  <option value="Order assistance">
                    Order assistance
                  </option>

                  <option value="Availability">
                    Product availability
                  </option>

                  <option value="Partnership">
                    Partnership
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="contact-message">
                Your message <span>*</span>
              </label>

              <textarea
                id="contact-message"
                v-model.trim="form.message"
                rows="6"
                placeholder="Tell us how we can help..."
                maxlength="3000"
                required
              ></textarea>

              <small>
                {{ form.message.length }} / 3000 characters
              </small>
            </div>

            <button
              class="submit-btn"
              type="submit"
              :disabled="loading"
            >
              <template v-if="loading">
                <span class="spinner"></span>
                Sending message...
              </template>

              <template v-else>
                Send message
                <span>↗</span>
              </template>
            </button>

            <p class="form-note">
              Your information will only be used to
              respond to your inquiry.
            </p>

          </form>
        </div>

      </div>
    </section>


    <!-- WHATSAPP -->
    <section class="whatsapp-section">
      <div class="container whatsapp-grid">

        <div class="whatsapp-content">
          <div class="whatsapp-label">
            <span class="online-dot"></span>
            QUICK SUPPORT
          </div>

          <h2>
            Prefer to chat
            <span>directly?</span>
          </h2>

          <p>
            Have a quick question about a product
            or an order? Reach our team through WhatsApp.
          </p>

          <a
            v-if="whatsappLink"
            :href="whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-btn"
          >
            <span>💬</span>
            Chat on WhatsApp
            <span>↗</span>
          </a>

          <RouterLink
            v-else
            to="/store"
            class="whatsapp-btn"
          >
            Explore our store
            <span>↗</span>
          </RouterLink>
        </div>

        <div class="whatsapp-visual">
          <div class="chat-card">
            <div class="chat-header">
              <div class="chat-avatar">AM</div>

              <div>
                <strong>Africa Mart</strong>
                <span>Customer support</span>
              </div>

              <span class="chat-status">●</span>
            </div>

            <div class="chat-body">
              <div class="chat-message incoming">
                Hello! Welcome to Africa Mart.
                How can we help you today?
              </div>

              <div class="chat-message outgoing">
                Hi! I'd like to know more
                about your products.
              </div>

              <div class="chat-message incoming">
                We'd be happy to help! 💚
              </div>
            </div>

            <div class="chat-footer">
              <span>Type a message...</span>
              <span>➤</span>
            </div>
          </div>
        </div>

      </div>
    </section>


    <!-- FINAL CTA -->
    <section class="contact-bottom">
      <div class="container bottom-content">
        <span class="section-label">DISCOVER AFRICA MART</span>

        <h2>
          Looking for something special?
        </h2>

        <p>
          Browse our authentic African products
          and find exactly what you need.
        </p>

        <RouterLink to="/store" class="store-btn">
          🛒 Explore our store
          <span>↗</span>
        </RouterLink>
      </div>
    </section>

  </main>
</template>


<script setup>
import {
  ref,
  reactive,
  computed
} from "vue";

import { RouterLink } from "vue-router";

import { db } from "../firebase";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";


// ==============================
// CONTACT INFORMATION
// ==============================
// Replace these values with your
// business's verified information.
const contactInfo = reactive({
  location: "Contact us for our location",
  phone: "",
  email: ""
});


// WhatsApp number:
// International format, digits only.
// Example: "2376XXXXXXXX"
const whatsappNumber = "";

const whatsappLink = computed(() => {
  const number = whatsappNumber.replace(/\D/g, "");

  if (!number) return "";

  const message = encodeURIComponent(
    "Hello Africa Mart! I'd like to know more about your products."
  );

  return `https://wa.me/${number}?text=${message}`;
});


// ==============================
// FORM
// ==============================
const form = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
});

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");


// ==============================
// SUBMIT
// ==============================
async function submitContact() {
  if (loading.value) return;

  successMessage.value = "";
  errorMessage.value = "";

  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.subject ||
    !form.message.trim()
  ) {
    errorMessage.value =
      "Please complete all required fields.";
    return;
  }

  if (form.message.trim().length < 10) {
    errorMessage.value =
      "Please write a message of at least 10 characters.";
    return;
  }

  loading.value = true;

  try {
    await addDoc(
      collection(db, "contactMessages"),
      {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
        status: "unread",
        createdAt: serverTimestamp()
      }
    );

    successMessage.value =
      "Your message has been sent successfully! We'll get back to you soon.";

    Object.assign(form, {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

  } catch (error) {
    console.error(
      "Error sending contact message:",
      error
    );

    errorMessage.value =
      "Unable to send your message. Please try again later.";

  } finally {
    loading.value = false;
  }
}
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap");

* {
  box-sizing: border-box;
}

.contact-page {
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

button,
input,
select,
textarea {
  font-family: inherit;
}


/* HERO */
.contact-hero {
  position: relative;
  overflow: hidden;
  padding: 115px 0 110px;
  background:
    radial-gradient(
      circle at 75% 30%,
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
  opacity: .2;
  background-image:
    radial-gradient(
      rgba(255,255,255,.15) 1px,
      transparent 1px
    );
  background-size: 26px 26px;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
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
  letter-spacing: 1.4px;
}

.badge-dot,
.online-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6ee7b7;
}

.hero-content h1 {
  margin: 27px 0 20px;
  font-size: clamp(46px, 6vw, 78px);
  line-height: 1.08;
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

.hero-primary,
.hero-secondary {
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

.hero-primary {
  background: white;
  color: #065f46;
}

.hero-secondary {
  border: 1px solid rgba(255,255,255,.35);
  color: white;
}

.hero-primary:hover,
.hero-secondary:hover {
  transform: translateY(-3px);
}

.hero-secondary:hover {
  background: rgba(255,255,255,.1);
}


/* QUICK CONTACT */
.quick-contact {
  position: relative;
  z-index: 2;
  margin-top: -45px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.quick-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
  padding: 28px 24px;
  border: 1px solid #e7efe9;
  border-radius: 17px;
  background: white;
  box-shadow: 0 15px 40px rgba(6,78,59,.08);
}

.quick-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 13px;
  background: #ecfdf5;
  color: #047857;
}

.quick-icon svg {
  width: 23px;
  height: 23px;
}

.quick-card > div:last-child {
  min-width: 0;
}

.quick-card span {
  color: #059669;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1.2px;
}

.quick-card h3 {
  overflow-wrap: anywhere;
  margin: 10px 0 7px;
  color: #172d23;
  font-size: 17px;
}

.quick-card p {
  margin: 0;
  color: #94a3b8;
  font-size: 11px;
}


/* MAIN */
.contact-main {
  padding: 125px 0;
  background: white;
}

.contact-grid {
  display: grid;
  grid-template-columns: .9fr 1.1fr;
  align-items: start;
  gap: 75px;
}

.section-label {
  color: #059669;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.contact-intro h2 {
  margin: 18px 0 23px;
  font-size: clamp(35px, 4vw, 52px);
  line-height: 1.13;
  letter-spacing: -1.5px;
}

.contact-intro h2 span {
  display: block;
  color: #059669;
}

.intro-text {
  color: #789085;
  font-size: 14px;
  line-height: 2;
}

.contact-benefits {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 35px;
}

.benefit {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.benefit-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #d1fae5;
  color: #047857;
  font-size: 15px;
  font-weight: 900;
}

.benefit strong {
  color: #172d23;
  font-size: 14px;
}

.benefit p {
  margin: 7px 0 0;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.7;
}

.brand-card {
  position: relative;
  overflow: hidden;
  margin-top: 45px;
  border-radius: 19px;
  background: #064e3b;
}

.brand-card img {
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.brand-card-content {
  padding: 23px;
  color: white;
}

.brand-card-content span {
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.brand-card-content h3 {
  margin: 10px 0;
  font-size: 22px;
}

.brand-card-content p {
  margin: 0;
  color: #d1fae5;
  font-size: 12px;
}


/* FORM */
.form-card {
  padding: 38px;
  border: 1px solid #e4ede7;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 20px 55px rgba(6,78,59,.07);
}

.form-header {
  display: flex;
  align-items: flex-start;
  gap: 17px;
  margin-bottom: 35px;
}

.form-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 14px;
  background: #ecfdf5;
  color: #047857;
  font-size: 25px;
}

.form-header > div:last-child {
  min-width: 0;
}

.form-header span {
  color: #059669;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.4px;
}

.form-header h2 {
  margin: 8px 0;
  font-size: 26px;
}

.form-header p {
  margin: 0;
  color: #94a3b8;
  font-size: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 17px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 21px;
}

.form-group label {
  color: #334b3d;
  font-size: 12px;
  font-weight: 800;
}

.form-group label span {
  color: #ef4444;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  min-width: 0;
  padding: 14px 15px;
  border: 1px solid #e2eae4;
  border-radius: 10px;
  outline: none;
  background: #f8faf9;
  color: #172d23;
  font-size: 13px;
  transition: border-color .2s, background .2s;
}

.form-group input,
.form-group select {
  height: 49px;
}

.form-group textarea {
  resize: vertical;
  min-height: 145px;
  line-height: 1.7;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #059669;
  background: white;
  box-shadow: 0 0 0 3px rgba(16,185,129,.08);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #a5b4ab;
}

.form-group small {
  align-self: flex-end;
  color: #94a3b8;
  font-size: 10px;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  min-height: 54px;
  border: none;
  border-radius: 11px;
  background: linear-gradient(135deg, #065f46, #059669);
  color: white;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: .3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(6,95,70,.2);
}

.submit-btn:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.form-note {
  margin: 17px 0 0;
  color: #94a3b8;
  font-size: 11px;
  line-height: 1.7;
  text-align: center;
}

.feedback {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 23px;
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 1.6;
}

.success-feedback {
  background: #ecfdf5;
  color: #047857;
}

.error-feedback {
  background: #fef2f2;
  color: #b91c1c;
}

.feedback span {
  font-weight: 900;
}


/* WHATSAPP */
.whatsapp-section {
  overflow: hidden;
  padding: 100px 0;
  background:
    radial-gradient(
      circle at 80% 40%,
      rgba(110,231,183,.15),
      transparent 40%
    ),
    #064e3b;
  color: white;
}

.whatsapp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 90px;
}

.whatsapp-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.whatsapp-content h2 {
  margin: 20px 0;
  font-size: clamp(35px, 4vw, 52px);
  line-height: 1.15;
}

.whatsapp-content h2 span {
  display: block;
  color: #a7f3d0;
}

.whatsapp-content p {
  max-width: 460px;
  color: #d1fae5;
  font-size: 14px;
  line-height: 1.9;
}

.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  margin-top: 25px;
  padding: 17px 25px;
  border-radius: 11px;
  background: white;
  color: #065f46;
  font-size: 12px;
  font-weight: 800;
  transition: .25s;
}

.whatsapp-btn:hover {
  transform: translateY(-3px);
  background: #d1fae5;
}

.whatsapp-visual {
  display: flex;
  justify-content: center;
}

.chat-card {
  width: min(380px, 100%);
  overflow: hidden;
  border-radius: 20px;
  background: #f0f5f1;
  color: #172d23;
  box-shadow: 0 25px 60px rgba(0,0,0,.18);
  transform: rotate(3deg);
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 17px;
  background: #075e46;
  color: white;
}

.chat-avatar {
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: #d1fae5;
  color: #065f46;
  font-size: 13px;
  font-weight: 900;
}

.chat-header > div:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.chat-header strong {
  font-size: 13px;
}

.chat-header span {
  color: #d1fae5;
  font-size: 10px;
}

.chat-status {
  margin-left: auto;
  color: #6ee7b7 !important;
}

.chat-body {
  display: flex;
  flex-direction: column;
  gap: 13px;
  min-height: 270px;
  padding: 25px 18px;
}

.chat-message {
  max-width: 83%;
  padding: 12px 15px;
  border-radius: 12px;
  font-size: 11px;
  line-height: 1.7;
}

.chat-message.incoming {
  align-self: flex-start;
  background: white;
}

.chat-message.outgoing {
  align-self: flex-end;
  background: #d1fae5;
}

.chat-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 15px 15px;
  padding: 13px 17px;
  border-radius: 30px;
  background: white;
  color: #94a3b8;
  font-size: 11px;
}

.chat-footer span:last-child {
  color: #059669;
  font-size: 18px;
}


/* BOTTOM */
.contact-bottom {
  padding: 100px 20px;
  background: #f8faf9;
}

.bottom-content {
  max-width: 700px;
  text-align: center;
}

.bottom-content h2 {
  margin: 18px 0;
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.2;
}

.bottom-content p {
  max-width: 520px;
  margin: 0 auto;
  color: #789085;
  font-size: 14px;
  line-height: 1.9;
}

.store-btn {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 17px 27px;
  border-radius: 11px;
  background: #065f46;
  color: white;
  font-size: 12px;
  font-weight: 800;
}

.store-btn:hover {
  background: #047857;
}


/* RESPONSIVE */
@media (max-width: 1050px) {
  .contact-grid {
    gap: 40px;
  }

  .whatsapp-grid {
    gap: 40px;
  }
}

@media (max-width: 850px) {
  .quick-grid {
    grid-template-columns: 1fr;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .contact-intro {
    max-width: 650px;
  }

  .brand-card {
    max-width: 500px;
  }

  .whatsapp-grid {
    grid-template-columns: 1fr;
    gap: 65px;
  }

  .whatsapp-content {
    text-align: center;
  }

  .whatsapp-content p {
    margin-left: auto;
    margin-right: auto;
  }

  .chat-card {
    transform: none;
  }
}

@media (max-width: 600px) {
  .contact-hero {
    padding: 85px 0 95px;
  }

  .hero-content h1 {
    font-size: 46px;
  }

  .hero-content > p {
    font-size: 14px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-primary,
  .hero-secondary {
    width: 100%;
  }

  .quick-contact {
    margin-top: -30px;
  }

  .quick-card {
    padding: 22px;
  }

  .contact-main {
    padding: 75px 0;
  }

  .form-card {
    padding: 25px 18px;
  }

  .form-header {
    gap: 12px;
  }

  .form-header h2 {
    font-size: 23px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .brand-card img {
    height: 200px;
  }

  .whatsapp-section {
    padding: 75px 0;
  }

  .chat-card {
    width: 100%;
  }

  .contact-bottom {
    padding: 75px 15px;
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
