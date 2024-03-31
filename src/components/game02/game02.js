import './game02.css';
import { printMain } from '../Main/Main.js';

export const printGame02 = () => {
  document.querySelector('#containerGames').innerHTML = `
    <button id="buttonMenu">MENÚ</button>
    <div id="bingoGame" class="flex-container">
      <div id="bingoBoard"></div>
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

  // Genera un cartón de bingo aleatorio
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

  const calledNumbersGrid = document.getElementById('calledNumbersGrid');

  // Función para agregar un número a la cuadrícula de números llamados
  const addToCalledNumbersGrid = (number) => {
    const calledNumberElement = document.createElement('div');
    calledNumberElement.textContent = number;
    calledNumbersGrid.appendChild(calledNumberElement);
  };

  // Función para llamar un número aleatorio y marcarlo en el cartón
  const callNumber = () => {
    if (!allNumbersMarked) {
      let number;
      do {
        number = getRandomNumber(1, 75);
      } while (calledNumbers.includes(number));
      calledNumbers.push(number);
      calledNumberDisplay.textContent = `Número llamado: ${number}`;
      markNumber(number);
      checkWinner(); // Verifica si hay un ganador después de marcar un número
      addToCalledNumbersGrid(number);
    }
  };

  // Función para marcar un número en el cartón
  const markNumber = (number) => {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell) => {
      if (cell.textContent == number) {
        cell.classList.add('marked');
      }
    });
  };

  // Verifica si todos los números están marcados y muestra un mensaje de ganador
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

  // Manejador de eventos para llamar un número
  callNumberBtn.addEventListener('click', callNumber);

  const resetGame = () => {
    // Restablece el estado del juego a su estado inicial
    calledNumbers = [];
    calledNumberDisplay.textContent = '';
    calledNumbersGrid.innerHTML = '';

    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell) => {
      cell.classList.remove('marked');
    });
    // Limpiar el área de visualización del número llamado
    calledNumberDisplay.textContent = '';

    // Ocultar el mensaje de ganador y reiniciar la bandera
    allNumbersMarked = false;
    winMessage.style.display = 'none';

    // Vaciar la lista de números llamados
    calledNumbers = [];

    // Imprimir un nuevo juego
    printGame02();
  };

  // Manejador de eventos para reiniciar el juego
  buttonRestart.addEventListener('click', resetGame);
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*export const printGame02 = () => {
  document.querySelector('#containerGames').innerHTML = `
    <button id="buttonMenu">MENÚ</button>
    <div id="bingoGame" class="flex-container">
      <div id="bingoBoard"></div>
      <div class="message" id="message">¡Has ganado!</div>
      <div id="calledNumberDisplay"></div>
      <button id="callNumberBtn">Llamar Número</button>
    </div>
    <button class="buttonRestart" id="buttonRestart">Reiniciar</button>
  `;

  const menuButton = document.querySelector('#buttonMenu');
  menuButton.addEventListener('click', () => {
    printMain();
  });

  const bingoBoard = document.getElementById('bingoBoard');
  const callNumberBtn = document.getElementById('callNumberBtn');
  const calledNumberDisplay = document.getElementById('calledNumberDisplay');
  const buttonRestart = document.querySelector('#buttonRestart');
  let calledNumbers = [];

  // Genera un cartón de bingo aleatorio
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

  // Función para llamar un número aleatorio y marcarlo en el cartón
  const callNumber = () => {
    let number;
    do {
      number = getRandomNumber(1, 75);
    } while (calledNumbers.includes(number));
    calledNumbers.push(number);
    calledNumberDisplay.textContent = `Número llamado: ${number}`;
    markNumber(number);
    checkWinner(); // Verifica si hay un ganador después de marcar un número
  };

  // Función para marcar un número en el cartón
  const markNumber = (number) => {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell) => {
      if (cell.textContent == number) {
        cell.classList.add('marked');
      }
    });
  };

  // Verifica si todos los números están marcados y muestra un mensaje de ganador
  const checkWinner = () => {
    const cells = document.querySelectorAll('.bingo-cell');
    const allMarked = Array.from(cells).every((cell) =>
      cell.classList.contains('marked')
    );
    if (allMarked) {
      const winMessage = document.getElementById('winMessage');
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

  // Manejador de eventos para llamar un número
  callNumberBtn.addEventListener('click', callNumber);

  const resetGame = () => {
    // Restablece el estado del juego a su estado inicial
    calledNumbers = [];
    calledNumberDisplay.textContent = '';
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell) => {
      cell.classList.remove('marked');
    });
    // Limpiar el área de visualización del número llamado
    calledNumberDisplay.textContent = '';

    // Vaciar la lista de números llamados
    calledNumbers = [];

    // Imprimir un nuevo juego
    printGame02();
  };

  // Manejador de eventos para reiniciar el juego
  buttonRestart.addEventListener('click', resetGame);
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*export const printGame02 = () => {
  document.querySelector('#containerGames').innerHTML = `
  <button id="buttonMenu">MENÚ</button>
  <div id="bingoGame" class="flex-container">
    <div id="bingoBoard"></div>
    <div id="calledNumberDisplay"></div>
    <button id="callNumberBtn">Llamar Número</button>
  </div>
  </div><button class="buttonRestart" id="buttonRestart">Reiniciar</button>`;

  const menuButton = document.querySelector('#buttonMenu');
  menuButton.addEventListener('click', () => {
    printMain();
  });

  const bingoBoard = document.getElementById('bingoBoard');
  const callNumberBtn = document.getElementById('callNumberBtn');
  const calledNumberDisplay = document.getElementById('calledNumberDisplay');
  const buttonRestart = document.querySelector('#buttonRestart');
  let calledNumbers = [];

  // Genera un cartón de bingo aleatorio
  const generateBingoCard = () => {
    const card = [];
    const numbers = [];
    for (let i = 1; i <= 75; i++) {
      numbers.push(i);
    }
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
  // Función para llamar un número aleatorio y marcarlo en el cartón
  const callNumber = () => {
    let number;
    do {
      number = getRandomNumber(1, 75);
    } while (calledNumbers.includes(number));
    calledNumbers.push(number);
    calledNumberDisplay.textContent = `Número llamado: ${number}`;
    markNumber(number);
  };

  // Función para marcar un número en el cartón
  const markNumber = (number) => {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell) => {
      if (cell.textContent == number) {
        cell.classList.add('marked');
      }
    });
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

  // Manejador de eventos para llamar un número
  callNumberBtn.addEventListener('click', callNumber);

  const resetGame = () => {
    // Restablece el estado del juego a su estado inicial
    calledNumbers = [];
    calledNumberDisplay.textContent = '';
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell) => {
      cell.classList.remove('marked');
    });
    // Limpiar el área de visualización del número llamado
    calledNumberDisplay.textContent = '';

    // Vaciar la lista de números llamados
    calledNumbers = [];

    // Imprimir un nuevo juego
    printGame02();
  };

  // Manejador de eventos para reiniciar el juego
  buttonRestart.addEventListener('click', resetGame);
};
// Helper function to get a random number within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
*/
