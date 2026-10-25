
<template>
  <main class="cart-page">
    <div class="container">
      <div class="page-heading">
        <div>
          <span class="eyebrow">
            AFRICA MART CHECKOUT
          </span>

          <h1>Shopping cart</h1>

          <p>
            Review your items and complete your order.
          </p>
        </div>

        <RouterLink to="/store" class="continue-link">
          ← Continue shopping
        </RouterLink>
      </div>

      <!-- CONFIRMATION -->
      <div v-if="confirmedOrder" class="success-panel">
        <div class="success-icon">✓</div>

        <h2>Order received!</h2>

        <p>
          Thank you, {{ confirmedOrder.name }}.
          Your order has been submitted successfully.
        </p>

        <div class="confirmation-number">
          Order reference:
          <strong>{{ confirmedOrder.id }}</strong>
        </div>

        <p>
          Our team will contact you to confirm
          availability, delivery and payment.
        </p>

        <RouterLink to="/store" class="primary-link">
          Back to store
        </RouterLink>
      </div>

      <div v-else-if="!cart.length" class="empty-cart">
        <div class="empty-icon">🛒</div>

        <h2>Your cart is empty</h2>

        <p>
          Discover our selection of authentic African products.
        </p>

        <RouterLink to="/store" class="primary-link">
          Explore products
        </RouterLink>
      </div>

      <div v-else class="checkout-grid">
        <!-- ARTICLES -->
        <section class="panel items-panel">
          <div class="panel-heading">
            <h2>My items</h2>

            <span>{{ cartCount }} item(s)</span>
          </div>

          <div
            v-for="item in cart"
            :key="item.key"
            class="cart-item"
          >
            <div class="item-image">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
              />

              <span v-else>📦</span>
            </div>

            <div class="item-details">
              <h3>{{ item.name }}</h3>

              <span class="item-mode">
                {{
                  item.mode === "carton"
                    ? "By carton"
                    : "By unit"
                }}
              </span>

              <div class="item-price">
                {{ formatMoney(item.price) }}
                / {{ item.mode === "carton" ? "carton" : "unit" }}
              </div>

              <div class="item-actions">
                <div class="quantity-control">
                  <button
                    type="button"
                    @click="updateQuantity(item.key, item.quantity - 1)"
                  >
                    −
                  </button>

                  <strong>{{ item.quantity }}</strong>

                  <button
                    type="button"
                    @click="updateQuantity(item.key, item.quantity + 1)"
                  >
                    +
                  </button>
                </div>

                <button
                  class="remove-button"
                  type="button"
                  @click="removeFromCart(item.key)"
                >
                  Remove
                </button>
              </div>
            </div>

            <strong class="line-total">
              {{ formatMoney(item.price * item.quantity) }}
            </strong>
          </div>

          <div class="items-footer">
            <RouterLink to="/store">
              + Add more products
            </RouterLink>
          </div>
        </section>

        <!-- COMMANDE -->
        <div class="checkout-column">
          <section class="panel summary-panel">
            <h2>Order summary</h2>

            <div class="summary-row">
              <span>Subtotal</span>
              <strong>{{ formatMoney(cartTotal) }}</strong>
            </div>

            <div class="summary-row">
              <span>Delivery</span>
              <strong>To be confirmed</strong>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span>Products total</span>
              <strong>{{ formatMoney(cartTotal) }}</strong>
            </div>

            <p class="summary-note">
              Delivery fees and final availability
              will be confirmed by our team.
            </p>
          </section>

          <section class="panel customer-panel">
            <h2>Delivery information</h2>

            <form @submit.prevent="submitOrder">
              <div class="form-group">
                <label for="customer-name">
                  Full name *
                </label>

                <input
                  id="customer-name"
                  v-model.trim="customer.name"
                  required
                  maxlength="100"
                  placeholder="Your full name"
                />
              </div>

              <div class="form-group">
                <label for="customer-phone">
                  Phone number *
                </label>

                <input
                  id="customer-phone"
                  v-model.trim="customer.phone"
                  type="tel"
                  required
                  maxlength="30"
                  placeholder="Your phone number"
                />
              </div>

              <div class="form-group">
                <label for="customer-email">
                  Email (optional)
                </label>

                <input
                  id="customer-email"
                  v-model.trim="customer.email"
                  type="email"
                  maxlength="150"
                  placeholder="your@email.com"
                />
              </div>

              <div class="form-group">
                <label for="customer-address">
                  Delivery address *
                </label>

                <textarea
                  id="customer-address"
                  v-model.trim="customer.address"
                  required
                  maxlength="500"
                  rows="3"
                  placeholder="Street, city, postal code..."
                ></textarea>
              </div>

              <div class="form-group">
                <label for="customer-notes">
                  Order notes
                </label>

                <textarea
                  id="customer-notes"
                  v-model.trim="customer.notes"
                  maxlength="1000"
                  rows="3"
                  placeholder="Additional instructions..."
                ></textarea>
              </div>

              <div
                v-if="errorMessage"
                class="error-message"
                role="alert"
              >
                {{ errorMessage }}
              </div>

              <button
                type="submit"
                class="checkout-button"
                :disabled="submitting"
              >
                {{
                  submitting
                    ? "Submitting your order..."
                    : "Place my order"
                }}
              </button>

              <p class="checkout-note">
                No online payment is collected at this step.
                Your order will be reviewed by Africa Mart.
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";

