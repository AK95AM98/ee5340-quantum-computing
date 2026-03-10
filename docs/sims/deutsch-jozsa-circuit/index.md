---
title: Deutsch-Jozsa Circuit
description: Step-through visualization of the 2-qubit Deutsch-Jozsa quantum algorithm. Shows how a single oracle query determines whether a function is constant or balanced, demonstrating exponential quantum speedup.
image: /sims/deutsch-jozsa-circuit/deutsch-jozsa-circuit.png
og:image: /sims/deutsch-jozsa-circuit/deutsch-jozsa-circuit.png
quality_score: 88
social:
   cards: false
---

# Deutsch-Jozsa Circuit

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

The **Deutsch-Jozsa algorithm** solves a simple but revealing problem: given a black-box oracle $f:\{0,1\}^n \to \{0,1\}$, determine in a **single query** whether $f$ is:

- **Constant** — outputs the same value (0 or 1) for all inputs, or
- **Balanced** — outputs 0 for exactly half the inputs and 1 for the other half

Classically, you need up to $2^{n-1}+1$ queries in the worst case. Quantumly, **one query always suffices**.

**Algorithm steps (n=2):**

| Step | Operation | Effect |
|------|-----------|--------|
| 0 | Initialize | Input register in \|00⟩ |
| 1 | H⊗H | Uniform superposition of all 4 basis states |
| 2 | Oracle | Phase kickback — flips sign of marked inputs |
| 3 | H⊗H | Constructive/destructive interference |
| 4 | Measure | P(\|00⟩)=1 → Constant; P(\|00⟩)=0 → Balanced |

**Why it works:** After two Hadamard layers, the interference pattern is determined entirely by whether $f$ is constant or balanced. If constant, all amplitudes add constructively into \|00⟩; if balanced, they cancel to zero for \|00⟩.

## Embed This MicroSim

```html
<iframe src="https://AK95AM98.github.io/ee5340-quantum-computing/sims/deutsch-jozsa-circuit/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Subject:** Deutsch-Jozsa Quantum Algorithm
**Level:** Graduate (EE 5340)
**Duration:** 15–20 minutes

**Learning Objectives:**

1. **Explain** how quantum parallelism allows a single oracle query to determine function type
2. **Trace** amplitude values through each step of the circuit
3. **Distinguish** constructive from destructive interference in the output
4. **Connect** the measurement outcome to the constant vs. balanced determination

**Guided Activities:**

1. **Constant f≡0:** Step through all 5 steps. After step 3, which state has amplitude ≈1?
2. **Constant f≡1:** Compare to f≡0 after step 2 — global phase −1 on all states. Does the measurement outcome differ?
3. **Balanced f=x₀:** After step 2, which states have negative amplitudes? After step 3, what is P(\|00⟩)?
4. **Compare oracles:** Why do both constant oracles give P(\|00⟩)=1, while both balanced oracles give P(\|00⟩)=0?

**Assessment Questions:**

- Classically, how many queries does it take to certify that f is constant for n=3 (8 inputs)?
- What is the role of the second H⊗H layer — why do we need it?
- For "Balanced f=x₁", which basis states have their phase flipped by the oracle?
- How does the phase kickback mechanism transfer oracle information to the input register?

## References

- Deutsch, D. & Jozsa, R. (1992). Rapid solution of problems by quantum computation. *Proc. R. Soc. A*, 439, 553–558.
- Nielsen, M. & Chuang, I. (2010). *Quantum Computation and Quantum Information*, Ch. 1. Cambridge.
- [Deutsch-Jozsa algorithm — Wikipedia](https://en.wikipedia.org/wiki/Deutsch%E2%80%93Jozsa_algorithm)
