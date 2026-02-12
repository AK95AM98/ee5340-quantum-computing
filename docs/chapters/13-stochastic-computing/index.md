---
title: Stochastic Computing
description: Stochastic computing paradigm with number encoding, logic gates, variance analysis, and applications
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Stochastic Computing

## Summary

This chapter introduces the stochastic computing paradigm as an alternative approach to deterministic digital computation. We develop stochastic number representations in both unipolar and bipolar encoding, analyze stochastic logic gates for multiplication and addition, derive variance bounds on accuracy, examine correlation effects and decorrelation techniques, and explore applications in image processing and neural networks.

## Concepts Covered

This chapter covers the following 10 concepts:

1. Stochastic Number Encoding
2. Stochastic Bit Stream
3. Stochastic Multiplication
4. Stochastic Addition
5. Mux-Based Stochastic Logic
6. Variance In Stochastic Systems
7. Correlation Effects
8. Decorrelation Techniques
9. Stochastic Error Tolerance
10. Stochastic Image Processing

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)
- [Chapter 4: Classical Computing Fundamentals](../04-classical-computing/index.md)

---

## Introduction

The preceding chapters of this textbook have developed the theoretical and physical foundations of quantum computation, a paradigm that exploits superposition, entanglement, and interference to achieve computational speedups for certain problem classes. We now turn to a fundamentally different unconventional computing paradigm---**stochastic computing** (SC)---which represents numerical values not as fixed binary words but as random bit streams whose statistical properties encode the desired information. First proposed by John von Neumann in 1956 and independently formalized by Brian Gaines in 1969, stochastic computing trades temporal resolution for extreme hardware simplicity: arithmetic operations such as multiplication reduce to single logic gates, and the resulting circuits exhibit graceful degradation under noise. These properties make SC particularly attractive for applications in neural network inference, image processing, and error-tolerant signal processing, where approximate computation suffices and energy efficiency is paramount.

This chapter develops the mathematical theory of stochastic computing from first principles. We begin with the encoding schemes---unipolar and bipolar---that map real numbers onto probability spaces, then construct stochastic bit streams as the physical realization of these encodings. We derive the gate-level implementations of multiplication and addition, analyze the fundamental variance limitations that govern accuracy, examine how correlation between bit streams can catastrophically distort results or be deliberately exploited, and present decorrelation techniques that restore computational correctness. We conclude with applications to image processing and a discussion of stochastic computing's intrinsic error tolerance.

The connections to information theory (Chapter 3) are deep: a stochastic bit stream of length $N$ carries at most $\log_2(N+1)$ bits of information about the encoded value, yet this information is distributed uniformly across every bit position, yielding the fault-tolerance properties that deterministic binary representations lack.

## Stochastic Number Encoding

**Stochastic number encoding** is the foundational representation scheme of stochastic computing, in which a real number $x$ is represented by the probability $P$ that a random bit in a bit stream takes the value 1. Two principal encoding formats exist: unipolar and bipolar.

### Unipolar Encoding

In the **unipolar** format, a value $x \in [0, 1]$ is encoded as the probability $P(X = 1) = x$. Each bit in the stream is an independent Bernoulli random variable with parameter $x$.

#### Unipolar Encoding Definition

$$
x = P(X_i = 1), \quad x \in [0, 1]
$$

where:

- $X_i \in \{0, 1\}$ is the $i$-th bit of the stochastic stream
- $P(X_i = 1) = x$ is the probability that any given bit equals 1
- The value $x = 0$ corresponds to the all-zeros stream, and $x = 1$ to the all-ones stream

### Bipolar Encoding

The **bipolar** format extends the representable range to $[-1, 1]$ by mapping a value $y \in [-1, 1]$ to the probability $P(Y = 1) = (y + 1)/2$. This encoding is particularly useful for computations requiring signed arithmetic, such as those arising in neural network weights.

#### Bipolar Encoding Definition

$$
y = 2P(Y_i = 1) - 1, \quad y \in [-1, 1]
$$

where:

- $Y_i \in \{0, 1\}$ is the $i$-th bit of the stochastic stream
- $P(Y_i = 1) = (y + 1)/2$ maps the bipolar value to a valid probability
- $y = -1$ corresponds to $P = 0$ (all zeros), $y = 0$ to $P = 0.5$, and $y = 1$ to $P = 1$ (all ones)

The following table summarizes and contrasts the two encoding schemes.

| Property | Unipolar Encoding | Bipolar Encoding |
|----------|-------------------|------------------|
| Value range | $[0, 1]$ | $[-1, 1]$ |
| Probability mapping | $P = x$ | $P = (y+1)/2$ |
| Inverse mapping | $x = P$ | $y = 2P - 1$ |
| Zero representation | $P = 0$ (all zeros) | $P = 0.5$ (half ones) |
| One representation | $P = 1$ (all ones) | $P = 1$ (all ones) |
| Negative values | Not supported | $P < 0.5$ |
| AND gate computes | Multiplication $x_1 \cdot x_2$ | Not standard multiplication |
| XNOR gate computes | Not standard multiplication | Multiplication $y_1 \cdot y_2$ |

