import { printMain } from './../Main/Main.js';
import './game01.css';

export const printGame01 = () => {
  document.querySelector(
    '#containerGames'
  ).innerHTML = `<button id="buttonMenu">MENÚ</button>
    <div id="playerSelection" class="flex-container" >
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

  // Agregar un event listener al botón "Menú":
  const menuButton = document.querySelector('#buttonMenu');
  menuButton.addEventListener('click', printMain);

  //Ocultar el tablero y el botón de reiniciar el juego:
  const board = document.querySelector('#board');
  const buttonRestart = document.querySelector('#buttonRestart');
  board.style.display = 'none';
  buttonRestart.style.display = 'none';

  // Agregar un event listener a los botones de selección de jugador:
  const playerXButton = document.querySelector('#playerX');
  const playerOButton = document.querySelector('#playerO');

  playerXButton.addEventListener('click', () => {
    startGame('❌');
  });

  playerOButton.addEventListener('click', () => {
    startGame('✅');
  });

  createBoard();

  // Agregar un event listener al botón de reinicio:
  const restartButton = document.querySelector('#buttonRestart');
  restartButton.addEventListener('click', resetGame);
};

//Crear el juego:
//Asignar valor a las variables:
let currentPlayer = '❌';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

//Crear la función "startGame" para iniciar el juego:
function startGame(startingPlayer) {
  currentPlayer = startingPlayer;
  gameActive = true;

  const playerSelection = document.querySelector('#playerSelection');
  const board = document.querySelector('#board');
  const message = document.querySelector('#message');
  const buttonRestart = document.querySelector('#buttonRestart');

  // Mostrar el tablero y el botón "reiniciar" y ocultar el mensaje y después de elegir el jugador:
  playerSelection.style.display = 'none';
  board.style.display = 'grid';
  message.style.display = 'none';
  buttonRestart.style.display = 'block';
}

//Crear la función "checkWinner" para comprobar el ganador:
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

//Crear la función "handleCellClick" para manejar el clic en las celdas del tablero:
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
      message.style.display = 'block';
    } else {
      currentPlayer = currentPlayer === '❌' ? '✅' : '❌';
    }
  }
}

//Crear la función "createBoard" para crear el tablero:
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

//Crear la función "resetGame" para restablecer el juego:
function resetGame() {
  // Restablecer el estado del juego a su estado inicial.
  currentPlayer = '❌';
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  // Limpiar el contenido del tablero y del mensaje.
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  const message = document.querySelector('#message');
  message.textContent = '';
  message.style.display = 'none';
}
