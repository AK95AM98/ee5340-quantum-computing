// grover-amplitude-evolution.js
// Grover's Algorithm — Amplitude Evolution Visualizer
// Chapter 10: Quantum Algorithms — EE 5340, UMN
//
// Grover's algorithm on N = 2^n states:
//   Initial state: α_i = 1/√N for all i (uniform superposition)
//   Each iteration applies:
//     1. Oracle:    α_target  →  −α_target  (flip marked state)
//     2. Diffusion: α_i       →  2⟨α⟩ − α_i  (reflect about mean)
//   Optimal iterations: k_opt = floor(π/4 · √N)
//   After k_opt steps, P(target) ≈ 1

// === Canvas layout ===
let canvasWidth = 700;
let drawHeight   = 420;
let controlHeight = 120;   // 3 rows × 35 + 10 = 115 → 120
let canvasHeight  = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 145;
let defaultTextSize = 16;

// === Algorithm state ===
let numQubits = 3;          // n  →  N = 2^n
let numStates = 8;          // N
let targetState = 3;        // marked state index
let amplitudes  = [];       // current probability amplitudes
let iteration   = 0;        // current Grover iteration
let optimalIter = 2;        // floor(π/4 · √N)

// === UI controls ===
let stepButton, resetButton;
let qubitsSlider, targetSlider;
let mouseOverCanvas = false;

// ─────────────────────────────────────────────
function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  canvas.mouseOver(() => { mouseOverCanvas = true; });
  canvas.mouseOut(()  => { mouseOverCanvas = false; });

  // Row 1: Step button
  stepButton = createButton('▶ Step');
  stepButton.position(10, drawHeight + 5);
  stepButton.style('width',            '72px');
  stepButton.style('height',           '28px');
  stepButton.style('font-size',        '14px');
  stepButton.style('cursor',           'pointer');
  stepButton.style('background-color', '#2a6db5');
  stepButton.style('color',            'white');
  stepButton.style('border',           'none');
  stepButton.style('border-radius',    '4px');
  stepButton.mousePressed(groverStep);

  // Row 1: Reset button
  resetButton = createButton('↺ Reset');
  resetButton.position(90, drawHeight + 5);
  resetButton.style('width',            '72px');
  resetButton.style('height',           '28px');
  resetButton.style('font-size',        '14px');
  resetButton.style('cursor',           'pointer');
  resetButton.style('background-color', '#777');
  resetButton.style('color',            'white');
  resetButton.style('border',           'none');
  resetButton.style('border-radius',    '4px');
  resetButton.mousePressed(resetGrover);

  // Row 2: Qubits (n) slider — 2 to 4
  qubitsSlider = createSlider(2, 4, 3, 1);
  qubitsSlider.position(sliderLeftMargin, drawHeight + 40);
  qubitsSlider.size(canvasWidth - sliderLeftMargin - margin);
  qubitsSlider.input(() => {
    numQubits = int(qubitsSlider.value());
    resetGrover();
  });

  // Row 3: Target state slider — 0 to N−1
  targetSlider = createSlider(0, numStates - 1, targetState, 1);
  targetSlider.position(sliderLeftMargin, drawHeight + 75);
  targetSlider.size(canvasWidth - sliderLeftMargin - margin);
  targetSlider.input(() => {
    targetState = int(targetSlider.value());
    resetGrover();
  });

  resetGrover();

  describe(
    'Bar chart showing probability amplitudes for each quantum state during ' +
    "Grover's search algorithm. Click Step to advance one iteration. " +
    'The orange bar is the marked target state being amplified.',
    LABEL
  );
}

// ─────────────────────────────────────────────
// Initialize uniform superposition state
function resetGrover() {
  numQubits  = int(qubitsSlider ? qubitsSlider.value() : numQubits);
  numStates  = int(pow(2, numQubits));
  targetState = int(targetSlider ? targetSlider.value() : targetState);

  // Clamp target to valid range and update slider max
  targetState = constrain(targetState, 0, numStates - 1);
  if (targetSlider) {
    targetSlider.elt.max = numStates - 1;
    targetSlider.value(targetState);
  }

  // Uniform superposition: α_i = 1/√N
  amplitudes = [];
  let a0 = 1.0 / sqrt(numStates);
  for (let i = 0; i < numStates; i++) amplitudes.push(a0);

  // Optimal number of Grover iterations
  optimalIter = floor((PI / 4) * sqrt(numStates));
  iteration   = 0;
}

// ─────────────────────────────────────────────
// Apply one Grover iteration (oracle + diffusion)
function groverStep() {
  // 1. Oracle: flip sign of marked state
  amplitudes[targetState] *= -1;

  // 2. Grover diffusion: reflect about mean amplitude
  let mean = 0;
  for (let a of amplitudes) mean += a;
  mean /= numStates;
  for (let i = 0; i < numStates; i++) {
    amplitudes[i] = 2 * mean - amplitudes[i];
  }

  iteration++;
}

// ─────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  // === Drawing region ===
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // === Control region ===
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // === Title ===
  noStroke();
  fill(20, 20, 100);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Grover's Algorithm — Amplitude Evolution", canvasWidth * 0.42, 6);

  // === Chart and labels ===
  drawBarChart();
  drawControlLabels();
}