The choice between unipolar and bipolar encoding has profound consequences for circuit design. Unipolar encoding simplifies multiplication (a single AND gate) but cannot represent negative numbers. Bipolar encoding supports the full signed range at the cost of requiring XNOR gates for multiplication and more complex addition circuits. In practice, many modern stochastic computing systems favor bipolar encoding because neural network weights and signal processing coefficients are naturally signed quantities.

## Stochastic Bit Stream

A **stochastic bit stream** (SBS) is the physical realization of a stochastic number encoding: a temporal sequence of bits $B = (b_1, b_2, \ldots, b_N)$ of length $N$, where each bit $b_i \in \{0, 1\}$ is generated according to the encoding probability. In the ideal case, the bits are independent and identically distributed (i.i.d.) Bernoulli random variables.

### Generation via Comparators

The standard method for generating a stochastic bit stream from a conventional $n$-bit binary number $x$ employs a **comparator** and a **random number generator** (RNG). At each clock cycle $i$, a random number $R_i$ is drawn uniformly from $\{0, 1, \ldots, 2^n - 1\}$, and the output bit is:

#### Stochastic Bit Stream Generation

$$
b_i = \begin{cases} 1 & \text{if } R_i < x \\ 0 & \text{if } R_i \geq x \end{cases}
$$

where:

- $x \in \{0, 1, \ldots, 2^n - 1\}$ is the $n$-bit input value
- $R_i$ is a uniformly distributed random integer from an RNG (typically a linear-feedback shift register, or LFSR)
- The resulting probability $P(b_i = 1) = x / 2^n$ encodes the fractional value $x/2^n$

#### Diagram: Stochastic Bit Stream Generator
<iframe src="../../sims/stochastic-bit-stream-generator/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Stochastic bit stream generation from binary input using a comparator and RNG</summary>
Type: MicroSim
Learning objective: Understand how a conventional binary number is converted into a stochastic bit stream through comparison with random numbers. Bloom level: Apply.
Visual elements: An n-bit binary input slider (0-255 for 8-bit), an animated random number generator producing uniform values each clock cycle, a comparator that outputs 1 or 0, and a scrolling bit stream display. A running average counter shows the estimated probability converging toward the true value as stream length increases. A histogram shows the distribution of ones and zeros.
Controls: Input value slider, stream length selector (64, 256, 1024, 4096), play/pause button, speed control, reset button.
Behavior: Each clock tick generates a new random number, compares with the input, and appends a bit to the stream. The running average visually converges to the encoded probability. Longer streams yield more accurate estimates.
Implementation: p5.js canvas with animated bit stream and real-time statistics.
</details>

### Reconstruction

The encoded value is recovered from an observed bit stream of length $N$ by computing the **sample mean**:

#### Sample Mean Estimator

$$
\hat{x} = \frac{1}{N}\sum_{i=1}^{N} b_i
$$

where:

- $\hat{x}$ is the estimated value of the stochastic number
- $N$ is the stream length (number of observed bits)
- The estimator $\hat{x}$ is unbiased: $E[\hat{x}] = x$

The precision of the estimate improves as $\sqrt{N}$, which is a fundamental limitation of stochastic computing: to achieve $n$ bits of precision, one requires a stream of length $N = O(2^{2n})$, compared to $O(2^n)$ clock cycles for conventional binary arithmetic. This exponential cost in precision is the principal trade-off for the extreme simplicity of stochastic arithmetic circuits.

## Stochastic Multiplication

**Stochastic multiplication** is arguably the most elegant operation in stochastic computing. In the unipolar encoding, multiplication of two values reduces to a single AND gate; in the bipolar encoding, it reduces to a single XNOR gate.

### Unipolar Multiplication via AND Gate

Given two independent stochastic bit streams $A = (a_1, \ldots, a_N)$ and $B = (b_1, \ldots, b_N)$ encoding unipolar values $x_A$ and $x_B$ respectively, the bitwise AND produces a new stream $C$ where $c_i = a_i \wedge b_i$. The probability of a 1 in the output stream is:

#### Unipolar AND Multiplication

$$
P(c_i = 1) = P(a_i = 1) \cdot P(b_i = 1) = x_A \cdot x_B
$$

where:

- $a_i$ and $b_i$ are assumed **statistically independent**
- The AND gate output $c_i = a_i \wedge b_i$ encodes the product $x_A \cdot x_B$
- Independence is crucial; violation leads to incorrect results (see Correlation Effects)

