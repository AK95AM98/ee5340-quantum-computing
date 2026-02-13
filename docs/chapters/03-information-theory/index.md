---
title: Information Theory Foundations
description: Shannon entropy, mutual information, channel capacity, coding theorems, Kolmogorov complexity, and Hamming distance
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Information Theory Foundations

## Summary

This chapter develops Shannon's information theory framework with rigorous mathematical derivations. Topics include Shannon entropy and its properties, joint and conditional entropy, mutual information, the data processing inequality, source and channel coding theorems, and channel capacity. We also introduce Kolmogorov complexity and algorithmic randomness, and establish the deep connections between information-theoretic and thermodynamic entropy.

## Concepts Covered

This chapter covers the following 13 concepts:

1. Shannon Entropy
2. Joint Entropy
3. Conditional Entropy
4. Mutual Information
5. Relative Entropy
6. Data Processing Inequality
7. Source Coding Theorem
8. Channel Capacity
9. Noisy Channel Coding Theorem
10. Binary Symmetric Channel
11. Kolmogorov Complexity
12. Algorithmic Randomness
13. Hamming Distance

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)
- [Chapter 4: Classical Computing Fundamentals](../04-classical-computing/index.md) (for Kolmogorov Complexity)

---

## Introduction

Information theory, founded by Claude Shannon in his landmark 1948 paper "A Mathematical Theory of Communication," provides the mathematical framework for quantifying, transmitting, and processing information. Shannon's insight was that information can be treated as a precise mathematical quantity, independent of its semantic content, and that fundamental limits govern how efficiently information can be compressed and how reliably it can be communicated over noisy channels. These results rank among the deepest in all of engineering science, and their consequences permeate every layer of modern computing and communication.

For this course, information theory plays a dual role. First, it provides the language and tools we need for quantum information theory in later chapters---von Neumann entropy, quantum channel capacity, and quantum error correction all generalize the classical concepts developed here. Second, information theory forges a profound link between abstract computation and physical reality. In Chapter 2 we established Landauer's principle: erasing one bit of information dissipates at least $k_B T \ln 2$ joules of energy. That result depends critically on identifying the information-theoretic entropy $H$ (measured in bits) with the thermodynamic entropy $S$ (measured in J/K) via the conversion factor $k_B \ln 2$:

$$S = k_B \ln 2 \cdot H$$

This equation is the bridge between Shannon's world and Boltzmann's world. Every concept we develop in this chapter---entropy, mutual information, channel capacity---has a thermodynamic shadow, and understanding both sides is essential for reasoning about the physical costs of computation.

We begin with Shannon entropy derived from first-principles axioms, then build the hierarchy of information measures (joint entropy, conditional entropy, mutual information, relative entropy), prove the data processing inequality, state and interpret the source and channel coding theorems, analyze the binary symmetric channel, and conclude with Kolmogorov complexity, algorithmic randomness, and Hamming distance.

## Shannon Entropy

**Shannon entropy** is the foundational quantity of information theory. It measures the average uncertainty (or information content) associated with a discrete random variable. The entropy quantifies, in a precise operational sense, the minimum number of bits needed on average to describe the outcome of a random experiment.

### Axiomatic Derivation

Shannon's 1948 derivation proceeds from three natural axioms. Let $X$ be a discrete random variable taking values in $\{x_1, x_2, \ldots, x_n\}$ with probability mass function $p(x_i) = p_i$. We seek a function $H(p_1, p_2, \ldots, p_n)$ that quantifies the "uncertainty" of the distribution and satisfies:

**Axiom 1 (Continuity):** $H$ is a continuous function of the probabilities $p_i$.

**Axiom 2 (Maximum at uniformity):** For $n$ equally likely outcomes, $H(1/n, \ldots, 1/n)$ is a monotonically increasing function of $n$. More possible equally likely outcomes means more uncertainty.

**Axiom 3 (Composition / Chain rule):** If a choice is decomposed into successive choices, the original $H$ is the weighted sum of the individual values of $H$. That is, grouping outcomes does not change the total uncertainty.

Shannon proved that the unique function (up to a multiplicative constant) satisfying all three axioms is:

#### Shannon Entropy

$$H(X) = -\sum_{i=1}^{n} p_i \log_2 p_i$$

where:

- $X$ is a discrete random variable with $n$ possible outcomes
- $p_i = P(X = x_i)$ is the probability of the $i$-th outcome
- The logarithm base 2 gives entropy in **bits**; base $e$ gives **nats**, and base 10 gives **hartleys**
- The convention $0 \log_2 0 = 0$ is adopted, consistent with the limit $\lim_{p \to 0^+} p \log p = 0$

The quantity $-\log_2 p_i$ is called the **self-information** or **surprisal** of outcome $x_i$. Rare events (small $p_i$) carry high surprisal; certain events ($p_i = 1$) carry zero surprisal. Entropy is the expected surprisal.

### Key Properties

Shannon entropy satisfies several important properties, each with direct physical and computational significance.

**Non-negativity:** $H(X) \geq 0$ for all distributions, with equality if and only if $X$ is deterministic (some $p_i = 1$).

*Proof:* Since $0 \leq p_i \leq 1$, we have $\log_2 p_i \leq 0$, so $-p_i \log_2 p_i \geq 0$ for each term.

**Maximum entropy:** For a random variable with $n$ outcomes, $H(X) \leq \log_2 n$, with equality if and only if $X$ is uniformly distributed.

*Proof:* Consider the relative entropy $D(p \| u) \geq 0$ where $u$ is the uniform distribution with $u_i = 1/n$ (proven below in the Relative Entropy section). Expanding:

$$D(p \| u) = \sum_i p_i \log_2 \frac{p_i}{1/n} = \sum_i p_i \log_2 p_i + \log_2 n = -H(X) + \log_2 n \geq 0$$

Therefore $H(X) \leq \log_2 n$, with equality when $p = u$.

**Concavity:** $H$ is a strictly concave function of the probability vector $(p_1, \ldots, p_n)$. For any two distributions $p$ and $q$ and $0 < \lambda < 1$:

$$H(\lambda p + (1-\lambda) q) \geq \lambda H(p) + (1-\lambda) H(q)$$

This means that mixing (randomizing between) two sources never decreases uncertainty, a property with deep connections to the Second Law of Thermodynamics.

**Additivity for independent variables:** If $X$ and $Y$ are independent, then $H(X, Y) = H(X) + H(Y)$.

