/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let boxes = document.getElementsByClassName("box");
const ArrBoxes = () => Array.from(boxes);
let winnerPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];
function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
  //  console.log(grid);
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

const opponentChoise = () => {
        
        randBox = getEmptyboxes()[Math.floor(Math.random() * getEmptyboxes().length)];
        console.log(randBox);
        var rowIdx = randBox.getAttribute("rowIdx");
        var colIdx = randBox.getAttribute("colIdx");
        return { rowIdx, colIdx }
};

const endGame = (winningSeq) =>  winningSeq.forEach(_el => _el.classList.add('winner'))

const checkForVictory = () =>{
    let victory = false;

    winnerPatterns.forEach(_c => {
        const _grid = ArrBoxes();
        const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]] ];
        if( allsame( sequence ) ){
            victory = true;
            endGame(sequence);
            removeClickHandlers();
        }
    });

    return victory;
}
const opponentTurn = () => {
    removeClickHandlers();
    setTimeout( () => {
        let { rowIdx, colIdx } = opponentChoise();
        let newValue = 2;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        if(!checkForVictory())
            addClickHandlers();
    }, 1000);
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    if(!checkForVictory())
        opponentTurn()
}

function addClickHandlers() {
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
const removeClickHandlers = () => {
    for (let item of boxes) {
        item.removeEventListener('click', onBoxClick,false);
    }
};


const getEmptyboxes = () =>{
    emptyBoxes = [];
    for (let item of boxes) {
        if(item.innerHTML === '')
            emptyBoxes.push(item);
    }
    console.log(emptyBoxes.length);
    console.log('empthy boxes', emptyBoxes);
    return emptyBoxes;
}   
const allsame = (arr) => arr.every(_bx => _bx.innerText === arr[0].innerText && _bx.innerText != '');

initializeGrid();
renderMainGrid();
addClickHandlers();
