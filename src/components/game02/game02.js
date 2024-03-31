import './game02.css';
import { printMain } from '../Main/Main.js';

export const printGame02 = () => {
  document.querySelector('#containerGames').innerHTML = `
    <button id="buttonMenu">MENÚ</button>
    <div id="bingoGame" class="flex-container">
      <div id="bingoBoard" class="flex-container"></div>
      <div class="message" id="winMessage" style="display: none;">¡Has ganado!</div>
      <div id="calledNumberDisplay"></div>
      <button id="callNumberBtn">Llamar Número</button>
      <div id="calledNumbersGrid"></div>
      <div id="buttonContainer" class="flex-container">
      <button class="buttonRestart" id="buttonRestart">Reiniciar</button>
      </div>
    </div>`;

  const menuButton = document.querySelector('#buttonMenu');
  menuButton.addEventListener('click', () => {
    printMain();
  });

  const bingoBoard = document.getElementById('bingoBoard');
  const callNumberBtn = document.getElementById('callNumberBtn');
  const calledNumberDisplay = document.getElementById('calledNumberDisplay');
  const buttonRestart = document.querySelector('#buttonRestart');
  const winMessage = document.getElementById('winMessage');

  let calledNumbers = [];
  let allNumbersMarked = false;

  // Crear la función "generateBingoCard" para enerar un cartón de bingo con números aleatorios:
  const generateBingoCard = () => {
    const card = [];
    const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
    for (let i = 0; i < 5; i++) {
      const column = [];
      for (let j = 0; j < 5; j++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const number = numbers.splice(randomIndex, 1)[0];
        column.push(number);
      }
      card.push(column);
    }
    return card;
  };

  // Crear la función "addToCalledNumbersGrid" para agregar un número a la cuadrícula de números llamados
  const addToCalledNumbersGrid = (number) => {
    const calledNumbersGrid = document.getElementById('calledNumbersGrid');
    const calledNumberElement = document.createElement('div');
    calledNumberElement.textContent = number;
    calledNumbersGrid.appendChild(calledNumberElement);
  };

  // Crear la función "callNumber" para llamar un número aleatorio y marcarlo en el cartón:
  const callNumber = () => {
    if (!allNumbersMarked) {
      let number;
      do {
        number = getRandomNumber(1, 75);
      } while (calledNumbers.includes(number));
      calledNumbers.push(number);
      calledNumberDisplay.textContent = `Número llamado: ${number}`;
      markNumber(number);
      checkWinner();
      addToCalledNumbersGrid(number);
    }
  };

  // Crear la función "markNumber" para marcar un número en el cartón:
  const markNumber = (number) => {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell) => {
      if (cell.textContent == number) {
        cell.classList.add('marked');
      }
    });
  };

  // Crear la función "checkWinner" para verifica si todos los números están marcados y mostrar un mensaje de ganador:
  const checkWinner = () => {
    const cells = document.querySelectorAll('.bingo-cell');
    const allMarked = Array.from(cells).every((cell) =>
      cell.classList.contains('marked')
    );
    if (allMarked) {
      allNumbersMarked = true;
      winMessage.style.display = 'block';
    }
  };

  const bingoCard = generateBingoCard();
  const board = document.createElement('div');
  board.classList.add('bingo-board');
  bingoCard.forEach((column, colIndex) => {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('bingo-column');
    column.forEach((number, rowIndex) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('bingo-cell');
      cellDiv.textContent = number;
      columnDiv.appendChild(cellDiv);
    });
    board.appendChild(columnDiv);
  });
  bingoBoard.appendChild(board);

  // Crear un evento de "click" para llamar un número:
  callNumberBtn.addEventListener('click', callNumber);

  //Crear la función "resetGame" para restablecer el juego:
  const resetGame = () => {
    const calledNumbersGrid = document.querySelector('#calledNumbersGrid');
    // Restablece el estado del juego a su estado inicial
    calledNumbers = [];
    calledNumberDisplay.textContent = '';
    calledNumbersGrid.innerHTML = '';

    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell) => {
      cell.classList.remove('marked');
    });

    calledNumberDisplay.textContent = '';
    allNumbersMarked = false;
    winMessage.style.display = 'none';
    calledNumbers = [];

    // Imprimir un nuevo juego
    printGame02();
  };

  buttonRestart.addEventListener('click', resetGame);
};

//Crear la función "getRandomNumber" para generar un número aleatorio:
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
