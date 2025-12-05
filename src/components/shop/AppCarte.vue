<script setup>
import { ref } from 'vue';
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

const totalHTVA = ref(0);

const handleUpdateTotal = (value) => {
  totalHTVA.value = value;
};
</script>

<template>
  <aside class="w-full md:w-1/3 px-4">
    <AppItems
      :cart="cart"
      :products="products"
      @update-total="handleUpdateTotal"
    />
    <AppExtra :totalhorstva="totalHTVA" />
  </aside>
</template>