import { RouterLink } from "vue-router";

import { db } from "../firebase";

import {
  collection,
  doc,
  getDocs,
  query,
  where,
  documentId,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { useCart } from "../composables/useCart";

const {
  cart,
  cartCount,
  cartTotal,
  removeFromCart,
  updateQuantity,
  clearCart
} = useCart();

const customer = reactive({
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: ""
});

const submitting = ref(false);
const errorMessage = ref("");
const confirmedOrder = ref(null);

function formatMoney(value) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  }).format(Number(value) || 0);
}

function getStock(product) {
  if (
    product.stocks &&
    typeof product.stocks === "object"
  ) {
    return Object.values(product.stocks).reduce(
      (sum, qty) => sum + (Number(qty) || 0),
      0
    );
  }

  return Number(product.stock) || 0;
}

async function submitOrder() {
  if (submitting.value || !cart.value.length) return;

  errorMessage.value = "";

  if (
    !customer.name ||
    !customer.phone ||
    !customer.address
  ) {
    errorMessage.value =
      "Please complete all required fields.";
    return;
  }

  submitting.value = true;

  try {
    // Relire les produits avant la commande.
    const ids = [
      ...new Set(
        cart.value.map(item => item.productId)
      )
    ];

    const productMap = new Map();

    // Requêtes par lots de 30 identifiants.
    for (let index = 0; index < ids.length; index += 30) {
      const batch = ids.slice(index, index + 30);

      const snapshot = await getDocs(
        query(
          collection(db, "products"),
          where(documentId(), "in", batch)
        )
      );

      snapshot.docs.forEach(productDoc => {
        productMap.set(
          productDoc.id,
          productDoc.data()
        );
      });
    }

    const requiredPieces = new Map();
    const validatedItems = [];

    for (const item of cart.value) {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error(
          `${item.name} is no longer available.`
        );
      }

      const unitsPerCarton = Math.max(
        1,
        Number(product.boxesPerCarton) || 1
      );

      const quantity = Math.floor(
        Number(item.quantity)
      );

      if (!Number.isFinite(quantity) || quantity < 1) {
        throw new Error(
          `Invalid quantity for ${product.name}.`
        );
      }

      if (!["unit", "carton"].includes(item.mode)) {
        throw new Error("Invalid purchase option.");
      }

      const price = Number(
        item.mode === "carton"
          ? product.cartonPrice
          : product.boxPrice
      );

      if (!Number.isFinite(price) || price <= 0) {
        throw new Error(
          `Invalid price for ${product.name}.`
        );
      }

      const pieces = item.mode === "carton"
        ? quantity * unitsPerCarton
        : quantity;

      requiredPieces.set(
        item.productId,
        (requiredPieces.get(item.productId) || 0) +
          pieces
      );

      validatedItems.push({
        productId: item.productId,
        name: product.name,
        mode: item.mode,
        qty: quantity,
        quantity,
        unitPrice: price,
        price,
        boxesPerCarton: unitsPerCarton,
        total: Number(
          (price * quantity).toFixed(2)
        )
      });
    }

    // Vérification globale du stock par produit.
    for (const [id, pieces] of requiredPieces) {
      const product = productMap.get(id);

      const unitsPerCarton = Math.max(
        1,
        Number(product.boxesPerCarton) || 1
      );

      const availablePieces = Math.floor(
        getStock(product) * unitsPerCarton +
          0.000001
      );

      if (pieces > availablePieces) {
        throw new Error(
          `Insufficient stock for ${product.name}. Please adjust your cart.`
        );
      }
    }

    const total = Number(
      validatedItems
        .reduce((sum, item) => sum + item.total, 0)
        .toFixed(2)
    );

    // Version MVP : commande en attente.
    const orderData = {
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        notes: customer.notes
      },

      clientName: customer.name,
      clientPhone: customer.phone,

      items: validatedItems,

      subtotal: total,
      total,
      currency: "CAD",

      deliveryFee: null,

      status: "pending",
      paymentStatus: "unpaid",

      source: "website",

      createdAt: serverTimestamp()
    };

    const orderRef = await addDoc(
      collection(db, "orders"),
      orderData
    );

    confirmedOrder.value = {
      id: orderRef.id,
      name: customer.name
    };

    clearCart();
  } catch (error) {
    console.error("Order error:", error);

    errorMessage.value =
      error.message ||
      "Unable to submit your order.";
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.cart-page {
  min-height: 100vh;
  padding: 50px 0 100px;
  background: #f8faf9;
  color: #142b23;
  font-family: Inter, Poppins, sans-serif;
}

.container {
  width: min(1180px, 92%);
  margin: auto;
}

.page-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 35px;
}

