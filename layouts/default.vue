<script setup>
onMounted(() => {
    checkElements();
});

onUpdated(async () => {
    await checkElements();
    // await biggerText();
    console.log('update');
});
</script>

<template>
    <!-- <div class="fixed top-0 right-0">
        <button class="p-2 mx-2 bg-blue-500 text-white" @click="biggerText(0)">small</button>
        <button class="p-2 mx-2 bg-blue-500 text-white" @click="biggerText(1)">normal</button>
        <button class="p-2 mx-2 bg-blue-500 text-white" @click="biggerText(2)">big</button>
    </div> -->
    <slot />
</template>

<style scoped></style>
