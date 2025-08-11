const display = document.getElementById("display");
const sciKeys = document.getElementById("sci-keys");
const curKeys = document.getElementById("cur-keys");
const sciBtn = document.getElementById("sci-btn");
const curBtn = document.getElementById("cur-btn");
const historyPanel = document.getElementById("history-panel");
const historyContent = document.getElementById("history-content");

// Storage variables
let memoryValue = 0;
let lastResult = 0;
let calculationHistory = [];

// History Panel Functions
function toggleHistory() {
  historyPanel.classList.toggle('show');
  if (historyPanel.classList.contains('show')) {
    updateHistoryDisplay();
  }
}

function addToHistory(calculation, result) {
  const timestamp = new Date().toLocaleString();
  const historyItem = {
    calculation: calculation,
    result: result,
    timestamp: timestamp
  };
  
  calculationHistory.unshift(historyItem); // Add to beginning
  
  // Keep only last 20 calculations
  if (calculationHistory.length > 20) {
    calculationHistory = calculationHistory.slice(0, 20);
  }
  
  // Save to localStorage
  localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
}

function updateHistoryDisplay() {
  if (calculationHistory.length === 0) {
    historyContent.innerHTML = '<p class="history-empty">No calculations yet</p>';
    return;
  }
  
  let historyHTML = '';
  calculationHistory.forEach((item, index) => {
    historyHTML += `
      <div class="history-item" onclick="useHistoryItem('${item.calculation}', '${item.result}')">
        <div class="history-calculation">${item.calculation}</div>
        <div class="history-result">= ${item.result}</div>
        <div class="history-timestamp">${item.timestamp}</div>
      </div>
    `;
  });
  
  historyContent.innerHTML = historyHTML;
}

function useHistoryItem(calculation, result) {
  display.value = result;
  toggleHistory();
}

function clearHistory() {
  calculationHistory = [];
  localStorage.removeItem('calculatorHistory');
  updateHistoryDisplay();
  if (historyPanel.classList.contains('show')) {
    historyContent.innerHTML = '<p class="history-empty">History cleared</p>';
  }
}

function exportHistory() {
  if (calculationHistory.length === 0) {
    alert('No calculations to export!');
    return;
  }
  
  let exportData = 'SmartCalc 2.0 - Calculation History\\n';
  exportData += '================================\\n\\n';
  
  calculationHistory.forEach((item, index) => {
    exportData += `${index + 1}. ${item.calculation} = ${item.result}\\n`;
    exportData += `   Time: ${item.timestamp}\\n\\n`;
  });
  
  exportData += `\\nTotal Calculations: ${calculationHistory.length}\\n`;
  exportData += `Exported on: ${new Date().toLocaleString()}\\n`;
  
  // Create and download file
  const blob = new Blob([exportData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `calculator-history-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('History exported successfully!');
}

// Load history from localStorage on page load
function loadHistory() {
  const savedHistory = localStorage.getItem('calculatorHistory');
  if (savedHistory) {
    calculationHistory = JSON.parse(savedHistory);
  }
}

// Initialize history when page loads
document.addEventListener('DOMContentLoaded', loadHistory);

function appendtoDisplay(value) {
  display.value += value;
}

function calculate() {
  try {
    const calculation = display.value;
    const result = eval(display.value);
    lastResult = result;
    display.value = result;
    
    // Add to history if calculation was successful
    if (calculation && calculation !== result.toString()) {
      addToHistory(calculation, result);
    }
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}

function clearAll() {
  display.value = "";
  memoryValue = 0;
  lastResult = 0;
}

function toggleScientificMode() {
  const isOn = sciKeys.style.display === "grid";
  if (!isOn) {
    sciKeys.style.display = "grid";
    sciBtn.classList.remove("red");
    sciBtn.classList.add("green");

    curKeys.style.display = "none";
    curBtn.classList.remove("green");
    curBtn.classList.add("red");
  } else {
    sciKeys.style.display = "none";
    sciBtn.classList.remove("green");
    sciBtn.classList.add("red");
  }
}

function toggleCurrencyMode() {
  const isOn = curKeys.style.display === "grid";
  if (!isOn) {
    curKeys.style.display = "grid";
    curBtn.classList.remove("red");
    curBtn.classList.add("green");

    sciKeys.style.display = "none";
    sciBtn.classList.remove("green");
    sciBtn.classList.add("red");
  } else {
    curKeys.style.display = "none";
    curBtn.classList.remove("green");
    curBtn.classList.add("red");
  }
}

function convertCurrency(rate) {
  if (display.value) {
    display.value = (parseFloat(display.value) * rate).toFixed(2);
  }
}

// Memory Functions
function memoryRecall() {
  display.value = memoryValue.toString();
}

function memoryClear() {
  memoryValue = 0;
  // Visual feedback - you could add a brief highlight here
}

function memoryAdd() {
  if (display.value) {
    memoryValue += parseFloat(display.value) || 0;
  }
}

function memorySubtract() {
  if (display.value) {
    memoryValue -= parseFloat(display.value) || 0;
  }
}

function memoryStore() {
  if (display.value) {
    memoryValue = parseFloat(display.value) || 0;
  }
}

// Advanced Mathematical Functions
function calculatePercentage() {
  try {
    if (display.value) {
      const originalValue = display.value;
      const value = parseFloat(display.value);
      const result = value / 100;
      display.value = result.toString();
      addToHistory(`${originalValue}%`, result);
    }
  } catch {
    display.value = "Error";
  }
}

function calculateSquareRoot() {
  try {
    if (display.value) {
      const originalValue = display.value;
      const value = parseFloat(display.value);
      if (value < 0) {
        display.value = "Error";
      } else {
        const result = Math.sqrt(value);
        display.value = result.toString();
        addToHistory(`√${originalValue}`, result);
      }
    }
  } catch {
    display.value = "Error";
  }
}

function calculateSquare() {
  try {
    if (display.value) {
      const value = parseFloat(display.value);
      display.value = Math.pow(value, 2).toString();
    }
  } catch {
    display.value = "Error";
  }
}

function calculateReciprocal() {
  try {
    if (display.value) {
      const value = parseFloat(display.value);
      if (value === 0) {
        display.value = "Cannot divide by zero";
      } else {
        display.value = (1 / value).toString();
      }
    }
  } catch {
    display.value = "Error";
  }
}

function calculateFactorial() {
  try {
    if (display.value) {
      const value = parseInt(display.value);
      if (value < 0 || !Number.isInteger(parseFloat(display.value))) {
        display.value = "Error";
      } else if (value > 170) {
        display.value = "Too large";
      } else {
        let factorial = 1;
        for (let i = 2; i <= value; i++) {
          factorial *= i;
        }
        display.value = factorial.toString();
      }
    }
  } catch {
    display.value = "Error";
  }
}

function toggleSign() {
  if (display.value && display.value !== "0") {
    if (display.value.startsWith("-")) {
      display.value = display.value.substring(1);
    } else {
      display.value = "-" + display.value;
    }
  }
}
