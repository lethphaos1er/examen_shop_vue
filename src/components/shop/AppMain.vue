<script setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useItemsStore } from '@/stores/items.js';
import { useCartStore } from '@/stores/cart.js';

import AppProduct from '@/components/shop/AppProduct.vue';
import AppCart from '@/components/shop/AppCart.vue';

const itemsStore = useItemsStore();
const cartStore = useCartStore();

const { products } = storeToRefs(itemsStore);
const { cart } = storeToRefs(cartStore);

onMounted(async () => {
  await itemsStore.fetchItems();
  await cartStore.fetchCart();
});

const cartView = computed(() => {
  const result = [];

  cart.value.forEach((line) => {
    let product = null;

    products.value.forEach((p) => {
      if (p.id == line.product_id) {
        product = p;
      }
    });

    if (product !== null) {
      result.push({
        id: line.id,
        product_id: line.product_id,
        quantity: line.quantity,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  });

  return result;
});

async function handleAddToCart(product) {
  await cartStore.addToCart(product);
}

async function deletOneByIdLine(id) {
  await cartStore.deletOneByIdFromCart(id);
}

async function updateQuantity(payload) {
  await cartStore.updateCartLine(payload.id, {
    quantity: payload.quantity
  });
}
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <section class="md:flex md:gap-8">
      <AppProduct
        class="md:w-2/3"
        :products="products"
        @add-to-cart="handleAddToCart"
      />

      <AppCart
        class="md:w-1/3"
        :cart="cartView"
        @deletOneById-line="deletOneByIdLine"
        @update-quantity="updateQuantity"
      />
    </section>
  </main>
</template>
