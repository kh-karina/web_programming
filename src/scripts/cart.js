// scripts/cart.js
export const STORAGE_KEY = "myPetStoreCart";
let cart = [];

// ---------- Persistency ----------
export const loadCart = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  cart = data ? JSON.parse(data) : [];
};
export const saveCart = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

// сразу загружаем
loadCart();

// ---------- Функции ----------
export const getCart = () => [...cart];          // копия, чтобы никто не трогал внутри

export const getCartCount = () => cart.length;

export const getCartTotal = () =>
  cart.reduce((sum, p) => sum + p.price * p.qty, 0);

/**
 * Добавить товар (или увеличить qty)
 */
export const addToCart = product => {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
};

/**
 * Уменьшить количество товара в корзине.
 * Если qty === 1 – товар удаляется из корзины.
 */
export const decrementFromCart = productId => {
  const existing = cart.find(p => p.id === productId);
  if (!existing) return;

  if (existing.qty > 1) {
    existing.qty -= 1;
  } else {
    // qty==1 → удаляем полностью
    cart = cart.filter(p => p.id !== productId);
  }
  saveCart();
};

/**
 * Полностью удалить товар из корзины (используется только в UI, но может пригодиться)
 */
export const removeFromCart = productId => {
  cart = cart.filter(p => p.id !== productId);
  saveCart();
};

/**
 * Очистить корзину
 */
export const clearCart = () => {
  cart = [];
  saveCart();
};
