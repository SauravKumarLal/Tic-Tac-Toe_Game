const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer; //X or O
let gameGrid; //3*3 ka array jisme data store hoga while playing

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialize the game
function initGame(){
    currentPlayer="X";
    gameGrid = ["","","","","","","","",""];
    //UI pe v boxes ko empty karna padega
    boxes.forEach((box, index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`; 
}

initGame(); //fn call to display

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

function checkGameOver(){
    // newGameBtn.classList.add("active");
    let answer = "";
}

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer; //ye line UI m change karti hai
        gameGrid[index] = currentPlayer; //ye line gameGrid fn. m change karti hai (inner logic)
        boxes[index].style.pointerEvents = "none";
        //swap the turn
        swapTurn();
        //check if someone has won the game
        checkGameOver();
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);