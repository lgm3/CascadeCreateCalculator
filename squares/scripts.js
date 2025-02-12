// Wait for the DOM to load
window.onload = () => {
  // Get input elements
  const inputs = document.querySelectorAll("input");

  // Get button elements
  const calculateButtonEl = document.querySelector('button[type="button"]');
  const resetButtonEl = document.querySelector('button[type="reset"]');

  // Get result elements
  const panelWidthEl = document.getElementById("panelWidth");
  const hardwoodMinThicknessEl = document.getElementById(
    "hardwoodMinThickness"
  );
  const hardwoodLengthEl = document.getElementById("hardwoodLength");
  const hardwoodWidthEl = document.getElementById("hardwoodWidth");

  // Add click event to the Calculate button
  calculateButtonEl.addEventListener("click", () => {
    const plywoodThickness = parseFloat(inputs[0].value) || 0;
    const tableSawKerf = parseFloat(inputs[1].value) || 0;
    const finalPatternThickness = parseFloat(inputs[2].value) || 0;
    const desiredLength = parseFloat(inputs[3].value) || 0;
    const desiredWidth = parseFloat(inputs[4].value) || 0;
    const miterStripWidth = parseFloat(inputs[5].value) || 0;
    const panelLength = parseFloat(inputs[6].value) || 0;

    // Perform calculations
    const nTilesHigh = desiredLength / miterStripWidth;
    const nTilesWide = desiredWidth / miterStripWidth;
    const nTiles = nTilesHigh * nTilesWide;
    const linearInchOfMiterLog = nTiles * finalPatternThickness;
    const linearInchOfMiterStrip = linearInchOfMiterLog * 2;
    const nTwelveInchMiterStripSections = Math.ceil(
      linearInchOfMiterStrip / panelLength
    );
    const nTwelveInchHardwoodStripSections = Math.ceil(
      linearInchOfMiterLog / panelLength
    );
    const panelWidth =
      (nTwelveInchMiterStripSections - 2) *
        (2 * miterStripWidth - plywoodThickness) +
      (nTwelveInchMiterStripSections - 1) * tableSawKerf;
    const hardwoodMinThickness =
      miterStripWidth - plywoodThickness + tableSawKerf;
    const hardwoodLength = panelLength;
    const hardwoodWidth =
      (nTwelveInchHardwoodStripSections + 2) * tableSawKerf +
      nTwelveInchHardwoodStripSections * hardwoodMinThickness;

    // Update the HTML elements
    panelWidthEl.textContent = panelWidth.toFixed(2);
    hardwoodMinThicknessEl.textContent = hardwoodMinThickness.toFixed(2);
    hardwoodLengthEl.textContent = hardwoodLength.toFixed(2);
    hardwoodWidthEl.textContent = hardwoodWidth.toFixed(2);
  });

  // Add click event to the Reset button
  resetButtonEl.addEventListener("click", () => {
    inputs.forEach((input) => (input.value = ""));
    // Clear the displayed results
    panelWidthEl.textContent = "";
    hardwoodMinThicknessEl.textContent = "";
    hardwoodLengthEl.textContent = "";
    hardwoodWidthEl.textContent = "";
  });
};