| Property | Statement | Condition for Equality |
|----------|-----------|----------------------|
| Non-negativity | $H(X) \geq 0$ | $X$ is deterministic |
| Upper bound | $H(X) \leq \log_2 n$ | $X$ is uniform over $n$ outcomes |
| Concavity | $H(\lambda p + (1-\lambda)q) \geq \lambda H(p) + (1-\lambda)H(q)$ | $p = q$ |
| Additivity | $H(X,Y) = H(X) + H(Y)$ | $X, Y$ independent |
| Conditioning reduces entropy | $H(X|Y) \leq H(X)$ | $X, Y$ independent |

### The Binary Entropy Function

An especially important special case is the binary random variable $X \in \{0, 1\}$ with $P(X = 1) = p$ and $P(X = 0) = 1 - p$. The entropy reduces to the **binary entropy function**:

#### Binary Entropy Function

$$H_b(p) = -p \log_2 p - (1-p) \log_2 (1-p)$$

where:

- $p \in [0, 1]$ is the probability of the outcome labeled 1
- $H_b(0) = H_b(1) = 0$ (deterministic outcomes have zero uncertainty)
- $H_b(1/2) = 1$ bit (a fair coin flip carries exactly one bit of information)
- $H_b$ is symmetric about $p = 1/2$ and strictly concave

The binary entropy function appears throughout coding theory and will be central to our analysis of the binary symmetric channel below. Its shape---rising from 0 at $p = 0$ to 1 at $p = 1/2$ and returning to 0 at $p = 1$---captures the intuition that uncertainty is maximized when the outcome is most unpredictable.

#### Diagram: Shannon Entropy Explorer

<iframe src="../../sims/shannon-entropy/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive visualization of Shannon entropy for discrete distributions</summary>
Type: MicroSim
Learning objective: Understand how Shannon entropy varies with the probability distribution, verify the maximum entropy property for uniform distributions, and explore the binary entropy function. Bloom level: Analyze.
Visual elements: Left panel shows a bar chart of a discrete probability distribution with draggable bars (2 to 8 outcomes). As the user adjusts the bars, the entropy value updates in real time and is displayed prominently. A dashed horizontal line marks the maximum entropy $\log_2 n$. Right panel plots the binary entropy function $H_b(p)$ with a movable point tracing the curve. A shaded area under the curve illustrates the integral. Numerical readouts show $H$, $H_{\max}$, and the ratio $H / H_{\max}$.
Controls: Number of outcomes slider (2-8), draggable probability bars (automatically renormalized), binary entropy slider for right panel, reset to uniform button, reset to deterministic button.
Behavior: Dragging any bar redistributes probability mass (other bars adjust proportionally to maintain normalization). The entropy readout updates continuously. Preset buttons snap to uniform and degenerate distributions for comparison.
Implementation: p5.js canvas with draggable bar chart and binary entropy curve plot.
</details>

### Connection to Thermodynamic Entropy

The formal identity between Shannon entropy and Gibbs/Boltzmann entropy is not a coincidence---it reflects a deep physical truth. Recall from Chapter 2 that the Boltzmann entropy of a system with $\Omega$ equally likely microstates is $S = k_B \ln \Omega$. If we identify each microstate with an outcome of a uniform random variable $X$ over $\Omega$ states, then the Shannon entropy is $H(X) = \log_2 \Omega$, and the two are related by:

$$S = k_B \ln 2 \cdot H(X)$$

More generally, for a system with microstates having probabilities $p_i$ (the Gibbs distribution), the Gibbs entropy $S = -k_B \sum_i p_i \ln p_i$ is:

$$S = k_B \ln 2 \cdot H(X)$$

where $H$ uses the base-2 logarithm. This identification is what makes Landauer's principle possible: erasing one bit ($H = 1$) requires dissipating at least $k_B T \ln 2$ joules of heat, because erasing the bit reduces the information-theoretic entropy by 1, and the Second Law demands a compensating entropy increase in the thermal environment.

## Joint Entropy

When we have two (or more) random variables, we need to quantify the total uncertainty in the combined system. The **joint entropy** generalizes Shannon entropy to multiple random variables.

#### Joint Entropy

$$H(X, Y) = -\sum_{x \in \mathcal{X}} \sum_{y \in \mathcal{Y}} p(x, y) \log_2 p(x, y)$$

where:

- $\mathcal{X}$ and $\mathcal{Y}$ are the alphabets (ranges) of $X$ and $Y$
- $p(x, y) = P(X = x, Y = y)$ is the joint probability mass function
- The convention $0 \log_2 0 = 0$ applies to any zero-probability pairs

### Relation to Marginal Entropies

The joint entropy satisfies the following fundamental inequalities:

$$\max(H(X), H(Y)) \leq H(X, Y) \leq H(X) + H(Y)$$

The **left inequality** states that the uncertainty in the pair is at least as large as the uncertainty in either component. The **right inequality** states that the joint uncertainty is at most the sum of the individual uncertainties, with equality if and only if $X$ and $Y$ are independent.

*Proof of the right inequality:* Using the chain rule (developed in the next section) and the fact that conditioning reduces entropy:

$$H(X, Y) = H(X) + H(Y|X) \leq H(X) + H(Y)$$

since $H(Y|X) \leq H(Y)$, with equality when $X$ and $Y$ are independent.

For $n$ random variables, the joint entropy extends naturally:

$$H(X_1, X_2, \ldots, X_n) = -\sum_{x_1, \ldots, x_n} p(x_1, \ldots, x_n) \log_2 p(x_1, \ldots, x_n)$$

and satisfies $H(X_1, \ldots, X_n) \leq \sum_{i=1}^n H(X_i)$, with equality if and only if all the variables are mutually independent.

## Conditional Entropy

**Conditional entropy** measures the remaining uncertainty in one random variable given knowledge of another. It is the key quantity that separates the entropy of a joint system from the entropy of its parts.

#### Conditional Entropy

$$H(X|Y) = -\sum_{x \in \mathcal{X}} \sum_{y \in \mathcal{Y}} p(x, y) \log_2 p(x|y)$$

where:

- $p(x|y) = p(x, y) / p(y)$ is the conditional probability of $X = x$ given $Y = y$
- Equivalently, $H(X|Y) = \sum_y p(y) H(X | Y = y)$, the expected entropy of $X$ conditioned on each value of $Y$
- $H(X|Y) = 0$ if and only if $X$ is a deterministic function of $Y$

An equivalent and illuminating form is:

$$H(X|Y) = H(X, Y) - H(Y)$$

This says that the uncertainty remaining in $X$ after observing $Y$ equals the total uncertainty minus the uncertainty resolved by $Y$ alone.

