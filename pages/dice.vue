<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import dice1 from '@/assets/dice/1.png';
import dice2 from '@/assets/dice/2.png';
import dice3 from '@/assets/dice/3.png';
import dice4 from '@/assets/dice/4.png';
import dice5 from '@/assets/dice/5.png';
import dice6 from '@/assets/dice/6.png';

//骰盤
const diceimg = reactive([
    dice1,
    dice2,
    dice3,
    dice4,
    dice5,
    dice6,
])
const open = ref(false);
const point = reactive({
    arr: [
        { id: 4, bet: 0, pailiu: 69 },
        { id: 5, bet: 0, pailiu: 34 },
        { id: 6, bet: 0, pailiu: 20 },
        { id: 7, bet: 0, pailiu: 13 },
        { id: 8, bet: 0, pailiu: 9 },
        { id: 9, bet: 0, pailiu: 7.45 },
        { id: 10, bet: 0, pailiu: 6.8 },
        { id: 11, bet: 0, pailiu: 6.8 },
        { id: 12, bet: 0, pailiu: 7.45 },
        { id: 13, bet: 0, pailiu: 9 },
        { id: 14, bet: 0, pailiu: 13 },
        { id: 15, bet: 0, pailiu: 20 },
        { id: 16, bet: 0, pailiu: 34 },
        { id: 17, bet: 0, pailiu: 69 },
    ]
});
const dice = reactive({ arr: [1, 1, 1] });
const total = ref(0);
const dicepoint = reactive({
    arr: [
        { id: 1, bet: 0 },
        { id: 2, bet: 0 },
        { id: 3, bet: 0 },
        { id: 4, bet: 0 },
        { id: 5, bet: 0 },
        { id: 6, bet: 0 },
    ]
});
const jagur = reactive({
    arr: [
        { id: 1, bet: 0 },
        { id: 2, bet: 0 },
        { id: 3, bet: 0 },
        { id: 4, bet: 0 },
        { id: 5, bet: 0 },
        { id: 6, bet: 0 },
    ]
})
const anyjagur = reactive({
    payliu: 34,
    bet: 0,
})
//金額計算
const loading = ref(false);
const totalText = ref('你輸了');
const totalprice = ref(0);
const bet = computed(() => {
    let pointtotal = 0;
    point.arr.forEach(e => {
        pointtotal += e.bet;
    })
    let dicetotal = 0;
    dicepoint.arr.forEach(e => {
        dicetotal += e.bet;
    })
    let jagurtotal = 0;
    jagur.arr.forEach(e => {
        jagurtotal += e.bet;
    })
    return Hbet.value + Lbet.value + pointtotal + dicetotal + jagurtotal + anyjagur.bet;
});
const wallet = ref(10000);
const oldwallet = ref(10000);
const price = ref(1000);
//大或小
const Hbet = ref(0);
const Lbet = ref(0);
const HoLCount = ref(1.02);
//猜點數
const DicepointCount = ref(1.3);
//豹子
const jagurPayliu = ref(210);

async function throwdice() {
    const res = await checkbet();
    if (res) {
        dice.arr[0] = Math.floor(Math.random() * 6) + 1;
        dice.arr[1] = Math.floor(Math.random() * 6) + 1;
        dice.arr[2] = Math.floor(Math.random() * 6) + 1;
        // dice.arr[0] = 5;
        // dice.arr[1] = 5;
        // dice.arr[2] = 5;
        open.value = true;
        total.value = dice.arr[0] + dice.arr[1] + dice.arr[2];
        if (dice.arr[0] == dice.arr[1] && dice.arr[1] == dice.arr[2] && dice.arr[0] == dice.arr[2]) {
            await CountJagur(dice.arr[0]);
        } else {
            await CountHightOrLow(total.value);
        }
        await CountPoint(total.value);
        await CountDice();
        loading.value = true;
    }
    oldwallet.value = wallet.value;
}

