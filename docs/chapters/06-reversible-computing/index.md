---
title: Reversible Computing
description: Theory and practice of reversible computation from logical and physical reversibility through Toffoli/Fredkin gates, adiabatic circuits, and garbage bit management
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Reversible Computing

## Summary

This chapter develops the theory and practice of reversible computation. We distinguish logical from physical reversibility, present Bennett's proof that all computation can be made reversible, derive the matrix representations of the Toffoli and Fredkin gates, analyze adiabatic computing circuits and energy recovery logic, and discuss the management of garbage bits in reversible instruction sets.

## Concepts Covered

This chapter covers the following 10 concepts:

1. Logical Reversibility
2. Physical Reversibility
3. Bennett's Proof
4. Toffoli Gate
5. Fredkin Gate
6. Controlled-SWAP Operation
7. Adiabatic Computing
8. Energy Recovery Logic
9. Reversible Instruction Set
10. Garbage Bits

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Physical Limits of Computing](../02-physical-limits/index.md)
- [Chapter 4: Classical Computing Fundamentals](../04-classical-computing/index.md)

---

## Introduction

In [Chapter 2](../02-physical-limits/index.md) we established one of the most profound connections between physics and computation: Landauer's principle, which states that erasing a single bit of information in a system at temperature $T$ dissipates at least $k_B T \ln 2$ of energy as heat. At room temperature ($T = 300$ K), this yields approximately $2.85 \times 10^{-21}$ J per bit erasure---a quantity that, while minuscule, represents a hard thermodynamic floor. As [Chapter 4](../04-classical-computing/index.md) demonstrated, conventional CMOS logic gates such as AND, OR, and NAND are fundamentally irreversible: they map multiple distinct inputs to a single output, destroying information in the process. Every such gate operation incurs the Landauer cost.

The critical insight of this chapter is that **Landauer's limit applies only to logically irreversible operations**. If a computation can be performed without ever erasing information---that is, if every step is a bijection that can be uniquely inverted---then no fundamental thermodynamic lower bound on energy dissipation applies. This observation, first articulated by Rolf Landauer himself in 1961 and developed extensively by Charles Bennett, Edward Fredkin, and Tommaso Toffoli in the 1970s and 1980s, opens the theoretical possibility of computation with arbitrarily low energy dissipation.

This chapter develops the mathematical and physical foundations of reversible computing. We begin by precisely defining logical and physical reversibility and their relationship to thermodynamics. We then present Bennett's constructive proof that any computation can be made logically reversible, introduce the universal reversible gate sets (Toffoli and Fredkin gates), and analyze the practical realization of near-reversible computation through adiabatic circuits and energy recovery logic. We conclude with reversible programming languages and the problem of garbage bit management.

The material in this chapter serves as the essential bridge between the thermodynamic limits of classical computing (Chapter 2) and the quantum computing paradigm (Chapters 7--9). Quantum mechanics is inherently reversible---unitary evolution preserves information---and understanding classical reversible computing provides the conceptual foundation for quantum circuit design.

## Logical Reversibility

A computation is **logically reversible** if and only if the function it computes is a bijection: given the output, one can uniquely reconstruct the input. Formally, a function $f: \{0,1\}^n \to \{0,1\}^m$ is logically reversible if and only if $f$ is injective (one-to-one), meaning:

$$
f(x_1) = f(x_2) \implies x_1 = x_2
$$

For a function mapping $n$-bit strings to $m$-bit strings, injectivity requires $m \geq n$. If additionally $m = n$, then $f$ is a bijection (a permutation of $\{0,1\}^n$), and the inverse $f^{-1}$ is also a function from $\{0,1\}^n$ to $\{0,1\}^n$.

### Irreversible Classical Gates

The standard Boolean gates introduced in [Chapter 4](../04-classical-computing/index.md) are overwhelmingly irreversible. Consider the AND gate:

$$
\text{AND}: \{0,1\}^2 \to \{0,1\}, \quad (a, b) \mapsto a \wedge b
$$

The AND gate maps four possible inputs to two possible outputs. Three distinct inputs---$(0,0)$, $(0,1)$, and $(1,0)$---all produce the output $0$. Given an output of $0$, we cannot determine which of these three inputs was applied. Information has been irreversibly lost. Specifically, $\log_2 3 \approx 1.58$ bits of information are destroyed when the output is $0$, because two bits of input information have been compressed into one bit of output.

The same analysis applies to OR, NAND, NOR, and XOR gates when viewed as maps from $\{0,1\}^2$ to $\{0,1\}$:

| Gate | Input-output mapping | Number of inputs mapping to 0 | Number of inputs mapping to 1 | Reversible? |
|------|---------------------|-------------------------------|-------------------------------|-------------|
| AND | $\{0,1\}^2 \to \{0,1\}$ | 3 | 1 | No |
| OR | $\{0,1\}^2 \to \{0,1\}$ | 1 | 3 | No |
| NAND | $\{0,1\}^2 \to \{0,1\}$ | 1 | 3 | No |
| XOR | $\{0,1\}^2 \to \{0,1\}$ | 2 | 2 | No |
| NOT | $\{0,1\} \to \{0,1\}$ | 1 | 1 | **Yes** |

### Reversible Classical Gates

The NOT gate is the simplest reversible gate: it is a bijection from $\{0,1\}$ to $\{0,1\}$. Its inverse is itself (NOT is an involution).

A more interesting reversible gate is the **controlled-NOT** (CNOT) gate, which acts on two bits:

$$
\text{CNOT}: (a, b) \mapsto (a, a \oplus b)
$$

where $\oplus$ denotes addition modulo 2 (XOR). The CNOT gate is a bijection on $\{0,1\}^2$: given the output $(a, a \oplus b)$, we recover the input as $(a, a \oplus (a \oplus b)) = (a, b)$. Indeed, the CNOT gate is its own inverse.

#### CNOT Permutation Matrix

$$
\text{CNOT} = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix}
$$

where:

- The rows and columns are indexed by the basis states $00, 01, 10, 11$
- The first bit $a$ is the control; the second bit $b$ is the target
- When $a = 0$, the target is unchanged; when $a = 1$, the target is flipped
- The matrix is a permutation matrix (exactly one 1 per row and column), confirming bijectivity

