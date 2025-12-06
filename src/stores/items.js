// src/stores/items.js

import { defineStore } from 'pinia';
import { ref } from 'vue';
import DB from '@/services/DB.js';

// Store dédié au CATALOGUE (table "product")
// Ne gère QUE les produits, jamais le panier.
export const useItemsStore = defineStore('items', () => {
  const products = ref([]);
  const isLoading = ref(false);

  async function fetchItems() {
    isLoading.value = true;

    const data = await DB.getProducts();
    products.value = data;

    isLoading.value = false;
  }

  return {
    products,
    isLoading,
    fetchItems
  };
});