This is a remarkable result: an operation that requires an $n \times n$-bit hardware multiplier in conventional binary arithmetic---$O(n^2)$ gates with $O(n)$ propagation delay---reduces to a single two-input AND gate with unit delay.

### Bipolar Multiplication via XNOR Gate

For bipolar-encoded streams $A$ and $B$ representing values $y_A$ and $y_B$, the XNOR gate computes:

#### Bipolar XNOR Multiplication

$$
P(c_i = 1) = P(a_i = b_i) = P(a_i = 1)P(b_i = 1) + P(a_i = 0)P(b_i = 0)
$$

Substituting $P(a_i = 1) = (y_A + 1)/2$ and $P(b_i = 1) = (y_B + 1)/2$ and simplifying:

$$
P(c_i = 1) = \frac{y_A y_B + 1}{2}
$$

which, under the bipolar decoding $y_C = 2P(c_i = 1) - 1$, yields:

$$
y_C = y_A \cdot y_B
$$

The XNOR gate thus computes exact bipolar multiplication, again assuming statistical independence of the input streams.

| Operation | Encoding | Gate | Gate Count | Latency |
|-----------|----------|------|------------|---------|
| Multiplication | Unipolar | AND | 1 | 1 gate delay |
| Multiplication | Bipolar | XNOR | 1 | 1 gate delay |
| Binary multiply ($n$-bit) | Binary | Array multiplier | $O(n^2)$ | $O(n)$ gate delays |
| Binary multiply ($n$-bit) | Binary | Wallace tree | $O(n^2)$ | $O(\log n)$ gate delays |

## Stochastic Addition

Stochastic addition is inherently more complex than multiplication because the sum of two probabilities can exceed the representable range $[0,1]$ or $[-1,1]$. Two principal approaches address this: **scaled addition** via a multiplexer and **OR-gate addition** with constraints.

### OR-Gate Addition (Unipolar, Approximate)

For two independent unipolar streams encoding $x_A$ and $x_B$, the OR gate computes:

#### OR-Gate Approximate Addition

$$
P(a_i \vee b_i = 1) = 1 - (1-x_A)(1-x_B) = x_A + x_B - x_A x_B
$$

where:

- The output equals $x_A + x_B$ only when $x_A x_B \approx 0$, i.e., when both values are small
- For small operands, the OR gate provides a good approximation to addition
- The cross-term $x_A x_B$ introduces a systematic negative bias

This approximation is useful in limited contexts but is generally inadequate for precise arithmetic. The preferred approach is multiplexer-based scaled addition, discussed in the next section.

## Mux-Based Stochastic Logic

The **multiplexer** (MUX) is the fundamental building block for stochastic addition and more general linear combinations. A 2-to-1 multiplexer with a stochastic selecting input computes a weighted average of its data inputs.

### Scaled Addition

Given two stochastic bit streams $A$ and $B$ encoding values $x_A$ and $x_B$ (unipolar), and a selecting stream $S$ encoding value $s$, the MUX output is:

#### MUX Scaled Addition

$$
P(z_i = 1) = s \cdot x_A + (1 - s) \cdot x_B
$$

where:

- $z_i = s_i \cdot a_i + \bar{s}_i \cdot b_i$ is the MUX output at clock cycle $i$
- $s_i$ is the selecting bit: when $s_i = 1$, the output passes $a_i$; when $s_i = 0$, it passes $b_i$
- Setting $s = 0.5$ (a fair coin) yields the **scaled sum** $(x_A + x_B)/2$

The scaled addition via MUX is the workhorse of stochastic arithmetic. For equal weighting ($s = 0.5$), the result is always within $[0, 1]$, avoiding overflow. The division by 2 is the cost of keeping the result in range, and multiple additions accumulate this scaling factor.

### Generalized Weighted Summation

An $M$-to-1 multiplexer with a uniformly random $\lceil \log_2 M \rceil$-bit selecting input computes:

#### Generalized MUX Summation

$$
P(z_i = 1) = \frac{1}{M}\sum_{j=1}^{M} x_j
$$

where:

- $x_j$ is the value encoded by the $j$-th input stream
- The selecting input uniformly routes each input to the output with probability $1/M$
- This computes the arithmetic mean of $M$ stochastic inputs using a single MUX

This construction is particularly powerful for neural network inference, where the weighted sum of inputs $\sum_j w_j x_j$ can be implemented by adjusting the selection probabilities to match the weights $w_j$.

