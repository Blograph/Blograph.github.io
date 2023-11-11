const gridContainer = document.getElementById('gridContainer');
const numRows = 20;
const numCols = 35;
let isMouseDown = false;
let grid = createEmptyGrid();
let neighbor_cout = createEmptyGrid();
createGrid();

function createGrid() {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${numCols}, 20px)`;

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            cell.addEventListener('mousedown', () => handleMouseDown(i, j));
            cell.addEventListener('mouseenter', () => handleMouseEnter(i, j));
            cell.addEventListener('touchstart', (event) => handleTouchStart(event, i, j));
            cell.addEventListener('touchmove', (event) => handleTouchMove(event, i, j));
            gridContainer.appendChild(cell);
        }
    }
}

function createEmptyGrid() {
    return Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => 0)
    );
}

function startGame() {
    intervalId = setInterval(updateGame, 150);
}

function stopGame() {
    clearInterval(intervalId);
}

function clearGrid() {
    grid = createEmptyGrid();
    updateGrid();
}

function handleMouseDown(row, col) {
    isMouseDown = true;
    grid[row][col] = 1;
    updateGrid();
}

function handleMouseEnter(row, col) {
    if (isMouseDown) {
        grid[row][col] = 1;
        updateGrid();
    }
}

function handleTouchStart(event, row, col) {
    event.preventDefault();
    isMouseDown = true;
    grid[row][col] = 1;
    updateGrid();
}

function handleTouchMove(event, row, col) {
    event.preventDefault();
    if (isMouseDown) {
        grid[row][col] = 1;
        updateGrid();
    }
}

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

function updateGrid() {
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / numCols);
        const col = index % numCols;
        cell.style.backgroundColor = grid[row][col] === 1 ? '#d3e0e0' : '';
    });
}

function countNeighbors(row, col) {
    let count = 0;
    const offsets = [-1, 0, 1];

    offsets.forEach((offsetRow) => {
        offsets.forEach((offsetCol) => {
            const neighborRow = row + offsetRow;
            const neighborCol = col + offsetCol;

            if (
                neighborRow >= 0 &&
                neighborRow < numRows &&
                neighborCol >= 0 &&
                neighborCol < numCols &&
                !(offsetRow === 0 && offsetCol === 0)
            ) {
                count += grid[neighborRow][neighborCol];
            }
        });
    });

    return count;
}

function updateGame() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            neighbor_cout[i][j] = countNeighbors(i, j);
        }
    }

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (grid[i][j] === 1) {
                grid[i][j] = neighbor_cout[i][j] === 2 || neighbor_cout[i][j] === 3 ? 1 : 0;
            } else {
                grid[i][j] = neighbor_cout[i][j] === 3 ? 1 : 0;
            }
        }
    }
    updateGrid();
}