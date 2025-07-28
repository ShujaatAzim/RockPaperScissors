import './styles.css'

const favicons = ["rock.png", "paper.png", "scissors.png"];
const choice = favicons[Math.floor(Math.random() * favicons.length)];
document.getElementById("favicon").href = choice;

function getRandomComputerResult() {
  const options = ["Rock 🪨", "Paper 📃", "Scissors ✂️"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock 🪨" && computer === "Scissors ✂️") ||
    (player === "Scissors ✂️" && computer === "Paper 📃") ||
    (player === "Paper 📃" && computer === "Rock 🪨")
  );
}

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
let playerChoice = "";
let computerChoice = "";

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();
  playerChoice = userOption;
  computerChoice = computerResult;
  roundNumber ++;

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return [`${userOption} beats ${computerResult}`, 'Player wins the round!'];
  } else if (computerResult === userOption) {
    return [`Both chose ${userOption}`, 'It\'s a tie!'];
  } else {
    computerScore++;
    return [`${computerResult} beats ${userOption}`, 'Computer wins the round!'];
  }
}

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundNumberSpanElement = document.getElementById("round-number");
const playerChoiceMsg = document.getElementById("player-choice-msg");
const computerChoiceMsg = document.getElementById("computer-choice-msg")
const roundResultsMsg1 = document.getElementById("results-msg-1");
const roundResultsMsg2 = document.getElementById("results-msg-2");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function showResults(userOption) {
  const roundResults = getRoundResults(userOption)

  roundResultsMsg1.innerText = roundResults[0];
  roundResultsMsg2.innerText = roundResults[1];
  playerChoiceMsg.innerText = `Player chose: ${playerChoice}` 
  computerChoiceMsg.innerText = `Computer chose: ${computerChoice}`
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;
  roundNumberSpanElement.innerText = roundNumber;

  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "Player" : "Computer"
    } has won the game!`;

    rockBtn.setAttribute("disabled", "true");
    paperBtn.setAttribute("disabled", "true");
    scissorsBtn.setAttribute("disabled", "true");
    resetGameBtn.style.display = "block";
  }

};
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  roundNumberSpanElement.innerText = roundNumber;
  optionsContainer.style.display = "block";
  resetGameBtn.style.display = "none";
  playerChoiceMsg.innerText = "";
  computerChoiceMsg.innerText = "";
  winnerMsgElement.innerText = "";
  roundResultsMsg1.innerText = "";
  roundResultsMsg2.innerText = "";
  rockBtn.removeAttribute("disabled");
  paperBtn.removeAttribute("disabled");
  scissorsBtn.removeAttribute("disabled");
};

resetGameBtn.addEventListener("click", resetGame);

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
  showResults("Rock 🪨");
});

paperBtn.addEventListener("click", function () {
  showResults("Paper 📃");
});

scissorsBtn.addEventListener("click", function () {
  showResults("Scissors ✂️");
});