#### Diagram: Stochastic Arithmetic Unit
<iframe src="../../sims/stochastic-arithmetic-unit/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive demonstration of stochastic multiplication (AND, XNOR) and addition (MUX)</summary>
Type: MicroSim
Learning objective: Visualize how single logic gates perform arithmetic on stochastic bit streams and observe the convergence of output statistics. Bloom level: Analyze.
Visual elements: Two input value sliders generating stochastic bit streams displayed as scrolling rows of colored bits (green for 1, gray for 0). Three output streams shown simultaneously: AND gate (unipolar multiply), XNOR gate (bipolar multiply), and MUX (scaled add). Each output has a running average display and error bar showing deviation from the exact result. A truth table overlay highlights which gate input combinations produce output 1.
Controls: Two input value sliders (0 to 1 for unipolar, -1 to 1 for bipolar), encoding mode toggle (unipolar/bipolar), stream length selector, animation speed, reset.
Behavior: Bit streams are generated in real time. The outputs are computed gate-by-gate, and running averages converge toward the theoretical values. Users can observe how different input combinations affect convergence speed and accuracy.
Implementation: p5.js with real-time bit stream animation and statistical overlays.
</details>

The following list summarizes the key stochastic arithmetic operations and their hardware costs:

- **Multiplication (unipolar):** Single AND gate; computes $x_A \cdot x_B$; requires independent inputs
- **Multiplication (bipolar):** Single XNOR gate; computes $y_A \cdot y_B$; requires independent inputs
- **Scaled addition:** Single 2:1 MUX with $s = 0.5$; computes $(x_A + x_B)/2$; selecting stream must be independent of data streams
- **Weighted sum:** $M$:1 MUX with programmable selection; computes $\sum_j w_j x_j$; weights encoded in selection probabilities
- **Subtraction (bipolar):** Single XOR gate; computes $-y_A \cdot y_B$ (negation composed with XNOR)
- **Absolute value (bipolar):** MUX with input and its complement; maps $y \mapsto |y|$

## Variance In Stochastic Systems

The fundamental limitation of stochastic computing is the **variance** inherent in representing numbers as finite-length random bit streams. This variance determines the accuracy of every stochastic computation and governs the stream length required to achieve a target precision.

### Variance of a Single Stochastic Number

For a unipolar stochastic number $x$ encoded in a stream of length $N$, the sample mean estimator $\hat{x} = \frac{1}{N}\sum_i b_i$ has variance:

#### Single-Stream Variance

$$
\text{Var}(\hat{x}) = \frac{x(1-x)}{N}
$$

where:

- $x$ is the true encoded value
- $N$ is the stream length
- The variance is maximized at $x = 0.5$, yielding $\text{Var}_{\max} = 1/(4N)$
- The variance vanishes at the endpoints $x = 0$ and $x = 1$

### Precision-Length Relationship

To achieve a precision of $\epsilon$ (i.e., $|\hat{x} - x| \leq \epsilon$ with high probability), we require by Chebyshev's inequality:

#### Precision Bound

$$
N \geq \frac{x(1-x)}{\epsilon^2 \delta} \leq \frac{1}{4\epsilon^2 \delta}
$$

where:

- $\epsilon$ is the desired absolute accuracy
- $\delta$ is the allowed failure probability ($P(|\hat{x} - x| > \epsilon) \leq \delta$)
- For $n$ bits of precision ($\epsilon = 2^{-n}$), one needs $N = O(2^{2n})$ stream bits

This quadratic scaling is the central cost of stochastic computing. Achieving 8 bits of precision requires streams of length $\sim 2^{16} = 65536$, whereas a conventional binary multiplier operates on 8-bit words directly. The trade-off is justified only when the hardware savings per clock cycle (single gates versus full multiplier circuits) outweigh the increased number of clock cycles.

### Variance Propagation Through Multiplication

When two independent stochastic streams encoding $x_A$ and $x_B$ are multiplied via an AND gate, the variance of the product estimate $\hat{z} = \widehat{x_A \cdot x_B}$ is:

#### Multiplication Variance

$$
\text{Var}(\hat{z}) = \frac{x_A x_B(1 - x_A x_B)}{N}
$$

where:

- The product $x_A x_B$ plays the role of the effective probability in the output stream
- Cascading multiple multiplications increases effective variance, since each stage introduces its own stochastic noise
- For $k$ cascaded multiplications of equal values $x$, the output variance scales as $\text{Var} \approx x^k(1 - x^k)/N$

| Stream length $N$ | Max variance $1/(4N)$ | Equivalent precision (bits) | Clock cycles (for $n$-bit binary multiply) |
|---|---|---|---|
| 64 | $3.9 \times 10^{-3}$ | ~4 bits | 1 (8-bit multiplier) |
| 256 | $9.8 \times 10^{-4}$ | ~5 bits | 1 |
| 1024 | $2.4 \times 10^{-4}$ | ~6 bits | 1 |
| 4096 | $6.1 \times 10^{-5}$ | ~7 bits | 1 |
| 65536 | $3.8 \times 10^{-6}$ | ~8 bits | 1 |

## Correlation Effects

