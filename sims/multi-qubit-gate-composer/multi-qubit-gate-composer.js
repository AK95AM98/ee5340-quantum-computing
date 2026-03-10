// multi-qubit-gate-composer.js
// Multi-Qubit Gate Composer
// Chapter 9: Quantum Gates and Circuits — EE 5340, UMN
//
// Shows the complete truth table for CNOT, CZ, SWAP, and Toffoli gates.
// Click any input row to highlight it. The right panel shows the circuit
// symbol and a plain-language description of the gate's action.

// ── Layout constants ─────────────────────────────────────────────────────────
const DRAW_H  = 390;
const CTRL_H  = 100;
const HEAD_H  = 42;

// ── Gate definitions ─────────────────────────────────────────────────────────
const GATES = ['CNOT', 'CZ', 'SWAP', 'Toffoli'];

const gateData = {
  CNOT: {
    qubits: 2, label: 'CNOT — Controlled-NOT',
    desc:  'Flips the target qubit (q₁) if and only if the control qubit (q₀) is |1⟩. Creates entanglement from product states.',
    props: ['Control: q₀   Target: q₁', 'CNOT|10⟩ = |11⟩,  CNOT|11⟩ = |10⟩', 'Equivalent to classical XOR on target', 'Universal together with H and T'],
    circuit: 'cnot',
    transform(s) {
      let q0 = (s >> 1) & 1, q1 = s & 1;
      if (q0) q1 ^= 1;
      return { out: (q0 << 1) | q1, phase: 1 };
    }
  },
  CZ: {
    qubits: 2, label: 'CZ — Controlled-Z',
    desc:  'Applies a phase flip (×−1) to the |11⟩ component. The qubit bit values are unchanged — only the phase is affected.',
    props: ['Control: q₀   Target: q₁', 'CZ|11⟩ = −|11⟩  (phase flip)', 'All other states unchanged', 'Symmetric: control and target are interchangeable'],
    circuit: 'cz',
    transform(s) {
      let q0 = (s >> 1) & 1, q1 = s & 1;
      let phase = (q0 && q1) ? -1 : 1;
      return { out: s, phase };
    }
  },
  SWAP: {
    qubits: 2, label: 'SWAP',
    desc:  'Exchanges the states of q₀ and q₁. Both qubits swap their values completely.',
    props: ['SWAP|01⟩ = |10⟩', 'SWAP|10⟩ = |01⟩', 'SWAP² = I  (self-inverse)', 'SWAP = CNOT·CNOT⁻¹·CNOT (three CNOTs)'],
    circuit: 'swap',
    transform(s) {
      let q0 = (s >> 1) & 1, q1 = s & 1;
      return { out: (q1 << 1) | q0, phase: 1 };
    }
  },
  Toffoli: {
    qubits: 3, label: 'Toffoli — CCNOT',
    desc:  'Flips the target qubit (q₂) only when both control qubits (q₀ and q₁) are |1⟩. Classically universal gate.',
    props: ['Controls: q₀, q₁   Target: q₂', 'Toffoli|110⟩ = |111⟩', 'Toffoli|111⟩ = |110⟩', 'Implements AND gate: q₂ out = q₂ ⊕ (q₀·q₁)'],
    circuit: 'toffoli',
    transform(s) {
      let q0 = (s >> 2) & 1, q1 = (s >> 1) & 1, q2 = s & 1;
      if (q0 && q1) q2 ^= 1;
      return { out: (q0 << 2) | (q1 << 1) | q2, phase: 1 };
    }
  }
};

// ── State ─────────────────────────────────────────────────────────────────────
let selectedGate = 'CNOT';
let hoveredRow   = -1;
let selectedRow  = 0;

// ── p5 controls ───────────────────────────────────────────────────────────────
let gateBtns = [];

// ── Helpers ───────────────────────────────────────────────────────────────────
function bits(idx, n) {
  let s = '';
  for (let i = n - 1; i >= 0; i--) s = ((idx >> i) & 1) + s;
  return s;
}
function ket(idx, n) { return '|' + bits(idx, n) + '⟩'; }

// ── p5 setup ─────────────────────────────────────────────────────────────────
function setup() {
  let cnv = createCanvas(windowWidth, DRAW_H + CTRL_H);
  cnv.parent('canvas-container');
  textFont('monospace');
  buildButtons();
}

function windowResized() {
  resizeCanvas(windowWidth, DRAW_H + CTRL_H);
  placeButtons();
}

function buildButtons() {
  for (let g of GATES) {
    let btn = createButton(g);
    btn.class('gate-btn');
    btn.mousePressed(() => {
      selectedGate = g;
      selectedRow  = 0;
      hoveredRow   = -1;
      styleButtons();
    });
    gateBtns.push(btn);
  }
  placeButtons();
  styleButtons();
}

function placeButtons() {
  let y = DRAW_H + 20;
  let bw = 86, gap = 8, x0 = 16;
  for (let i = 0; i < gateBtns.length; i++) {
    gateBtns[i].position(x0 + i * (bw + gap), y);
    gateBtns[i].size(bw, 34);
  }
}

