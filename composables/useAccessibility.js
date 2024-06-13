const domMemo = ref([]);
let domIndex = 0;
export const checkElements = () => {
    domMemo.value = []
    // Recursive function
    function traverseBody(node) {
        if (node.childNodes.length) {
            // Loop over every child node
            node.childNodes.forEach((child) => {
                // If it's a type 1, call the function recursively
                if (child.nodeType == 1) {
                    //console.log(child.tagName, child.nodeType)
                    traverseBody(child);
                } else if (child.nodeType == 3) {
                    domMemo.value.push(child.parentElement);
                }
            });
        }
    }

    nextTick(() => {
        // Get the body element
        let body = document.getElementsByTagName('body');
        // If a body element was found, traverse its children
        if (body) {
            traverseBody(body[0]);
            function onlyUnique(value, index, array) {
                return array.indexOf(value) === index;
            }
            domMemo.value = domMemo.value.filter(onlyUnique);
        }
    });
    console.log(domMemo.value);
}

// ===== 文字放大
const sizeIndex = ref(1);
let sizeArray = [0.8, 1, 1.2];
let fontSizeMemo;
export const biggerText = (Index) => {
    if (!fontSizeMemo) {
        fontSizeMemo = [];
        domMemo.value.forEach((item) => {
            fontSizeMemo.push(parseInt(getComputedStyle(item).fontSize));
        });
    }
    // sizeIndex++;
    // if (sizeIndex > sizeArray.length - 1) sizeIndex = 0;
    if (Index !== null && Index !== undefined) {
        sizeIndex.value = Index;
    } else {
        sizeIndex.value = 1
    }
    // console.log(Index !== null && Index !== undefined);
    console.log(fontSizeMemo);
    domMemo.value.forEach((item, idx) => {
        item.style.fontSize = `${fontSizeMemo[idx] * sizeArray[sizeIndex.value]}px`;
        console.log(item);
    });
}