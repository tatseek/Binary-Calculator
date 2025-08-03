let currentInput = '';
let currentOperation = '';
let memory = '';
let operationHistory = [];
let currentHistoryIndex = -1;
let lastResult = '';
const resultDisplay = document.getElementById('result');
const explanationDisplay = document.getElementById('explanation');
const buttons = document.querySelectorAll('button');
const modeRadios = document.querySelectorAll('input[name="mode"]');
const stepwiseButton = document.getElementById('stepwise');

buttons.forEach(button => {
button.addEventListener('click', () => handleButtonClick(button.textContent));
});
modeRadios.forEach(radio => {
radio.addEventListener('change', updateDisplay);
});

stepwiseButton.addEventListener('click', showStepwiseExplanation);

function handleButtonClick(value) {
switch(value) {
case '0':
case '1':
currentInput += value;
break;
case 'Delete':
currentInput = currentInput.slice(0, -1);
break;
case 'Reset':
currentInput = '';
memory = '';
currentOperation = '';
operationHistory = [];
currentHistoryIndex = -1;
lastResult = '';
explanationDisplay.style.display = 'none';
break;
case '=':
if (memory && currentOperation && currentInput) {
lastResult = calculate(memory, currentInput, currentOperation);
operationHistory.push(`${memory} ${currentOperation} ${currentInput} = ${lastResult}`);
currentHistoryIndex = operationHistory.length - 1;
currentInput = lastResult;
 memory = '';
currentOperation = '';
}
break;
case 'Prev Op.':
if (currentHistoryIndex > 0) {
currentHistoryIndex--;
displayHistoryOperation();
}
break;
 case 'Next Op.':
if (currentHistoryIndex < operationHistory.length - 1) {
currentHistoryIndex++;
displayHistoryOperation();
}
break;
case 'First Op.':
if (operationHistory.length > 0) {
 currentHistoryIndex = 0;
displayHistoryOperation();
}
break;
case 'Last Op.':
if (operationHistory.length > 0) {
currentHistoryIndex = operationHistory.length - 1;
displayHistoryOperation();
}
break;
case 'Bitwise NOT':
case '1\'s Complement':
case '2\'s Complement':
if (currentInput) {
lastResult = calculateUnary(currentInput, value);
operationHistory.push(`${value} ${currentInput} = ${lastResult}`);
currentHistoryIndex = operationHistory.length - 1;
currentInput = lastResult;
}
break;
case 'Left Shift':
case 'Right Shift':
case 'Unsigned Right Shift':
if (currentInput) {
memory = currentInput;
currentInput = '';
currentOperation = value;
}
break;
default:
if (currentInput) {
memory = currentInput;
currentInput = '';
currentOperation = value;
}
}
updateDisplay();
}
function calculate(a, b, operation) {
const numA = parseInt(a, 2);
const numB = parseInt(b, 2);
let result;
switch(operation) {
case 'Bitwise AND':
result = numA & numB;
break;
case 'Bitwise OR':
result = numA | numB;
break;
case 'Bitwise XOR':
result = numA ^ numB;
break;
case 'Left Shift':
result = numA << numB;
break;
case 'Right Shift':
result = numA >> numB;
break;
case 'Unsigned Right Shift':
result = numA >>> numB;
break;
case 'Multiplication':
result = numA * numB;
break;
case 'Division':
result = Math.floor(numA / numB);
break;
default:
return 'Error';
}
return padBinary(result.toString(2));
}
function calculateUnary(input, operation) {
const num = parseInt(input, 2);
let result;
switch(operation) {
case 'Bitwise NOT':
case '1\'s Complement':
result = ~num & ((1 << input.length) - 1);
break;
case '2\'s Complement':
result = (~num + 1) & ((1 << input.length) - 1);
break;
default:
return 'Error';
}
return padBinary(result.toString(2), input.length);
}
function padBinary(binary, length = 4) {
return binary.padStart(Math.max(length, 4), '0');
}
function displayHistoryOperation() {
const [a, op, b, , result] = operationHistory[currentHistoryIndex].split(' ');
memory = a;
currentOperation = op;
currentInput = result;
lastResult = result;
updateDisplay();
}
function updateDisplay() {
const mode = document.querySelector('input[name="mode"]:checked').value;
let displayText = currentInput || '0';
if (memory && currentOperation) {
displayText = `${memory} ${currentOperation} ${currentInput}`;
}
if (mode === 'octal') {
displayText = displayText.split(' ').map(part => {
if (part.match(/^[01]+$/)) {
return parseInt(part, 2).toString(8);
}
return part;
}).join(' ');
} else if (mode === 'both') {
displayText = displayText.split(' ').map(part => {
if (part.match(/^[01]+$/)) {
const decimal = parseInt(part, 2);
return `${part} (${decimal})`;
}
return part;
}).join(' ');
}
resultDisplay.textContent = displayText;
}

function showStepwiseExplanation() {
if (!lastResult) {
explanationDisplay.textContent = "No operation to explain.";
explanationDisplay.style.display = 'block';
return;
}
const lastOperation = operationHistory[operationHistory.length - 1];
const [a, op, b, , result] = lastOperation.split(' ');
let explanation = '';
if (['Bitwise NOT', '1\'s Complement', '2\'s Complement'].includes(op)) {
explanation = explainUnaryOperation(a, op, result);
} else {
explanation = explainBinaryOperation(a, b, op, result);
}

explanationDisplay.innerHTML = explanation;
explanationDisplay.style.display = 'block';
}

function explainUnaryOperation(input, operation, result) {
const numInput = parseInt(input, 2);
let steps = [];
switch(operation) {
case 'Bitwise NOT':
case '1\'s Complement':
steps.push(`1. Invert all bits of ${input}`);
steps.push(`2. Result: ${result}`);
break;
case '2\'s Complement':
const step1 = padBinary((~numInput & ((1 << input.length) - 1)).toString(2), input.length);
steps.push(`1. Invert all bits of ${input}: ${step1}`);
steps.push(`2. Add 1 to the inverted value: ${step1} + 1`);
steps.push(`3. Result: ${result}`);
break;
}

return steps.join('<br>');
}

function explainBinaryOperation(a, b, operation, result) {
const numA = parseInt(a, 2);
const numB = parseInt(b, 2);
let steps = [];

steps.push(`1. Convert ${a} to decimal: ${numA}`);
steps.push(`2. Convert ${b} to decimal: ${numB}`);
switch(operation) {
case 'Bitwise AND':
steps.push(`3. Perform AND operation: ${numA} & ${numB}`);
break;
case 'Bitwise OR':
steps.push(`3. Perform OR operation: ${numA} | ${numB}`);
break;
case 'Bitwise XOR':
steps.push(`3. Perform XOR operation: ${numA} ^ ${numB}`);
break;
 case 'Left Shift':
steps.push(`3. Perform Left Shift: ${numA} << ${numB}`);
break;
case 'Right Shift':
steps.push(`3. Perform Right Shift: ${numA} >> ${numB}`);
break;
case 'Unsigned Right Shift':
steps.push(`3. Perform Unsigned Right Shift: ${numA} >>> ${numB}`);
break;
case 'Multiplication':
steps.push(`3. Perform Multiplication: ${numA} * ${numB}`);
break;
case 'Division':
steps.push(`3. Perform Division: ${numA} / ${numB} (floor division)`);
break;
}
steps.push(`4. Convert result to binary: ${result}`);
return steps.join('<br>');
}
updateDisplay();
