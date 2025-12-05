<script setup>
import { ref, watch, computed } from 'vue';
import DB from '@/services/DB.js';

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

// items manipulables localement
const items = ref([]);

// Reconstruit items local à partir de cart + products
watch(
  () => [props.cart, props.products],
  () => {
    const result = [];

    props.cart.forEach((line) => {
      let found = null;

      props.products.forEach((p) => {
        if (p.id == line.product_id) {
          found = p;
        }
      });

      if (found !== null) {
        let quantity = 1;

        if (line.quantity !== undefined && line.quantity !== null) {
          quantity = line.quantity;
        }

        result.push({
          cartId: line.id,
          name: found.name,
          price: parseFloat(found.price),
          image: found.image,
          quantity: quantity
        });
      }
    });

    items.value = result;
  },
  { immediate: true }
);

// Total HTVA
const totalHTVA = computed(() => {
  let total = 0;

  items.value.forEach((item) => {
    total = total + (item.price * item.quantity);
  });

  return total;
});

// Remonter le total
watch(
  totalHTVA,
  (newValue) => {
    emit('update-total', newValue);
  },
  { immediate: true }
);

// Modification de quantité
const handleQuantityChange = (index, event) => {
  const value = Number(event.target.value);

  if (value >= 1) {
    items.value[index].quantity = value;
  }
};

const deleteItem = async (index, item) => {
  await DB.deleteOneById(item.cartId);
  items.value.splice(index, 1);
};
</script>

<template>
  <h2 class="text-xl font-bold mb-4">Votre Panier</h2>
  <div class="cart bg-white rounded-lg shadow animate__animated">
    <ul class="divide-y divide-gray-200 space-y-4 p-6">

      <li
        v-for="(item, index) in items"
        :key="item.cartId"
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
            @input="handleQuantityChange(index, $event)"
          />
          <button
            class="ml-2 text-red-500 hover:text-red-700"
            @click="deleteItem(index, item)"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </li>

    </ul>
  </div>
</template>
