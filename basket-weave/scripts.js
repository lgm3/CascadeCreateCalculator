// Wait for the DOM to load
window.onload = () => {
  // Get input elements
  const inputs = document.querySelectorAll("input");

  // Get button elements
  const calculateButtonEl = document.querySelector('button[type="button"]');
  const resetButtonEl = document.querySelector('button[type="reset"]');

  // Get result elements
  const widthStartingEl = document.getElementById("widthStarting");
  const lengthStartingEl = document.getElementById("lengthStarting");

  // Add click event to the Calculate button
  calculateButtonEl.addEventListener("click", () => {
    const plywoodThickness = parseFloat(inputs[0].value) || 0;
    const tableSawKerf = parseFloat(inputs[1].value) || 0;
    const finalPatternThickness = parseFloat(inputs[2].value) || 0;
    const finalDesiredWidth = parseFloat(inputs[3].value) || 0;
    const finalDesiredLength = parseFloat(inputs[4].value) || 0;

    // Perform calculations
    const nPatternsWidth = Math.ceil(finalDesiredWidth / plywoodThickness / 3);
    const nSquaresLength = finalDesiredLength / plywoodThickness;
    const widthStarting =
      (3 * nPatternsWidth + 1) * tableSawKerf +
      3 * nPatternsWidth * finalPatternThickness;
    const lengthStarting =
      (nSquaresLength + 1) * tableSawKerf + finalDesiredLength;

    // Update the HTML elements
    widthStartingEl.textContent = widthStarting.toFixed(2);
    lengthStartingEl.textContent = lengthStarting.toFixed(2);
  });

  // Add click event to the Reset button
  resetButtonEl.addEventListener("click", () => {
    inputs.forEach((input) => (input.value = ""));
    // Clear the displayed results
    widthStartingEl.textContent = "";
    lengthStartingEl.textContent = "";
  });
};