### Chain Rule for Entropy

The chain rule decomposes joint entropy into a sequence of conditional entropies:

#### Chain Rule for Entropy

$$H(X_1, X_2, \ldots, X_n) = \sum_{i=1}^{n} H(X_i | X_1, \ldots, X_{i-1})$$

where:

- Each term $H(X_i | X_1, \ldots, X_{i-1})$ is the entropy of $X_i$ given all preceding variables
- For the two-variable case: $H(X, Y) = H(X) + H(Y|X) = H(Y) + H(X|Y)$
- This generalizes the product rule of probability: $p(x, y) = p(x) p(y|x)$

*Proof (two-variable case):*

$$H(X, Y) = -\sum_{x,y} p(x,y) \log_2 p(x,y) = -\sum_{x,y} p(x,y) \log_2 [p(x) p(y|x)]$$

$$= -\sum_{x,y} p(x,y) \log_2 p(x) - \sum_{x,y} p(x,y) \log_2 p(y|x) = H(X) + H(Y|X)$$

The general case follows by induction.

### Conditioning Reduces Entropy

A fundamental property is that conditioning on additional information never increases entropy on average:

$$H(X|Y) \leq H(X)$$

with equality if and only if $X$ and $Y$ are independent. This captures the intuitive notion that learning $Y$ can only reduce (or leave unchanged) our uncertainty about $X$.

*Proof:* $H(X) - H(X|Y) = I(X; Y) \geq 0$, where $I(X;Y)$ is the mutual information (shown non-negative below).

## Mutual Information

**Mutual information** quantifies the amount of information that one random variable contains about another. It is the central quantity in channel coding and the most natural measure of statistical dependence.

#### Mutual Information

$$I(X; Y) = H(X) - H(X|Y) = H(Y) - H(Y|X) = H(X) + H(Y) - H(X, Y)$$

where:

- $I(X;Y)$ measures the reduction in uncertainty about $X$ due to knowledge of $Y$ (and vice versa)
- The three equivalent forms follow from the chain rule: $H(X,Y) = H(X) + H(Y|X) = H(Y) + H(X|Y)$
- $I(X;Y) = I(Y;X)$: mutual information is **symmetric**

### Explicit Formula

Expanding in terms of the distributions:

#### Mutual Information Sum Formula

$$I(X; Y) = \sum_{x \in \mathcal{X}} \sum_{y \in \mathcal{Y}} p(x, y) \log_2 \frac{p(x, y)}{p(x) p(y)}$$

where:

- The argument of the logarithm is the ratio of the joint distribution to the product of marginals
- $I(X;Y) = 0$ if and only if $X$ and $Y$ are independent ($p(x,y) = p(x)p(y)$ for all $x, y$)
- $I(X;Y) = D(p(x,y) \| p(x)p(y))$, the KL divergence between the joint and product distributions

### Non-negativity Proof

**Theorem:** $I(X; Y) \geq 0$ for all random variables $X, Y$, with equality if and only if $X$ and $Y$ are independent.

