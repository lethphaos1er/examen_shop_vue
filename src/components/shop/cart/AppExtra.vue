<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
});

// montant de la livraison (par défaut 5€)
const delivery = ref(5);

//  on récupère la valeur sauved si elle existe
onMounted(() => {
  const saved = localStorage.getItem('delivery');
  if (saved) delivery.value = Number(saved);
});


// à chaque changement, on sauvegarde dans localStorage
watch(delivery, (newValue) => {
  localStorage.setItem('delivery', String(newValue));
});

// Total hors TVA (HTVA)
const totalhorstva = computed(() => {
  let total = 0;

 props.cart.forEach((line) => {
  const price = Number(line.price);
  const quantity = Number(line.quantity);

  total += price * quantity;
});


  return total;
});

// TVA 20%
const tax = computed(() => {
  return totalhorstva.value * 0.2;
});

// Montant de la livraison en nombre
const deliveryAmount = computed(() => {
  return delivery.value;
});

// Total général = HTVA + TVA + livraison
const totalgeneral = computed(() => {
  return totalhorstva.value + tax.value + deliveryAmount.value;
});
</script>

<template>
  <div class="bg-gray-50">
    <div class="p-6">
      <div class="flex justify-between mb-1">
        <span><strong>Total HTVA:</strong></span>
        <span>€{{ totalhorstva.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between mb-1">
        <span><strong>Taxe (20%):</strong></span>
        <span>€{{ tax.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between items-center my-4">
        <span><strong>Livraison:</strong></span>
        <div class="flex items-center ml-2 w-full">
          <select
            class="form-select py-1 px-2 block w-full rounded border border-gray-300"
            v-model="delivery"
          >
            <option :value="5">Standard - €5</option>
            <option :value="15">Express - €15</option>
          </select>
        </div>
      </div>

      <div class="flex justify-between mb-1">
        <span><strong>Montant livraison:</strong></span>
        <span>€{{ deliveryAmount.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between font-bold mb-1 text-xl mt-4">
        <span><strong>Total Général:</strong></span>
        <span>€{{ totalgeneral.toFixed(2) }}</span>
      </div>

      <button
        class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cart-btn"
      >
        Procéder au paiement
      </button>
    </div>
  </div>
</template>
