// algorithm-speedup-landscape.js
// Quantum Algorithm Speedup Landscape
// Chapter 10: Quantum Algorithms — EE 5340, UMN
//
// Interactive bar chart comparing classical vs quantum algorithm complexity.
// Hovering a bar shows a tooltip with the algorithm name, complexity, and
// speedup description.  Click toggles log / linear complexity scale display.

// ── Layout ─────────────────────────────────────────────────────────────────
const DRAW_H = 420;
const CTRL_H =  80;

// ── Algorithm data ───────────────────────────────────────────────────────────
// complexityRank: relative ordering on log scale for bar heights (higher = harder)
const ALGORITHMS = [
  {
    name: 'Unstructured\nSearch',
    classic: 'O(N)',       classicRank: 5,
    quantum: 'O(√N)',      quantumRank: 3.5,
    speedup: 'Quadratic',
    type: 'search',
    desc: 'Grover\'s algorithm finds a marked item in O(√N) oracle queries vs O(N) classically.'
  },
  {
    name: 'Integer\nFactoring',
    classic: 'sub-exp',    classicRank: 7.5,
    quantum: 'O((log N)³)',quantumRank: 2.5,
    speedup: 'Exponential',
    type: 'factoring',
    desc: 'Shor\'s algorithm factors N-bit integers in polynomial time; best classical is sub-exponential.'
  },
  {
    name: 'Discrete\nLogarithm',
    classic: 'sub-exp',    classicRank: 7.5,
    quantum: 'O((log N)³)',quantumRank: 2.5,
    speedup: 'Exponential',
    type: 'algebra',
    desc: 'Shor\'s algorithm solves the discrete log problem — the basis of ECC security.'
  },
  {
    name: 'Quantum\nSimulation',
    classic: 'exp(N)',      classicRank: 9,
    quantum: 'poly(N)',     quantumRank: 3,
    speedup: 'Exponential',
    type: 'simulation',
    desc: 'Simulating quantum systems takes exponential classical resources; quantum hardware scales polynomially.'
  },
  {
    name: 'Linear\nSystems',
    classic: 'O(N·κ)',     classicRank: 5.5,
    quantum: 'O(log N)',   quantumRank: 1.5,
    speedup: 'Exponential\n(under assumptions)',
    type: 'linear',
    desc: 'HHL algorithm solves certain sparse linear systems in O(log N) — with important caveats on data access.'
  },
  {
    name: 'Quantum\nWalk',
    classic: 'O(N)',       classicRank: 5,
    quantum: 'O(√N)',      quantumRank: 3,
    speedup: 'Quadratic',
    type: 'walk',
    desc: 'Quantum walks on graphs find marked vertices in O(√N) steps (vs O(N) for classical random walks).'
  },
  {
    name: 'Phase\nEstimation',
    classic: 'O(1/ε²)',   classicRank: 6,
    quantum: 'O(1/ε)',    quantumRank: 3.5,
    speedup: 'Quadratic',
    type: 'phase',
    desc: 'QPE estimates eigenvalues to precision ε with quadratically fewer samples than classical Monte Carlo.'
  },
  {
    name: 'Sorting',
    classic: 'O(N log N)', classicRank: 4.5,
    quantum: 'Ω(N log N)', quantumRank: 4.2,
    speedup: 'None',
    type: 'sorting',
    desc: 'Sorting has no known quantum speedup; the lower bound Ω(N log N) applies to quantum algorithms too.'
  }
];

// ── Colors by speedup type ────────────────────────────────────────────────────
const speedupColors = {
  'Exponential':               '#b71c1c',
  'Exponential\n(under assumptions)': '#e53935',
  'Quadratic':                 '#1565c0',
  'None':                      '#546e7a'
};

// ── State ─────────────────────────────────────────────────────────────────────
let hoveredIdx = -1;

// ── p5 setup ─────────────────────────────────────────────────────────────────
function setup() {
  let cnv = createCanvas(windowWidth, DRAW_H + CTRL_H);
  cnv.parent('canvas-container');
  textFont('monospace');
}

