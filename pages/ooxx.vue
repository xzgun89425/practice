<script setup>
const events = ref('touchstart');
onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
function handleResize() {
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        window.navigator.userAgent.toLowerCase()
    );
    events.value = isMobile ? 'touchstart' : 'click';
}
const playerData = reactive({
    memory: {
        O: [],
        X: [],
    },
    count: {
        O: 0,
        X: 0,
    },
    nowPlayer: 'O',
    grids: [
        { id: 1, mark: '' },
        { id: 2, mark: '' },
        { id: 3, mark: '' },
        { id: 4, mark: '' },
        { id: 5, mark: '' },
        { id: 6, mark: '' },
        { id: 7, mark: '' },
        { id: 8, mark: '' },
        { id: 9, mark: '' },
    ],
    winRules: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ],
    winner: '',
});
function chooseItem(item) {
    const m = playerData.nowPlayer;
    playerData.grids[item.id - 1].mark = m;
    playerData.memory[m].push(item.id);
    checkNum();
    checkWin();
    if (playerData.nowPlayer == 'O') {
        playerData.nowPlayer = 'X';
    } else {
        playerData.nowPlayer = 'O';
    }
}
function checkWin() {
    let count = 0;
    let mark = '';
    let list = [];
    playerData.winRules.forEach((e) => {
        // console.log(e);
        e.forEach((el) => {
            list.push(playerData.grids[el - 1].mark);
            if (list.length == 3) {
                if (list.every((n) => n == list[0] && n !== '')) {
                    count++;
                    mark = list[0];
                    console.log(mark);
                }
                list = [];
            }
        });
    });
    if (count > 0) {
        playerData.winner = mark;
    }
}

function checkNum() {
    const m = playerData.nowPlayer;
    const num = playerData.grids.filter((e) => e.mark == m);
    playerData.count[m] = num.length;
    if (num.length > 3) {
        const id = playerData.memory[m][0];
        const idx = playerData.grids.findIndex((e) => e.id == id);
        playerData.grids[idx].mark = '';
        playerData.memory[m].shift();
    }
}

function reset() {
    playerData.grids = [
        { id: 1, mark: '' },
        { id: 2, mark: '' },
        { id: 3, mark: '' },
        { id: 4, mark: '' },
        { id: 5, mark: '' },
        { id: 6, mark: '' },
        { id: 7, mark: '' },
        { id: 8, mark: '' },
        { id: 9, mark: '' },
    ];
    playerData.winner = '';
    playerData.memory = {
        O: [],
        X: [],
    };
    playerData.count = {
        O: 0,
        X: 0,
    };
    if (playerData.nowPlayer == 'O') {
        playerData.nowPlayer = 'X';
    } else {
        playerData.nowPlayer = 'O';
    }
}
</script>

<template>
    <div
        v-show="playerData.winner"
        class="w-screen h-[100dvh] flex justify-center items-center bg-zinc-800/90 fixed z-10 top-0 left-0"
    >
        <div class="w-[300px]">
            <h1
                class="w-full text-center font-bold mb-4 text-4xl"
                :class="{
                    'text-rose-400': playerData.winner == 'O',
                    'text-teal-500': playerData.winner == 'X',
                }"
            >
                玩家
                {{ playerData.winner }}
                勝利！
            </h1>
            <button
                @click="reset()"
                class="bg-gradient-to-r from-rose-500 hover:scale-110 duration-200 shadow-md to-teal-400 text-white w-full py-2.5 rounded-md text-xl font-bold"
            >
                再玩一次
            </button>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center h-[100dvh] bg-gradient-to-br from-zinc-900 to-gray-700">
        <h1
            v-show="playerData.winner == ''"
            class="fixed top-0 w-[600px] text-center font-bold mt-4 lg:mt-8 text-2xl lg:text-4xl"
            :class="{
                'text-rose-400': playerData.nowPlayer == 'O',
                'text-teal-500': playerData.nowPlayer == 'X',
            }"
        >
            玩家
            {{ playerData.nowPlayer }}
        </h1>
        <div class="grid grid-cols-3 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] rounded-md overflow-hidden">
            <button
                :disabled="item.mark !== ''"
                class="col-span-1 group bg-transparent disabled:hover:bg-transparent border-gray-100 w-[100px] lg:w-[200px] h-[100px] lg:h-[200px] flex justify-center items-center"
                :class="{
                    'border-b-4 lg:border-b-8': item.id <= 6,
                    'border-r-4 lg:border-r-8': item.id % 3 !== 0,
                }"
                v-for="item in playerData.grids"
                :key="item.id"
                v-on:[events]="chooseItem(item)"
            >
                <div
                    v-show="item.mark == ''"
                    class="group-hover:block hidden text-6xl font-bold w-[60px] h-[60px] text-center"
                    :class="{
                        'text-rose-400/70': playerData.nowPlayer == 'O',
                        'text-teal-500/70': playerData.nowPlayer == 'X',
                    }"
                >
                    {{ playerData.nowPlayer }}
                </div>
                <transition
                    enter-active-class="transition ease-out"
                    enter-from-class="transform opacity-0 scale-125"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-125"
                >
                    <p
                        v-show="item.mark"
                        class="text-6xl font-bold w-[60px] h-[60px] text-center"
                        :class="{
                            'text-rose-400': item.mark == 'O',
                            'text-teal-500': item.mark == 'X',
                            'opacity-30 place':
                                item.id == playerData.memory[playerData.nowPlayer][0] &&
                                playerData.count[playerData.nowPlayer] >= 3,
                        }"
                    >
                        {{ item.mark }}
                    </p>
                </transition>
            </button>
        </div>
    </div>
</template>

<style scoped>
.place {
    animation: scale 500ms linear infinite;
}

@keyframes scale {
    0% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
