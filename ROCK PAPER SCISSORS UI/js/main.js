var GplayerSelection = "",GComputerSelection="",GplayerScore=0,GcomputerScore=0;

function resetAll(){
    GplayerSelection = "";
    GComputerSelection = "";
    GplayerScore = 0;
    GcomputerScore = 0;
    updateMsg(3);
    updateScoreMsg("playerScore","Player score : 0");
    updateScoreMsg("coumputerScore","Computer score : 0");
    updateEmpty("playerSelection","user");
    updateEmpty("computerSelection","computer");
}
function computerPlay(){
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            updateRock("computerSelection","computer");
            return "Rock";
        case 1:
            updatePaper("computerSelection","computer");
            return "Paper";
        case 2:
            updateScissors("computerSelection","computer");
            return "Scissors";
        default:
            break;
    }
}
function updateMsg(gameRes){
    var target = document.getElementById("msgSpan"),targetClass = target.classList;
    switch (gameRes) {
        case 0:
            target.textContent = "This is a Tie!";
            if(targetClass.contains('text-success')){
                targetClass.remove('text-success');
                targetClass.add('text-warning');
            } else if(targetClass.contains('text-danger')){
                targetClass.remove('text-danger');
                targetClass.add('text-warning');
            }else if(targetClass.contains('text-warning')){
                //do nothing
            } else {
                targetClass.add('text-warning');
            }
            break;
        case 1:  
            target.textContent = "You win!";
            if(targetClass.contains('text-success')){
                //do nothing
            } else if(targetClass.contains('text-danger')){
                targetClass.remove('text-danger');
                targetClass.add('text-success');
            }else if(targetClass.contains('text-warning')){
                targetClass.remove('text-warning');
                targetClass.add('text-success');
            } else{
                targetClass.add('text-success');
            }
            break;
        case 2:
            target.textContent = "You lose!";
            if(targetClass.contains('text-success')){
                targetClass.remove('text-success');
                targetClass.add('text-danger');
            } else if(targetClass.contains('text-danger')){
                //do nothing
            }else if(targetClass.contains('text-warning')){
                targetClass.remove('text-warning');
                targetClass.add('text-danger');
            } else {
                targetClass.add('text-danger');
            }
            break;
        case 3:
            target.textContent = "Started a new Game! Good Luck !";
            if(targetClass.contains('text-success')){
                targetClass.remove('text-success');
            } else if(targetClass.contains('text-danger')){
                targetClass.remove('text-danger');
            }else if(targetClass.contains('text-warning')){
                targetClass.remove('text-warning');
            }         
        default:
            break;
    }
}
function updateScoreMsg(target,txt){
    var divTarget = document.getElementById(target);
    divTarget.textContent = txt;
}
function updateScore(target){
    switch (target) {
        case 1:
            GplayerScore = GplayerScore + 1;
            updateScoreMsg("playerScore","Player score : " + GplayerScore);
            break;
        case 2:
            GcomputerScore = GcomputerScore + 1;
            updateScoreMsg("coumputerScore","Computer score : " + GcomputerScore);
            break;
        default:
            break;
    }
}
function playRound() {
    var _playerSelection = GplayerSelection.toLowerCase(),_computerSelection = GComputerSelection.toLowerCase();
    if(_playerSelection === _computerSelection){
        updateMsg(0);
    } else if (_playerSelection === "rock"){
        if(_computerSelection == "paper"){
            updateMsg(2);
            updateScore(2);
        } else {
            updateMsg(1);
            updateScore(1);
        }
    } else if (_playerSelection === "paper"){
        if (_computerSelection === "rock"){
            updateMsg(1);
            updateScore(1);
        } else {
            updateMsg(2);
            updateScore(2);
        }
    } else {
        if(_computerSelection === "rock"){
            updateMsg(2);
            updateScore(2);
        } else {
            updateMsg(1);
            updateScore(1);
        }
    }

}

