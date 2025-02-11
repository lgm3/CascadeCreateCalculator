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
    const desiredWidth = parseFloat(inputs[0].value) || 0;
    const desiredLength = parseFloat(inputs[1].value) || 0;
    const plywoodThickness = parseFloat(inputs[2].value) || 0;
    const tableSawKerf = parseFloat(inputs[3].value) || 0;
    const finalPatternThickness = parseFloat(inputs[4].value) || 0;
    const chevronHalfWidth = parseFloat(inputs[5].value) || 0;

    // Perform calculations
    const chevronWidthAcrossPattern = desiredWidth;
    const chevronLengthWithPattern =
      (desiredLength / chevronHalfWidth + 1) * tableSawKerf + desiredLength;
    const numberOfStripsInChevronPanel =
      chevronWidthAcrossPattern / chevronHalfWidth;
    const lengthOfChevronStripsNeeded =
      chevronLengthWithPattern + chevronHalfWidth;
    const numberOfLayersInChevronStrip = Math.ceil(
      lengthOfChevronStripsNeeded / Math.sqrt(2 * plywoodThickness ** 2)
    );
    const widthStarting =
      numberOfLayersInChevronStrip * finalPatternThickness +
      (numberOfLayersInChevronStrip + 1) * tableSawKerf;
    const lengthStarting =
      (numberOfStripsInChevronPanel + 0.5) *
        Math.sqrt(2 * chevronHalfWidth ** 2) +
      (numberOfStripsInChevronPanel + 1) * Math.sqrt(2 * tableSawKerf ** 2);

    // Update the HTML elements
    widthStartingEl.textContent = widthStarting.toFixed(2);
    lengthStartingEl.textContent = lengthStarting.toFixed(2);
  });

  // Add click event to the Reset button
  resetButtonEl.addEventListener("click", () => {
    inputs.forEach((input) => (input.value = ""));
    // Clear the displayed results
    stripsInChevronEl.textContent = "";
    lengthOfChevronEl.textContent = "";
    layersInChevronEl.textContent = "";
    widthStartingEl.textContent = "";
    lengthStartingEl.textContent = "";
  });
};
