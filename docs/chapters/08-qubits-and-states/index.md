---
title: Qubits and Quantum States
description: The qubit as the fundamental unit of quantum information, Bloch sphere representation, entanglement, Bell states, and mathematical tools for composite quantum systems
generated_by: claude skill chapter-content-generator
date: 2026-02-11 22:03:29
version: 0.04
---

# Qubits and Quantum States

## Summary

This chapter introduces the qubit as the fundamental unit of quantum information. We develop the Bloch sphere representation, analyze global and relative phase, construct multi-qubit state spaces via tensor products, introduce quantum entanglement and derive Bell state properties, discuss the EPR paradox and Bell's inequality, and develop the mathematical tools of Schmidt decomposition and partial trace for analyzing composite quantum systems.

## Concepts Covered

This chapter covers the following 14 concepts:

1. Qubit
2. Computational Basis States
3. Bloch Sphere
4. Global Phase
5. Relative Phase
6. Qubit State Tomography
7. Multi-Qubit Systems
8. Quantum Entanglement
9. Bell States
10. EPR Paradox
11. Bell's Inequality
12. Schmidt Decomposition
13. Partial Trace
14. Reduced Density Matrix

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)
- [Chapter 7: Quantum Mechanics Foundations](../07-quantum-mechanics/index.md)

---

## Introduction

In Chapter 7, we established the postulates of quantum mechanics, the Hilbert space formalism, and the measurement theory that governs how physical observables yield outcomes. We now specialize these tools to the smallest nontrivial quantum system: a two-dimensional Hilbert space. This specialization yields the **qubit**, the quantum analogue of the classical bit and the fundamental carrier of quantum information. Everything that makes quantum computing distinctive—superposition, interference, entanglement—manifests already at the level of one or two qubits, making a thorough understanding of this chapter essential before proceeding to quantum gates and algorithms.

We begin with the mathematical definition of a single qubit, develop its geometric representation on the Bloch sphere, and carefully distinguish between global and relative phase. We then extend to multi-qubit systems through the tensor product, introduce entanglement as a genuinely quantum correlation with no classical analogue, and derive the properties of the Bell states. The chapter concludes with the mathematical machinery—Schmidt decomposition, partial trace, and reduced density matrices—required for analyzing subsystems of composite quantum states.

## The Qubit

A **qubit** (quantum bit) is a quantum system whose state space is the two-dimensional complex Hilbert space $\mathcal{H} = \mathbb{C}^2$. The most general pure state of a qubit is a normalized vector

#### Qubit State

$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$

where:

- $\alpha, \beta \in \mathbb{C}$ are complex probability amplitudes
- $|0\rangle$ and $|1\rangle$ form an orthonormal basis for $\mathbb{C}^2$
- The normalization constraint requires $|\alpha|^2 + |\beta|^2 = 1$

Unlike a classical bit, which is deterministically in state 0 or 1, a qubit exists in a coherent superposition of both basis states simultaneously. The information content of a qubit is encoded in the two complex numbers $\alpha$ and $\beta$, subject to one real constraint (normalization) and one physically irrelevant degree of freedom (global phase), leaving two real parameters that specify the state.

| Property | Classical Bit | Qubit |
|----------|--------------|-------|
| State space | $\{0, 1\}$ | $\mathbb{C}^2$ with $\|\psi\| = 1$ |
| Number of states | 2 | Continuum (Bloch sphere) |
| Measurement outcomes | Deterministic | Probabilistic (Born rule) |
| Copying | Freely copyable | No-cloning theorem forbids |
| Information content | 1 bit | 1 bit (Holevo bound) |
| State description | Single bit value | Two complex amplitudes $(\alpha, \beta)$ |

The last row of this table deserves emphasis: despite requiring two complex numbers (four real parameters minus two constraints) to specify a qubit state, the Holevo bound proves that a single qubit can transmit at most one classical bit of information. The richness of the qubit state space manifests not in information storage but in the interference patterns accessible during quantum computation.

## Computational Basis States

The **computational basis** (also called the standard basis or $Z$-basis) consists of the two orthonormal eigenstates of the Pauli-$Z$ operator:

#### Computational Basis Vectors

$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$

These states satisfy orthonormality $\langle i | j \rangle = \delta_{ij}$ and completeness $|0\rangle\langle 0| + |1\rangle\langle 1| = I$. They are eigenstates of the Pauli-$Z$ matrix with eigenvalues $+1$ and $-1$ respectively:

#### Pauli-Z Eigenvalue Equations

$Z|0\rangle = +|0\rangle, \qquad Z|1\rangle = -|1\rangle$

where:

- $Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ is the Pauli-$Z$ operator

The physical realization of $|0\rangle$ and $|1\rangle$ depends on the hardware platform: ground and excited states of a superconducting transmon, spin-up and spin-down of a trapped ion, or horizontal and vertical polarization of a photon. The abstract Hilbert space formalism treats all implementations uniformly.

Other frequently used bases include the $X$-basis (Hadamard basis):

- $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$
- $|-\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$

and the $Y$-basis:

- $|+i\rangle = \frac{1}{\sqrt{2}}(|0\rangle + i|1\rangle)$
- $|-i\rangle = \frac{1}{\sqrt{2}}(|0\rangle - i|1\rangle)$

Each basis corresponds to the eigenstates of the respective Pauli operator, and measurements in different bases extract complementary information about the qubit state.

## Bloch Sphere

The normalization constraint $|\alpha|^2 + |\beta|^2 = 1$ and the physical irrelevance of global phase (discussed below) reduce the qubit state to two real parameters. We parametrize these as polar and azimuthal angles on a unit sphere—the **Bloch sphere**.

#### Bloch Sphere Parametrization

$|\psi\rangle = \cos\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\frac{\theta}{2}|1\rangle$

where:

