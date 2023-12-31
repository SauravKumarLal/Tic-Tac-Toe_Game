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
        //we need to remove green color too (initialize box with css properties again)
        box.classList = `box box${index+1}`;

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
    let winner = "";
    //all 3 boxes should be non-empty and retains exactly same value
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            
            //check if winner is X or O
            if(gameGrid[position[0]] === "X"){
                winner = "X";
            }
            else{
                winner = "O";
            }
            //disable pointer event as we've the winner -->continue from here
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";

            })

            //now we know who is winner -> mark them green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //logic for the appearance of new game as we have a winner
    if(winner !== ""){
        gameInfo.innerText = `Winner - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there's no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box != "")
            fillCount++;
    });

    //game ties when board is filled
    if(fillCount === 9){
        gameInfo.innerText = "LOL! Game Tied!!";
        newGameBtn.classList.add("active");
        return;
    }


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