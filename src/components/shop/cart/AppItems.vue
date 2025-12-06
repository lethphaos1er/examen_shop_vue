<script setup>
const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
});

// AppItems envoie les infos à AppCart
const emit = defineEmits(['deletOneById-line', 'update-quantity']);

function deletOneById(item) {
  emit('deletOneById-line', item.id);
}

function onQuantityChange(item, event) {
  const value = Number(event.target.value);

  emit('update-quantity', {
    id: item.id,
    quantity: value
  });
}
</script>

<template>
  <h2 class="text-xl font-bold mb-4">Votre Panier</h2>
  <div class="cart bg-white rounded-lg shadow animate__animated">
    <ul class="divide-y divide-gray-200 space-y-4 p-6">
      <li
        v-for="item in cart"
        :key="item.id"
        class="flex justify-between items-center py-3"
      >
        <div class="flex items-center">
          <img
            :src="item.image"
            alt="Product"
            class="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <span class="font-semibold">{{ item.name }}</span>
            <span class="block text-sm text-gray-500">€{{ item.price }}</span>
          </div>
        </div>

        <div class="flex items-center">
          <!-- quantité liée au code -->
          <input
            type="number"
            class="form-input mt-1 block w-16 text-center rounded text-gray-700 border-gray-300 border"
            :value="item.quantity"
            min="0"
            @change="onQuantityChange(item, $event)"
          />

          <button
            type="button"
            class="ml-2 text-red-500 hover:text-red-700"
            @click="deletOneById(item)"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
