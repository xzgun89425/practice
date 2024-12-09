<script setup>
/**過濾章節單元 */
const data = reactive([
    { id: 1, status: 'prepare', units: [{ id: 1, status: 'prepare' }, { id: 2, status: 'prepare' }, { id: 3, status: 'public' }] },
    { id: 2, status: 'open', units: [{ id: 1, status: 'open' }, { id: 2, status: 'public' }, { id: 3, status: 'prepare' }] },
    { id: 3, status: 'prepare', units: [{ id: 1, status: 'prepare' }] },
    { id: 4, status: 'close', units: [{ id: 1, status: 'open' }, { id: 2, status: 'prepare' },] },
    { id: 4, status: 'open', units: [] },
    { id: 4, status: 'open', units: null },
]);

const lastC = ref(null)
const lastU = ref(null)
const ans = reactive({
    chapter: null,
    unit: null,
})
onMounted(() => {

    if (lastC.value && lastU.value) {
        ans.chapter = lastC.value;
        ans.unit = lastU.value;
    } else {
        const filterChapter = data.filter(e => e.status == 'open' && e.units?.length > 0);
        if (filterChapter.length == 0) return;
        const findChapter = filterChapter.filter(e => e.units.some(el => el.status == 'open' || el.status == 'public'));
        if (findChapter.length == 0) return;
        const findUnit = filterChapter[0].units.filter(e => e.status == 'open' || e.status == 'public')
        // console.log(filterChapter, 'filterChapter');
        // console.log(findChapter, 'findChapter');
        // console.log(findUnit, 'findUnit');
        ans.chapter = findChapter[0].id;
        ans.unit = findUnit[0].id;
    }
});
</script>

<template>
    {{ ans }}
</template>

<style scoped></style>