.eyebrow {
  color: #059669;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 2px;
}

.page-heading h1 {
  margin: 12px 0;
  font-size: clamp(29px, 4vw, 42px);
}

.page-heading p {
  color: #94a3b8;
  font-size: 13px;
}

.continue-link {
  color: #065f46;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
}

.checkout-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(320px, 1fr);
  align-items: start;
  gap: 24px;
}

.panel {
  padding: 25px;
  border: 1px solid #e5ede8;
  border-radius: 18px;
  background: white;
  box-shadow: 0 8px 25px rgba(0,0,0,.025);
}

.panel h2 {
  margin: 0;
  font-size: 18px;
}

.panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #edf2ef;
}

.panel-heading span {
  color: #94a3b8;
  font-size: 12px;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 23px 0;
  border-bottom: 1px solid #edf2ef;
}

.item-image {
  display: grid;
  place-items: center;
  width: 105px;
  height: 105px;
  flex-shrink: 0;
  padding: 10px;
  border-radius: 12px;
  background: #f0f7f2;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-details h3 {
  margin: 0 0 9px;
  font-size: 15px;
}

.item-mode {
  display: inline-block;
  padding: 5px 9px;
  border-radius: 6px;
  background: #ecfdf5;
  color: #047857;
  font-size: 10px;
  font-weight: 800;
}

.item-price {
  margin: 11px 0;
  color: #64748b;
  font-size: 12px;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 13px;
}

.quantity-control button {
  width: 29px;
  height: 29px;
  border: none;
  border-radius: 7px;
  background: #ecfdf5;
  color: #065f46;
  font-size: 17px;
  cursor: pointer;
}

.quantity-control strong {
  font-size: 12px;
}

.remove-button {
  border: none;
  background: transparent;
  color: #dc2626;
  font-size: 11px;
  font-weight: 750;
  cursor: pointer;
}

.line-total {
  color: #065f46;
  font-size: 14px;
  white-space: nowrap;
}

.items-footer {
  padding-top: 22px;
}

.items-footer a {
  color: #059669;
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
}

.checkout-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-panel h2,
.customer-panel h2 {
  margin-bottom: 25px;
}

.summary-row,
.summary-total {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 15px 0;
}

.summary-row {
  color: #64748b;
  font-size: 12px;
}

.summary-row strong {
  color: #334155;
}

.summary-divider {
  height: 1px;
  margin: 20px 0;
  background: #e2e8f0;
}

.summary-total {
  align-items: center;
  font-weight: 850;
}

.summary-total strong {
  color: #065f46;
  font-size: 24px;
}

.summary-note,
.checkout-note {
  color: #94a3b8;
  font-size: 11px;
  line-height: 1.8;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 17px;
}

.form-group label {
  color: #334155;
  font-size: 12px;
  font-weight: 800;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  background: white;
  color: #0f172a;
  font-family: inherit;
  font-size: 12px;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #059669;
}

.checkout-button,
.primary-link {
  display: block;
  width: 100%;
  padding: 17px;
  border: none;
  border-radius: 11px;
  background: #065f46;
  color: white;
  font-size: 13px;
  font-weight: 850;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.checkout-button:disabled {
  opacity: .6;
  cursor: wait;
}

.checkout-note {
  margin-top: 16px;
  text-align: center;
}

.error-message {
  margin: 15px 0;
  padding: 13px;
  border-radius: 9px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 12px;
}

.empty-cart,
.success-panel {
  max-width: 650px;
  margin: 30px auto;
  padding: 55px 35px;
  border: 1px solid #e5ede8;
  border-radius: 22px;
  background: white;
  text-align: center;
}

.empty-icon {
  font-size: 65px;
}

.empty-cart h2,
.success-panel h2 {
  margin: 18px 0;
}

.empty-cart p,
.success-panel p {
  color: #64748b;
  font-size: 13px;
  line-height: 1.8;
}

.empty-cart .primary-link,
.success-panel .primary-link {
  max-width: 230px;
  margin: 25px auto 0;
}

.success-icon {
  display: grid;
  place-items: center;
  width: 75px;
  height: 75px;
  margin: auto;
  border-radius: 50%;
  background: #d1fae5;
  color: #047857;
  font-size: 35px;
}

.confirmation-number {
  margin: 20px 0;
  padding: 15px;
  border-radius: 10px;
  background: #f0fdf4;
  color: #065f46;
  font-size: 12px;
  overflow-wrap: anywhere;
}

.confirmation-number strong {
  display: block;
  margin-top: 8px;
}

@media (max-width: 850px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .cart-page {
    padding-top: 25px;
  }

  .page-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .panel {
    padding: 16px;
  }

  .cart-item {
    flex-wrap: wrap;
  }

  .item-image {
    width: 85px;
    height: 85px;
  }

  .line-total {
    margin-left: auto;
  }
}
</style>
