<script setup>
const open = ref(false)
const isDown = ref(false)
const content = ref('')
const results = reactive([
    { id: 'yes', name: '聖筊', content: '你準備要賺大錢了' },
    { id: 'soso', name: '笑筊', content: '你可能需要再想想' },
    { id: 'no', name: '蓋筊', content: '這貌似不是個好主意...' },
])
const result = ref(null)
function changeOpen(params) {
    open.value = !open.value
    content.value = ''
}
async function submit(params) {
    await random()
    isDown.value = true;
}
function random(params) {
    const randomNum = Math.floor(Math.random() * 3);  // 生成 0, 1 或 2
    result.value = results[randomNum]
}
function reset(params) {
    isDown.value = false;
}
</script>

<template>
    <div :class="[
        open
            ? 'bottom-[50%] right-[50%] duration-200 z-[1000]'
            : 'bottom-3 right-3 duration-200 delay-500 z-[98]',
    ]" class="fixed flex justify-center items-center">
        <button @click="changeOpen" :class="[open ? 'overflow-hidden w-0 h-0' : 'w-16 h-16 ']"
            class="bottom-3 right-3 shadow-lg absolute duration-300 flex justify-center items-center bg-rose-500 rounded-full">
            <div class=""></div>
        </button>
        <div :class="[open ? 'w-[300px] h-[500px] delay-200 duration-300' : 'w-0 h-0 overflow-hidden duration-300']"
            class="bg-white rounded-xl absolute z-[100]">
            <button @click="changeOpen" :class="[open ? 'w-10 h-10 delay-500 ' : 'w-0 h-0']"
                class="absolute -top-4 -right-4 z-40 flex justify-center items-center bg-gray-700/30 rounded-md overflow-hidden text-white">
                X
            </button>
            <div
                class="h-full w-full overflow-hidden flex flex-col items-center justify-start relative z-30 bg-white rounded-lg pb-[40px]">
                <!-- 上方紅包蓋 -->
                <div :class="[isDown ? '-top-[300px] shadow-none' : 'top-0 shadow-lg shadow-[#C03545]']"
                    class="absolute left-0 z-40 bg-[#EB463D] w-[300px] h-[300px] rounded-b-[50%] duration-500 delay-200 flex flex-col justify-center items-center">
                    <img src="/divination/moneyGod.jpeg" :class="[isDown ? 'opacity-0' : 'opacity-100']"
                        class="h-[200px] border-2 border-amber-300 duration-500" alt="">
                    <p class="text-white font-bold text-xl mt-2">財神爺</p>
                </div>
                <!-- 下方紅包蓋 -->
                <div :class="[isDown ? 'top-[500px]' : 'top-[60px]']"
                    class="absolute left-0 z-30 bg-[#EB463D] h-[500px] w-[300px] duration-500 pt-[180px] delay-200 px-4 flex flex-col items-center justify-center rounded-t-lg">
                    <p class="text-white mb-3">想問財神爺什麼呢？</p>
                    <textarea v-model="content" rows="3" class="w-full p-2"></textarea>
                    <div class="flex justify-center mt-3 w-full">
                        <button :disabled="!content" @click="submit"
                            class="bg-amber-500 text-white py-1.5 w-full rounded-lg">擲筊</button>
                    </div>
                </div>
                <!-- 結果內容 -->
                <div v-if="result" class="p-4">
                    <div class="h-[430px] flex flex-col justify-center items-center">
                        <!-- <p class="text-center">{{ result.name }}</p> -->
                        <img :src="`/divination/${result.id}.png`" alt="">
                        <p class="text-center">{{ result.content }}</p>

                    </div>
                    <button @click="reset"
                        class="bg-[#EB463D] text-amber-300 py-2 rounded-lg font-bold w-full">再問一次</button>
                </div>

            </div>
        </div>
    </div>
</template>

<style></style>