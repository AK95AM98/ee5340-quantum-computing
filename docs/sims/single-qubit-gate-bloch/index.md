---
title: Bloch Sphere Visualizer
description: Interactive 3D Bloch sphere showing single-qubit quantum states and the effect of X, Y, Z, H, S, and T quantum gates on the state vector.
image: /sims/single-qubit-gate-bloch/bloch-sphere.png
og:image: /sims/single-qubit-gate-bloch/bloch-sphere.png
twitter:image: /sims/single-qubit-gate-bloch/bloch-sphere.png
quality_score: 88
social:
   cards: false
---

# Bloch Sphere Visualizer

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

The Bloch sphere is the standard geometric representation of a single-qubit quantum state. Every pure qubit state

$$|\psi\rangle = \cos\!\left(\tfrac{\theta}{2}\right)|0\rangle + e^{i\varphi}\sin\!\left(\tfrac{\theta}{2}\right)|1\rangle$$

maps to a unique point on the unit sphere with Bloch vector coordinates:

$$x = \sin\theta\cos\varphi, \quad y = \sin\theta\sin\varphi, \quad z = \cos\theta$$

The **orange arrow** shows the current state vector. The **Z axis** (blue) points from |1⟩ (south pole) to |0⟩ (north pole). Dashed circles show the equatorial plane and the prime meridian.

**Interactions:**

- **θ slider** — sets the polar angle (0 = |0⟩, π = |1⟩)
- **φ slider** — sets the azimuthal angle (0 to 2π)
- **Gate buttons** — apply X, Y, Z, H, S, or T gate to the current state
- **Drag** inside the sphere to rotate the view

**Gate effects on Bloch vector:**

| Gate | Rotation | Bloch vector (x, y, z) → |
|------|----------|--------------------------|
| X (Pauli-X) | π around X axis | (x, −y, −z) |
| Y (Pauli-Y) | π around Y axis | (−x, y, −z) |
| Z (Pauli-Z) | π around Z axis | (−x, −y, z) |
| H (Hadamard) | π around (X+Z)/√2 | (z, −y, x) |
| S (Phase) | π/2 around Z axis | rotated 90° in XY |
| T (T gate) | π/4 around Z axis | rotated 45° in XY |

## Embed This MicroSim

```html
<iframe src="https://AK95AM98.github.io/ee5340-quantum-computing/sims/single-qubit-gate-bloch/main.html" height="622px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Subject:** Quantum Computing — Single-Qubit Gates
**Level:** Graduate (EE 5340)
**Duration:** 10–15 minutes
**Prerequisites:** Complex numbers, linear algebra basics, Dirac notation

**Learning Objective:**
Students will be able to **apply** single-qubit quantum gates (X, Y, Z, H, S, T) and **observe** their geometric effect as rotations of the Bloch sphere state vector.

**Guided Activities:**

1. **Start at |0⟩** — θ = 0, state vector points to north pole. Apply H gate. Where does the vector go? (Answer: equator, |+⟩ state)
2. **Apply H twice** — verify H² = I (vector returns to |0⟩)
3. **Apply X gate** to |0⟩ — vector flips to south pole (|1⟩)
4. **Explore the equator** — set θ = π/2, vary φ with slider. Observe how Z gate flips φ by π
5. **Build S and T intuition** — from |+⟩ state, apply S repeatedly. Count how many S gates return to start (4 applications = full rotation)

**Assessment Questions:**

- What is the Bloch sphere representation of the |+⟩ state?
- If a state is on the equator, what does applying Z gate do geometrically?
- Why does H swap the X and Z poles of the Bloch sphere?

## References

- Nielsen & Chuang, *Quantum Computation and Quantum Information*, Cambridge University Press, Ch. 1
- Bloch, F. (1946). Nuclear Induction. *Physical Review*, 70(7-8), 460.
- [Bloch sphere — Wikipedia](https://en.wikipedia.org/wiki/Bloch_sphere)
- [p5.js Reference](https://p5js.org/reference/)