The key principle connecting logical reversibility to thermodynamics is: **a logically irreversible operation must erase information, and by Landauer's principle, information erasure dissipates at least $k_B T \ln 2$ per bit**. A logically reversible operation, by contrast, preserves all input information in the output and therefore carries no fundamental thermodynamic cost of erasure. This does not mean that a reversible operation dissipates zero energy in practice---real implementations face friction, resistance, and other dissipative effects---but rather that the Landauer bound does not apply, and in principle the dissipation can be made arbitrarily small.

## Physical Reversibility

**Physical reversibility** is a stronger condition than logical reversibility. A physical process is reversible if, at every instant, the system remains arbitrarily close to thermodynamic equilibrium, so that the process can be reversed by an infinitesimal change in the driving forces. This is the thermodynamic concept of a **quasistatic** process.

### Microscopic Reversibility and Time-Reversal Symmetry

At the microscopic level, the fundamental laws of classical mechanics and quantum mechanics are time-reversal symmetric. Newton's equations of motion are invariant under the transformation $t \to -t$ (with simultaneous reversal of all momenta). Similarly, the Schrodinger equation:

$$
i\hbar \frac{\partial}{\partial t}|\psi(t)\rangle = H|\psi(t)\rangle
$$

is invariant under the combined operation of time reversal and complex conjugation (assuming a time-reversal-invariant Hamiltonian). This means that for every allowed forward trajectory, the time-reversed trajectory is also a valid solution of the equations of motion.

### Connection to Thermodynamics

The second law of thermodynamics appears to introduce an arrow of time: entropy increases (or remains constant) in isolated systems. However, the second law is a statistical statement about macroscopic ensembles, not a fundamental constraint on microscopic dynamics. The reconciliation is that irreversibility in macroscopic systems arises from coarse-graining: when we discard information about microstates (e.g., by measuring only temperature and pressure), the effective dynamics become irreversible.

For computing, the connection is precise. A physically reversible computation must satisfy two conditions:

1. **Logical reversibility:** The computed function must be a bijection (necessary but not sufficient).
2. **Quasistatic operation:** The physical implementation must operate sufficiently slowly that the system remains near equilibrium at every step.

The energy dissipated in a physical computation that is both logically reversible and operated quasistatically can be made arbitrarily small---in principle, zero in the limit of infinitely slow operation. This was demonstrated rigorously by Bennett (1982) and by Fredkin and Toffoli (1982).

#### Energy Dissipation in Reversible vs. Irreversible Operations

$$
E_{\text{dissipated}} \geq \begin{cases} k_B T \ln 2 & \text{per bit erased (irreversible operation)} \\ 0 & \text{(reversible operation, quasistatic limit)} \end{cases}
$$

where:

- $k_B = 1.381 \times 10^{-23}$ J/K is the Boltzmann constant
- $T$ is the environment temperature in kelvin
- The irreversible bound is Landauer's principle (Chapter 2)
- The reversible bound of zero is achievable only in the quasistatic ($t \to \infty$) limit

In practice, operating at finite speed always dissipates some energy (proportional to $1/t$ for switching time $t$, as we will see in the section on adiabatic computing), but the crucial point is that there is **no fundamental lower bound** on energy dissipation for reversible operations.

## Bennett's Proof

In 1973, Charles Bennett published a landmark result: **any computation that can be performed by a Turing machine can also be performed by a logically reversible Turing machine**, with at most a polynomial overhead in time and space. This result is of foundational importance because it shows that reversibility is not a restriction on computational power---it is possible to compute anything reversibly.

### The Compute-Copy-Uncompute Strategy

Bennett's proof is constructive. Given an irreversible computation $f: x \mapsto f(x)$, the reversible simulation proceeds in three stages:

**Stage 1 (Compute):** Run the original computation forward, but instead of discarding intermediate results, store all of them on a "history tape." This makes the forward computation injective (every step is recorded and can be undone). After this stage, the work space contains the desired output $f(x)$ along with a large amount of intermediate data (garbage).

**Stage 2 (Copy):** Copy the final result $f(x)$ to a clean output register. This copy operation is itself reversible---it is a sequence of CNOT gates that XOR the result onto initially-zero output bits.

**Stage 3 (Uncompute):** Run the computation of Stage 1 in reverse, exactly undoing every step. Because all intermediate data was recorded, the reversal is deterministic. After uncomputation, the work space returns to its original clean state, and only the clean output register contains $f(x)$.

The overall transformation is:

#### Bennett's Reversible Computation Scheme

$$
|x\rangle|0\rangle|0\rangle \xrightarrow{\text{Compute}} |x\rangle|g\rangle|f(x)\rangle \xrightarrow{\text{Copy}} |x\rangle|g\rangle|f(x)\rangle \xrightarrow{\text{Uncompute}} |x\rangle|0\rangle|f(x)\rangle
$$

where:

- $|x\rangle$ is the input register (preserved throughout)
- $|0\rangle$ is the initially clean work register; $|g\rangle$ denotes the garbage accumulated during computation
- $|f(x)\rangle$ is the output, first computed into the work register, then copied to a separate output register
- The Uncompute stage exactly reverses Compute, returning the work register to $|0\rangle$

The notation $|x\rangle$ here denotes a classical bit string register (using Dirac notation as a convenient formalism that will carry over naturally to the quantum setting in later chapters).

### Complexity Analysis

Let $T(n)$ and $S(n)$ be the time and space complexity of the original irreversible computation on inputs of size $n$. Bennett's reversible simulation has:

- **Time complexity:** $O(T(n))$---the computation is run forward once, a linear-time copy is performed, and the computation is run backward once. The total time is $2T(n) + O(S(n))$, which is $O(T(n))$ since $S(n) \leq T(n)$.
- **Space complexity:** $O(T(n))$ in the naive version, because the history tape records every step of the computation.

