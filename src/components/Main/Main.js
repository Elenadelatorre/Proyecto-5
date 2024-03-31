import { printGame01 } from './../game01/game01.js';
import { printGame02 } from './../game02/game02.js';
import { printGame03 } from './../game03/game03.js';
import './Main.css';

export const printMain = () => {
  document.querySelector(
    'main'
  ).innerHTML = `<section id="containerGames" class="flex-container">
  <article id="game01" class="flex-container"><button class="gameButton01">Tres en raya</button></article><article id="game02"class="flex-container"><button class="gameButton02">Bingo</button></article><article id="game03" class="flex-container"><button class="gameButton03">Adivina el número</button></article></section>`;

  const tresEnRayaButton = document.querySelector('.gameButton01');
  tresEnRayaButton.addEventListener('click', () => {
    changeToGame01();
  });
  const bingoButton = document.querySelector('.gameButton02');
  bingoButton.addEventListener('click', () => {
    changeToGame02();
  });
  const numeroButton = document.querySelector('.gameButton03');
  numeroButton.addEventListener('click', () => {
    changeToGame03();
  });
};
const changeToGame01 = () => {
  printGame01();
};
const changeToGame02 = () => {
  printGame02();
};
const changeToGame03 = () => {
  printGame03();
};
