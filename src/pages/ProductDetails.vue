
<template>
  <main class="detail-page">
    <div class="container">
      <div class="top-bar">
        <RouterLink to="/store" class="back-link">
          ← Back to store
        </RouterLink>

        <RouterLink to="/cart" class="cart-link">
          🛒 Cart ({{ cartCount }})
        </RouterLink>
      </div>

      <div v-if="loading" class="message">
        Loading product...
      </div>

      <div v-else-if="errorMessage" class="message">
        {{ errorMessage }}
      </div>

      <div v-else-if="product" class="product-layout">

        <!-- IMAGE -->
        <div class="image-panel">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
          />

          <div v-else class="placeholder">
            📦
          </div>
        </div>

        <!-- INFORMATIONS -->
        <div class="details-panel">
          <span class="eyebrow">
            AFRICA MART COLLECTION
          </span>

          <h1>{{ product.name }}</h1>

          <div class="availability">
            <span class="dot"></span>
            Available
          </div>

          <p class="description">
            {{ product.description ||
              "Discover authentic African quality, carefully selected for your home." }}
          </p>

          <div class="information">
            <div>
              <span>Units per carton</span>
              <strong>{{ unitsPerCarton }}</strong>
            </div>

            <div>
              <span>Product availability</span>
              <strong>Available</strong>
            </div>
          </div>

          <h3>Choose your purchase option</h3>

          <div class="purchase-options">

            <!-- PRIX UNITAIRE -->
            <button
              type="button"
              class="option"
              :class="{ selected: mode === 'unit' }"
              :disabled="!hasUnitPrice"
              @click="changeMode('unit')"
            >
              <span>Buy by unit</span>

              <strong>
                {{ formatMoney(product.boxPrice) }}
              </strong>

              <small>Per piece</small>
            </button>

            <!-- PRIX CARTON POUR GROSSISTES -->
            <button
              v-if="hasCartonPrice"
              type="button"
              class="option"
              :class="{ selected: mode === 'carton' }"
              @click="changeMode('carton')"
            >
              <span>📦 Buy by carton</span>

              <strong>
                {{ formatMoney(product.cartonPrice) }}
              </strong>

              <small>{{ unitsPerCarton }} pieces per carton</small>
            </button>

            <!-- PRIX CARTON VERROUILLÉ -->
            <div
              v-else
              class="option carton-locked"
            >
              <span>🔒 Buy by carton</span>

              <strong>Wholesale only</strong>

              <small>
                Reserved for registered wholesalers
              </small>

              <RouterLink to="/store">
                Sign in as a wholesaler →
              </RouterLink>
            </div>

          </div>

          <!-- RÉCAPITULATIF -->
          <div class="purchase-summary">

            <div class="quantity-control">
              <button
                type="button"
                :disabled="quantity <= 1"
                @click="quantity--"
              >
                −
              </button>

              <span>{{ quantity }}</span>

              <button
                type="button"
                @click="quantity++"
              >
                +
              </button>
            </div>

            <div class="total">
              <small>
                Total price
                ({{ mode === 'carton' ? 'Cartons' : 'Units' }})
              </small>

              <strong>
                {{ formatMoney(total) }}
              </strong>
            </div>

          </div>

          <p v-if="feedback" class="feedback">
            {{ feedback }}
          </p>

          <!-- AJOUT AU PANIER -->
          <button
            class="add-button"
            type="button"
            :disabled="!selectedPrice"
            @click="addProduct"
          >
            🛒 Add to cart
          </button>

          <RouterLink to="/cart" class="checkout-link">
            View my cart →
          </RouterLink>

          <div class="benefits">
            <div>✓ Authentic African products</div>
            <div>✓ Quality carefully selected</div>
            <div>✓ Easy online ordering</div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>



<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted
} from "vue";

import {
  useRoute,
  RouterLink
} from "vue-router";

import { db } from "../firebase";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import { useCart } from "../composables/useCart";

const route = useRoute();
const auth = getAuth();

const {
  cartCount,
  addToCart
} = useCart();

// =====================================
// ÉTATS
// =====================================

const product = ref(null);
const wholesaleProfile = ref(null);

const loading = ref(true);
const errorMessage = ref("");
const feedback = ref("");

const mode = ref("unit");
const quantity = ref(1);

let unsubscribeAuth = null;

// =====================================
// INFORMATIONS PRODUIT
// =====================================

