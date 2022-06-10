
const board = [null, '0', null, '1', null, '2', null, '3',
    '4', null, '5', null, '6', null, '7', null,
    null, '8', null, '9', null, '10', null, '11',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    '12', null, '13', null, '14', null, '15', null,
    null, '16', null, '17', null, '18', null, '19',
    '20', null, '21', null, '22', null, '23', null];

// DOM Variables
const squares = document.querySelectorAll('td');
let blackCheckers = document.querySelectorAll('p.black-checker');
let redCheckers = document.querySelectorAll('p.red-checker');
let elH = document.querySelector('h2');

// Player properties
let turn = true;
let scoreRed = 12;
let scoreBlack = 12;
let playerCheckers;

// Selected Checker properties
let selectedChecker = {
    checkerId: -1,
    indexOfBoardChecker: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

let findChecker = function (checkerId) {
    return board.indexOf(`${checkerId}`);
};

// Give Checkers by turn Event Listeners
function giveCheckersEventListeners() {
    if (turn) {
        for (let i = 0; i < redCheckers.length; i++) {
            redCheckers[i].addEventListener('click', getPlayerCheckers);
        }
    } else {
        for (let i = 0; i < blackCheckers.length; i++) {
            blackCheckers[i].addEventListener('click', getPlayerCheckers);
        }
    }
}


// Holds the length of the players checker count
function getPlayerCheckers(evt) {
    if (turn) {
        playerCheckers = redCheckers;
    } else {
        playerCheckers = blackCheckers;
    }
    removeSquareOnClick();
    resetBorders(evt);
}

// Removes possible moves from old selected checker
function removeSquareOnClick() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeAttribute('onClick');
    }
}

// Reset borders
function resetBorders(evt) {
    for (let i = 0; i < playerCheckers.length; i++) {
        playerCheckers[i].style.border = '5px solid white';
    }
    for (let j = 0; j < squares.length; j++) {
        squares[j].style.border = '1px solid white';
    }
    resetSelectedChecker();
    getSelectedChecker(evt);
}

// Reset selected checker
function resetSelectedChecker() {
    // console.log('Reset Selected Checker');
    selectedChecker.checkerId = -1;
    selectedChecker.indexOfBoardChecker = -1;
    selectedChecker.isKing = false;
    selectedChecker.seventhSpace = false;
    selectedChecker.ninthSpace = false;
    selectedChecker.fourteenthSpace = false;
    selectedChecker.eighteenthSpace = false;
    selectedChecker.minusSeventhSpace = false;
    selectedChecker.minusNinthSpace = false;
    selectedChecker.minusFourteenthSpace = false;
    selectedChecker.minusEighteenthSpace = false;
}

// Grabs ID and index of the board squares its on
function getSelectedChecker(evt) {
    console.log(event.target.id);
    selectedChecker.checkerId = event.target.id;
    selectedChecker.indexOfBoardChecker = findChecker(selectedChecker.checkerId);
    checkAvailableSpaces();
}

// Check if selected checker is a king


// Check available moves from selected checker
function checkAvailableSpaces() {
    if (board[selectedChecker.indexOfBoardChecker + 7] === null && squares[selectedChecker.indexOfBoardChecker + 7].classList.contains('noChecker') !== true) {
        selectedChecker.seventhSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker + 9] === null && squares[selectedChecker.indexOfBoardChecker + 9].classList.contains('noChecker') !== true) {
        selectedChecker.ninthSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker - 7] === null && squares[selectedChecker.indexOfBoardChecker - 7].classList.contains('noChecker') !== true) {
        selectedChecker.minusSeventhSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker - 9] === null && squares[selectedChecker.indexOfBoardChecker - 9].classList.contains('noChecker') !== true) {
        selectedChecker.minusNinthSpace = true;
    }
    checkJumpSpaces();
}

