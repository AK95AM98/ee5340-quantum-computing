// single-qubit-gate-bloch.js
// Interactive Bloch Sphere Visualizer for single-qubit quantum gates
// Chapter 9: Quantum Gates and Circuits — EE 5340, UMN
//
// The Bloch sphere represents a qubit state as a unit vector:
//   |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
// Bloch vector: x = sin(θ)cos(φ), y = sin(θ)sin(φ), z = cos(θ)
//
// Gate actions on Bloch vector:
//   X: (x, -y, -z)   — π rotation around X axis
//   Y: (-x, y, -z)   — π rotation around Y axis
//   Z: (-x, -y, z)   — π rotation around Z axis
//   H: (z, -y, x)    — π rotation around (X+Z)/√2 axis
//   S: rot π/2 around Z
//   T: rot π/4 around Z

// === Canvas layout ===
let canvasWidth = 600;
let drawHeight = 500;
let controlHeight = 120;  // 3 rows × 35 + 10
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// === Quantum state ===
let theta = 0;      // polar angle [0, π],     default = 0 → |0⟩
let phi   = 0;      // azimuthal angle [0, 2π], default = 0

// === View rotation ===
let rotAz = -0.4;   // azimuthal viewing angle
let rotEl =  0.3;   // elevation viewing angle

// === Interaction state ===
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseOverCanvas = false;

// === Sphere geometry (computed each frame) ===
let sphereRadius;
let centerX, centerY;

// === UI controls ===
let thetaSlider, phiSlider;
let gateButtons = {};

// ─────────────────────────────────────────────
function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Pause auto-rotation when mouse leaves canvas
  canvas.mouseOver(() => { mouseOverCanvas = true; });
  canvas.mouseOut(()  => { mouseOverCanvas = false; });

  // Row 1: θ (polar angle) slider
  thetaSlider = createSlider(0, PI, 0, 0.01);
  thetaSlider.position(sliderLeftMargin, drawHeight + 5);
  thetaSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Row 2: φ (azimuthal angle) slider
  phiSlider = createSlider(0, TWO_PI, 0, 0.01);
  phiSlider.position(sliderLeftMargin, drawHeight + 40);
  phiSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Row 3: Gate buttons
  let gates = ['X', 'Y', 'Z', 'H', 'S', 'T'];
  for (let i = 0; i < gates.length; i++) {
    let g = gates[i];
    let btn = createButton(g);
    btn.position(80 + i * 55, drawHeight + 78);
    btn.style('width',            '46px');
    btn.style('height',           '28px');
    btn.style('font-size',        '15px');
    btn.style('cursor',           'pointer');
    btn.style('background-color', '#3a6fbe');
    btn.style('color',            'white');
    btn.style('border',           'none');
    btn.style('border-radius',    '4px');
    btn.mousePressed(() => applyGate(g));
    gateButtons[g] = btn;
  }

  describe(
    'Bloch sphere showing a single-qubit quantum state vector. ' +
    'Drag the sphere to rotate the view. ' +
    'Use the theta slider to set the polar angle and phi slider for the azimuthal angle. ' +
    'Click X, Y, Z, H, S, or T gate buttons to apply quantum gates.',
    LABEL
  );
}

// ─────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  // Read slider values
  theta = thetaSlider.value();
  phi   = phiSlider.value();

  // Slow auto-rotation only when mouse is over canvas
  if (mouseOverCanvas && !isDragging) {
    rotAz += 0.004;
  }

  // === Drawing region background ===
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // === Control region background ===
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Compute sphere geometry based on available space
  sphereRadius = min(drawHeight * 0.35, canvasWidth * 0.28);
  centerX = canvasWidth / 2;
  centerY = drawHeight * 0.48;

  // === Title (drawn after backgrounds, left-of-center to avoid info panel) ===
  noStroke();
  fill(20, 20, 100);
  textSize(21);
  textAlign(CENTER, TOP);
  text('Bloch Sphere Visualizer', canvasWidth * 0.38, 8);

  // === Sphere components (back → front) ===
  drawGreatCircles();
  drawSphereOutline();
  drawAxes();
  drawProjectionLines();
  drawStateVector();
  drawPoleLabels();

  // === Information overlays ===
  drawInfoPanel();
  drawStateStrip();

  // === Control area labels ===
  drawControlLabels();
}

