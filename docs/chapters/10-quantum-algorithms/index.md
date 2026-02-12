---
title: Quantum Algorithms
description: Major quantum algorithms including Deutsch-Jozsa, QFT, Shor's factoring, and Grover's search with rigorous mathematical derivations
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Quantum Algorithms

## Summary

This chapter presents the major quantum algorithms with step-by-step mathematical derivations. We develop quantum parallelism and oracle-based computation, derive the Deutsch-Jozsa, Bernstein-Vazirani, and Simon's algorithms, construct the quantum Fourier transform circuit, prove phase estimation bounds, present Shor's factoring algorithm through period finding and continued fractions, and derive Grover's search algorithm with its optimal quadratic speedup proof.

## Concepts Covered

This chapter covers the following 18 concepts:

1. Quantum Parallelism
2. Quantum Oracle
3. Deutsch's Algorithm
4. Deutsch-Jozsa Algorithm
5. Bernstein-Vazirani Algorithm
6. Simon's Algorithm
7. Quantum Fourier Transform
8. Phase Kickback
9. Quantum Phase Estimation
10. Order Finding
11. Shor's Algorithm
12. Modular Exponentiation
13. Continued Fractions
14. Grover's Algorithm
15. Amplitude Amplification
16. Grover Diffusion Operator
17. Quadratic Speedup
18. Quantum Walk

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Quantum Mechanics Foundations](../07-quantum-mechanics/index.md)
- [Chapter 8: Qubits and Quantum States](../08-qubits-and-states/index.md)
- [Chapter 9: Quantum Gates and Circuits](../09-quantum-gates/index.md)

---

## Introduction

In previous chapters, we constructed the mathematical framework for quantum computation: Hilbert spaces and Dirac notation (Chapter 7), qubits and entanglement (Chapter 8), and the universal gate model (Chapter 9). We now demonstrate why this machinery is computationally powerful by presenting the canonical quantum algorithms that achieve provable speedups over their best known classical counterparts. These algorithms are not merely theoretical curiosities; Shor's factoring algorithm threatens the security of RSA cryptography, and Grover's search algorithm provides a universal quadratic speedup for unstructured search problems. Understanding the mathematical structure of these algorithms---how superposition enables parallelism, how interference amplifies correct answers, and how entanglement correlates registers---is essential for designing new quantum algorithms and assessing the computational landscape of the quantum era.

We organize the chapter by increasing algorithmic complexity. We begin with the foundational concepts of quantum parallelism and oracle-based computation, proceed through the "black-box" algorithms (Deutsch, Deutsch-Jozsa, Bernstein-Vazirani, Simon) that demonstrate exponential query advantages, develop the quantum Fourier transform as the central subroutine for Shor's algorithm, and conclude with Grover's amplitude amplification framework and its optimality. Throughout, we emphasize rigorous derivations using Dirac notation, with every step made explicit.

## Quantum Parallelism

**Quantum parallelism** is the ability of a quantum computer to evaluate a function $f$ on all inputs simultaneously by exploiting superposition. Classically, evaluating $f$ on $N = 2^n$ inputs requires $N$ separate function calls. A quantum computer achieves this evaluation in a single application of a unitary operator.

Consider an $n$-qubit input register initialized in the equal superposition state (obtained by applying $H^{\otimes n}$ to $|0\rangle^{\otimes n}$):

#### Equal Superposition State

$$
H^{\otimes n}|0\rangle^{\otimes n} = \frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n - 1}|x\rangle
$$

where:

- $H$ is the Hadamard gate
- $|x\rangle$ denotes the $n$-qubit computational basis state encoding integer $x$
- The sum runs over all $2^n$ possible $n$-bit strings

Applying the unitary operator $U_f$ (encoding a classical function $f:\{0,1\}^n \to \{0,1\}^m$) to this superposition yields:

#### Quantum Parallel Evaluation

$$
U_f\left(\frac{1}{\sqrt{2^n}}\sum_{x}|x\rangle|0\rangle^{\otimes m}\right) = \frac{1}{\sqrt{2^n}}\sum_{x}|x\rangle|f(x)\rangle
$$

where:

- $U_f|x\rangle|y\rangle = |x\rangle|y \oplus f(x)\rangle$ with $\oplus$ denoting bitwise XOR
- The function $f$ has been evaluated on all $2^n$ inputs simultaneously

The critical subtlety is that quantum parallelism alone does not provide a computational advantage. Measuring the output register yields a single random value $f(x_0)$ for a uniformly random $x_0$, which is no better than classical random sampling. The power of quantum algorithms lies in combining parallelism with **interference** to extract global properties of $f$ (such as periodicity or balance) without needing to learn individual values.

| Property | Classical Evaluation | Quantum Parallel Evaluation |
|----------|---------------------|-----------------------------|
| Function calls required | $2^n$ (for all inputs) | 1 (single $U_f$ application) |
| State after evaluation | One output $f(x)$ per call | Superposition $\sum_x \|x\rangle\|f(x)\rangle$ |
| Extractable information | Individual $f(x)$ values | Global properties of $f$ via interference |
| Measurement outcome | Deterministic $f(x)$ | Random $(x_0, f(x_0))$ pair |
| Useful advantage | None without further processing | Requires interference to exploit |

## Quantum Oracle

A **quantum oracle** (also called a black-box or query operator) is a unitary transformation that encodes a Boolean or integer-valued function while preserving reversibility. The standard oracle model defines two variants.

The **standard oracle** for $f:\{0,1\}^n \to \{0,1\}^m$ acts as:

#### Standard Oracle

$$
O_f|x\rangle|y\rangle = |x\rangle|y \oplus f(x)\rangle
$$

where:

- $|x\rangle$ is the $n$-qubit input register
- $|y\rangle$ is the $m$-qubit output (ancilla) register
- $\oplus$ is bitwise addition modulo 2

The **phase oracle** for $f:\{0,1\}^n \to \{0,1\}$ encodes the function value as a phase:

#### Phase Oracle

$$
O_f^{(\text{phase})}|x\rangle = (-1)^{f(x)}|x\rangle
$$

The phase oracle is obtained from the standard oracle by preparing the ancilla in the $|-\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$ state. This construction exploits the **phase kickback** mechanism (derived in detail later in this chapter): when the target qubit is in $|-\rangle$, the XOR operation produces $|f(x) \oplus 0\rangle - |f(x) \oplus 1\rangle = (-1)^{f(x)}(|0\rangle - |1\rangle)$, and the $(-1)^{f(x)}$ factor "kicks back" to the control register.

Oracle-based algorithms are analyzed in terms of **query complexity**: the number of oracle calls required to determine some property of $f$. This model separates the algorithmic structure from implementation details and provides provable separation results between classical and quantum computation.

## Deutsch's Algorithm