function checkbet() {
    if (bet.value == 0) {
        console.log('請先下注');
        return false;
    } else {
        return true;
    }
}
function checkwallet() {
    if (wallet.value - price.value < 0) {
        console.log('你沒錢');
        return false;
    } else {
        return true;
    }
}

function CountHightOrLow(total) {
    if (total >= 11) {
        if (Hbet.value > 0) {
            totalText.value = '你贏了！';
            wallet.value += Hbet.value * HoLCount.value + Hbet.value;
            totalprice.value += Hbet.value * HoLCount.value + Hbet.value;
        }
    } else {
        if (Lbet.value > 0) {
            totalText.value = '你贏了！';
            wallet.value += Lbet.value * HoLCount.value + Lbet.value;
            totalprice.value += Lbet.value * HoLCount.value + Lbet.value;
        }
    }
}
function CountPoint(total) {
    const res = point.arr.filter(e => e.id == total);
    // console.log(res[0]);
    if (res[0].bet > 0) {
        totalText.value = '你贏了！';
        wallet.value += (res[0].bet * res[0].pailiu) + res[0].bet;
        totalprice.value += (res[0].bet * res[0].pailiu) + res[0].bet;
    }
}
function CountDice() {
    let include = 0;
    let money = 0;
    const res = dicepoint.arr.filter(e => e.bet > 0);
    dice.arr.forEach(e => {
        res.forEach(el => {
            if (el.id == e) {
                include += 1;
                money += el.bet;
            }
        })
    })
    switch (include) {
        case 1:
            totalText.value = '你贏了！';
            wallet.value += money * 2;
            totalprice.value += money * 2;
            break;
        case 2:
            totalText.value = '你贏了！';
            wallet.value += (money * 2.3) + money;
            totalprice.value += (money * 2.3) + money;
            break;
        case 3:
            totalText.value = '你贏了！';
            wallet.value += (money * 12) + money;
            totalprice.value += (money * 12) + money;
            break;
        default:
            break;
    }
}
function CountJagur(value) {
    if (anyjagur.bet > 0) {
        totalText.value = '你贏了！';
        wallet.value += anyjagur.bet * anyjagur.payliu;
        totalprice.value += anyjagur.bet * anyjagur.payliu;
    }
    const res = jagur.arr.filter(e => e.bet > 0 && e.id == value);
    if (res.length > 0) {
        totalText.value = '你贏了！';
        wallet.value += res[0].bet * jagurPayliu.value + res[0].bet;
        totalprice.value += res[0].bet * jagurPayliu.value + res[0].bet;
    }
}


async function chooseHightOrLow(choose) {
    const res = await checkwallet();
    if (res) {
        wallet.value -= price.value;
        switch (choose) {
            case true:
                Hbet.value += price.value;
                break;
            case false:
                Lbet.value += price.value;
                break;
            default:
                break;
        }
    }
}

async function chooseDice(choose) {
    const res = await checkwallet();
    if (res) {
        wallet.value -= price.value;
        choose.bet += price.value;
    }
}
async function choosePoint(choose) {
    const res = await checkwallet();
    if (res) {
        wallet.value -= price.value;
        choose.bet += price.value;
    }
}
async function chooseJagur(choose) {
    const res = await checkwallet();
    if (res) {
        wallet.value -= price.value;
        choose.bet += price.value;
    }
}

