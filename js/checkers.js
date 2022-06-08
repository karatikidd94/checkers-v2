
const board = [null, 'A' , null, 'B' , null, 'C',  null, 'D' ,
               'E' , null, 'F' , null, 'G' , null, 'H' , null,
               null, 'I' , null, 'J' , null, 'K', null, 'L',
               null, null, null, null, null, null, null, null,
               null, null, null, null, null, null, null, null,
               'M', null, 'N', null, 'O', null, 'P', null,
               null, 'Q', null, 'R', null, 'S', null, 'T',
               'U', null, 'V', null, 'W', null, 'X', null];

const squares = document.querySelectorAll('td');
let blackCheckers = document.querySelectorAll('p.black-checker');
let redCheckers = document.querySelectorAll('p.red-checker');
let idString;
let black = `<p class="black-checker" id="${idString}"></p>`;
let red = `<p class="red-checker" id="${idString}"></p>`;
let turn = true; // true = red, false = black
let playerChecker;

let selectedChecker = {
    checkerId: -1,
    checkerIdx: -1,
    indexOfBoardChecker: -1,
    isKing: false,
    seventhSpace: false,
    spaceSevenIdx: -1,
    ninthSpace: false,
    spaceNineIdx: -1,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    spaceMinusSeven: -1,
    minusNinthSpace: false,
    spaceMinusNine: -1,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}


function giveCheckersEventListeners() {
    if(turn) {
        for(let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', function(evt) {
                console.log(`Clicked Red: ${evt.target.id}`);
                playerChecker = evt.target.id;  // Returns: '0-63' , 'A-W'
                selectedChecker.indexOfBoardChecker = playerChecker;

                if(selectedChecker.spaceSevenIdx == selectedChecker.indexOfBoardChecker || selectedChecker.spaceNineIdx == selectedChecker.indexOfBoardChecker) {
                    console.log('I moved Red!');
                    // console.log(selectedChecker);
                    deselectChecker(playerChecker, selectedChecker.checkerIdx);
                    moveChecker(selectedChecker.checkerId, selectedChecker.indexOfBoardChecker, playerChecker);
                    console.log(selectedChecker);
                    turn = false;
                    
                } else if(document.getElementById(`${playerChecker}`).hasAttribute('style') && playerChecker != null) {
                    console.log('I cleared Red!');
                    // console.log(selectedChecker);
                    deselectChecker(playerChecker, selectedChecker.checkerIdx);
                    console.log(selectedChecker);
                    

                } else {
                    console.log('I selected Red!');
                    selectChecker(playerChecker);
                    getAvailableMoves(playerChecker, evt);
                    console.log(selectedChecker);
                    

                } 
            });
        }

    } else if(turn == false){
        for(let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', function(evt) {
                console.log(`Clicked Black: ${evt.target.id}`);
                playerChecker = evt.target.id;  // Returns: '0-63' , 'A-W'
                selectedChecker.indexOfBoardChecker = playerChecker;

                if(selectedChecker.spaceMinusSeven == selectedChecker.indexOfBoardChecker || selectedChecker.spaceMinusNine == selectedChecker.indexOfBoardChecker) {
                    console.log('I moved Black!');
                    // console.log(selectedChecker);
                    deselectChecker(playerChecker, selectedChecker.checkerIdx);
                    moveChecker(selectedChecker.checkerId, selectedChecker.indexOfBoardChecker, playerChecker);
                    console.log(selectedChecker);
                    turn = true;
                    
                } else if(document.getElementById(`${playerChecker}`).hasAttribute('style') && playerChecker != null) {
                    console.log('I cleared Black!');
                    // console.log(selectedChecker);
                    deselectChecker(playerChecker, selectedChecker.checkerIdx);
                    console.log(selectedChecker);
                    

                } else {
                    console.log('I selected Black!');
                    selectChecker(playerChecker);
                    getAvailableMoves(playerChecker, evt);
                    console.log(selectedChecker);
                    

                } 
            });
        }
    }
}


function deselectChecker(a , b) { 
    console.log(`PlayerChecker: ${a}`);
    console.log(`CheckerIdx: ${b}`);
    if(turn) {
        document.getElementById(a).removeAttribute('style');
        selected = false;
        document.getElementById(b-7).removeAttribute('style');
        selectedChecker.seventhSpace = false;
        document.getElementById(b-9).removeAttribute('style');
        selectedChecker.ninthSpace = false;
        document.getElementById(b-14).removeAttribute('style');
        selectedChecker.fourteenthSpace = false;
        document.getElementById(b-18).removeAttribute('style');
        selectedChecker.eighteenthSpace = false;
        
    } else {
        document.getElementById(a).removeAttribute('style');
        selected = false;
        document.getElementById(b+7).removeAttribute('style');
        selectedChecker.seventhSpace = false;
        document.getElementById(b+9).removeAttribute('style');
        selectedChecker.ninthSpace = false;
        document.getElementById(b+14).removeAttribute('style');
        selectedChecker.fourteenthSpace = false;
        document.getElementById(b+18).removeAttribute('style');
        selectedChecker.eighteenthSpace = false;
    }

}

