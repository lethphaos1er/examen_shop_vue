<script setup>
import { computed, watch } from 'vue';

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

// On reconstitue chaque item du panier (image, nom, prix, quantité)
const items = computed(() => {
  const result = [];

  props.cart.forEach((line) => {
    let found = null;

    // on cherche le produit associé au product_id
    props.products.forEach((p) => {
      if (p.id == line.product_id) {
        found = p;
      }
    });

    if (found !== null) {
      const priceNumber = parseFloat(found.price);

      result.push({
        id: line.id,
        name: found.name,
        price: priceNumber,
        image: found.image,
        quantity: 1
      });
    }
  });

  return result;
});

// Total HTVA = somme des (prix * quantité)
const totalHTVA = computed(() => {
  let total = 0;

  items.value.forEach((item) => {
    total = total + (item.price * item.quantity);
  });

  return total;
});

// On remonte ce total à AppCarte
watch(
  totalHTVA,
  (newValue) => {
    emit('update-total', newValue);
  },
  { immediate: true }
);
</script>

<template>
  <h2 class="text-xl font-bold mb-4">Votre Panier</h2>
  <div class="cart bg-white rounded-lg shadow animate__animated">
    <ul class="divide-y divide-gray-200 space-y-4 p-6">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex justify-between items-center py-3"
      >
        <div class="flex items-center">
          <img
            :src="item.image"
            :alt="item.name"
            class="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <span class="font-semibold">{{ item.name }}</span>
            <span class="block text-sm text-gray-500">
              €{{ item.price.toFixed(2) }}
            </span>
          </div>
        </div>
        <div class="flex items-center">
          <input
            type="number"
            class="form-input mt-1 block w-16 text-center rounded text-gray-700 border-gray-300 border"
            :value="item.quantity"
            min="1"
          />
          <button class="ml-2 text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
