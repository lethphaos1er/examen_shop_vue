// src/stores/cart.js

import { defineStore } from 'pinia';
import { ref } from 'vue';
import DB from '@/services/DB.js';

// Store dédié au PANIER (table "cart")
// Ne gère QUE les lignes du panier : product_id, quantity
export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const isLoading = ref(false);

  // Charge le contenu du panier depuis MockAPI
  async function fetchCart() {
    isLoading.value = true;

    const data = await DB.getCart();
    cart.value = data;

    isLoading.value = false;
  }

  // Ajoute un produit au panier
  //augmente qty ou créer une ligne
  //est gérée par DB.addToCart()
  async function addToCart(product) {
    isLoading.value = true;

    await DB.addToCart(product);

    const data = await DB.getCart();
    cart.value = data;

    isLoading.value = false;
  }

  // Supprime une ligne du panier via son id
  async function deletOneByIdFromCart(id) {
    isLoading.value = true;

    await DB.deleteOneById(id);

    const data = await DB.getCart();
    cart.value = data;

    isLoading.value = false;
  }

  // Met à jour un élément du panier (si tu changes la quantité)
  async function updateCartLine(id, payload) {
    isLoading.value = true;

    await DB.updateOneCartById(id, payload);

    const data = await DB.getCart();
    cart.value = data;

    isLoading.value = false;
  }

  return {
    cart,
    isLoading,
    fetchCart,
    addToCart,
    deletOneByIdFromCart,
    updateCartLine
  };
});
