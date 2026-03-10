---
title: Classical vs Quantum Walk Comparison
description: Side-by-side comparison of classical random walk (Gaussian spread) and discrete-time quantum walk (Hadamard coin, bimodal spread) on a 1D line. Slider controls the number of steps from 1 to 50.
image: /sims/quantum-walk-comparison/quantum-walk-comparison.png
quality_score: 87
social:
   cards: false
---

# Classical vs Quantum Walk Comparison

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

A **random walk** models a particle taking random left/right steps. After $t$ steps:

- **Classical** (coin flip): position distributes as Binomial($t$, ½) — Gaussian shape, spread $\sigma \approx \sqrt{t}$
- **Quantum** (Hadamard coin): amplitudes interfere constructively at the edges, producing a **bimodal** distribution with spread $\sim 0.7t$

This quadratic difference in spread ($O(\sqrt{t})$ vs $O(t)$) is a key resource exploited by quantum walk-based algorithms.

**Use the steps slider** to see how both distributions evolve. Notice that the quantum walk's two peaks race away from the origin faster than the classical walk's single Gaussian peak.

## Embed This MicroSim

```html
<iframe src="https://AK95AM98.github.io/ee5340-quantum-computing/sims/quantum-walk-comparison/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Subject:** Quantum Walk vs Classical Random Walk
**Level:** Graduate (EE 5340)
**Duration:** 10–15 minutes

**Learning Objectives:**

1. **Compare** the spreading rates of classical and quantum walks
2. **Explain** why quantum interference produces a bimodal distribution
3. **Identify** how the quadratic speedup in spreading relates to Grover speedup

**Guided Activities:**

1. Set steps = 5. Where is the classical peak? Where are the quantum peaks?
2. Increase to steps = 20. Compare the classical σ ≈ √20 ≈ 4.5 to quantum spread ≈ 0.7×20 = 14.
3. At steps = 50, the quantum walk reaches ±35, while classical σ ≈ 7. What is the ratio?
4. Why does the quantum walk have two peaks, not one? (Hint: the Hadamard coin creates superposition.)

## References

- Aharonov, Y., Davidovich, L., & Zagury, N. (1993). Quantum random walks. *Phys. Rev. A*, 48, 1687.
- Childs, A. (2010). On the relationship between continuous-time and discrete-time quantum walks. *Commun. Math. Phys.*, 294, 581–603.
- [Quantum walk — Wikipedia](https://en.wikipedia.org/wiki/Quantum_walk)