- $\theta \in [0, \pi]$ is the polar angle measured from the positive $z$-axis
- $\phi \in [0, 2\pi)$ is the azimuthal angle in the $xy$-plane

The Cartesian coordinates of the corresponding Bloch vector $\hat{n} = (n_x, n_y, n_z)$ are:

- $n_x = \sin\theta\cos\phi = \langle\psi|X|\psi\rangle$
- $n_y = \sin\theta\sin\phi = \langle\psi|Y|\psi\rangle$
- $n_z = \cos\theta = \langle\psi|Z|\psi\rangle$

The Bloch vector components are precisely the expectation values of the three Pauli operators, which provides a direct experimental procedure for determining the state: measure the expectation values of $X$, $Y$, and $Z$.

| State | $\theta$ | $\phi$ | Bloch Vector $(n_x, n_y, n_z)$ | Ket |
|-------|----------|--------|-------------------------------|-----|
| North pole | $0$ | — | $(0, 0, 1)$ | $\|0\rangle$ |
| South pole | $\pi$ | — | $(0, 0, -1)$ | $\|1\rangle$ |
| $+x$ | $\pi/2$ | $0$ | $(1, 0, 0)$ | $\|+\rangle$ |
| $-x$ | $\pi/2$ | $\pi$ | $(-1, 0, 0)$ | $\|-\rangle$ |
| $+y$ | $\pi/2$ | $\pi/2$ | $(0, 1, 0)$ | $\|+i\rangle$ |
| $-y$ | $\pi/2$ | $3\pi/2$ | $(0, -1, 0)$ | $\|-i\rangle$ |

A key geometric fact: orthogonal quantum states correspond to **antipodal** points on the Bloch sphere, not to orthogonal directions. This arises because the state space is the complex projective line $\mathbb{CP}^1 \cong S^2$, and the factor of $\theta/2$ in the parametrization accounts for this double covering.

#### Diagram: Bloch Sphere Interactive Visualization
<iframe src="../../sims/bloch-sphere-visualization/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Bloch Sphere Interactive Visualization</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, manipulate

Learning Objective: Students can manipulate the polar and azimuthal angles of a qubit state and observe the corresponding Bloch vector position, state vector amplitudes, and measurement probabilities in all three Pauli bases.

Instructional Rationale: Parameter exploration is appropriate for an Apply-level objective because students must connect the abstract angles $\theta$ and $\phi$ to concrete Bloch vector coordinates, ket amplitudes, and measurement statistics. Direct manipulation builds intuition about the geometry of qubit state space.

Visual elements:
- A 3D wireframe unit sphere with labeled axes ($x$, $y$, $z$)
- A Bloch vector arrow from the origin to the surface point $(\sin\theta\cos\phi, \sin\theta\sin\phi, \cos\theta)$
- Labeled points for the six cardinal states ($|0\rangle$, $|1\rangle$, $|+\rangle$, $|-\rangle$, $|+i\rangle$, $|-i\rangle$)
- Equator circle and prime meridian arc for reference
- State vector display: $|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle$ with numerical values
- Measurement probability bars for $Z$-, $X$-, and $Y$-basis outcomes

Interactive controls:
- Slider: $\theta$ from $0$ to $\pi$ (default: $\pi/3$)
- Slider: $\phi$ from $0$ to $2\pi$ (default: $0$)
- Button: Snap to cardinal states ($|0\rangle$, $|1\rangle$, $|+\rangle$, $|-\rangle$, $|+i\rangle$, $|-i\rangle$)
- Checkbox: Show projection shadows on $xy$-, $xz$-, $yz$-planes
- Mouse drag: rotate the 3D view

Behavior:
- Moving $\theta$ slider rotates the Bloch vector from north pole ($|0\rangle$) to south pole ($|1\rangle$)
- Moving $\phi$ slider rotates the Bloch vector around the $z$-axis
- Probability bars update in real time: $P(0) = \cos^2(\theta/2)$, $P(1) = \sin^2(\theta/2)$ for $Z$-basis, etc.
- State vector ket updates with numerical amplitudes

Canvas layout:
- Left (65%): 3D Bloch sphere rendering
- Right (35%): Controls panel, state display, probability bars

Implementation: p5.js with WEBGL renderer for 3D sphere. Responsive design adapts to window resize events.
</details>

## Global Phase

Two state vectors that differ by only an overall complex factor of unit modulus represent the same physical state. Formally, $|\psi\rangle$ and $e^{i\gamma}|\psi\rangle$ are **physically indistinguishable** for any $\gamma \in \mathbb{R}$.

This can be verified directly from the Born rule. For any measurement operator $M$ with outcome projector $P_m$:

#### Global Phase Invariance

$P(m) = |\langle m | e^{i\gamma}\psi\rangle|^2 = |e^{i\gamma}|^2|\langle m|\psi\rangle|^2 = |\langle m|\psi\rangle|^2$

where:

- $|e^{i\gamma}|^2 = 1$ for all $\gamma \in \mathbb{R}$
- $P(m)$ is the probability of measurement outcome $m$

Global phase invariance means the true state space of a qubit is not $S^3 \subset \mathbb{C}^2$ (the unit sphere in four real dimensions) but rather the quotient $S^3/U(1) \cong S^2$, which is precisely the Bloch sphere. This reduction from four to two real parameters is the geometric content of global phase invariance.

In practice, global phase irrelevance means we can always choose $\alpha$ to be real and non-negative in the parametrization $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ without loss of generality. This convention corresponds exactly to the Bloch sphere parametrization where $\cos(\theta/2) \geq 0$.

!!! warning "Global Phase and Relative Phase in Multi-Qubit Systems"
    While a global phase on the entire system state is unobservable, a phase applied to one subsystem of an entangled state is NOT a global phase—it is a relative phase that changes the physical state. This distinction becomes critical when constructing controlled gates in quantum circuits.