function styleButtons() {
  for (let btn of gateBtns) {
    let active = btn.elt.textContent === selectedGate;
    btn.style('background',    active ? '#1565c0' : '#e0e0e0');
    btn.style('color',         active ? '#fff'    : '#212121');
    btn.style('border',        'none');
    btn.style('border-radius', '4px');
    btn.style('font-family',   'monospace');
    btn.style('font-size',     '13px');
    btn.style('font-weight',   active ? '700' : '400');
    btn.style('cursor',        'pointer');
  }
}

// ── Main draw ─────────────────────────────────────────────────────────────────
function draw() {
  background(248);
  let g = gateData[selectedGate];
  let n = g.qubits;
  let N = 1 << n;

  drawHeader(g);

  // Divide content into left (truth table) and right (circuit + info)
  let splitX = floor(width * 0.52);

  drawTruthTable(g, n, N, 16, HEAD_H + 4, splitX - 32);
  drawCircuitPanel(g, n, splitX + 8, HEAD_H + 4, width - splitX - 20);
  drawControlsBar(n);
}

// ── Header ────────────────────────────────────────────────────────────────────
function drawHeader(g) {
  noStroke();
  fill('#1565c0');
  rect(0, 0, width, HEAD_H);
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Multi-Qubit Gate Composer', 12, HEAD_H / 2 - 5);
  textSize(11);
  fill(200, 220, 255);
  text(g.label, 12, HEAD_H / 2 + 9);
}

// ── Truth Table ───────────────────────────────────────────────────────────────
function drawTruthTable(g, n, N, x, y, w) {
  let rowH  = constrain(floor((DRAW_H - HEAD_H - 20) / (N + 1)), 24, 46);
  let colW  = floor(w / 2.4);

  // Column headers
  noStroke();
  fill(30);
  textSize(12);
  textAlign(LEFT, CENTER);

  // Header row
  fill('#e3f2fd');
  rect(x, y, w, rowH, 4, 4, 0, 0);
  fill(30);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Input', x + colW * 0.5, y + rowH / 2);
  text('Output', x + colW * 1.1, y + rowH / 2);

  for (let i = 0; i < N; i++) {
    let ry = y + rowH * (i + 1);
    let res = g.transform(i);

    // Hover / selected highlight
    let isSelected = (i === selectedRow);
    let isHovered  = (i === hoveredRow && i !== selectedRow);

    if (isSelected)     { fill('#bbdefb'); }
    else if (isHovered) { fill('#e8f5e9'); }
    else                { fill(i % 2 === 0 ? 255 : '#f5f5f5'); }
    noStroke();
    rect(x, ry, w, rowH);

    // Input ket
    fill(isSelected ? '#0d47a1' : 40);
    textAlign(CENTER, CENTER);
    textSize(13);
    text(ket(i, n), x + colW * 0.5, ry + rowH / 2);

    // Arrow
    fill(120);
    textSize(12);
    text('→', x + colW * 0.88, ry + rowH / 2);

    // Output ket + phase
    let outLabel = ket(res.out, n);
    if (res.phase === -1) outLabel = '−' + outLabel;

    fill(isSelected ? '#1b5e20' : (res.phase === -1 ? '#b71c1c' : 30));
    textAlign(CENTER, CENTER);
    textSize(13);
    text(outLabel, x + colW * 1.3, ry + rowH / 2);

    // Left accent bar for selected
    if (isSelected) {
      fill('#1565c0');
      rect(x, ry, 4, rowH);
    }
  }

  // Outer border
  noFill();
  stroke('#90a4ae');
  strokeWeight(1);
  rect(x, y, w, rowH * (N + 1), 4);

  // Label
  noStroke();
  fill(100);
  textSize(10);
  textAlign(LEFT);
  text('← Click a row to select it', x, y + rowH * (N + 1) + 14);
}

// ── Circuit Panel ─────────────────────────────────────────────────────────────
function drawCircuitPanel(g, n, x, y, w) {
  let panelH = DRAW_H - HEAD_H - 4;

  // Background
  noStroke();
  fill('#fff');
  stroke('#b0bec5');
  strokeWeight(1);
  rect(x, y, w, panelH, 6);

  // Circuit diagram area
  let circH = floor(panelH * 0.50);
  drawCircuitSymbol(g, n, x + 8, y + 8, w - 16, circH);

  // Description
  let dy = y + circH + 12;
  noStroke();
  fill(30);
  textAlign(LEFT, TOP);
  textSize(11);
  text('Description:', x + 10, dy);
  fill(60);
  textSize(10.5);
  // Wrap text manually
  let words = g.desc.split(' ');
  let line = '', lx = x + 10, ly = dy + 16, maxW = w - 20;
  for (let wd of words) {
    let test = line + (line ? ' ' : '') + wd;
    if (textWidth(test) > maxW && line) {
      text(line, lx, ly);
      ly += 15;
      line = wd;
    } else line = test;
  }
  if (line) text(line, lx, ly);
  ly += 22;

  // Properties
  fill(30);
  textSize(11);
  text('Key Properties:', x + 10, ly);
  ly += 16;
  fill(60);
  textSize(10.5);
  for (let p of g.props) {
    text('• ' + p, x + 12, ly);
    ly += 15;
  }
}

