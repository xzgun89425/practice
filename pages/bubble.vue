<script setup></script>

<template>
    <div id="container" class="bg-zinc-900 relative">
        <div class="rounded-full w-5 h-5 bg-white circle"></div>
    </div>
</template>

<style scoped>
#container {
    position: relative;
    width: 100%;
    height: 100vh;
}

.circle {
    position: absolute;
    border-radius: 50%;
    animation: fall-left 5s linear infinite;
}

@keyframes fall {
    0% {
        top: 0;
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        top: 90%;
        opacity: 0;
    }
}
@keyframes fall-left {
    0% {
        top: 0;
        left: 800px;
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        top: 90%;
        left: 20%;
        opacity: 0;
    }
}
@keyframes fall-right {
    0% {
        top: 0;
        right: 0;
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        top: 90%;
        right: 20%;
        opacity: 0;
    }
}
</style>
