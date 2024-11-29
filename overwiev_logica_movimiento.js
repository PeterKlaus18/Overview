// Variables para las posiciones de los jugadores
const playerPositions = [1, 1, 1, 1]; // Los jugadores comienzan en la casilla 1

const players = [
    { element: document.querySelector('.player1'), position: 1 },
    { element: document.querySelector('.player2'), position: 1 },
    { element: document.querySelector('.player3'), position: 1 },
    { element: document.querySelector('.player4'), position: 1 },
];

// Array que simula las celdas del tablero por número de casilla
const cells = Array.from(document.querySelectorAll('.cell'));

// Cargar el archivo JSON con las preguntas
let questions = {};

// Cargar preguntas desde el archivo JSON
fetch('preguntas_tablero.json')
    .then(response => response.json())
    .then(data => {
        questions = data;  // Guardar las preguntas en una variable
    })
    .catch(error => console.error('Error al cargar preguntas:', error));

// Función para mover el jugador
function movePlayer(player, newPosition) {
    const oldCell = document.getElementById(`cell-${player.position}`);
    const newCell = document.getElementById(`cell-${newPosition}`);

    // Eliminar la ficha de la celda anterior
    const oldPlayerElement = oldCell.querySelector('.player');
    if (oldPlayerElement) {
        oldCell.removeChild(oldPlayerElement);
    }

    // Agregar la ficha a la nueva celda
    newCell.appendChild(player.element);
    player.position = newPosition;

    // Verificar si el jugador ha llegado a la meta
    if (newPosition === 23) {
        alert(`¡El Jugador ${players.indexOf(player) + 1} ha ganado!`);
        endGame();
    }
}

// Función para mostrar una pregunta aleatoria
function showQuestion(cell, player) {
    const color = cell.classList[1]; // Obtener el color de la celda

    if (questions[color]) {
        // Elegir una pregunta aleatoria del tema de la casilla
        const randomQuestion = questions[color][Math.floor(Math.random() * questions[color].length)];
        
        // Mostrar un alert indicando quién debe responder
        alert(`Jugador ${players.indexOf(player) + 1}, debes responder la siguiente pregunta sobre ${color}: ${randomQuestion}`);
    }
}

// Lógica del dado
let turn = 1; // Comienza con el jugador 1
function rollDice() {
    const currentPlayerIndex = (turn - 1) % 4; // Calculamos el índice del jugador actual
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = `Resultado del dado: ${diceRoll}`;

    // Obtener el jugador actual
    const currentPlayer = players[currentPlayerIndex];
    const newPosition = currentPlayer.position + diceRoll;

    if (newPosition <= 23) {
        // Primero movemos al jugador
        movePlayer(currentPlayer, newPosition);

        // Ahora mostramos la pregunta
        setTimeout(() => {
            const newCell = document.getElementById(`cell-${newPosition}`);
            showQuestion(newCell, currentPlayer);
        }, 300); // Un pequeño retraso para asegurar que la ficha se mueva primero

        // Actualizamos el turno después del movimiento
        turn++;
        updateCurrentPlayer();
    }
}

// Función para actualizar el turno
function updateCurrentPlayer() {
    document.getElementById('currentPlayer').textContent = `Turno del jugador: ${((turn - 1) % 4) + 1}`;
}

// Evento de botón
document.getElementById('rollDice').addEventListener('click', rollDice);

// Inicializa las fichas en la celda 1
players.forEach(player => {
    const startCell = document.getElementById('cell-1');
    startCell.appendChild(player.element);
});

// Función para terminar el juego
function endGame() {
    alert('¡El juego ha terminado!');
    // Aquí puedes agregar más lógica si deseas reiniciar el juego o hacer algo más.
}