The correctness of stochastic arithmetic operations critically depends on the **statistical independence** of the input bit streams. When two streams are correlated, the output of logic gates can deviate dramatically from the intended arithmetic operation. Understanding and managing correlation is the central challenge in designing stochastic computing systems.

### Stochastic Cross-Correlation

The **stochastic computing correlation** (SCC) between two bit streams $A$ and $B$ is defined as:

#### Stochastic Computing Correlation

$$
\text{SCC}(A, B) = \begin{cases} \frac{P(a=1, b=1) - P(a=1)P(b=1)}{\min(P(a=1), P(b=1)) - P(a=1)P(b=1)} & \text{if overlap} > \text{expected} \\ \frac{P(a=1, b=1) - P(a=1)P(b=1)}{P(a=1)P(b=1) - \max(P(a=1)+P(b=1)-1, 0)} & \text{if overlap} < \text{expected} \end{cases}
$$

where:

- $P(a=1, b=1)$ is the joint probability that both streams have a 1 at the same position
- $\text{SCC} = 0$ indicates independence (uncorrelated streams)
- $\text{SCC} = 1$ indicates maximal positive correlation (identical streams)
- $\text{SCC} = -1$ indicates maximal negative correlation (anti-correlated streams)

### Effects of Correlation on Multiplication

When two correlated streams are fed to an AND gate, the output probability deviates from the product:

- **Independent streams** ($\text{SCC} = 0$): AND computes $P(a \wedge b) = x_A \cdot x_B$ (correct multiplication)
- **Maximally correlated** ($\text{SCC} = 1$, identical streams): AND computes $P(a \wedge a) = x_A$ (identity, not multiplication)
- **Maximally anti-correlated** ($\text{SCC} = -1$): AND computes $P(a \wedge b) = \max(x_A + x_B - 1, 0)$ (saturating subtraction)

This can be expressed compactly. When two identical streams $A$ are fed to an AND gate, the output encodes $x_A$ rather than $x_A^2$. This is a catastrophic error: squaring 0.5 should yield 0.25, but the correlated AND gate yields 0.5.

### Deliberate Correlation Exploitation

While correlation is usually detrimental, it can be deliberately exploited. For instance:

- **Computing $\min(x_A, x_B)$:** Use maximally positively correlated streams with an AND gate
- **Computing $\max(x_A, x_B)$:** Use maximally positively correlated streams with an OR gate
- **Computing $|x_A - x_B|$:** Use maximally positively correlated streams with an XOR gate

This yields a complete set of non-smooth operations that are impossible to compute with independent streams, extending the computational repertoire of stochastic logic.

#### Diagram: Correlation Effects Visualizer
<iframe src="../../sims/correlation-effects-visualizer/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive visualization of how correlation between stochastic bit streams affects AND gate output</summary>
Type: MicroSim
Learning objective: Demonstrate the dramatic impact of stream correlation on stochastic computation accuracy. Bloom level: Analyze.
Visual elements: Two parallel bit streams displayed as colored bars, with matching bits highlighted. A correlation slider controls the SCC value from -1 to +1. The AND gate output stream is shown below. Three plots display: (1) the theoretical output as a function of SCC, (2) the measured output from the simulation, and (3) the error between measured and ideal uncorrelated multiplication. A table shows the expected output for SCC = -1, 0, +1.
Controls: Two input probability sliders, SCC slider (-1 to +1), stream length selector, play/pause, reset.
Behavior: As the SCC slider moves, the bit streams are regenerated with the specified correlation structure (using the common random number technique). The AND gate output probability visibly deviates from $x_A \cdot x_B$ as correlation increases.
Implementation: p5.js with correlated Bernoulli stream generation and real-time statistics.
</details>

## Decorrelation Techniques

Since correlation can corrupt stochastic computations, practical stochastic computing systems must employ **decorrelation techniques** to ensure that bit streams entering logic gates are sufficiently independent. Several approaches have been developed, each with distinct trade-offs in hardware cost and effectiveness.

### Independent RNG Sources

The most straightforward decorrelation method is to generate each stochastic bit stream using a **separate, independently seeded random number generator**. If each comparator in the system uses its own LFSR with a distinct seed, the resulting bit streams are statistically independent (or nearly so, given the pseudo-random nature of LFSRs).

- **Advantage:** Guaranteed independence; no additional logic required beyond separate RNGs
- **Disadvantage:** Hardware cost scales linearly with the number of streams; LFSRs consume area and power
- **Typical implementation:** Each input uses its own maximal-length LFSR of $n$ bits, requiring $n$ flip-flops per stream

### Regeneration via Isolation

When a stochastic bit stream is used as input to multiple gates (creating a fan-out), the copies are perfectly correlated. **Regeneration** breaks this correlation by converting the stream back to a binary number (via a counter) and then regenerating a fresh stochastic stream from that number using an independent RNG.

