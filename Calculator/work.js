const display = document.getElementById("display");
const sciKeys = document.getElementById("sci-keys");
const curKeys = document.getElementById("cur-keys");
const sciBtn = document.getElementById("sci-btn");
const curBtn = document.getElementById("cur-btn");

function appendtoDisplay(value) {
  display.value += value;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
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
