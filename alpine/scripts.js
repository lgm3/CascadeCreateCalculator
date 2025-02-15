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
    const miterStripWidth = parseFloat(inputs[5].value) || 0;
    const panelLength = parseFloat(inputs[6].value) || 0;

    // Ensure panelLength is within constraints
    if (panelLength <= miterStripWidth || panelLength > 12) {
      panelLengthErrorEl.textContent = `Panel Length must be between ${miterStripWidth.toFixed(
        2
      )} and 12 inches.`;
      panelLengthErrorEl.style.display = "block";
      return;
    } else {
      panelLengthErrorEl.style.display = "none";
    }

    // Perform calculations
    const nTilesHigh = Math.ceil(
      desiredLength /
        (Math.sqrt(miterStripWidth ** 2 + plywoodThickness ** 2) +
          Math.sqrt(
            miterStripWidth ** 2 +
              plywoodThickness ** 2 -
              0.5 * Math.sqrt(2) * miterStripWidth
          ) +
          1)
    );
    const nTilesWide = Math.ceil(
      desiredWidth /
        (0.5 * Math.sqrt(2) * miterStripWidth +
          2 +
          Math.sqrt(0.5 * (miterStripWidth - plywoodThickness) ** 2))
    );
    const nTiles = nTilesHigh * nTilesWide;
    const linearInchOfMiterLog =
      nTiles * finalPatternThickness * (1 + tableSawKerf);
    const linearInchOfMiterStrip = linearInchOfMiterLog * 2;
    const nTwelveInchMiterStripSections = Math.ceil(
      linearInchOfMiterStrip / panelLength
    );
    let panelWidth =
      (nTwelveInchMiterStripSections - 2) *
        (2 * miterStripWidth - plywoodThickness) +
      (nTwelveInchMiterStripSections - 1) * tableSawKerf;
    if (panelWidth <= miterStripWidth + tableSawKerf) {
      panelWidth = miterStripWidth + tableSawKerf;
    }

    // Update the HTML elements
    panelWidthEl.textContent = panelWidth.toFixed(2);
  });

  // Add click event to the Reset button
  resetButtonEl.addEventListener("click", () => {
    inputs.forEach((input) => (input.value = ""));
    // Clear the displayed results
    panelWidthEl.textContent = "";
  });
};