The space overhead is potentially severe: if the original computation runs for $T(n)$ steps, the history tape has $T(n)$ entries. Bennett (1989) later showed that the space overhead can be reduced to $O(S(n) \log T(n))$ by a more sophisticated recursive strategy that uncomputes intermediate checkpoints. The time cost of this space-efficient version is $O(T(n)^{1+\epsilon})$ for any $\epsilon > 0$.

The following table summarizes the time-space tradeoffs for Bennett's reversible simulation strategies:

| Strategy | Time overhead | Space overhead | Reference |
|----------|--------------|----------------|-----------|
| Naive (full history) | $O(T)$ | $O(T)$ | Bennett 1973 |
| Checkpoint (recursive) | $O(T^{1+\epsilon})$ | $O(S \log T)$ | Bennett 1989 |
| $k$-level checkpointing | $O(T \cdot (\log T)^k)$ | $O(S \cdot k \cdot T^{1/k})$ | Levine & Sherman 1990 |
| Pebble games (optimal) | Depends on graph | Depends on graph | Li & Vitanyi 1996 |

### Significance for Thermodynamics

Bennett's result has a direct thermodynamic implication. Since any computation can be made logically reversible, and logically reversible computations have no Landauer cost, **there is no fundamental thermodynamic minimum energy cost per useful computational step**. The Landauer cost of $k_B T \ln 2$ per bit applies only to bit erasure, and Bennett showed that bit erasure can always be avoided (at the cost of additional space and time).

This resolves the apparent tension between the second law of thermodynamics and the possibility of efficient computation: the second law does not prevent energy-efficient computing, but it does demand that we preserve (rather than erase) information.

## Toffoli Gate

The **Toffoli gate** (also called the controlled-controlled-NOT or CCNOT gate), introduced by Tommaso Toffoli in 1980, is a three-bit reversible gate that is universal for classical reversible computation. It takes three input bits $(a, b, c)$ and produces three output bits $(a, b, c \oplus (a \wedge b))$: the first two bits pass through unchanged, and the third bit is flipped if and only if both control bits are 1.

### Truth Table

| $a$ | $b$ | $c$ | $a'$ | $b'$ | $c'$ |
|-----|-----|-----|------|------|------|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 0 |

The output is $(a, b, c \oplus (a \wedge b))$, which is a permutation of $\{0,1\}^3$. Since there are 8 inputs and 8 distinct outputs, the gate is bijective and hence logically reversible. Moreover, the Toffoli gate is its own inverse: applying it twice returns to the original state, since $(c \oplus (a \wedge b)) \oplus (a \wedge b) = c$.

### Matrix Representation

The Toffoli gate can be represented as an $8 \times 8$ permutation matrix acting on the computational basis states $|000\rangle, |001\rangle, \ldots, |111\rangle$:

#### Toffoli Gate Matrix

$$
T = \begin{pmatrix} 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 \end{pmatrix}
$$

where:

- Rows and columns are indexed by $|abc\rangle$ in the order $|000\rangle, |001\rangle, \ldots, |111\rangle$
- The matrix is identical to the $8 \times 8$ identity except for the swap of the last two rows/columns
- $T$ is both unitary and a permutation matrix: $T = T^{-1} = T^\dagger$

### Embedding Irreversible Gates

The power of the Toffoli gate lies in its ability to **embed** any classical Boolean function into a reversible setting. By setting certain inputs to fixed values, the Toffoli gate can simulate irreversible gates:

**AND gate:** Set $c = 0$. Then the output is $(a, b, a \wedge b)$. The third output line produces the AND of the first two inputs, while the first two inputs are preserved (providing the information needed for reversibility).

**NOT gate:** Set $a = b = 1$. Then the output is $(1, 1, c \oplus 1) = (1, 1, \bar{c})$. The third output is the NOT of $c$.

**NAND gate:** Set $c = 1$. Then the output is $(a, b, 1 \oplus (a \wedge b)) = (a, b, \overline{a \wedge b})$. The third output is the NAND of the first two inputs.

Since NAND is universal for classical Boolean logic (any Boolean function can be built from NAND gates), and the Toffoli gate can simulate NAND, the Toffoli gate is **universal for classical reversible computation**. Any Boolean circuit of $g$ gates can be simulated by a reversible circuit of $O(g)$ Toffoli gates, using one ancilla bit (initialized to the appropriate constant) per irreversible gate.

### Circuit Notation

In circuit diagrams, the Toffoli gate is drawn as two solid dots (on the control lines $a$ and $b$) connected by a vertical line to a $\oplus$ symbol (on the target line $c$). This notation emphasizes the conditional nature of the gate: the target flips only when both controls are active.

## Fredkin Gate

The **Fredkin gate** (controlled-SWAP gate), introduced by Edward Fredkin in 1982, is another fundamental three-bit reversible gate. It takes three input bits $(c, a, b)$ and swaps $a$ and $b$ if and only if the control bit $c$ is 1:

$$
\text{Fredkin}: (c, a, b) \mapsto \begin{cases} (c, a, b) & \text{if } c = 0 \\ (c, b, a) & \text{if } c = 1 \end{cases}
$$

### Truth Table

| $c$ | $a$ | $b$ | $c'$ | $a'$ | $b'$ |
|-----|-----|-----|------|------|------|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 |

### Matrix Representation

#### Fredkin Gate Matrix

$$
F = \begin{pmatrix} 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 \end{pmatrix}
$$

where:

- Rows and columns are indexed by $|cab\rangle$ in the order $|000\rangle, |001\rangle, \ldots, |111\rangle$
- The matrix swaps the rows/columns corresponding to $|101\rangle$ and $|110\rangle$
- Like the Toffoli matrix, $F$ is a permutation matrix and its own inverse: $F^2 = I$

### Conservative Logic Property

The Fredkin gate has a remarkable property that the Toffoli gate does not share: it is **conservative**, meaning it preserves the Hamming weight (number of 1s) of the input. For any input $(c, a, b)$:

$$
c + a + b = c' + a' + b'
$$

This is evident from the truth table: when $c = 0$, the outputs are unchanged; when $c = 1$, $a$ and $b$ are merely swapped, which does not change their sum. The conservation of Hamming weight has a physical interpretation: if we associate each 1 with a "particle" (or unit of energy), then the Fredkin gate conserves the total number of particles. This makes conservative logic particularly natural for physical implementations where energy or charge is conserved.

