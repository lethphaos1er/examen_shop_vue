<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  // total hors TVA envoyé par AppCarte
  totalhorstva: {
    type: Number,
    default: 0
  }
});

// montant choisi dans le select (livraison)
const montantValue = ref(5); // par défaut : Standard - 5 €

// 20% de TVA sur le total hors TVA
const montantTaxe = computed(() => {
  const taxe = props.totalhorstva / 100 * 20;
  return taxe;
});

// total général = HTVA + taxe + livraison
const totalGeneral = computed(() => {
  const total = props.totalhorstva + montantTaxe.value + montantValue.value;
  return total;
});
</script>

<template>
  <div class="bg-gray-50">
    <div class="p-6">
      <div class="flex justify-between mb-1">
        <span><strong>Total HTVA:</strong></span>
        <!-- on affiche ici totalhorstva -->
        <span>€{{ totalhorstva.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mb-1">
        <span><strong>Taxe (20%):</strong></span>
        <!-- ici le montantTaxe -->
        <span>€{{ montantTaxe.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between items-center my-8">
        <span><strong>Livraison:</strong></span>
        <select
          class="form-select py-1 px-2 block w-full rounded border border-gray-300 ml-2"
          v-model="montantValue"
        >
          <!-- value numérique pour que montantValue soit bien un nombre -->
          <option :value="5">Standard - €5</option>
          <option :value="15">Express - €15</option>
        </select>
      </div>
      <div class="flex justify-between font-bold mb-1 text-xl">
        <span><strong>Total Général:</strong></span>
        <!-- totalGeneral = HTVA + taxe + livraison -->
        <span>€{{ totalGeneral.toFixed(2) }}</span>
      </div>
      <button
        class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cart-btn"
      >
        Procéder au paiement
      </button>
    </div>
  </div>
</template>
