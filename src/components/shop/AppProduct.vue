<script setup>
// AppProduct reçoit la liste des produits depuis AppMain
const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
});

// AppProduct prévient le parent quand on clique sur "Ajouter"
const emit = defineEmits(['add-to-cart']);

const addToCart = (product) => {
  emit('add-to-cart', product);
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
