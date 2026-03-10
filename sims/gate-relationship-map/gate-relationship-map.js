// gate-relationship-map.js
// Quantum Gate Relationship Concept Map
// Chapter 9: Quantum Gates and Circuits — EE 5340, UMN
//
// Interactive vis-network graph showing relationships between quantum gates.
// Click any node to see the gate's matrix, properties, and description.

// ─────────────────────────────────────────────
// Gate information database (shown in right panel on click)
// ─────────────────────────────────────────────
const gateInfo = {
  root:      { title: 'Quantum Gates',
               matrix: 'U : unitary (U†U = I)',
               desc: 'Quantum gates are reversible unitary operations that transform qubit states. Unlike classical logic gates, all quantum gates are reversible and preserve total probability.',
               props: ['All gates are unitary: U†U = I', 'Reversible — no information loss', 'Act on superpositions of basis states', 'Represented by unitary matrices'] },

  single:    { title: 'Single-Qubit Gates',
               matrix: '2×2 unitary matrix',
               desc: 'Operations on one qubit. Geometrically, they correspond to rotations of the Bloch sphere.',
               props: ['2×2 unitary matrix', 'Rotations of the Bloch sphere', 'No entanglement possible alone'] },

  multi:     { title: 'Multi-Qubit Gates',
               matrix: '4×4 or larger unitary',
               desc: 'Gates acting on two or more qubits. They can create entanglement between qubits and are essential for quantum computation.',
               props: ['2+ qubits', '4×4 or larger unitary matrix', 'Can create entanglement', 'Require controlled operations'] },

  pauli:     { title: 'Pauli Gates  (X, Y, Z)',
               matrix: 'σ_x, σ_y, σ_z',
               desc: 'The three fundamental Pauli operators. They are both Hermitian and unitary — their own inverses — and generate π rotations on the Bloch sphere.',
               props: ['Self-inverse: X²=Y²=Z²=I', 'Hermitian: G† = G', 'π rotations on Bloch sphere', 'Form the Pauli group'] },

  phase:     { title: 'Phase Gates  (Z, S, T)',
               matrix: '[[1, 0], [0, e^(iθ)]]',
               desc: 'Gates that apply a phase shift to the |1⟩ component. They leave |0⟩ unchanged and rotate the phase of |1⟩ by angle θ.',
               props: ['Keep |0⟩ unchanged', 'Shift phase of |1⟩', 'Z: θ=π,  S: θ=π/2,  T: θ=π/4', 'Important for fault-tolerance'] },

  X:         { title: 'X Gate  (Pauli-X / NOT)',
               matrix: '[[0, 1],\n [1, 0]]',
               desc: 'The quantum NOT gate. Flips |0⟩ to |1⟩ and |1⟩ to |0⟩. Equivalent to a π rotation around the X axis of the Bloch sphere.',
               props: ['X|0⟩ = |1⟩,  X|1⟩ = |0⟩', 'X² = I  (self-inverse)', 'Circuit symbol: ⊕'] },

  Y:         { title: 'Y Gate  (Pauli-Y)',
               matrix: '[[0, −i],\n [i,  0]]',
               desc: 'π rotation around the Y axis. Combines a bit flip and a phase flip. Maps |0⟩ to i|1⟩ and |1⟩ to −i|0⟩.',
               props: ['Y|0⟩ = i|1⟩,  Y|1⟩ = −i|0⟩', 'Y² = I  (self-inverse)', 'Y = iXZ'] },

  Z:         { title: 'Z Gate  (Pauli-Z)',
               matrix: '[[1,  0],\n [0, −1]]',
               desc: 'Phase-flip gate. Leaves |0⟩ unchanged and flips the phase of |1⟩ to −|1⟩. Also equal to S² and T⁴.',
               props: ['Z|0⟩ = |0⟩,  Z|1⟩ = −|1⟩', 'Z = S² = T⁴', 'π rotation around Z axis'] },

  H:         { title: 'H Gate  (Hadamard)',
               matrix: '1/√2 [[1,  1],\n      [1, −1]]',
               desc: 'Creates an equal superposition from a basis state. Maps |0⟩ to |+⟩ and |1⟩ to |−⟩. Essential for quantum algorithms and the key to quantum parallelism.',
               props: ['H|0⟩ = |+⟩ = (|0⟩+|1⟩)/√2', 'H|1⟩ = |−⟩ = (|0⟩−|1⟩)/√2', 'H² = I  (self-inverse)', 'Not Pauli, not pure phase'] },

  S:         { title: 'S Gate  (Phase / √Z)',
               matrix: '[[1, 0],\n [0, i]]',
               desc: 'π/2 rotation around the Z axis. The square root of the Z gate. Four S gates equal the identity.',
               props: ['S|0⟩ = |0⟩,  S|1⟩ = i|1⟩', 'S² = Z,  S⁴ = I', 'Clifford gate'] },

  T:         { title: 'T Gate  (π/8 gate)',
               matrix: '[[1, 0],\n [0, e^(iπ/4)]]',
               desc: 'π/4 rotation around the Z axis. T² = S, T⁴ = Z. Non-Clifford gate that is essential for universal quantum computation (Solovay-Kitaev).',
               props: ['T|0⟩ = |0⟩,  T|1⟩ = e^(iπ/4)|1⟩', 'T² = S,  T⁴ = Z,  T⁸ = I', 'Non-Clifford — enables universality'] },

  CNOT:      { title: 'CNOT Gate  (Controlled-NOT)',
               matrix: '[[1,0,0,0],[0,1,0,0],\n [0,0,0,1],[0,0,1,0]]',
               desc: 'Flips the target qubit if and only if the control qubit is |1⟩. Creates entanglement from product states. Forms a universal gate set with {H, T}.',
               props: ['CNOT|00⟩=|00⟩, |01⟩=|01⟩', 'CNOT|10⟩=|11⟩, |11⟩=|10⟩', 'H·CNOT·(|0⟩|0⟩) → Bell state', 'Universal with {H, T}'] },

  CZ:        { title: 'CZ Gate  (Controlled-Z)',
               matrix: '[[1,0,0,0],[0,1,0,0],\n [0,0,1,0],[0,0,0,−1]]',
               desc: 'Applies a Z (phase flip) to the target if the control is |1⟩. Equivalent to CNOT with Hadamard gates on the target. Symmetric — control and target are interchangeable.',
               props: ['Phases |11⟩ → −|11⟩ only', 'CZ = (I⊗H)·CNOT·(I⊗H)', 'Symmetric: control and target swap freely', 'Common in superconducting qubit hardware'] },

  Toffoli:   { title: 'Toffoli Gate  (CCNOT)',
               matrix: '8×8 unitary (3-qubit gate)',
               desc: 'Flips the target qubit if BOTH control qubits are |1⟩. Classically universal — can implement any reversible classical Boolean function. Used in quantum arithmetic circuits.',
               props: ['Flips target iff |c₁c₂⟩ = |11⟩', 'Classically universal', 'Used in quantum addition/subtraction', 'Toffoli = CCNOT'] },

  universal: { title: 'Universal Gate Set  {H, T, CNOT}',
               matrix: 'Generates all n-qubit unitaries',
               desc: 'Any unitary operation on n qubits can be approximated to arbitrary precision using only H, T, and CNOT gates (Solovay-Kitaev theorem). T is the only non-Clifford gate in the set.',
               props: ['Solovay-Kitaev theorem guarantees this', 'T provides non-Clifford resource', 'H + CNOT = full Clifford group', 'Fault-tolerant implementations exist'] }
};

