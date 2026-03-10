// phase-estimation-circuit.js
// Quantum Phase Estimation (QPE) — Step-through Visualization
// Chapter 10: Quantum Algorithms — EE 5340, UMN
//
// Shows QPE with n=3 counting qubits estimating phase φ of U|ψ⟩ = e^{2πiφ}|ψ⟩.
// Step-through: Init → H on counting register → Controlled-U^k → QFT† → Measure.
// Bar chart shows probability distribution of estimated phase after each step.

// ── Layout ─────────────────────────────────────────────────────────────────
const DRAW_H = 400;
const CTRL_H = 120;

// ── QPE parameters ──────────────────────────────────────────────────────────
// n = 3 counting qubits → can estimate phases as multiples of 1/8
const N_BITS = 3;
const N_STATES = 1 << N_BITS; // 8

// Available phases for user to select
const PHASES = [
  { label: 'φ = 0',    phi: 0,     frac: '0/8'  },
  { label: 'φ = 1/4',  phi: 0.25,  frac: '2/8'  },
  { label: 'φ = 1/8',  phi: 0.125, frac: '1/8'  },
  { label: 'φ = 1/3',  phi: 1/3,   frac: '≈2.67/8' },
  { label: 'φ = 3/8',  phi: 0.375, frac: '3/8'  }
];

// ── Step descriptions ───────────────────────────────────────────────────────
const STEPS = [
  { label: 'Step 0 — Init',         desc: 'Counting register |000⟩ and eigenstate |ψ⟩ prepared.' },
  { label: 'Step 1 — H on counting',desc: 'Hadamard applied to all 3 counting qubits → uniform superposition.' },
  { label: 'Step 2 — Controlled-U^k',desc: 'Phase kickback: each counting qubit controls U^(2^k) on |ψ⟩.' },
  { label: 'Step 3 — QFT†',         desc: 'Inverse QFT maps phase to computational basis.' },
  { label: 'Step 4 — Measure',      desc: 'Measurement reveals the estimated phase with high probability.' }
];

// ── State ──────────────────────────────────────────────────────────────────
let step       = 0;
let phaseIdx   = 1; // default φ=1/4
let amps       = []; // complex: {re, im} per basis state

let stepBtns   = [];
let phaseBtns  = [];
let prevBtn, nextBtn;

// ── QPE simulation ──────────────────────────────────────────────────────────
// After H step: uniform superposition |j⟩ = (1/√N) Σ|j⟩
// After controlled-U^k: |j⟩ → e^{2πi j φ} |j⟩ (phase kickback)
// After QFT†: ideally peaks at j = round(φ * N)

function computeAmps(st, phi) {
  let a = new Array(N_STATES).fill(null).map(() => ({ re: 0, im: 0 }));
  if (st === 0) {
    a[0].re = 1; // |000⟩
  } else if (st === 1) {
    // Uniform superposition
    let v = 1 / Math.sqrt(N_STATES);
    for (let j = 0; j < N_STATES; j++) a[j].re = v;
  } else if (st >= 2) {
    // After controlled-U^k: a[j] = (1/√N) e^{2πi j φ}
    let v = 1 / Math.sqrt(N_STATES);
    for (let j = 0; j < N_STATES; j++) {
      let angle = 2 * Math.PI * j * phi;
      a[j].re = v * Math.cos(angle);
      a[j].im = v * Math.sin(angle);
    }
    if (st >= 3) {
      // Apply QFT† (inverse DFT):  b[k] = (1/√N) Σ_j a[j] e^{-2πi j k / N}
      let b = new Array(N_STATES).fill(null).map(() => ({ re: 0, im: 0 }));
      for (let k = 0; k < N_STATES; k++) {
        for (let j = 0; j < N_STATES; j++) {
          let angle = -2 * Math.PI * j * k / N_STATES;
          let cos_ = Math.cos(angle), sin_ = Math.sin(angle);
          b[k].re += a[j].re * cos_ - a[j].im * sin_;
          b[k].im += a[j].re * sin_ + a[j].im * cos_;
        }
        b[k].re /= Math.sqrt(N_STATES);
        b[k].im /= Math.sqrt(N_STATES);
      }
      a = b;
    }
    if (st === 4) {
      // Collapse to probabilities
      for (let j = 0; j < N_STATES; j++) {
        let p = a[j].re * a[j].re + a[j].im * a[j].im;
        a[j] = { re: Math.sqrt(p), im: 0 }; // show as amplitude = √P
      }
    }
  }
  return a;
}