## Relative Phase

Unlike global phase, the **relative phase** between the $|0\rangle$ and $|1\rangle$ components is physically observable and determines the azimuthal angle $\phi$ on the Bloch sphere. Consider two states with identical $|0\rangle$ and $|1\rangle$ probabilities but different relative phases:

- $|\psi_1\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle) = |+\rangle$
- $|\psi_2\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle) = |-\rangle$

Both yield $P(0) = P(1) = 1/2$ when measured in the $Z$-basis. However, they are orthogonal states and are perfectly distinguishable when measured in the $X$-basis:

- $\langle +|\psi_1\rangle = 1$ and $\langle +|\psi_2\rangle = 0$
- $\langle -|\psi_1\rangle = 0$ and $\langle -|\psi_2\rangle = 1$

More generally, the relative phase $\phi$ in $|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle$ determines the $X$ and $Y$ expectation values:

- $\langle X \rangle = \sin\theta\cos\phi$
- $\langle Y \rangle = \sin\theta\sin\phi$

Relative phase is the essential resource exploited by quantum algorithms. Interference between computational paths—constructive for correct answers and destructive for incorrect ones—is controlled entirely by manipulating relative phases through quantum gates.

## Qubit State Tomography

**Quantum state tomography** is the experimental procedure for reconstructing the density matrix $\rho$ of a qubit from repeated measurements. Since a single measurement collapses the state and yields only one bit of information, full state reconstruction requires an ensemble of identically prepared qubits.

For a single qubit, the density matrix can be expanded in the Pauli basis:

#### Density Matrix Pauli Expansion

$\rho = \frac{1}{2}(I + n_x X + n_y Y + n_z Z) = \frac{1}{2}(I + \vec{n}\cdot\vec{\sigma})$

where:

- $\vec{n} = (n_x, n_y, n_z)$ is the Bloch vector with $|\vec{n}| \leq 1$
- $\vec{\sigma} = (X, Y, Z)$ is the vector of Pauli matrices
- $|\vec{n}| = 1$ for pure states, $|\vec{n}| < 1$ for mixed states

The tomographic protocol proceeds as follows:

1. **Prepare** $N$ identical copies of the unknown state $\rho$
2. **Measure** $N/3$ copies in each of the $X$, $Y$, and $Z$ bases
3. **Estimate** the expectation values: $n_x \approx \bar{X}$, $n_y \approx \bar{Y}$, $n_z \approx \bar{Z}$
4. **Reconstruct** $\rho = \frac{1}{2}(I + n_x X + n_y Y + n_z Z)$

The statistical uncertainty in each Bloch vector component scales as $\Delta n_i \sim 1/\sqrt{N/3}$, so achieving tomographic precision $\epsilon$ requires $N \sim O(1/\epsilon^2)$ copies. This scaling is a fundamental consequence of the Born rule's probabilistic nature.

#### Diagram: Qubit State Tomography Protocol
<iframe src="../../sims/qubit-state-tomography/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Qubit State Tomography Protocol</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: examine, deconstruct

Learning Objective: Students can trace how repeated measurements in three complementary bases allow reconstruction of a qubit's Bloch vector, understanding the statistical convergence as sample size increases.

Instructional Rationale: A parameter exploration with progressive data accumulation is appropriate for an Analyze-level objective because students must deconstruct the tomography process into its constituent measurements and examine how statistical estimates converge to the true Bloch vector. Observing the interplay between sample size and reconstruction accuracy builds insight into quantum measurement theory.

Visual elements:
- A Bloch sphere showing the true state (hidden initially) and the estimated state (updated in real time)
- Three histograms showing measurement outcomes in $X$, $Y$, $Z$ bases
- Numerical display of estimated Bloch vector components $(n_x, n_y, n_z)$ with confidence intervals
- Error metric: Trace distance between true and estimated density matrices

Interactive controls:
- Dropdown: Select a target state to reconstruct (e.g., $|+\rangle$, $|+i\rangle$, random state)
- Button: "Take 10 measurements" (adds 10 simulated measurements)
- Button: "Take 100 measurements"
- Button: "Reset"
- Toggle: "Reveal true state" (shows the true Bloch vector)
- Slider: Noise level (adds depolarizing noise to simulate mixed states)

Behavior:
- Each measurement is a simulated Born-rule sample in the appropriate basis
- Histograms accumulate outcome counts (+1 and -1 for each Pauli basis)
- Estimated Bloch vector updates as running averages of measurement outcomes
- Estimated state point on Bloch sphere converges toward true state as measurements accumulate
- Confidence interval bars shrink proportionally to $1/\sqrt{N}$

Canvas layout:
- Left (50%): Bloch sphere with true and estimated state vectors
- Right (50%): Three horizontal histograms ($X$, $Y$, $Z$ outcomes), Bloch vector estimates, error metric

Implementation: p5.js with WEBGL for 3D Bloch sphere. Responsive design adapts to window resize events.
</details>

## Multi-Qubit Systems

The state space of a composite quantum system is constructed via the **tensor product** of the constituent Hilbert spaces. For two qubits, each living in $\mathbb{C}^2$, the joint system lives in:

#### Two-Qubit Hilbert Space

$\mathcal{H}_{AB} = \mathcal{H}_A \otimes \mathcal{H}_B = \mathbb{C}^2 \otimes \mathbb{C}^2 = \mathbb{C}^4$

The computational basis for the two-qubit space consists of four states formed by all combinations of the single-qubit basis states:

- $|00\rangle = |0\rangle_A \otimes |0\rangle_B = (1, 0, 0, 0)^T$
- $|01\rangle = |0\rangle_A \otimes |1\rangle_B = (0, 1, 0, 0)^T$
- $|10\rangle = |1\rangle_A \otimes |0\rangle_B = (0, 0, 1, 0)^T$
- $|11\rangle = |1\rangle_A \otimes |1\rangle_B = (0, 0, 0, 1)^T$

