---
title: Quantum Algorithm Speedup Landscape
description: Interactive bar chart comparing classical and quantum algorithm complexity for 8 key problems. Hover any bar group to see the algorithm name, complexity classes, speedup type, and a plain-language description.
image: /sims/algorithm-speedup-landscape/algorithm-speedup-landscape.png
quality_score: 86
social:
   cards: false
---

# Quantum Algorithm Speedup Landscape

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

Not all problems benefit equally from quantum computing. This chart shows the classical and quantum complexity (on a relative log scale) for eight landmark problems:

| Problem | Classical | Quantum | Speedup |
|---------|-----------|---------|---------|
| Unstructured Search | O(N) | O(√N) | Quadratic |
| Integer Factoring | Sub-exp | Poly(log N) | Exponential |
| Discrete Logarithm | Sub-exp | Poly(log N) | Exponential |
| Quantum Simulation | exp(N) | Poly(N) | Exponential |
| Linear Systems | O(N·κ) | O(log N) | Exponential* |
| Quantum Walk | O(N) | O(√N) | Quadratic |
| Phase Estimation | O(1/ε²) | O(1/ε) | Quadratic |
| Sorting | O(N log N) | Ω(N log N) | **None** |

*HHL algorithm has important caveats around data input/output costs.

**Hover** any bar group to see details and a plain-language description of the algorithm.

## Embed This MicroSim

```html
<iframe src="https://AK95AM98.github.io/ee5340-quantum-computing/sims/algorithm-speedup-landscape/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Subject:** Quantum Algorithm Complexity Landscape
**Level:** Graduate (EE 5340)
**Duration:** 10–15 minutes

**Learning Objectives:**

1. **Identify** which problems have exponential vs quadratic quantum speedups
2. **Explain** why some problems (sorting) have no known quantum speedup
3. **Compare** quadratic speedup (Grover) vs exponential speedup (Shor) in practical terms

**Assessment Questions:**

- What distinguishes problems with exponential quantum speedup from those with only quadratic speedup?
- Why doesn't quantum computing help with sorting?
- The HHL linear systems algorithm claims exponential speedup — what are the important caveats?

## References

- Montanaro, A. (2016). Quantum algorithms: an overview. *npj Quantum Information*, 2, 15023.
- [Quantum algorithm zoo](https://quantumalgorithmzoo.org/) — maintained by Stephen Jordan.
- Nielsen, M. & Chuang, I. (2010). *Quantum Computation and Quantum Information*. Cambridge.
