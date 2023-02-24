const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
const cellElements = document.querySelectorAll("td");
let cells;
let isGameFinished;
let currentPlayer;

function setMessageArea() {
    document.getElementById("message-area").textContent = "next move is " + currentPlayer;
}

function ChangePlayer() {
   currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkIfGameFinished() {
    for (let i = 0; i < winConditions.length; i++) {    
        const [firstIndex, secondIndex, thirdIndex] = winConditions[i];
        const value1 = cells[firstIndex];
        const value2 = cells[secondIndex];
        const value3 = cells[thirdIndex];

        if (value1 && value2 && value3 && value1 === value2 && value2 === value3) {
            return true;
        }
    }

    return false;
}

function handleTableCellClick(event) {
    if (isGameFinished) {
        return;
    }

    const cell = event.currentTarget;
    const targetIndex = Number(cell.dataset.cellId);

    if (cell.classList.contains("filled")) {
        return;
    }

    cell.textContent = currentPlayer;
    cell.classList.add("filled");
    cells[targetIndex] = currentPlayer;
    
    isGameFinished = checkIfGameFinished();

    if (isGameFinished) {
        setTimeout(() => {
            alert(`The game is over. Player ${currentPlayer} has won!`);
        }, 0);
        return;
    }

    ChangePlayer();
    setMessageArea();
}

function clearCells() {
    cellElements.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('filled');
    });
}

function startNewGame() {
    cells = new Array(9);
    isGameFinished = false;
    currentPlayer = "X";
    setMessageArea();
    clearCells();
}

cellElements.forEach(cell => cell.addEventListener("click", handleTableCellClick));

// add function startNewGame to play again button event listener
document.querySelector("#reset-btn").addEventListener("click", startNewGame);

startNewGame();
