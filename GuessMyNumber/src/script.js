"use strict";

const MAX_SCORE = 20;
const MARGIN = 3;

let targetNumber = generateRandomNumber();
let currentScore = MAX_SCORE;
let scoreDecrementer = 1;

const messageElement = document.querySelector(".message");
const guessInput = document.querySelector(".guess");
const checkButton = document.querySelector(".btn.check");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".highscore");
const numberElement = document.querySelector(".number");
const againButton = document.querySelector(".btn.again");

console.log(targetNumber);

checkButton.addEventListener("click", handleCheckButtonClick);
againButton.addEventListener("click", resetGame);

function generateRandomNumber() {
  return Math.round(Math.random() * 20);
}

function updateScore() {
  currentScore -= scoreDecrementer++;
  scoreElement.textContent = currentScore.toString();
}

function handleCheckButtonClick() {
  if (currentScore <= 0) {
    lostGame();
    return;
  }

  const guessedNumber = parseInt(guessInput.value);

  if (isNaN(guessedNumber)) {
    messageElement.textContent = "🚫 No Number";
    return;
  }

  if (guessedNumber === targetNumber) {
    winGame();
  } else if (guessedNumber > targetNumber - MARGIN && guessedNumber < targetNumber + MARGIN) {
    messageElement.textContent = guessedNumber > targetNumber ? "Little Larger" : "Little Smaller";
  } else if (guessedNumber > targetNumber) {
    messageElement.textContent = "Too Large";
  } else {
    messageElement.textContent = "Too Small";
  }

  if (guessedNumber !== targetNumber) {
    numberElement.textContent = "?";
    updateScore();
  }
}

function lostGame() {
  messageElement.textContent = "🤐 You lost the game";
  alert("You lost the game?");
}

function winGame() {
  messageElement.textContent = "😗 Correct guess";
  numberElement.textContent = targetNumber.toString();

  const currentHighScore = parseInt(highscoreElement.textContent);
  if (currentScore > currentHighScore) {
    highscoreElement.textContent = currentScore.toString();
  }
  setTimeout(() => {
    alert("You won the game?");
    messageElement.textContent = "🎉 You won the game";
  }, 200);
}

function resetGame() {
  targetNumber = generateRandomNumber();
  currentScore = MAX_SCORE;
  scoreDecrementer = 1;

  messageElement.textContent = "Start guessing...";
  guessInput.value = "";
  scoreElement.textContent = currentScore.toString();
  numberElement.textContent = "?";

  alert("Game reset");
}