#### Regeneration Decorrelation

$$
\hat{x} = \frac{1}{N}\sum_{i=1}^{N} a_i \quad \longrightarrow \quad b_j = \begin{cases} 1 & R'_j < \hat{x} \cdot 2^n \\ 0 & \text{otherwise} \end{cases}
$$

where:

- $\hat{x}$ is the estimated value from counting the original stream $A$
- $R'_j$ is drawn from an independent RNG
- The regenerated stream $B$ is independent of $A$ but encodes the same (estimated) value

The cost of regeneration is a counter ($n$ bits), a new RNG, and a comparator---essentially replicating the original conversion hardware. Additionally, the estimation step introduces quantization error proportional to $1/N$.

### LFSR Sharing with Rotation

A more area-efficient approach uses a **single LFSR** with different **bit rotations** to generate quasi-independent streams. If an $n$-bit maximal-length LFSR produces the sequence $R_1, R_2, \ldots$, then the rotated sequence $R_1 \gg k, R_2 \gg k, \ldots$ (circular right shift by $k$ positions) has low cross-correlation with the original for appropriate shift values.

- **Advantage:** Single LFSR serves multiple comparators; minimal area overhead
- **Disadvantage:** Streams are not truly independent; residual correlation exists, especially for short LFSRs
- **Best practice:** Use LFSR length $n \geq 2 \times$ (number of precision bits); choose rotation amounts that are coprime to the LFSR period

### Decorrelation Summary

| Technique | Hardware Cost | Decorrelation Quality | Latency Overhead |
|-----------|--------------|----------------------|------------------|
| Independent RNGs | High ($n$ flip-flops per stream) | Excellent | None |
| Regeneration | Moderate (counter + RNG + comparator) | Good (limited by quantization) | $N$ cycles for counting |
| LFSR rotation | Low (single LFSR + barrel shifter) | Moderate (pseudo-independence) | None |
| Clock domain isolation | Moderate (clock crossing logic) | Good | Small synchronization delay |

## Stochastic Error Tolerance

One of the most compelling properties of stochastic computing is its inherent **error tolerance**---the ability to produce approximately correct results even in the presence of bit-level errors. This property distinguishes SC from conventional binary arithmetic, where a single bit flip in the most significant bit (MSB) can corrupt the result by up to 50%.

### Uniform Bit Significance

In a conventional $n$-bit binary representation, bit $k$ carries weight $2^k$. An error in bit $k$ causes a magnitude-$2^k$ error in the represented value. In stark contrast, every bit in a stochastic stream carries equal weight $1/N$:

#### Uniform Bit Weight Property

$$
\Delta \hat{x}_{\text{single bit flip}} = \frac{1}{N}
$$

where:

- $N$ is the stream length
- A single bit error changes the estimated value by exactly $\pm 1/N$, regardless of the position of the error
- This is the **uniform significance property**: no bit is more important than any other

This property means that random noise affecting individual bits causes a graceful, bounded degradation in accuracy rather than a catastrophic failure. If a fraction $\alpha$ of bits in a stream of length $N$ are randomly flipped, the expected error in the decoded value is:

#### Error Under Random Bit Flips

$$
E[|\hat{x}_{\text{noisy}} - x|] \leq \alpha
$$

where:

- $\alpha$ is the bit error rate (fraction of flipped bits)
- The error scales linearly with $\alpha$, independent of $N$ (for large $N$)
- For comparison, a binary number with bit error rate $\alpha$ suffers expected error $\sim \alpha \cdot 2^{n-1}/(2^n - 1) \cdot n$, which is dominated by MSB errors

### Graceful Degradation Under Soft Errors

In radiation-hardened or ultra-low-voltage environments where transient faults (soft errors) are common, stochastic computing provides a natural resilience:

- **Binary system:** A soft error in an adder's carry chain can corrupt the entire sum; error detection/correction codes (ECC) are required
- **Stochastic system:** A soft error in an AND gate flips one output bit, shifting the result by $1/N$; no ECC needed

This makes stochastic computing attractive for aerospace, medical implant, and IoT applications where reliability constraints are severe but approximate results are acceptable.

#### Diagram: Error Tolerance Comparison
<iframe src="../../sims/stochastic-error-tolerance/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Side-by-side comparison of error impact on binary versus stochastic number representations</summary>
Type: MicroSim
Learning objective: Demonstrate the graceful degradation property of stochastic computing compared to catastrophic failure modes in binary representation. Bloom level: Evaluate.
Visual elements: Left panel shows an 8-bit binary number with individual bits that can be toggled (simulating errors) and the resulting decimal value, with error magnitude displayed. Right panel shows a stochastic bit stream of configurable length with random bit flips injected, and the resulting estimated value with error magnitude. A comparison bar chart shows the error magnitude for both representations at varying bit error rates (0.01, 0.05, 0.1, 0.2). Color coding highlights low errors (green) through high errors (red).
Controls: Input value slider, bit error rate slider (0 to 0.5), stream length selector, binary bit toggle buttons, inject random errors button, reset.
Behavior: Users can manually flip bits in the binary representation and observe catastrophic changes (especially MSB), or inject random errors into the stochastic stream and observe the modest, predictable degradation. The comparison chart updates in real time.
Implementation: p5.js with dual-panel layout, interactive bit manipulation, and statistical comparison.
</details>

