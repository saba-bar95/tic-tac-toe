"use strict";

const gameboardDiv = document.querySelector(".gameboard-container");

const Controller = (() => {
  const controllerDiv = document.querySelector(".gameboard-controller");
  const signBtns = document.querySelectorAll(".sign-btn");
  const startBtn = document.querySelector(".start-btn");

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
    const chosenBtns = document.querySelectorAll(".chosen");
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
    gameboardDiv.classList.remove("hidden");
  });
})();

const Gameboard = (() => {
  const gameboardArr = [];
  for (let i = 0; i < 9; i++) {
    const gameboardItem = document.createElement("div");
    gameboardItem.classList.add("gameboard-item");
    gameboardDiv.append(gameboardItem);
    gameboardArr.push(gameboardItem);
  }
  return { gameboardArr };
})();
