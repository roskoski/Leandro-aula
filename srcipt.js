const rangeForm = document.getElementById('rangeForm');
const gameDiv = document.getElementById('game');
const guessInput = document.getElementById('guess');
const guessBtn = document.getElementById('guessBtn');
const feedback = document.getElementById('feedback');
const resetBtn = document.getElementById('resetBtn');

let secretNumber = null;
let min = null;
let max = null;
let gameStarted = false;

rangeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  min = parseInt(document.getElementById('min').value);
  max = parseInt(document.getElementById('max').value);

  if (isNaN(min) || isNaN(max)) {
    alert('Por favor, insira números válidos.');
    return;
  }
  if (min >= max) {
    alert('O número inicial deve ser menor que o número final.');
    return;
  }

  secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log('Número sorteado:', secretNumber); // para debug
  gameStarted = true;

  rangeForm.style.display = 'none';
  gameDiv.style.display = 'block';
  feedback.textContent = `Estou pensando em um número entre ${min} e ${max}. Tente adivinhar!`;
  guessInput.value = '';
  guessInput.focus();
});

guessBtn.addEventListener('click', () => {
  if (!gameStarted) return;
  const guess = parseInt(guessInput.value);
  if (isNaN(guess)) {
    feedback.textContent = 'Digite um número válido.';
    return;
  }
  if (guess < min || guess > max) {
    feedback.textContent = `Digite um número entre ${min} e ${max}.`;
    return;
  }

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Parabéns! Você acertou o número ${secretNumber}!`;
    guessBtn.style.display = 'none';
    resetBtn.style.display = 'block';
    guessInput.disabled = true;
  } else if (guess < secretNumber) {
    feedback.textContent = 'O número é maior. Tente novamente.';
  } else {
    feedback.textContent = 'O número é menor. Tente novamente.';
  }
  guessInput.value = '';
  guessInput.focus();
});

resetBtn.addEventListener('click', () => {
  gameStarted = false;
  secretNumber = null;
  min = null;
  max = null;

  rangeForm.style.display = 'block';
  gameDiv.style.display = 'none';
  guessBtn.style.display = 'inline-block';
  resetBtn.style.display = 'none';
  guessInput.disabled = false;
  feedback.textContent = '';
  rangeForm.reset();
  document.getElementById('min').focus();
});