const unitsPerCarton = computed(() =>
  Math.max(
    1,
    Number(product.value?.boxesPerCarton) || 1
  )
);

// =====================================
// CONTRÔLE DES PRIX
// =====================================

// Prix unitaire accessible à tous
const hasUnitPrice = computed(() =>
  Number(product.value?.boxPrice) > 0
);

// Prix carton directement depuis products
const hasCartonPrice = computed(() =>
  wholesaleProfile.value?.accountType === "wholesale" &&
  Number(product.value?.cartonPrice) > 0
);

// Prix de l'achat sélectionné
const selectedPrice = computed(() => {
  if (mode.value === "unit") {
    return Number(product.value?.boxPrice) || 0;
  }

  if (mode.value === "carton" && hasCartonPrice.value) {
    return Number(product.value?.cartonPrice) || 0;
  }

  return 0;
});

// Total
const total = computed(() =>
  selectedPrice.value * quantity.value
);

// =====================================
// FORMATAGE
// =====================================

function formatMoney(value) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(Number(value) || 0);
}

// =====================================
// CHANGEMENT DU MODE D'ACHAT
// =====================================

function changeMode(value) {
  if (value === "carton" && !hasCartonPrice.value) {
    feedback.value =
      "Only registered wholesalers can purchase by carton.";
    return;
  }

  if (value === "unit" && !hasUnitPrice.value) {
    feedback.value = "Unit price is unavailable.";
    return;
  }

  mode.value = value;
  quantity.value = 1;
  feedback.value = "";
}

// =====================================
// CHARGEMENT DU PRODUIT
// =====================================

async function loadProduct() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const snapshot = await getDoc(
      doc(db, "products", String(route.params.id))
    );

    if (!snapshot.exists()) {
      product.value = null;
      errorMessage.value = "Product not found.";
      return;
    }

    const data = snapshot.data();

    // Les deux prix proviennent de products
    product.value = {
      ...data,
      id: snapshot.id,
      boxPrice: Number(data.boxPrice) || 0,
      cartonPrice: Number(data.cartonPrice) || 0,
      boxesPerCarton: Number(data.boxesPerCarton) || 1
    };

    mode.value = hasUnitPrice.value ? "unit" : "carton";
    quantity.value = 1;

  } catch (error) {
    console.error("Product loading error:", error);

    errorMessage.value =
      "Unable to load this product.";

  } finally {
    loading.value = false;
  }
}

// =====================================
// VÉRIFICATION DU COMPTE GROSSISTE
// =====================================

async function loadWholesaleAccess(user) {
  wholesaleProfile.value = null;

  if (!user) {
    if (mode.value === "carton") {
      mode.value = "unit";
    }

    return;
  }

  try {
    const profileSnapshot = await getDoc(
      doc(db, "wholesaleCustomers", user.uid)
    );

    if (!profileSnapshot.exists()) {
      return;
    }

    const profileData = profileSnapshot.data();

    if (profileData.accountType !== "wholesale") {
      return;
    }

    wholesaleProfile.value = {
      ...profileData,
      uid: user.uid
    };

    // Le prix carton est déjà dans product.cartonPrice
    if (
      !hasUnitPrice.value &&
      hasCartonPrice.value
    ) {
      mode.value = "carton";
    }

  } catch (error) {
    console.error(
      "Wholesale access loading error:",
      error
    );

    wholesaleProfile.value = null;

    feedback.value =
      "Unable to verify your wholesale account.";
  }
}

// =====================================
// AJOUT AU PANIER
// =====================================

function addProduct() {
  if (!product.value) return;

  if (!selectedPrice.value) {
    feedback.value =
      "This purchase option has no valid price.";
    return;
  }

  if (
    mode.value === "carton" &&
    !hasCartonPrice.value
  ) {
    feedback.value =
      "Only registered wholesalers can purchase by carton.";
    return;
  }

  try {
    // On ne transmet pas le prix carton
    // dans le panier d'un achat unitaire.
    const {
      cartonPrice,
      ...publicProduct
    } = product.value;

    const cartProduct = {
      ...publicProduct
    };

    // Ajout du prix carton uniquement
    // pour une commande grossiste par carton.
    if (mode.value === "carton") {
      cartProduct.cartonPrice =
        Number(product.value.cartonPrice);
    }

    addToCart(
      cartProduct,
      mode.value,
      quantity.value
    );

    feedback.value =
      "Product successfully added to your cart!";

  } catch (error) {
    console.error("Cart error:", error);

    feedback.value =
      error?.message ||
      "Unable to add this product to your cart.";
  }
}

