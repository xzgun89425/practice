<script setup>
const data = reactive([
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
    ['單', '大'],
    ['單', '大'],
    ['單', '大'],
    ['單', '大'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
    ['單', '小'],
    ['單', '大'],
]);
const currentArr = reactive([])
const currentArrLength = computed(() => {
    return currentArr.length
})
onMounted(() => {
    let innerArr = []
    let old = null
    let i = 0;

    data.forEach(e => {
        let d = e[1]
        if (old == null) { old = d }

        if (old !== d || i == 7) {
            if (i < 7) {
                //innerArr 補滿7個空值
                for (let j = i; j < 7; j++) {
                    innerArr.push("")
                }
            }
            currentArr.push(innerArr)
            i = 0;
            innerArr = [];
            old = d;
        }
        innerArr.push(d)
        i++;
    })

    if (i < 7) {
        //innerArr 補滿7個空值
        for (let j = i; j < 7; j++) {
            innerArr.push("")
        }
    }

    currentArr.push(innerArr) // 塞入最後一筆

    // 如果x軸未滿21，補上空格以便渲染
    if (currentArr.length < 21) {
        for (let i = currentArr.length; i < 21; i++) {
            currentArr.push(['', '', '', '', '', '', ''])
        }
    }
});
</script>

<template>
    <div class="table overflow-x-auto overflow-y-hidden">
        <div class="grid-container">
            <div v-for="(i, index) in currentArr" :key="index" class='grid-item'>
                <div v-for="(j, jedex) in i" :key="jedex" class='grid-item'>{{ j }}</div>
            </div>
        </div>
    </div>
    {{ currentArr }}
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(v-bind(currentArrLength), 1fr);
    /*totalColumn*/
    grid-template-rows: repeat(7, 1fr);
    /*totalRow*/
    gap: 0;
    /* spacing between grid cells */
    width: 100px !important;
    height: 100px !important;
}

.grid-item {
    width: 16px !important;
    height: 16px !important;
    padding: 0;
    font-size: 10px;
    text-align: center;
    color: #000000;
    font-weight: bold;
    border: 1px solid #4c4c4c;
    background-color: white;

}

.table,
.td,
th {
    border: 1px solid #4c4c4c;
    text-align: left;
}

.table {
    border-collapse: collapse;
    width: 100%;
    background: gray;
    display: flex;
    justify-content: space-between;
    width: 348px;
    height: 140px;
    padding: 5px;
}
</style>