import './game03.css';
import { printMain } from '../Main/Main.js';

export const printGame03 = () => {
  document.querySelector('#containerGames').innerHTML = `
  <button id="buttonMenu">MENÚ</button>
  <div id="numGame" class="flex-container">
    <div id="winMessage03" style="display: none;"></div>
    <p class="firstMessage">Intenta adivinar un número entre 1 y 100.</p>
    <input type="number" id="numeroInput">
    <p id="messageNum" class="messageNum"></p>
    <div id="buttonContainer" class="flex-container">
    <button id="adivinarBtn">Adivinar</button>
    <button class="buttonRestart" id="buttonRestart">Reiniciar</button>
    </div>
    
  </div>
  </div>`;

  const menuButton = document.querySelector('#buttonMenu');
  menuButton.addEventListener('click', () => {
    printMain();
  });

  const buttonRestart = document.querySelector('#buttonRestart');
  buttonRestart.addEventListener('click', iniciarJuego);

  let numeroAdivinar;
  let intentos;

  // Crear la función "generarNumeroAleatorio" para generar un número aleatorio entre min y max:
  function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Crear la función "iniciarJuego" para iniciar el juego:
  function iniciarJuego() {
    numeroAdivinar = generarNumeroAleatorio(1, 100);
    intentos = 0;
    document.querySelector('.messageNum').innerText = '';
    const winMessage = document.querySelector('#winMessage03');
    winMessage.style.display = 'none';
    document.getElementById('numeroInput').value = '';
  }

  // Crear la función "adivinaNumero" para adivinar el número:
  function adivinaNumero() {
    let numeroUsuario = parseInt(document.getElementById('numeroInput').value);
    intentos++;

    if (isNaN(numeroUsuario)) {
      document.querySelector('.messageNum').innerText =
        'No se ha introducido ningún número.';
      return;
    }

    if (numeroUsuario === numeroAdivinar) {
      const winMessage = document.querySelector('#winMessage03');
      winMessage.innerText = `¡Has acertado el número en ${intentos} intentos!`;
      winMessage.style.display = 'block';
    } else if (numeroUsuario < numeroAdivinar) {
      document.querySelector('.messageNum').innerText =
        'El número a adivinar es mayor.';
    } else {
      document.querySelector('.messageNum').innerText =
        'El número a adivinar es menor.';
    }
  }

  document
    .querySelector('#adivinarBtn')
    .addEventListener('click', adivinaNumero);

  iniciarJuego();
};