// ─────────────────────────────────────────────
// Node color palette by group
// ─────────────────────────────────────────────
const palette = {
  root:      { bg: '#4a148c', border: '#12005e', font: '#ffffff' },
  category:  { bg: '#1565c0', border: '#003c8f', font: '#ffffff' },
  pauli:     { bg: '#b71c1c', border: '#7f0000', font: '#ffffff' },
  phase:     { bg: '#004d40', border: '#00251a', font: '#ffffff' },
  hadamard:  { bg: '#7b1fa2', border: '#4a0072', font: '#ffffff' },
  multi:     { bg: '#1b5e20', border: '#003300', font: '#ffffff' },
  universal: { bg: '#e65100', border: '#ac1900', font: '#ffffff' },
  selected:  { bg: '#ffd600', border: '#c7a500', font: '#000000' }
};

// ─────────────────────────────────────────────
// Node definitions (fixed positions, left-side layout)
// ─────────────────────────────────────────────
const nodeData = [
  // Root
  { id: 'root',     label: 'Quantum\nGates',       group: 'root',     x:    0, y:    0 },
  // Major categories
  { id: 'single',   label: 'Single-Qubit\nGates',  group: 'category', x: -200, y:    0 },
  { id: 'multi',    label: 'Multi-Qubit\nGates',   group: 'multi',    x:  200, y:    0 },
  // Sub-categories
  { id: 'pauli',    label: 'Pauli\nGates',         group: 'pauli',    x: -370, y: -160 },
  { id: 'phase',    label: 'Phase\nGates',         group: 'phase',    x: -370, y:  160 },
  // Individual single-qubit gates
  { id: 'X',        label: 'X\n(NOT)',             group: 'pauli',    x: -530, y: -280 },
  { id: 'Y',        label: 'Y',                   group: 'pauli',    x: -530, y: -160 },
  { id: 'Z',        label: 'Z',                   group: 'phase',    x: -530, y:  -40 },
  { id: 'H',        label: 'H\n(Hadamard)',        group: 'hadamard', x: -240, y: -300 },
  { id: 'S',        label: 'S\n(√Z)',             group: 'phase',    x: -530, y:   80 },
  { id: 'T',        label: 'T\n(π/8)',            group: 'phase',    x: -530, y:  210 },
  // Multi-qubit gates
  { id: 'CNOT',     label: 'CNOT',                group: 'multi',    x:  180, y: -170 },
  { id: 'CZ',       label: 'CZ',                  group: 'multi',    x:  180, y:  170 },
  { id: 'Toffoli',  label: 'Toffoli\n(CCNOT)',    group: 'multi',    x:  380, y:  100 },
  // Universal gate set
  { id: 'universal',label: 'Universal\nGate Set\n{H, T, CNOT}', group: 'universal', x: 380, y: -200 }
];

