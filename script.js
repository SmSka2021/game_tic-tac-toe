/* eslint-disable no-use-before-define */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */

const start = document.querySelector('#start');
const rules = document.querySelector('#rules');
const fields = document.querySelectorAll('.field');
const gameRestart = document.querySelector('.restart');
const resetCount = document.querySelector('.resetCount');

const gameMessage = document.getElementById('fin');
const countUser = document.querySelector('#counterUser');
let counterUser = 0;
countUser.innerHTML = counterUser;

const countComp = document.querySelector('#counterComp');
let counterComp = 0;
countComp.innerHTML = counterComp;

const mapItem = new Map();
let arrResUser = [];
let arrResComp = [];

function setMap() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (const a of arr) {
    const keyMap = a;
    const valueMap = a;
    mapItem.set(keyMap, valueMap);
  }
}

function startGame() {
  rules.classList.add('isHidden');
  gameRestart.classList.add('isHidden');
  resetCount.classList.add('isHidden');
  setMap();
  gameMessage.innerHTML = '';
  fields.forEach((field) => field.addEventListener('click', actionUser));
}

function stopGame(text) {
  gameMessage.textContent = `Победитель ${text}!`;
  fields.forEach((field) => field.removeEventListener('click', actionUser));
  const timerId = setInterval(() => { gameMessage.hidden = !gameMessage.hidden; }, 1000);
  if (text === 'не найден! Попробуйте снова') {
    const audio = new Audio();
    audio.src = './audio/gameOver.mp3';
    audio.autoplay = true;
  } else {
    const audio = new Audio();
    audio.src = './audio/fanfary.mp3';
    audio.autoplay = true;
  }

  gameRestart.classList.remove('isHidden');
  resetCount.classList.remove('isHidden');
  setTimeout(() => { clearInterval(timerId); }, 5000);
}

function newGame() {
  gameRestart.classList.add('isHidden');
  resetCount.classList.add('isHidden');
  fields.forEach((field) => field.innerHTML = '');
  arrResUser = [];
  arrResComp = [];
  startGame();
}

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function checkResult(arr) {
  if (arr.includes(1) && arr.includes(2) && arr.includes(3)) return true;
  if (arr.includes(4) && arr.includes(5) && arr.includes(6)) return true;
  if (arr.includes(7) && arr.includes(8) && arr.includes(9)) return true;
  if (arr.includes(1) && arr.includes(4) && arr.includes(7)) return true;
  if (arr.includes(2) && arr.includes(5) && arr.includes(8)) return true;
  if (arr.includes(3) && arr.includes(6) && arr.includes(9)) return true;
  if (arr.includes(1) && arr.includes(5) && arr.includes(9)) return true;
  if (arr.includes(3) && arr.includes(5) && arr.includes(7)) return true;
  return false;
}

function compAction() {
  const emptyFiled = Array.from(mapItem.keys());
  const lengthMap = emptyFiled.length;
  if (lengthMap) {
    const idRandom = randomInteger(0, lengthMap - 1);
    const image = new Image();
    image.src = './img/schip.png';
    image.alt = 'img';
    const idField = emptyFiled[idRandom];
    arrResComp.push(+idField);
    mapItem.delete(+idField);
    const audio2 = new Audio();
    audio2.src = './audio/water.mp3';
    audio2.autoplay = true;
    document.getElementById(idField).append(image);
    const resComp = checkResult(arrResComp);
    if (resComp) {
      stopGame('капитан Джек Воробей');
      counterComp += 1;
      countComp.innerHTML = counterComp;
    }
  }
  if (!emptyFiled.length) {
    stopGame('не найден! Попробуйте снова');
  }
}

function actionUser(e) {
  e.stopPropagation();
  const field = e.target;
  const idField = field.id;
  const image = new Image();
  image.src = './img/ship7.png';
  image.alt = 'img';
  arrResUser.push(+idField);
  document.getElementById(idField).append(image);
  mapItem.delete(+idField);
  const resUser = checkResult(arrResUser);
  if (resUser) {
    stopGame('королевский Адмирал');
    counterUser += 1;
    countUser.innerHTML = counterUser;
  } else {
    compAction();
  }
}

function resetCountGame() {
  counterUser = 0;
  countUser.innerHTML = counterUser;
  counterComp = 0;
  countComp.innerHTML = counterComp;
  newGame();
}

start.addEventListener('click', startGame);
gameRestart.addEventListener('click', newGame);
resetCount.addEventListener('click', resetCountGame);
