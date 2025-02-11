// Wait for the DOM to load
window.onload = () => {
  // Get input elements
  const inputs = document.querySelectorAll("input");

  // Get button elements
  const calculateButtonEl = document.querySelector('button[type="button"]');
  const resetButtonEl = document.querySelector('button[type="reset"]');

  // Get result elements
  const stripsInChevronEl = document.getElementById("stripsInChevron");
  const lengthOfChevronEl = document.getElementById("lengthOfChevron");
  const layersInChevronEl = document.getElementById("layersInChevron");
  const widthStartingEl = document.getElementById("widthStarting");
  const lengthStartingEl = document.getElementById("lengthStarting");

  // Add click event to the Calculate button
  calculateButtonEl.addEventListener("click", () => {
    const plywoodThickness = parseFloat(inputs[0].value) || 0;
    const tableSawKerf = parseFloat(inputs[1].value) || 0;
    const finalPatternThickness = parseFloat(inputs[2].value) || 0;
    const chevronHalfWidth = parseFloat(inputs[3].value) || 0;
    const desiredWidthAcrossPattern = parseFloat(inputs[4].value) || 0;
    const desiredLengthWithPattern = parseFloat(inputs[5].value) || 0;

    // Perform calculations
    const numberOfStripsInChevronPattern =
      desiredWidthAcrossPattern / chevronHalfWidth;
    const lengthOfChevronStripsNeeded =
      desiredLengthWithPattern + chevronHalfWidth;
    const numberOfLayersInChevronStrip = Math.ceil(
      lengthOfChevronStripsNeeded / Math.sqrt(2 * plywoodThickness ** 2)
    );
    const widthStarting =
      numberOfLayersInChevronStrip * finalPatternThickness +
      (numberOfLayersInChevronStrip + 1) * tableSawKerf;
    const lengthStarting =
      (numberOfStripsInChevronPattern + 0.5) *
        Math.sqrt(2 * chevronHalfWidth ** 2) +
      (numberOfStripsInChevronPattern + 1) * Math.sqrt(2 * tableSawKerf ** 2);

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