The most general two-qubit pure state is:

#### General Two-Qubit State

$|\Psi\rangle = \alpha_{00}|00\rangle + \alpha_{01}|01\rangle + \alpha_{10}|10\rangle + \alpha_{11}|11\rangle$

where:

- $\alpha_{ij} \in \mathbb{C}$ are complex amplitudes
- $\sum_{i,j}|\alpha_{ij}|^2 = 1$ enforces normalization

For $n$ qubits, the Hilbert space dimension is $2^n$, and a general state requires $2^n$ complex amplitudes (minus normalization and global phase). This exponential scaling of the state space is the fundamental resource that gives quantum computing its potential computational advantage—and also what makes classical simulation of quantum systems intractable.

**Product states** are the special case where the joint state factors:

$|\Psi_{\text{prod}}\rangle = |\psi\rangle_A \otimes |\phi\rangle_B = (\alpha_A|0\rangle + \beta_A|1\rangle) \otimes (\alpha_B|0\rangle + \beta_B|1\rangle)$

Expanding this product yields $\alpha_{00} = \alpha_A \alpha_B$, $\alpha_{01} = \alpha_A \beta_B$, $\alpha_{10} = \beta_A \alpha_B$, $\alpha_{11} = \beta_A \beta_B$. A product state satisfies the factorization condition $\alpha_{00}\alpha_{11} = \alpha_{01}\alpha_{10}$, which can serve as a separability test for two-qubit pure states.

| Number of Qubits $n$ | Hilbert Space Dimension $2^n$ | Real Parameters | Example |
|---|---|---|---|
| 1 | 2 | 2 | Single spin-1/2 particle |
| 2 | 4 | 6 | Two-qubit register |
| 3 | 8 | 14 | Three-qubit error correction code |
| 10 | 1,024 | 2,046 | Small quantum circuit |
| 50 | $\sim 10^{15}$ | $\sim 2 \times 10^{15}$ | Beyond classical simulation |
| 300 | $\sim 2^{300}$ | $\sim 2^{301}$ | More states than atoms in universe |

## Quantum Entanglement

A multi-qubit pure state is **entangled** if it cannot be written as a tensor product of single-qubit states. For a bipartite system $\mathcal{H}_A \otimes \mathcal{H}_B$, a pure state $|\Psi\rangle_{AB}$ is:

- **Separable (product):** $|\Psi\rangle_{AB} = |\psi\rangle_A \otimes |\phi\rangle_B$
- **Entangled:** $|\Psi\rangle_{AB} \neq |\psi\rangle_A \otimes |\phi\rangle_B$ for any choice of $|\psi\rangle_A$ and $|\phi\rangle_B$

The simplest example of an entangled state is:

#### Maximally Entangled State Example

$|\Psi^+\rangle = \frac{1}{\sqrt{2}}(|01\rangle + |10\rangle)$

To verify entanglement, assume it factors: $|\Psi^+\rangle = (\alpha|0\rangle + \beta|1\rangle) \otimes (\gamma|0\rangle + \delta|1\rangle)$. Expanding gives $\alpha\gamma|00\rangle + \alpha\delta|01\rangle + \beta\gamma|10\rangle + \beta\delta|11\rangle$. Matching coefficients: $\alpha\gamma = 0$ and $\beta\delta = 0$, but $\alpha\delta = 1/\sqrt{2} \neq 0$ and $\beta\gamma = 1/\sqrt{2} \neq 0$. From $\alpha\gamma = 0$, either $\alpha = 0$ or $\gamma = 0$; either case forces $\alpha\delta = 0$ or $\beta\gamma = 0$, a contradiction. Therefore $|\Psi^+\rangle$ is entangled.

Entanglement induces correlations between measurement outcomes that cannot be explained by any classical probability distribution over local hidden variables. If we measure both qubits of $|\Psi^+\rangle$ in the $Z$-basis, the outcomes are always opposite ($01$ or $10$ each with probability $1/2$), regardless of the spatial separation between the qubits. This perfect anti-correlation holds instantly, without any signal traveling between the particles.

## Bell States

The four **Bell states** (also called EPR pairs) form a maximally entangled orthonormal basis for the two-qubit Hilbert space $\mathbb{C}^4$:

#### Bell State Definitions

$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$

$|\Phi^-\rangle = \frac{1}{\sqrt{2}}(|00\rangle - |11\rangle)$

$|\Psi^+\rangle = \frac{1}{\sqrt{2}}(|01\rangle + |10\rangle)$

$|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|01\rangle - |10\rangle)$

These states are related to the computational basis by:

$|\Phi^+\rangle = \text{CNOT}(H \otimes I)|00\rangle$

where $H$ is the Hadamard gate and $\text{CNOT}$ is the controlled-NOT gate (detailed in Chapter 9). This circuit provides the standard method for generating entanglement from an unentangled input.

| Bell State | Correlations ($Z$-basis) | Correlations ($X$-basis) | Parity |
|------------|-------------------------|-------------------------|--------|
| $\|\Phi^+\rangle$ | Same outcomes ($00$ or $11$) | Same outcomes ($++$ or $--$) | Even |
| $\|\Phi^-\rangle$ | Same outcomes ($00$ or $11$) | Opposite outcomes ($+-$ or $-+$) | Even |
| $\|\Psi^+\rangle$ | Opposite outcomes ($01$ or $10$) | Same outcomes ($++$ or $--$) | Odd |
| $\|\Psi^-\rangle$ | Opposite outcomes ($01$ or $10$) | Opposite outcomes ($+-$ or $-+$) | Odd |

