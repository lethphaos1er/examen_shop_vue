<script setup>
import AppItems from '@/components/shop/cart/AppItems.vue';
import AppExtra from '@/components/shop/cart/AppExtra.vue';

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['deletOneById-line', 'update-quantity']);

function deletOneById(id) {
  emit('deletOneById-line', id);
}

function updateQuantity(payload) {
  emit('update-quantity', payload);
}
</script>

<template>
  <aside class="w-full md:w-1/3 px-4">
    <AppItems
      :cart="cart"
      @deletOneById-line="deletOneById"
      @update-quantity="updateQuantity"
    />
    <AppExtra
      :cart="cart"
    />
  </aside>
</template>
