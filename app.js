const x_class="x";
const circle_class="circle";
const winning_combinations=[[0,1,2],[6,7,8],[3,4,5],[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]]

const cellElements=document.querySelectorAll("[data-cell]");
const board=document.getElementById("board");
const winningMessageText=document.querySelector("[data-winning-message-text]");
const winningMessageElement=document.getElementById("winningMessage");
var circleTurn;
startGame();

restartButton.addEventListener('click',startGame);

function startGame(){
    circleTurn=false;
    winningMessageElement.classList.remove('show')
    setHoverBoardClass();
    cellElements.forEach(cell=>{
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once:true});
    })
}

function handleClick(e){
    const cell=e.target;
    const currentClass=circleTurn? circle_class:x_class;
    placemark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
       endGame(true);
    }else{
        swapTurns();
        setHoverBoardClass();
    }
}

function endGame(draw){
    if(draw){
        winningMessageText.innerText="DRAW!";
    }else{
        winningMessageText.innerText=`${circleTurn?"O WINS!":
    "X WINS!"}`
    }
    winningMessageElement.classList.add('show')
}
function placemark(cell,currentClass){
    cell.classList.add(currentClass);
}
function swapTurns(){
    circleTurn=!circleTurn;
}
function setHoverBoardClass(){
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if(circleTurn){
        board.classList.add(circle_class);
    }else{
        board.classList.add(x_class);
    }
}
function checkWin(currentClass){
    return winning_combinations.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
})
})
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(x_class)||
        cell.classList.contains(circle_class)
    })
}