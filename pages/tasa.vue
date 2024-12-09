<script setup>
const isLogin = ref(false)
const isLoading = ref(false)
function login(params) {
    // 模擬等待登入api
    isLoading.value = true
    setTimeout(() => {
        isLogin.value = true
        isLoading.value = false
    }, 1000)
}
</script>

<template>
    <div class="w-full bg-black h-[100dvh] flex justify-center items-center">
        <!-- 表單 -->
        <form @submit.prevent="login" :class="[isLogin ? 'max-h-[0px] py-0 overflow-hidden' : 'max-h-[420px] py-6']"
            class="w-full max-w-[380px] rounded-xl bg-zinc-900/90 px-6 flex flex-col justify-between items-center h-full duration-500 relative z-20">
            <div class="flex flex-col items-center">
                <h1 class="font-bold text-white text-5xl mb-2">TASA</h1>
                <p class="text-white">國家太空中心實驗室監控系統</p>
            </div>
            <p class="text-white my-4">welcome</p>
            <div class="w-full space-y-3">
                <div class="w-full border rounded-xl py-1 px-3 relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute w-4 h-4 fill-current text-gray-200"
                        viewBox="0 0 448 512">
                        <path
                            d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                    <input type="text"
                        class="pl-6 bg-transparent text-gray-200 placeholder:text-gray-200 focus:outline-none"
                        placeholder="帳號">
                </div>
                <div class="w-full border rounded-xl py-1 px-3 relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute w-4 h-4 fill-current text-gray-200"
                        viewBox="0 0 448 512">
                        <path
                            d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                    </svg>
                    <input type="password"
                        class="pl-6 bg-transparent text-gray-200 placeholder:text-gray-200 focus:outline-none"
                        placeholder="密碼">
                </div>
                <button class="w-full text-white bg-indigo-400/40 py-1.5 rounded-xl">
                    {{ isLoading ? '登入中...' : '登入' }}
                </button>
            </div>
        </form>
        <!-- 球體 直接換圖 class改過去就好 -->
        <div :class="[isLogin ? 'w-[200%] delay-500 z-30 -top-[30%]' : 'w-1/2 z-10 top-[80%]']"
            class="fixed  aspect-square  rounded-full border-[10px] border-white ball duration-1000">
        </div>
    </div>
</template>

<style scoped>
.ball {
    box-shadow: 0 0 100px 30px #a8e2ed;
    background: radial-gradient(circle, black 60%, #93edfd 100%);
    animation: ballIn 1.5s ease-out;
}

@keyframes ballIn {
    0% {
        transform: translateY(25%);
        box-shadow: 0 0 0px 0px #93edfd;
    }

    50% {
        box-shadow: 0 0 50px 15px #93edfd;
    }

    100% {
        transform: translateY(0);
        box-shadow: 0 0 100px 30px #93edfd;
    }
}
</style>