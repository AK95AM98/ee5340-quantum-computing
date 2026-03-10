// deutsch-jozsa-circuit.js
// Deutsch-Jozsa Algorithm — Step-through Circuit
// Chapter 10: Quantum Algorithms — EE 5340, UMN
//
// Visualizes the 2-qubit Deutsch-Jozsa algorithm step by step.
// Four oracle types: Constant-0, Constant-1, Balanced-x0, Balanced-x1.
// Shows probability amplitude bars and interference at each step.

// ── Layout ─────────────────────────────────────────────────────────────────
const DRAW_H = 400;
const CTRL_H = 120;

// ── Hadamard tensor (2-qubit) ───────────────────────────────────────────────
// HH[i][j] = (H⊗H)_{ij} = entry of the 4×4 matrix = 0.5 * {±1}
const HH = [
  [ 0.5,  0.5,  0.5,  0.5],
  [ 0.5, -0.5,  0.5, -0.5],
  [ 0.5,  0.5, -0.5, -0.5],
  [ 0.5, -0.5, -0.5,  0.5]
];

function applyHH(a) {
  let out = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      out[i] += HH[i][j] * a[j];
  return out;
}

// ── Oracle definitions ──────────────────────────────────────────────────────
// Phase kickback: amplitude[i] *= phase[i]
const ORACLES = {
  'Constant  f≡0':   { phases: [ 1,  1,  1,  1], balanced: false,
                       desc: 'f(x)=0 for all x. Oracle does nothing (all phases +1).' },
  'Constant  f≡1':   { phases: [-1, -1, -1, -1], balanced: false,
                       desc: 'f(x)=1 for all x. Oracle flips all phases (global phase −1, undetectable).' },
  'Balanced  f=x₀':  { phases: [ 1,  1, -1, -1], balanced: true,
                       desc: 'f(x) depends only on the first qubit: f(0·)=0, f(1·)=1.' },
  'Balanced  f=x₁':  { phases: [ 1, -1,  1, -1], balanced: true,
                       desc: 'f(x) depends only on the second qubit: f(·0)=0, f(·1)=1.' }
};
const ORACLE_KEYS = Object.keys(ORACLES);

// ── Step descriptions ───────────────────────────────────────────────────────
const STEP_LABELS = [
  'Step 0 — Init:   input register |00⟩',
  'Step 1 — H⊗H:   uniform superposition',
  'Step 2 — Oracle: phase kickback applied',
  'Step 3 — H⊗H:   amplitudes interfere',
  'Step 4 — Measure: collapse to result'
];

// ── State ───────────────────────────────────────────────────────────────────
let step        = 0;
let oracleKey   = ORACLE_KEYS[0];
let amplitudes  = [1, 0, 0, 0];  // current step amplitudes
let stepAmps    = [];             // cached for all 5 steps

let nextBtn, prevBtn;
let oracleBtns = [];

const LABELS  = ['|00⟩', '|01⟩', '|10⟩', '|11⟩'];
const PALETTE = {
  barPos: '#1565c0', barNeg: '#b71c1c', barZero: '#bdbdbd',
  bg:     '#f8f9fa', head:   '#1565c0',
  panel:  '#ffffff', border: '#90a4ae'
};

// ── Compute all 5 step-amplitudes from oracle ───────────────────────────────
function computeSteps() {
  let oracle = ORACLES[oracleKey];
  let s0 = [1, 0, 0, 0];
  let s1 = applyHH(s0);
  let s2 = s1.map((a, i) => a * oracle.phases[i]);
  let s3 = applyHH(s2);
  // Step 4: probabilities (measure)
  let prob = s3.map(a => a * a);
  stepAmps = [s0, s1, s2, s3, prob];
}

function resetToStep0() {
  step = 0;
  computeSteps();
  amplitudes = stepAmps[0].slice();
}

// ── p5 setup ────────────────────────────────────────────────────────────────
function setup() {
  let cnv = createCanvas(windowWidth, DRAW_H + CTRL_H);
  cnv.parent('canvas-container');
  textFont('monospace');
  buildControls();
  computeSteps();
}

function windowResized() {
  resizeCanvas(windowWidth, DRAW_H + CTRL_H);
  placeControls();
}