// ─────────────────────────────────────────────
// Edge definitions
// ─────────────────────────────────────────────
const edgeData = [
  // Root → categories
  { from: 'root',    to: 'single',   label: 'type of',    dashes: false },
  { from: 'root',    to: 'multi',    label: 'type of',    dashes: false },
  // Single-qubit sub-categories
  { from: 'single',  to: 'pauli',   label: 'includes',   dashes: false },
  { from: 'single',  to: 'phase',   label: 'includes',   dashes: false },
  { from: 'single',  to: 'H',       label: 'includes',   dashes: false },
  // Pauli gates
  { from: 'pauli',   to: 'X',       label: '',           dashes: false },
  { from: 'pauli',   to: 'Y',       label: '',           dashes: false },
  { from: 'pauli',   to: 'Z',       label: '',           dashes: false },
  // Phase gates (Z is also a phase gate)
  { from: 'phase',   to: 'Z',       label: 'Z=S²=T⁴',   dashes: true  },
  { from: 'phase',   to: 'S',       label: '',           dashes: false },
  { from: 'phase',   to: 'T',       label: '',           dashes: false },
  // Phase relationships
  { from: 'T',       to: 'S',       label: 'T²=S',       dashes: true  },
  { from: 'S',       to: 'Z',       label: 'S²=Z',       dashes: true  },
  // Multi-qubit gates
  { from: 'multi',   to: 'CNOT',    label: '',           dashes: false },
  { from: 'multi',   to: 'CZ',      label: '',           dashes: false },
  { from: 'multi',   to: 'Toffoli', label: '',           dashes: false },
  // CNOT ↔ CZ equivalence
  { from: 'CNOT',    to: 'CZ',      label: 'equiv\n(±H)', dashes: true },
  // Universal gate set
  { from: 'H',       to: 'universal', label: 'forms',    dashes: false },
  { from: 'T',       to: 'universal', label: 'forms',    dashes: false },
  { from: 'CNOT',    to: 'universal', label: 'forms',    dashes: false }
];

// ─────────────────────────────────────────────
let network;
let nodesDS, edgesDS;
let selectedId = null;