// ─────────────────────────────────────────────
// 3-D orthographic projection with view rotation
// World axes: Z = up, X = right, Y = depth
function project3D(x, y, z) {
  // Rotate world around Z axis by -rotAz (azimuthal view)
  let az = -rotAz;
  let x1 = x * cos(az) - y * sin(az);
  let y1 = x * sin(az) + y * cos(az);
  let z1 = z;

  // Rotate around X axis by rotEl (elevation tilt)
  let el = rotEl;
  let x2 =  x1;
  let sy = -(y1 * cos(el) - z1 * sin(el));   // screen y (negated: up = negative y)

  return { x: x2 * sphereRadius, y: sy * sphereRadius };
}

// ─────────────────────────────────────────────
function drawSphereOutline() {
  noFill();
  stroke(150);
  strokeWeight(1.5);
  ellipse(centerX, centerY, sphereRadius * 2, sphereRadius * 2);
}

function drawGreatCircles() {
  noFill();
  strokeWeight(1);

  // Equatorial circle (z=0 plane) — dashed blue-gray
  stroke(130, 130, 200);
  drawingContext.setLineDash([4, 4]);
  beginShape();
  for (let t = 0; t <= TWO_PI + 0.05; t += 0.07) {
    let p = project3D(cos(t), sin(t), 0);
    vertex(centerX + p.x, centerY + p.y);
  }
  endShape(CLOSE);

  // Prime meridian (y=0 plane) — dashed green-gray
  stroke(130, 190, 130);
  beginShape();
  for (let t = 0; t <= TWO_PI + 0.05; t += 0.07) {
    let p = project3D(cos(t), 0, sin(t));
    vertex(centerX + p.x, centerY + p.y);
  }
  endShape(CLOSE);

  drawingContext.setLineDash([]);
}

function drawAxes() {
  drawOneAxis(1, 0, 0, 'X', color(200, 50,  50));   // X — red
  drawOneAxis(0, 1, 0, 'Y', color( 30, 160,  30));   // Y — green
  drawOneAxis(0, 0, 1, 'Z', color( 50,  50, 210));   // Z — blue
}

function drawOneAxis(dx, dy, dz, label, col) {
  let tip  = project3D( dx * 1.28,  dy * 1.28,  dz * 1.28);
  let base = project3D(-dx * 0.45, -dy * 0.45, -dz * 0.45);

  stroke(col);
  strokeWeight(2);
  line(centerX + base.x, centerY + base.y,
       centerX + tip.x,  centerY + tip.y);

  // Arrowhead
  let ang = atan2(tip.y - base.y, tip.x - base.x);
  fill(col);
  noStroke();
  push();
    translate(centerX + tip.x, centerY + tip.y);
    rotate(ang);
    triangle(0, 0, -12, -5, -12, 5);
  pop();

  // Axis label
  noStroke();
  fill(col);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label,
    centerX + tip.x + 15 * cos(ang + 0.35),
    centerY + tip.y + 15 * sin(ang + 0.35));
}

function drawProjectionLines() {
  let bx = sin(theta) * cos(phi);
  let by = sin(theta) * sin(phi);

  let tip   = project3D(bx, by, cos(theta));
  let eqPt  = project3D(bx, by, 0);           // foot on equatorial plane

  stroke(190, 140, 70, 160);
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(centerX + tip.x,  centerY + tip.y,  centerX + eqPt.x, centerY + eqPt.y);
  line(centerX,          centerY,           centerX + eqPt.x, centerY + eqPt.y);
  drawingContext.setLineDash([]);
}

function drawStateVector() {
  let bx = sin(theta) * cos(phi);
  let by = sin(theta) * sin(phi);
  let bz = cos(theta);
  let tip = project3D(bx, by, bz);

  // Line from origin to tip
  stroke(240, 90, 10);
  strokeWeight(3);
  line(centerX, centerY, centerX + tip.x, centerY + tip.y);

  // Arrowhead
  let ang = atan2(tip.y, tip.x);
  fill(240, 90, 10);
  noStroke();
  push();
    translate(centerX + tip.x, centerY + tip.y);
    rotate(ang);
    triangle(0, 0, -15, -6, -15, 6);
  pop();

  // Dot at tip
  fill(180, 50, 0);
  noStroke();
  ellipse(centerX + tip.x, centerY + tip.y, 11, 11);
}

function drawPoleLabels() {
  let top = project3D(0, 0,  1.0);
  let bot = project3D(0, 0, -1.0);

  noStroke();
  fill(50, 50, 200);
  textSize(18);

  textAlign(CENTER, BOTTOM);
  text('|0⟩', centerX + top.x, centerY + top.y - 10);

  textAlign(CENTER, TOP);
  text('|1⟩', centerX + bot.x, centerY + bot.y + 10);
}