*Proof:* We have $I(X;Y) = D(p(x,y) \| p(x)p(y))$. The non-negativity of mutual information therefore follows from the non-negativity of KL divergence (Gibbs' inequality), which we prove in the next section. Alternatively, a direct proof uses the log-sum inequality or Jensen's inequality applied to the convex function $-\log$.

### Information Diagram

The relationships among $H(X)$, $H(Y)$, $H(X,Y)$, $H(X|Y)$, $H(Y|X)$, and $I(X;Y)$ are elegantly summarized by a Venn-like diagram:

- $H(X,Y)$ is the area of the union of two overlapping circles
- $H(X)$ is the left circle; $H(Y)$ is the right circle
- $I(X;Y)$ is the intersection (overlap) region
- $H(X|Y) = H(X) - I(X;Y)$ is the left crescent
- $H(Y|X) = H(Y) - I(X;Y)$ is the right crescent

This diagram provides a powerful mnemonic for deriving information-theoretic identities. Every inclusion-exclusion relationship that holds for set areas also holds for the corresponding entropy quantities.

| Quantity | Formula | Interpretation |
|----------|---------|---------------|
| $H(X)$ | $-\sum p(x) \log p(x)$ | Uncertainty of $X$ alone |
| $H(Y)$ | $-\sum p(y) \log p(y)$ | Uncertainty of $Y$ alone |
| $H(X,Y)$ | $-\sum p(x,y) \log p(x,y)$ | Total uncertainty of the pair |
| $H(X|Y)$ | $H(X,Y) - H(Y)$ | Residual uncertainty of $X$ after observing $Y$ |
| $I(X;Y)$ | $H(X) + H(Y) - H(X,Y)$ | Shared information between $X$ and $Y$ |

## Relative Entropy

**Relative entropy**, also called the **Kullback-Leibler (KL) divergence**, measures the "distance" between two probability distributions over the same alphabet. Although it is not a true metric (it is asymmetric and does not satisfy the triangle inequality), it is the most important divergence measure in information theory.

#### Kullback-Leibler Divergence

$$D(p \| q) = \sum_{x \in \mathcal{X}} p(x) \log_2 \frac{p(x)}{q(x)}$$

where:

- $p$ and $q$ are two probability distributions over the same alphabet $\mathcal{X}$
- The convention is $0 \log(0/q) = 0$ and $p \log(p/0) = +\infty$ (if $q(x) = 0$ for some $x$ where $p(x) > 0$, the divergence is infinite)
- $D(p \| q)$ represents the expected excess number of bits needed to encode samples from $p$ using a code optimized for $q$

### Non-negativity Proof (Gibbs' Inequality)

**Theorem (Gibbs' inequality):** $D(p \| q) \geq 0$ for all distributions $p, q$, with equality if and only if $p = q$.

*Proof via Jensen's inequality:* Since $-\log$ is a strictly convex function, Jensen's inequality gives:

$$-D(p \| q) = \sum_x p(x) \log_2 \frac{q(x)}{p(x)} \leq \log_2 \left( \sum_x p(x) \cdot \frac{q(x)}{p(x)} \right) = \log_2 \left( \sum_x q(x) \right) = \log_2(1) = 0$$

Therefore $D(p \| q) \geq 0$. Equality holds if and only if $q(x)/p(x)$ is constant for all $x$ in the support of $p$ (by the condition for equality in Jensen's inequality), which requires $p = q$.

This elegant proof, which leverages the concavity of $\log$ (equivalently, the convexity of $-\log$), is one of the most useful techniques in information theory. It immediately yields the non-negativity of mutual information, the bound $H(X) \leq \log_2 n$, and the data processing inequality.

### Asymmetry

An important and sometimes counterintuitive property is that KL divergence is **not symmetric**: in general, $D(p \| q) \neq D(q \| p)$. Intuitively, $D(p \| q)$ measures the cost of assuming the distribution is $q$ when it is actually $p$, and this cost is different from the reverse scenario.

As a concrete example, let $p = (1/2, 1/2)$ and $q = (1/10, 9/10)$. Then:

$$D(p \| q) = \frac{1}{2}\log_2 \frac{1/2}{1/10} + \frac{1}{2}\log_2 \frac{1/2}{9/10} \approx 0.737 \text{ bits}$$

$$D(q \| p) = \frac{1}{10}\log_2 \frac{1/10}{1/2} + \frac{9}{10}\log_2 \frac{9/10}{1/2} \approx 0.531 \text{ bits}$$

These are distinct values: $D(p \| q) \neq D(q \| p)$. In machine learning, the choice of direction has important practical consequences---minimizing $D(p \| q)$ (the "forward KL") produces **mean-seeking** behavior, while minimizing $D(q \| p)$ (the "reverse KL") produces **mode-seeking** behavior.

### Mutual Information as KL Divergence

The connection $I(X;Y) = D(p(x,y) \| p(x)p(y))$ reveals that mutual information measures the KL divergence between the true joint distribution and the joint distribution under the assumption of independence. A large mutual information means the independence assumption is badly wrong---$X$ and $Y$ are strongly dependent.

## Data Processing Inequality

The **data processing inequality** (DPI) is a powerful result stating that no processing of data can increase the information that it contains about the source. It formalizes the intuitive notion that "you can't create information from nothing."

### Markov Chain Condition

We say that three random variables $X$, $Y$, $Z$ form a **Markov chain** in the order $X \to Y \to Z$ if the conditional distribution of $Z$ given $(X, Y)$ depends only on $Y$:

$$p(z | x, y) = p(z | y) \quad \text{for all } x, y, z$$

Equivalently, $X$ and $Z$ are conditionally independent given $Y$. The interpretation is that $Y$ mediates all information flow from $X$ to $Z$---once $Y$ is known, $X$ provides no additional information about $Z$.

#### Data Processing Inequality

$$\text{If } X \to Y \to Z, \text{ then } I(X; Y) \geq I(X; Z)$$

where:

- $X \to Y \to Z$ denotes that $X, Y, Z$ form a Markov chain in this order
- Processing $Y$ to produce $Z$ can only lose (or at best preserve) information about $X$
- Equality holds if and only if $X \to Z \to Y$ also forms a Markov chain (i.e., $Z$ is a **sufficient statistic** for $X$ with respect to $Y$)

### Proof

By the chain rule for mutual information:

$$I(X; Y, Z) = I(X; Z) + I(X; Y | Z) = I(X; Y) + I(X; Z | Y)$$

Since $X \to Y \to Z$ is a Markov chain, $X$ and $Z$ are conditionally independent given $Y$, so $I(X; Z | Y) = 0$. Therefore:

$$I(X; Y) = I(X; Z) + I(X; Y | Z)$$

Since $I(X; Y | Z) \geq 0$ (mutual information is non-negative), we conclude:

$$I(X; Y) \geq I(X; Z)$$

### Implications

The data processing inequality has far-reaching consequences:

1. **Lossy compression:** If we compress data $X$ into a representation $Y$ and then further compress $Y$ into $Z$, then $I(X; Z) \leq I(X; Y)$---each compression stage can only lose information.

2. **Sufficient statistics:** A statistic $T(Y)$ of data $Y$ about a parameter $X$ is sufficient if and only if $I(X; T(Y)) = I(X; Y)$, meaning no information is lost.

3. **Cascaded channels:** Passing a signal through successive noisy channels $X \to Y \to Z$ yields $I(X; Z) \leq I(X; Y)$---each channel degrades the signal.

4. **Machine learning:** No deterministic function of the input features can increase mutual information with the target variable. This constrains what any learning algorithm can achieve.

## Source Coding Theorem

Shannon's **source coding theorem** (also called the **noiseless coding theorem** or Shannon's first theorem) establishes the fundamental limit on lossless data compression. It says that entropy is the ultimate compression rate: no lossless code can compress data below the entropy rate, and there exist codes that achieve this rate.

#### Source Coding Theorem

$$\text{For i.i.d. source } X_1, X_2, \ldots \text{ with } X_i \sim p(x): \quad \lim_{n \to \infty} \frac{L^*_n}{n} = H(X)$$

where:

- $L^*_n$ is the minimum expected codeword length for encoding blocks of $n$ symbols from the source
- $H(X) = -\sum_x p(x) \log_2 p(x)$ is the entropy of the source in bits per symbol
- The theorem asserts both a **converse** ($L^*_n / n \geq H(X)$, compression below entropy is impossible) and an **achievability** ($L^*_n / n$ can be made arbitrarily close to $H(X)$)

### Achievability: Typical Sequences

The proof of achievability rests on the concept of **typical sequences**. For an i.i.d. source, the law of large numbers implies that for a sequence $x^n = (x_1, \ldots, x_n)$:

$$-\frac{1}{n} \log_2 p(x^n) = -\frac{1}{n} \sum_{i=1}^n \log_2 p(x_i) \to H(X) \quad \text{as } n \to \infty$$

The **typical set** $A_\epsilon^{(n)}$ consists of all sequences $x^n$ satisfying:

$$2^{-n(H(X)+\epsilon)} \leq p(x^n) \leq 2^{-n(H(X)-\epsilon)}$$

The **asymptotic equipartition property** (AEP) guarantees that:

1. $P(x^n \in A_\epsilon^{(n)}) \to 1$ as $n \to \infty$ (almost all probability mass is on typical sequences)
2. $|A_\epsilon^{(n)}| \leq 2^{n(H(X)+\epsilon)}$ (the typical set has at most $2^{n(H+\epsilon)}$ members)
3. $|A_\epsilon^{(n)}| \geq (1-\epsilon) 2^{n(H(X)-\epsilon)}$ for sufficiently large $n$

Since there are approximately $2^{nH}$ typical sequences, we need only $nH + o(n)$ bits to index them, giving a compression rate approaching $H(X)$ bits per symbol.

### Converse: Kraft Inequality Argument

The converse---that no code can achieve a rate below $H(X)$---follows from the Kraft inequality for uniquely decodable codes. For any uniquely decodable code with codeword lengths $l_1, l_2, \ldots, l_m$, the Kraft inequality requires:

$$\sum_{i=1}^m 2^{-l_i} \leq 1$$

Minimizing the expected codeword length $\sum_i p_i l_i$ subject to this constraint (using Lagrange multipliers) yields the optimal lengths $l_i^* = -\log_2 p_i$, which may not be integers. The expected length is therefore:

$$L^* = \sum_i p_i l_i^* = -\sum_i p_i \log_2 p_i = H(X)$$

Since actual codeword lengths must be integers, we have $H(X) \leq L^* < H(X) + 1$ for single-symbol codes. Block coding of $n$ symbols at a time makes the "+1" overhead negligible, achieving $L_n^*/n \to H(X)$.

### Practical Significance

The source coding theorem tells us that the entropy rate is the **hard floor** for lossless compression. For example:

- A fair coin ($H = 1$ bit/symbol) cannot be compressed at all
- English text (estimated $H \approx 1.0$--$1.5$ bits/character) can be compressed from 8 bits/character (ASCII) to roughly 1--1.5 bits/character, consistent with the performance of algorithms like gzip and LZ77
- A biased coin with $p(\text{heads}) = 0.9$ has $H \approx 0.469$ bits/flip, so on average fewer than half a bit per flip suffices

## Channel Capacity

Having established the limits of data compression, we now turn to the dual problem: how reliably can information be transmitted over a noisy channel? The **channel capacity** quantifies the maximum rate at which information can be reliably communicated.

### Discrete Memoryless Channel

A **discrete memoryless channel** (DMC) is characterized by an input alphabet $\mathcal{X}$, an output alphabet $\mathcal{Y}$, and a set of conditional probabilities $p(y|x)$ specifying the probability of receiving $y$ when $x$ is transmitted. "Memoryless" means each output depends only on the current input, not on previous inputs or outputs.

#### Channel Capacity Definition

$$C = \max_{p(x)} I(X; Y)$$

where:

- The maximum is over all possible input distributions $p(x)$
- $I(X; Y) = H(Y) - H(Y|X)$ is the mutual information between input and output
- $H(Y|X) = \sum_x p(x) H(Y | X = x)$ depends only on the channel (not on the input distribution)
- $C$ is measured in bits per channel use

The capacity is the tightest "bottleneck" of the channel, found by optimizing what we put in. The channel noise ($H(Y|X)$) is fixed by the physics of the channel; we can only control the input distribution $p(x)$ to maximize the information that passes through.

### Properties of Channel Capacity

1. $C \geq 0$, since $I(X;Y) \geq 0$ for all input distributions.
2. $C \leq \log_2 |\mathcal{X}|$, since $I(X;Y) \leq H(X) \leq \log_2 |\mathcal{X}|$.
3. $C \leq \log_2 |\mathcal{Y}|$, since $I(X;Y) \leq H(Y) \leq \log_2 |\mathcal{Y}|$.
4. For a noiseless channel ($Y = X$), $C = \log_2 |\mathcal{X}|$---the full input alphabet is usable.
5. For a completely noisy channel ($Y$ independent of $X$), $C = 0$---the channel conveys no information.

## Noisy Channel Coding Theorem

Shannon's **noisy channel coding theorem** (Shannon's second theorem) is perhaps the most remarkable result in all of information theory. It asserts that reliable communication is possible at any rate below the channel capacity, and impossible above it.

#### Noisy Channel Coding Theorem

$$\text{For a DMC with capacity } C:$$

$$\text{(Achievability)} \quad \forall R < C, \; \exists \text{ codes with rate } R \text{ and } P_e \to 0 \text{ as } n \to \infty$$

$$\text{(Converse)} \quad \forall R > C, \; P_e \to 1 \text{ as } n \to \infty \text{ for any sequence of codes with rate } R$$

where:

- $R$ is the coding rate in bits per channel use
- $n$ is the block length (number of channel uses)
- $P_e$ is the probability of decoding error
- The theorem says $C$ is a sharp threshold: below $C$, errors vanish; above $C$, errors are inevitable

### Achievability Sketch

The proof of achievability uses **random coding**. Shannon showed that if we choose $2^{nR}$ codewords independently and uniformly at random from the input alphabet, then for $R < C$, the probability of error (averaged over all random codebooks) goes to zero exponentially in $n$. Since the average error is small, there must exist at least one specific codebook achieving low error. The key technical tool is **joint typicality**: the decoder looks for the unique codeword that is jointly typical with the received sequence.

### Converse Sketch

The converse uses Fano's inequality. If we can reliably decode, then $H(X^n | Y^n)$ must be small (low residual uncertainty). Fano's inequality states:

$$H(X^n | Y^n) \leq 1 + P_e \cdot nR$$

Combined with the data processing inequality and the definition of capacity, this forces $R \leq C + \delta$ for any $\delta > 0$ when $P_e$ is small.

### Significance

Shannon's theorem is an **existence** theorem---it proves that good codes exist but does not construct them. The search for practical codes approaching capacity has driven decades of coding theory research, culminating in turbo codes (1993), LDPC codes (rediscovered 1996), and polar codes (2009), which come within fractions of a decibel of the Shannon limit. The theorem also has a profound philosophical implication: it separates the problem of source coding (compression) from channel coding (error correction), showing that the two can be solved independently without loss of optimality.

## Binary Symmetric Channel

The **binary symmetric channel** (BSC) is the simplest and most widely studied noisy channel model. It transmits binary symbols, and each bit is independently flipped with probability $p$ (the **crossover probability**).

### Channel Model

The BSC has input alphabet $\mathcal{X} = \{0, 1\}$, output alphabet $\mathcal{Y} = \{0, 1\}$, and transition probabilities:

$$p(y|x) = \begin{cases} 1 - p & \text{if } y = x \\ p & \text{if } y \neq x \end{cases}$$

where $p \in [0, 1]$ is the crossover (error) probability.

### Capacity Derivation

We derive the capacity of the BSC by maximizing $I(X;Y)$ over input distributions $p(x)$.

**Step 1:** Write mutual information as $I(X;Y) = H(Y) - H(Y|X)$.

**Step 2:** Compute $H(Y|X)$. Given $X = x$, the output $Y$ is a Bernoulli random variable with parameter $p$ (the crossover probability). Therefore:

$$H(Y|X) = H_b(p)$$

where $H_b(p) = -p \log_2 p - (1-p) \log_2(1-p)$ is the binary entropy function. This quantity is independent of the input distribution.

**Step 3:** Maximize $H(Y)$. Since $Y$ is a binary random variable, $H(Y) \leq 1$ bit, with equality when $Y$ is uniform. If the input distribution is uniform ($P(X=0) = P(X=1) = 1/2$), then by symmetry $P(Y=0) = P(Y=1) = 1/2$, so $H(Y) = 1$ bit.

**Step 4:** Combine:

#### BSC Channel Capacity

$$C_{\text{BSC}} = 1 - H_b(p)$$

where:

- $C = 1$ bit/use when $p = 0$ (noiseless channel) or $p = 1$ (deterministic inversion, equivalent to noiseless)
- $C = 0$ when $p = 1/2$ (completely random output, independent of input)
- The capacity is symmetric about $p = 1/2$, reflecting the fact that a channel that always flips bits is as informative as one that never does (just invert the output)

| Crossover probability $p$ | $H_b(p)$ (bits) | Capacity $C$ (bits/use) | Interpretation |
|---|---|---|---|
| 0 | 0 | 1 | Perfect channel |
| 0.01 | 0.081 | 0.919 | Nearly perfect |
| 0.1 | 0.469 | 0.531 | Moderate noise |
| 0.2 | 0.722 | 0.278 | High noise |
| 0.5 | 1.0 | 0 | Completely random |

The BSC capacity formula $C = 1 - H_b(p)$ has a beautiful interpretation: the channel's output provides 1 bit per use of raw information, but $H_b(p)$ bits are "consumed" by the noise. The remaining $1 - H_b(p)$ bits are the usable information that can be extracted by the receiver.

#### Diagram: Binary Symmetric Channel Capacity

<iframe src="../../sims/bsc-capacity/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive visualization of the BSC model and its capacity as a function of crossover probability</summary>
Type: MicroSim
Learning objective: Understand the binary symmetric channel model, derive the capacity formula $C = 1 - H_b(p)$, and visualize how capacity degrades with increasing noise. Bloom level: Analyze.
Visual elements: Left panel shows the BSC channel diagram with two input nodes (0, 1) and two output nodes (0, 1), with transition probabilities labeled on the arrows. Arrow thickness varies with probability. Right panel plots $C(p) = 1 - H_b(p)$ as a smooth curve, with a movable point tracing the curve as $p$ changes. A secondary plot shows $H_b(p)$ for reference. Below the plots, a live simulation sends random bits through the BSC and displays the transmitted, received, and error bits, with running bit error rate and estimated mutual information.
Controls: Crossover probability slider $p \in [0, 0.5]$, number of transmitted bits (100, 1000, 10000), input distribution bias slider, play/pause for simulation, reset.
Behavior: Adjusting $p$ updates the channel diagram, the capacity curve highlight, and the simulation error rate. The estimated mutual information from the simulation converges to the theoretical value as the number of bits increases.
Implementation: p5.js with channel diagram, capacity curve, and live bit transmission simulation.
</details>

## Kolmogorov Complexity

While Shannon entropy measures the average information content of a source modeled as a random process, **Kolmogorov complexity** measures the information content of an individual string, independent of any probabilistic model. It provides an algorithmic, model-free notion of information that complements Shannon's framework.

### Definition

#### Kolmogorov Complexity

$$K(x) = \min \{ |p| : U(p) = x \}$$

where:

- $x$ is a finite binary string
- $U$ is a fixed universal Turing machine (the reference computer)
- $p$ is a program (binary string) that causes $U$ to output $x$ and halt
- $|p|$ denotes the length of program $p$ in bits
- $K(x)$ is the length of the shortest program that produces $x$

In other words, the Kolmogorov complexity of a string is the length of its shortest description in a fixed programming language. A string like $0101010101\cdots01$ (the pattern "01" repeated $n$ times) has low complexity---$O(\log n)$ bits suffice to describe the pattern and the repetition count---while a "random-looking" string of length $n$ typically has complexity close to $n$, since no program shorter than the string itself can produce it.

### Invariance Theorem

A natural concern is that $K(x)$ depends on the choice of universal Turing machine $U$. The **invariance theorem** shows that this dependence is limited to an additive constant:

**Theorem:** For any two universal Turing machines $U_1$ and $U_2$:

$$|K_{U_1}(x) - K_{U_2}(x)| \leq c$$

where $c$ is a constant depending on $U_1$ and $U_2$ but independent of $x$.

*Proof sketch:* Since $U_1$ is universal, it can simulate $U_2$ with a fixed-length simulation program of length $c_{12}$. Any program $p$ for $U_2$ can be converted to a program of length $|p| + c_{12}$ for $U_1$, so $K_{U_1}(x) \leq K_{U_2}(x) + c_{12}$. By symmetry, the reverse also holds.

This invariance justifies speaking of "the" Kolmogorov complexity of a string without specifying the machine, up to an additive constant.

### Uncomputability

A fundamental result is that Kolmogorov complexity is **not computable**: there is no algorithm that takes $x$ as input and outputs $K(x)$.

*Proof by contradiction:* Suppose there existed a program $\texttt{KC}$ that computes $K(x)$. Consider the following program $\texttt{P}$: "Enumerate all binary strings in lexicographic order; for each string $x$, compute $K(x)$ using $\texttt{KC}$; output the first $x$ for which $K(x) > |\texttt{P}|$." The program $\texttt{P}$ has some fixed length $L = |\texttt{P}|$. But it outputs a string $x$ with $K(x) > L$, while simultaneously providing a description of $x$ of length $L$ (namely, the program $\texttt{P}$ itself). This contradicts $K(x) > L$, so $\texttt{KC}$ cannot exist.

This argument is a formalization of Berry's paradox ("the smallest positive integer not definable in under sixty letters") and closely related to Gödel's incompleteness theorem and the halting problem.

### Connection to Shannon Entropy

For i.i.d. random sources, Kolmogorov complexity and Shannon entropy are asymptotically equivalent in the following sense:

**Theorem:** If $X_1, X_2, \ldots, X_n$ are i.i.d. with distribution $p$, then:

$$\frac{1}{n} E[K(X_1 X_2 \cdots X_n)] \to H(X) \quad \text{as } n \to \infty$$

That is, the expected Kolmogorov complexity per symbol converges to the Shannon entropy. This deep result connects the two major frameworks of information theory: Shannon's probabilistic framework and Kolmogorov's algorithmic framework. For individual strings, Kolmogorov complexity can be much larger or smaller than $nH$, but on average over the source ensemble, the two measures agree.

### Conditional Kolmogorov Complexity

The conditional Kolmogorov complexity $K(x|y)$ is the length of the shortest program that outputs $x$ given $y$ as auxiliary input:

$$K(x|y) = \min \{ |p| : U(p, y) = x \}$$

The chain rule for Kolmogorov complexity parallels the chain rule for entropy:

$$K(x, y) = K(x) + K(y|x) + O(\log K(x, y))$$

The logarithmic correction term (absent in Shannon's chain rule) arises from the need to specify the boundary between the descriptions of $x$ and $y$.

## Algorithmic Randomness

**Algorithmic randomness** provides a rigorous definition of what it means for an individual sequence to be "random," independent of any probabilistic model.

### Incompressibility Definition

A string $x$ of length $n$ is said to be **algorithmically random** (or **Kolmogorov random**) if it is incompressible:

$$K(x) \geq n - c$$

for some small constant $c$. An algorithmically random string cannot be described by any program significantly shorter than itself.

### Counting Argument

**Theorem:** Most strings of length $n$ are algorithmically random.

*Proof:* There are $2^n$ strings of length $n$. There are at most $2^0 + 2^1 + \cdots + 2^{n-c-1} = 2^{n-c} - 1 < 2^{n-c}$ programs of length less than $n - c$. Therefore, at most $2^{n-c}$ strings of length $n$ have $K(x) < n - c$, which is a fraction $2^{-c}$ of all strings. For $c = 10$, fewer than 0.1% of strings are compressible by 10 or more bits.

This is a remarkable combinatorial fact: randomness is the **typical** condition, and structure (compressibility) is rare.

### Martin-Löf Randomness

A more refined notion of algorithmic randomness was introduced by Per Martin-Löf in 1966. A sequence $x = x_1 x_2 x_3 \cdots$ (infinite binary sequence) is **Martin-Löf random** with respect to a computable probability measure $\mu$ if it passes all effective statistical tests. Formally, $x$ is Martin-Löf random if it does not belong to any **effectively null set**---a set that can be computably covered by intervals whose total $\mu$-measure can be made arbitrarily small.

For the uniform (fair coin) measure on $\{0,1\}^\infty$, the following characterizations of Martin-Löf randomness are equivalent:

1. **Incompressibility:** The initial segments $x_1 x_2 \cdots x_n$ satisfy $K(x_1 \cdots x_n) \geq n - O(1)$ (Schnorr's theorem relates this to prefix-free Kolmogorov complexity).
2. **Typicality:** The sequence satisfies all computable statistical laws---the law of large numbers, the law of the iterated logarithm, etc.
3. **Unpredictability:** No computable betting strategy can make unbounded profit by gambling on successive bits of $x$.

Martin-Löf randomness is the mathematically "correct" definition of individual randomness, unifying the intuitive notions of incompressibility, typicality, and unpredictability into a single, robust concept.

### Connection to the Source Coding Theorem

Algorithmic randomness illuminates the source coding theorem from a different angle. Shannon's theorem says that a typical sequence from an i.i.d. source with entropy $H$ has description length approximately $nH$ bits. Algorithmic randomness makes this precise at the individual sequence level: a Martin-Löf random sequence with respect to the source measure $p$ satisfies $K(x_1 \cdots x_n) \approx nH(p)$, meaning that the "random" sequences are exactly the typical sequences in Shannon's sense.

## Hamming Distance

We now turn from the abstract theory of information measures to the combinatorial foundations of error-correcting codes. **Hamming distance**, introduced by Richard Hamming in 1950, is the fundamental metric for measuring the dissimilarity between binary strings and for analyzing the error-detection and error-correction capabilities of codes.

### Definition

#### Hamming Distance

$$d(x, y) = |\{i : x_i \neq y_i\}|$$

where:

- $x = x_1 x_2 \cdots x_n$ and $y = y_1 y_2 \cdots y_n$ are binary strings of equal length $n$
- $d(x, y)$ counts the number of positions in which $x$ and $y$ differ
- Equivalently, $d(x, y) = w(x \oplus y)$, where $\oplus$ is the bitwise XOR and $w(\cdot)$ is the **Hamming weight** (number of 1s)

### Metric Properties

Hamming distance is a valid metric on $\{0, 1\}^n$:

1. **Non-negativity:** $d(x, y) \geq 0$, with $d(x, y) = 0$ if and only if $x = y$
2. **Symmetry:** $d(x, y) = d(y, x)$
3. **Triangle inequality:** $d(x, z) \leq d(x, y) + d(y, z)$

*Proof of the triangle inequality:* At each position $i$, if $x_i \neq z_i$ then either $x_i \neq y_i$ or $y_i \neq z_i$ (or both). Therefore the number of positions where $x$ and $z$ differ is at most the number where $x$ and $y$ differ plus the number where $y$ and $z$ differ.

### Minimum Distance of a Code

An $(n, M)$ binary code $\mathcal{C}$ is a set of $M$ codewords, each of length $n$. The **minimum distance** of the code is:

$$d_{\min}(\mathcal{C}) = \min_{\substack{c_1, c_2 \in \mathcal{C} \\ c_1 \neq c_2}} d(c_1, c_2)$$

The minimum distance is the most important single parameter of a code, because it determines the code's error-detection and error-correction capabilities.

### Error Detection and Correction Bounds

**Theorem:** A code with minimum distance $d_{\min}$ can:

- **Detect** up to $d_{\min} - 1$ errors
- **Correct** up to $\lfloor (d_{\min} - 1)/2 \rfloor$ errors

*Proof of error detection:* If at most $d_{\min} - 1$ bits of a codeword are flipped, the resulting string differs from the original codeword in at most $d_{\min} - 1$ positions. Since any two codewords differ in at least $d_{\min}$ positions, the corrupted string cannot be a different valid codeword. Therefore the receiver can detect that errors have occurred (though not necessarily identify the original codeword).

*Proof of error correction:* Let $t = \lfloor (d_{\min} - 1)/2 \rfloor$. If at most $t$ errors occur, the received word is within Hamming distance $t$ of the transmitted codeword. For any other codeword $c'$, the triangle inequality gives:

$$d_{\min} \leq d(c, c') \leq d(c, r) + d(r, c') \leq t + d(r, c')$$

so $d(r, c') \geq d_{\min} - t \geq t + 1 > t$. Therefore, the received word is closer to the transmitted codeword than to any other codeword, and **nearest-neighbor decoding** (finding the closest codeword) recovers the original message correctly.

### The Hamming Bound (Sphere-Packing Bound)

How many codewords can a code of length $n$ and minimum distance $d_{\min} = 2t+1$ have? The **Hamming bound** provides an upper limit.

#### Hamming Bound

$$M \leq \frac{2^n}{\sum_{j=0}^{t} \binom{n}{j}}$$

where:

- $M$ is the maximum number of codewords
- $n$ is the codeword length
- $t = \lfloor (d_{\min}-1)/2 \rfloor$ is the error-correction capability
- $\binom{n}{j}$ is the number of binary strings at Hamming distance exactly $j$ from any given string
- $V(n, t) = \sum_{j=0}^{t} \binom{n}{j}$ is the volume of a Hamming ball of radius $t$ in $\{0,1\}^n$

*Proof:* Consider the Hamming balls of radius $t$ centered at each of the $M$ codewords. Each ball contains $V(n, t)$ strings. By the error-correction property, these balls are disjoint (no string is within distance $t$ of two different codewords). Since all these disjoint balls must fit inside $\{0, 1\}^n$, which has $2^n$ elements:

$$M \cdot V(n, t) \leq 2^n$$

A code that meets the Hamming bound with equality is called a **perfect code**. The Hamming balls exactly tile the space $\{0, 1\}^n$ with no gaps. Examples of perfect codes include:

- The **(7, 4, 3) Hamming code:** $n = 7$, $M = 2^4 = 16$, $d_{\min} = 3$, $t = 1$. The Hamming bound gives $M \leq 2^7 / (1 + 7) = 128/8 = 16$, achieved exactly.
- The **(23, 12, 7) binary Golay code:** $n = 23$, $M = 2^{12} = 4096$, $d_{\min} = 7$, $t = 3$. The Hamming bound is met with equality.
- **Trivial codes:** The repetition code (all bits identical) and the full space $\{0,1\}^n$ with $d_{\min} = 1$.

It was proven by Tietäväinen and van Lint (1973) that the only nontrivial perfect binary codes are the Hamming codes and the Golay code.

### Connection to Channel Coding

Hamming distance connects directly to the BSC. On a BSC with crossover probability $p < 1/2$, the maximum-likelihood decoder is equivalent to the nearest-neighbor decoder in Hamming distance. A code with minimum distance $d_{\min}$ and nearest-neighbor decoding on a BSC can correct all error patterns of weight $\leq t = \lfloor(d_{\min}-1)/2\rfloor$. The probability of decoding error is:

$$P_e = \sum_{j=t+1}^{n} \binom{n}{j} p^j (1-p)^{n-j}$$

which decreases exponentially in $n$ for fixed rate $R < C$, as guaranteed by the noisy channel coding theorem.

| Code | $(n, k, d_{\min})$ | Rate $R = k/n$ | Error correction $t$ | Perfect? |
|------|---------------------|-----------------|----------------------|----------|
| (7,4) Hamming | (7, 4, 3) | 0.571 | 1 | Yes |
| (15,11) Hamming | (15, 11, 3) | 0.733 | 1 | Yes |
| (23,12) Golay | (23, 12, 7) | 0.522 | 3 | Yes |
| (31,26) Hamming | (31, 26, 3) | 0.839 | 1 | Yes |
| Triple repetition | (3, 1, 3) | 0.333 | 1 | Yes |

## Connections and Forward Look

The information-theoretic framework developed in this chapter provides the essential foundation for several subsequent topics in this course:

**Quantum information theory** (Chapters 7--10) generalizes every concept in this chapter. Shannon entropy becomes **von Neumann entropy** $S(\rho) = -\text{tr}(\rho \log \rho)$, classical channels become quantum channels, and mutual information becomes **coherent information** and **quantum mutual information**. The quantum channel capacity (the Holevo-Schumacher-Westmoreland theorem) is the quantum analog of the noisy channel coding theorem.

**Quantum error correction** (Chapter 11) generalizes Hamming distance to quantum codes. The minimum distance of a quantum stabilizer code governs its error-correction capability, just as the classical minimum distance does here. The quantum Hamming bound and the quantum Singleton bound are direct analogs of their classical counterparts.

**Landauer's principle and reversible computing** (Chapters 2 and 5) depend on the identification of information-theoretic entropy with thermodynamic entropy. The minimum energy to erase a bit is $k_B T \ln 2$, and the source coding theorem tells us that a source with entropy $H$ has $nH$ bits of information per $n$ symbols---thus the minimum thermodynamic cost of processing $n$ symbols from this source is at least $nH \cdot k_B T \ln 2$ joules (if the processing involves erasure).

**Stochastic computing** (Chapter 13) represents numbers as random bit streams, and the information content of a stochastic bit stream of length $N$ is at most $\log_2(N+1)$ bits by the source coding theorem---far less than the $N$ bits in the stream. This information-theoretic perspective explains both the compression inefficiency and the error tolerance of stochastic representations.

The interplay between information, entropy, computation, and physics is the central theme of this course, and the tools developed in this chapter are the common language that connects all the pieces.

## References

1. C. E. Shannon, "A Mathematical Theory of Communication," *Bell System Technical Journal*, vol. 27, pp. 379--423, 623--656, 1948.
2. T. M. Cover and J. A. Thomas, *Elements of Information Theory*, 2nd ed., Wiley-Interscience, 2006.
3. R. W. Hamming, "Error Detecting and Error Correcting Codes," *Bell System Technical Journal*, vol. 29, no. 2, pp. 147--160, 1950.
4. A. N. Kolmogorov, "Three Approaches to the Quantitative Definition of Information," *Problems of Information Transmission*, vol. 1, no. 1, pp. 1--7, 1965.
5. P. Martin-Löf, "The Definition of Random Sequences," *Information and Control*, vol. 9, no. 6, pp. 602--619, 1966.
6. M. Li and P. Vitányi, *An Introduction to Kolmogorov Complexity and Its Applications*, 4th ed., Springer, 2019.
7. R. Landauer, "Irreversibility and Heat Generation in the Computing Process," *IBM Journal of Research and Development*, vol. 5, no. 3, pp. 183--191, 1961.
8. D. J. C. MacKay, *Information Theory, Inference, and Learning Algorithms*, Cambridge University Press, 2003.
9. S. Kullback and R. A. Leibler, "On Information and Sufficiency," *Annals of Mathematical Statistics*, vol. 22, no. 1, pp. 79--86, 1951.
10. E. Arikan, "Channel Polarization: A Method for Constructing Capacity-Achieving Codes for Symmetric Binary-Input Memoryless Channels," *IEEE Transactions on Information Theory*, vol. 55, no. 7, pp. 3051--3073, 2009.
