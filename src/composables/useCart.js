
import { computed, ref, watch } from "vue";

const STORAGE_KEY = "africamart_cart";

function readCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const cart = ref(readCart());

watch(
  cart,
  value => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(value)
    );
  },
  { deep: true }
);

export function useCart() {
  const cartCount = computed(() =>
    cart.value.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  );

  const cartTotal = computed(() =>
    cart.value.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    )
  );

  function addToCart(product, mode = "unit", quantity = 1) {
    const qty = Math.floor(Number(quantity));

    if (!Number.isFinite(qty) || qty < 1) {
      return;
    }

    const price = Number(
      mode === "carton"
        ? product.cartonPrice
        : product.boxPrice
    );

    if (!Number.isFinite(price) || price <= 0) {
      throw new Error(
        "Ce produit n'a pas de prix valide."
      );
    }

    const key = `${product.id}_${mode}`;

    const existing = cart.value.find(
      item => item.key === key
    );

    if (existing) {
      existing.quantity += qty;
      return;
    }

    cart.value.push({
      key,
      productId: product.id,
      name: product.name,
      image: product.image || "",
      mode,
      price,
      quantity: qty,
      boxesPerCarton: Number(
        product.boxesPerCarton || 1
      )
    });
  }

  function removeFromCart(key) {
    cart.value = cart.value.filter(
      item => item.key !== key
    );
  }

  function updateQuantity(key, quantity) {
    const item = cart.value.find(
      item => item.key === key
    );

    if (!item) return;

    const qty = Math.floor(Number(quantity));

    if (!Number.isFinite(qty)) return;

    if (qty <= 0) {
      removeFromCart(key);
      return;
    }

    item.quantity = qty;
  }

  function clearCart() {
    cart.value = [];
  }

  return {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}
