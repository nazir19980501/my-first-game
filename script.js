'use strict';
//plyaers
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//player 1 detail
const score0 = document.getElementById('score--0');
const current0 = document.getElementById('current--0');
//player 1 detail
const score1 = document.getElementById('score--1');
const current1 = document.getElementById('current--1');
// buttons
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
// Dice Image
const img = document.querySelector('.dice');

// Player turn
let turn = true;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const ai = async function () {
  if (!turn) {
    roll.removeEventListener('click', rollBtn);
    hold.removeEventListener('click', holdBtn);
    let luck = Math.floor(Math.random() * 6) + 1;

    let i = luck;
    while (i > 0) {
      let luck2 = Math.floor(Math.random() * 6) + 1;
      img.setAttribute('src', `dice-${luck2}.png`);
      if (luck2 != 1) {
        current1.textContent = Number(current1.textContent) + luck2;
      } else {
        roll.addEventListener('click', rollBtn);
        hold.addEventListener('click', holdBtn);
        current1.textContent = 0;
        break;
      }
      i--;
      await sleep(2000);
    }
    roll.addEventListener('click', rollBtn);
    hold.addEventListener('click', holdBtn);
    holdBtn();
  }
};

newGame.addEventListener('click', function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  turn = true;
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
});

const rollBtn = function () {
  blur();
  if (turn) {
    //genrate a number between 1-6
    let luck = Math.floor(Math.random() * 6) + 1;
    img.setAttribute('src', `dice-${luck}.png`);
    if (luck != 1) {
      current0.textContent = Number(current0.textContent) + luck;
    } else {
      turn = false;
      current0.textContent = 0;
      setTimeout(ai, 1000);
    }
  } else {
    setTimeout(ai, 1000);

    //   let luck = Math.floor(Math.random() * 6) + 1;
    //   img.setAttribute('src', `dice-${luck}.png`);
    //   if (luck != 1) {
    //     current1.textContent = Number(current1.textContent) + luck;
    //   } else {
    //     turn = true;
    //     current1.textContent = 0;
    //   }
  }
};

const tim = function () {
  location.reload();
};

function blur() {
  if (turn) {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  } else {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  }
}

const holdBtn = function () {
  blur();
  if (turn) {
    let total = Number(score0.textContent) + Number(current0.textContent);
    if (total >= 100) {
      score0.textContent = total;
      alert('player 1 won the game');
      setTimeout(tim, 2000);
    } else {
      score0.textContent = total;
      current0.textContent = 0;
      turn = false;
      setTimeout(ai, 1000);
    }
  } else {
    let total = Number(score1.textContent) + Number(current1.textContent);
    if (total >= 100) {
      score1.textContent = total;
      alert('player 2 won the game');
      setTimeout(tim, 4000);
    } else {
      score1.textContent = total;
      current1.textContent = 0;
      turn = true;
    }
  }
};

hold.addEventListener('click', holdBtn);
roll.addEventListener('click', rollBtn);
