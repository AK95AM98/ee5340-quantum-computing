---
title: Quantum Phase Estimation Circuit
description: Step-through visualization of Quantum Phase Estimation (QPE) with n=3 counting qubits. Shows how the H, controlled-U^k, and QFT† layers transform the counting register to reveal the phase φ of a unitary U.
image: /sims/phase-estimation-circuit/phase-estimation-circuit.png
quality_score: 87
social:
   cards: false
---

# Quantum Phase Estimation Circuit

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

**Quantum Phase Estimation (QPE)** is a fundamental subroutine used in Shor's algorithm, quantum simulation, and many other quantum algorithms.

**Problem:** Given a unitary $U$ with eigenvector $|\psi\rangle$, find the phase $\varphi$ such that:
$$U|\psi\rangle = e^{2\pi i\varphi}|\psi\rangle$$

**QPE circuit (n=3 counting qubits):**

| Step | Operation | Effect |
|------|-----------|--------|
| 0 | Initialize | Counting register \|000⟩, eigenstate \|ψ⟩ |
| 1 | H⊗H⊗H | Uniform superposition of counting qubits |
| 2 | Controlled-U^k | Phase kickback: \|j⟩ → e^{2πijφ}\|j⟩ |
| 3 | QFT† | Maps phase to computational basis |
| 4 | Measure | Peak at j = round(φ·8) reveals φ |

With n=3 bits, QPE can estimate phases as multiples of $\frac{1}{8}$. For a phase that is **not** an exact multiple (e.g., φ=1/3), the probability spreads across neighboring bins.

## Embed This MicroSim

```html
<iframe src="https://AK95AM98.github.io/ee5340-quantum-computing/sims/phase-estimation-circuit/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Subject:** Quantum Phase Estimation
**Level:** Graduate (EE 5340)
**Duration:** 15–20 minutes

**Learning Objectives:**

1. **Trace** how phase information moves from the eigenstate to the counting register
2. **Explain** the role of QFT† in converting phase to a measurable bit string
3. **Predict** which bin the measurement peaks at for a given φ
4. **Identify** why non-representable phases spread probability across multiple bins

**Guided Activities:**

1. Select **φ = 1/4**. Step through to measure. Which bin has highest probability? (Answer: 2 = 2/8)
2. Select **φ = 1/3**. After measurement, where does probability concentrate? Why isn't it a single peak?
3. Compare **φ = 1/8** and **φ = 3/8**. How does bin index relate to the numerator?
4. Step back to Step 2 — what do the bar chart amplitudes represent physically?

## References

- Kitaev, A. (1995). Quantum measurements and the Abelian stabilizer problem. *arXiv:quant-ph/9511026*.
- Nielsen, M. & Chuang, I. (2010). *Quantum Computation and Quantum Information*, Ch. 5. Cambridge.
- [Quantum phase estimation — Wikipedia](https://en.wikipedia.org/wiki/Quantum_phase_estimation_algorithm)
