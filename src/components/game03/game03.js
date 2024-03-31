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

  let numeroAdivinar;
  let intentos;

  // Genera un número aleatorio entre min y max (inclusive)
  function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Inicializa el juego
  function iniciarJuego() {
    numeroAdivinar = generarNumeroAleatorio(1, 100);
    intentos = 0;
    document.querySelector('.messageNum').innerText = '';
    const winMessage = document.querySelector('#winMessage03');
    winMessage.style.display = 'none';
    document.getElementById('numeroInput').value = '';
  }

  // Función principal del juego
  function adivinaNumero() {
    // Obtener el número ingresado por el usuario
    let numeroUsuario = parseInt(document.getElementById('numeroInput').value);
    // Incrementar el contador de intentos
    intentos++;
    if (isNaN(numeroUsuario)) {
      // Mostrar mensaje de error y salir de la función
      document.querySelector('.messageNum').innerText =
        'No se ha introducido ningún número.';
      return;
    }
    // Verificar si el número ingresado es correcto
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

  // Iniciar el juego cuando se carga la página
  document
    .querySelector('#adivinarBtn')
    .addEventListener('click', adivinaNumero);
  // Agregar un listener de eventos al botón de reinicio

  buttonRestart.addEventListener('click', iniciarJuego);

  iniciarJuego();

  // Agregar un listener de eventos al botón
};
