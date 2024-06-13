<script setup>
const games = reactive([
    { id: 20240427001, name: 'OOXX plus', path: '/ooxx' },
    { id: 20240512002, name: 'mondrian', path: '/mondrian' },
    { id: 20240512003, name: 'dice', path: '/dice' },
]);
</script>

<template>
    <div class="w-full bg-gradient-to-br from-zinc-900 to-gray-700 h-screen p-4">
        <div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <NuxtLink v-for="item in games" :key="item.id" :to="item.path"
                class="col-span-1 bg-gradient-to-br from-rose-500 to-teal-500 hover:scale-105 duration-200 h-40 rounded-md flex justify-center items-center font-bold text-white text-xl">
                {{ item.name }}
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped></style>