// =====================================
// INITIALISATION
// =====================================

onMounted(async () => {
  // Charger d'abord le produit pour éviter
  // une vérification grossiste avant son chargement.
  await loadProduct();

  unsubscribeAuth = onAuthStateChanged(
    auth,
    async (user) => {
      await loadWholesaleAccess(user);
    }
  );
});

// =====================================
// NETTOYAGE
// =====================================

onUnmounted(() => {
  if (unsubscribeAuth) {
    unsubscribeAuth();
  }
});
</script>


<style scoped>
* {
  box-sizing: border-box;
}

.detail-page {
  min-height: 100vh;
  padding: 40px 0 90px;
  background: #f8faf9;
  color: #142b23;
  font-family: Inter, Poppins, sans-serif;
}

.container {
  width: min(1150px, 92%);
  margin-top: 70px !important;
  margin: auto;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 35px;
}

.back-link,
.cart-link {
  color: #065f46;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 55px;
  align-items: start;
}

.image-panel {
  display: grid;
  place-items: center;
  min-height: 510px;
  padding: 35px;
  border: 1px solid #e4eee8;
  border-radius: 25px;
  background: #edf7f0;
}

.image-panel img {
  width: 100%;
  max-height: 450px;
  object-fit: contain;
}

.placeholder {
  font-size: 100px;
}

.details-panel {
  padding: 15px 0;
}

.eyebrow {
  color: #059669;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 2px;
}

h1 {
  margin: 16px 0;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.15;
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border-radius: 30px;
  background: #d1fae5;
  color: #047857;
  font-size: 11px;
  font-weight: 800;
}

.availability.unavailable {
  background: #fee2e2;
  color: #b91c1c;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.description {
  margin: 24px 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.9;
}

.information {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.information > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 17px;
  border: 1px solid #e5ede8;
  border-radius: 13px;
  background: white;
}

.information span {
  color: #94a3b8;
  font-size: 11px;
}

.information strong {
  color: #065f46;
  font-size: 14px;
}

h3 {
  margin: 0 0 15px;
  font-size: 16px;
}

.purchase-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  padding: 18px;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  background: white;
  cursor: pointer;
  text-align: left;
  min-width: 0;
}

.option.selected {
  border-color: #059669;
  background: #ecfdf5;
}

.option:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.option span {
  color: #64748b;
  font-size: 12px;
}

.option strong {
  color: #065f46;
  font-size: 22px;
}

.option small {
  color: #94a3b8;
}

/* OPTION CARTON VERROUILLÉE */

.carton-locked {
  cursor: default;
  background: #f1f5f9;
  border-color: #e2e8f0;
}

.carton-locked strong {
  color: #64748b;
  font-size: 17px;
}

.carton-locked small {
  line-height: 1.5;
}

.carton-locked a {
  margin-top: 5px;
  color: #059669;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
}

.carton-locked a:hover {
  text-decoration: underline;
}

.purchase-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 28px 0;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 7px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: white;
}

.quantity-control button {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 8px;
  background: #ecfdf5;
  color: #065f46;
  font-size: 20px;
  cursor: pointer;
}

.quantity-control button:disabled {
  opacity: .35;
  cursor: not-allowed;
}

.total {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
}

.total small {
  color: #94a3b8;
}

.total strong {
  color: #065f46;
  font-size: 25px;
}

.add-button {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 12px;
  background: #065f46;
  color: white;
  font-size: 14px;
  font-weight: 850;
  cursor: pointer;
}

.add-button:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.checkout-link {
  display: block;
  margin: 20px 0;
  color: #059669;
  font-size: 13px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
}

.feedback {
  color: #047857;
  font-size: 12px;
  font-weight: 700;
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 12px;
}

.message {
  padding: 50px;
  text-align: center;
  color: #64748b;
}

@media (max-width: 800px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .image-panel {
    min-height: 340px;
  }
}

@media (max-width: 450px) {
  .detail-page {
    padding-top: 25px;
  }

  .purchase-options {
    gap: 9px;
  }

  .option {
    padding: 12px;
  }

  .option strong {
    font-size: 18px;
  }
}
</style>