function drawInfoPanel() {
  let bx = sin(theta) * cos(phi);
  let by = sin(theta) * sin(phi);
  let bz = cos(theta);

  let pw = 182, ph = 138;
  let px = canvasWidth - pw - 8;
  let py = 38;

  fill(255, 255, 255, 215);
  stroke(190);
  strokeWeight(1);
  rect(px, py, pw, ph, 8);

  noStroke();
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text('θ = ' + nf(theta, 1, 3) + ' rad', px + 8, py + 6);
  text('φ = ' + nf(phi,   1, 3) + ' rad', px + 8, py + 28);

  fill(90);
  textSize(14);
  text('Bloch vector:', px + 8, py + 56);

  fill(0);
  textSize(16);
  text('x = ' + nf(bx, 1, 3), px + 8, py + 76);
  text('y = ' + nf(by, 1, 3), px + 8, py + 98);
  text('z = ' + nf(bz, 1, 3), px + 8, py + 118);
}

function drawStateStrip() {
  // State vector in Dirac notation at bottom of drawing area
  let sy = drawHeight - 46;

  fill(235, 240, 255, 220);
  stroke(160, 170, 220);
  strokeWeight(1);
  rect(8, sy, canvasWidth - 16, 38, 6);

  noStroke();
  fill(20, 20, 120);
  textSize(15);
  textAlign(CENTER, CENTER);

  let c0     = nf(cos(theta / 2), 1, 3);
  let c1     = nf(sin(theta / 2), 1, 3);
  let phiDeg = nf(degrees(phi), 1, 1);
  text(
    '|ψ⟩ = ' + c0 + ' |0⟩  +  e^(i·' + phiDeg + '°) · ' + c1 + ' |1⟩',
    canvasWidth / 2, sy + 19
  );
}

function drawControlLabels() {
  noStroke();
  fill(0);
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('θ: ' + nf(theta, 1, 2), 10, drawHeight + 18);
  text('φ: ' + nf(phi,   1, 2), 10, drawHeight + 53);
  text('Gates:', 10, drawHeight + 92);
}

// ─────────────────────────────────────────────
// Quantum gate applications via Bloch vector rotation
function applyGate(gate) {
  let bx = sin(theta) * cos(phi);
  let by = sin(theta) * sin(phi);
  let bz = cos(theta);
  let nx, ny, nz;

  switch (gate) {
    case 'X':  // π rotation around X axis
      nx = bx;  ny = -by; nz = -bz; break;
    case 'Y':  // π rotation around Y axis
      nx = -bx; ny =  by; nz = -bz; break;
    case 'Z':  // π rotation around Z axis
      nx = -bx; ny = -by; nz =  bz; break;
    case 'H':  // Hadamard: swap X↔Z, flip Y
      nx = bz;  ny = -by; nz =  bx; break;
    case 'S':  // π/2 rotation around Z axis
      nx = bx * cos(HALF_PI) - by * sin(HALF_PI);
      ny = bx * sin(HALF_PI) + by * cos(HALF_PI);
      nz = bz; break;
    case 'T':  // π/4 rotation around Z axis
      nx = bx * cos(PI / 4) - by * sin(PI / 4);
      ny = bx * sin(PI / 4) + by * cos(PI / 4);
      nz = bz; break;
    default: return;
  }

  // Convert new Bloch vector back to spherical angles
  let newTheta = acos(constrain(nz, -1, 1));
  let newPhi   = atan2(ny, nx);
  if (newPhi < 0) newPhi += TWO_PI;

  theta = newTheta;
  phi   = newPhi;
  thetaSlider.value(theta);
  phiSlider.value(phi);
}

// ─────────────────────────────────────────────
// Mouse drag to rotate sphere view
function mousePressed() {
  if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY < drawHeight) {
    isDragging = true;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}

function mouseReleased() {
  isDragging = false;
}

function mouseDragged() {
  if (isDragging && mouseY < drawHeight) {
    rotAz += (mouseX - lastMouseX) * 0.012;
    rotEl -= (mouseY - lastMouseY) * 0.012;
    rotEl  = constrain(rotEl, -HALF_PI + 0.05, HALF_PI - 0.05);
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}

// ─────────────────────────────────────────────
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  thetaSlider.size(canvasWidth - sliderLeftMargin - margin);
  phiSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    if (typeof thetaSlider !== 'undefined') {
      thetaSlider.size(canvasWidth - sliderLeftMargin - margin);
      phiSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
