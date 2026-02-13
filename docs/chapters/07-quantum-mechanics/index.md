---
title: Quantum Mechanics Foundations
description: The postulates and mathematical formalism of quantum mechanics including Dirac notation, Hilbert spaces, measurement theory, uncertainty relations, density matrices, time evolution, and the no-cloning theorem
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Quantum Mechanics Foundations

## Summary

This chapter establishes the mathematical foundations of quantum mechanics needed for quantum computing. We present the postulates of quantum mechanics, develop Dirac notation and Hilbert space formalism, derive the Born rule for measurement probabilities, prove the uncertainty principle from commutation relations, introduce density matrices for mixed states, derive the Schrodinger equation and time evolution operator, and prove the no-cloning theorem.

## Concepts Covered

This chapter covers the following 16 concepts:

1. Wave-Particle Duality
2. De Broglie Wavelength
3. Superposition Principle
4. Dirac Notation
5. Hilbert Space
6. State Vector
7. Quantum Measurement
8. Born Rule
9. Wave Function Collapse
10. Heisenberg Uncertainty
11. Commutator Relations
12. Density Matrix
13. Pure And Mixed States
14. Time Evolution Operator
15. Schrodinger Equation
16. No-Cloning Theorem

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)

---

## Introduction

Chapters 1 through 6 developed the classical mathematical and physical foundations of computing: linear algebra, thermodynamics, information theory, semiconductor devices, and reversible logic. We now cross the boundary into the quantum domain. This chapter is the critical bridge: it introduces the postulates, mathematical structures, and physical principles of quantum mechanics that underpin all of quantum computing.

The presentation is self-contained but assumes fluency with the linear algebra of [Chapter 1](../01-mathematical-foundations/index.md)—complex vector spaces, inner products, eigenvalues, Hermitian and unitary matrices, the spectral decomposition, and tensor products. We will frequently reference those results here and cast them into the language of quantum mechanics.

We begin with the physical motivations (wave-particle duality and matter waves) that forced a departure from classical physics, then build the mathematical formalism (Dirac notation, Hilbert spaces, state vectors) that quantum mechanics uses to describe nature. The middle sections develop measurement theory (the Born rule, wave function collapse, and the uncertainty principle) and the algebraic structure of observables (commutators). We then introduce the density matrix formalism for handling statistical mixtures and open quantum systems, derive the Schrodinger equation governing time evolution, and conclude with the no-cloning theorem—a uniquely quantum constraint with profound consequences for quantum information.

By the end of this chapter, the reader will possess every piece of quantum mechanical formalism required to define qubits, quantum gates, and quantum algorithms in the chapters that follow.

## Wave-Particle Duality

Classical physics draws a sharp distinction between particles (localized objects with definite trajectories) and waves (extended disturbances exhibiting interference and diffraction). Quantum mechanics dissolves this boundary: every physical entity exhibits both particle-like and wave-like behavior, depending on the experimental context.

**The double-slit experiment.** The canonical demonstration of wave-particle duality proceeds as follows. A beam of electrons (or photons) is directed at a barrier containing two narrow slits. On a detection screen beyond the barrier, individual particles arrive one at a time, each producing a localized dot—clearly particle-like behavior. Yet after many particles have been detected, the accumulated pattern of dots forms an interference pattern of bright and dark fringes—a signature of wave-like behavior. This pattern matches exactly what one would predict for a wave passing through both slits simultaneously and interfering with itself.

The critical observation is that the interference pattern appears even when the beam intensity is so low that only one particle traverses the apparatus at a time. Each particle interferes with itself, passing through both slits as a wave and arriving at the screen as a particle. If a detector is placed at one of the slits to determine which path the particle takes, the interference pattern vanishes and the distribution becomes the sum of two single-slit patterns. This is the essence of Bohr's **complementarity principle**: wave behavior (interference) and particle behavior (which-path information) are mutually exclusive. Any experimental arrangement that reveals one aspect necessarily obscures the other.

**Photon behavior.** For light, the particle nature is manifested in the photoelectric effect (Einstein, 1905). Light of frequency $\nu$ can eject electrons from a metal surface only if $\nu$ exceeds a threshold frequency $\nu_0$, regardless of intensity. This is explained by treating light as a stream of photons, each carrying energy:

#### Photon Energy

$$E = h\nu = \hbar\omega$$

where:

- $h = 6.626 \times 10^{-34}$ J$\cdot$s is Planck's constant
- $\hbar = h/(2\pi)$ is the reduced Planck constant
- $\nu$ is the frequency and $\omega = 2\pi\nu$ is the angular frequency

Each photon also carries momentum $p = h/\lambda = \hbar k$, where $\lambda$ is the wavelength and $k = 2\pi/\lambda$ is the wave number. The photon is thus characterized by both wave parameters ($\nu$, $\lambda$) and particle parameters ($E$, $p$), linked by Planck's constant.

| Experiment | Reveals | Behavior |
|---|---|---|
| Photoelectric effect | Particle nature of light | Energy quantized as $E = h\nu$ |
| Compton scattering | Particle nature of light | Photon carries momentum $p = h/\lambda$ |
| Double-slit (low intensity) | Wave nature of particles | Single-particle interference |
| Electron diffraction | Wave nature of particles | Bragg condition satisfied by matter waves |
| Which-path detection | Complementarity | Interference destroyed by measurement |

Wave-particle duality is not merely a philosophical curiosity—it is the physical foundation of quantum superposition and interference, the two resources that quantum algorithms exploit.

## De Broglie Wavelength

In 1924, Louis de Broglie proposed that the wave-particle duality observed for photons extends to all matter. A particle with momentum $p$ has an associated wavelength:

#### De Broglie Relation

$$\lambda = \frac{h}{p}$$

where:

- $\lambda$ is the de Broglie wavelength
- $h$ is Planck's constant
- $p = mv$ is the momentum (for a non-relativistic particle of mass $m$ and velocity $v$)

**Derivation from relativistic energy-momentum relations.** For a photon, the energy-momentum relation gives $E = pc$, and the Planck-Einstein relation gives $E = h\nu = hc/\lambda$. Equating: $pc = hc/\lambda$, so $\lambda = h/p$. De Broglie's insight was to postulate that this same relation holds for massive particles.

For a free particle with kinetic energy $K$, the de Broglie wavelength becomes:

$$\lambda = \frac{h}{\sqrt{2mK}}$$

**Connection to the momentum operator.** In the position representation of quantum mechanics, the momentum operator is $\hat{p} = -i\hbar \frac{d}{dx}$. A plane wave $\psi(x) = e^{ikx}$ is an eigenstate of this operator with eigenvalue $\hbar k = h/\lambda = p$, confirming the de Broglie relation at the operator level. The wave function of a free particle with definite momentum $p$ is thus a plane wave with wavelength $\lambda = h/p$.

**Experimental confirmation.** The Davisson-Germer experiment (1927) confirmed de Broglie's hypothesis by observing electron diffraction from a nickel crystal. The diffraction pattern matched the prediction for waves of wavelength $\lambda = h/p$, with $p$ determined by the accelerating voltage.

**Relevance to computing.** The de Broglie wavelength sets a fundamental scale for quantum effects in solid-state devices. When the feature size of a transistor approaches the de Broglie wavelength of the charge carriers ($\lambda \sim 10$ nm for electrons in silicon at room temperature), quantum tunneling and confinement effects become significant—a fact discussed in the context of beyond-CMOS devices in earlier chapters.

## Superposition Principle

The **superposition principle** is the cornerstone of quantum mechanics and the primary resource for quantum computation. It states that if $|\psi_1\rangle$ and $|\psi_2\rangle$ are valid states of a quantum system, then any linear combination