// ─────────────────────────────────────────────
function drawBarChart() {
  let chartLeft   = 52;
  let chartRight  = canvasWidth - 12;
  let chartTop    = 36;
  let chartBottom = drawHeight - 26;
  let chartW      = chartRight - chartLeft;
  let chartH      = chartBottom - chartTop;
  let zeroY       = chartTop + chartH / 2;   // amplitude=0 maps to this y

  // Chart border
  stroke(180);
  strokeWeight(1);
  noFill();
  rect(chartLeft, chartTop, chartW, chartH);

  // === Zero line (amplitude = 0) ===
  stroke(80);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  line(chartLeft, zeroY, chartRight, zeroY);
  drawingContext.setLineDash([]);

  // === Y-axis labels ===
  noStroke();
  fill(80);
  textSize(13);
  textAlign(RIGHT, CENTER);
  text('+1.0', chartLeft - 3, chartTop + 4);
  text(' 0.0', chartLeft - 3, zeroY);
  text('−1.0', chartLeft - 3, chartBottom - 4);

  // Rotated Y-axis title
  push();
  fill(80);
  textSize(13);
  textAlign(CENTER, CENTER);
  translate(12, chartTop + chartH / 2);
  rotate(-HALF_PI);
  text('Amplitude', 0, 0);
  pop();

  // === Mean amplitude dashed line ===
  let mean = 0;
  for (let a of amplitudes) mean += a;
  mean /= numStates;
  let meanY = zeroY - mean * (chartH / 2);

  stroke(200, 130, 30, 200);
  strokeWeight(1.5);
  drawingContext.setLineDash([3, 5]);
  line(chartLeft, meanY, chartRight, meanY);
  drawingContext.setLineDash([]);

  noStroke();
  fill(180, 110, 20);
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text('⟨α⟩=' + nf(mean, 1, 3), chartLeft + 2, meanY - 2);

  // === Bars ===
  let barW   = chartW / numStates;
  let padPct = numStates <= 8 ? 0.12 : 0.08;
  let pad    = max(1, barW * padPct);

  for (let i = 0; i < numStates; i++) {
    let amp      = amplitudes[i];
    let barPixH  = amp * (chartH / 2);   // signed pixel height
    let barX     = chartLeft + i * barW + pad;
    let barActW  = barW - 2 * pad;

    // Bar rect corners
    let barY, barH;
    if (amp >= 0) {
      barY = zeroY - barPixH;
      barH = barPixH;
    } else {
      barY = zeroY;
      barH = -barPixH;   // positive height going down
    }

    // Color: marked = orange, others = steel blue
    let isTarget = (i === targetState);
    if (isTarget) {
      fill(240, 110, 20);
      stroke(190, 70, 0);
    } else {
      fill(60, 120, 200);
      stroke(35, 80, 160);
    }
    strokeWeight(1);
    rect(barX, barY, barActW, barH);

    // Amplitude text inside bar (white) or outside (dark)
    let absPixH = abs(barPixH);
    let lblSize = max(10, min(14, barActW * 0.28));
    noStroke();
    textSize(lblSize);
    textAlign(CENTER, CENTER);

    if (absPixH > 18) {
      fill(255);   // white inside tall bar
      text(nf(amp, 1, 2), barX + barActW / 2, barY + barH / 2);
    } else {
      fill(30);
      let outsideY = amp >= 0 ? barY - 9 : barY + barH + 9;
      // Clamp within chart
      outsideY = constrain(outsideY, chartTop + 8, chartBottom - 4);
      text(nf(amp, 1, 2), barX + barActW / 2, outsideY);
    }

    // State index label below x-axis
    noStroke();
    fill(isTarget ? color(200, 70, 0) : color(50));
    textSize(max(10, min(13, barActW * 0.28)));
    textAlign(CENTER, TOP);
    text('|' + i + '⟩', barX + barActW / 2, chartBottom + 3);
  }

  // === "Found!" indicator at optimal iteration ===
  if (iteration > 0 && iteration === optimalIter) {
    let prob = amplitudes[targetState] * amplitudes[targetState];
    let mBarX = chartLeft + targetState * barW + pad;
    let mBarW = barW - 2 * pad;
    noStroke();
    fill(0, 160, 0);
    textSize(15);
    textAlign(CENTER, BOTTOM);
    text('✓ max!', mBarX + mBarW / 2, chartTop + 4);
  }

  // === Probability annotation for target state ===
  let prob = amplitudes[targetState] * amplitudes[targetState];
  let probPct = prob * 100;

  // Info box bottom-right of chart
  let bw = 200, bh = 56;
  let bx = chartRight - bw - 2;
  let by = chartBottom - bh - 4;
  fill(255, 255, 255, 210);
  stroke(190);
  strokeWeight(1);
  rect(bx, by, bw, bh, 6);

  noStroke();
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Iteration: ' + iteration + ' / ' + optimalIter + ' (opt)', bx + 8, by + 6);

  let pColor = (iteration > 0 && probPct > 85)
    ? color(0, 140, 0)
    : (iteration > optimalIter ? color(180, 50, 0) : color(30, 30, 180));
  fill(pColor);
  textSize(16);
  text('P(|' + targetState + '⟩) = ' + nf(probPct, 1, 1) + '%', bx + 8, by + 30);
}

// ─────────────────────────────────────────────
function drawControlLabels() {
  noStroke();
  fill(0);
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Row 2: qubits label
  text('Qubits n=' + numQubits + ' (N=' + numStates + '):', 10, drawHeight + 53);

  // Row 3: target label
  text('Target state |' + targetState + '⟩:', 10, drawHeight + 88);

  // Row 1: hint text (right of buttons)
  textSize(14);
  fill(80);
  textAlign(LEFT, CENTER);
  text('← Step through iterations. Over-step to see over-rotation.', 172, drawHeight + 18);
}

// ─────────────────────────────────────────────
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  if (typeof qubitsSlider !== 'undefined') {
    qubitsSlider.size(canvasWidth - sliderLeftMargin - margin);
    targetSlider.size(canvasWidth - sliderLeftMargin - margin);
  }
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    if (typeof qubitsSlider !== 'undefined') {
      qubitsSlider.size(canvasWidth - sliderLeftMargin - margin);
      targetSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