The Bell states are eigenstates of the two commuting operators $Z \otimes Z$ and $X \otimes X$ with the eigenvalues shown. This structure is the prototype for the stabilizer formalism developed in Chapter 11 for quantum error correction.

**Derivation of $|\Phi^+\rangle$ correlations.** Writing $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$, suppose Alice measures qubit $A$ in the $Z$-basis and obtains outcome $|0\rangle_A$. By the projection postulate, the post-measurement state is:

$\frac{(\langle 0|_A \otimes I_B)|\Phi^+\rangle}{\|(\langle 0|_A \otimes I_B)|\Phi^+\rangle\|} = \frac{\frac{1}{\sqrt{2}}|0\rangle_B}{1/\sqrt{2}} = |0\rangle_B$

So Bob's qubit is deterministically in $|0\rangle_B$—the outcomes are perfectly correlated. If Alice instead obtains $|1\rangle_A$, Bob's state collapses to $|1\rangle_B$. Each outcome occurs with probability $1/2$, giving the mixture $\{(1/2, |0\rangle_B), (1/2, |1\rangle_B)\}$ from Bob's perspective.

#### Diagram: Bell State Correlation Explorer
<iframe src="../../sims/bell-state-correlation-explorer/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Bell State Correlation Explorer</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, examine

Learning Objective: Students can compare measurement correlations across the four Bell states in different measurement bases, examining how entanglement produces correlated outcomes that differ from classical joint probability distributions.

Instructional Rationale: A compare-and-contrast interactive is appropriate for an Analyze-level objective because students must distinguish the four Bell states by their operational signatures (correlation patterns) across measurement bases. Simulating many measurement rounds lets students observe statistical patterns and contrast them with classical predictions.

Visual elements:
- Two Bloch spheres side by side representing Alice's and Bob's qubits
- Measurement basis selectors for Alice and Bob independently
- Running tally of joint outcomes (e.g., $|00\rangle$: 247, $|01\rangle$: 3, $|10\rangle$: 2, $|11\rangle$: 248)
- Correlation coefficient display: $\langle A \otimes B \rangle$
- Bar chart showing empirical vs theoretical joint outcome probabilities

Interactive controls:
- Dropdown: Select Bell state ($|\Phi^+\rangle$, $|\Phi^-\rangle$, $|\Psi^+\rangle$, $|\Psi^-\rangle$)
- Dropdown: Alice's measurement basis ($X$, $Y$, $Z$, or custom angle)
- Dropdown: Bob's measurement basis ($X$, $Y$, $Z$, or custom angle)
- Button: "Measure 1 pair"
- Button: "Measure 100 pairs"
- Button: "Reset statistics"

Behavior:
- Each measurement simulates Born rule sampling from the selected Bell state in the chosen bases
- Outcome tallies and correlation coefficient update in real time
- Bar chart shows empirical frequencies converging to theoretical probabilities
- Bloch spheres flash to indicate measurement outcomes for single-pair measurements
- Custom angle selector allows exploring Bell inequality violation angles

Canvas layout:
- Top (40%): Two Bloch spheres with basis indicators
- Bottom (60%): Outcome tallies, correlation display, bar chart comparison

Implementation: p5.js with WEBGL for Bloch spheres. Responsive design adapts to window resize events.
</details>

## EPR Paradox

In their celebrated 1935 paper, Einstein, Podolsky, and Rosen (EPR) argued that quantum mechanics is incomplete. Their argument proceeds from two premises:

1. **Realism:** If a physical quantity can be predicted with certainty without disturbing the system, there exists an element of physical reality corresponding to it.
2. **Locality:** No influence can propagate faster than light; a measurement on one particle cannot instantaneously affect a distant particle.

Consider the Bell state $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$ shared between Alice and Bob, who are spacelike separated. If Alice measures in the $Z$-basis and obtains $|0\rangle$, she can predict with certainty that Bob's qubit is $|0\rangle$. By realism, Bob's $Z$-value must have been determined before Alice's measurement.

But Alice could instead have measured in the $X$-basis. The state $|\Phi^+\rangle$ can equally be written as $\frac{1}{\sqrt{2}}(|++\rangle + |--\rangle)$, so if Alice obtains $|+\rangle$, Bob's qubit is deterministically $|+\rangle$. By realism, Bob's $X$-value must also have been predetermined.

If both $Z$ and $X$ values are simultaneously defined, quantum mechanics is incomplete because no quantum state can assign definite values to non-commuting observables (by the uncertainty principle). EPR concluded that "hidden variables" must supplement the quantum mechanical description.

The resolution came three decades later through Bell's theorem, which showed that **no local hidden variable theory** can reproduce all predictions of quantum mechanics—the EPR assumptions of local realism are inconsistent with experiment.

## Bell's Inequality

John Bell (1964) derived an inequality that any local hidden variable (LHV) theory must satisfy, and showed that quantum mechanics violates it. The most experimentally practical version is the **CHSH inequality** (Clauser, Horne, Shimony, Holt, 1969).

**Setup.** Alice and Bob each choose between two measurement settings: Alice measures $A_1$ or $A_2$, Bob measures $B_1$ or $B_2$, each yielding outcomes $\pm 1$.

**Derivation for local hidden variables.** Suppose outcomes are determined by a hidden variable $\lambda$ with distribution $p(\lambda)$. Define $A_i(\lambda), B_j(\lambda) \in \{-1, +1\}$. The CHSH quantity is:

#### CHSH Quantity

$S = \langle A_1 B_1 \rangle + \langle A_1 B_2 \rangle + \langle A_2 B_1 \rangle - \langle A_2 B_2 \rangle$

For fixed $\lambda$:

$A_1(\lambda)[B_1(\lambda) + B_2(\lambda)] + A_2(\lambda)[B_1(\lambda) - B_2(\lambda)]$

