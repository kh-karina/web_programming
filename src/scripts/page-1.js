// scripts/page-1.js
import { renderProducts } from "./ui.js";
import { initCart } from './api/cart-handler.js';

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();  
  initCart();     
});