**Deutsch's algorithm** (1985) is the simplest demonstration of a quantum computational advantage. Given a function $f:\{0,1\} \to \{0,1\}$, determine whether $f$ is **constant** ($f(0) = f(1)$) or **balanced** ($f(0) \neq f(1)$). Classically, this requires two queries (evaluate both $f(0)$ and $f(1)$). Deutsch's algorithm requires only one.

**Circuit.** Prepare two qubits in $|0\rangle|1\rangle$, apply $H \otimes H$, apply $U_f$, apply $H$ to the first qubit, and measure the first qubit.

**Derivation.** The initial state is $|\psi_0\rangle = |0\rangle|1\rangle$. After $H \otimes H$:

#### Deutsch's Algorithm: After Hadamard

$$
|\psi_1\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle) \otimes \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle) = |+\rangle|-\rangle
$$

Applying the oracle $U_f$ with the second qubit in $|-\rangle$ produces the phase kickback:

$$
|\psi_2\rangle = \frac{1}{\sqrt{2}}\big((-1)^{f(0)}|0\rangle + (-1)^{f(1)}|1\rangle\big)|-\rangle
$$

Factoring out $(-1)^{f(0)}$:

$$
|\psi_2\rangle = (-1)^{f(0)}\frac{1}{\sqrt{2}}\big(|0\rangle + (-1)^{f(0)\oplus f(1)}|1\rangle\big)|-\rangle
$$

Applying $H$ to the first qubit and using $H|+\rangle = |0\rangle$, $H|-\rangle = |1\rangle$:

#### Deutsch's Algorithm: Final State

$$
|\psi_3\rangle = (-1)^{f(0)}|f(0) \oplus f(1)\rangle|-\rangle
$$

where:

- Measuring the first qubit yields $|0\rangle$ if $f(0) \oplus f(1) = 0$ (constant)
- Measuring the first qubit yields $|1\rangle$ if $f(0) \oplus f(1) = 1$ (balanced)
- The global phase $(-1)^{f(0)}$ is unobservable

The algorithm determines a global property of $f$ using a single query, versus the two queries required classically. While the advantage here is modest (one query versus two), it establishes the paradigm that quantum interference can extract global function properties more efficiently than classical computation.

## Deutsch-Jozsa Algorithm

The **Deutsch-Jozsa algorithm** (1992) generalizes Deutsch's algorithm to $n$-bit inputs. Given $f:\{0,1\}^n \to \{0,1\}$ promised to be either constant (same output for all inputs) or balanced (output 0 for exactly half the inputs and 1 for the other half), determine which case holds. Classically, in the worst case, $2^{n-1} + 1$ queries are needed. The quantum algorithm requires exactly one query.

**Derivation.** The initial state is $|0\rangle^{\otimes n}|1\rangle$. After applying $H^{\otimes (n+1)}$:

$$
|\psi_1\rangle = \frac{1}{\sqrt{2^n}}\sum_{x \in \{0,1\}^n}|x\rangle \otimes |-\rangle
$$

Applying the oracle with the phase kickback technique:

$$
|\psi_2\rangle = \frac{1}{\sqrt{2^n}}\sum_{x}(-1)^{f(x)}|x\rangle \otimes |-\rangle
$$

Applying $H^{\otimes n}$ to the first register and using the identity $H^{\otimes n}|x\rangle = \frac{1}{\sqrt{2^n}}\sum_{z}(-1)^{x \cdot z}|z\rangle$:

#### Deutsch-Jozsa: Final State Amplitude

$$
|\psi_3\rangle = \sum_{z \in \{0,1\}^n}\left(\frac{1}{2^n}\sum_{x}(-1)^{f(x) + x \cdot z}\right)|z\rangle \otimes |-\rangle
$$

where:

- $x \cdot z = \sum_i x_i z_i \pmod{2}$ is the bitwise inner product
- The amplitude of $|0\rangle^{\otimes n}$ is $\frac{1}{2^n}\sum_x (-1)^{f(x)}$

The probability of measuring $|0\rangle^{\otimes n}$ is:

#### Deutsch-Jozsa: Measurement Probability

$$
P(0^n) = \left|\frac{1}{2^n}\sum_{x=0}^{2^n-1}(-1)^{f(x)}\right|^2
$$

where:

- If $f$ is constant: all terms have the same sign, so $P(0^n) = 1$
- If $f$ is balanced: exactly half the terms are $+1$ and half are $-1$, so $P(0^n) = 0$

Therefore, measuring $|0\rangle^{\otimes n}$ with certainty indicates a constant function, and any other outcome indicates a balanced function. The algorithm achieves an exponential separation in query complexity: 1 quantum query versus $\Omega(2^n)$ classical queries (deterministic).

#### Diagram: Deutsch-Jozsa Algorithm Circuit
<iframe src="../../sims/deutsch-jozsa-circuit/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Deutsch-Jozsa Algorithm Circuit Visualization</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute, demonstrate

Learning Objective: Students can trace the quantum state through each stage of the Deutsch-Jozsa algorithm for small $n$, observing how constant and balanced oracles produce different interference patterns leading to deterministic outcomes.

Instructional Rationale: A step-by-step circuit animation is appropriate for an Apply-level objective because students must execute the algorithm mentally at each stage, connecting the abstract derivation to concrete state evolution. Toggling between constant and balanced oracles builds understanding of how the oracle type determines the measurement outcome.

Visual elements:
- Quantum circuit diagram showing $n+1$ qubit wires with $H$, oracle, and $H$ gates
- State vector display at each stage ($|\psi_0\rangle$ through $|\psi_3\rangle$)
- Amplitude bar chart showing all $2^n$ amplitudes evolving through the circuit
- Highlighted measurement outcome

Interactive controls:
- Dropdown: Number of input qubits $n$ (1, 2, 3, 4)
- Radio buttons: Oracle type (constant-0, constant-1, balanced-example-1, balanced-example-2)
- Button: "Step forward" (advance one gate layer)
- Button: "Run all" (animate through entire circuit)
- Button: "Reset"

Behavior:
- State vector amplitudes update at each step with animation
- For constant oracles, the final state concentrates entirely on $|0\rangle^{\otimes n}$
- For balanced oracles, the final $|0\rangle^{\otimes n}$ amplitude is exactly zero
- Amplitude bars show constructive/destructive interference patterns

Canvas layout:
- Top (35%): Quantum circuit diagram with current gate highlighted
- Bottom (65%): Amplitude bar chart and state vector display

Implementation: p5.js with responsive design. Amplitude bars animate smoothly between steps.
</details>

## Bernstein-Vazirani Algorithm

The **Bernstein-Vazirani algorithm** (1993) determines a hidden bit string $s \in \{0,1\}^n$ encoded in the function $f_s(x) = s \cdot x \pmod{2}$. Classically, determining $s$ requires $n$ queries (one per bit of $s$, using the standard basis vectors $e_1, \ldots, e_n$). The quantum algorithm requires a single query.