function windowResized() {
  resizeCanvas(windowWidth, DRAW_H + CTRL_H);
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function draw() {
  background(248);
  detectHover();
  drawHeader();
  drawChart();
  drawLegend();
  drawTooltip();
}

function detectHover() {
  let n = ALGORITHMS.length;
  let chartX = 60, chartW = width - 80;
  let groupW = chartW / n;
  hoveredIdx = -1;
  for (let i = 0; i < n; i++) {
    let gx = chartX + i * groupW;
    if (mouseX >= gx && mouseX < gx + groupW && mouseY > 52 && mouseY < DRAW_H - 60) {
      hoveredIdx = i;
    }
  }
}

function drawHeader() {
  noStroke(); fill('#1565c0');
  rect(0, 0, width, 42);
  fill(255); textAlign(LEFT, CENTER); textSize(14);
  text('Quantum Algorithm Speedup Landscape', 12, 21);
  textAlign(RIGHT, CENTER); textSize(11); fill('#bbdefb');
  text('Hover a bar group to see details', width - 12, 21);
}

function drawChart() {
  let n = ALGORITHMS.length;
  let chartX  = 60;
  let chartY  = 58;
  let chartW  = width - 80;
  let chartH  = DRAW_H - 130;
  let maxRank = 10;

  // Y-axis label
  noStroke(); fill(80); textAlign(CENTER, CENTER); textSize(10);
  push(); translate(18, chartY + chartH / 2); rotate(-HALF_PI);
  text('Complexity  (log scale, relative)', 0, 0);
  pop();

  // Axis
  stroke('#ccc'); strokeWeight(1);
  line(chartX, chartY, chartX, chartY + chartH);
  line(chartX, chartY + chartH, chartX + chartW, chartY + chartH);

  // Y grid lines
  for (let r = 0; r <= maxRank; r += 2) {
    let gy = chartY + chartH - (r / maxRank) * chartH;
    stroke('#e0e0e0'); strokeWeight(0.5);
    line(chartX, gy, chartX + chartW, gy);
  }

  let groupW  = chartW / n;
  let barPad  = 4;
  let barW    = (groupW - barPad * 3) / 2;

  for (let i = 0; i < n; i++) {
    let alg = ALGORITHMS[i];
    let gx  = chartX + i * groupW;
    let isHovered = (i === hoveredIdx);

    // Hover background
    if (isHovered) {
      noStroke(); fill('#f0f4ff');
      rect(gx, chartY, groupW, chartH);
    }

    // Classical bar (left)
    let ch = (alg.classicRank / maxRank) * chartH;
    let cy = chartY + chartH - ch;
    noStroke();
    fill(isHovered ? '#ef9a9a' : '#ef9a9a88');
    rect(gx + barPad, cy, barW, ch, 2, 2, 0, 0);
    // Label inside bar
    fill('#b71c1c'); textAlign(CENTER, TOP); textSize(9);
    text(alg.classic, gx + barPad + barW / 2, cy + 4);

    // Quantum bar (right)
    let qh = (alg.quantumRank / maxRank) * chartH;
    let qy = chartY + chartH - qh;
    let qcol = speedupColors[alg.speedup] || '#1565c0';
    noStroke();
    fill(isHovered ? qcol + 'ff' : qcol + '99');
    rect(gx + barPad * 2 + barW, qy, barW, qh, 2, 2, 0, 0);
    fill(qcol); textAlign(CENTER, TOP); textSize(9);
    text(alg.quantum, gx + barPad * 2 + barW + barW / 2, qy + 4);

    // Algorithm name below axis
    noStroke(); fill(isHovered ? '#1565c0' : 40);
    textAlign(CENTER, TOP); textSize(9.5);
    text(alg.name, gx + groupW / 2, chartY + chartH + 6);

    // Speedup badge
    if (alg.speedup !== 'None') {
      let sc = speedupColors[alg.speedup] || '#1565c0';
      noStroke(); fill(sc + '33');
      let badgeH = 14;
      rect(gx + barPad, chartY + chartH - ch - badgeH - 2, groupW - barPad * 2, badgeH, 3);
      fill(sc); textAlign(CENTER, CENTER); textSize(8.5);
      text(alg.speedup.split('\n')[0], gx + groupW / 2, chartY + chartH - ch - badgeH / 2 - 2);
    }
  }
}

function drawLegend() {
  let lx = 60, ly = DRAW_H - 62;
  let items = [
    { col: '#ef9a9a', label: 'Classical complexity' },
    { col: '#1565c0', label: 'Quantum complexity' },
    { col: '#b71c1c', label: 'Exponential speedup' },
    { col: '#1565c0', label: 'Quadratic speedup' },
    { col: '#546e7a', label: 'No speedup known' }
  ];
  noStroke(); textSize(10);
  for (let i = 0; i < items.length; i++) {
    let x = lx + i * 148;
    fill(items[i].col);
    rect(x, ly, 12, 12, 2);
    fill(60); textAlign(LEFT, CENTER);
    text(items[i].label, x + 16, ly + 6);
  }
}

function drawTooltip() {
  if (hoveredIdx < 0) return;
  let alg = ALGORITHMS[hoveredIdx];

  let tx = min(mouseX + 14, width - 260);
  let ty = max(mouseY - 20, 50);
  let tw = 240, th = 90;

  noStroke(); fill('#212121cc');
  rect(tx, ty, tw, th, 6);
  fill(255); textAlign(LEFT, TOP); textSize(11);
  text(alg.name.replace('\n', ' '), tx + 8, ty + 8);
  fill('#aaa'); textSize(10);
  text('Classical: ' + alg.classic + '   Quantum: ' + alg.quantum, tx + 8, ty + 24);
  fill(speedupColors[alg.speedup] || '#fff'); textSize(10);
  text('Speedup: ' + alg.speedup.replace('\n', ' '), tx + 8, ty + 40);
  fill('#ccc'); textSize(9);
  // Wrap desc
  let words = alg.desc.split(' '), line = '', lx = tx + 8, ltY = ty + 56;
  for (let w of words) {
    let test = line + (line ? ' ' : '') + w;
    if (textWidth(test) > tw - 16 && line) {
      text(line, lx, ltY); ltY += 13; line = w;
    } else line = test;
  }
  if (line) text(line, lx, ltY);
}
