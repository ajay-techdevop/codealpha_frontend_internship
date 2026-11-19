
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";
let justCalculated = false;

function updateDisplay() {
    display.value = expression || "0";
}

function calculate() {

    if (!expression) return;

    try {

        // Allow only calculator characters
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        expression = String(
            Number.parseFloat(result.toPrecision(12))
        );

        updateDisplay();
        justCalculated = true;

    } catch (error) {

        display.value = "Error";
        expression = "";
        justCalculated = false;

    }
}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            expression = "";
            justCalculated = false;
            updateDisplay();
            return;
        }

        if (action === "delete") {
            expression = expression.slice(0, -1);
            justCalculated = false;
            updateDisplay();
            return;
        }

        if (action === "calculate") {
            calculate();
            return;
        }

        if (justCalculated && /[0-9.]/.test(value)) {
            expression = "";
        }

        justCalculated = false;

        if (value === ".") {

            const currentNumber =
                expression.split(/[+\-*/]/).pop();

            if (currentNumber.includes(".")) return;
        }

        expression += value;
        updateDisplay();

    });

});

// Keyboard support
document.addEventListener("keydown", event => {

    if (/^[0-9.]$/.test(event.key)) {
        expression += event.key;
        justCalculated = false;
        updateDisplay();
    }

    else if (["+", "-", "*", "/"].includes(event.key)) {
        expression += event.key;
        justCalculated = false;
        updateDisplay();
    }

    else if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    else if (event.key === "Backspace") {
        expression = expression.slice(0, -1);
        updateDisplay();
    }

    else if (event.key === "Escape") {
        expression = "";
        justCalculated = false;
        updateDisplay();
    }

});