// ── p5 setup ────────────────────────────────────────────────────────────────
function setup() {
  let cnv = createCanvas(windowWidth, DRAW_H + CTRL_H);
  cnv.parent('canvas-container');
  textFont('monospace');
  buildControls();
  amps = computeAmps(0, PHASES[phaseIdx].phi);
}

function windowResized() {
  resizeCanvas(windowWidth, DRAW_H + CTRL_H);
  placeControls();
}

function buildControls() {
  prevBtn = createButton('◀ Prev');
  prevBtn.mousePressed(() => {
    if (step > 0) step--;
    amps = computeAmps(step, PHASES[phaseIdx].phi);
  });
  nextBtn = createButton('▶ Next Step');
  nextBtn.mousePressed(() => {
    if (step < 4) step++;
    amps = computeAmps(step, PHASES[phaseIdx].phi);
  });

  for (let i = 0; i < PHASES.length; i++) {
    let btn = createButton(PHASES[i].label);
    btn.mousePressed(() => {
      phaseIdx = i;
      step = 0;
      amps = computeAmps(0, PHASES[phaseIdx].phi);
      stylePhaseBtns();
    });
    phaseBtns.push(btn);
  }

  placeControls();
  stylePhaseBtns();
}

function placeControls() {
  let y0 = DRAW_H + 14;
  prevBtn.position(16, y0 + 46);  prevBtn.size(100, 34);
  nextBtn.position(128, y0 + 46); nextBtn.size(130, 34);

  let bw = 108, gap = 6, x0 = 16;
  for (let i = 0; i < phaseBtns.length; i++) {
    phaseBtns[i].position(x0 + i * (bw + gap), y0);
    phaseBtns[i].size(bw, 30);
  }

  for (let btn of [prevBtn, nextBtn]) {
    btn.style('background', '#1565c0');
    btn.style('color', '#fff');
    btn.style('border', 'none');
    btn.style('border-radius', '4px');
    btn.style('font-size', '13px');
    btn.style('cursor', 'pointer');
  }
  prevBtn.style('background', '#546e7a');
}

function stylePhaseBtns() {
  for (let i = 0; i < phaseBtns.length; i++) {
    let active = i === phaseIdx;
    phaseBtns[i].style('background',    active ? '#6a1b9a' : '#e0e0e0');
    phaseBtns[i].style('color',         active ? '#fff'    : '#333');
    phaseBtns[i].style('border',        'none');
    phaseBtns[i].style('border-radius', '4px');
    phaseBtns[i].style('font-size',     '11px');
    phaseBtns[i].style('cursor',        'pointer');
    phaseBtns[i].style('font-family',   'monospace');
  }
}

// ── Draw ────────────────────────────────────────────────────────────────────
function draw() {
  background(248);
  let phi = PHASES[phaseIdx].phi;
  drawHeader(phi);
  drawCircuit();
  drawBars(phi);
  drawStepInfo();
  drawCtrlBar();
}

function drawHeader(phi) {
  noStroke(); fill('#1565c0');
  rect(0, 0, width, 42);
  fill(255); textAlign(LEFT, CENTER); textSize(14);
  text('Quantum Phase Estimation  (n=3 counting qubits)', 12, 21);
  textAlign(RIGHT, CENTER); textSize(11); fill('#bbdefb');
  text('U|ψ⟩ = e^{2πi·' + nf(phi, 1, 3) + '}|ψ⟩', width - 12, 21);
}