function again() {
    loading.value = false;
    Hbet.value = 0;
    Lbet.value = 0;
    totalprice.value = 0;
    totalText.value = '你輸了';
    dicepoint.arr = [
        { id: 1, bet: 0 },
        { id: 2, bet: 0 },
        { id: 3, bet: 0 },
        { id: 4, bet: 0 },
        { id: 5, bet: 0 },
        { id: 6, bet: 0 },
    ]
    point.arr.forEach(e => {
        e.bet = 0;
    })
    jagur.arr.forEach(e => {
        e.bet = 0;
    })
    anyjagur.bet = 0;
    open.value = false;
}
function clear() {
    loading.value = false;
    Hbet.value = 0;
    Lbet.value = 0;
    totalprice.value = 0;
    totalText.value = '你輸了';
    dicepoint.arr = [
        { id: 1, bet: 0 },
        { id: 2, bet: 0 },
        { id: 3, bet: 0 },
        { id: 4, bet: 0 },
        { id: 5, bet: 0 },
        { id: 6, bet: 0 },
    ]
    point.arr.forEach(e => {
        e.bet = 0;
    })
    jagur.arr.forEach(e => {
        e.bet = 0;
    })
    anyjagur.bet = 0;
    wallet.value = oldwallet.value;
    open.value = false;
}

function changePrice(value) {
    price.value = value;
}
</script>

