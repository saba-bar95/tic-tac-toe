"use strict";

const gameboardCont = document.querySelector(".gameboard-container");
const controllerDiv = document.querySelector(".gameboard-controller");
let selectBtns;
let checkedGameboardArr = [];

const Controller = (() => {
  const signBtns = document.querySelectorAll(".sign-btn");
  const startBtn = document.querySelector(".start-btn");
  const player1 = {};
  const player2 = {};

  signBtns.forEach((el) => {
    el.addEventListener("click", function () {
      el.classList.toggle("selected");

      if (
        el.nextElementSibling &&
        el.nextElementSibling.classList.contains("selected")
      )
        el.nextElementSibling.classList.remove("selected");

      if (
        el.previousElementSibling &&
        el.previousElementSibling.classList.contains("selected")
      )
        el.previousElementSibling.classList.remove("selected");
    });
  });

  startBtn.addEventListener("click", function () {
    selectBtns = document.querySelectorAll(".selected");

    if (selectBtns.length <= 1) {
      alert("Select sign for both players ");
      return;
    }

    if (
      selectBtns.length > 1 &&
      selectBtns[0].textContent === selectBtns[1].textContent
    ) {
      alert("Select different signs");
      return;
    }

    controllerDiv.classList.add("hidden");
    gameboardCont.classList.remove("hidden");
    player1.sign = selectBtns[0].textContent;
    player2.sign = selectBtns[1].textContent;
    displayContent();
  });

  return { player1, player2 };
})();

const Gameboard = (() => {
  const gameboardGrid = document.querySelector(".gameboard-grid");
  const gameboardArr = [];

  for (let i = 0; i < 9; i++) {
    const gameboardItem = document.createElement("div");
    gameboardItem.classList.add("gameboard-item");
    gameboardGrid.append(gameboardItem);
    gameboardArr.push(gameboardItem);
  }

  return { gameboardArr };
})();

const displayContent = () => {
  const turnBtn = document.querySelector(".turn-btn");
  const player1Sign = document.createElement("p");
  const player2Sign = document.createElement("p");
  const player1Div = document.querySelector(".player-1");
  const player2Div = document.querySelector(".player-2");
  const playerPara1 = document.querySelector(".player-para-1");
  const playerPara2 = document.querySelector(".player-para-2");

  player1Sign.classList.add("player-sign");
  player2Sign.classList.add("player-sign");
  player1Sign.textContent = Controller.player1.sign;
  player2Sign.textContent = Controller.player2.sign;
  player1Div.appendChild(player1Sign);
  player2Div.appendChild(player2Sign);
  playerPara1.textContent = "player 1";
  playerPara2.textContent = "player 2";

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
        checkedGameboardArr.push(el);

        if (checkResult(Gameboard)) {
          restartGame();
          return;
        } else if (
          Gameboard.gameboardArr.length === checkedGameboardArr.length
        ) {
          turnBtn.style.justifySelf = "center";
          turnBtn.textContent = "It's a tie";
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
        checkedGameboardArr.push(el);
        if (checkResult(Gameboard)) {
          restartGame();
          return;
        } else if (
          Gameboard.gameboardArr.length === checkedGameboardArr.length
        ) {
          turnBtn.style.justifySelf = "center";
          turnBtn.textContent = "It's a tie";
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

    if (turnBtn.textContent === "turn" || turnBtn.textContent === "TURN")
      turnBtn.textContent = "WIN";

    restartBtn.classList.remove("hidden");
    gameInfoDiv.style.width = "60%";

    restartBtn.addEventListener("click", function () {
      restartBtn.classList.add("hidden");
      checkedGameboardArr = [];
      turnBtn.textContent = "TURN";
      Controller.player1.sign = Controller.player2.sign = "";
      controllerDiv.classList.remove("hidden");
      gameboardCont.classList.add("hidden");

      Gameboard.gameboardArr.forEach((el) => {
        el.textContent = "";
        if (el.classList.contains("winner-div"))
          el.classList.remove("winner-div");
      });

      playerSigns.forEach((el) => {
        el.remove();
      });

      selectBtns.forEach((el) => {
        el.classList.remove("selected");
      });
    });
  };
};

const changeBackground = (arr) => {
  arr.forEach((el) => {
    el.classList.add("winner-div");
  });
};

const checkResult = (arr) => {
  if (
    arr.gameboardArr[0].textContent !== "" &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[2].textContent &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[1].textContent
  ) {
    changeBackground([
      arr.gameboardArr[0],
      arr.gameboardArr[1],
      arr.gameboardArr[2],
    ]);
    return true;
  }
  if (
    arr.gameboardArr[0].textContent !== "" &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[3].textContent &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[6].textContent
  ) {
    changeBackground([
      arr.gameboardArr[0],
      arr.gameboardArr[3],
      arr.gameboardArr[6],
    ]);
    return true;
  }
  if (
    arr.gameboardArr[0].textContent !== "" &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[4].textContent &&
    arr.gameboardArr[0].textContent === arr.gameboardArr[8].textContent
  ) {
    changeBackground([
      arr.gameboardArr[0],
      arr.gameboardArr[4],
      arr.gameboardArr[8],
    ]);
    return true;
  }
  if (
    arr.gameboardArr[1].textContent !== "" &&
    arr.gameboardArr[1].textContent === arr.gameboardArr[4].textContent &&
    arr.gameboardArr[1].textContent === arr.gameboardArr[7].textContent
  ) {
    changeBackground([
      arr.gameboardArr[1],
      arr.gameboardArr[4],
      arr.gameboardArr[7],
    ]);
    return true;
  }
  if (
    arr.gameboardArr[2].textContent !== "" &&
    arr.gameboardArr[2].textContent === arr.gameboardArr[5].textContent &&
    arr.gameboardArr[2].textContent === arr.gameboardArr[8].textContent
  ) {
    changeBackground([
      arr.gameboardArr[2],
      arr.gameboardArr[5],
      arr.gameboardArr[8],
    ]);
    return true;
  }
  if (
    arr.gameboardArr[2].textContent !== "" &&
    arr.gameboardArr[2].textContent === arr.gameboardArr[4].textContent &&
    arr.gameboardArr[2].textContent === arr.gameboardArr[6].textContent
  ) {
    changeBackground([
      arr.gameboardArr[2],
      arr.gameboardArr[4],
      arr.gameboardArr[6],
    ]);
    return true;
  }
  if (
    arr.gameboardArr[3].textContent !== "" &&
    arr.gameboardArr[3].textContent === arr.gameboardArr[4].textContent &&
    arr.gameboardArr[3].textContent === arr.gameboardArr[5].textContent
  ) {
    changeBackground([
      arr.gameboardArr[3],
      arr.gameboardArr[4],
      arr.gameboardArr[5],
    ]);
    return true;
  }
};