Since $B_1, B_2 \in \{-1, +1\}$, either $B_1 + B_2 = 0$ (and $|B_1 - B_2| = 2$) or $|B_1 + B_2| = 2$ (and $B_1 - B_2 = 0$). In either case, the magnitude of the expression is exactly 2 for each $\lambda$. Averaging over $\lambda$:

#### CHSH Inequality

$|S| \leq 2$

where:

- $S$ is the CHSH combination of four correlation functions
- The bound of 2 holds for any local hidden variable theory

**Quantum violation.** For the Bell state $|\Phi^+\rangle$ and the optimal measurement settings $A_1 = Z$, $A_2 = X$, $B_1 = \frac{Z+X}{\sqrt{2}}$, $B_2 = \frac{Z-X}{\sqrt{2}}$ (corresponding to measurement angles $0, \pi/2$ for Alice and $\pi/4, -\pi/4$ for Bob), quantum mechanics predicts:

#### Tsirelson's Bound

$S_{\text{QM}} = 2\sqrt{2} \approx 2.828$

This value, known as **Tsirelson's bound**, is the maximum achievable by quantum mechanics and exceeds the classical limit of 2. The violation has been confirmed experimentally with increasing precision, closing successive loopholes (detection, locality, freedom-of-choice) culminating in loophole-free tests in 2015.

#### Diagram: CHSH Inequality and Quantum Violation
<iframe src="../../sims/chsh-inequality-explorer/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>CHSH Inequality and Quantum Violation</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: assess, validate

Learning Objective: Students can assess the CHSH inequality by varying Alice's and Bob's measurement angles, computing the CHSH parameter $S$, and validating that quantum mechanics violates the classical bound $|S| \leq 2$ while respecting Tsirelson's bound $|S| \leq 2\sqrt{2}$.

Instructional Rationale: An angle-exploration interface is appropriate for an Evaluate-level objective because students must judge whether specific measurement configurations violate the classical bound, validate the quantum prediction against the CHSH formula, and critically assess the gap between classical and quantum limits. The ability to test arbitrary angles (not just optimal ones) forces students to evaluate when and why the violation occurs.

Visual elements:
- Two circular dials showing Alice's and Bob's measurement angles on the Bloch sphere equator
- Real-time computation and display of the four correlation terms $\langle A_1 B_1 \rangle$, $\langle A_1 B_2 \rangle$, $\langle A_2 B_1 \rangle$, $\langle A_2 B_2 \rangle$
- A number line from $-4$ to $4$ showing the CHSH value $S$ with marked regions: green for $|S| \leq 2$ (classical), red for $2 < |S| \leq 2\sqrt{2}$ (quantum), gray for $|S| > 2\sqrt{2}$ (forbidden)
- Formula display showing the computation
- Bell state selector

Interactive controls:
- Slider: Alice's angle $a_1$ (default $0$)
- Slider: Alice's angle $a_2$ (default $\pi/2$)
- Slider: Bob's angle $b_1$ (default $\pi/4$)
- Slider: Bob's angle $b_2$ (default $-\pi/4$)
- Dropdown: Select Bell state ($|\Phi^+\rangle$, $|\Phi^-\rangle$, $|\Psi^+\rangle$, $|\Psi^-\rangle$)
- Button: "Set optimal angles" (snaps to $2\sqrt{2}$ violation)
- Button: "Reset to default"

Behavior:
- Correlation terms computed as $\langle A_i B_j \rangle = -\cos(a_i - b_j)$ for $|\Phi^+\rangle$
- $S$ value updates in real time as angles change
- Number line marker moves and changes color based on $S$ value
- When $|S| > 2$, a "Bell violation!" indicator appears
- Tooltip explains why quantum mechanics can exceed the classical bound

Canvas layout:
- Top (30%): Angle dials for Alice and Bob
- Middle (40%): Correlation term computation and CHSH formula display
- Bottom (30%): Number line visualization of $S$ with classical/quantum regions

Implementation: p5.js. Responsive design adapts to window resize events.
</details>

## Schmidt Decomposition

The **Schmidt decomposition** provides a canonical form for bipartite pure states that reveals the entanglement structure. For any pure state $|\Psi\rangle_{AB} \in \mathcal{H}_A \otimes \mathcal{H}_B$ with $\dim(\mathcal{H}_A) = d_A$ and $\dim(\mathcal{H}_B) = d_B$:

#### Schmidt Decomposition Theorem

$|\Psi\rangle_{AB} = \sum_{i=1}^{r} \lambda_i |a_i\rangle_A \otimes |b_i\rangle_B$

where:

- $\{|a_i\rangle\}$ is an orthonormal set in $\mathcal{H}_A$ (Schmidt basis for $A$)
- $\{|b_i\rangle\}$ is an orthonormal set in $\mathcal{H}_B$ (Schmidt basis for $B$)
- $\lambda_i > 0$ are the Schmidt coefficients satisfying $\sum_i \lambda_i^2 = 1$
- $r \leq \min(d_A, d_B)$ is the Schmidt rank

**Derivation.** Express $|\Psi\rangle_{AB}$ in arbitrary orthonormal bases $\{|u_j\rangle_A\}$ and $\{|v_k\rangle_B\}$ as $|\Psi\rangle = \sum_{j,k} c_{jk}|u_j\rangle|v_k\rangle$. The coefficients $c_{jk}$ form a matrix $C$. Applying the singular value decomposition $C = UDV^\dagger$ where $D = \text{diag}(\lambda_1, \ldots, \lambda_r)$:

$|\Psi\rangle = \sum_{j,k}\sum_i U_{ji}\lambda_i V^*_{ki}|u_j\rangle|v_k\rangle = \sum_i \lambda_i \left(\sum_j U_{ji}|u_j\rangle\right)\left(\sum_k V^*_{ki}|v_k\rangle\right) = \sum_i \lambda_i |a_i\rangle|b_i\rangle$

