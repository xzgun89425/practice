<script setup>
function goIns() {
    // https://www.instagram.com/nore_wz/
    window.open('https://www.instagram.com/nore_wz/', '_blank');
}
</script>

<template>
    <div>
        <header
            class="w-full flex justify-between items-center h-16 bg-gradient-to-br from-violet-500 to-rose-300 text-white px-4"
        >
            <h1 class="font-bold text-3xl flex items-center gap-2">
                Nore
                <!-- <div class="heart-small mt-2"></div> -->
            </h1>
            <label
                for="hamburger"
                class="flex md:hidden flex-col gap-1 justify-center items-center hover:cursor-pointer overflow-hidden group hover:bg-gray-200/40 w-10 h-10 rounded-full duration-200"
            >
                <input id="hamburger" type="checkbox" class="hidden peer" />
                <div
                    class="w-6 h-[3px] rounded bg-white peer-checked:rotate-45 peer-checked:translate-y-1.5 duration-200"
                ></div>
                <div class="w-6 h-[3px] rounded bg-white peer-checked:translate-x-10 duration-200"></div>
                <div
                    class="w-6 h-[3px] rounded bg-white peer-checked:-rotate-45 peer-checked:-translate-y-2 duration-200"
                ></div>

                <ul
                    class="h-0 p-0 peer-checked:p-2 peer-checked:h-[calc(100vh-64px)] duration-200 overflow-hidden fixed top-16 z-10 bg-gradient-to-tr from-violet-500 to-rose-300 left-0 w-full justify-start flex flex-col items-center gap-2"
                >
                    <li
                        @click="goIns"
                        class="hover:bg-gray-200/40 w-full text-center rounded py-1 text-lg hover:text-rose-500 duration-200 flex items-center justify-center"
                    >
                        Smart
                    </li>
                    <li
                        @click="goIns"
                        class="hover:bg-gray-200/40 w-full text-center rounded py-1 text-lg hover:text-rose-500 duration-200 flex items-center justify-center"
                    >
                        Cute
                    </li>
                    <li
                        @click="goIns"
                        class="hover:bg-gray-200/40 w-full text-center rounded py-1 text-lg hover:text-rose-500 duration-200 flex items-center justify-center"
                    >
                        Pretty
                    </li>
                    <li class="flex-1 flex justify-center items-center w-full rounded duration-200">
                        <!-- <svg
                            class="heart-beat fill-current stroke-current text-rose-500 w-40 h-40 duration-200"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                           
                            <path
                                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                            />
                        </svg> -->
                        <div class="heart">
                            <div class="absolute z-50 top-4 left-4 rotate-45 w-full whitespace-nowrap">
                                <p class="love1">I love u</p>
                            </div>
                            <div class="absolute z-50 -top-8 left-8 rotate-45 w-full whitespace-nowrap">
                                <p class="love2">I love u</p>
                            </div>
                            <div class="absolute z-50 top-10 -left-10 rotate-45 w-full whitespace-nowrap">
                                <p class="love3">I love u</p>
                            </div>
                            <div class="absolute z-50 top-20 left-4 rotate-45 w-full whitespace-nowrap">
                                <p class="love4">I love u</p>
                            </div>
                            <div class="absolute z-50 top-4 left-20 rotate-45 w-full whitespace-nowrap">
                                <p class="love5">I love u</p>
                            </div>
                        </div>
                    </li>
                    <li
                        @click="goIns"
                        class="hover:bg-gray-200/40 w-full text-center rounded py-1 text-lg hover:text-rose-500 duration-200 flex items-center justify-center"
                    >
                        Special
                    </li>
                    <li
                        @click="goIns"
                        class="hover:bg-gray-200/40 w-full text-center rounded py-1 text-lg hover:text-rose-500 duration-200 flex items-center justify-center"
                    >
                        Kind
                    </li>
                    <li
                        @click="goIns"
                        class="hover:bg-gray-200/40 w-full text-center rounded py-1 text-lg hover:text-rose-500 duration-200 flex items-center justify-center"
                    >
                        lovely
                    </li>
                </ul>
            </label>

            <ul class="hidden md:flex justify-center items-center gap-4">
                <li class="hover:cursor-pointer px-4 py-1.5 hover:bg-gray-200/40 rounded duration-200">Nore</li>
                <li class="hover:cursor-pointer px-4 py-1.5 hover:bg-gray-200/40 rounded duration-200">Nore</li>
                <li class="hover:cursor-pointer px-4 py-1.5 hover:bg-gray-200/40 rounded duration-200">Nore</li>
            </ul>
        </header>

        <slot />
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');

header {
    font-family: Agbalumo;
}

@keyframes beat {
    0% {
        transform: rotate(-45deg) scale(1);
    }
    20% {
        transform: rotate(-45deg) scale(1.25);
    }
    40% {
        transform: rotate(-45deg) scale(1.4);
    }
}
@keyframes loveText {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}
.love1 {
    animation: loveText 1s linear infinite;
    opacity: 0;
    animation-delay: 1s;
}
.love2 {
    animation: loveText 0.5s linear infinite;
    opacity: 0;
    animation-delay: 1.2s;
}
.love3 {
    animation: loveText 1.2s linear infinite;
    opacity: 0;
    animation-delay: 1.5s;
}
.love4 {
    animation: loveText 1.4s linear infinite;
    opacity: 0;
    animation-delay: 1.8s;
}
.love5 {
    animation: loveText 0.7s linear infinite;
    opacity: 0;
    animation-delay: 2s;
}
.heart {
    height: 70px;
    width: 70px;
    background: #e11d48;
    position: relative;
    transform: rotate(-45deg);
    box-shadow: -10px 10px 90px #e11d48;
    animation: beat 0.7s linear infinite;
}
.heart:before {
    content: ' ';
    position: absolute;
    height: 70px;
    width: 70px;
    background: #e11d48;
    top: -50%;
    border-radius: 50px;
    box-shadow: -10px -10px 90px #e11d48;
}
.heart:after {
    content: ' ';
    position: absolute;
    height: 70px;
    width: 70px;
    background: #e11d48;
    right: -50%;
    border-radius: 50px;
    box-shadow: 10px 10px 90px #e11d48;
}

.heart-small {
    height: 12px;
    width: 12px;
    background: #fff;
    position: relative;
    transform: rotate(-45deg);
    box-shadow: -10px 10px 90px #fff;
    /* animation: beat 0.7s linear infinite; */
}
.heart-small:before {
    content: ' ';
    position: absolute;
    height: 12px;
    width: 12px;
    background: #fff;
    top: -50%;
    border-radius: 50px;
    box-shadow: -10px -10px 90px #fff;
}
.heart-small:after {
    content: ' ';
    position: absolute;
    height: 12px;
    width: 12px;
    background: #fff;
    right: -50%;
    border-radius: 50px;
    box-shadow: 10px 10px 90px #fff;
}
</style>
