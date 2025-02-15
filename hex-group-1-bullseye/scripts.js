// Wait for the DOM to load
window.onload = () => {
  // Get input elements
  const inputs = document.querySelectorAll("input");

  // Get button elements
  const calculateButtonEl = document.querySelector('button[type="button"]');
  const resetButtonEl = document.querySelector('button[type="reset"]');

  // Get result elements
  const panelWidthEl = document.getElementById("panelWidth");
  const panelLengthErrorEl = document.getElementById("panelLengthError");

  // Add click event to the Calculate button
  calculateButtonEl.addEventListener("click", () => {
    const plywoodThickness = parseFloat(inputs[0].value) || 0;
    const tableSawKerf = parseFloat(inputs[1].value) || 0;
    const finalPatternThickness = parseFloat(inputs[2].value) || 0;
    const desiredLength = parseFloat(inputs[3].value) || 0;
    const desiredWidth = parseFloat(inputs[4].value) || 0;
    const panelLength = parseFloat(inputs[5].value) || 0;

    // Calculate triangleSide
    const triangleSide = plywoodThickness / Math.sin(Math.PI / 3);

    // Ensure panelLength is within constraints
    if (panelLength <= triangleSide || panelLength > 12) {
      panelLengthErrorEl.textContent = `Panel Length must be between ${triangleSide.toFixed(
        2
      )} and 12 inches.`;
      panelLengthErrorEl.style.display = "block";
      return;
    } else {
      panelLengthErrorEl.style.display = "none";
    }

    // Perform calculations
    const hexFlatToFlat = 2 * plywoodThickness;
    const nHexFlatToFlat = Math.ceil(desiredLength / hexFlatToFlat + 1);
    const nHexPtToPt = Math.ceil(((2 * desiredWidth) / triangleSide - 1) / 3);
    const linearInchOfHexLog =
      nHexFlatToFlat * nHexPtToPt * finalPatternThickness * (1 + tableSawKerf);
    const linearInchOfTriangle = linearInchOfHexLog * 6;
    const nTwelveInchTriangleSections = Math.ceil(
      linearInchOfTriangle / panelLength
    );
    const panelWidth =
      nTwelveInchTriangleSections * triangleSide +
      (nTwelveInchTriangleSections - 1) * tableSawKerf;

    // Update the HTML elements
    panelWidthEl.textContent = panelWidth.toFixed(2);
  });

  // Add click event to the Reset button
  resetButtonEl.addEventListener("click", () => {
    inputs.forEach((input) => (input.value = ""));
    panelWidthEl.textContent = "";
    panelLengthErrorEl.style.display = "none"; // Hide error message on reset
  });
};