where $|a_i\rangle = \sum_j U_{ji}|u_j\rangle$ and $|b_i\rangle = \sum_k V^*_{ki}|v_k\rangle$ are orthonormal because $U$ and $V$ are unitary.

The Schmidt decomposition immediately characterizes entanglement:

- **Schmidt rank $r = 1$:** The state is a product state (separable)
- **Schmidt rank $r > 1$:** The state is entangled
- **$r = d$ with all $\lambda_i = 1/\sqrt{d}$:** The state is maximally entangled

**Example.** For $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$, the Schmidt decomposition is already in canonical form with $r = 2$, $\lambda_1 = \lambda_2 = 1/\sqrt{2}$, confirming maximal entanglement. For $|00\rangle$, the decomposition has $r = 1$, $\lambda_1 = 1$, confirming separability.

The **entanglement entropy** (von Neumann entropy of the reduced density matrix) quantifies entanglement for bipartite pure states:

#### Entanglement Entropy

$E(|\Psi\rangle_{AB}) = -\sum_i \lambda_i^2 \log_2 \lambda_i^2$

where:

- $\lambda_i$ are the Schmidt coefficients
- $E = 0$ for product states
- $E = \log_2 d$ for maximally entangled states in $\mathbb{C}^d \otimes \mathbb{C}^d$
- For two qubits, $E_{\max} = 1$ ebit (one "entanglement bit")

## Partial Trace

The **partial trace** is the mathematical operation that extracts the description of a subsystem from a composite quantum state. Given a density matrix $\rho_{AB}$ on $\mathcal{H}_A \otimes \mathcal{H}_B$, the partial trace over subsystem $B$ yields the reduced density matrix of $A$:

#### Partial Trace Definition

$\rho_A = \text{Tr}_B(\rho_{AB}) = \sum_j (I_A \otimes \langle j|_B) \rho_{AB} (I_A \otimes |j\rangle_B)$

where:

- $\{|j\rangle_B\}$ is any orthonormal basis for $\mathcal{H}_B$
- $I_A$ is the identity on $\mathcal{H}_A$
- The result is independent of the choice of basis $\{|j\rangle_B\}$

The partial trace is the unique operation that satisfies $\text{Tr}(O_A \cdot \rho_A) = \text{Tr}((O_A \otimes I_B) \cdot \rho_{AB})$ for all operators $O_A$ on $\mathcal{H}_A$. This means $\rho_A$ reproduces all local measurement statistics on subsystem $A$.

**Computation for pure states.** For a bipartite pure state $|\Psi\rangle_{AB}$ with Schmidt decomposition $\sum_i \lambda_i |a_i\rangle|b_i\rangle$:

$\rho_A = \text{Tr}_B(|\Psi\rangle\langle\Psi|) = \sum_i \lambda_i^2 |a_i\rangle\langle a_i|$

This result follows directly:

$\rho_A = \sum_j \langle j|_B \left(\sum_{i,k} \lambda_i \lambda_k |a_i\rangle\langle a_k| \otimes |b_i\rangle\langle b_k|\right)|j\rangle_B = \sum_{i,k}\lambda_i\lambda_k |a_i\rangle\langle a_k| \underbrace{\sum_j \langle j|b_i\rangle\langle b_k|j\rangle}_{\langle b_k|b_i\rangle = \delta_{ki}} = \sum_i \lambda_i^2 |a_i\rangle\langle a_i|$

**Worked Example.** Compute the partial trace of $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$:

$\rho_{AB} = |\Phi^+\rangle\langle\Phi^+| = \frac{1}{2}(|00\rangle\langle 00| + |00\rangle\langle 11| + |11\rangle\langle 00| + |11\rangle\langle 11|)$

$\rho_A = \text{Tr}_B(\rho_{AB}) = \frac{1}{2}(\langle 0|_B|00\rangle\langle 00||0\rangle_B + \langle 0|_B|00\rangle\langle 11||0\rangle_B + \langle 0|_B|11\rangle\langle 00||0\rangle_B + \langle 0|_B|11\rangle\langle 11||0\rangle_B)$
$\quad + \frac{1}{2}(\langle 1|_B|00\rangle\langle 00||1\rangle_B + \langle 1|_B|00\rangle\langle 11||1\rangle_B + \langle 1|_B|11\rangle\langle 00||1\rangle_B + \langle 1|_B|11\rangle\langle 11||1\rangle_B)$

Evaluating the inner products term by term:

$\rho_A = \frac{1}{2}(|0\rangle\langle 0| + 0 + 0 + 0) + \frac{1}{2}(0 + 0 + 0 + |1\rangle\langle 1|) = \frac{1}{2}(|0\rangle\langle 0| + |1\rangle\langle 1|) = \frac{I}{2}$

This is the maximally mixed state—a hallmark of maximal entanglement.

## Reduced Density Matrix

The **reduced density matrix** $\rho_A = \text{Tr}_B(\rho_{AB})$ provides the complete description of subsystem $A$ accessible through local measurements. Its eigenvalues are the squared Schmidt coefficients $\{\lambda_i^2\}$, and its eigenstates are the Schmidt basis vectors $\{|a_i\rangle\}$.

The reduced density matrix reveals a profound connection between entanglement and mixedness:

- **Product state** $|\Psi\rangle = |\psi\rangle_A \otimes |\phi\rangle_B$: $\rho_A = |\psi\rangle\langle\psi|$ is pure
- **Entangled state**: $\rho_A$ is mixed (not a projector), with purity $\text{Tr}(\rho_A^2) < 1$
- **Maximally entangled state** ($d$-dimensional): $\rho_A = I/d$ is maximally mixed

This means that **entanglement between a system and its environment is precisely what makes the system appear mixed**, even when the global state is pure. This insight is the foundation of decoherence theory in quantum computing: qubit interactions with the environment create entanglement, which manifests as noise from the qubit's local perspective.

