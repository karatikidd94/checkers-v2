
const board = [null, '0' , null, '1' , null, '2',  null, '3' ,
               '4' , null, '5' , null, '6' , null, '7' , null,
               null, '8' , null, '9' , null, '10', null, '11',
               null, null, null, null, null, null, null, null,
               null, null, null, null, null, null, null, null,
               '12', null, '13', null, '14', null, '15', null,
               null, '16', null, '17', null, '18', null, '19',
               '20', null, '21', null, '22', null, '23', null];

const squares = document.querySelectorAll('td');
let blackCheckers = document.querySelectorAll('p.black-checker');
let redCheckers = document.querySelectorAll('p.red-checker');
let id;
let black = `<p class="black-checker" id="${id}"></p>`;
let red = `<p class="red-checker" id="${id}"></p>`;
let turn = true; // true = red, false = black
let playerChecker;

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


function giveCheckersEventListeners() {
    if(turn) {
        for(let i = 0; i < redCheckers.length; i++) {
            redCheckers[i].addEventListener('click', function(evt) {
                console.log(`Clicked Red: ${evt.target.id}`);
                playerChecker = evt.target.id;
                if(document.getElementById(`${playerChecker}`).hasAttribute('style')) {
                    deselectChecker(playerChecker);
                } else {
                    selectChecker(playerChecker);
                    getAvailableMoves(playerChecker);
                } 
            });
        }
        //turn = false;
    } else {
        for(let i = 0; i < blackCheckers.length; i++) {
            blackCheckers[i].addEventListener('click', function(evt) {
                console.log(`Clicked Black: ${evt.target.id}`);
                playerChecker = evt.target.id;
                if(document.getElementById(`${playerChecker}`).hasAttribute('style')) {
                    deselectChecker(playerChecker);
                } else {
                    selectChecker(playerChecker);
                    getAvailableMoves(playerChecker, evt);
                } 
            });
        }
    }
}

function deselectChecker(a) { 
    console.log(a);
    let idx = board.indexOf(a);
    if(turn) {
        document.getElementById(`${a}`).removeAttribute('style');
        document.getElementById(`s${idx-7}`).removeAttribute('style');
        document.getElementById(`s${idx-9}`).removeAttribute('style');
        document.getElementById(`s${idx-14}`).removeAttribute('style');
        document.getElementById(`s${idx-18}`).removeAttribute('style');
    } else {
        document.getElementById(`${a}`).removeAttribute('style');
        document.getElementById(`s${idx+7}`).removeAttribute('style');
        document.getElementById(`s${idx+9}`).removeAttribute('style');
        document.getElementById(`s${idx+14}`).removeAttribute('style');
        document.getElementById(`s${idx+18}`).removeAttribute('style');
    }
    
}

function selectChecker(a) {
    console.log(document.getElementById(`${a}`));
    document.getElementById(`${a}`).style.border = '5px solid green';
    // grab id 
}

function getAvailableMoves(m, evt) {
    let idx = board.indexOf(m);
    let spaceSevenR = document.getElementById(`s${idx-7}`)
    let spaceNineR = document.getElementById(`s${idx-9}`);
    let spaceFourteenR = document.getElementById(`s${idx-14}`);
    let spaceEighteenR = document.getElementById(`s${idx-18}`);
    let spaceSevenB = document.getElementById(`s${idx+7}`)
    let spaceNineB = document.getElementById(`s${idx+9}`);
    let spaceFourteenB = document.getElementById(`s${idx+14}`);
    let spaceEighteenB = document.getElementById(`s${idx+18}`);
    console.log(`Id #: ${m}`);
    console.log(`Index: ${idx}`);
    console.log(`s7 Type: ${typeof(board[idx-7])}`);
    
    if(turn) { // Available moves for Red Checkers
         if(board[idx - 7] == null) {
            console.log(`Plus Seven Spaces Red: ${board[idx - 7]}`);
            spaceSevenR.style.border = '3px solid red';
            spaceSevenR.style.cursor = 'pointer';
         }
         if(board[idx - 9] == null ) { 
            console.log(`Plus Nine Spaces Red: ${board[idx - 9]}`);
            spaceNineR.style.border = '3px solid red';
            spaceNineR.style.cursor = 'pointer';
         } 
         if(board[idx -7] != null) {
            console.log(`Plus Fourteen Spaces Red: ${board[idx - 14]}`);
            spaceFourteenR.style.border = '3px solid red';
            spaceFourteenR.style.cursor = 'pointer';
         }
         if(board[idx -9] != null) {
            console.log(`Plus Eighteen Spaces Red: ${board[idx - 18]}`);
            spaceEighteenR.style.border = '3px solid red';
            spaceEighteenR.style.cursor = 'pointer';
         }
        
            
    } else { // Available moves for Black Checkers
        if(board[idx + 7] == null) {
            console.log(`Plus Seven Spaces Red: ${board[idx - 7]}`);
            spaceSevenB.style.border = '3px solid red';
            spaceSevenB.style.cursor = 'pointer';
         }
         if(board[idx + 9] == null) { 
            console.log(`Plus Nine Spaces Red: ${board[idx - 9]}`);
            spaceNineB.style.border = '3px solid red';
            spaceNineB.style.cursor = 'pointer';
         } 
         if(board[idx + 7] != null) {
            console.log(`Plus Fourteen Spaces Red: ${board[idx - 14]}`);
            spaceFourteenB.style.border = '3px solid red';
            spaceFourteenB.style.cursor = 'pointer';
         }
         if(board[idx + 9] != null) {
            console.log(`Plus Eighteen Spaces Red: ${board[idx - 18]}`);
            spaceEighteenB.style.border = '3px solid red';
            spaceEighteenB.style.cursor = 'pointer';
         }
    }
    
}


giveCheckersEventListeners();