function buildControls() {
  // Oracle selector
  for (let k of ORACLE_KEYS) {
    let btn = createButton(k);
    btn.class('dj-btn oracle-btn');
    btn.mousePressed(() => { oracleKey = k; resetToStep0(); styleOracleBtns(); });
    oracleBtns.push(btn);
  }

  // Step navigation
  prevBtn = createButton('◀ Prev');
  prevBtn.mousePressed(() => { if (step > 0) { step--; amplitudes = stepAmps[step].slice(); } });

  nextBtn = createButton('▶ Next Step');
  nextBtn.mousePressed(() => { if (step < 4) { step++; amplitudes = stepAmps[step].slice(); } });

  placeControls();
  styleOracleBtns();
}

function placeControls() {
  let y0 = DRAW_H + 14;
  // Oracle buttons row
  let bw = 148, gap = 6, x0 = 16;
  for (let i = 0; i < oracleBtns.length; i++) {
    oracleBtns[i].position(x0 + i * (bw + gap), y0);
    oracleBtns[i].size(bw, 30);
  }
  // Navigation
  prevBtn.position(x0, y0 + 44);
  prevBtn.size(100, 34);
  nextBtn.position(x0 + 112, y0 + 44);
  nextBtn.size(130, 34);
}

function styleOracleBtns() {
  for (let btn of oracleBtns) {
    let active = btn.elt.textContent === oracleKey;
    btn.style('background',    active ? '#6a1b9a' : '#e0e0e0');
    btn.style('color',         active ? '#fff'    : '#333');
    btn.style('border',        'none');
    btn.style('border-radius', '4px');
    btn.style('font-size',     '11px');
    btn.style('cursor',        'pointer');
    btn.style('font-family',   'monospace');
  }
  for (let btn of [prevBtn, nextBtn]) {
    btn.style('background',    '#1565c0');
    btn.style('color',         '#fff');
    btn.style('border',        'none');
    btn.style('border-radius', '4px');
    btn.style('font-size',     '13px');
    btn.style('cursor',        'pointer');
  }
  prevBtn.style('background',  '#546e7a');
}

// ── Draw ────────────────────────────────────────────────────────────────────
function draw() {
  background(248);
  drawHeader();
  drawCircuitDiagram();
  drawBars();
  drawStepInfo();
  drawCtrlBar();
}

function drawHeader() {
  noStroke();
  fill('#1565c0');
  rect(0, 0, width, 40);
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Deutsch-Jozsa Algorithm (n=2)', 12, 20);
  textAlign(RIGHT, CENTER);
  textSize(11);
  fill('#bbdefb');
  text('1 oracle query vs ' + (1 << 2) / 2 + '+1 classical', width - 12, 20);
}

function drawCircuitDiagram() {
  let x = 16, y = 48, w = width - 32, h = 90;
  // Background
  noStroke(); fill('#fff');
  stroke('#ccc'); strokeWeight(1);
  rect(x, y, w, h, 4);

  let margin = 40;
  let gapW   = (w - 2 * margin) / 4; // 4 segments: |00⟩, H⊗H, Oracle, H⊗H, Measure

  // Wire ys
  let wy = [y + h * 0.35, y + h * 0.65];
  let labels = ['q₀', 'q₁'];

  // Draw wires
  stroke('#444'); strokeWeight(2);
  for (let i = 0; i < 2; i++) {
    line(x + margin, wy[i], x + w - margin, wy[i]);
  }

  // Labels left
  noStroke(); fill(30);
  textAlign(RIGHT, CENTER); textSize(12);
  for (let i = 0; i < 2; i++) text(labels[i] + ' |0⟩', x + margin - 4, wy[i]);

  // Gate boxes
  let gateXs = [x + margin + gapW * 0.8,
                x + margin + gapW * 1.8,
                x + margin + gapW * 2.8];
  let gateLabels = ['H⊗H', 'Oracle', 'H⊗H'];
  let gateColors = ['#1565c0', '#6a1b9a', '#1565c0'];
  let activeStep = step; // highlight current step gate

  for (let g = 0; g < 3; g++) {
    let gx = gateXs[g], gy = wy[0] - 14;
    let gh = wy[1] - wy[0] + 28;
    let gw = 54;

    // Highlight if active
    if (g + 1 === activeStep || (g === 2 && activeStep >= 3)) {
      stroke('#ffd600'); strokeWeight(3);
    } else {
      stroke(gateColors[g]); strokeWeight(1.5);
    }
    fill(gateColors[g]);
    rect(gx - gw / 2, gy, gw, gh, 4);

    // Label
    noStroke(); fill(255);
    textAlign(CENTER, CENTER); textSize(11);
    text(gateLabels[g], gx, wy[0] + (wy[1] - wy[0]) / 2);
  }

  // Measure symbol at end
  let mx = x + w - margin - 4;
  stroke('#2e7d32'); strokeWeight(2); noFill();
  for (let i = 0; i < 2; i++) {
    rect(mx - 14, wy[i] - 12, 28, 24, 4);
    stroke('#2e7d32'); strokeWeight(1.5);
    arc(mx, wy[i] + 4, 20, 14, PI, 0);
    line(mx, wy[i] + 4, mx + 8, wy[i] - 10);
  }
}