function checkJumpSpaces() {
    if (board[selectedChecker.indexOfBoardChecker + 14] === null &&
        squares[selectedChecker.indexOfBoardChecker + 14].classList.contains('noChecker') !== true &&
        board[selectedChecker.indexOfBoardChecker + 7] !== null &&
        board[selectedChecker.indexOfBoardChecker + 7] >= 12) {
        selectedChecker.fourteenthSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker + 18] === null &&
        squares[selectedChecker.indexOfBoardChecker + 18].classList.contains('noChecker') !== true &&
        board[selectedChecker.indexOfBoardChecker + 9] !== null &&
        board[selectedChecker.indexOfBoardChecker + 9] >= 12) {
        selectedChecker.eighteenthSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker - 14] === null &&
        squares[selectedChecker.indexOfBoardChecker - 14].classList.contains('noChecker') !== true &&
        board[selectedChecker.indexOfBoardChecker - 7] !== null &&
        board[selectedChecker.indexOfBoardChecker - 7] <= 11) {
        selectedChecker.minusFourteenthSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker - 18] === null &&
        squares[selectedChecker.indexOfBoardChecker - 18].classList.contains('noChecker') !== true &&
        board[selectedChecker.indexOfBoardChecker - 9] !== null &&
        board[selectedChecker.indexOfBoardChecker - 9] <= 11) {
        selectedChecker.minusEighteenthSpace = true;
    }
    checkerConditions();
}

// Check Checker Conditions
function checkerConditions() {
    if (selectedChecker.isKing) {
        addCheckerBorder()
    } else {
        if (turn) {
            selectedChecker.seventhSpace = false;
            selectedChecker.ninthSpace = false;
            selectedChecker.fourteenthSpace = false;
            selectedChecker.eighteenthSpace = false;
        } else {
            selectedChecker.minusSeventhSpace = false;
            selectedChecker.minusNinthSpace = false;
            selectedChecker.minusFourteenthSpace = false;
            selectedChecker.minusEighteenthSpace = false;
        }
        addCheckerBorder();
    }
}

// Adds green boarder to selected checker
function addCheckerBorder() {
    console.log(selectedChecker);
    if (selectedChecker.isKing) {
        document.getElementById(selectedChecker.checkerId).style.border = '5px solid yellow';
    }
    if (selectedChecker.seventhSpace || selectedChecker.ninthSpace || selectedChecker.fourteenthSpace || selectedChecker.eighteenthSpace
        || selectedChecker.minusSeventhSpace || selectedChecker.minusNinthSpace || selectedChecker.minusFourteenthSpace || selectedChecker.minusEighteenthSpace) {
        document.getElementById(selectedChecker.checkerId).style.border = '5px solid green';
    }
    addSquareBorder();
}

// Adds green boarder to all available squares
function addSquareBorder() {
    if (turn) { // Red Available Squares
        if (selectedChecker.minusSeventhSpace) {
            document.getElementById(`s${selectedChecker.indexOfBoardChecker - 7}`).style.border = '5px solid green';
        }
        if (selectedChecker.minusNinthSpace) {
            document.getElementById(`s${selectedChecker.indexOfBoardChecker - 9}`).style.border = '5px solid green';
        }
        if (selectedChecker.minusFourteenthSpace) {
            document.getElementById(`s${selectedChecker.indexOfBoardChecker - 14}`).style.border = '5px solid green';
        }
        if (selectedChecker.minusEighteenthSpace) {
            document.getElementById(`s${selectedChecker.indexOfBoardChecker - 18}`).style.border = '5px solid green';
        }
    } else { // Black Available Squares
        if (selectedChecker.seventhSpace) {
            document.getElementById(`s${selectedChecker.indexOfBoardChecker + 7}`).style.border = '5px solid green';
        }
        if (selectedChecker.ninthSpace) {
            document.getElementById(`s${selectedChecker.indexOfBoardChecker + 9}`).style.border = '5px solid green';
        }
        if (selectedChecker.fourteenthSpace) {
            document.getElementById(`s${selectedChecker.indexOfBoardChecker + 14}`).style.border = '5px solid green';
        }
        if (selectedChecker.eighteenthSpace) {
            document.getElementById(`s${selectedChecker.indexOfBoardChecker + 18}`).style.border = '5px solid green';
        }
    }
    giveCellsClick();
}

