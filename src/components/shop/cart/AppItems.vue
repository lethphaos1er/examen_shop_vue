<script setup>
import { computed } from 'vue';

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  },
  products: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update-total']);

// On reconstruit la liste des items complets (name, price, image, quantity)
const items = computed(() => {
  const result = [];

  props.cart.forEach((cartLine) => {
    let foundProduct = null;

    props.products.forEach((p) => {
      if (p.id === cartLine.product_id) {
        foundProduct = p;
      }
    });

    if (foundProduct !== null) {
      const quantity = cartLine.quantity ? cartLine.quantity : 1;

      result.push({
        id: cartLine.id,
        product_id: cartLine.product_id,
        name: foundProduct.name,
        price: foundProduct.price,
        image: foundProduct.image,
        quantity: quantity
      });
    }
  });

  return result;
});

// On calcule le total HTVA = somme(price * quantity)
const totalHTVA = computed(() => {
  let total = 0;

  items.value.forEach((item) => {
    total = total + item.price * item.quantity;
  });

  return total;
});

// On émet le total vers AppCarte à chaque recalcul
// (ici on force un emit à la création)
emit('update-total', totalHTVA.value);
</script>

<template>
  <h2 class="text-xl font-bold mb-4">Votre Panier</h2>
  <div class="cart bg-white rounded-lg shadow animate__animated">
    <ul class="divide-y divide-gray-200 space-y-4 p-6">

      <!-- pour chaque produit dans la cart reconstituée -->
      <li
        v-for="item in items"
        :key="item.id"
        class="flex justify-between carts-center py-3"
      >
        <div class="flex carts-center">

          <!-- image du produit -->
          <img
            :src="item.image"
            alt="Product"
            class="h-12 w-12 rounded-full mr-4"
          />

          <!-- infos du produit -->
          <div>
            <span class="font-semibold">{{ item.name }}</span>
            <span class="block text-sm text-gray-500">€{{ item.price }}</span>
          </div>
        </div>

        <div class="flex carts-center">
          <!-- quantité -->
          <input
            type="number"
            class="form-input mt-1 block w-16 text-center rounded text-gray-700 border-gray-300 border"
            :value="item.quantity"
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