function drawBars() {
  let amps  = step < 4 ? amplitudes : null;
  let probs = step === 4 ? stepAmps[4] : null;

  let left  = 16;
  let barY  = 148;
  let barH  = 160;
  let barW  = min(60, floor((width - 80) / 4));
  let gap   = 20;
  let total = 4 * barW + 3 * gap;
  let startX = left + (width - 32 - total) / 2;

  // Axis
  stroke('#ccc'); strokeWeight(1);
  let midY = barY + barH / 2;
  line(startX - 8, midY, startX + total + 8, midY);

  // Amplitude or probability axis labels
  noStroke(); fill(80);
  textAlign(RIGHT, CENTER); textSize(10);
  let yLabel = step === 4 ? 'P' : 'amp';
  text(step === 4 ? '+1' : '+0.5', startX - 10, barY);
  text(' 0', startX - 10, midY);
  if (step < 4) text('−0.5', startX - 10, barY + barH);

  for (let i = 0; i < 4; i++) {
    let bx = startX + i * (barW + gap);
    let val = step === 4 ? probs[i] : amplitudes[i];
    let barLen = step === 4 ? val * barH * 0.95 : (val / 0.5) * (barH / 2) * 0.95;

    // Bar
    noStroke();
    if (step === 4) {
      // Probability: only upward
      fill(i === 0 ? '#2e7d32' : '#b71c1c');
      let py = midY - barLen;
      rect(bx, py, barW, barLen, 2, 2, 0, 0);
      // Value label
      fill(30); textAlign(CENTER, BOTTOM); textSize(11);
      text(nf(val, 1, 2), bx + barW / 2, py - 2);
    } else {
      if (abs(val) < 0.001) {
        fill('#bdbdbd');
        rect(bx, midY - 2, barW, 4);
      } else if (val > 0) {
        fill('#1565c0');
        rect(bx, midY - barLen, barW, barLen, 2, 2, 0, 0);
        fill(30); textAlign(CENTER, BOTTOM); textSize(10);
        text(nf(val, 1, 2), bx + barW / 2, midY - barLen - 2);
      } else {
        fill('#b71c1c');
        rect(bx, midY, barW, -barLen, 0, 0, 2, 2);
        fill(30); textAlign(CENTER, TOP); textSize(10);
        text(nf(val, 1, 2), bx + barW / 2, midY - barLen + 4);
      }
    }

    // Basis state label
    noStroke(); fill(30);
    textAlign(CENTER, TOP); textSize(13);
    text(LABELS[i], bx + barW / 2, barY + barH + 4);
  }

  // Step label
  noStroke(); fill(30);
  textAlign(CENTER, TOP); textSize(11);
  text(step < 4 ? 'Probability Amplitudes' : 'Measurement Probabilities', startX + total / 2, barY + barH + 22);
}

function drawStepInfo() {
  let y = 346;
  noStroke(); fill('#e8f5e9');
  rect(16, y, width - 32, 44, 4);
  fill('#1b5e20'); textSize(13); textAlign(LEFT, TOP);
  text(STEP_LABELS[step], 24, y + 6);

  fill(60); textSize(11);
  let oracle = ORACLES[oracleKey];
  let verdict = oracle.balanced ? 'BALANCED  (P(|00⟩) = 0)' : 'CONSTANT  (P(|00⟩) = 1)';
  let desc = step === 2 ? oracle.desc : (step === 4 ? 'Result: ' + verdict : '');
  text(desc, 24, y + 24);
}

function drawCtrlBar() {
  let y = DRAW_H + 2;
  noStroke(); fill('#eeeeee');
  rect(0, y, width, CTRL_H);
  fill(80); textSize(11); textAlign(LEFT, CENTER);
  text('Select oracle type:', 16, y + 9);
}
