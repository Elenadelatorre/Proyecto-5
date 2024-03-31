import { printMain } from './../Main/Main.js';
import './game01.css';

export const printGame01 = () => {
  document.querySelector(
    '#containerGames'
  ).innerHTML = `<button id="buttonMenu">MENÚ</button>
    <div id="playerSelection">
      <button id="playerX">Empieza ❌</button>
      <button id="playerO">Empieza ✅</button>
    </div>
    <div id="tresEnRayaGame" class="flex-container">
    <div id="board" class="board"></div>
    <div id="buttonRestartContainer" class="flex-container">
    <button class="buttonRestart" id="buttonRestart">Reiniciar</button>
    </div>
    <div class="message" id="message"></div>
    </div>
  `;

  // Agrega un event listener al botón MENÚ
  const menuButton = document.querySelector('#buttonMenu');
  menuButton.addEventListener('click', () => {
    printMain();
  });

  const board = document.querySelector('#board');
  const message = document.querySelector('.message');
  const buttonRestart = document.querySelector('#buttonRestart');

  // Ocultar el tablero y el mensaje al principio
  board.style.display = 'none';
  //message.style.display = 'none';
  buttonRestart.style.display = 'none';

  const playerXButton = document.querySelector('#playerX');
  const playerOButton = document.querySelector('#playerO');

  playerXButton.addEventListener('click', () => {
    startGame('❌');
  });

  playerOButton.addEventListener('click', () => {
    startGame('✅');
  });

  createBoard();

  const restartButton = document.querySelector('#buttonRestart');
  restartButton.addEventListener('click', resetGame);
};

let currentPlayer = '❌';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function startGame(startingPlayer) {
  currentPlayer = startingPlayer;
  gameActive = true;

  const playerSelection = document.querySelector('#playerSelection');
  const board = document.querySelector('#board');

  const buttonRestart = document.querySelector('#buttonRestart');

  // Mostrar el tablero y el mensaje después de elegir el jugador
  playerSelection.style.display = 'none';
  board.style.display = 'grid';

  buttonRestart.style.display = 'block';
}
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }

  if (boardState.every((cell) => cell !== '')) {
    return 'Empate';
  }

  return null;
}

function handleCellClick(event) {
  const cellIndex = event.target.dataset.index;

  if (boardState[cellIndex] === '' && gameActive) {
    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      gameActive = false;
      if (winner === 'Empate') {
        message.textContent = '¡Empate!';
      } else {
        message.textContent = `¡Ha ganado ${winner}!`;
      }
    } else {
      currentPlayer = currentPlayer === '❌' ? '✅' : '❌';
    }
  }
}

function createBoard() {
  const board = document.querySelector('#board');

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function resetGame() {
  // Restablece el estado del juego a su estado inicial
  currentPlayer = '❌';
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  // Limpia el contenido del tablero y del mensaje
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  message.textContent = '';
}