### Quantitative Error Bounds

The mean squared error (MSE) of a stochastic computation under a noisy channel with bit error rate $\alpha$ can be bounded. For a unipolar value $x$ encoded in a stream of length $N$ with i.i.d. bit flips at rate $\alpha$, the effective decoded value is:

#### Noisy Channel MSE

$$
\text{MSE} = E[(\hat{x}_{\text{noisy}} - x)^2] = \frac{x(1-x)}{N} + \alpha(1 - 2\alpha)(1 - 2x)^2 \cdot \frac{1}{N} + \alpha(1-\alpha)\frac{1}{N}
$$

For large $N$ and small $\alpha$, the dominant contribution is the intrinsic stochastic variance $x(1-x)/N$, and the noise-induced terms are additive corrections. This contrasts sharply with binary arithmetic, where the MSE due to bit errors does not diminish with word length---an MSB error always causes an $O(1)$ fractional error.

## Stochastic Image Processing

**Stochastic image processing** is one of the most successful application domains for stochastic computing, exploiting the paradigm's hardware simplicity and error tolerance for operations on pixel values. Since pixel intensities are naturally bounded in $[0, 1]$ (after normalization) and moderate precision (8 bits) is visually sufficient, stochastic computing's strengths align well with image processing requirements.

### Edge Detection

A basic edge detection filter computes the gradient magnitude at each pixel by approximating the partial derivatives using finite differences. The Roberts cross operator, for example, computes:

#### Roberts Cross Gradient

$$
G = \sqrt{(I_{i,j} - I_{i+1,j+1})^2 + (I_{i,j+1} - I_{i+1,j})^2}
$$

where:

- $I_{i,j}$ is the normalized pixel intensity at position $(i,j)$
- The differences and squaring operations can be implemented using XOR gates (for absolute difference in bipolar encoding) and AND gates (for squaring)
- The square root is approximated via a lookup-free stochastic circuit using FSM-based computation

In a stochastic implementation, each pixel intensity is converted to a stochastic stream, and the entire gradient computation at each pixel requires only a handful of logic gates, compared to the multipliers and adders needed in a conventional implementation.

### Gamma Correction

Gamma correction, the nonlinear mapping $y = x^\gamma$, is a standard image processing operation for display calibration. In stochastic computing, this can be approximated by cascading AND gates:

- **$\gamma = 2$:** Feed the same stream (or a correlated copy) into a 2-input AND gate: $P(a \wedge a) = x$ (using the identity property of correlated streams), or use two independent streams: $P(a \wedge b) = x^2$
- **$\gamma = k$ (integer):** Cascade $k$ independent streams through a $k$-input AND gate: output probability $= x^k$
- **$\gamma = 1/k$ (fractional):** Use an OR gate on $k$ independent copies, with appropriate correction circuits

### Neural Network Inference

Stochastic computing has found significant application in **neural network inference**, where the dominant computation is the multiply-accumulate (MAC) operation $y = \sigma(\sum_j w_j x_j + b)$. In a stochastic implementation:

- Each weight $w_j$ and input $x_j$ is encoded as a stochastic bit stream (bipolar for signed values)
- The product $w_j x_j$ is computed by an XNOR gate (one gate per synapse)
- The weighted sum $\sum_j w_j x_j$ is computed by a multiplexer tree
- The activation function $\sigma$ is implemented by a finite-state machine (FSM) that approximates tanh or sigmoid

This approach has been demonstrated to achieve competitive classification accuracy on MNIST and CIFAR-10 with 256- to 1024-bit streams, using orders of magnitude less hardware area and energy than conventional digital MAC units.

#### Diagram: Stochastic Neural Network Layer
<iframe src="../../sims/stochastic-neural-network/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Stochastic implementation of a single neural network layer with XNOR multiplication and MUX accumulation</summary>
Type: MicroSim
Learning objective: Understand how stochastic computing implements the multiply-accumulate operation central to neural network inference. Bloom level: Apply.
Visual elements: A schematic of a single neuron with N inputs. Each input shows a stochastic bit stream and its corresponding weight stream. XNOR gates compute element-wise products, and a MUX tree accumulates the results. An FSM block implements the activation function. Output probability and decoded value are shown. Side panel compares hardware cost (gate count, area) versus a conventional binary MAC unit.
Controls: Number of inputs (2, 4, 8, 16), input values and weights sliders, stream length selector, activation function choice (sigmoid, tanh, ReLU approximation), animation speed, reset.
Behavior: Bit streams flow through the XNOR gates and MUX tree in real time. The output stream's running average converges to the expected neuron output. Users can modify weights and inputs to see how the stochastic neuron responds. The hardware comparison panel updates to reflect the selected configuration.
Implementation: p5.js with schematic circuit visualization and real-time stochastic computation.
</details>