function nodeStyle(nodeId, group, selected) {
  const c = selected ? palette.selected : (palette[group] || palette.category);
  return {
    color: { background: c.bg, border: c.border },
    font:  { color: c.font, size: 14, face: 'Arial', bold: selected },
    borderWidth: selected ? 4 : 2
  };
}

function isInIframe() {
  try { return window.self !== window.top; } catch (e) { return true; }
}

function initializeNetwork() {
  selectedId = null;

  const nodes = nodeData.map(n => ({
    id: n.id, label: n.label, x: n.x, y: n.y,
    shape: n.group === 'root' ? 'ellipse' : 'box',
    margin: 10,
    shadow: { enabled: true, color: 'rgba(0,0,0,0.25)', size: 5, x: 2, y: 2 },
    ...nodeStyle(n.id, n.group, false)
  }));

  const edges = edgeData.map((e, i) => ({
    id: i, from: e.from, to: e.to,
    label: e.label || '',
    dashes: e.dashes,
    color: { color: e.dashes ? '#888888' : '#444444' },
    font:  { size: 11, color: '#555', align: 'middle', background: 'rgba(255,255,255,0.7)' },
    arrows: { to: { enabled: true, scaleFactor: 0.8 } },
    width: e.dashes ? 1.5 : 2,
    smooth: { type: 'curvedCW', roundness: 0.12 }
  }));

  nodesDS = new vis.DataSet(nodes);
  edgesDS = new vis.DataSet(edges);

  const options = {
    layout:   { improvedLayout: false },
    physics:  { enabled: false },
    interaction: {
      selectConnectedEdges: true,
      dragView:  !isInIframe(),
      zoomView:  !isInIframe(),
      dragNodes: false,
      navigationButtons: true,
      keyboard: { enabled: true, bindToWindow: false }
    },
    nodes: { shape: 'box', margin: 10, font: { size: 14, face: 'Arial', multi: true } },
    edges: { arrows: { to: { enabled: true, scaleFactor: 0.8 } }, width: 2,
             smooth: { type: 'curvedCW', roundness: 0.12 } }
  };

  const container = document.getElementById('network');
  network = new vis.Network(container, { nodes: nodesDS, edges: edgesDS }, options);

  // Pan after auto-centering to account for right panel
  network.once('afterDrawing', function () {
    const pos = network.getViewPosition();
    network.moveTo({ position: { x: pos.x - 50, y: pos.y }, scale: 0.82, animation: false });
  });

  // Node click → show info
  network.on('click', function (params) {
    if (params.nodes.length > 0) {
      const id = params.nodes[0];
      highlightNode(id);
      showInfo(id);
    } else {
      clearHighlight();
      showDefault();
    }
  });

  showDefault();
}

function highlightNode(id) {
  // Restore previous selection
  if (selectedId !== null) {
    const old = nodeData.find(n => n.id === selectedId);
    if (old) nodesDS.update({ id: selectedId, ...nodeStyle(selectedId, old.group, false) });
  }
  // Highlight new
  const nd = nodeData.find(n => n.id === id);
  if (nd) nodesDS.update({ id, ...nodeStyle(id, nd.group, true) });
  selectedId = id;
}

function clearHighlight() {
  if (selectedId !== null) {
    const old = nodeData.find(n => n.id === selectedId);
    if (old) nodesDS.update({ id: selectedId, ...nodeStyle(selectedId, old.group, false) });
    selectedId = null;
  }
}

function showInfo(id) {
  const info = gateInfo[id];
  if (!info) return;
  document.getElementById('info-title').textContent  = info.title;
  document.getElementById('info-matrix').textContent = info.matrix;
  document.getElementById('info-desc').textContent   = info.desc;
  document.getElementById('info-props').innerHTML    =
    info.props.map(p => `<li>${p}</li>`).join('');
}

function showDefault() {
  document.getElementById('info-title').textContent  = 'Click a node';
  document.getElementById('info-matrix').textContent = '—';
  document.getElementById('info-desc').textContent   =
    'Click any gate node in the graph to see its matrix, properties, and role in quantum computing.';
  document.getElementById('info-props').innerHTML    = '';
}

document.addEventListener('DOMContentLoaded', function () {
  initializeNetwork();
});
