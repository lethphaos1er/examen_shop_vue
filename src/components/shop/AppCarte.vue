<script setup>
    import AppItems from '@/components/shop/cart/AppItems.vue';
    import AppExtra from '@/components/shop/cart/AppExtra.vue';
import AppExtra from './cart/AppExtra.vue';
</script>
<template>
    <aside class="w-full md:w-1/3 px-4">
        <AppItems/>
            <!-- Repeat for other cart items -->
        <AppExtra/>
    </aside>
</template>