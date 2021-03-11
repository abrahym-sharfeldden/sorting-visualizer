let arrayContainer = document.querySelector(`div.array-container`);
// let arrLength = document.querySelector(`input[type="number"]`).value;
let arrSubmit = document.querySelector(`input[type="submit"]`);
let sortName = document.querySelectorAll(`input[type="button"].sort-btn`);
let darkModeBtn = document.querySelector(`input[name="isDarkMode"]`);

let isDarkMode = true;
let time = 1000;
let arr = new ArrayList();

let smd = document.querySelector(`input[type="range"]`);




function loadStyleSheet(filetype, filename){
    // refactor to prevent the split-second of no css being rendered
    // between toggles
    var head = document.querySelector('head');

    let style = document.createElement('link');
    let rel = document.createAttribute('rel');
    let href = document.createAttribute('href')

    style.setAttribute(`rel`, filetype);
    style.setAttribute(`type`, `text/css`); 
    style.setAttribute(`href`, `./assets/css/${filename}.css`);

    document.querySelector('link[rel="stylesheet"]').remove();
    head.appendChild(style);
}



async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function quicksort(arr, left, right){
    if(left >= right) return;
    let pivot = await partition(arr, left, right);
    
    arr[pivot].setBarColor("white");

    await Promise.all([
        quicksort(arr, left, pivot - 1),
        quicksort(arr, pivot + 1, right)
    ]);
}

async function partition(arr, left, right) {
    let pivotIndex = left; 
    let pivotValue = arr[right].val;

    for(let i = left; i < right; i++) {
        if(arr[i].val < pivotValue) {
            await arr.setPivot(pivotIndex, '#F00');
            arr.swapBar(i, pivotIndex);
            pivotIndex++;
        }
    }
    
    arr.swapBar(pivotIndex, right);
    return pivotIndex;
}

async function insertionSort(arr, n) {
    if(n < 1) return;
    
    let last = arr[n-1].val;
    let j = n-2;
    
    await insertionSort(arr, n-1);
    

    while( j >= 0 ) {    
        if(arr[j].val > last)
            await arr.swapBar(j, j+1);
        //arr[j+1] = arr[j];
        j--;
    }
    arr[j+1].val = last;
}

async function selectionSort(arr) {
    for(let i = 0; i < arr.size; i++){
        let min = i;
        
        for(let j = i+1; j < arr.size; j++) {
            if(arr[min].val > arr[j].val) { 
                min = j;
            }
        }

        if(min != i) {
            await arr.swapBar(min, i);
        }
    }
}
async function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length; j++){
            // check if j+1 exists; else loop breaks
            if(arr[j+1]) {
                sleep(500)
                if(arr[j+1].val < arr[j].val) 
                    await arr.swapBar(j, j+1);
            }
        }
    }
}

function createBars(value, size) {
    let bar = document.createElement('div');
    let val = document.createAttribute("value");
    val.value = value;
    bar.className = "array-bar";       
    
    // removes bar's borders based on array size.
    // refactor with document.innerWidth breakpoints
    if(size > 400){
        document.querySelectorAll(".array-bar").forEach(bar => {
            bar.style.border = "none";
        })
    }

    arrayContainer.appendChild(bar);
    return bar;
}

function truncateArray(){
    arr = new ArrayList();
    arrayContainer.innerHTML = '';
}

(function(){
    // init functions: 
    loadStyleSheet("stylesheet", "style");
    arr.populateArray(smd.max/2);

    
    for(input of sortName) {
        input.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            try {
                if(e.target.name == "quicksort") await quicksort(arr, 0, arr.size - 1);
                else if(e.target.name == "insertionsort") await insertionSort(arr, arr.size);
                else if(e.target.name == "selectionsort") await selectionSort(arr)
                else if(e.target.name == "bubblesort") await bubbleSort(arr);
                else {console.log(e.target.name);}
            } 
            catch (e) {
                throw new Error(e); // ?
            }
            finally {
                // traverse sorted array
            }
        })
    };

    darkModeBtn.addEventListener("click", (e) => {
        let sheetName = `style`;

        if(isDarkMode) sheetName += `-light`;
        
        isDarkMode = !isDarkMode;

        loadStyleSheet("stylesheet", sheetName);
    })

    smd.addEventListener("click", e => {
        truncateArray();
        arr.populateArray(e.target.value);
    });

    
})();