### Application Comparison

The following table compares stochastic and conventional implementations of common image processing operations.

| Operation | Conventional Hardware | Stochastic Hardware | Precision Trade-off |
|-----------|----------------------|--------------------|--------------------|
| Pixel multiply | $8 \times 8$ multiplier (~64 full adders) | 1 AND gate | 256-bit stream $\approx$ 4-bit precision |
| Convolution ($3 \times 3$ kernel) | 9 multipliers + 8 adders | 9 AND gates + 1 MUX tree | 1024-bit stream $\approx$ 5-bit precision |
| Gamma correction ($\gamma = 2$) | Lookup table or multiplier | 1 AND gate (independent streams) | Stream length dependent |
| Edge detection (Roberts) | 2 subtractors + 2 multipliers + 1 adder | 2 XOR + 2 AND + 1 OR gate | Adequate for visual quality |
| Median filter ($3 \times 3$) | Sorting network (complex) | Majority gate cascade | Natural stochastic operation |

## Summary of the Stochastic Computing Paradigm

Stochastic computing offers a fundamentally different approach to arithmetic computation, trading precision for hardware simplicity and gaining intrinsic error tolerance. The key theoretical results developed in this chapter are:

1. **Encoding:** Real numbers in $[0,1]$ (unipolar) or $[-1,1]$ (bipolar) are represented as the probability of a 1 in a random bit stream
2. **Multiplication:** A single AND gate (unipolar) or XNOR gate (bipolar) computes exact multiplication on independent streams
3. **Addition:** A 2:1 MUX with a fair selecting bit computes the scaled sum $(x_A + x_B)/2$
4. **Variance:** Precision scales as $O(1/\sqrt{N})$, requiring $O(2^{2n})$ stream bits for $n$ bits of accuracy
5. **Correlation:** Stream independence is essential for correct arithmetic; correlated streams compute different functions (min, max, absolute difference)
6. **Decorrelation:** Independent RNGs, regeneration, and LFSR rotation techniques restore the independence assumption
7. **Error tolerance:** Uniform bit significance yields graceful degradation---a bit error rate of $\alpha$ causes at most $\alpha$ absolute error
8. **Applications:** Image processing and neural network inference exploit SC's strengths, achieving competitive quality with dramatically simpler hardware

The study of stochastic computing also deepens our understanding of the relationship between information, randomness, and computation---themes that connect to the information-theoretic foundations of Chapter 3 and the physical limits of Chapter 2. As we proceed to hybrid computing architectures in Chapter 14, the ability to mix stochastic, deterministic, and quantum computational elements opens new avenues for energy-efficient, fault-tolerant computing systems.

## References

1. B. R. Gaines, "Stochastic Computing Systems," in *Advances in Information Systems Science*, vol. 2, pp. 37-172, Plenum Press, 1969.
2. A. Alaghi and J. P. Hayes, "Survey of Stochastic Computing," *ACM Transactions on Embedded Computing Systems*, vol. 12, no. 2s, Article 92, 2013.
3. W. J. Poppelbaum, C. Afuso, and J. W. Esch, "Stochastic Computing Elements and Systems," in *Proceedings of the Fall Joint Computer Conference*, AFIPS, pp. 635-644, 1967.
4. P. Li, D. J. Lilja, W. Qian, K. Bazargan, and M. D. Riedel, "Computation on Stochastic Bit Streams: Digital Image Processing Case Studies," *IEEE Transactions on VLSI Systems*, vol. 22, no. 3, pp. 449-462, 2014.
5. J. von Neumann, "Probabilistic Logics and the Synthesis of Reliable Organisms from Unreliable Components," in *Automata Studies*, pp. 43-98, Princeton University Press, 1956.
6. K. Kim, J. Lee, and K. Choi, "An Energy-Efficient Random Number Generator for Stochastic Circuits," in *Proceedings of the Asia and South Pacific Design Automation Conference*, pp. 256-261, 2016.
7. A. Ren, Z. Li, C. Ding, Q. Qiu, Y. Wang, J. Li, X. Qian, and B. Yuan, "SC-DCNN: Highly-Scalable Deep Convolutional Neural Network using Stochastic Computing," in *Proceedings of the ACM International Conference on Architectural Support for Programming Languages and Operating Systems*, pp. 405-418, 2017.
