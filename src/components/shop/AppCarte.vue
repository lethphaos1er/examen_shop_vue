<script setup>
import AppItems from '@/components/shop/cart/AppItems.vue';
import AppExtra from '@/components/shop/cart/AppExtra.vue';

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

// total HTVA remonté par AppItems
import { ref } from 'vue';
const totalHTVA = ref(0);

// AppItems nous envoie le total via emit
const handleUpdateTotal = (total) => {
  totalHTVA.value = total;
};
</script>

<template>
  <aside class="w-full md:w-1/3 px-4">
    <!-- AppItems reçoit cart + products, et remonte le total -->
    <AppItems
      :cart="cart"
      :products="products"
      @update-total="handleUpdateTotal"
    />

    <!-- AppExtra reçoit le total HTVA calculé par AppItems -->
    <AppExtra :total-htva="totalHTVA" />
  </aside>
</template>