| State | $\rho_A$ | Purity $\text{Tr}(\rho_A^2)$ | Entanglement Entropy |
|-------|----------|------------------------------|---------------------|
| $\|00\rangle$ (product) | $\|0\rangle\langle 0\|$ | 1 | 0 |
| $\frac{1}{\sqrt{2}}(\|00\rangle + \|11\rangle)$ (max entangled) | $\frac{I}{2}$ | $\frac{1}{2}$ | 1 ebit |
| $\sqrt{0.9}\|00\rangle + \sqrt{0.1}\|11\rangle$ (partially entangled) | $0.9\|0\rangle\langle 0\| + 0.1\|1\rangle\langle 1\|$ | 0.82 | 0.469 ebits |

#### Diagram: Entanglement and Reduced State Visualizer
<iframe src="../../sims/entanglement-reduced-state/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Entanglement and Reduced State Visualizer</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: examine, compare

Learning Objective: Students can examine how the Schmidt coefficients of a bipartite state control the purity and entanglement of the reduced density matrix, comparing the Bloch sphere representation of the reduced state (inside the sphere for mixed states) with the entanglement entropy.

Instructional Rationale: A parameter exploration with linked visualizations is appropriate for an Analyze-level objective because students must connect three representations: the Schmidt coefficients (algebraic), the Bloch sphere radius (geometric), and the entanglement entropy (information-theoretic). Varying the Schmidt parameter and observing all three update simultaneously builds deep structural understanding.

Visual elements:
- A slider controlling the Schmidt coefficient $\lambda_1$ (with $\lambda_2 = \sqrt{1 - \lambda_1^2}$)
- Two-qubit state displayed in Schmidt form: $\lambda_1|00\rangle + \lambda_2|11\rangle$
- Bloch sphere showing the reduced state of qubit $A$ (Bloch vector length $= |2\lambda_1^2 - 1|$ along $z$-axis)
- Numerical display of $\rho_A$ as a $2 \times 2$ matrix
- Purity gauge: $\text{Tr}(\rho_A^2)$ shown as a bar from 0.5 to 1.0
- Entanglement entropy plot: $E$ vs $\lambda_1$ curve with current point highlighted

Interactive controls:
- Slider: $\lambda_1$ from $0$ to $1$ (default: $1/\sqrt{2}$)
- Button: Snap to product state ($\lambda_1 = 1$)
- Button: Snap to maximally entangled ($\lambda_1 = 1/\sqrt{2}$)
- Toggle: Show/hide $\rho_A$ matrix elements

Behavior:
- Moving $\lambda_1$ slider updates the two-qubit state, reduced density matrix, Bloch vector, purity, and entropy simultaneously
- At $\lambda_1 = 1$: pure state on north pole, purity = 1, entropy = 0
- At $\lambda_1 = 1/\sqrt{2}$: maximally mixed state at origin, purity = 0.5, entropy = 1
- At $\lambda_1 = 0$: pure state on south pole, purity = 1, entropy = 0
- Entropy curve shows concavity and maximum at equal Schmidt coefficients

Canvas layout:
- Left (40%): Bloch sphere showing reduced state with Bloch vector shrinking/growing
- Right top (30%): State display, $\rho_A$ matrix, purity gauge
- Right bottom (30%): Entanglement entropy curve with highlighted current point

Implementation: p5.js with WEBGL for Bloch sphere. Responsive design adapts to window resize events.
</details>

## Key Takeaways

This chapter established the qubit as the fundamental building block of quantum information and developed the essential mathematical tools for analyzing quantum states:

1. A **qubit** is a normalized vector in $\mathbb{C}^2$, described by two real parameters after accounting for normalization and global phase invariance.

2. The **Bloch sphere** provides a complete geometric representation of single-qubit pure states, with the Bloch vector components equal to Pauli expectation values.

3. **Global phase** is physically unobservable, while **relative phase** determines interference effects and is the resource exploited by quantum algorithms.

4. **Qubit state tomography** reconstructs the density matrix from Pauli-basis measurements, requiring $O(1/\epsilon^2)$ copies for precision $\epsilon$.

5. **Multi-qubit systems** live in tensor product spaces of dimension $2^n$, whose exponential scaling is the source of quantum computational power.

6. **Entanglement** is the defining feature of quantum correlations: entangled states cannot be factored into product states and exhibit correlations stronger than any classical model allows.

7. The four **Bell states** form a maximally entangled basis for two qubits and serve as the fundamental resource for quantum teleportation, superdense coding, and entanglement-based protocols.

8. The **EPR paradox** and **Bell's inequality** (CHSH form) demonstrate that local hidden variable theories cannot reproduce quantum predictions, with the maximum quantum violation reaching $2\sqrt{2}$.

9. The **Schmidt decomposition** provides a canonical form for bipartite pure states, with the Schmidt rank characterizing entanglement.

10. The **partial trace** and **reduced density matrix** extract subsystem descriptions from composite states, revealing that entanglement manifests as local mixedness.

??? question "Concept Check: Why does maximal entanglement produce a maximally mixed reduced state?"
    For a maximally entangled state like $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$, the Schmidt coefficients are equal: $\lambda_1 = \lambda_2 = 1/\sqrt{2}$. The reduced density matrix is $\rho_A = \sum_i \lambda_i^2 |a_i\rangle\langle a_i| = \frac{1}{2}|0\rangle\langle 0| + \frac{1}{2}|1\rangle\langle 1| = I/2$. Physically, this means that no local measurement on qubit $A$ alone can extract any information about the state—all the information is encoded in the correlations between $A$ and $B$. This is the information-theoretic signature of maximal entanglement: the subsystem entropy equals $\log_2 d$ bits, the maximum possible.