function drawCircuitSymbol(g, n, x, y, w, h) {
  let wireY  = (i) => y + h * (i + 1) / (n + 1);
  let cx     = x + w * 0.45;
  let lx     = x + w * 0.18;
  let rx     = x + w * 0.72;
  let gtype  = g.circuit;

  // Qubit wire labels and lines
  for (let i = 0; i < n; i++) {
    let wy = wireY(i);
    // Wire
    stroke('#444');
    strokeWeight(2);
    line(lx, wy, rx, wy);
    // Label (left)
    noStroke();
    fill(30);
    textAlign(RIGHT, CENTER);
    textSize(12);
    text('q' + i, lx - 4, wy);
    // Label (right)
    textAlign(LEFT, CENTER);
    text('q' + i, rx + 4, wy);
  }

  // Gate symbols
  if (gtype === 'cnot' || gtype === 'cz') {
    let ctrlY = wireY(0);
    let tgtY  = wireY(1);

    // Vertical line between wires
    stroke('#1565c0');
    strokeWeight(2);
    line(cx, ctrlY, cx, tgtY);

    // Control dot (filled circle)
    fill('#1565c0');
    noStroke();
    ellipse(cx, ctrlY, 14, 14);

    if (gtype === 'cnot') {
      // Target: circle with plus
      stroke('#1565c0');
      strokeWeight(2);
      noFill();
      ellipse(cx, tgtY, 24, 24);
      stroke('#1565c0');
      line(cx - 12, tgtY, cx + 12, tgtY);
      line(cx, tgtY - 12, cx, tgtY + 12);
    } else {
      // CZ: dot on target too
      fill('#1565c0');
      noStroke();
      ellipse(cx, tgtY, 14, 14);
    }
  }

  if (gtype === 'swap') {
    let y0 = wireY(0);
    let y1 = wireY(1);
    stroke('#2e7d32');
    strokeWeight(2);
    line(cx, y0, cx, y1);
    // X marks
    let sz = 10;
    stroke('#2e7d32');
    strokeWeight(2.5);
    for (let wy of [y0, y1]) {
      line(cx - sz, wy - sz, cx + sz, wy + sz);
      line(cx - sz, wy + sz, cx + sz, wy - sz);
    }
  }

  if (gtype === 'toffoli') {
    let c0 = wireY(0);
    let c1 = wireY(1);
    let tg = wireY(2);
    stroke('#6a1b9a');
    strokeWeight(2);
    line(cx, c0, cx, tg);
    // Two control dots
    fill('#6a1b9a');
    noStroke();
    ellipse(cx, c0, 14, 14);
    ellipse(cx, c1, 14, 14);
    // Target: circle+plus
    stroke('#6a1b9a');
    strokeWeight(2);
    noFill();
    ellipse(cx, tg, 24, 24);
    stroke('#6a1b9a');
    line(cx - 12, tg, cx + 12, tg);
    line(cx, tg - 12, cx, tg + 12);
  }

  // Highlight active row result
  let res = gateData[selectedGate].transform(selectedRow);
  let n_  = gateData[selectedGate].qubits;
  noStroke();
  fill('#1565c0');
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text('In: ' + ket(selectedRow, n_) + '  →  Out: ' + (res.phase === -1 ? '−' : '') + ket(res.out, n_),
       x + w / 2, y + h - 2);
}

// ── Controls bar ──────────────────────────────────────────────────────────────
function drawControlsBar(n) {
  let y = DRAW_H;
  noStroke();
  fill('#eeeeee');
  rect(0, y, width, CTRL_H);

  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Select gate:', 16, y + 15);
  text('Qubits: ' + n + '   |   Truth table rows: ' + (1 << n) + '   |   Click any row to highlight it', 16, y + 65);
}

// ── Mouse interaction ─────────────────────────────────────────────────────────
function mouseMoved() {
  updateHover();
}
function mousePressed() {
  let g = gateData[selectedGate];
  let n = g.qubits;
  let N = 1 << n;
  let rowH = constrain(floor((DRAW_H - HEAD_H - 20) / (N + 1)), 24, 46);
  let x    = 16;
  let y    = HEAD_H + 4;
  let w    = floor(width * 0.52) - 32;

  for (let i = 0; i < N; i++) {
    let ry = y + rowH * (i + 1);
    if (mouseX >= x && mouseX <= x + w && mouseY >= ry && mouseY <= ry + rowH) {
      selectedRow = i;
    }
  }
}

function updateHover() {
  let g = gateData[selectedGate];
  let n = g.qubits;
  let N = 1 << n;
  let rowH = constrain(floor((DRAW_H - HEAD_H - 20) / (N + 1)), 24, 46);
  let x    = 16;
  let y    = HEAD_H + 4;
  let w    = floor(width * 0.52) - 32;

  hoveredRow = -1;
  for (let i = 0; i < N; i++) {
    let ry = y + rowH * (i + 1);
    if (mouseX >= x && mouseX <= x + w && mouseY >= ry && mouseY <= ry + rowH) {
      hoveredRow = i;
    }
  }
}