function giveCellsClick() {
    if (selectedChecker.seventhSpace) {
        squares[`${selectedChecker.indexOfBoardChecker + 7}`].setAttribute('onclick', 'moveChecker(7)');
    }
    if (selectedChecker.ninthSpace) {
        squares[`${selectedChecker.indexOfBoardChecker + 9}`].setAttribute('onclick', 'moveChecker(9)');
    }
    if (selectedChecker.fourteenthSpace) {
        squares[`${selectedChecker.indexOfBoardChecker + 14}`].setAttribute('onclick', 'moveChecker(14)');
    }
    if (selectedChecker.eighteenthSpace) {
        squares[`${selectedChecker.indexOfBoardChecker + 18}`].setAttribute('onclick', 'moveChecker(18)');
    }
    if (selectedChecker.minusSeventhSpace) {
        squares[`${selectedChecker.indexOfBoardChecker - 7}`].setAttribute('onclick', 'moveChecker(-7)');
    }
    if (selectedChecker.minusNinthSpace) {
        squares[`${selectedChecker.indexOfBoardChecker - 9}`].setAttribute('onclick', 'moveChecker(-9)');
    }
    if (selectedChecker.minusFourteenthSpace) {
        squares[`${selectedChecker.indexOfBoardChecker - 14}`].setAttribute('onclick', 'moveChecker(-14)');
    }
    if (selectedChecker.minusEighteenthSpace) {
        squares[`${selectedChecker.indexOfBoardChecker - 18}`].setAttribute('onclick', 'moveChecker(-18)');
    }
}
function moveChecker(number) {
    document.getElementById(selectedChecker.checkerId).remove();
    squares[selectedChecker.indexOfBoardChecker].innerHTML = '';
    if (turn) {
        if (selectedChecker.isKing) {
            redCheckers = document.querySelectorAll('p.red-checker');
        } else {
            squares[selectedChecker.indexOfBoardChecker + number].innerHTML = `<p class="red-checker" id="${selectedChecker.checkerId}"></p>`;
            redCheckers = document.querySelectorAll('p.red-checker');
        }
    } else {
        if (selectedChecker.isKing) {
            blackCheckers = document.querySelectorAll('p.black-checker');
        } else {
            squares[selectedChecker.indexOfBoardChecker + number].innerHTML = `<p class="black-checker" id="${selectedChecker.checkerId}"></p>`;
            blackCheckers = document.querySelectorAll('p.black-checker');
        }
    }

    let indexOfChecker = selectedChecker.indexOfBoardChecker
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        updateData(indexOfChecker, indexOfChecker + number, indexOfChecker + number / 2);
    } else {
        updateData(indexOfChecker, indexOfChecker + number);
    }
}

// Change the board state in the back end
function updateData(indexOfBoardChecker, newIdx, removeChecker) {
    board[indexOfBoardChecker] = null;
    board[newIdx] = `${selectedChecker.checkerId}`;
    if (turn && selectedChecker.checkerId < 12 && newIdx >= 57) {
        document.getElementById(selectedChecker.checkerId).classList.add("king")
    }
    if (turn === false && selectedChecker.checkerId >= 12 && newIdx <= 7) {
        document.getElementById(selectedChecker.checkerId).classList.add("king");
    }
    if (removeChecker) {
        board[removeChecker] = null;
        if (turn && selectedChecker.checkerId >= 12) {
            squares[removeChecker].innerHTML = '';
            scoreRed--;
        }
        if (turn === false && selectedChecker.checkerId <= 11) {
            squares[removeChecker].innerHTML = '';
            scoreBlack--;
        }
    }
    resetBorders();
    removeSquareOnClick();
    removeEventListeners();
}

// Removes the onClick event listeners for checkers
function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redCheckers.length; i++) {
            redCheckers[i].removeEventListener("click", getPlayerCheckers);
        }
    } else {
        for (let i = 0; i < blackCheckers.length; i++) {
            blackCheckers[i].removeEventListener("click", getPlayerCheckers);
        }
    }
    checkForWin();
}

function checkForWin() {
    if (scoreBlack === 0) {
        elH.classList.remove('red-turn');
        elH.innerHTML = 'Black Wins!!!';
        elH.classList.add('black-turn');
    } else if (scoreRed === 0) {
        elH.classList.remove('black-turn');
        elH.innerHTML = 'Red Wins!!!';
        elH.classList.add('red-turn');
    } else {
        changePlayer();
    }
    
}

function changePlayer() {
    // console.log('Turn Changed');
    if (turn) {
        turn = false;
        elH.classList.remove('red-turn');
        elH.innerHTML = 'Blacks Turn';
        elH.classList.add('black-turn');

    } else {
        turn = true;
        elH.classList.remove('black-turn');
        elH.innerHTML = 'Reds Turn';
        elH.classList.add('red-turn');
    }
    giveCheckersEventListeners();
}

giveCheckersEventListeners();