**Derivation.** The algorithm uses the identical circuit to Deutsch-Jozsa. The amplitude of $|z\rangle$ in the final state is:

$$
\alpha_z = \frac{1}{2^n}\sum_{x}(-1)^{s \cdot x + x \cdot z} = \frac{1}{2^n}\sum_{x}(-1)^{x \cdot (s \oplus z)}
$$

Using the identity $\sum_{x \in \{0,1\}^n}(-1)^{x \cdot y} = 2^n \delta_{y, 0^n}$ (which follows from the orthogonality of characters of $\mathbb{Z}_2^n$):

#### Bernstein-Vazirani: Amplitude Collapse

$$
\alpha_z = \frac{1}{2^n} \cdot 2^n \cdot \delta_{s \oplus z, 0^n} = \delta_{z, s}
$$

where:

- $\delta_{z,s}$ is the Kronecker delta
- The only nonzero amplitude occurs at $|z\rangle = |s\rangle$

Therefore, measurement yields $s$ with certainty in a single query, achieving an $n$-fold speedup over classical computation. The Bernstein-Vazirani algorithm exemplifies how the Hadamard transform implements a Fourier transform over $\mathbb{Z}_2^n$, converting a function defined by inner products into a delta function in the Fourier-conjugate basis.

## Simon's Algorithm

**Simon's algorithm** (1994) solves a problem with provable exponential quantum speedup, predating and inspiring Shor's algorithm. Given $f:\{0,1\}^n \to \{0,1\}^n$ with the promise that there exists $s \in \{0,1\}^n$ such that $f(x) = f(y)$ if and only if $x = y$ or $x = y \oplus s$, determine $s$. The function is two-to-one if $s \neq 0^n$ and one-to-one if $s = 0^n$. Classically, finding $s$ requires $\Omega(2^{n/2})$ queries (by a birthday-paradox argument). Simon's algorithm requires $O(n)$ queries.

**Derivation.** Starting from $|0\rangle^{\otimes n}|0\rangle^{\otimes n}$, apply $H^{\otimes n}$ to the first register and then the oracle:

$$
\frac{1}{\sqrt{2^n}}\sum_{x}|x\rangle|f(x)\rangle
$$

Measuring the second register yields some value $f(x_0)$, collapsing the first register to an equal superposition of the two preimages:

$$
\frac{1}{\sqrt{2}}(|x_0\rangle + |x_0 \oplus s\rangle)
$$

Applying $H^{\otimes n}$ to this state:

#### Simon's Algorithm: Post-Hadamard State

$$
H^{\otimes n}\frac{1}{\sqrt{2}}(|x_0\rangle + |x_0 \oplus s\rangle) = \frac{1}{\sqrt{2^{n+1}}}\sum_{z}\left((-1)^{x_0 \cdot z} + (-1)^{(x_0 \oplus s) \cdot z}\right)|z\rangle
$$

$$
= \frac{1}{\sqrt{2^{n+1}}}\sum_{z}(-1)^{x_0 \cdot z}\left(1 + (-1)^{s \cdot z}\right)|z\rangle
$$

where:

- The factor $(1 + (-1)^{s \cdot z})$ equals 2 when $s \cdot z = 0$ and 0 when $s \cdot z = 1$
- Measurement yields a uniformly random $z$ satisfying $s \cdot z = 0 \pmod{2}$

Each run of the algorithm produces one linear equation $s \cdot z_i = 0$ over $\mathbb{F}_2$. After $O(n)$ runs, we accumulate $n-1$ linearly independent equations, from which $s$ can be determined by Gaussian elimination. The total query complexity is $O(n)$, an exponential improvement over the classical $\Omega(2^{n/2})$.

Simon's algorithm established the first provable exponential separation between quantum and classical query complexity for a total (non-partial) function, and the hidden subgroup structure it exploits is the prototype for Shor's period-finding algorithm over cyclic groups.

## Quantum Fourier Transform

The **quantum Fourier transform** (QFT) is the quantum analogue of the discrete Fourier transform (DFT) and is the central subroutine in Shor's algorithm, phase estimation, and many other quantum algorithms. Acting on the computational basis of an $n$-qubit register, the QFT maps:

#### QFT Definition

$$
\text{QFT}|j\rangle = \frac{1}{\sqrt{2^n}}\sum_{k=0}^{2^n - 1} e^{2\pi i jk/2^n}|k\rangle
$$

where:

- $j, k \in \{0, 1, \ldots, 2^n - 1\}$ are integers represented in binary
- $\omega = e^{2\pi i/2^n}$ is the primitive $2^n$-th root of unity
- The QFT is a unitary transformation (the columns of the DFT matrix, normalized by $1/\sqrt{2^n}$, are orthonormal)

**Product representation.** The QFT output admits a tensor product decomposition that enables an efficient circuit. Writing $j$ in binary as $j = j_1 2^{n-1} + j_2 2^{n-2} + \cdots + j_n 2^0$ and using the binary fraction notation $0.j_l j_{l+1}\cdots j_m = j_l/2 + j_{l+1}/4 + \cdots + j_m/2^{m-l+1}$:

#### QFT Product Form

$$
\text{QFT}|j_1 j_2 \cdots j_n\rangle = \frac{1}{\sqrt{2^n}}\bigotimes_{l=1}^{n}\left(|0\rangle + e^{2\pi i \cdot 0.j_{n-l+1}\cdots j_n}|1\rangle\right)
$$

where:

- Each qubit's phase depends only on the qubits to its right in the binary expansion
- The $l$-th tensor factor involves a phase determined by the last $l$ bits of $j$

**Circuit construction.** The product form reveals that the QFT can be implemented using only Hadamard gates and controlled phase rotations:

$$
R_k = \begin{pmatrix} 1 & 0 \\ 0 & e^{2\pi i/2^k} \end{pmatrix}
$$

The circuit applies, for each qubit $l$ from 1 to $n$: a Hadamard gate on qubit $l$, followed by controlled-$R_k$ gates from qubits $l+1, l+2, \ldots, n$ (with $k = 2, 3, \ldots, n-l+1$), and a final reversal of qubit ordering via SWAP gates.

#### QFT Gate Count

$$
\text{Gates} = n \text{ Hadamards} + \frac{n(n-1)}{2} \text{ controlled rotations} + \lfloor n/2 \rfloor \text{ SWAPs} = O(n^2)
$$

where:

- The classical FFT requires $O(n \cdot 2^n)$ operations
- The QFT circuit uses only $O(n^2)$ gates, an exponential reduction
- However, the QFT output cannot be directly read out (measurement collapses the superposition), so the speedup is useful only when the QFT output feeds into further quantum processing

