const display = document.getElementById("display");
const sciKeys = document.getElementById("sci-keys");
const curKeys = document.getElementById("cur-keys");
const sciBtn = document.getElementById("sci-btn");
const curBtn = document.getElementById("cur-btn");

// Memory storage variable
let memoryValue = 0;
let lastResult = 0;

function appendtoDisplay(value) {
  display.value += value;
}

function calculate() {
  try {
    const result = eval(display.value);
    lastResult = result;
    display.value = result;
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
      const value = parseFloat(display.value);
      display.value = (value / 100).toString();
    }
  } catch {
    display.value = "Error";
  }
}

function calculateSquareRoot() {
  try {
    if (display.value) {
      const value = parseFloat(display.value);
      if (value < 0) {
        display.value = "Error";
      } else {
        display.value = Math.sqrt(value).toString();
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
