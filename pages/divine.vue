<script setup>
const navs = reactive([
    { id: 'divine1', name: '擲筊' },
    { id: 'riddon', name: '輪盤' },
    { id: 'random', name: '隨機數字' },
    { id: 'countdown', name: '倒數計時' },
]);
const nav = ref('divine1');

</script>

<template>
    <div class="w-full h-full bg-blue-100">
        <!-- header -->
        <div class="w-full sticky top-4 px-2">
            <div class="w-full bg-white rounded-full flex items-center px-6 py-2 gap-6 shadow-md shadow-gray-400">
                <button v-for="i in navs" :key="i.id"
                    class="text-sm md:text-base font-bold hover:text-blue-500 duration-200">{{ i.name
                    }}</button>
            </div>
        </div>
        <!-- main -->
        <div class="w-full h-[calc(100svh-40px)] pt-4">
            <!-- divine -->
            <div class="w-full h-full flex flex-col justify-center items-center gap-6">
                <div
                    class="w-40 md:w-60 h-40 md:h-60 flex justify-center items-center bg-white border border-white rounded-xl">
                    神明
                </div>
                <div>
                    <HalfMoonAnimation />
                </div>
                <button class="w-40 md:w-60 py-2 text-white bg-rose-500 rounded-xl hover:bg-rose-600">
                    擲筊
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap');

* {
    font-family: "Noto Sans TC", sans-serif;
}
</style>