### Universality and Embedding

Like the Toffoli gate, the Fredkin gate is universal for classical reversible computation. To embed irreversible gates:

**AND gate:** Set $b = 0$. Then:

- If $c = 0$: output is $(0, a, 0)$
- If $c = 1$: output is $(1, 0, a)$

The third output $b' = c \wedge a$ computes the AND function. More precisely, when $b = 0$, we have $a' = a \wedge \bar{c}$ and $b' = a \wedge c$, so the second output gives $a \wedge c$.

**NOT gate:** Setting $a = 1$ and $b = 0$:

- If $c = 0$: output is $(0, 1, 0)$
- If $c = 1$: output is $(1, 0, 1)$

The third output $b' = c$ and $a' = \bar{c}$, giving the NOT of $c$ on the second output line.

Since AND and NOT together are universal for Boolean logic, the Fredkin gate is computationally universal.

### Comparison of Universal Reversible Gates

| Property | Toffoli (CCNOT) | Fredkin (CSWAP) |
|----------|-----------------|-----------------|
| Input/output bits | 3 | 3 |
| Operation | Conditional NOT | Conditional SWAP |
| Self-inverse | Yes | Yes |
| Conservative (weight-preserving) | No | **Yes** |
| Embeds AND | $c = 0$: $(a,b,a \wedge b)$ | $b = 0$: $b' = c \wedge a$ |
| Embeds NOT | $a = b = 1$: $c' = \bar{c}$ | $a = 1, b = 0$: $a' = \bar{c}$ |
| Universal for classical reversible logic | Yes | Yes |
| Matrix representation | $8 \times 8$ permutation | $8 \times 8$ permutation |

## Controlled-SWAP Operation

The **controlled-SWAP** (CSWAP) operation is formally identical to the Fredkin gate. We treat it here as a separate concept to emphasize its applications and its explicit matrix decomposition in terms of simpler gates, which is particularly relevant for quantum circuit synthesis.

### Explicit Matrix Form

The controlled-SWAP operation on three bits $(c, a, b)$ acts as:

$$
\text{CSWAP}|c\rangle|a\rangle|b\rangle = |c\rangle \otimes \big[(1-c)|a\rangle|b\rangle + c|b\rangle|a\rangle\big]
$$

Expanding this in the computational basis, the $8 \times 8$ matrix is identical to the Fredkin matrix $F$ given above.

### Decomposition into Elementary Gates

For circuit synthesis, it is useful to decompose the controlled-SWAP into a sequence of CNOT and Toffoli operations. The standard decomposition is:

$$
\text{CSWAP}(c, a, b) = \text{CNOT}(b, a) \cdot \text{Toffoli}(c, a, b) \cdot \text{CNOT}(b, a)
$$

where $\text{CNOT}(x, y)$ means "use $x$ as control and $y$ as target." This can be verified by tracing through the three operations:

1. $\text{CNOT}(b, a)$: $(c, a \oplus b, b)$
2. $\text{Toffoli}(c, a \oplus b, b)$: $(c, a \oplus b, b \oplus (c \wedge (a \oplus b)))$
3. $\text{CNOT}(b \oplus (c \wedge (a \oplus b)), a \oplus b)$: apply CNOT with the updated third bit as control on the second bit

When $c = 0$, no swap occurs (the Toffoli contributes nothing since $c = 0$). When $c = 1$, the Toffoli flips $b$ conditioned on $a \oplus b$, effectively routing $a$'s value to the $b$ position and vice versa through the surrounding CNOTs.

### Applications of Controlled-SWAP

The controlled-SWAP operation has several important applications:

1. **Reversible multiplexing:** CSWAP can route data between two registers conditioned on a control bit, implementing a reversible 2-to-1 multiplexer without information loss.

2. **Comparison operations:** By applying CSWAP to two registers and examining the control bit, one can implement reversible comparison circuits for sorting networks.

3. **Quantum algorithms:** The SWAP test in quantum computing uses the controlled-SWAP to estimate the inner product $|\langle\psi|\phi\rangle|^2$ between two quantum states, a primitive used in quantum machine learning and state discrimination.

4. **Reversible arithmetic:** Controlled-SWAP operations are building blocks for reversible adders and multipliers, where conditional data routing replaces the irreversible carry logic of conventional circuits.

## Adiabatic Computing

**Adiabatic computing** is the primary practical approach to realizing physically reversible (or near-reversible) computation. The term "adiabatic" is borrowed from thermodynamics, where an adiabatic process is one that exchanges no heat with the environment. In the computing context, adiabatic circuits charge and discharge capacitive loads gradually through resistive paths, recovering most of the energy that conventional CMOS circuits dissipate as heat.

### The Energy Dissipation Problem in Conventional CMOS

In conventional CMOS logic (as analyzed in [Chapter 4](../04-classical-computing/index.md)), switching a node capacitance $C$ from voltage $0$ to $V_{DD}$ through a transistor with on-resistance $R$ dissipates:

#### Conventional CMOS Switching Energy

$$
E_{\text{conv}} = \frac{1}{2}CV_{DD}^2
$$

where:

- $C$ is the load capacitance
- $V_{DD}$ is the supply voltage
- This energy is dissipated as heat in the transistor's channel resistance, regardless of how slowly the transition occurs
- The factor $1/2$ arises because exactly half the energy drawn from the constant-voltage supply is stored in the capacitor, and the other half is dissipated

The fundamental problem is the use of a **constant-voltage power supply**. When a constant voltage source charges a capacitor through a resistor, the energy dissipated in the resistor equals the energy stored in the capacitor, regardless of the resistance value. This dissipation is not a consequence of Landauer's principle---it occurs even in logically reversible operations---but rather a consequence of the abrupt, non-quasistatic switching in conventional CMOS.

### The Adiabatic Charging Principle

Adiabatic circuits replace the constant-voltage supply with a **slowly ramping voltage source** (a "power clock"). If the supply voltage ramps linearly from $0$ to $V_{DD}$ over a time $T$, the energy dissipated in charging a capacitance $C$ through resistance $R$ is:

#### Adiabatic Charging Energy Dissipation

$$
E_{\text{adiabatic}} = \frac{RC}{T} \cdot CV_{DD}^2
$$

where:

- $R$ is the resistance of the charging path (transistor on-resistance)
- $C$ is the load capacitance
- $T$ is the charging time (ramp duration)
- $V_{DD}$ is the final voltage

**Derivation.** Consider a capacitor $C$ being charged through a resistance $R$ by a linearly ramping voltage $V_s(t) = V_{DD} \cdot t/T$ for $0 \leq t \leq T$. The current through the resistor at time $t$ is:

$$
i(t) = C \frac{dV_C}{dt} \approx C \frac{V_{DD}}{T}
$$

in the quasistatic limit where $V_C(t) \approx V_s(t)$ (valid when $RC \ll T$). The instantaneous power dissipated in $R$ is:

$$
P(t) = i(t)^2 R = R C^2 \frac{V_{DD}^2}{T^2}
$$

Integrating over the charging interval:

$$
E_{\text{adiabatic}} = \int_0^T P(t)\, dt = \frac{RC^2 V_{DD}^2}{T^2} \cdot T = \frac{RC}{T} CV_{DD}^2
$$

The crucial insight is the factor $RC/T$. In conventional CMOS, $T$ is comparable to $RC$ (a few gate delays), so $RC/T \sim 1$ and $E \sim CV_{DD}^2$ (matching the conventional result up to constant factors). But if we operate slowly, with $T \gg RC$, the dissipated energy becomes:

$$
E_{\text{adiabatic}} \ll CV_{DD}^2
$$

In the quasistatic limit $T \to \infty$, the dissipated energy approaches zero. This is the adiabatic computing advantage: by spending more time, we can make the energy dissipation per operation arbitrarily small, well below the Landauer limit for irreversible operations.

### Comparison: Conventional vs. Adiabatic Energy

| Parameter | Conventional CMOS | Adiabatic CMOS |
|-----------|-------------------|----------------|
| Switching energy | $\frac{1}{2}CV_{DD}^2$ | $\frac{RC}{T}CV_{DD}^2$ |
| Energy vs. speed | Independent of speed | $E \propto 1/T$ |
| Minimum energy | $\frac{1}{2}CV_{DD}^2$ (fixed) | $\to 0$ as $T \to \infty$ |
| Power supply | Constant $V_{DD}$ | Ramping "power clock" |
| Energy recovery | None (energy lost as heat) | Possible (energy returned to supply) |
| Practical regime | $T \approx RC$ | $T \gg RC$ (factor of 10--100) |

### Energy Recovery

The other key advantage of adiabatic circuits is **energy recovery**. In conventional CMOS, the energy stored in a capacitor during charge-up ($\frac{1}{2}CV_{DD}^2$) is dissipated as heat during discharge (to ground). In adiabatic circuits, the ramping power clock can also ramp *down* slowly, recovering most of the stored energy back into the power clock generator (typically an LC resonant circuit). The only energy permanently lost is the $\frac{RC}{T}CV_{DD}^2$ dissipated in the channel resistance during the ramp, which, as shown, can be made small.

#### Diagram: Adiabatic vs Conventional Charging

<iframe src="../../sims/adiabatic-charging/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Comparison of energy dissipation during capacitor charging in conventional vs. adiabatic CMOS</summary>
Type: MicroSim
Learning objective: Visualize how adiabatic (slow ramp) charging dramatically reduces energy dissipation compared to conventional (step voltage) charging, and understand the RC/T scaling law. Bloom level: Analyze.
Visual elements: Two side-by-side RC circuit diagrams---left for conventional (step voltage source) and right for adiabatic (ramp voltage source). Animated current flow and heat dissipation (shown as glowing resistance). Time-domain plots of supply voltage $V_s(t)$, capacitor voltage $V_C(t)$, current $i(t)$, and cumulative energy dissipated $E(t)$ for both circuits. A bar chart compares total energy dissipated.
Controls: Resistance $R$ slider, capacitance $C$ slider, ramp time $T$ slider (for adiabatic), supply voltage $V_{DD}$ slider, play/pause, speed control, reset.
Behavior: Conventional circuit shows instantaneous step response with exponential charging and fixed $\frac{1}{2}CV_{DD}^2$ dissipation. Adiabatic circuit shows gradual ramp with current proportional to ramp rate. As $T$ increases, the adiabatic energy dissipation visibly decreases. A readout shows the ratio $E_{\text{adiabatic}}/E_{\text{conv}} = 2RC/T$.
Implementation: p5.js with animated circuit diagrams and real-time waveform plots.
</details>

## Energy Recovery Logic

**Energy recovery logic** families are practical CMOS circuit topologies that implement adiabatic switching. Several families have been developed, each balancing circuit complexity against energy efficiency. The three most prominent are 2N-2P (Two N-Two P), ECRL (Efficient Charge Recovery Logic), and PFAL (Positive Feedback Adiabatic Logic).

### Power Clock Design

All adiabatic logic families require a multi-phase **power clock** $\phi(t)$ that ramps between ground and $V_{DD}$ (and back) in a controlled manner. The power clock replaces the static $V_{DD}$ rail of conventional CMOS. A typical four-phase trapezoidal power clock cycle has four stages:

1. **Wait** ($\phi = 0$): outputs are at ground; circuit is idle.
2. **Evaluate** ($\phi$ ramps from $0$ to $V_{DD}$): inputs are stable; outputs charge adiabatically through logic transistors.
3. **Hold** ($\phi = V_{DD}$): outputs are at their final values; results can be sampled by the next stage.
4. **Recover** ($\phi$ ramps from $V_{DD}$ to $0$): charge flows back from output capacitances through the logic transistors into the power clock generator.

The power clock is typically generated by an LC resonant circuit (an inductor $L$ in series with the total load capacitance $C$), which produces a sinusoidal or trapezoidal waveform that naturally recovers energy. The quality factor $Q = \frac{1}{R}\sqrt{L/C}$ of the resonator determines the fraction of energy recovered per cycle:

#### Power Clock Energy Recovery Fraction

$$
\eta = 1 - \frac{\pi}{Q} \approx 1 - \pi R\sqrt{\frac{C}{L}}
$$

where:

- $\eta$ is the fraction of energy recovered per cycle
- $Q$ is the quality factor of the LC resonant power clock
- $R$ is the effective series resistance of the circuit
- High $Q$ (low loss) yields high energy recovery; typical values of $Q = 10$--$100$ recover 70--97% of the switching energy

### 2N-2P Adiabatic Logic

The 2N-2P (Two N-transistor, Two P-transistor) logic family uses complementary NMOS and PMOS networks, similar to conventional CMOS, but powered by a ramping power clock instead of a static supply. Each logic stage consists of:

- An NMOS pull-down network implementing the desired logic function
- A PMOS pull-up network implementing the complementary function
- Dual-rail (true and complement) signal encoding

During the evaluate phase, the power clock ramps up, and the logic function determines which output rail charges. During the recover phase, the power clock ramps down, and charge flows back through the same transistors. The energy dissipated is approximately $\frac{RC}{T}CV_{DD}^2$ per switching event.

The main disadvantage of 2N-2P logic is that it is not fully adiabatic: when inputs change during the evaluate phase, there can be non-adiabatic charge sharing that dissipates energy abruptly.

### Efficient Charge Recovery Logic (ECRL)

ECRL improves on 2N-2P by using cross-coupled PMOS transistors as the pull-up network. The cross-coupling ensures that one output rail is always connected to the power clock through a low-resistance path, reducing non-adiabatic losses. The structure is:

- Cross-coupled PMOS pair: $M_{p1}$ gate connected to $\overline{out}$, $M_{p2}$ gate connected to $out$
- NMOS logic network: implements the desired function between $out$ and ground (controlled by clock phase)
- Complementary NMOS network: implements the complement between $\overline{out}$ and ground

ECRL achieves lower energy dissipation than 2N-2P because the cross-coupling provides a well-defined current path during both evaluate and recover phases, but it requires complementary logic networks, doubling the transistor count for the logic function.

### Positive Feedback Adiabatic Logic (PFAL)

PFAL further improves energy efficiency by adding positive feedback through cross-coupled NMOS transistors in addition to the cross-coupled PMOS pair. This creates a latch-like structure that maintains output levels during the hold phase without requiring static current flow. The PFAL structure consists of:

- Cross-coupled PMOS pull-up pair (as in ECRL)
- Cross-coupled NMOS pair providing positive feedback
- Functional NMOS networks connected in parallel with the cross-coupled NMOS pair

PFAL is considered one of the most energy-efficient adiabatic logic families. Simulations and measurements show energy dissipation reductions of 10x--100x compared to conventional CMOS at operating frequencies of 1--100 MHz.

### Energy Recovery Logic Family Comparison

| Property | 2N-2P | ECRL | PFAL |
|----------|-------|------|------|
| Pull-up structure | Complementary PMOS | Cross-coupled PMOS | Cross-coupled PMOS + NMOS |
| Fully adiabatic | No | Partially | Nearly |
| Transistor overhead | ~2x CMOS | ~2.5x CMOS | ~3x CMOS |
| Energy savings vs. CMOS | 5--20x | 10--50x | 20--100x |
| Maximum practical frequency | ~500 MHz | ~200 MHz | ~100 MHz |
| Power clock phases | 4 | 4 | 4 |
| Circuit complexity | Low | Moderate | High |

The central trade-off in energy recovery logic is **speed versus energy**: higher energy savings require slower operation (larger $T$), and the circuit overhead increases with the sophistication of the energy recovery mechanism. For applications where throughput is paramount (e.g., high-performance processors), adiabatic logic is impractical. For applications where energy is the dominant constraint (e.g., implantable medical devices, remote sensors, space electronics), adiabatic logic offers dramatic advantages.

## Reversible Instruction Set

While reversible gates provide the hardware foundation, practical reversible computing also requires **reversible programming models** at the software level. A reversible instruction set architecture (ISA) ensures that every machine instruction has a unique inverse, so that programs can be run forward or backward without information loss.

### The Janus Programming Language

**Janus**, developed by Christopher Lutz and Howard Derby in 1986 and later formalized by Yokoyama and Gluck (2007), is the most well-known reversible programming language. Its key design principles are:

1. **Every statement has a unique inverse.** The language provides paired constructs: increment ($x$ += $e$) and decrement ($x$ -= $e$); conditional entry and conditional exit; loop and inverse loop.

2. **No irreversible operations.** Assignment $x = e$ is forbidden because it destroys the previous value of $x$. Instead, Janus uses reversible update operators: $x$ += $e$ (which adds $e$ to $x$, invertible by $x$ -= $e$) and $x$ ^= $e$ (XOR-update, self-inverse).

3. **Structured control flow.** Conditionals have the form `if (test) then S1 else S2 fi (assert)`, where the assertion at the exit must be derivable from the branch taken. This ensures that the direction of the conditional can be determined during backward execution.

4. **Loop constructs.** Loops have the form `from (assert) do S loop (test)`, where the entry assertion and exit test together determine the loop behavior in both forward and reverse directions.

A simple example in Janus: computing the factorial of $n$ and storing the result in $f$, then uncomputing:

```
// Forward: compute n! into f
procedure factorial(int n, int f)
    f += 1
    from (f = 1) do
        f *= n
        n -= 1
    loop (n = 0)
```

The inverse of this procedure is automatically derivable by reversing the order of statements and replacing each statement with its inverse:

```
// Backward: uncompute factorial
procedure factorial_inv(int n, int f)
    from (n = 0) do
        n += 1
        f /= n
    loop (f = 1)
    f -= 1
```

### Reversible Processor Architectures

Several reversible processor designs have been proposed that implement reversible ISAs in hardware:

**Pendulum** (Vieri et al., 1998): A reversible RISC processor with a register file, ALU supporting reversible arithmetic (add/subtract, XOR, rotate), and a program counter that can run forward or backward. All instructions are self-inverse or come in inverse pairs. The processor includes a "history stack" that records branch decisions to enable backward execution through conditionals.

