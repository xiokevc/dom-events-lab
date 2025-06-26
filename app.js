/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/

// Select the display and all buttons
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

// State variables
let currentInput = '';
let previousInput = '';
let operator = null;

// Update the calculator display
function updateDisplay(value) {
  display.textContent = value;
}

// Clear everything
function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay('0');
}

// Handle number input
function handleNumber(value) {
  currentInput += value;
  updateDisplay(currentInput);
}

// Handle operator input
function handleOperator(op) {
  if (currentInput === '') return;

  if (previousInput !== '') {
    computeResult(); // Chain operations if needed
  } else {
    previousInput = currentInput;
  }

  operator = op;
  currentInput = '';
}

// Perform the calculation
function computeResult() {
  if (operator === null || currentInput === '' || previousInput === '') return;

  const num1 = Number(previousInput);
  const num2 = Number(currentInput);
  let result;

  switch (operator) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': result = num2 === 0 ? 'Error' : num1 / num2; break;
    default: return;
  }

  updateDisplay(result);
  previousInput = result.toString();
  currentInput = '';
  operator = null;
}

// Set up button click handling
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;

    if (!isNaN(value)) {
      // If it's a number
      handleNumber(value);
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
    } else if (value === '=') {
      computeResult();
    } else if (value === 'C') {
      clearCalculator();
    }
  });
});

// Initialize display
updateDisplay('0');
