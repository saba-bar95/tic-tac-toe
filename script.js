"use strict";

const gameboardCont = document.querySelector(".gameboard-container");
const controllerDiv = document.querySelector(".gameboard-controller");
let chosenBtns;

const Controller = (() => {
  const signBtns = document.querySelectorAll(".sign-btn");
  const startBtn = document.querySelector(".start-btn");
  const player1 = {};
  const player2 = {};

  signBtns.forEach((el) => {
    el.addEventListener("click", function () {
      el.classList.toggle("chosen");
      if (
        el.nextElementSibling &&
        el.nextElementSibling.classList.contains("chosen")
      )
        el.nextElementSibling.classList.remove("chosen");
      if (
        el.previousElementSibling &&
        el.previousElementSibling.classList.contains("chosen")
      )
        el.previousElementSibling.classList.remove("chosen");
    });
  });

  startBtn.addEventListener("click", function () {
    chosenBtns = document.querySelectorAll(".chosen");
    if (chosenBtns.length <= 1) {
      alert("Choose sign for both players ");
      return;
    }
    if (
      chosenBtns.length > 1 &&
      chosenBtns[0].textContent === chosenBtns[1].textContent
    ) {
      alert("Choose different signs");
      return;
    }
    controllerDiv.classList.add("hidden");
    gameboardCont.classList.remove("hidden");
    player1.sign = chosenBtns[0].textContent;
    player2.sign = chosenBtns[1].textContent;
    displayContent();
  });

  return { player1, player2 };
})();

const Gameboard = (() => {
  const gameboardGrid = document.querySelector(".gameboard-grid");
  const gameboardArr = [];

  for (let i = 1; i < 10; i++) {
    const gameboardItem = document.createElement("div");
    gameboardItem.classList.add("gameboard-item");
    gameboardItem.classList.add(`item-${i}`);
    gameboardGrid.append(gameboardItem);
    gameboardArr.push(gameboardItem);
  }

  return { gameboardArr };
})();

const displayContent = () => {
  const turnBtn = document.querySelector(".turn-btn");
  const player1Div = document.querySelector(".player-1");
  const player2Div = document.querySelector(".player-2");
  const player1Sign = document.createElement("p");
  const player2Sign = document.createElement("p");
  player1Sign.classList.add("player-sign");
  player2Sign.classList.add("player-sign");
  player1Sign.textContent = Controller.player1.sign;
  player2Sign.textContent = Controller.player2.sign;
  player1Div.appendChild(player1Sign);
  player2Div.appendChild(player2Sign);

  if (Controller.player1.sign === "X") {
    Controller.player1.status = "active";
    turnBtn.style.justifySelf = "start";
  } else {
    turnBtn.style.justifySelf = "end";
    Controller.player2.status = "active";
  }

  Gameboard.gameboardArr.forEach((el) => {
    el.addEventListener("click", function () {
      if (el.textContent === "X" || el.textContent === "O") return;
      if (Controller.player1.status) {
        el.textContent = Controller.player1.sign;
        Controller.player1.status = false;
        if (checkResult(Gameboard)) {
          restartGame();
          return;
        } else {
          Controller.player2.status = "active";
        }
        turnBtn.style.justifySelf = "end";
        return;
      }
      if (Controller.player2.status) {
        el.textContent = Controller.player2.sign;
        Controller.player2.status = false;
        if (checkResult(Gameboard)) {
          restartGame();
          return;
        } else {
          Controller.player1.status = "active";
        }
        turnBtn.style.justifySelf = "start";
        return;
      }
    });
  });

  const restartGame = () => {
    const restartBtn = document.querySelector(".restart-btn");
    const gameInfoDiv = document.querySelector(".game-info");
    const playerSigns = document.querySelectorAll(".player-sign");
    turnBtn.textContent = "WIN";
    restartBtn.classList.remove("hidden");
    gameInfoDiv.style.width = "60%";

    restartBtn.addEventListener("click", function () {
      turnBtn.textContent = "TURN";
      Controller.player1.sign = Controller.player2.sign = "";
      Gameboard.gameboardArr.forEach((el) => {
        el.textContent = "";
      });
      controllerDiv.classList.remove("hidden");
      gameboardCont.classList.add("hidden");

      playerSigns.forEach((el) => {
        el.remove();
      });

      chosenBtns.forEach((el) => {
        el.classList.remove("chosen");
      });
    });
  };
};

const checkResult = (arr) => {
  if (
    arr.gameboardArr[0].textContent !== "" &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[2].textContent &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[1].textContent
  )
    return true;
  if (
    arr.gameboardArr[0].textContent !== "" &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[3].textContent &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[6].textContent
  )
    return true;
  if (
    arr.gameboardArr[0].textContent !== "" &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[4].textContent &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[8].textContent
  )
    return true;
  if (
    arr.gameboardArr[1].textContent !== "" &&
    arr.gameboardArr[1].textContent === arr.gameboardArr[4].textContent &&
    arr.gameboardArr[1].textContent === arr.gameboardArr[7].textContent
  )
    return true;
  if (
    arr.gameboardArr[2].textContent !== "" &&
    arr.gameboardArr[2].textContent === arr.gameboardArr[5].textContent &&
    arr.gameboardArr[2].textContent === arr.gameboardArr[8].textContent
  )
    return true;
  if (
    arr.gameboardArr[2].textContent !== "" &&
    arr.gameboardArr[2].textContent === arr.gameboardArr[4].textContent &&
    arr.gameboardArr[2].textContent === arr.gameboardArr[6].textContent
  )
    return true;
  if (
    arr.gameboardArr[3].textContent !== "" &&
    arr.gameboardArr[3].textContent === arr.gameboardArr[4].textContent &&
    arr.gameboardArr[3].textContent === arr.gameboardArr[5].textContent
  )
    return true;
};
