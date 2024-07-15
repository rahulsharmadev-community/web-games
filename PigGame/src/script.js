"use strict";

// utility functions
const getDiceValue = () => Math.floor(Math.random() * 6) + 1; // between 1 and 6

function _strToInt(text) {
  if (text === null || text === "") return 0;
  return parseInt(text);
}

// Selecting elements
const finalS0El = document.getElementById("score--0");
const finalS1El = document.getElementById("score--1");

const score0El = document.getElementById("current--0");
const score1El = document.getElementById("current--1");

const rollDiceButton = document.querySelector(".btn.btn--roll");
const holdButton = document.querySelector(".btn.btn--hold");
const newGameButton = document.querySelector(".btn.btn--new");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");

// Hide the dice initially
diceEl.classList.add("hidden");

// Setter & Getter functions
const setFinalScore = (v) => (activePlayer == 0 ? (finalS0El.textContent = v) : (finalS1El.textContent = v));
const setScore = (v) => (activePlayer == 0 ? (score0El.textContent = v) : (score1El.textContent = v));
const getFinalScore = () => _strToInt(activePlayer == 0 ? finalS0El.textContent : finalS1El.textContent);
const getScore = () => _strToInt(activePlayer == 0 ? score0El.textContent : score1El.textContent);

let activePlayer = 0;
let diceValue;
let _isGameComplete = false;

rollDiceButton.addEventListener("click", onTapRollDice);
holdButton.addEventListener("click", onTapHold);
newGameButton.addEventListener("click", onTapNewGame);

// Roll dice functionality
function onTapRollDice() {
  if (isGameComplete()) return;
  diceValue = getDiceValue();
  diceEl.classList.remove("hidden");
  diceEl.src = `assets/dice-${diceValue}.png`;

  if (diceValue !== 1) {
    setScore(diceValue);
    setFinalScore(getFinalScore() + diceValue);
  } else {
    setScore(0);
    switchActivePlayer();
  }

  checkIfPlayerWon();
}

// Hold functionality
function onTapHold() {
  if (isGameComplete()) return;
  setFinalScore(getFinalScore() + diceValue);
  setScore(0);
  switchActivePlayer();
}

// New game functionality
function onTapNewGame() {
  activePlayer = 0;
  _isGameComplete = false;
  finalS0El.textContent = 0;
  finalS1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
}

// Switch active player
function switchActivePlayer() {
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  setTimeout(() => alert(`Player ${activePlayer + 1} turn`), 100);
}

// Check if player won
function checkIfPlayerWon() {
  if (getFinalScore() >= 100) {
    _isGameComplete = true;
    setTimeout(() => alert(`Player ${activePlayer + 1} won`), 100);
  }
}

function isGameComplete() {
  if (_isGameComplete) {
    alert("Game is already complete");
    return true;
  }
  return false;
}