#### Superposition of States

$$|\psi\rangle = \alpha|\psi_1\rangle + \beta|\psi_2\rangle$$

where:

- $\alpha, \beta \in \mathbb{C}$ are complex amplitudes
- $|\alpha|^2 + |\beta|^2 = 1$ enforces normalization (assuming $|\psi_1\rangle$ and $|\psi_2\rangle$ are orthonormal)

is also a valid state of the system. More generally, for a countable orthonormal basis $\{|n\rangle\}$, any state can be expanded as:

$$|\psi\rangle = \sum_n c_n |n\rangle, \qquad \sum_n |c_n|^2 = 1$$

This is a direct consequence of the linearity of quantum mechanics: the state space is a vector space over $\mathbb{C}$ (as defined in [Chapter 1, Section 4](../01-mathematical-foundations/index.md#4-vector-spaces)), and all physical operations (time evolution, measurements) are linear maps on this space.

**Interference effects.** Superposition leads to interference because probabilities are computed from the squared modulus of amplitudes, not from the amplitudes themselves. Consider a system in state $|\psi\rangle = \alpha|1\rangle + \beta|2\rangle$ and a measurement that projects onto some state $|f\rangle$. The probability of outcome $f$ is:

$$P(f) = |\langle f|\psi\rangle|^2 = |\alpha\langle f|1\rangle + \beta\langle f|2\rangle|^2 = |\alpha|^2|\langle f|1\rangle|^2 + |\beta|^2|\langle f|2\rangle|^2 + 2\operatorname{Re}[\alpha^*\beta\langle 1|f\rangle\langle f|2\rangle]$$

The first two terms are the classical probabilities for each path. The third term is the **interference term**, which can be positive (constructive interference) or negative (destructive interference) depending on the relative phase between $\alpha$ and $\beta$. This interference term has no classical analogue and is the mechanism by which quantum algorithms amplify correct answers while suppressing incorrect ones.

**Mathematical formulation.** The superposition principle is formalized by requiring that the state space of a quantum system be a complex Hilbert space (see below). The linearity of the Schrodinger equation (Section 15) guarantees that superposition is preserved under time evolution.

## Dirac Notation

**Dirac notation** (bra-ket notation) is the standard language of quantum mechanics and quantum computing. It provides a compact, basis-independent notation for states, dual vectors, inner products, and operators. It was introduced by Paul Dirac in 1939 and is built on the linear algebra of [Chapter 1](../01-mathematical-foundations/index.md).

**Kets.** A quantum state is represented by a **ket** $|\psi\rangle$, which is a vector in a complex Hilbert space $\mathcal{H}$. In the finite-dimensional case ($\mathcal{H} = \mathbb{C}^n$), a ket is a column vector:

$$|\psi\rangle = \begin{pmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{pmatrix}$$

**Bras.** The **bra** $\langle\psi|$ is the dual vector (conjugate transpose) of $|\psi\rangle$. If $|\psi\rangle$ is a column vector, $\langle\psi|$ is the corresponding row vector with complex conjugated entries:

$$\langle\psi| = (c_1^*, c_2^*, \ldots, c_n^*)$$

The bra is an element of the dual space $\mathcal{H}^*$, and the correspondence $|\psi\rangle \mapsto \langle\psi|$ is the antilinear map guaranteed by the Riesz representation theorem (see Section 5 below).

**Bracket (inner product).** The **bracket** $\langle\phi|\psi\rangle$ is the inner product of $|\phi\rangle$ and $|\psi\rangle$, as defined in [Chapter 1, Section 6](../01-mathematical-foundations/index.md#6-inner-product):

#### Inner Product in Dirac Notation

$$\langle\phi|\psi\rangle = \sum_{k=1}^n a_k^* c_k$$

where:

- $|\phi\rangle = \sum_k a_k |k\rangle$ and $|\psi\rangle = \sum_k c_k |k\rangle$ in an orthonormal basis $\{|k\rangle\}$
- The result is a complex scalar
- $\langle\psi|\psi\rangle = \sum_k |c_k|^2 \geq 0$, with equality only for $|\psi\rangle = 0$

**Outer product.** The **outer product** $|\psi\rangle\langle\phi|$ is an operator (linear map) on $\mathcal{H}$, as introduced in [Chapter 1, Section 7](../01-mathematical-foundations/index.md#7-outer-product). It acts on a ket $|\chi\rangle$ by:

$$(|\psi\rangle\langle\phi|)|\chi\rangle = |\psi\rangle(\langle\phi|\chi\rangle) = \langle\phi|\chi\rangle \cdot |\psi\rangle$$

The outer product $|k\rangle\langle k|$ is the **projection operator** onto the state $|k\rangle$.

**Completeness relation.** For any orthonormal basis $\{|k\rangle\}_{k=1}^n$ of $\mathcal{H}$, the identity operator decomposes as:

#### Completeness Relation (Resolution of the Identity)

$$I = \sum_{k=1}^n |k\rangle\langle k|$$

where:

- Each $|k\rangle\langle k|$ is the projector onto the $k$-th basis state
- This holds for any orthonormal basis, not just the computational basis

The completeness relation is the fundamental tool for inserting identities, changing bases, and deriving matrix representations of operators. For an operator $A$, its matrix elements in basis $\{|k\rangle\}$ are $A_{jk} = \langle j|A|k\rangle$, and we can write:

$$A = \sum_{j,k} |j\rangle\langle j|A|k\rangle\langle k| = \sum_{j,k} A_{jk}\,|j\rangle\langle k|$$

**Operator representation.** Any linear operator $A$ on $\mathcal{H}$ can be expressed in terms of its eigenstates via the spectral decomposition ([Chapter 1, Section 14](../01-mathematical-foundations/index.md#14-spectral-decomposition)). If $A$ is Hermitian with eigenvalues $\{a_k\}$ and orthonormal eigenstates $\{|a_k\rangle\}$:

$$A = \sum_k a_k |a_k\rangle\langle a_k|$$

This representation connects the abstract Dirac notation to the spectral decomposition and is the basis for the measurement formalism developed later in this chapter.

| Dirac Symbol | Name | Mathematical Object | Matrix Representation |
|---|---|---|---|
| $\|\psi\rangle$ | Ket | Vector in $\mathcal{H}$ | Column vector |
| $\langle\psi\|$ | Bra | Dual vector in $\mathcal{H}^*$ | Row vector (conjugate transpose) |
| $\langle\phi\|\psi\rangle$ | Bracket | Inner product (scalar) | $\phi^\dagger \psi$ |
| $\|\psi\rangle\langle\phi\|$ | Outer product | Operator on $\mathcal{H}$ | $\psi\phi^\dagger$ (matrix) |
| $\langle\psi\|A\|\phi\rangle$ | Matrix element | Scalar | $\psi^\dagger A \phi$ |

## Hilbert Space

A **Hilbert space** $\mathcal{H}$ is a complete inner product space over the complex numbers. It provides the mathematical arena in which quantum mechanics takes place. The concept extends the vector spaces of [Chapter 1, Section 4](../01-mathematical-foundations/index.md#4-vector-spaces) and the inner products of [Chapter 1, Section 6](../01-mathematical-foundations/index.md#6-inner-product) by adding the crucial requirement of completeness.

**Definition.** A Hilbert space is a complex vector space $\mathcal{H}$ equipped with an inner product $\langle \cdot | \cdot \rangle : \mathcal{H} \times \mathcal{H} \to \mathbb{C}$ that satisfies the following axioms:

#### Inner Product Axioms

$$\text{(i)}\ \langle\phi|\psi\rangle = \langle\psi|\phi\rangle^* \quad\text{(conjugate symmetry)}$$

$$\text{(ii)}\ \langle\phi|\alpha\psi_1 + \beta\psi_2\rangle = \alpha\langle\phi|\psi_1\rangle + \beta\langle\phi|\psi_2\rangle \quad\text{(linearity in second argument)}$$

$$\text{(iii)}\ \langle\psi|\psi\rangle \geq 0,\ \text{with equality iff}\ |\psi\rangle = 0 \quad\text{(positive definiteness)}$$

where:

- Axioms (i) and (ii) together imply antilinearity in the first argument: $\langle\alpha\phi|\psi\rangle = \alpha^*\langle\phi|\psi\rangle$
- The norm is defined as $\||\psi\rangle\| = \sqrt{\langle\psi|\psi\rangle}$
- Note: the physics convention places linearity in the second (ket) argument, opposite to the mathematics convention

**Completeness.** The inner product induces a norm $\|\cdot\|$, which in turn induces a metric $d(|\psi\rangle, |\phi\rangle) = \||\psi\rangle - |\phi\rangle\|$. Completeness requires that every Cauchy sequence in $\mathcal{H}$ (with respect to this metric) converges to a limit in $\mathcal{H}$. This technical condition ensures that infinite series of vectors (such as the expansion of a state in a countable basis) are well-defined.

**Separability.** A Hilbert space is **separable** if it admits a countable orthonormal basis. All Hilbert spaces encountered in non-relativistic quantum mechanics are separable.

**Key examples:**

1. **$\mathbb{C}^n$ (finite-dimensional).** The Hilbert space of an $n$-level quantum system. The inner product is $\langle\phi|\psi\rangle = \sum_{k=1}^n \phi_k^* \psi_k$. For quantum computing, $n = 2^N$ where $N$ is the number of qubits. Completeness is automatic in finite dimensions.

2. **$L^2(\mathbb{R})$ (infinite-dimensional).** The Hilbert space of square-integrable functions on $\mathbb{R}$, used for continuous-variable quantum mechanics (e.g., position and momentum of a particle). The inner product is $\langle\phi|\psi\rangle = \int_{-\infty}^{\infty} \phi^*(x)\psi(x)\,dx$. Completeness is the content of the Riesz-Fischer theorem.

3. **$\ell^2$ (sequence space).** The space of square-summable complex sequences $\{c_n\}$ with $\sum_n |c_n|^2 < \infty$. This is isomorphic to $L^2(\mathbb{R})$ via a choice of orthonormal basis.

| Property | $\mathbb{C}^n$ | $L^2(\mathbb{R})$ |
|---|---|---|
| Dimension | Finite ($n$) | Countably infinite |
| Basis | $\{|1\rangle, \ldots, |n\rangle\}$ | $\{|n\rangle\}_{n=0}^{\infty}$ (e.g., Hermite functions) |
| Completeness | Automatic | Riesz-Fischer theorem |
| Inner product | $\sum_k \phi_k^* \psi_k$ | $\int \phi^*(x)\psi(x)\,dx$ |
| Typical use | Qubit systems | Position/momentum of particles |
| Relevance to QC | Primary (discrete quantum computing) | Secondary (continuous-variable QC) |

For the remainder of this textbook, we work almost exclusively with finite-dimensional Hilbert spaces $\mathbb{C}^{2^N}$, where the linear algebra of [Chapter 1](../01-mathematical-foundations/index.md) applies directly without the analytic subtleties of infinite dimensions.

## State Vector

The first postulate of quantum mechanics specifies how physical states are represented mathematically.

!!! note "Postulate 1: State Space"
    The state of a closed quantum system is described by a unit vector $|\psi\rangle$ in a complex Hilbert space $\mathcal{H}$, called the **state vector** or **state ket**.

**Normalization.** The state vector must satisfy:

#### Normalization Condition

$$\langle\psi|\psi\rangle = 1$$

where:

- This ensures that the total probability of all measurement outcomes sums to 1 (via the Born rule)
- If a vector $|\tilde{\psi}\rangle$ is not normalized, the corresponding physical state is $|\psi\rangle = |\tilde{\psi}\rangle / \||\tilde{\psi}\rangle\|$

**Ray equivalence.** Two state vectors that differ by a global phase factor $e^{i\gamma}$ ($\gamma \in \mathbb{R}$) represent the same physical state, because all measurable quantities (probabilities, expectation values) depend on $|\psi\rangle$ only through expressions of the form $|\langle\phi|\psi\rangle|^2$ or $\langle\psi|A|\psi\rangle$, both of which are invariant under $|\psi\rangle \to e^{i\gamma}|\psi\rangle$.

Formally, a physical state corresponds not to a single vector but to a **ray** in Hilbert space:

$$\text{ray}(|\psi\rangle) = \{e^{i\gamma}|\psi\rangle : \gamma \in \mathbb{R}\}$$

**Projective Hilbert space.** The space of all physical states is thus the **projective Hilbert space** $\mathbb{P}\mathcal{H}$, defined as the quotient of the unit sphere in $\mathcal{H}$ by the equivalence relation $|\psi\rangle \sim e^{i\gamma}|\psi\rangle$. For a single qubit ($\mathcal{H} = \mathbb{C}^2$), the unit sphere is $S^3 \subset \mathbb{R}^4$, and the quotient $S^3/U(1)$ is the Bloch sphere $S^2$, as developed in detail in [Chapter 8](../08-qubits-and-states/index.md).

For an $n$-dimensional Hilbert space, the projective space $\mathbb{CP}^{n-1}$ has $2(n-1)$ real parameters: $2n$ real parameters from the complex amplitudes, minus 2 for normalization and global phase.

## Quantum Measurement

Measurement in quantum mechanics is fundamentally different from classical measurement. A classical measurement passively reveals a pre-existing property; a quantum measurement actively transforms the state and yields a probabilistic outcome.

!!! note "Postulate 3: Quantum Measurement"
    Quantum measurements are described by a collection $\{M_m\}$ of **measurement operators** acting on the state space, where the index $m$ labels the possible outcomes. The operators satisfy the completeness relation $\sum_m M_m^\dagger M_m = I$.

For the important special case of **projective measurement** (also called von Neumann measurement), the measurement operators are orthogonal projectors. Given an observable $A$ with spectral decomposition $A = \sum_m a_m P_m$ (where $a_m$ are the distinct eigenvalues and $P_m = \sum_{k \in \text{deg}(m)} |a_m^{(k)}\rangle\langle a_m^{(k)}|$ are the projectors onto the corresponding eigenspaces), the measurement process is:

1. **Outcome:** The result of the measurement is one of the eigenvalues $a_m$.
2. **Probability:** The probability of obtaining outcome $a_m$ is $P(a_m) = \langle\psi|P_m|\psi\rangle$.
3. **Post-measurement state:** If outcome $a_m$ is obtained, the state immediately after measurement is $P_m|\psi\rangle / \sqrt{P(a_m)}$.

The eigenvalues of $A$ are real (because $A$ is Hermitian, as established in [Chapter 1, Section 12](../01-mathematical-foundations/index.md#12-hermitian-matrices)), ensuring that measurement outcomes are real numbers as required by physical observables.

**Von Neumann measurement postulate.** John von Neumann formalized the measurement process by requiring that observables correspond to Hermitian operators and that the measurement device projects the system state onto an eigenstate of the observable. This is the projective measurement described above. More general measurements (POVMs) exist but projective measurements suffice for the foundations and for the standard quantum circuit model.

## Born Rule

The **Born rule** is the bridge between the mathematical formalism of quantum mechanics and experimental predictions. It gives the probability of obtaining a particular measurement outcome.

!!! note "Postulate 2: Born Rule"
    If a system is in state $|\psi\rangle$ and we measure an observable with eigenstate $|\phi\rangle$, the probability of obtaining the corresponding outcome is $P = |\langle\phi|\psi\rangle|^2$.

#### Born Rule

$$P(\phi) = |\langle\phi|\psi\rangle|^2$$

where:

- $|\psi\rangle$ is the current state of the system (normalized)
- $|\phi\rangle$ is the eigenstate associated with the measurement outcome
- $\langle\phi|\psi\rangle$ is the probability amplitude (a complex number)
- $|\cdot|^2$ denotes the modulus squared

**Derivation from the measurement postulate.** For an observable $A = \sum_m a_m |a_m\rangle\langle a_m|$ (assuming non-degenerate eigenvalues for simplicity), the projector onto eigenvalue $a_m$ is $P_m = |a_m\rangle\langle a_m|$. The probability of outcome $a_m$ is:

$$P(a_m) = \langle\psi|P_m|\psi\rangle = \langle\psi|a_m\rangle\langle a_m|\psi\rangle = |\langle a_m|\psi\rangle|^2$$

This derivation shows that the Born rule is a direct consequence of the measurement postulate together with the properties of projection operators.

**Expectation value.** The average value of observable $A$ over many measurements on identically prepared states is:

#### Expectation Value

$$\langle A \rangle = \langle\psi|A|\psi\rangle = \sum_m a_m |\langle a_m|\psi\rangle|^2$$

where:

- The second equality follows from inserting the spectral decomposition $A = \sum_m a_m |a_m\rangle\langle a_m|$
- Each term $a_m |\langle a_m|\psi\rangle|^2$ is the eigenvalue weighted by the Born rule probability

**Physical interpretation.** The Born rule introduces fundamental indeterminacy into physics: even with complete knowledge of the quantum state $|\psi\rangle$, one can only predict the probabilities of measurement outcomes, not which specific outcome will occur. This is not a limitation of our knowledge (as in classical statistical mechanics) but a feature of nature. The Born rule was introduced by Max Born in 1926 as an interpretation of Schrodinger's wave function, earning him the 1954 Nobel Prize.

## Wave Function Collapse

When a measurement is performed and a particular outcome is obtained, the quantum state changes discontinuously. This process is called **wave function collapse** (or state reduction).

**State update rule.** If a system in state $|\psi\rangle$ is subjected to a projective measurement of observable $A = \sum_m a_m P_m$ and outcome $a_m$ is obtained, the post-measurement state is:

#### Projection Postulate (State Update)

$$|\psi\rangle \xrightarrow{\text{outcome } a_m} \frac{P_m|\psi\rangle}{\sqrt{\langle\psi|P_m|\psi\rangle}}$$

where:

- $P_m$ is the projector onto the eigenspace of $a_m$
- The denominator ensures normalization of the post-measurement state
- For non-degenerate eigenvalues, $P_m = |a_m\rangle\langle a_m|$ and the post-measurement state is simply $|a_m\rangle$ (up to global phase)

**Non-unitary nature.** Wave function collapse is fundamentally different from the unitary time evolution described by the Schrodinger equation. Time evolution is deterministic, linear, and reversible (unitary); collapse is probabilistic, nonlinear, and irreversible. Specifically, the projection $|\psi\rangle \to P_m|\psi\rangle / \|P_m|\psi\rangle\|$ is not a unitary operation because:

1. It is not deterministic—different outcomes yield different post-measurement states.
2. It is not reversible—the information about the pre-measurement amplitudes for other eigenvalues is lost.
3. It does not preserve the inner product between distinct pre-measurement states.

**Measurement back-action.** Collapse means that measurement disturbs the system. After measuring $A$ and obtaining eigenvalue $a_m$, the system is in eigenstate $|a_m\rangle$. A subsequent measurement of a different observable $B$ that does not commute with $A$ (i.e., $[A, B] \neq 0$) will generally disturb the $A$-eigenstate, so a follow-up measurement of $A$ may yield a different result. This measurement back-action is the physical content of the Heisenberg uncertainty principle, which we prove rigorously in Section 10.

**Repeated measurements.** An immediate consequence of the projection postulate is that repeated measurement of the same observable yields the same result: once $|\psi\rangle$ has collapsed to $|a_m\rangle$, the probability of again obtaining $a_m$ is $|\langle a_m|a_m\rangle|^2 = 1$. This property is called the **reproducibility** of quantum measurements.

#### Diagram: Quantum Measurement and Collapse Simulator

<iframe src="../../sims/quantum-measurement-collapse/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Description</summary>
Type: MicroSim
Learning objective: Students can observe how projective measurement collapses a superposition state onto an eigenstate of the measured observable, and how the Born rule governs the statistical distribution of outcomes over many trials.
Visual elements: A Bloch sphere showing the pre-measurement state vector; an axis selector for the measurement basis (X, Y, or Z); an animated collapse of the state vector onto one of the two eigenstates along the chosen axis; a running histogram of measurement outcomes accumulated over many trials; a numerical display comparing the empirical frequencies with the Born rule predictions.
Controls: Sliders for $\theta$ and $\phi$ to set the initial state on the Bloch sphere; dropdown to select measurement basis (X, Y, Z); button "Measure once" to perform a single measurement with animated collapse; button "Measure 100 times" to accumulate statistics; button "Reset" to clear the histogram.
Behavior: Each measurement samples from the Born rule distribution for the chosen basis, animates the Bloch vector snapping to the resulting eigenstate, and adds a count to the histogram. The histogram converges to the theoretical probabilities as the number of trials increases. After each single measurement, the state remains collapsed (subsequent measurements in the same basis always give the same result) until the user resets.
Implementation: p5.js with WEBGL for the 3D Bloch sphere. Responsive design adapts to window resize events.
</details>

## Heisenberg Uncertainty

The **Heisenberg uncertainty principle** places a fundamental limit on the precision with which two non-commuting observables can be simultaneously known. It is not a statement about measurement apparatus limitations but about the intrinsic structure of quantum states.

**Statement.** For any two observables $A$ and $B$ and any state $|\psi\rangle$:

#### Generalized Uncertainty Relation

$$\Delta A \cdot \Delta B \geq \frac{1}{2}|\langle[A, B]\rangle|$$

where:

- $\Delta A = \sqrt{\langle A^2\rangle - \langle A\rangle^2}$ is the standard deviation of $A$ in state $|\psi\rangle$
- $\Delta B = \sqrt{\langle B^2\rangle - \langle B\rangle^2}$ is the standard deviation of $B$ in state $|\psi\rangle$
- $[A, B] = AB - BA$ is the commutator (see Section 11)
- $\langle \cdot \rangle = \langle\psi|\cdot|\psi\rangle$ denotes the expectation value in state $|\psi\rangle$

**Proof from the Cauchy-Schwarz inequality.** Define the shifted operators $\bar{A} = A - \langle A\rangle I$ and $\bar{B} = B - \langle B\rangle I$, so that $(\Delta A)^2 = \langle \bar{A}^2\rangle$ and $(\Delta B)^2 = \langle\bar{B}^2\rangle$. Note that $[\bar{A}, \bar{B}] = [A, B]$.

Define vectors $|f\rangle = \bar{A}|\psi\rangle$ and $|g\rangle = \bar{B}|\psi\rangle$. By the Cauchy-Schwarz inequality (a consequence of the inner product axioms from [Chapter 1, Section 6](../01-mathematical-foundations/index.md#6-inner-product)):

$$\langle f|f\rangle \langle g|g\rangle \geq |\langle f|g\rangle|^2$$

The left side is $(\Delta A)^2 (\Delta B)^2$. For the right side, decompose $\langle f|g\rangle = \langle\psi|\bar{A}\bar{B}|\psi\rangle$ into its real and imaginary parts:

$$\langle\psi|\bar{A}\bar{B}|\psi\rangle = \frac{1}{2}\langle\psi|\{\bar{A},\bar{B}\}|\psi\rangle + \frac{1}{2}\langle\psi|[\bar{A},\bar{B}]|\psi\rangle$$

where $\{A, B\} = AB + BA$ is the anticommutator. The first term is real (since $\{\bar{A}, \bar{B}\}$ is Hermitian) and the second is purely imaginary (since $[\bar{A}, \bar{B}]$ is anti-Hermitian when $A$ and $B$ are Hermitian, so $\langle\psi|[\bar{A},\bar{B}]|\psi\rangle$ is purely imaginary). Therefore:

$$|\langle f|g\rangle|^2 = \frac{1}{4}|\langle\{\bar{A},\bar{B}\}\rangle|^2 + \frac{1}{4}|\langle[\bar{A},\bar{B}]\rangle|^2 \geq \frac{1}{4}|\langle[A, B]\rangle|^2$$

Combining: $(\Delta A)^2(\Delta B)^2 \geq \frac{1}{4}|\langle[A,B]\rangle|^2$, and taking the square root gives the generalized uncertainty relation. $\square$

**Position-momentum uncertainty.** For the canonical pair $\hat{x}$ and $\hat{p}$ with $[\hat{x}, \hat{p}] = i\hbar$ (see Section 11):

#### Position-Momentum Uncertainty Principle

$$\Delta x \cdot \Delta p \geq \frac{\hbar}{2}$$

where:

- $\hbar = 1.055 \times 10^{-34}$ J$\cdot$s
- This bound is saturated by Gaussian wave packets (coherent states)

The position-momentum uncertainty relation has profound implications: it means there is no quantum state with simultaneously definite position and momentum. This is not a consequence of measurement disturbance but of the mathematical structure of the Hilbert space—the position and momentum eigenstates are simply incompatible bases.

## Commutator Relations

The **commutator** of two operators is a fundamental algebraic structure in quantum mechanics that determines whether observables can be simultaneously measured and quantifies the uncertainty relations.

**Definition.** For linear operators $A$ and $B$ on a Hilbert space:

#### Commutator Definition

$$[A, B] = AB - BA$$

where:

- $[A, B] = 0$ means $A$ and $B$ **commute**
- $[A, B] \neq 0$ means $A$ and $B$ are **incompatible** observables

**Properties of the commutator:**

| Property | Statement |
|---|---|
| Antisymmetry | $[A, B] = -[B, A]$ |
| Linearity | $[A, \alpha B + \beta C] = \alpha[A, B] + \beta[A, C]$ |
| Leibniz (product) rule | $[A, BC] = [A, B]C + B[A, C]$ |
| Jacobi identity | $[A, [B, C]] + [B, [C, A]] + [C, [A, B]] = 0$ |
| Hermitian conjugate | $[A, B]^\dagger = [B^\dagger, A^\dagger]$ |

**Canonical commutation relation.** The position and momentum operators satisfy:

#### Canonical Commutation Relation

$$[\hat{x}, \hat{p}] = i\hbar$$

where:

- $\hat{x}$ is the position operator
- $\hat{p} = -i\hbar \frac{d}{dx}$ is the momentum operator (in position representation)
- This relation is the quantum analogue of the classical Poisson bracket $\{x, p\} = 1$

**Verification.** Acting on an arbitrary wave function $\psi(x)$:

$$[\hat{x}, \hat{p}]\psi(x) = \hat{x}\hat{p}\psi - \hat{p}\hat{x}\psi = x\left(-i\hbar\frac{d\psi}{dx}\right) - \left(-i\hbar\frac{d}{dx}\right)(x\psi)$$

$$= -i\hbar x\frac{d\psi}{dx} + i\hbar\left(\psi + x\frac{d\psi}{dx}\right) = i\hbar\psi(x)$$

Since this holds for all $\psi(x)$, we have $[\hat{x}, \hat{p}] = i\hbar I$.

**Implications for simultaneous measurability.** Two observables $A$ and $B$ can be simultaneously measured with arbitrary precision if and only if $[A, B] = 0$. When the commutator vanishes, $A$ and $B$ share a common eigenbasis (this follows from the spectral theorem for commuting Hermitian operators), and a state can be prepared that is simultaneously an eigenstate of both. When $[A, B] \neq 0$, the generalized uncertainty relation (Section 10) imposes a nonzero lower bound on $\Delta A \cdot \Delta B$, meaning no state exists with simultaneously sharp values for both observables.

**Example: Pauli matrices.** The Pauli operators, which are central to qubit physics in [Chapter 8](../08-qubits-and-states/index.md), satisfy the commutation relations:

$$[X, Y] = 2iZ, \qquad [Y, Z] = 2iX, \qquad [Z, X] = 2iY$$

or compactly $[\sigma_j, \sigma_k] = 2i\epsilon_{jkl}\sigma_l$, where $\epsilon_{jkl}$ is the Levi-Civita symbol. Since no two Pauli operators commute, the corresponding observables (spin components along the three axes) cannot be simultaneously sharp—a fact we will exploit in Chapter 8 when discussing qubit measurements in different bases.

## Density Matrix

The **density matrix** (or density operator) formalism extends quantum mechanics to handle situations where the system state is not known with certainty. While the state vector formalism of Sections 6--9 describes **pure states** (maximal knowledge of the system), the density matrix can also describe **mixed states** (statistical uncertainty about which pure state the system is in).

**Definition for pure states.** A pure state $|\psi\rangle$ is equivalently described by the density matrix:

#### Density Matrix for Pure State

$$\rho = |\psi\rangle\langle\psi|$$

where:

- $\rho$ is a linear operator on $\mathcal{H}$ (an $n \times n$ matrix for $\mathcal{H} = \mathbb{C}^n$)
- This is the outer product (projection operator) introduced in the Dirac notation section

**Properties.** The density matrix of any valid quantum state (pure or mixed) satisfies three properties:

#### Density Matrix Properties

$$\text{(i)}\ \rho^\dagger = \rho \quad\text{(Hermitian)}$$

$$\text{(ii)}\ \rho \geq 0 \quad\text{(positive semi-definite: all eigenvalues } \geq 0\text{)}$$

$$\text{(iii)}\ \operatorname{Tr}(\rho) = 1 \quad\text{(unit trace)}$$

where:

- Hermiticity ensures that expectation values are real
- Positive semi-definiteness ensures that probabilities are non-negative
- Unit trace ensures that probabilities sum to 1
- Conversely, any operator satisfying (i)--(iii) is a valid density matrix

**Proof for pure states.** For $\rho = |\psi\rangle\langle\psi|$:

- Hermiticity: $(|\psi\rangle\langle\psi|)^\dagger = |\psi\rangle\langle\psi|$ (since $(|a\rangle\langle b|)^\dagger = |b\rangle\langle a|$).
- Positive semi-definiteness: $\langle\phi|\rho|\phi\rangle = \langle\phi|\psi\rangle\langle\psi|\phi\rangle = |\langle\phi|\psi\rangle|^2 \geq 0$ for all $|\phi\rangle$.
- Unit trace: $\operatorname{Tr}(\rho) = \sum_k \langle k|\psi\rangle\langle\psi|k\rangle = \sum_k |\langle k|\psi\rangle|^2 = \langle\psi|\psi\rangle = 1$.

**Expectation values.** The density matrix formulation of the Born rule is:

#### Expectation Value via Density Matrix

$$\langle A \rangle = \operatorname{Tr}(\rho A)$$

where:

- This formula holds for both pure and mixed states
- For a pure state: $\operatorname{Tr}(|\psi\rangle\langle\psi|A) = \langle\psi|A|\psi\rangle$, recovering the standard formula

**Proof.** Expanding in an orthonormal basis:

$$\operatorname{Tr}(\rho A) = \sum_k \langle k|\rho A|k\rangle = \sum_k \langle k|\psi\rangle\langle\psi|A|k\rangle = \langle\psi|A\left(\sum_k |k\rangle\langle k|\right)|\psi\rangle = \langle\psi|A|\psi\rangle$$

where we used the completeness relation in the last step.

**Measurement probabilities.** The probability of outcome $m$ in a projective measurement is:

$$P(m) = \operatorname{Tr}(\rho P_m) = \operatorname{Tr}(P_m \rho P_m)$$

and the post-measurement state is:

$$\rho \to \frac{P_m \rho P_m}{\operatorname{Tr}(P_m \rho)}$$

This generalizes the projection postulate of Section 9 to density matrices and will be the standard formulation used in quantum error correction (Chapter 11).

## Pure And Mixed States

The density matrix formalism reveals a fundamental distinction between two types of quantum states.

**Pure states.** A state is **pure** if there exists a state vector $|\psi\rangle$ such that $\rho = |\psi\rangle\langle\psi|$. For a pure state, the density matrix is an idempotent projector: $\rho^2 = \rho$. The system has maximum quantum coherence, and the state is determined as precisely as quantum mechanics allows.

**Mixed states.** A state is **mixed** if it cannot be written as a single outer product. Mixed states arise from classical (statistical) uncertainty about which pure state the system is in. A mixed state is described by a statistical ensemble $\{(p_i, |\psi_i\rangle)\}$:

#### Mixed State Density Matrix

$$\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|$$

where:

- $p_i \geq 0$ are classical probabilities with $\sum_i p_i = 1$
- $|\psi_i\rangle$ are (not necessarily orthogonal) pure states
- The decomposition is not unique: different ensembles can produce the same $\rho$

**Purity.** The **purity** of a quantum state quantifies how close it is to a pure state:

#### Purity

$$\gamma = \operatorname{Tr}(\rho^2)$$

where:

- $\gamma = 1$ if and only if $\rho$ is pure (since $\rho^2 = \rho$ implies $\operatorname{Tr}(\rho^2) = \operatorname{Tr}(\rho) = 1$)
- $1/d \leq \gamma \leq 1$ for a $d$-dimensional system
- $\gamma = 1/d$ for the maximally mixed state $\rho = I/d$

**Proof that $\gamma = 1$ implies pure state.** Let $\rho$ have eigenvalues $\{r_i\}$ with $\sum_i r_i = 1$ and $r_i \geq 0$. Then $\operatorname{Tr}(\rho^2) = \sum_i r_i^2$. By convexity of $x^2$, $\sum_i r_i^2 \leq (\sum_i r_i)^2 = 1$ with equality if and only if exactly one $r_i = 1$ and the rest are zero—i.e., $\rho$ is a rank-1 projector (pure state). $\square$

**Von Neumann entropy.** The quantum analogue of the Shannon entropy measures the degree of mixedness:

#### Von Neumann Entropy

$$S(\rho) = -\operatorname{Tr}(\rho \ln \rho) = -\sum_i r_i \ln r_i$$

where:

- $r_i$ are the eigenvalues of $\rho$
- $S = 0$ for pure states (all information is quantum)
- $S = \ln d$ for the maximally mixed state in $d$ dimensions
- The convention $0 \ln 0 = 0$ is used
- When the base-2 logarithm is used, $S$ is measured in bits; with the natural logarithm, in nats

**Statistical ensembles.** Mixed states arise naturally in several physical situations:

1. **Subsystem of an entangled state:** Tracing over one part of an entangled bipartite state yields a mixed reduced density matrix (as detailed in [Chapter 8](../08-qubits-and-states/index.md)).
2. **Imperfect state preparation:** If a source produces state $|\psi_i\rangle$ with probability $p_i$, the average description is the mixed state $\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|$.
3. **Decoherence:** Interaction with the environment entangles the system with unobserved degrees of freedom, causing the system's state to become mixed.

| Property | Pure State | Mixed State |
|---|---|---|
| Density matrix | $\rho = \|\psi\rangle\langle\psi\|$ | $\rho = \sum_i p_i \|\psi_i\rangle\langle\psi_i\|$ |
| Rank | 1 | $> 1$ |
| Idempotency | $\rho^2 = \rho$ | $\rho^2 \neq \rho$ |
| Purity $\operatorname{Tr}(\rho^2)$ | $1$ | $< 1$ |
| Von Neumann entropy | $0$ | $> 0$ |
| State vector description | Yes ($\|\psi\rangle$) | No |
| Bloch vector (qubit) | On surface ($\|\vec{n}\| = 1$) | Interior ($\|\vec{n}\| < 1$) |

## Time Evolution Operator

The dynamics of a closed quantum system are governed by a unitary operator that maps the state at one time to the state at a later time.

!!! note "Postulate 4: Time Evolution"
    The evolution of a closed quantum system from time $t_0$ to time $t$ is described by a unitary operator $U(t, t_0)$ such that $|\psi(t)\rangle = U(t, t_0)|\psi(t_0)\rangle$.

For a system with a **time-independent Hamiltonian** $H$:

#### Time Evolution Operator

$$U(t) = e^{-iHt/\hbar}$$

where:

- $H$ is the Hamiltonian (a Hermitian operator representing the total energy)
- $t$ is the elapsed time (we set $t_0 = 0$ without loss of generality)
- The matrix exponential is defined by the power series: $e^{-iHt/\hbar} = \sum_{n=0}^{\infty} \frac{1}{n!}\left(\frac{-iHt}{\hbar}\right)^n$

**Unitarity proof.** We must show that $U(t)^\dagger U(t) = I$. Using $H^\dagger = H$ (Hermiticity of the Hamiltonian, as established in [Chapter 1, Section 12](../01-mathematical-foundations/index.md#12-hermitian-matrices)):

$$U(t)^\dagger = \left(e^{-iHt/\hbar}\right)^\dagger = e^{(iHt/\hbar)^\dagger} = e^{-iH^\dagger t/\hbar \cdot (-1)} = e^{iHt/\hbar}$$

Wait—more carefully, $(e^{A})^\dagger = e^{A^\dagger}$ for any operator $A$. Since $(-iHt/\hbar)^\dagger = (iH^\dagger t/\hbar) = iHt/\hbar$, we have:

$$U(t)^\dagger U(t) = e^{iHt/\hbar} e^{-iHt/\hbar} = e^{iHt/\hbar - iHt/\hbar} = e^0 = I$$

where the third equality uses the fact that $iHt/\hbar$ and $-iHt/\hbar$ commute (any operator commutes with itself). Therefore $U(t)$ is unitary. $\square$

The unitarity of time evolution has several profound consequences:

1. **Probability conservation:** Since $\langle\psi(t)|\psi(t)\rangle = \langle\psi(0)|U^\dagger U|\psi(0)\rangle = \langle\psi(0)|\psi(0)\rangle = 1$, normalization is preserved.
2. **Reversibility:** The inverse evolution is $U(t)^{-1} = U(t)^\dagger = e^{iHt/\hbar} = U(-t)$, corresponding to time reversal.
3. **Inner product preservation:** $\langle\phi(t)|\psi(t)\rangle = \langle\phi(0)|U^\dagger U|\psi(0)\rangle = \langle\phi(0)|\psi(0)\rangle$, so the overlap between any two states is constant.

**Spectral form.** Using the spectral decomposition $H = \sum_n E_n |E_n\rangle\langle E_n|$, the time evolution operator becomes:

$$U(t) = \sum_n e^{-iE_n t/\hbar} |E_n\rangle\langle E_n|$$

This shows that time evolution multiplies each energy eigenstate by a phase $e^{-iE_n t/\hbar}$. Different energy eigenstates accumulate phase at different rates, leading to time-dependent interference effects.

**Time-dependent Hamiltonian.** When $H = H(t)$ depends on time, the time evolution operator becomes:

$$U(t, t_0) = \mathcal{T}\exp\left(-\frac{i}{\hbar}\int_{t_0}^{t} H(t')\,dt'\right)$$

where $\mathcal{T}$ denotes the **time-ordering operator**, which arranges operators at later times to the left. The time-ordering is necessary because $H(t_1)$ and $H(t_2)$ may not commute at different times. If $[H(t_1), H(t_2)] = 0$ for all $t_1, t_2$, the time-ordering becomes unnecessary and $U$ reduces to the ordinary exponential of the integrated Hamiltonian.

## Schrodinger Equation

The **Schrodinger equation** is the fundamental equation of motion for quantum mechanics, governing how the state of a system changes with time.

**Time-dependent Schrodinger equation.** Differentiating $|\psi(t)\rangle = U(t)|\psi(0)\rangle = e^{-iHt/\hbar}|\psi(0)\rangle$ with respect to $t$:

$$\frac{d}{dt}|\psi(t)\rangle = \frac{-iH}{\hbar}e^{-iHt/\hbar}|\psi(0)\rangle = \frac{-iH}{\hbar}|\psi(t)\rangle$$

Rearranging:

#### Time-Dependent Schrodinger Equation

$$i\hbar\frac{d}{dt}|\psi(t)\rangle = H|\psi(t)\rangle$$

where:

- $H$ is the Hamiltonian operator (total energy observable)
- $|\psi(t)\rangle$ is the state vector at time $t$
- This is a first-order linear ordinary differential equation in $t$
- The initial condition $|\psi(0)\rangle$ uniquely determines the solution for all $t$

The Schrodinger equation is the quantum analogue of Hamilton's equations in classical mechanics. Its linearity guarantees that the superposition principle is preserved under time evolution.

**Time-independent Schrodinger equation.** For a time-independent Hamiltonian, we seek solutions of the form $|\psi(t)\rangle = e^{-iEt/\hbar}|\phi\rangle$, where $|\phi\rangle$ does not depend on $t$. Substituting into the time-dependent equation:

$$i\hbar \cdot \frac{-iE}{\hbar} e^{-iEt/\hbar}|\phi\rangle = H e^{-iEt/\hbar}|\phi\rangle$$

$$E|\phi\rangle = H|\phi\rangle$$

#### Time-Independent Schrodinger Equation

$$H|E_n\rangle = E_n|E_n\rangle$$

where:

- This is the eigenvalue equation for the Hamiltonian ([Chapter 1, Section 9](../01-mathematical-foundations/index.md#9-eigenvalues))
- $E_n$ are the energy eigenvalues (the allowed energies of the system)
- $|E_n\rangle$ are the corresponding energy eigenstates

**Energy eigenstates and stationary states.** The solutions $|\psi_n(t)\rangle = e^{-iE_n t/\hbar}|E_n\rangle$ are called **stationary states** because their probability distributions are time-independent:

$$P_n(m, t) = |\langle m|\psi_n(t)\rangle|^2 = |e^{-iE_n t/\hbar}|^2 |\langle m|E_n\rangle|^2 = |\langle m|E_n\rangle|^2$$

The time-dependent phase factor $e^{-iE_n t/\hbar}$ is a global phase and has no observable effect. Stationary states are the quantum analogues of equilibrium states in classical mechanics.

**General solution.** By the superposition principle, the most general solution is a linear combination of stationary states:

$$|\psi(t)\rangle = \sum_n c_n e^{-iE_n t/\hbar}|E_n\rangle$$

where $c_n = \langle E_n|\psi(0)\rangle$ are determined by the initial state. Unlike individual stationary states, a superposition of energy eigenstates with different energies exhibits time-dependent behavior because the relative phases $e^{-i(E_n - E_m)t/\hbar}$ between different components evolve at different rates.

**Connection to quantum computing.** In the quantum circuit model, time evolution is replaced by a sequence of discrete unitary gates $U_1, U_2, \ldots, U_L$, each acting on a small number of qubits. The total evolution is $U = U_L \cdots U_2 U_1$. While the Schrodinger equation governs continuous-time evolution of physical quantum systems, the circuit model discretizes this into elementary operations. The equivalence of these viewpoints is guaranteed by the Solovay-Kitaev theorem (Chapter 9), which shows that any unitary can be approximated to arbitrary precision by a finite sequence of gates from a universal gate set.

#### Diagram: Time Evolution of Quantum States

<iframe src="../../sims/schrodinger-time-evolution/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Description</summary>
Type: MicroSim
Learning objective: Students can observe how a superposition of energy eigenstates evolves in time under the Schrodinger equation, and how the relative phase differences between components produce observable dynamics while individual energy eigenstates remain stationary.
Visual elements: A two-level system (qubit) visualized on the Bloch sphere, with the Hamiltonian defining the energy splitting between $|0\rangle$ and $|1\rangle$; a time slider showing the current time; the state vector precessing around the Bloch sphere; a plot of $|\langle 0|\psi(t)\rangle|^2$ and $|\langle 1|\psi(t)\rangle|^2$ versus time; a display of the instantaneous state $|\psi(t)\rangle = c_0(t)|0\rangle + c_1(t)|1\rangle$ with the complex amplitudes shown as rotating phasors.
Controls: Slider for energy splitting $\Delta E = E_1 - E_0$ (controls precession rate); sliders for the initial state angles $\theta$ and $\phi$; play/pause button for continuous time evolution; time slider for manual scrubbing; button to snap to an energy eigenstate (to demonstrate stationarity); speed control for the animation.
Behavior: The Bloch vector precesses around the $z$-axis at angular frequency $\omega = \Delta E/\hbar$. When the initial state is an energy eigenstate ($|0\rangle$ or $|1\rangle$, at the poles), the Bloch vector remains stationary. For any other initial state, the Bloch vector traces a circle at constant latitude, demonstrating that only the relative phase evolves. The probability plot shows sinusoidal oscillation (Rabi oscillation) for superposition states and flat lines for energy eigenstates.
Implementation: p5.js with WEBGL for the 3D Bloch sphere. Responsive design adapts to window resize events.
</details>

## No-Cloning Theorem

The **no-cloning theorem** is a fundamental result in quantum information theory stating that it is impossible to create an exact copy of an arbitrary unknown quantum state. This theorem, proved independently by Wootters and Zurek (1982) and by Dieks (1982), has no classical analogue—classical information can be freely copied—and has profound consequences for quantum computing and quantum communication.

**Statement.** There exists no unitary operator $U$ and no fixed initial state $|s\rangle$ (the "blank" state of the copy register) such that:

$$U(|\psi\rangle \otimes |s\rangle) = |\psi\rangle \otimes |\psi\rangle$$

for all states $|\psi\rangle$.

**Proof by contradiction using linearity and unitarity.** Suppose such a $U$ exists. Let $|\psi\rangle$ and $|\phi\rangle$ be two arbitrary non-identical, non-orthogonal states. By assumption:

$$U(|\psi\rangle \otimes |s\rangle) = |\psi\rangle \otimes |\psi\rangle \tag{1}$$
$$U(|\phi\rangle \otimes |s\rangle) = |\phi\rangle \otimes |\phi\rangle \tag{2}$$

Take the inner product of equations (1) and (2). The left side gives:

$$\langle\psi|\phi\rangle \cdot \langle s|s\rangle = \langle\psi|\phi\rangle \cdot 1 = \langle\psi|\phi\rangle$$

where we used the fact that unitary operators preserve inner products ([Chapter 1, Section 11](../01-mathematical-foundations/index.md#11-unitary-matrices)): $\langle U\alpha|U\beta\rangle = \langle\alpha|\beta\rangle$.

The right side gives:

$$(\langle\psi| \otimes \langle\psi|)(|\phi\rangle \otimes |\phi\rangle) = \langle\psi|\phi\rangle \cdot \langle\psi|\phi\rangle = \langle\psi|\phi\rangle^2$$

Equating left and right sides:

$$\langle\psi|\phi\rangle = \langle\psi|\phi\rangle^2$$

Let $x = \langle\psi|\phi\rangle$. Then $x = x^2$, which implies $x(x - 1) = 0$, so $x = 0$ or $x = 1$. This means $|\psi\rangle$ and $|\phi\rangle$ are either orthogonal ($\langle\psi|\phi\rangle = 0$) or identical ($\langle\psi|\phi\rangle = 1$). Since we assumed they are neither, we have a contradiction. Therefore, no such $U$ exists. $\square$

**Physical significance for quantum information.** The no-cloning theorem has far-reaching consequences:

1. **Quantum error correction must be indirect.** Classical error correction works by copying bits and using majority voting. Quantum error correction cannot copy qubits; instead, it encodes quantum information into entangled states of multiple qubits and uses syndrome measurements that extract error information without revealing the encoded state (Chapter 11).

2. **Quantum cryptography is possible.** The impossibility of cloning quantum states means that an eavesdropper cannot copy a quantum communication without disturbing it. This is the basis of quantum key distribution protocols like BB84 (Chapter 10).

3. **No faster-than-light communication.** If cloning were possible, it could be combined with entanglement to transmit information faster than light, violating special relativity. The no-cloning theorem prevents this.

4. **Quantum information is fragile.** Unlike classical bits, which can be backed up by copying, quantum states cannot be duplicated for safekeeping. Loss of a qubit means irreversible loss of the quantum information it carried.

5. **Measurement limitations.** A single copy of an unknown quantum state does not permit determination of the state. Full state tomography (as discussed in [Chapter 8](../08-qubits-and-states/index.md)) requires many identically prepared copies precisely because each measurement collapses the state, and the no-cloning theorem prevents generating additional copies from the original.

!!! warning "What No-Cloning Does NOT Forbid"
    The no-cloning theorem forbids copying an **unknown** state. It does not prevent: (a) preparing multiple copies of a **known** state (since the preparation procedure can simply be repeated); (b) cloning states from an orthogonal set (since orthogonal states can be distinguished by measurement and then re-prepared); or (c) approximate cloning, which produces imperfect copies with fidelity bounded by $F \leq (d+1)/(d+d)$ for $d$-dimensional states (the Buzek-Hillery optimal cloner).

## Key Takeaways

This chapter established the complete quantum mechanical formalism required for quantum computing:

1. **Wave-particle duality** reveals that quantum objects exhibit both particle and wave behavior, with the double-slit experiment demonstrating single-particle interference and Bohr's complementarity principle governing which aspect is observed.

2. The **de Broglie relation** $\lambda = h/p$ associates a wavelength with every massive particle, connecting the wave and particle descriptions through Planck's constant.

3. The **superposition principle** states that linear combinations of valid quantum states are also valid states, with the interference term $2\operatorname{Re}[\alpha^*\beta\langle 1|f\rangle\langle f|2\rangle]$ providing the mechanism for quantum computational advantage.

4. **Dirac notation** provides a compact formalism: kets $|\psi\rangle$ for states, bras $\langle\psi|$ for dual vectors, brackets $\langle\phi|\psi\rangle$ for inner products, outer products $|\psi\rangle\langle\phi|$ for operators, and the completeness relation $I = \sum_k |k\rangle\langle k|$.

5. The quantum state space is a **Hilbert space**—a complete inner product space over $\mathbb{C}$. For quantum computing, the relevant spaces are $\mathbb{C}^{2^N}$ for $N$ qubits.

6. **State vectors** are unit vectors in Hilbert space, with physical states corresponding to rays (equivalence classes under global phase).

7. **Quantum measurement** is described by the projection postulate: measuring an observable $A$ yields eigenvalue $a_m$ with probability $\langle\psi|P_m|\psi\rangle$ and projects the state onto the corresponding eigenspace.

8. The **Born rule** $P = |\langle\phi|\psi\rangle|^2$ provides the bridge between mathematical amplitudes and experimentally observed probabilities.

9. **Wave function collapse** is a non-unitary, irreversible state transformation triggered by measurement, fundamentally distinct from unitary time evolution.

10. The **Heisenberg uncertainty principle** $\Delta A \cdot \Delta B \geq \frac{1}{2}|\langle[A,B]\rangle|$ is a mathematical theorem following from the Cauchy-Schwarz inequality, with the position-momentum case $\Delta x \cdot \Delta p \geq \hbar/2$ as the most celebrated instance.

11. **Commutator relations** $[A,B] = AB - BA$ determine whether observables are compatible ($[A,B]=0$) or incompatible ($[A,B]\neq 0$), with the canonical relation $[\hat{x},\hat{p}] = i\hbar$ underlying the position-momentum uncertainty.

12. The **density matrix** $\rho$ provides a unified description of quantum states, with expectation values given by $\langle A \rangle = \operatorname{Tr}(\rho A)$ and measurement probabilities by $P(m) = \operatorname{Tr}(\rho P_m)$.

13. **Pure states** ($\rho^2 = \rho$, $S = 0$) represent maximal knowledge; **mixed states** ($\rho^2 \neq \rho$, $S > 0$) represent statistical uncertainty, quantified by purity $\operatorname{Tr}(\rho^2)$ and von Neumann entropy $S = -\operatorname{Tr}(\rho \ln \rho)$.

14. The **time evolution operator** $U(t) = e^{-iHt/\hbar}$ is unitary (proven from the Hermiticity of $H$), preserving probabilities and inner products.

15. The **Schrodinger equation** $i\hbar \frac{d}{dt}|\psi\rangle = H|\psi\rangle$ governs time evolution, with energy eigenstates $H|E_n\rangle = E_n|E_n\rangle$ serving as stationary states and general solutions built from superpositions of these eigenstates.

16. The **no-cloning theorem** proves that no unitary operation can copy an arbitrary unknown quantum state, with consequences for error correction, cryptography, and the fundamental nature of quantum information.

??? question "Concept Check: Why does the no-cloning theorem not contradict the ability to prepare many qubits in the same state?"
    The no-cloning theorem forbids copying an **unknown** state $|\psi\rangle$ by applying a universal unitary to $|\psi\rangle \otimes |s\rangle$. It does not forbid preparing multiple copies of a **known** state. If you know that the desired state is, say, $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$, you can prepare as many copies as you wish by applying the Hadamard gate to fresh $|0\rangle$ qubits. The distinction is between "copying a state you hold but do not know" (forbidden) and "preparing a state from a known classical description" (allowed).
