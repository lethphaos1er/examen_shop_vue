<script setup>
const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <h2 class="text-xl font-bold mb-4">Votre Panier</h2>
  <div class="cart bg-white rounded-lg shadow animate__animated">
    <ul class="divide-y divide-gray-200 space-y-4 p-6">

      <!-- 👉 ICI : on boucle pour chaque produit dans la cart -->
      <li
        v-for="cart in carts"
        :key="cart.id"
        class="flex justify-between carts-center py-3"
      >
        <div class="flex carts-center">

          <!-- image du produit -->
          <img
            :src="cart.image"
            alt="Product"
            class="h-12 w-12 rounded-full mr-4"
          />

          <!-- infos du produit -->
          <div>
            <span class="font-semibold">{{ cart.name }}</span>
            <span class="block text-sm text-gray-500">€{{ cart.price }}</span>
          </div>
        </div>

        <div class="flex carts-center">
          <!-- quantité -->
          <input
            type="number"
            class="form-input mt-1 block w-16 text-center rounded text-gray-700 border-gray-300 border"
            :value="cart.quantity || 1"
            min="0"
          />

          <button class="ml-2 text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </li>

    </ul>
  </div>
</template>