function game (){
    console.log(playRound(window.prompt("Please select Rock,Paper or Scissors","Rock"),computerPlay()));
}
function updateRock(str,player){
    var target = document.getElementById(str).classList;
    if(target.contains('fa-hand-paper-o')){
        target.remove('fa-hand-paper-o');
        target.add('fa-hand-rock-o');
    } else if(target.contains('fa-hand-scissors-o')){
        target.remove('fa-hand-scissors-o');
        target.add('fa-hand-rock-o');
    } else if (target.contains('fa-hand-rock-o')){
        target.remove('fa-hand-rock-o');
        target.add('fa-hand-rock-o');
    } else if(target.contains('fa-question-circle-o')){
        target.remove('fa-question-circle-o');
        target.add('fa-hand-rock-o')
    }
    if(player === "user"){
        GplayerSelection = "rock";
    }else{
        GComputerSelection = "rock";
    }    
    console.log("rock");
}
function updatePaper(str,player){
    var target = document.getElementById(str).classList;
    if(target.contains('fa-hand-paper-o')){
        target.remove('fa-hand-paper-o');
        target.add('fa-hand-paper-o');
    } else if(target.contains('fa-hand-scissors-o')){
        target.remove('fa-hand-scissors-o');
        target.add('fa-hand-paper-o');
    } else if (target.contains('fa-hand-rock-o')){
        target.remove('fa-hand-rock-o');
        target.add('fa-hand-paper-o');
    }else if(target.contains('fa-question-circle-o')){
        target.remove('fa-question-circle-o');
        target.add('fa-hand-paper-o');
    }
    if(player === "user"){
        GplayerSelection = "paper";
    }else{
        GComputerSelection = "paper";
    } 
    console.log("paper");
}
function updateScissors(str,player){
    var target = document.getElementById(str).classList;
    if(target.contains('fa-hand-paper-o')){
        target.remove('fa-hand-paper-o');
        target.add('fa-hand-scissors-o');
    } else if(target.contains('fa-hand-scissors-o')){
        target.remove('fa-hand-scissors-o');
        target.add('fa-hand-scissors-o');
    } else if (target.contains('fa-hand-rock-o')){
        target.remove('fa-hand-rock-o');
        target.add('fa-hand-scissors-o');
    }else if(target.contains('fa-question-circle-o')){
        target.remove('fa-question-circle-o');
        target.add('fa-hand-scissors-o');
    }
    if(player === "user"){
        GplayerSelection = "scissors";
    }else{
        GComputerSelection = "scissors";
    } 
    console.log("scissors");
}
function updateEmpty(str,player){
    var target = document.getElementById(str).classList;
    if(target.contains('fa-hand-paper-o')){
        target.remove('fa-hand-paper-o');
        target.add('fa-question-circle-o');
    } else if(target.contains('fa-hand-scissors-o')){
        target.remove('fa-hand-scissors-o');
        target.add('fa-question-circle-o');
    } else if (target.contains('fa-hand-rock-o')){
        target.remove('fa-hand-rock-o');
        target.add('fa-question-circle-o');
    } else if(target.contains('fa-question-circle-o')){
        target.remove('fa-question-circle-o');
        target.add('fa-question-circle-o');
    }
    if(player === "user"){
        GplayerSelection = "";
    }else{
        GComputerSelection = "";
    } 
}
function afterUserTurn(){
    computerPlay();
    playRound();
}
function addEventListners(){
    document.getElementById("rock").addEventListener("click", function () {
        updateRock("playerSelection","user");
        afterUserTurn();
    });
    document.getElementById("paper").addEventListener("click",function () {
        updatePaper("playerSelection","user");
        afterUserTurn();
    } );
    document.getElementById("scissors").addEventListener("click",function () {
        updateScissors("playerSelection","user");
        afterUserTurn();
    } );
    document.getElementById("newgame").addEventListener("click",resetAll);
}
addEventListners();