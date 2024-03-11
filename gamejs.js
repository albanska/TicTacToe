const cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';
let gameActive = true;
let currentGame = 1;
let winner = '';

const checkWinner = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
      gameActive = false;
      winner = cells[a].innerText;
      const winnerMessage = `${winner} Gagneeeeeeeee!`;
      document.getElementById(`jeu${currentGame}`).innerText = winner; // Update winner for this game
      document.getElementById('winner').innerText = WINNERMESSAGE; // Update winner message
      
      // Set color for winning cells
      if (winner === 'X') {
        cells[a].style.color = 'red';
        cells[b].style.color = 'red';
        cells[c].style.color = 'red';
      } else if (winner === 'O') {
        cells[a].style.color = 'blue';
        cells[b].style.color = 'blue';
        cells[c].style.color = 'blue';
      }

      cells[a].classList.add('winner-cell');
      cells[b].classList.add('winner-cell');
      cells[c].classList.add('winner-cell');
      // Update background color of "jeu" elements based on winner
      const jeuElement = document.getElementById(`jeu${currentGame}`);
      if (winner === 'X') {
        jeuElement.style.backgroundColor = 'red'; // Change background color to red for X
      } else if (winner === 'O') {
        jeuElement.style.backgroundColor = 'blue'; // Change background color to blue for O
      }
    }
  }
  
  if (!cells.some(cell => !cell.innerText)) {
    gameActive = false;
    document.getElementById('winner').innerText = "C'est un match nul ! Si vous voulez rejouer, appuyez sur Nouveau jeu"; // Update draw message
  }
};

const handleClick = (e) => {
  const cell = e.target;
  if (cell.innerText || !gameActive) return;
  cell.innerText = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player after each move
};

cells.forEach(cell => cell.addEventListener('click', handleClick));

const refreshButton = document.querySelector('.refresh-button');
const refreshPage = () => {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('winner-cell'); // Remove the winner-cell class
    cell.style.color = ''; // Reset cell color
  });
  gameActive = true;
  if (winner !== '') {
    document.getElementById(`jeu${currentGame}`).innerText = winner;
  }
  // Determine next player based on the winner of the previous game
  currentPlayer = winner === 'X' ? 'O' : 'X';
  currentGame++;
  winner = '';
};

refreshButton.addEventListener('click', refreshPage);

const inputField1 = document.getElementById('fname');
const inputField2 = document.getElementById('fname2');
const player1Element = document.querySelector('.Player1 h3');
const player2Element = document.querySelector('.Player2 h3');

inputField1.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent form submission
    const playerName = this.value.trim();
    if (playerName !== '') {
      player1Element.textContent = playerName;
      inputField1.style.display = 'none';
    }
  }
});

inputField2.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent form submission
    const playerName = this.value.trim();
    if (playerName !== '') {
      player2Element.textContent = playerName;
      inputField2.style.display = 'none';

    }
  }
});