| Feature | Classical DFT | Classical FFT | Quantum Fourier Transform |
|---------|--------------|---------------|---------------------------|
| Operations | $O(N^2)$ | $O(N \log N)$ | $O((\log N)^2)$ |
| Input | $N$ complex numbers | $N$ complex numbers | $\log_2 N$ qubits in superposition |
| Output | $N$ complex numbers | $N$ complex numbers | $\log_2 N$ qubits in superposition |
| Readout | Direct | Direct | Measurement (probabilistic) |
| Use case | Signal processing | Signal processing | Subroutine in quantum algorithms |

## Phase Kickback

**Phase kickback** is a fundamental mechanism in quantum computing where a controlled operation transfers phase information from the target qubit to the control qubit. This seemingly paradoxical phenomenon arises from the entangling nature of controlled gates acting on eigenstates.

Consider a controlled-$U$ gate where the target qubit is in an eigenstate $|u\rangle$ of $U$ with eigenvalue $e^{2\pi i\phi}$:

#### Phase Kickback Derivation

$$
\text{C-}U\big((\alpha|0\rangle + \beta|1\rangle) \otimes |u\rangle\big) = \alpha|0\rangle|u\rangle + \beta \cdot e^{2\pi i\phi}|1\rangle|u\rangle
$$

$$
= \big(\alpha|0\rangle + \beta e^{2\pi i\phi}|1\rangle\big) \otimes |u\rangle
$$

where:

- $U|u\rangle = e^{2\pi i\phi}|u\rangle$ is the eigenvalue equation
- The target register remains unchanged in $|u\rangle$
- The eigenvalue phase $e^{2\pi i\phi}$ has "kicked back" to the control qubit
- The control qubit acquires a relative phase of $e^{2\pi i\phi}$ on its $|1\rangle$ component

Phase kickback is the engine that powers the phase oracle construction, the quantum phase estimation algorithm, and, by extension, the entire family of algorithms based on period finding. The standard oracle with the ancilla in $|-\rangle$ is a special case: $X|-\rangle = -|-\rangle$, so $(-1)^{f(x)} = e^{i\pi f(x)}$ kicks back to the input register.

## Quantum Phase Estimation

**Quantum phase estimation** (QPE) is the algorithm that extracts the eigenvalue phase of a unitary operator to arbitrary precision. Given a unitary $U$ and an eigenstate $|u\rangle$ with $U|u\rangle = e^{2\pi i\phi}|u\rangle$, QPE estimates $\phi$ using $t$ ancilla qubits to $t$ bits of precision.

**Circuit.** The algorithm uses two registers: a $t$-qubit "counting" register initialized to $|0\rangle^{\otimes t}$ and an eigenstate register containing $|u\rangle$.

**Step 1: Create superposition.** Apply $H^{\otimes t}$ to the counting register.

**Step 2: Controlled unitary applications.** Apply controlled-$U^{2^j}$ from the $j$-th counting qubit (for $j = 0, 1, \ldots, t-1$) to the eigenstate register. By phase kickback:

#### QPE: After Controlled Unitaries

$$
|\psi\rangle = \frac{1}{\sqrt{2^t}}\sum_{k=0}^{2^t - 1} e^{2\pi i\phi k}|k\rangle \otimes |u\rangle
$$

where:

- The counting register encodes the phase information in the amplitudes
- The eigenstate register remains in $|u\rangle$ throughout (by repeated phase kickback)
- $k = k_{t-1}2^{t-1} + \cdots + k_0 2^0$ is the binary representation

**Step 3: Inverse QFT.** Applying $\text{QFT}^{-1}$ to the counting register:

#### QPE: After Inverse QFT

$$
\text{QFT}^{-1}\left(\frac{1}{\sqrt{2^t}}\sum_{k=0}^{2^t-1}e^{2\pi i\phi k}|k\rangle\right) = |\tilde{\phi}\rangle
$$

where:

- $\tilde{\phi}$ is the best $t$-bit approximation to $2^t\phi$
- If $2^t\phi$ is an exact integer, the estimation is exact: $\tilde{\phi} = 2^t\phi$
- If $2^t\phi$ is not an integer, the probability of the nearest $t$-bit approximation satisfies $P \geq 4/\pi^2 \approx 0.405$

**Precision bound.** To achieve $|\hat{\phi} - \phi| \leq 2^{-t}$ with probability at least $1 - \epsilon$, one needs:

#### QPE Precision Requirement

$$
t = n + \left\lceil\log_2\left(\frac{1}{2\epsilon}\right)\right\rceil
$$

where:

- $n$ is the number of desired bits of precision in $\phi$
- $\epsilon$ is the allowed failure probability
- The additional $\lceil\log_2(1/(2\epsilon))\rceil$ qubits account for the spectral leakage when $2^t\phi$ is non-integer

#### Diagram: Quantum Phase Estimation Circuit
<iframe src="../../sims/phase-estimation-circuit/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Quantum Phase Estimation Step-by-Step</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: trace, examine

Learning Objective: Students can trace the quantum state through each stage of the phase estimation algorithm, examining how controlled unitaries encode phase information and how the inverse QFT concentrates amplitude on the binary representation of the phase.

Instructional Rationale: An animated step-through of the QPE circuit is appropriate for an Analyze-level objective because students must decompose the algorithm into its constituent operations (Hadamard layer, controlled unitaries, inverse QFT) and examine the state vector at each intermediate point. Varying the eigenvalue phase $\phi$ shows how the algorithm adapts.

Visual elements:
- Circuit diagram showing $t$ counting qubits and eigenstate register
- State vector amplitude/phase display at each stage
- Probability histogram of measurement outcomes on the counting register
- Numerical display of estimated phase vs true phase

Interactive controls:
- Slider: True phase $\phi$ from 0 to 1 (default: 0.25)
- Dropdown: Number of counting qubits $t$ (2, 3, 4, 5)
- Button: "Step forward" (advance one gate layer)
- Button: "Run all" (animate through entire circuit)
- Button: "Reset"

Behavior:
- State vector amplitudes update at each step with smooth animation
- After inverse QFT, probability histogram shows peak at nearest integer to $2^t \phi$
- For exact phases (e.g., $\phi = 0.25$ with $t = 2$), single peak with probability 1
- For non-exact phases, spectral leakage visible as secondary peaks
- Estimated phase accuracy displayed with error metric

Canvas layout:
- Top (30%): Circuit diagram with highlighted current stage
- Middle (40%): Amplitude and phase display for counting register
- Bottom (30%): Probability histogram and phase estimate

Implementation: p5.js with smooth amplitude bar animations. Responsive design.
</details>

## Order Finding

**Order finding** is the computational problem at the heart of Shor's factoring algorithm. Given integers $a$ and $N$ with $\gcd(a, N) = 1$, find the smallest positive integer $r$ such that:

#### Order Definition

$$
a^r \equiv 1 \pmod{N}
$$

where:

