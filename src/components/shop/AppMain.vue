<script setup>
import { ref, onMounted } from 'vue';
import DB from '@/services/DB.js';
import AppProduct from '@/components/shop/AppProduct.vue';
import AppCarte from '@/components/shop/AppCarte.vue';

// liste des produits (table product)
const products = ref([]);

// contenu du panier (table cart)
const cart = ref([]);

// au chargement de la page : on va chercher les produits et le panier existant
onMounted(async () => {
  const dataProducts = await DB.getProducts();
  products.value = dataProducts;

  const dataCart = await DB.getCart();
  cart.value = dataCart;
});

// quand AppProduct demande d'ajouter un produit au panier
const handleAddToCart = async (product) => {
  // on ajoute dans la table cart sur MockAPI
  await DB.addToCart(product);

  // puis on recharge la cart pour avoir l'état à jour
  const dataCart = await DB.getCart();
  cart.value = dataCart;
};
</script>

<template>
  <main class="container mx-auto py-8 px-4 flex flex-wrap">
    <section class="w-full md:w-2/3 px-4 mb-8">
      <!-- AppProduct reçoit les produits et émet "add-to-cart" -->
      <AppProduct
        :products="products"
        @add-to-cart="handleAddToCart"
      />
    </section>

    <!-- AppCarte reçoit le panier et les produits -->
    <AppCarte
      :cart="cart"
      :products="products"
    />
  </main>
</template>