**Bob** (Frank, 1999): A reversible processor designed for adiabatic CMOS implementation. It uses a "leapfrog" pipeline where data flows forward through logic stages and then backward for energy recovery, implementing the compute-copy-uncompute paradigm of Bennett at the hardware level.

The key challenge in reversible processor design is **managing control flow reversibility**: branch decisions, function calls, and interrupts all require additional state (history bits) to be stored so that backward execution can follow the same path as the forward execution. This connects directly to the garbage bit problem discussed in the next section.

### Program Inversion

A fundamental property of reversible programs is that any program $P$ has a well-defined **inverse program** $P^{-1}$ that undoes the computation:

$$
P^{-1}(P(s)) = s \quad \text{for all states } s
$$

For Janus programs, $P^{-1}$ is obtained by the following mechanical transformation:

1. Reverse the order of all statements in each block.
2. Replace each statement with its inverse: $x$ += $e$ becomes $x$ -= $e$; `if`/`fi` has its test and assertion swapped; `from`/`loop` has its assertion and test swapped.

This property has applications beyond energy-efficient computing. Program inversion is used in:

- **Debugging:** Running a program backward from a crash state to find the bug.
- **Cryptography:** Reversible encryption naturally provides decryption.
- **Database rollback:** Undoing transactions without storing separate undo logs.
- **Checkpointing:** In combination with Bennett's technique, reversible programs enable memory-efficient checkpointing of long-running simulations.

## Garbage Bits

The most significant practical challenge in reversible computing is the accumulation of **garbage bits**---ancillary output bits that are produced to maintain reversibility but are not part of the desired computation result. Managing garbage bits is essential for both the efficiency of reversible circuits and their applicability to quantum computing.

### Definition and Origin

When an irreversible function $f: \{0,1\}^n \to \{0,1\}^m$ with $m < n$ is embedded into a reversible setting, the reversible version must have at least $n$ output bits (to be injective). The additional $n - m$ output bits constitute garbage. More precisely:

#### Garbage Bit Count for Embedded Functions

$$
G \geq n - m
$$

where:

- $G$ is the minimum number of garbage bits
- $n$ is the number of input bits
- $m$ is the number of output bits of the original function
- For a $k$-input, 1-output Boolean gate, $G \geq k - 1$ garbage bits are needed

For example, embedding a 2-input AND gate via a Toffoli gate produces the output $(a, b, a \wedge b)$: the desired result is $a \wedge b$, and the "garbage" consists of the preserved inputs $a$ and $b$ on the first two output lines. While preserving the inputs is what enables reversibility, these extra outputs accumulate as the circuit grows.

### The Accumulation Problem

In a circuit of $g$ irreversible gates, each embedded reversibly, the total number of garbage bits can be as large as:

$$
G_{\text{total}} = \sum_{i=1}^{g} G_i
$$

For a circuit of $g$ two-input gates, this is $O(g)$ garbage bits. In a large computation, the garbage can vastly exceed the size of the useful output, consuming memory and---critically for quantum computing---creating entanglement with the computational register that prevents interference.

### Bennett's Garbage Cleanup

Bennett's compute-copy-uncompute strategy (described earlier) is the standard method for eliminating garbage bits. The process works as follows for a circuit computing $f(x)$:

**Step 1 (Compute forward):** Apply the reversible circuit for $f$, producing the output $f(x)$ along with garbage $g(x)$:

$$
|x\rangle|0\rangle_{\text{work}}|0\rangle_{\text{out}} \to |x\rangle|g(x)\rangle_{\text{work}}|f(x)\rangle_{\text{out}}
$$

**Step 2 (Copy result):** Use CNOT gates to copy $f(x)$ to a separate clean register:

$$
|x\rangle|g(x)\rangle|f(x)\rangle|0\rangle_{\text{copy}} \to |x\rangle|g(x)\rangle|f(x)\rangle|f(x)\rangle_{\text{copy}}
$$

**Step 3 (Uncompute):** Apply the inverse of the computation in Step 1, restoring the work register to its initial state:

$$
|x\rangle|g(x)\rangle|f(x)\rangle|f(x)\rangle_{\text{copy}} \to |x\rangle|0\rangle_{\text{work}}|0\rangle_{\text{out}}|f(x)\rangle_{\text{copy}}
$$

The net effect is the clean reversible transformation:

$$
|x\rangle|0\rangle \to |x\rangle|f(x)\rangle
$$

with no residual garbage. The work register is returned to its initial state and can be reused for subsequent computations.

### Space Overhead Analysis

The space overhead of garbage management depends on the strategy used:

**Naive approach (no cleanup):** Space grows linearly with computation time: $O(T)$ garbage bits for a computation of $T$ steps. This is unacceptable for long computations.

**Bennett's basic cleanup:** The compute-copy-uncompute strategy requires workspace for the maximum garbage produced during the forward computation, which is $O(S + T)$ where $S$ is the original space and $T$ is the time (since the history tape records $T$ steps). However, after cleanup, only $O(S + m)$ space is occupied (original input plus clean output).

**Bennett's recursive checkpointing:** By dividing the computation into segments and recursively applying the compute-copy-uncompute strategy, Bennett (1989) showed that the space can be reduced to:

#### Recursive Checkpointing Space Bound

$$
S_{\text{rev}} = O(S \cdot k \cdot T^{1/k})
$$

where:

- $S$ is the space used by the original irreversible computation
- $T$ is the time used by the original computation
- $k$ is the number of recursion levels (a tunable parameter)
- The time overhead is $T_{\text{rev}} = O(T \cdot (2k)^k / k!)$, which is $O(T^{1+\epsilon})$ for appropriate choice of $k$

For large computations, the optimal choice $k = O(\log T / \log \log T)$ yields:

$$
S_{\text{rev}} = O(S \cdot \log T), \quad T_{\text{rev}} = O(T^{1+\epsilon})
$$

for any $\epsilon > 0$. This demonstrates that garbage can be managed with only logarithmic space overhead, at the cost of a modest polynomial time increase.

### Garbage Bits in Quantum Computing