function drawCircuit() {
  let x = 16, y = 50, w = width - 32, h = 88;
  noStroke(); fill('#fff');
  stroke('#ccc'); strokeWeight(1);
  rect(x, y, w, h, 4);

  let wireYs = [y + 22, y + 44, y + 66];
  let labels = ['q₀', 'q₁', 'q₂'];
  let lx = x + 10, rx = x + w - 10;
  let gapW = (rx - lx - 40) / 4;

  for (let i = 0; i < 3; i++) {
    stroke('#444'); strokeWeight(2);
    line(lx + 30, wireYs[i], rx - 8, wireYs[i]);
    noStroke(); fill(30); textAlign(RIGHT, CENTER); textSize(11);
    text(labels[i] + ' |0⟩', lx + 28, wireYs[i]);
  }

  // Eigenstate wire
  let ewY = y + h - 12;
  stroke('#888'); strokeWeight(1.5); setLineDash([4, 3]);
  line(lx + 30, ewY, rx - 8, ewY);
  setLineDash([]);
  noStroke(); fill('#888'); textAlign(RIGHT, CENTER); textSize(10);
  text('|ψ⟩', lx + 28, ewY);

  // Gate stages
  let stages = [
    { label: 'H⊗H⊗H', cx: lx + 40 + gapW * 0.6, col: '#1565c0', active: step >= 1 },
    { label: 'Ctrl-U^k', cx: lx + 40 + gapW * 1.6, col: '#6a1b9a', active: step >= 2 },
    { label: 'QFT†', cx: lx + 40 + gapW * 2.6,  col: '#2e7d32', active: step >= 3 },
    { label: '📏', cx: lx + 40 + gapW * 3.5,    col: '#e65100', active: step >= 4 }
  ];

  for (let s of stages) {
    let gw = s.label === '📏' ? 26 : 54, gh = wireYs[2] - wireYs[0] + 20;
    let gy = wireYs[0] - 10;
    stroke(s.active ? s.col : '#aaa');
    strokeWeight(s.active ? 2 : 1);
    fill(s.active ? s.col : '#e0e0e0');
    rect(s.cx - gw / 2, gy, gw, gh, 4);
    noStroke();
    fill(s.active ? 255 : '#888');
    textAlign(CENTER, CENTER); textSize(10);
    text(s.label, s.cx, wireYs[0] + (wireYs[2] - wireYs[0]) / 2);
  }
}

function setLineDash(arr) {
  drawingContext.setLineDash(arr);
}

function drawBars(phi) {
  let barX = 16, barY = 148, barH = 180, barW = min(48, floor((width - 60) / N_STATES));
  let gap  = 10;
  let total = N_STATES * barW + (N_STATES - 1) * gap;
  let sx   = barX + (width - 32 - total) / 2;
  let baseY = barY + barH;

  // Axis
  stroke('#ccc'); strokeWeight(1);
  line(sx - 8, baseY, sx + total + 8, baseY);

  // Max amplitude for scaling
  let maxA = 0;
  for (let a of amps) maxA = Math.max(maxA, Math.abs(a.re), Math.abs(a.im));
  maxA = Math.max(maxA, 0.01);

  let expectedBin = Math.round(phi * N_STATES) % N_STATES;

  for (let j = 0; j < N_STATES; j++) {
    let bx  = sx + j * (barW + gap);
    let reV = amps[j].re;
    let imV = amps[j].im;
    let prob = reV * reV + imV * imV;

    // Probability bar (from base)
    let ph = (prob / (maxA * maxA)) * barH * 0.92;
    noStroke();
    let isExpected = (step >= 3 && j === expectedBin);
    fill(isExpected ? '#2e7d32' : (j % 2 === 0 ? '#1565c0' : '#5c98d1'));
    if (ph > 0.5) rect(bx, baseY - ph, barW, ph, 1, 1, 0, 0);

    // Probability label
    if (prob > 0.005) {
      fill(30); textAlign(CENTER, BOTTOM); textSize(9.5);
      text(nf(prob, 1, 2), bx + barW / 2, baseY - ph - 2);
    }

    // Basis label
    noStroke(); fill(30); textAlign(CENTER, TOP); textSize(10);
    let bits = j.toString(2).padStart(N_BITS, '0');
    text('|' + bits + '⟩', bx + barW / 2, baseY + 4);
    // Decimal
    fill(80); textSize(9);
    text(j + '/8', bx + barW / 2, baseY + 16);
  }

  // Estimated phase annotation
  if (step >= 3) {
    noStroke(); fill('#2e7d32');
    textAlign(CENTER, TOP); textSize(11);
    text('Estimated φ ≈ ' + expectedBin + '/8 = ' + nf(expectedBin / N_STATES, 1, 3),
         sx + total / 2, baseY + 30);
  }
}

function drawStepInfo() {
  let y = 346;
  noStroke(); fill('#e3f2fd');
  rect(16, y, width - 32, 44, 4);
  fill('#0d47a1'); textSize(13); textAlign(LEFT, TOP);
  text(STEPS[step].label, 24, y + 6);
  fill(60); textSize(11);
  text(STEPS[step].desc, 24, y + 24);
}

function drawCtrlBar() {
  let y = DRAW_H + 2;
  noStroke(); fill('#eeeeee');
  rect(0, y, width, CTRL_H);
  fill(80); textSize(11); textAlign(LEFT, CENTER);
  text('Select true phase:', 16, y + 9);
}
