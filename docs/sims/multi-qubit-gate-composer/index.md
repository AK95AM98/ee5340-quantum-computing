---
title: Multi-Qubit Gate Composer
description: Interactive truth-table explorer for CNOT, CZ, SWAP, and Toffoli gates. Click any input row to see how each gate transforms the qubit state, with a live circuit diagram and key properties.
image: /sims/multi-qubit-gate-composer/multi-qubit-gate-composer.png
og:image: /sims/multi-qubit-gate-composer/multi-qubit-gate-composer.png
twitter:image: /sims/multi-qubit-gate-composer/multi-qubit-gate-composer.png
quality_score: 87
social:
   cards: false
---

# Multi-Qubit Gate Composer

<iframe src="main.html" height="492px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This simulator lets you explore the four most important multi-qubit quantum gates by examining their complete truth tables:

| Gate | Qubits | Key Action |
|------|--------|-----------|
| **CNOT** | 2 | Flips target (q₁) when control (q₀) = \|1⟩ |
| **CZ** | 2 | Phase-flips (×−1) the \|11⟩ component |
| **SWAP** | 2 | Exchanges the values of q₀ and q₁ |
| **Toffoli** | 3 | Flips target (q₂) when both controls (q₀, q₁) = \|1⟩ |

**How to use:**

1. Click a gate button (CNOT, CZ, SWAP, Toffoli)
2. Click any row in the truth table to highlight it
3. The right panel shows the circuit diagram for that gate and the selected state's transformation

Note that for **CZ**, the output bit values look identical to the input — only the *phase* changes (shown as a − sign). This phase difference is invisible in classical measurements but crucial for quantum interference.

## Embed This MicroSim

```html
<iframe src="https://AK95AM98.github.io/ee5340-quantum-computing/sims/multi-qubit-gate-composer/main.html" height="492px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Subject:** Multi-Qubit Quantum Gates
**Level:** Graduate (EE 5340)
**Duration:** 15–20 minutes
**Prerequisites:** Single-qubit gates, Dirac notation, computational basis states

**Learning Objectives:**

1. **Explain** how CNOT, CZ, SWAP, and Toffoli gates transform two- and three-qubit basis states
2. **Distinguish** between a bit flip (CNOT, SWAP, Toffoli) and a phase flip (CZ)
3. **Identify** which multi-qubit gate can create entanglement
4. **Predict** the output of a gate given a specific computational basis input

**Guided Activities:**

1. **CNOT truth table:** Select CNOT. Click each row. Which rows change? Only those where q₀ = |1⟩. Why?
2. **CZ comparison:** Switch to CZ. Compare to CNOT — bits unchanged, only phase (− sign) on |11⟩. Why is this difference invisible to classical measurement?
3. **SWAP verification:** Select SWAP. Verify: |01⟩ → |10⟩ and |10⟩ → |01⟩. What happens to |00⟩ and |11⟩?
4. **Toffoli and classical computing:** Select Toffoli. When does the target qubit flip? This is equivalent to a classical AND gate — what does that imply for classical universality?
5. **Bell state construction:** CNOT applied after H to |0⟩|0⟩ creates a Bell state. The CNOT maps |+⟩|0⟩ → (|00⟩+|11⟩)/√2. Which CNOT row corresponds to the |10⟩ input?

**Assessment Questions:**

- For CNOT with control q₀ and target q₁, what is the output for input |10⟩?
- Why is CZ symmetric (control and target are interchangeable) while CNOT is not?
- How many CNOT gates does it take to implement a SWAP gate?
- The Toffoli gate is classically universal. What does this mean for reversible computing?

## References

- Nielsen, M. & Chuang, I. (2010). *Quantum Computation and Quantum Information*, Ch. 4. Cambridge.
- [CNOT gate — Wikipedia](https://en.wikipedia.org/wiki/Controlled_NOT_gate)
- [Toffoli gate — Wikipedia](https://en.wikipedia.org/wiki/Toffoli_gate)
- [Quantum logic gate — Wikipedia](https://en.wikipedia.org/wiki/Quantum_logic_gate)
