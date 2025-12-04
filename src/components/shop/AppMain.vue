<script setup>
    import AppProduct from '@/components/shop/AppProduct.vue';
    import AppCarte from '@/components/shop/AppCarte.vue';
</script>
<template>
    <main class="container mx-auto py-8 px-4 flex flex-wrap">
        <section class="w-full md:w-2/3 px-4 mb-8">
            <AppProduct />
        </section>
        <AppCarte />
    </main>
</template>