- $r$ is called the **order** (or period) of $a$ modulo $N$
- $r$ divides $\phi(N)$ (Euler's totient function) by Lagrange's theorem
- Classically, the best known algorithms for order finding are sub-exponential but super-polynomial

The quantum approach to order finding reduces it to phase estimation. Define the unitary operator:

#### Modular Multiplication Operator

$$
U_a|x\rangle = |ax \bmod N\rangle \quad \text{for } 0 \leq x < N
$$

where:

- $U_a$ is unitary because multiplication by $a$ modulo $N$ is a permutation (when $\gcd(a, N) = 1$)
- The eigenstates of $U_a$ are:

$$
|u_s\rangle = \frac{1}{\sqrt{r}}\sum_{k=0}^{r-1}e^{-2\pi i sk/r}|a^k \bmod N\rangle, \quad s = 0, 1, \ldots, r-1
$$

with eigenvalues $U_a|u_s\rangle = e^{2\pi i s/r}|u_s\rangle$. Applying QPE to $U_a$ yields an estimate of $s/r$ for a random $s$. Crucially, although the individual eigenstates $|u_s\rangle$ depend on $r$ (which is unknown), their equal superposition is simply:

$$
\frac{1}{\sqrt{r}}\sum_{s=0}^{r-1}|u_s\rangle = |1\rangle
$$

which is easy to prepare. Phase estimation on $U_a$ with initial state $|1\rangle$ thus yields a random phase $s/r$ from which $r$ can be extracted using continued fractions.

## Shor's Algorithm

**Shor's algorithm** (1994) factors an integer $N$ in polynomial time on a quantum computer, providing an exponential speedup over the best known classical factoring algorithms. The algorithm reduces factoring to order finding via a classical reduction, then solves order finding using quantum phase estimation.

**Classical reduction (factoring to order finding):**

1. Choose random $a$ with $1 < a < N$
2. Compute $\gcd(a, N)$. If $\gcd(a, N) > 1$, we have found a nontrivial factor
3. Use the quantum order-finding subroutine to find $r = \text{ord}(a, N)$
4. If $r$ is odd, return to step 1
5. Compute $x = a^{r/2} \bmod N$. If $x \equiv -1 \pmod{N}$, return to step 1
6. Output $\gcd(a^{r/2} \pm 1, N)$ as nontrivial factors

**Success probability.** It can be shown that for a randomly chosen $a$, the probability that $r$ is even and $a^{r/2} \not\equiv -1 \pmod{N}$ is at least $1 - 1/2^{k-1}$, where $k$ is the number of distinct odd prime factors of $N$. For $N$ with at least two distinct prime factors, this probability is at least $1/2$, so $O(1)$ repetitions suffice.

**Complexity analysis:**

- Classical preprocessing: $O(\text{poly}(\log N))$ arithmetic operations
- Quantum phase estimation: $O(n^2)$ gates for the QFT (where $n = \lceil\log_2 N\rceil$) plus $O(n^3)$ gates for modular exponentiation
- Total gate count: $O(n^3) = O((\log N)^3)$

This is exponentially faster than the best classical algorithm, the general number field sieve, which runs in $O\big(\exp(c(\log N)^{1/3}(\log\log N)^{2/3})\big)$ for a constant $c$.

| Step | Operation | Complexity |
|------|-----------|------------|
| 1 | Random $a$ selection | $O(\log N)$ |
| 2 | GCD computation (Euclidean algorithm) | $O((\log N)^2)$ |
| 3 | Quantum order finding (QPE + modular exp) | $O((\log N)^3)$ |
| 4-5 | Classical post-processing | $O((\log N)^2)$ |
| Total | End-to-end factoring | $O((\log N)^3)$ |

## Modular Exponentiation

**Modular exponentiation** is the most computationally expensive component of Shor's algorithm. The quantum circuit must implement the controlled operation:

#### Controlled Modular Exponentiation

$$
|j\rangle|y\rangle \mapsto |j\rangle|y \cdot a^j \bmod N\rangle
$$

where:

- $j$ ranges over the counting register values $0$ to $2^t - 1$
- The operation is decomposed as a sequence of controlled modular multiplications

Using repeated squaring, the operation $a^j \bmod N$ for a $t$-bit $j = j_{t-1}2^{t-1} + \cdots + j_0$ decomposes as:

$$
a^j = a^{j_{t-1}2^{t-1}} \cdot a^{j_{t-2}2^{t-2}} \cdots a^{j_0}  \pmod{N}
$$

Each factor $a^{2^k} \bmod N$ is precomputed classically by repeated squaring ($k$ squarings). The quantum circuit implements controlled multiplication by $a^{2^k} \bmod N$, conditioned on the $k$-th counting qubit. Each controlled modular multiplication requires $O(n^2)$ gates (using quantum analogues of classical multiplication circuits), and there are $t = O(n)$ such multiplications, giving the total $O(n^3)$ gate count.

The reversibility of modular multiplication (required for unitarity) is guaranteed because $\gcd(a, N) = 1$ implies $a$ has a multiplicative inverse modulo $N$, so $|y\rangle \mapsto |ay \bmod N\rangle$ is a permutation and hence invertible.

## Continued Fractions

The **continued fractions algorithm** is the classical post-processing step that extracts the order $r$ from the QPE measurement outcome. Phase estimation yields a $t$-bit approximation $\tilde{\phi}$ to some fraction $s/r$ where $0 \leq s < r$. The continued fraction expansion of $\tilde{\phi}/2^t$ reveals $s/r$ as a convergent.

**Continued fraction expansion.** Any real number $\alpha$ can be expressed as:

#### Continued Fraction Representation

$$
\alpha = a_0 + \cfrac{1}{a_1 + \cfrac{1}{a_2 + \cfrac{1}{a_3 + \cdots}}}
$$

where:

- $a_0 = \lfloor\alpha\rfloor$ and the sequence is generated by $\alpha_{k+1} = 1/(\alpha_k - a_k)$, $a_{k+1} = \lfloor\alpha_{k+1}\rfloor$
- The convergents $p_k/q_k$ are the best rational approximations with denominator $\leq q_k$

**Application to Shor's algorithm.** Given the QPE outcome $\tilde{\phi}/2^t \approx s/r$, we compute the continued fraction expansion and test each convergent $p_k/q_k$. If $q_k < N$ and $a^{q_k} \equiv 1 \pmod{N}$, then $q_k$ is the order $r$ (or a divisor thereof).

**Theorem (convergent approximation).** If $|\alpha - p/q| < 1/(2q^2)$ with $\gcd(p, q) = 1$, then $p/q$ is a convergent of the continued fraction expansion of $\alpha$.

Since QPE estimates $s/r$ to within $\pm 1/2^{t+1}$ with $t = 2n + 1$ (where $n = \lceil\log_2 N\rceil$), and $r < N < 2^n$, we have:

$$
\left|\frac{\tilde{\phi}}{2^t} - \frac{s}{r}\right| < \frac{1}{2^{t+1}} = \frac{1}{2 \cdot 2^{2n+1}} < \frac{1}{2r^2}
$$

guaranteeing that $s/r$ appears as a convergent. If $\gcd(s, r) = 1$ (which occurs with probability $\Omega(1/\log\log r)$ by number-theoretic estimates), the convergent directly yields $r$.

## Grover's Algorithm

**Grover's algorithm** (1996) provides a quadratic speedup for unstructured search. Given a search space of $N = 2^n$ elements and a Boolean function $f:\{0,1\}^n \to \{0,1\}$ with exactly $M$ marked elements (satisfying $f(x) = 1$), Grover's algorithm finds a marked element using $O(\sqrt{N/M})$ oracle queries, compared to $O(N/M)$ classically.

**Setup.** Define the uniform superposition $|s\rangle = \frac{1}{\sqrt{N}}\sum_{x=0}^{N-1}|x\rangle$ and decompose the Hilbert space into the marked subspace $|\alpha\rangle = \frac{1}{\sqrt{M}}\sum_{x:f(x)=1}|x\rangle$ and the unmarked subspace $|\beta\rangle = \frac{1}{\sqrt{N-M}}\sum_{x:f(x)=0}|x\rangle$. The initial state is:

#### Grover: Initial State Decomposition

$$
|s\rangle = \sqrt{\frac{N-M}{N}}|\beta\rangle + \sqrt{\frac{M}{N}}|\alpha\rangle = \cos\frac{\theta}{2}|\beta\rangle + \sin\frac{\theta}{2}|\alpha\rangle
$$

where:

- $\sin^2(\theta/2) = M/N$ defines the angle $\theta$
- For $M \ll N$: $\theta/2 \approx \sqrt{M/N}$
- The entire algorithm operates within the two-dimensional subspace spanned by $|\alpha\rangle$ and $|\beta\rangle$

## Amplitude Amplification

**Amplitude amplification** is the geometric framework underlying Grover's algorithm. The Grover iteration $G = D_s \cdot O_f$ (where $O_f$ is the oracle and $D_s$ is the diffusion operator) performs a rotation in the $|\alpha\rangle$-$|\beta\rangle$ plane.

The oracle reflection $O_f$ negates the amplitude of marked states:

$$
O_f = I - 2|\alpha\rangle\langle\alpha|
$$

This is a reflection about $|\beta\rangle$ in the two-dimensional subspace. The diffusion operator (derived below) performs a reflection about $|s\rangle$. The composition of two reflections is a rotation:

#### Grover Rotation Angle

$$
G|s\rangle \text{ after } k \text{ iterations: } G^k|s\rangle = \cos\frac{(2k+1)\theta}{2}|\beta\rangle + \sin\frac{(2k+1)\theta}{2}|\alpha\rangle
$$

where:

- Each Grover iteration rotates the state by angle $\theta$ toward $|\alpha\rangle$
- After $k$ iterations, the angle from $|\beta\rangle$ is $(2k+1)\theta/2$
- Maximum probability of measuring a marked state occurs when $(2k+1)\theta/2 \approx \pi/2$

The optimal number of iterations is:

#### Optimal Grover Iterations

$$
k^* = \left\lfloor\frac{\pi}{2\theta}\right\rfloor \approx \frac{\pi}{4}\sqrt{\frac{N}{M}}
$$

where:

- For $M = 1$: $k^* \approx \frac{\pi}{4}\sqrt{N}$
- The success probability after $k^*$ iterations is $\sin^2\left(\frac{(2k^*+1)\theta}{2}\right) \geq 1 - M/N$
- **Overshooting** is possible: applying more than $k^*$ iterations rotates past the target and reduces success probability

## Grover Diffusion Operator

The **Grover diffusion operator** (also called the inversion about the mean) is the second reflection in the Grover iteration. It reflects the state about the equal superposition $|s\rangle$:

#### Diffusion Operator

$$
D_s = 2|s\rangle\langle s| - I = H^{\otimes n}(2|0\rangle\langle 0| - I)H^{\otimes n}
$$

where:

- $|s\rangle = H^{\otimes n}|0\rangle^{\otimes n}$ is the uniform superposition
- $2|0\rangle\langle 0| - I$ flips the sign of all computational basis states except $|0\rangle$
- The decomposition shows that $D_s$ can be implemented using $H^{\otimes n}$, a multi-controlled $Z$ gate (conditional phase flip on $|0^n\rangle$), and $H^{\otimes n}$ again

**Action on an arbitrary state.** Let $|\psi\rangle = \sum_x \alpha_x |x\rangle$ with mean amplitude $\bar{\alpha} = \frac{1}{N}\sum_x \alpha_x$. Then:

#### Inversion About the Mean

$$
D_s|\psi\rangle = \sum_x (2\bar{\alpha} - \alpha_x)|x\rangle
$$

where:

- Each amplitude $\alpha_x$ is reflected about the mean $\bar{\alpha}$
- Amplitudes above the mean are decreased; amplitudes below the mean are increased
- After the oracle negates marked-state amplitudes (making them negative), the diffusion operator boosts them above the mean

This geometric interpretation makes the amplitude amplification process intuitive: the oracle creates an asymmetry between marked and unmarked amplitudes, and the diffusion operator magnifies this asymmetry by reflecting about the mean.

#### Diagram: Grover's Algorithm Amplitude Evolution
<iframe src="../../sims/grover-amplitude-evolution/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Grover's Algorithm Amplitude Visualization</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: trace, examine

Learning Objective: Students can trace how the Grover iteration alternately applies the oracle reflection and the diffusion reflection to rotate the state vector toward the marked state, observing the amplitude bars for marked and unmarked states evolve over iterations.

Instructional Rationale: A dual-view visualization (amplitude bars and geometric rotation) is appropriate for an Analyze-level objective because students must connect the algebraic amplitude evolution to the geometric rotation picture. Stepping through iterations builds intuition for why the quadratic speedup arises and why overshooting occurs.

Visual elements:
- Amplitude bar chart showing all $N$ basis state amplitudes (marked states highlighted in red)
- 2D rotation diagram in the $|\alpha\rangle$-$|\beta\rangle$ plane showing the state vector angle
- Mean amplitude line on the bar chart
- Iteration counter and success probability display

Interactive controls:
- Dropdown: Number of qubits $n$ (2, 3, 4, 5)
- Slider: Number of marked elements $M$ (1 to $N/2$)
- Button: "Oracle step" (apply oracle reflection only)
- Button: "Diffusion step" (apply diffusion operator only)
- Button: "Full Grover iteration" (apply both)
- Button: "Run to optimal" (apply $k^*$ iterations)
- Button: "Reset"

Behavior:
- Amplitude bars animate smoothly during each step
- After oracle: marked amplitudes flip sign (go negative), mean line shifts down
- After diffusion: all amplitudes reflect about the new mean, marked amplitudes grow
- Rotation diagram shows the state vector rotating by $\theta$ each full iteration
- Success probability updates in real time
- Running past optimal shows the overshoot effect

Canvas layout:
- Left (55%): Amplitude bar chart with mean line and oracle/diffusion step animation
- Right (45%): 2D rotation diagram in $|\alpha\rangle$-$|\beta\rangle$ plane, iteration count, success probability

Implementation: p5.js with smooth bar animations. Responsive design adapts to window resize events.
</details>

## Quadratic Speedup

The quadratic speedup of Grover's algorithm is not merely an empirical observation but a provable optimality result. The **BBBV theorem** (Bennett, Bernstein, Brassard, Vazirani, 1997) establishes a matching lower bound:

#### BBBV Lower Bound

$$
\text{Any quantum algorithm solving unstructured search requires } \Omega\left(\sqrt{N/M}\right) \text{ queries}
$$

where:

- $N$ is the size of the search space
- $M$ is the number of marked elements
- The bound holds for any quantum algorithm, not just Grover's

**Proof sketch (adversary method).** The proof uses the hybrid argument. Consider two oracles $O_f$ and $O_g$ that differ on a single element $x^*$. After $T$ queries, the state vectors produced by the two oracles have inner product at least $1 - O(T^2/N)$ (each query changes the state by at most $O(1/\sqrt{N})$ in norm, and $T$ queries accumulate at most $O(T/\sqrt{N})$ change). For the algorithm to distinguish $f$ from $g$ with constant probability, we need $T^2/N = \Omega(1)$, giving $T = \Omega(\sqrt{N})$.

This establishes that the $\sqrt{N}$ query complexity is optimal. The quadratic speedup has profound implications:

- **Database search:** Finding an item in an unsorted database of $N$ entries: $O(\sqrt{N})$ queries instead of $O(N)$
- **Satisfiability:** Searching $2^n$ truth assignments: $O(2^{n/2})$ instead of $O(2^n)$
- **Collision finding:** Combined with birthday paradox techniques: $O(N^{1/3})$ queries
- **Cryptographic impact:** Grover's algorithm effectively halves the security parameter of symmetric key schemes (e.g., AES-128 provides only 64-bit security against quantum adversaries)

| Problem | Classical Complexity | Quantum Complexity | Speedup |
|---------|---------------------|--------------------|---------|
| Unstructured search ($M = 1$) | $O(N)$ | $O(\sqrt{N})$ | Quadratic |
| $k$-SAT ($2^n$ assignments) | $O(2^n)$ | $O(2^{n/2})$ | Quadratic |
| Minimum finding | $O(N)$ | $O(\sqrt{N})$ | Quadratic |
| Collision finding | $O(N^{1/2})$ (birthday) | $O(N^{1/3})$ | Polynomial |
| Symmetric key search (key length $n$) | $O(2^n)$ | $O(2^{n/2})$ | Quadratic |

## Quantum Walk

**Quantum walks** are the quantum analogues of classical random walks and provide an alternative algorithmic framework that achieves speedups for a variety of graph-theoretic and search problems. There are two principal formulations: discrete-time and continuous-time quantum walks.

**Discrete-time quantum walk on a line.** The walker occupies a position on the integer lattice $\mathbb{Z}$ and carries an internal "coin" degree of freedom in $\mathbb{C}^2$. Each step consists of a coin flip (unitary on the coin space) followed by a conditional shift:

#### Quantum Walk Step Operator

$$
S = \sum_{x \in \mathbb{Z}}\big(|x+1\rangle\langle x| \otimes |0\rangle\langle 0| + |x-1\rangle\langle x| \otimes |1\rangle\langle 1|\big)
$$

$$
W = S \cdot (I_{\text{position}} \otimes C)
$$

where:

- $C$ is the coin operator (typically the Hadamard gate $H$)
- $S$ is the conditional shift: move right if coin is $|0\rangle$, left if coin is $|1\rangle$
- $W$ is the full walk operator for one step

**Spreading behavior.** A classical random walk on the line after $t$ steps produces a binomial distribution with standard deviation $\sigma \propto \sqrt{t}$. The quantum walk, by contrast, exhibits **ballistic spreading** with $\sigma \propto t$. This quadratic enhancement in the spreading rate is the source of algorithmic speedups.

**Continuous-time quantum walk.** For a graph $G$ with adjacency matrix $A$, the continuous-time quantum walk is defined by the Schrodinger equation:

#### Continuous-Time Walk Propagator

$$
|\psi(t)\rangle = e^{-iAt}|\psi(0)\rangle
$$

where:

- $A$ is the adjacency matrix of the graph (or the graph Laplacian $L = D - A$)
- The propagator $e^{-iAt}$ is unitary since $A$ is Hermitian
- The walk evolves continuously, without a coin degree of freedom

**Algorithmic applications.** Quantum walks achieve provable speedups for several important problems:

- **Element distinctness:** Given a list of $N$ elements, determine if any two are equal: $O(N^{2/3})$ quantum walk queries versus $\Theta(N)$ classically
- **Triangle finding:** Find a triangle in a graph with $n$ vertices: $O(n^{5/4})$ using quantum walks
- **Spatial search:** Find a marked vertex on certain graphs in $O(\sqrt{N})$ steps, matching Grover's bound
- **NAND tree evaluation:** Evaluate a balanced NAND tree of depth $d$ in $O(2^{d/2})$ queries, a quadratic speedup

#### Diagram: Classical vs Quantum Walk Spreading
<iframe src="../../sims/quantum-walk-comparison/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Classical vs Quantum Walk Probability Distributions</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, differentiate

Learning Objective: Students can compare the probability distributions of classical and quantum random walks on the integer line, differentiating the Gaussian spreading ($\sigma \propto \sqrt{t}$) of the classical walk from the ballistic spreading ($\sigma \propto t$) of the quantum walk, and identifying the role of quantum interference in creating the asymmetric two-peaked distribution.

Instructional Rationale: A side-by-side time-stepped comparison is appropriate for an Analyze-level objective because students must differentiate two fundamentally different dynamical behaviors arising from the same graph structure. Observing the distributions evolve step by step reveals how quantum coherence transforms diffusive spreading into ballistic transport.

Visual elements:
- Two probability distribution plots side by side (classical and quantum) over position
- Position axis from $-t$ to $+t$ with probability on the vertical axis
- Classical distribution: symmetric binomial/Gaussian shape
- Quantum distribution: asymmetric two-peaked shape (for Hadamard coin)
- Standard deviation display for each walk
- Step counter

Interactive controls:
- Button: "Step" (advance both walks by one step)
- Button: "Run 10 steps"
- Button: "Run to step $t$" with slider for $t$ (5 to 100)
- Dropdown: Coin operator (Hadamard, Y-rotation, balanced)
- Button: "Reset"

Behavior:
- Classical distribution broadens as $\sqrt{t}$
- Quantum distribution broadens as $t$ with characteristic interference fringes
- Standard deviation ratio (quantum/classical) grows as $\sqrt{t}$
- Changing coin operator alters the quantum distribution symmetry
- Probability values update at each step

Canvas layout:
- Top (45%): Classical walk probability distribution
- Bottom (45%): Quantum walk probability distribution
- Right sidebar (10%): Step counter, standard deviations, coin selector

Implementation: p5.js. Probability distributions rendered as filled area plots. Responsive design.
</details>

## Algorithm Complexity Summary

The following table summarizes the quantum algorithms presented in this chapter, their problem domains, and their query/gate complexity compared to classical approaches.

| Algorithm | Problem | Classical Queries | Quantum Queries | Speedup Type |
|-----------|---------|-------------------|-----------------|--------------|
| Deutsch | 1-bit function type | 2 | 1 | Constant |
| Deutsch-Jozsa | $n$-bit constant vs balanced | $2^{n-1}+1$ (det.) | 1 | Exponential |
| Bernstein-Vazirani | Hidden string $s$ | $n$ | 1 | Linear |
| Simon | Hidden period (bitwise) | $\Omega(2^{n/2})$ | $O(n)$ | Exponential |
| Shor (order finding) | Period of $a^x \bmod N$ | Sub-exponential | $O((\log N)^3)$ | Super-polynomial |
| Grover | Unstructured search | $O(N)$ | $O(\sqrt{N})$ | Quadratic |

#### Diagram: Algorithm Speedup Landscape
<iframe src="../../sims/algorithm-speedup-landscape/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Quantum Algorithm Speedup Comparison</summary>
Type: infographic

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: compare, assess

Learning Objective: Students can compare the asymptotic complexity scaling of the major quantum algorithms against their classical counterparts, assessing which problem structures (periodicity, symmetry, unstructured search) admit different levels of quantum speedup.

Instructional Rationale: A log-scale comparison chart is appropriate for an Evaluate-level objective because students must assess the relative magnitudes of speedups across qualitatively different problem types. Seeing exponential, super-polynomial, and quadratic speedups on the same axes helps students develop judgment about when quantum computing offers transformative versus incremental advantages.

Visual elements:
- Log-scale plot with problem size $n$ on horizontal axis and query complexity on vertical axis
- Classical complexity curves (red) and quantum complexity curves (blue) for each algorithm
- Shaded regions showing the speedup gap
- Labels for exponential, super-polynomial, and quadratic speedup regions
- Interactive tooltips showing exact complexity expressions

Interactive controls:
- Checkbox: Toggle each algorithm's curves on/off
- Slider: Problem size range ($n$ from 2 to 30)
- Toggle: Linear vs logarithmic scale on vertical axis

Behavior:
- Curves dynamically scale as problem size changes
- Speedup gaps visually apparent on log scale
- Hovering over a curve shows the complexity expression
- Toggling algorithms allows focused comparison

Canvas layout:
- Main area (85%): Log-scale comparison plot
- Right panel (15%): Algorithm toggles and scale selector

Implementation: p5.js with dynamic axes. Responsive design.
</details>

## Key Takeaways

This chapter established the major quantum algorithms and the mathematical principles underlying their speedups:

1. **Quantum parallelism** enables a single oracle call to evaluate $f$ on all $2^n$ inputs simultaneously, but extracting useful information requires interference, not direct measurement.

2. **Quantum oracles** encode classical functions as unitary transformations, with the phase oracle variant exploiting phase kickback to embed function values in relative phases.

3. **Deutsch's and the Deutsch-Jozsa algorithm** demonstrate that quantum interference can determine global properties (constant vs balanced) of a function using exponentially fewer queries than any deterministic classical algorithm.

4. **Bernstein-Vazirani** recovers an $n$-bit hidden string in one query versus $n$ classically, using the Fourier duality of the Hadamard transform over $\mathbb{Z}_2^n$.

5. **Simon's algorithm** achieves the first provable exponential quantum speedup for a total function, exploiting hidden subgroup structure that directly inspired Shor's algorithm.

6. **The quantum Fourier transform** maps computational basis states to Fourier basis states using $O(n^2)$ gates, exponentially fewer than the classical FFT, and is the key subroutine in phase estimation and period finding.

7. **Phase kickback** transfers eigenvalue information from a target register to a control register, enabling phase estimation without destroying the eigenstate.

8. **Quantum phase estimation** extracts eigenvalue phases to $t$ bits of precision using $O(t)$ controlled unitary applications and an inverse QFT, with success probability controllable through additional ancilla qubits.

9. **Shor's algorithm** factors $N$ in $O((\log N)^3)$ gates by reducing factoring to order finding, solving order finding via phase estimation, and extracting the period via continued fractions---an exponential speedup over the best classical methods.

10. **Grover's algorithm** provides an optimal quadratic speedup for unstructured search using amplitude amplification, with the BBBV theorem proving that $\Omega(\sqrt{N})$ queries are necessary for any quantum algorithm.

11. **Quantum walks** offer an alternative algorithmic framework achieving polynomial speedups for graph problems, with ballistic spreading ($\sigma \propto t$) replacing the classical diffusive spreading ($\sigma \propto \sqrt{t}$).

??? question "Concept Check: Why can't Grover's algorithm achieve more than a quadratic speedup?"
    The BBBV lower bound proves that $\Omega(\sqrt{N})$ queries are necessary for unstructured search by any quantum algorithm. The key insight is that each oracle query can change the state vector by at most $O(1/\sqrt{N})$ in norm (because the oracle marks only one of $N$ items). After $T$ queries, the total deviation from the initial state is bounded by $O(T/\sqrt{N})$. To distinguish the marked case from the unmarked case with constant probability, we need $T/\sqrt{N} = \Omega(1)$, giving $T = \Omega(\sqrt{N})$. This argument relies on the lack of structure in the search problem; structured problems (like period finding in Shor's algorithm) can exploit additional mathematical structure to achieve exponential speedups.

??? question "Concept Check: Why does Shor's algorithm use continued fractions rather than directly reading the phase estimate?"
    Phase estimation yields a $t$-bit approximation $\tilde{\phi}/2^t$ to the rational number $s/r$, where $r$ is the unknown order. The phase estimate is a ratio of two large integers ($\tilde{\phi}$ and $2^t$), but we need the reduced fraction $s/r$ to extract $r$. The continued fraction algorithm efficiently finds the best rational approximation with a small denominator, which is precisely $s/r$ when the phase estimate is sufficiently precise. Since $t = 2n+1$ bits ensures accuracy within $1/(2r^2)$, the convergent approximation theorem guarantees that $s/r$ appears as a convergent. Direct inspection of $\tilde{\phi}/2^t$ as a fraction would give a denominator of $2^t$, which is exponentially larger than $r$ and would not reveal the period structure.