<template>
    <!-- <div v-if="login"
        class="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-800/80 flex flex-col justify-center items-center">
        <div
            class="bg-neutral-800 rounded-md p-5 flex flex-col justify-center items-center w-full max-w-[400px] shadow-md shadow-neutral-900">
            <h1 class="text-white text-4xl mb-5 font-semibold shadow-md">愷皇骰寶</h1>
            <input v-model="user.account" type="text"
                class="border border-gray-300 w-full py-2 bg-transparent px-2 text-white rounded" placeholder="帳號">
            <input v-model="user.password" type="password"
                class="border border-gray-300 w-full py-2 mt-5 bg-transparent px-2 text-white rounded" placeholder="密碼">
            <button @click="loginsubmit()"
                class="text-white mt-5 bg-amber-500 w-full rounded py-2 font-semibold hover:bg-amber-600 duration-300">登入</button>
        </div>
    </div> -->
    <div v-show="loading"
        class="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-800/80 flex flex-col justify-center items-center">
        <h1 class="text-3xl text-white font-semibold">{{ totalText }}</h1>
        <h1 class="text-xl text-white font-semibold">總計：{{ totalprice }}</h1>
        <button @click="again()" class="text-white mt-3">關閉</button>
    </div>
    <div v-show="bet == 0"
        class="fixed top-5 left-0 z-50 w-screen h-10 bg-gray-800/80 flex flex-col justify-center items-center">
        <h1 class="text-xl text-white font-semibold">請先下注</h1>
    </div>
    <div class="w-full h-screen bg-emerald-800 flex flex-col justify-center items-center pt-20">
        <div class="w-full max-w-[1440px] text-xl text-white mb-5">
            <span>總下注：{{ bet }}</span>
        </div>
        <div class="w-full max-w-[1440px] grid grid-cols-12 gap-5 h-full">
            <div @click="chooseHightOrLow(true)"
                :class="[Hbet > 0 ? 'ring ring-indigo-300 ring-offset-2 ring-offset-indigo-200 duration-300' : '']"
                class="border border-white col-span-4 rounded-md flex flex-col justify-center items-center text-5xl text-white font-semibold select-none hover:cursor-pointer relative">
                大 <span class="text-red-500 text-xl"> 1:{{ HoLCount }}</span>
                <span class="text-red-500 text-xl">豹子通殺</span>
                <span class="absolute bottom-1 left-1 text-xl">${{ Hbet }}</span>
            </div>
            <div class="border border-white col-span-4 rounded-md flex flex-col justify-center items-center relative">
                <div class="flex justify-center items-center ">
                    <div
                        class="bg-gray-300 shadow shadow-gray-800 w-10 h-10 rounded-md m-3 flex justify-center items-center text-lg font-semibold">
                        <!-- {{ dice.arr[0] }} -->
                        <img :src="diceimg[dice.arr[0] - 1]" class="rounded-md" alt="">
                    </div>
                    <div
                        class="bg-gray-300 shadow shadow-gray-800 w-10 h-10 rounded-md m-3 flex justify-center items-center text-lg font-semibold">
                        <!-- {{ dice.arr[1] }} -->
                        <img :src="diceimg[dice.arr[1] - 1]" class="rounded-md" alt="">
                    </div>
                    <div
                        class="bg-gray-300 shadow shadow-gray-800 w-10 h-10 rounded-md m-3 flex justify-center items-center text-lg font-semibold">
                        <!-- {{ dice.arr[2] }} -->
                        <img :src="diceimg[dice.arr[2] - 1]" class="rounded-md" alt="">
                    </div>

                </div>

                <div class="w-full flex justify-center items-center text-lg text-white">
                    {{ total > 0 ? total : "" }}
                </div>

                <div :class="[open ? 'bottom-40' : 'bottom-5']"
                    class="absolute  left-[calc(100%-64)] flex flex-col justify-center items-center duration-300">
                    <div
                        class="w-[220px] h-56 rounded-t-full bg-gradient-to-br from-neutral-700 via-neutral-800  to-neutral-900">
                    </div>
                    <div
                        class="relative w-[240px] h-6  bg-gradient-to-br from-neutral-700 via-neutral-800  to-neutral-900 shadow-md shadow-gray-900">
                    </div>

                </div>
            </div>
            <div @click="chooseHightOrLow(false)"
                :class="[Lbet > 0 ? 'ring ring-indigo-300 ring-offset-2 ring-offset-indigo-200 duration-300' : '']"
                class="border border-white col-span-4 rounded-md flex flex-col justify-center items-center text-5xl text-white font-semibold select-none hover:cursor-pointer relative">
                小 <span class="text-red-500 text-xl"> 1:{{ HoLCount }}</span>
                <span class="text-red-500 text-xl">豹子通殺</span>
                <span class="absolute bottom-1 left-1 text-xl">${{ Lbet }}</span>
            </div>

            <div class="col-span-4 flex flex-col justify-between items-center space-y-2">
                <div
                    class="bg-emerald-900 rounded-md w-full py-2 flex justify-center items-center relative text-emerald-400 font-semibold">
                    指定豹子 1:{{ jagurPayliu }}
                </div>
                <div v-for="i in jagur.arr" :key="i.id" v-show="i.id <= 3" @click="chooseJagur(i)"
                    class="border border-white rounded-md w-full py-3 flex justify-center items-center relative text-white font-semibold hover:cursor-pointer">
                    <img :src="diceimg[i.id - 1]" class="rounded-md w-10 h-10 object-cover mx-1" alt="">
                    <img :src="diceimg[i.id - 1]" class="rounded-md w-10 h-10 object-cover mx-1" alt="">
                    <img :src="diceimg[i.id - 1]" class="rounded-md w-10 h-10 object-cover mx-1" alt="">
                    <span class="absolute bottom-1 left-1 text-xl">${{ i.bet }}</span>
                </div>
            </div>
            <div @click="chooseJagur(anyjagur)"
                :class="[anyjagur.bet > 0 ? 'ring ring-indigo-300 ring-offset-2 ring-offset-indigo-200 duration-300' : '']"
                class="border border-white col-span-4 rounded-md flex flex-col justify-center items-center text-5xl text-white font-semibold select-none hover:cursor-pointer relative">
                任意豹子
                <span class="text-2xl mt-2 text-red-500">1:{{ anyjagur.payliu }}</span>
                <span class="absolute bottom-1 left-1 text-xl">${{ anyjagur.bet }}</span>
            </div>
            <div class="col-span-4 flex flex-col justify-between items-center space-y-2">
                <div
                    class="bg-emerald-900 rounded-md w-full py-2 flex justify-center items-center relative text-emerald-400 font-semibold">
                    指定豹子 1:{{ jagurPayliu }}
                </div>
                <div v-for="i in jagur.arr" :key="i.id" v-show="i.id > 3" @click="chooseJagur(i)"
                    class="border border-white rounded-md w-full py-3 flex justify-center items-center relative text-white font-semibold hover:cursor-pointer">
                    <img :src="diceimg[i.id - 1]" class="rounded-md w-10 h-10 object-cover mx-1" alt="">
                    <img :src="diceimg[i.id - 1]" class="rounded-md w-10 h-10 object-cover mx-1" alt="">
                    <img :src="diceimg[i.id - 1]" class="rounded-md w-10 h-10 object-cover mx-1" alt="">
                    <span class="absolute bottom-1 left-1 text-xl">${{ i.bet }}</span>
                </div>
            </div>

            <div class="col-span-12 flex space-x-3">
                <button @click="choosePoint(i)" v-for="i in point.arr" :key="i.id"
                    :class="[i.bet > 0 ? 'ring ring-indigo-300 ring-offset-2 ring-offset-indigo-200 duration-300' : '']"
                    class="flex-1 border border-white text-xl h-40 text-white font-semibold relative flex flex-col items-center justify-center">{{
                        i.id
                    }}
                    <span class="text-base">1:{{ i.pailiu }}</span>
                    <span class="absolute bottom-0.5 left-1 text-lg">${{ i.bet }}</span>
                </button>
            </div>


            <div class="col-span-12 flex flex-wrap space-x-3">
                <button @click="chooseDice(i)" v-for="i in dicepoint.arr" :key="i.id"
                    :class="[i.bet > 0 ? 'ring ring-indigo-300 ring-offset-2 ring-offset-indigo-200 duration-300' : '']"
                    class="border border-white flex-1 text-xl text-white font-semibold relative flex justify-center items-center">
                    <img :src="diceimg[i.id - 1]" class="rounded-md w-10 h-10 object-cover" alt="">
                    <span class="absolute bottom-1 left-1 text-xl">${{ i.bet }}</span>
                </button>
            </div>
            <div
                class="col-span-12 bg-emerald-900 rounded-md w-full h-10 flex justify-between items-center text-emerald-300 text-base px-10">
                <span>單骰1:1</span>
                <span>雙骰1:2.3</span>
                <span>三骰1:12</span>
            </div>
        </div>
        <div class="mt-5 w-full bg-neutral-800 flex justify-between items-center py-5 px-10">
            <span class="text-xl text-white">TWD：${{ wallet }}</span>
            <div class="flex-1 flex justify-center items-center">
                <button @click="changePrice(1000)"
                    :class="[price == 1000 ? 'scale-110 ring-offset-2 ring-offset-teal-400' : '']"
                    class="w-20 h-20 rounded-full mx-4 flex justify-center items-center ring ring-teal-500 bg-teal-600 text-white font-semibold text-lg duration-300">
                    $1000</button>
                <button @click="changePrice(5000)"
                    :class="[price == 5000 ? 'scale-110 ring-offset-2 ring-offset-amber-400' : '']"
                    class="w-20 h-20 rounded-full mx-4 flex justify-center items-center ring ring-amber-500 bg-amber-600 text-white font-semibold text-lg duration-300">
                    $5000</button>
                <button @click="changePrice(10000)"
                    :class="[price == 10000 ? 'scale-110 ring-offset-2 ring-offset-blue-400' : '']"
                    class="w-20 h-20 rounded-full mx-4 flex justify-center items-center ring ring-blue-500 bg-blue-600 text-white font-semibold text-lg duration-300">
                    $10000</button>
            </div>
            <div class="flex-1 flex justify-end items-center">
                <button @click="clear()"
                    class="border border-indigo-400 w-[100px] py-3 mr-3 rounded-md text-white hover:bg-indigo-400 duration-300 ">清除下注</button>
                <button @click="throwdice()"
                    class="bg-rose-500 w-[200px] py-3 rounded-md text-white hover:bg-rose-600 duration-300 hover:shadow hover:shadow-rose-400 hover:scale-105">開骰</button>
            </div>

        </div>
    </div>

</template>

<style></style>