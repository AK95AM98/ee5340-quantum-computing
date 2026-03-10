---
title: Grover's Algorithm — Amplitude Evolution
description: Step-through visualization of Grover's quantum search algorithm showing how probability amplitudes are amplified for the marked state over successive oracle and diffusion iterations.
image: /sims/grover-amplitude-evolution/grover-amplitude-evolution.png
og:image: /sims/grover-amplitude-evolution/grover-amplitude-evolution.png
twitter:image: /sims/grover-amplitude-evolution/grover-amplitude-evolution.png
quality_score: 90
social:
   cards: false
---

# Grover's Algorithm — Amplitude Evolution

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

Grover's algorithm provides a quadratic speedup for unstructured search: finding a marked item among N = 2ⁿ items in O(√N) steps rather than O(N) classically.

**State representation:**
Each iteration works on an equal superposition of all N = 2ⁿ basis states. The probability amplitude of each state |i⟩ is shown as a bar — positive amplitudes extend upward, negative downward.

**Each Grover iteration has two steps:**

1. **Oracle** — flips the sign of the marked (target) state amplitude:
$$\alpha_{\text{target}} \rightarrow -\alpha_{\text{target}}$$

2. **Grover Diffusion** — reflects all amplitudes about their mean ⟨α⟩:
$$\alpha_i \rightarrow 2\langle\alpha\rangle - \alpha_i$$

This combination constructively amplifies the target and destructively interferes with all other states.

**Optimal iterations:**
$$k_\text{opt} = \left\lfloor \frac{\pi}{4}\sqrt{N} \right\rfloor$$

After $k_\text{opt}$ steps, the probability of measuring the target state is near 1. Stepping **beyond** $k_\text{opt}$ causes *over-rotation* — the probability decreases again.

**Controls:**

| Control | Action |
|---------|--------|
| ▶ Step | Apply one Grover iteration (oracle + diffusion) |
| ↺ Reset | Return to uniform superposition |
| Qubits n | Set number of qubits (2→4 states, 3→8 states, 4→16 states) |
| Target state | Choose which state |i⟩ to search for |

The **orange bar** is the marked target state. The **dashed orange line** shows the mean amplitude ⟨α⟩. The info box shows current iteration, optimal iteration count, and success probability.

## Embed This MicroSim

```html
<iframe src="https://AK95AM98.github.io/ee5340-quantum-computing/sims/grover-amplitude-evolution/main.html" height="542px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Subject:** Quantum Algorithms — Grover's Search
**Level:** Graduate (EE 5340)
**Duration:** 15–20 minutes
**Prerequisites:** Superposition, quantum measurement, amplitude basics

**Learning Objective:**
Students will be able to **analyze** how Grover's algorithm amplifies a target state's amplitude through repeated oracle and diffusion operations, and explain why exactly $k_\text{opt}$ iterations maximizes success probability.

**Guided Activities:**

1. **Start with n=3 (N=8), target=3.** Press Step once. Which bar flipped sign? (Answer: |3⟩) Why does the mean line shift?
2. **Press Step until the green "✓ max!" appears.** Count how many steps it took. Compare to $\lfloor\pi\sqrt{8}/4\rfloor = 2$.
3. **Keep stepping past optimal.** Observe over-rotation — P(target) decreases. What does this imply for a real quantum circuit?
4. **Change to n=4 (N=16).** How many optimal iterations now? Verify with the formula.
5. **Change target state mid-experiment.** Reset and compare different targets — does the choice of target affect convergence speed?

**Assessment Questions:**

- For N=8, what is the probability of success after exactly 2 iterations?
- Classically, how many queries does a search of N=8 items require on average?
- Why does the diffusion operator (reflection about mean) amplify the target state?
- What happens to the non-target states' amplitudes after each Grover step?

## References

- Grover, L. K. (1996). A fast quantum mechanical algorithm for database search. *STOC '96*, 212–219.
- Nielsen, M. & Chuang, I. (2010). *Quantum Computation and Quantum Information*, Ch. 6. Cambridge University Press.
- [Grover's algorithm — Wikipedia](https://en.wikipedia.org/wiki/Grover%27s_algorithm)
- [Quantum Algorithm Zoo](https://quantumalgorithmzoo.org/)