function selectChecker(a) {
        let idx = board.indexOf(a);
        selectedChecker.checkerId = a;
        selectedChecker.spaceSevenIdx = idx-7;
        selectedChecker.spaceNineIdx = idx-9;
        selectedChecker.spaceMinusSeven = idx+7
        selectedChecker.spaceMinusNine = idx+9
        if(document.getElementById(board[idx]).hasAttribute('class')) {
            selectedChecker.checkerIdx = idx;
            console.log(document.getElementById(`${a}`));
            document.getElementById(`${a}`).style.border = '5px solid green';
        }
}

function getAvailableMoves(m, evt) {
    let idx = board.indexOf(m);
    // selectedChecker.checkerId = m;
    selectedChecker.indexOfBoardChecker = idx;
    let spaceSevenR = document.getElementById(idx-7);
    let spaceNineR = document.getElementById(idx-9);
    let spaceFourteenR = document.getElementById(idx-14);
    let spaceEighteenR = document.getElementById(idx-18);
    let spaceSevenB = document.getElementById(idx+7)
    let spaceNineB = document.getElementById(idx+9);
    let spaceFourteenB = document.getElementById(idx+14);
    let spaceEighteenB = document.getElementById(idx+18);
    
    if(turn) { // Available moves for Red Checkers
         if(board[idx - 7] == null && spaceSevenR.classList.contains('noPiece') == false) {
            console.log(`Plus Seven Spaces Red: ${board[idx - 7]}`);
            selectedChecker.seventhSpace = true;
            spaceSevenR.style.border = '3px solid red';
            spaceSevenR.style.cursor = 'pointer';
         }
         if(board[idx - 9] == null && spaceNineR.classList.contains('noPiece') == false) { 
            console.log(`Plus Nine Spaces Red: ${board[idx - 9]}`);
            selectedChecker.ninthSpace = true;
            spaceNineR.style.border = '3px solid red';
            spaceNineR.style.cursor = 'pointer';
         } 
         if(board[idx - 7] != null && board[idx - 14] == null && spaceFourteenR.classList.contains('noPiece') == false && document.getElementById(board[idx-7]).classList.contains('black-checker') == true) {
            console.log(`Plus Fourteen Spaces Red: ${board[idx - 14]}`);
            selectedChecker.fourteenthSpace = true;
            spaceFourteenR.style.border = '3px solid red';
            spaceFourteenR.style.cursor = 'pointer';
         }
         if(board[idx - 9] != null && board[idx - 18] == null && spaceEighteenR.classList.contains('noPiece') == false && document.getElementById(board[idx-9]).classList.contains('black-checker') == true) {
            console.log(`Plus Eighteen Spaces Red: ${board[idx - 18]}`);
            selectedChecker.eighteenthSpace = true;
            spaceEighteenR.style.border = '3px solid red';
            spaceEighteenR.style.cursor = 'pointer';
         }
        
            
    } else { // Available moves for Black Checkers
        if(board[idx + 7] == null && spaceSevenB.classList.contains('noPiece') == false) {
            console.log(`Plus Seven Spaces Black: ${board[idx + 7]}`);
            selectedChecker.minusSeventhSpace = true;
            spaceSevenB.style.border = '3px solid red';
            spaceSevenB.style.cursor = 'pointer';
         }
         if(board[idx + 9] == null && spaceNineB.classList.contains('noPiece') == false) { 
            console.log(`Plus Nine Spaces Black: ${board[idx + 9]}`);
            selectedChecker.minusNinthSpace = true;
            spaceNineB.style.border = '3px solid red';
            spaceNineB.style.cursor = 'pointer';
         } 
         if(board[idx + 7] != null && board[idx + 14] == null && spaceFourteenR.classList.contains('noPiece') == false && document.getElementById(board[idx+7]).classList.contains('red-checker') == true) {
            console.log(`Plus Fourteen Spaces Black: ${board[idx + 14]}`);
            selectedChecker.minusFourteenthSpace = true;
            spaceFourteenB.style.border = '3px solid red';
            spaceFourteenB.style.cursor = 'pointer';
         }
         if(board[idx + 9] != null && board[idx + 18] == null && spaceEighteenB.classList.contains('noPiece') == false && document.getElementById(board[idx+9]).classList.contains('red-checker') == true) {
            console.log(`Plus Eighteen Spaces Black: ${board[idx + 18]}`);
            selectedChecker.minusEighteenthSpace = true;
            spaceEighteenB.style.border = '3px solid red';
            spaceEighteenB.style.cursor = 'pointer';
         }
    }
    
}

function moveChecker(id, idx, newidx) {
    console.log(`Index Move: ${idx}`);
    let newIdx = selectedChecker.checkerIdx;
    console.log(newIdx);
    document.getElementById(newIdx).innerHTML = '';
    board[newIdx] = null;
    if(turn) {
        idString = id;
        document.getElementById(newidx).innerHTML = `<p class="red-checker" id="${idString}"></p>`;
        board[newidx] = id;
        selectedChecker.checkerId = -1;
        selectedChecker.checkerIdx = -1;
        selectedChecker.indexOfBoardChecker = -1;
        selectedChecker.spaceSevenIdx = -1;
        selectedChecker.spaceNineIdx = -1;
    } else {
        idString = id;
        document.getElementById(newidx).innerHTML = `<p class="black-checker" id="${idString}"></p>`;
        board[newidx] = id;
        selectedChecker.checkerId = -1;
        selectedChecker.checkerIdx = -1;
        selectedChecker.indexOfBoardChecker = -1;
        selectedChecker.spaceMinusSeven = -1;
        selectedChecker.spaceMinusNine = -1;
    }
}




giveCheckersEventListeners();