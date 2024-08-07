let computerMove = '';
let myMove = '';

let resultElem = document.getElementsByClassName('score')[0];
let score = JSON.parse(localStorage.getItem('score')) || 
{
    wins: 0,
    losses: 0,
    ties: 0
};

resultElem.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties:${score.ties}`;

const resultStatementElem = document.getElementsByClassName('result_statement')[0];
const resultRepresentElem = document.getElementsByClassName('result_represent')[0];

const clickSound = new Audio('Sounds/click.mp3');
const winSound = new Audio('Sounds/win.wav');
const loseSound = new Audio('Sounds/lose.wav');

function playSound(sound) {
    if (!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
    }
    sound.play().catch(error => console.error("Playback failed:", error));
}

function chooseRock() {
    myMove = 'rock';
    playSound(clickSound);
    computerMove = chooseMove();
    determineWinner(myMove,computerMove);
}

function choosePaper() {
    myMove = 'paper';
    playSound(clickSound);
    computerMove = chooseMove();
    determineWinner(myMove,computerMove);
}

function chooseScissors() {
    myMove = 'scissors';
    playSound(clickSound);
    computerMove = chooseMove();
    determineWinner(myMove,computerMove);
}

//additional variables
let isAutoPlay = false;
let intervalId;
function autoplay(){
    if(!isAutoPlay){
        intervalId = setInterval(function() {
            let autoMove = chooseMove();
            computerMove = chooseMove();
            determineWinner(autoMove,computerMove);
        },1500);
        document.querySelector('.autoplay').innerHTML = 'Stop';
        isAutoPlay = true;
    } else{
        clearInterval(intervalId);
        document.querySelector('.autoplay').innerHTML = 'AutoPlay';
        isAutoPlay = false;
    }
}   

function chooseMove() {
    let randomNum = Math.random();
    let randomMove;
    if (randomNum <= 1 / 3) {
        randomMove = 'rock';
    } else if (randomNum <= 2 / 3) {
        randomMove = 'paper';
    } else {
        randomMove = 'scissors';
    }

    return randomMove;
}

function determineWinner(myMove,computerMove) {
    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    let resultMessage = '';

    if (myMove === computerMove) {
        resultMessage = "It's a tie!";
        score.ties++;
    } else if (winConditions[myMove] === computerMove) {
        resultMessage = 'You win!';
        score.wins++;
        playSound(winSound);
    } else {
        resultMessage = 'You lose!';
        score.losses++;
        playSound(loseSound);
    }

    localStorage.setItem('score',JSON.stringify(score));

    resultStatementElem.textContent = resultMessage;
    resultRepresentElem.innerHTML = `
        You choose <img src="Images/${myMove}-emoji.png" alt="${myMove}"> The computer choose <img src="Images/${computerMove}-emoji.png" alt="${computerMove}">`;

    resultElem.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties:${score.ties}`;
}

function resetGame() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    resultElem.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties:${score.ties}`;
    resultStatementElem.textContent = '';
    resultRepresentElem.textContent = '';
    localStorage.removeItem('score');
}