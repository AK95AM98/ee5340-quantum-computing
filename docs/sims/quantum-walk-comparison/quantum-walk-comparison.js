// quantum-walk-comparison.js
// Classical vs Quantum Random Walk Comparison
// Chapter 10: Quantum Algorithms — EE 5340, UMN
//
// Compares the position probability distribution of a classical random walk
// (binomial/Gaussian) with a discrete-time quantum walk (Hadamard coin) on
// a 1D line after t steps.  Step slider updates distributions in real time.

// ── Layout ─────────────────────────────────────────────────────────────────
const DRAW_H = 400;
const CTRL_H = 120;
const MAX_STEPS = 50;

// ── State ───────────────────────────────────────────────────────────────────
let steps = 20;
let stepSlider;

// ── Classical walk ──────────────────────────────────────────────────────────
// After t steps starting from 0, position distribution is Binomial(t, 0.5)
// shifted so mean = 0. Position ranges from -t to +t in steps of 2.
function classicalProbs(t) {
  // prob[k] = C(t, k) * 0.5^t,  position = 2k - t  (k=0..t)
  let probs = [];
  let binom = 1;
  for (let k = 0; k <= t; k++) {
    probs.push({ pos: 2 * k - t, p: binom * Math.pow(0.5, t) });
    binom = binom * (t - k) / (k + 1);
  }
  return probs;
}

// ── Quantum walk (Hadamard coin) ────────────────────────────────────────────
// State: array indexed by position (−t … +t), each element = [ampL, ampR]
// coin (Hadamard): |L⟩ → (|L⟩+|R⟩)/√2, |R⟩ → (|L⟩−|R⟩)/√2
// shift: |L, x⟩ → |L, x−1⟩  and  |R, x⟩ → |R, x+1⟩
function quantumProbs(t) {
  // Index offset: position p → index p + t  (positions: -t .. +t, 2t+1 values)
  let N = 2 * t + 1;
  let off = t;
  // State: [L_re, L_im, R_re, R_im] per position
  let state = [];
  for (let i = 0; i < N; i++) state.push([0, 0, 0, 0]);

  // Initial: at position 0, spin = (|L⟩ + i|R⟩) / √2  (symmetric start)
  let iv2 = 1 / Math.sqrt(2);
  state[off][0] = iv2;   // L_re
  state[off][2] = 0;     // R_re
  state[off][3] = iv2;   // R_im

  for (let s = 0; s < t; s++) {
    // Apply Hadamard coin
    let after_coin = [];
    for (let i = 0; i < N; i++) {
      let [lr, li, rr, ri] = state[i];
      // H|L⟩ = (|L⟩+|R⟩)/√2 → new L and R from old L
      // H|R⟩ = (|L⟩−|R⟩)/√2 → new L and R from old R
      after_coin.push([
        (lr + rr) * iv2, (li + ri) * iv2,  // new L
        (lr - rr) * iv2, (li - ri) * iv2   // new R
      ]);
    }
    // Shift: L moves left (pos−1), R moves right (pos+1)
    let next = [];
    for (let i = 0; i < N; i++) next.push([0, 0, 0, 0]);
    for (let i = 0; i < N; i++) {
      let [lr, li, rr, ri] = after_coin[i];
      if (i - 1 >= 0) { next[i - 1][0] += lr; next[i - 1][1] += li; }  // L goes left
      if (i + 1 < N)  { next[i + 1][2] += rr; next[i + 1][3] += ri; }  // R goes right
    }
    state = next;
  }

  // Compute probabilities
  let probs = [];
  for (let i = 0; i < N; i++) {
    let [lr, li, rr, ri] = state[i];
    let p = lr * lr + li * li + rr * rr + ri * ri;
    if (p > 1e-10) probs.push({ pos: i - off, p });
  }
  return probs;
}

// ── p5 setup ────────────────────────────────────────────────────────────────
function setup() {
  let cnv = createCanvas(windowWidth, DRAW_H + CTRL_H);
  cnv.parent('canvas-container');
  textFont('monospace');

  stepSlider = createSlider(1, MAX_STEPS, steps, 1);
  stepSlider.input(() => { steps = stepSlider.value(); });

  placeControls();
}

function windowResized() {
  resizeCanvas(windowWidth, DRAW_H + CTRL_H);
  placeControls();
}

function placeControls() {
  stepSlider.position(120, DRAW_H + 20);
  stepSlider.size(min(width - 200, 360));
}

// ── Draw ────────────────────────────────────────────────────────────────────
function draw() {
  background(248);
  steps = stepSlider.value();

  drawHeader();

  let cProbs = classicalProbs(steps);
  let qProbs = quantumProbs(steps);

  let chartX = 20, chartY = 52, chartW = width - 40, chartH = DRAW_H - 80;

  drawBothWalks(cProbs, qProbs, chartX, chartY, chartW, chartH);
  drawCtrlBar();
}

