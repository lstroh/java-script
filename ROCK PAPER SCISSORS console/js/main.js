function computerPlay(){
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return "Rock";
            break;
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            break;
    }
}
function playRound(playerSelection, computerSelection) {
    var _playerSelection = playerSelection.toLowerCase(),_computerSelection = computerSelection.toLowerCase();
    if(_playerSelection === _computerSelection){
        return "This is a Tie";
    } else if (_playerSelection === "rock"){
        if(_computerSelection == "paper"){
            return "You Lost, paper is better than rock";
        } else {
            return "You win , rock breaks scissors";
        }
    } else if (_playerSelection === "paper"){
        if (_computerSelection === "rock"){
            return "You win, paper is better than rock";
        } else {
            return "You lost , scissors are better than paper";
        }
    } else {
        if(_computerSelection === "rock"){
            return "you Lost, rock can breake scissors";
        } else {
            return "You win , scissors are better than paper";
        }
    }

}

function game (){
    console.log(playRound(window.prompt("Please select Rock,Paper or Scissors","Rock"),computerPlay()));
}
game();