The garbage bit problem is even more critical in quantum computing than in classical reversible computing. In a quantum computation, garbage bits that are entangled with the computational register prevent the interference effects that quantum algorithms rely on. Specifically, if a quantum subroutine produces garbage:

$$
\sum_x \alpha_x |x\rangle|0\rangle \to \sum_x \alpha_x |f(x)\rangle|g(x)\rangle
$$

then the garbage register $|g(x)\rangle$ acts as a "which-path" marker that destroys the coherence between different branches of the superposition. The reduced density matrix of the output register is:

$$
\rho_{\text{out}} = \sum_x |\alpha_x|^2 |f(x)\rangle\langle f(x)|
$$

which is a classical mixture---all quantum advantage is lost. Bennett's uncomputation strategy is therefore not merely an optimization in the quantum setting; it is a **necessity** for maintaining quantum coherence. This is why uncomputation is a standard step in virtually every quantum algorithm, as we will see in Chapters 7--9.

#### Diagram: Bennett Compute-Copy-Uncompute

<iframe src="../../sims/bennett-uncompute/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Step-by-step visualization of Bennett's compute-copy-uncompute garbage cleanup strategy</summary>
Type: MicroSim
Learning objective: Understand how Bennett's three-stage strategy (compute, copy, uncompute) eliminates garbage bits while preserving the desired output in a reversible computation. Bloom level: Analyze.
Visual elements: A horizontal pipeline showing three stages: Compute (left, highlighted in blue), Copy (center, green), and Uncompute (right, orange). Register contents are displayed as labeled bit strings at each stage: input register $|x\rangle$, work register (showing garbage accumulation and cleanup), output register (showing the copy of $f(x)$), and a separate clean output register. Arrows indicate the flow of computation forward and then backward. Garbage bits are highlighted in red during accumulation and fade to gray as they are cleaned up.
Controls: Input value selector, step-through button (advance one stage at a time), auto-play with speed control, choice of example function (AND, full adder, 3-bit multiplication), reset.
Behavior: Users step through the three stages, observing how garbage accumulates during the forward computation, the result is copied to a clean register, and then the inverse computation erases all garbage. The work register visibly returns to all zeros. A counter tracks total garbage bits at each stage.
Implementation: p5.js with animated register displays and stage-by-stage progression.
</details>

### Summary of Garbage Bit Management

| Aspect | Without cleanup | With Bennett cleanup | With recursive checkpointing |
|--------|----------------|---------------------|------------------------------|
| Garbage at completion | $O(T)$ bits | 0 bits | 0 bits |
| Workspace required | $O(T)$ | $O(T)$ (during compute) | $O(S \log T)$ |
| Time overhead | $1\times$ | $2\times$ | $O(T^{\epsilon})$ factor |
| Quantum compatible | No (decoherence) | Yes | Yes |
| Reusable workspace | No | Yes | Yes |

## Reversible Computing and the Path to Quantum Computation

The concepts developed in this chapter form an essential bridge between classical computing and the quantum paradigm. Let us summarize the key connections:

1. **Landauer's principle** ([Chapter 2](../02-physical-limits/index.md)) establishes that information erasure has a thermodynamic cost. Reversible computing avoids this cost by never erasing information.

2. **Logical reversibility** means computing only bijective functions. Bennett's proof shows that this is always possible, so reversibility does not limit computational universality.

3. **The Toffoli and Fredkin gates** provide universal gate sets for classical reversible computation. Their matrix representations are permutation matrices---a special case of unitary matrices.

4. **Adiabatic computing** provides a physical mechanism for approaching the zero-dissipation limit predicted by theory, with energy dissipation scaling as $RC/T$.

5. **Garbage bit management** through Bennett's uncomputation is essential in the quantum setting, where garbage destroys coherence.

The transition to quantum computing (Chapters 7--9) generalizes reversible classical computation in a precise sense: quantum gates are described by **unitary matrices**, which include permutation matrices as a special case. The Toffoli gate, for example, is both a valid classical reversible gate and a valid quantum gate. Quantum computing extends the gate set from permutations (which map basis states to basis states) to arbitrary unitary transformations (which create superpositions of basis states). The reversible computing framework developed here---bijective functions, ancilla management, compute-copy-uncompute---carries over directly and forms the scaffolding on which quantum algorithms are built.

## References

1. R. Landauer, "Irreversibility and Heat Generation in the Computing Process," *IBM Journal of Research and Development*, vol. 5, no. 3, pp. 183--191, 1961.
2. C. H. Bennett, "Logical Reversibility of Computation," *IBM Journal of Research and Development*, vol. 17, no. 6, pp. 525--532, 1973.
3. C. H. Bennett, "Time/Space Trade-offs for Reversible Computation," *SIAM Journal on Computing*, vol. 18, no. 4, pp. 766--776, 1989.
4. T. Toffoli, "Reversible Computing," in *Automata, Languages and Programming*, Lecture Notes in Computer Science, vol. 85, pp. 632--644, Springer, 1980.
5. E. Fredkin and T. Toffoli, "Conservative Logic," *International Journal of Theoretical Physics*, vol. 21, no. 3--4, pp. 219--253, 1982.
6. T. Yokoyama and R. Gluck, "A Reversible Programming Language and its Invertible Self-Interpreter," in *Proceedings of the ACM SIGPLAN Workshop on Partial Evaluation and Semantics-Based Program Manipulation*, pp. 144--153, 2007.
7. A. G. Dickinson and J. S. Denker, "Adiabatic Dynamic Logic," *IEEE Journal of Solid-State Circuits*, vol. 30, no. 3, pp. 311--315, 1995.
8. A. Vetuli, S. Di Pascoli, and L. M. Reyneri, "Positive Feedback in Adiabatic Logic," *Electronics Letters*, vol. 32, no. 20, pp. 1867--1869, 1996.
9. M. P. Frank, "Reversibility for Efficient Computing," Ph.D. dissertation, MIT, 1999.
10. M. Li and P. Vitanyi, "Reversibility and Adiabatic Computation: Trading Time and Space for Energy," *Proceedings of the Royal Society A*, vol. 452, pp. 769--789, 1996.