function drawHeader() {
  noStroke();
  fill('#1565c0');
  rect(0, 0, width, 42);
  fill(255);
  textAlign(LEFT, CENTER); textSize(14);
  text('Classical vs Quantum Walk  — ' + steps + ' steps', 12, 21);
  textAlign(RIGHT, CENTER); textSize(11);
  fill('#bbdefb');
  text('Quantum: bimodal spread  vs  Classical: Gaussian', width - 12, 21);
}

function drawBothWalks(cProbs, qProbs, x, y, w, h) {
  // Find max probability across both for shared scale
  let maxP = 0;
  for (let d of cProbs) maxP = max(maxP, d.p);
  for (let d of qProbs) maxP = max(maxP, d.p);
  maxP = maxP * 1.1;

  let legendH = 20, axisH = 24;
  let plotH   = h - legendH - axisH;
  let halfW   = floor((w - 10) / 2);

  // Classical panel (left)
  drawPanel(cProbs, x, y + legendH, halfW, plotH, axisH, maxP,
            '#1565c0', 'Classical Random Walk', 'Gaussian / Binomial');

  // Quantum panel (right)
  drawPanel(qProbs, x + halfW + 10, y + legendH, halfW, plotH, axisH, maxP,
            '#6a1b9a', 'Quantum Walk (Hadamard coin)', 'Bimodal — ballistic spread');
}

function drawPanel(probs, x, y, w, h, axisH, maxP, col, title, subtitle) {
  // Background
  noStroke(); fill('#fff');
  stroke('#ccc'); strokeWeight(1);
  rect(x, y, w, h + axisH, 4);

  // Title
  noStroke(); fill(col);
  textAlign(LEFT, TOP); textSize(12);
  text(title, x + 6, y + 4);
  fill(100); textSize(10);
  text(subtitle, x + 6, y + 19);

  // Plot bars
  let plotY = y + 34;
  let plotH = h - 34;
  let baseY = plotY + plotH;

  // Determine x range: −steps to +steps, only even positions
  let positions = [];
  for (let p = -steps; p <= steps; p += (steps <= 10 ? 1 : 2)) positions.push(p);
  if (positions.length === 0) return;

  let barW = max(1, floor(w / (positions.length + 2)));
  let startX = x + (w - positions.length * barW) / 2;

  // Axis line
  stroke('#aaa'); strokeWeight(1);
  line(x + 6, baseY, x + w - 6, baseY);

  for (let i = 0; i < positions.length; i++) {
    let pos = positions[i];
    let entry = probs.find(d => d.pos === pos);
    let p = entry ? entry.p : 0;

    let bh = (p / maxP) * plotH * 0.92;
    let bx = startX + i * barW;

    noStroke();
    fill(col + 'cc');
    if (bh > 0) rect(bx, baseY - bh, max(1, barW - 1), bh, 1, 1, 0, 0);

    // Axis labels (sparse)
    if (i % max(1, floor(positions.length / 8)) === 0) {
      fill(80); noStroke(); textAlign(CENTER, TOP);
      textSize(9);
      text(pos, bx + barW / 2, baseY + 2);
    }
  }

  // Y-axis max label
  noStroke(); fill(80); textAlign(LEFT, TOP); textSize(9);
  text(nf(maxP * 0.9, 1, 2), x + 6, plotY + 2);

  // Position label below
  fill(80); textAlign(CENTER, BOTTOM); textSize(10);
  text('Position', x + w / 2, y + h + axisH - 2);

  // Spread annotation
  let std_c = sqrt(steps / 4);          // classical std dev = sqrt(t)/2
  let spread_q = steps * 0.7;            // quantum: ~0.7t spread
  fill(col); textAlign(RIGHT, TOP); textSize(9.5);
  text('σ ≈ ' + nf(std_c, 1, 1) + '  (classical)', x + w - 4, y + 4);
}

function drawCtrlBar() {
  let y = DRAW_H;
  noStroke(); fill('#eeeeee');
  rect(0, y, width, CTRL_H);

  fill(80); textAlign(LEFT, CENTER); textSize(11);
  text('Steps (t):  ' + steps, 20, y + 22);
  text('Spread: Classical ~√t = ' + nf(sqrt(steps), 1, 1) +
       '   Quantum ~0.7t = ' + nf(0.7 * steps, 1, 1), 20, y + 50);
  fill('#6a1b9a'); textSize(10.5);
  text('Quantum walk spreads quadratically faster: O(t) vs O(√t)', 20, y + 72);
}
