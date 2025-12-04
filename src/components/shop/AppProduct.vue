<script setup>
import { ref, onMounted } from 'vue';
import DB from '@/services/DB.js';

const products = ref([]);

// Chargement de la "table" shop
onMounted(async () => {
  products.value = await DB.getProducts();
});

// Ajout dans une deuxième "table" (ex: /cart)
const addToCart = async (product) => {
  // ici tu utilises directement ta seconde ressource MockAPI
  await fetch('https://692de13ee5f67cd80a4d4a6b.mockapi.io/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  });

  console.log('Produit ajouté au panier :', product);
};
</script>

<template>
  <section aria-labelledby="products-title">
    <h1 id="products-title" class="text-3xl font-bold mb-4">
      Nouveaux produits
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full"
        />
        <div class="p-4">
          <h2 class="font-bold text-lg mb-2">
            {{ product.name }}
          </h2>
          <p class="text-gray-700">
            €{{ product.price }}
          </p>

          <button
            type="button"
            class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="addToCart(product)"
          >
            Ajouter
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
