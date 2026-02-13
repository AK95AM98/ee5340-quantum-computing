---
title: Mathematical Foundations
description: Essential mathematical tools for quantum computing including complex numbers, linear algebra, and probability
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Mathematical Foundations

## Summary

This chapter reviews the essential mathematical tools used throughout the course. Topics include complex number arithmetic, vector spaces and linear algebra, matrix operations, eigenvalue decomposition, tensor products, and probability theory. Mastering these foundations is critical for understanding quantum mechanics, information theory, and all computing paradigms covered in later chapters.

## Concepts Covered

This chapter covers the following 15 concepts:

1. Complex Numbers
2. Complex Conjugate
3. Euler's Formula
4. Vector Spaces
5. Linear Independence
6. Inner Product
7. Outer Product
8. Matrix Multiplication
9. Eigenvalues
10. Eigenvectors
11. Unitary Matrices
12. Hermitian Matrices
13. Tensor Product
14. Spectral Decomposition
15. Probability Theory

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

## 1. Complex Numbers

Quantum computing is built upon the algebra of complex numbers. Unlike classical bits that take values in $\{0, 1\}$, the amplitudes describing quantum states are complex-valued, and interference between these amplitudes is the source of quantum computational advantage. A thorough command of complex arithmetic is therefore the first prerequisite for everything that follows.

#### Definition of a Complex Number

$$z = a + bi$$

where:

- $a \in \mathbb{R}$ is the **real part**, written $\operatorname{Re}(z)$
- $b \in \mathbb{R}$ is the **imaginary part**, written $\operatorname{Im}(z)$
- $i$ is the **imaginary unit** satisfying $i^2 = -1$

The set of all complex numbers is denoted $\mathbb{C}$. Every complex number $z$ can be represented as a point $(a, b)$ in the two-dimensional **complex plane** (also called the Argand plane), where the horizontal axis represents the real part and the vertical axis represents the imaginary part.

Complex numbers support the standard field operations of addition and multiplication:

- **Addition:** $(a + bi) + (c + di) = (a+c) + (b+d)i$
- **Multiplication:** $(a + bi)(c + di) = (ac - bd) + (ad + bc)i$

The **modulus** (or absolute value) of a complex number is defined as $|z| = \sqrt{a^2 + b^2}$, which gives the Euclidean distance from the origin in the complex plane. In quantum mechanics, the modulus squared $|z|^2 = a^2 + b^2$ appears as the probability of a measurement outcome, a connection we will develop formally in later chapters.

#### Diagram: Complex Plane Visualization

<iframe src="../../sims/complex-plane/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive complex number visualization on the Argand plane</summary>
Type: MicroSim
Learning objective: Students can identify the real part, imaginary part, modulus, and argument of a complex number from its position in the complex plane (Bloom: Understand).
Visual elements: A 2D coordinate grid representing the complex plane. A draggable point representing a complex number $z$. Dashed lines project from the point to the real and imaginary axes. The modulus is shown as a line segment from the origin to the point, with its length displayed. The argument (angle with the positive real axis) is shown with an arc.
Controls: Click and drag to reposition $z$. A readout panel displays $a$, $b$, $|z|$, and $\arg(z)$ in real time.
Behavior: As the user drags the point, all derived quantities update live.
Implementation: p5.js canvas with interactive drag handling.
</details>

## 2. Complex Conjugate

Given a complex number $z = a + bi$, its **complex conjugate** is obtained by negating the imaginary part.

#### Complex Conjugate

$$z^* = a - bi$$

where:

- $z^* $ (also written $\bar{z}$) denotes the complex conjugate of $z$
- The geometric effect is a reflection of $z$ across the real axis in the complex plane

The complex conjugate satisfies several essential algebraic identities that appear repeatedly in quantum computing:

| Property | Statement |
|---|---|
| Involution | $(z^*)^* = z$ |
| Modulus squared | $z \, z^* = \lvert z \rvert^2 \in \mathbb{R}$ |
| Addition | $(z_1 + z_2)^* = z_1^* + z_2^*$ |
| Multiplication | $(z_1 \, z_2)^* = z_1^* \, z_2^*$ |
| Real test | $z = z^*$ if and only if $z \in \mathbb{R}$ |

The identity $z \, z^* = |z|^2$ is particularly important: it provides the bridge between complex amplitudes and real-valued probabilities in quantum mechanics. Whenever we compute the probability of measuring a quantum state and finding a particular outcome, we multiply the corresponding amplitude by its conjugate.

## 3. Euler's Formula

Euler's formula provides the deep connection between the complex exponential function and trigonometry, and it underlies the polar representation of complex numbers that is pervasive in quantum computing.

#### Euler's Formula

$$e^{i\theta} = \cos\theta + i\sin\theta$$

where:

- $\theta \in \mathbb{R}$ is the **argument** (or phase angle) measured in radians
- $e^{i\theta}$ lies on the **unit circle** $|z| = 1$ in the complex plane

Using Euler's formula, any complex number $z$ can be written in **polar form**:

$$z = r \, e^{i\theta}$$

where $r = |z|$ is the modulus and $\theta = \arg(z)$ is the argument. This representation is invaluable in quantum computing because quantum gate operations frequently amount to rotations in the complex plane -- that is, multiplications by factors of the form $e^{i\theta}$.

Two notable special cases follow immediately from Euler's formula:

- Setting $\theta = \pi$ yields **Euler's identity**: $e^{i\pi} + 1 = 0$
- Setting $\theta = \pi/2$ yields $e^{i\pi/2} = i$

The polar form also simplifies multiplication of complex numbers: if $z_1 = r_1 e^{i\theta_1}$ and $z_2 = r_2 e^{i\theta_2}$, then $z_1 z_2 = r_1 r_2 \, e^{i(\theta_1 + \theta_2)}$. That is, moduli multiply and arguments add. In the language of quantum computing, composing two phase gates amounts to adding their phase angles.

#### Diagram: Euler's Formula on the Unit Circle

<iframe src="../../sims/euler-formula/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive visualization of Euler's formula as rotation on the unit circle</summary>
Type: MicroSim
Learning objective: Students can relate the angle $\theta$ to the real and imaginary parts $\cos\theta$ and $\sin\theta$ on the unit circle, and understand phase as rotation (Bloom: Apply).
Visual elements: A unit circle in the complex plane with axes labeled Re and Im. A point $e^{i\theta}$ moves along the circle. Dashed projections show $\cos\theta$ on the real axis and $\sin\theta$ on the imaginary axis. The angle $\theta$ is displayed as an arc from the positive real axis.
Controls: A slider for $\theta$ ranging from $0$ to $2\pi$. An animation toggle button to sweep $\theta$ continuously.
Behavior: Moving the slider (or running the animation) updates the point position, projections, and numerical readouts in real time.
Implementation: p5.js canvas with slider input.
</details>

## 4. Vector Spaces

Linear algebra -- the study of vector spaces and linear maps -- is the mathematical language of quantum mechanics. A **quantum state** is a vector in a complex vector space, and every quantum operation is a linear transformation on that space.

A **vector space** $V$ over the field $\mathbb{C}$ is a set equipped with two operations -- vector addition and scalar multiplication -- satisfying the following axioms:

- **Closure under addition:** For all $\mathbf{u}, \mathbf{v} \in V$, we have $\mathbf{u} + \mathbf{v} \in V$.
- **Closure under scalar multiplication:** For all $\alpha \in \mathbb{C}$ and $\mathbf{v} \in V$, we have $\alpha \mathbf{v} \in V$.
- **Additive identity:** There exists a zero vector $\mathbf{0} \in V$ such that $\mathbf{v} + \mathbf{0} = \mathbf{v}$ for all $\mathbf{v}$.
- **Additive inverse:** For every $\mathbf{v} \in V$, there exists $-\mathbf{v} \in V$ such that $\mathbf{v} + (-\mathbf{v}) = \mathbf{0}$.
- **Associativity, commutativity of addition**, and **distributivity of scalar multiplication** over addition hold in the usual manner.

The primary vector space in quantum computing is $\mathbb{C}^n$, the space of $n$-dimensional column vectors with complex entries. For a single qubit, the state space is $\mathbb{C}^2$; for $n$ qubits, it is $\mathbb{C}^{2^n}$. In **Dirac notation**, column vectors are written as **kets** $|\psi\rangle$, and their conjugate transposes (row vectors) are written as **bras** $\langle\psi|$. The standard computational basis for $\mathbb{C}^2$ is:

$$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

An arbitrary single-qubit state can be written as a **superposition** $|\psi\rangle = \alpha |0\rangle + \beta |1\rangle$ where $\alpha, \beta \in \mathbb{C}$ and $|\alpha|^2 + |\beta|^2 = 1$.

## 5. Linear Independence

A set of vectors $\{|\mathbf{v}_1\rangle, |\mathbf{v}_2\rangle, \ldots, |\mathbf{v}_k\rangle\}$ in a vector space $V$ is **linearly independent** if the only solution to the equation

$$c_1 |\mathbf{v}_1\rangle + c_2 |\mathbf{v}_2\rangle + \cdots + c_k |\mathbf{v}_k\rangle = \mathbf{0}$$

is the trivial solution $c_1 = c_2 = \cdots = c_k = 0$. If a non-trivial solution exists, the vectors are **linearly dependent**, meaning at least one vector can be expressed as a linear combination of the others.

The maximum number of linearly independent vectors in a vector space $V$ is called the **dimension** of $V$, written $\dim(V)$. A set of $\dim(V)$ linearly independent vectors that spans $V$ is called a **basis** for $V$. For the qubit state space $\mathbb{C}^2$, the computational basis $\{|0\rangle, |1\rangle\}$ is one possible basis, but infinitely many other bases exist. For example, the **Hadamard basis** (also called the $\pm$ basis) consists of:

$$|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle), \qquad |-\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$$

The freedom to choose different bases is central to quantum computing: different measurement bases reveal different information about a quantum state, and many quantum algorithms exploit basis changes to create constructive or destructive interference.

## 6. Inner Product

The **inner product** endows a vector space with geometric structure, enabling us to define notions of length, angle, and orthogonality. For vectors in $\mathbb{C}^n$, the standard inner product is the following.

#### Inner Product (Dirac Notation)

$$\langle \phi | \psi \rangle = \sum_{j=1}^{n} \phi_j^* \, \psi_j$$

where:

- $|\psi\rangle = (\psi_1, \psi_2, \ldots, \psi_n)^T$ and $|\phi\rangle = (\phi_1, \phi_2, \ldots, \phi_n)^T$ are column vectors in $\mathbb{C}^n$
- $\phi_j^*$ is the complex conjugate of the $j$-th component of $|\phi\rangle$
- $\langle \phi |$ is the conjugate transpose (bra) of $|\phi\rangle$

The inner product satisfies three fundamental properties:

1. **Conjugate symmetry:** $\langle \phi | \psi \rangle = \langle \psi | \phi \rangle^*$
2. **Linearity in the second argument:** $\langle \phi | (\alpha |\psi_1\rangle + \beta |\psi_2\rangle) = \alpha \langle \phi | \psi_1 \rangle + \beta \langle \phi | \psi_2 \rangle$
3. **Positive definiteness:** $\langle \psi | \psi \rangle \geq 0$, with equality if and only if $|\psi\rangle = \mathbf{0}$

The **norm** of a vector is defined as $\| |\psi\rangle \| = \sqrt{\langle \psi | \psi \rangle}$. In quantum mechanics, physical states are **normalized**: $\langle \psi | \psi \rangle = 1$. Two vectors are **orthogonal** if $\langle \phi | \psi \rangle = 0$. An **orthonormal basis** is a basis in which every pair of distinct vectors is orthogonal and every vector has unit norm. The computational basis $\{|0\rangle, |1\rangle\}$ satisfies $\langle 0 | 0 \rangle = \langle 1 | 1 \rangle = 1$ and $\langle 0 | 1 \rangle = \langle 1 | 0 \rangle = 0$, and is therefore orthonormal.

The inner product $\langle \phi | \psi \rangle$ gives the **probability amplitude** for transitioning from state $|\psi\rangle$ to state $|\phi\rangle$, and the corresponding **transition probability** is $|\langle \phi | \psi \rangle|^2$. This is the mathematical content of the **Born rule**, which is the fundamental probabilistic postulate of quantum mechanics.

#### Diagram: Inner Product and Orthogonality

<iframe src="../../sims/inner-product/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive visualization of inner product, norm, and orthogonality in two dimensions</summary>
Type: MicroSim
Learning objective: Students can compute the inner product of two vectors and determine whether they are orthogonal (Bloom: Apply).
Visual elements: A 2D plane showing two vectors $|\phi\rangle$ and $|\psi\rangle$ as arrows from the origin. The projection of one vector onto the other is displayed as a dashed line. Numerical readouts show $\langle \phi | \psi \rangle$, $\||\phi\rangle\|$, $\||\psi\rangle\|$, and the angle between the vectors.
Controls: Each vector can be dragged to change its direction and magnitude. A toggle switches between real and complex coefficient mode.
Behavior: All readouts update live as vectors are repositioned.
Implementation: p5.js canvas with vector drag interaction.
</details>

## 7. Outer Product

While the inner product maps two vectors to a scalar, the **outer product** maps two vectors to a matrix (a linear operator). Given a ket $|\psi\rangle \in \mathbb{C}^n$ and a bra $\langle \phi | \in \mathbb{C}^{m}$, their outer product is the $n \times m$ matrix:

#### Outer Product

$$|\psi\rangle \langle \phi| = \begin{pmatrix} \psi_1 \\ \psi_2 \\ \vdots \\ \psi_n \end{pmatrix} \begin{pmatrix} \phi_1^* & \phi_2^* & \cdots & \phi_m^* \end{pmatrix} = \begin{pmatrix} \psi_1 \phi_1^* & \psi_1 \phi_2^* & \cdots & \psi_1 \phi_m^* \\ \psi_2 \phi_1^* & \psi_2 \phi_2^* & \cdots & \psi_2 \phi_m^* \\ \vdots & \vdots & \ddots & \vdots \\ \psi_n \phi_1^* & \psi_n \phi_2^* & \cdots & \psi_n \phi_m^* \end{pmatrix}$$

where:

- $|\psi\rangle\langle\phi|$ is an $n \times m$ matrix
- The $(j,k)$ entry is $\psi_j \phi_k^*$

The outer product is essential in quantum computing for constructing **projection operators**. If $|\psi\rangle$ is a normalized vector, then $P = |\psi\rangle\langle\psi|$ is the projector onto the one-dimensional subspace spanned by $|\psi\rangle$. This projector satisfies $P^2 = P$ (idempotence) and $P^\dagger = P$ (Hermiticity). In the computational basis, the projectors onto $|0\rangle$ and $|1\rangle$ are:

$$|0\rangle\langle 0| = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \qquad |1\rangle\langle 1| = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$$

These projectors sum to the identity matrix: $|0\rangle\langle 0| + |1\rangle\langle 1| = I$. This is an instance of the **completeness relation** (or resolution of the identity), which states that for any orthonormal basis $\{|e_j\rangle\}$ of a vector space:

#### Completeness Relation

$$\sum_{j=1}^{n} |e_j\rangle\langle e_j| = I$$

where:

- $\{|e_j\rangle\}_{j=1}^{n}$ is an orthonormal basis for $\mathbb{C}^n$
- $I$ is the $n \times n$ identity matrix

The completeness relation is one of the most frequently used identities in quantum mechanics: it allows us to insert a basis decomposition at any point in a calculation.

## 8. Matrix Multiplication

Quantum gates are represented as matrices, and the composition of gates corresponds to matrix multiplication. Given an $m \times n$ matrix $A$ and an $n \times p$ matrix $B$, their product $C = AB$ is the $m \times p$ matrix defined by:

#### Matrix Product

$$(AB)_{jk} = \sum_{\ell=1}^{n} A_{j\ell} \, B_{\ell k}$$

where:

- $A_{j\ell}$ is the entry in row $j$, column $\ell$ of $A$
- $B_{\ell k}$ is the entry in row $\ell$, column $k$ of $B$
- The inner dimension $n$ must match: $A$ has $n$ columns and $B$ has $n$ rows

Key properties of matrix multiplication include:

| Property | Statement |
|---|---|
| Associativity | $(AB)C = A(BC)$ |
| Distributivity | $A(B + C) = AB + AC$ |
| Non-commutativity | In general, $AB \neq BA$ |
| Transpose of product | $(AB)^T = B^T A^T$ |
| Conjugate transpose | $(AB)^\dagger = B^\dagger A^\dagger$ |

The non-commutativity of matrix multiplication has profound physical consequences in quantum mechanics. Two quantum observables $A$ and $B$ can be simultaneously measured with perfect precision if and only if they commute, i.e., $AB = BA$. The **commutator** $[A, B] = AB - BA$ quantifies the extent to which two operators fail to commute and is intimately related to the Heisenberg uncertainty principle.

For quantum computing specifically, applying gate $U_1$ followed by gate $U_2$ to a state $|\psi\rangle$ produces $U_2 U_1 |\psi\rangle$. Note the right-to-left ordering: the first gate applied is the rightmost matrix in the product, since matrix multiplication acts on column vectors from the left.

## 9. Eigenvalues

The concept of eigenvalues is central to quantum measurement theory: when a physical observable (represented by a Hermitian matrix) is measured, the possible outcomes are precisely its eigenvalues. A scalar $\lambda \in \mathbb{C}$ is an **eigenvalue** of a square matrix $A$ if there exists a nonzero vector $|\mathbf{v}\rangle$ satisfying the following equation.

#### Eigenvalue Equation

$$A |\mathbf{v}\rangle = \lambda |\mathbf{v}\rangle$$

where:

- $A$ is an $n \times n$ matrix
- $|\mathbf{v}\rangle \neq \mathbf{0}$ is the corresponding **eigenvector**
- $\lambda$ is the eigenvalue associated with $|\mathbf{v}\rangle$

To find the eigenvalues, we rewrite the equation as $(A - \lambda I)|\mathbf{v}\rangle = \mathbf{0}$. For a nontrivial solution to exist, the matrix $A - \lambda I$ must be singular, which requires:

#### Characteristic Equation

$$\det(A - \lambda I) = 0$$

where:

- $\det(\cdot)$ denotes the determinant
- The left-hand side, expanded, is a degree-$n$ polynomial in $\lambda$ called the **characteristic polynomial**

For example, consider the Pauli-$Z$ matrix, one of the fundamental single-qubit operators:

$$Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

The characteristic equation is $(1 - \lambda)(-1 - \lambda) = 0$, yielding eigenvalues $\lambda_1 = 1$ and $\lambda_2 = -1$ with corresponding eigenvectors $|0\rangle$ and $|1\rangle$. These eigenvalues represent the possible measurement outcomes when measuring a qubit in the computational basis.

## 10. Eigenvectors

An **eigenvector** of a matrix $A$ corresponding to eigenvalue $\lambda$ is any nonzero vector $|\mathbf{v}\rangle$ satisfying $A|\mathbf{v}\rangle = \lambda |\mathbf{v}\rangle$. The set of all eigenvectors corresponding to a particular eigenvalue $\lambda$, together with the zero vector, forms a subspace called the **eigenspace** of $\lambda$. The dimension of this eigenspace is the **geometric multiplicity** of $\lambda$.

Key properties of eigenvectors include:

- Eigenvectors corresponding to **distinct** eigenvalues of any matrix are linearly independent.
- For **Hermitian** (self-adjoint) matrices, eigenvectors corresponding to distinct eigenvalues are not merely linearly independent but **orthogonal**.
- If a matrix is **normal** (i.e., $A^\dagger A = A A^\dagger$), then it possesses a complete orthonormal basis of eigenvectors (by the spectral theorem).

As an illustrative example, consider the Pauli-$X$ matrix (the quantum NOT gate):

$$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$

The characteristic equation $\lambda^2 - 1 = 0$ gives eigenvalues $\lambda = \pm 1$. The corresponding normalized eigenvectors are:

$$\lambda = +1: \quad |+\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \qquad \lambda = -1: \quad |-\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$

These are precisely the Hadamard basis states. The fact that $X$ has eigenvalues $\pm 1$ means that measuring the observable corresponding to $X$ (a measurement in the $|+\rangle / |-\rangle$ basis) yields outcomes $+1$ or $-1$, each with a probability determined by the Born rule.

#### Diagram: Eigenvalues and Eigenvectors of Pauli Matrices

<iframe src="../../sims/pauli-eigen/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive exploration of eigenvalues and eigenvectors for the three Pauli matrices</summary>
Type: MicroSim
Learning objective: Students can compute the eigenvalues and eigenvectors of the Pauli matrices and verify the eigenvalue equation (Bloom: Analyze).
Visual elements: Three tabs, one for each Pauli matrix ($X$, $Y$, $Z$). Each tab displays the matrix, its characteristic equation, eigenvalues, and eigenvectors as arrows on the Bloch sphere. An animation shows how the matrix action preserves the direction of eigenvectors (scaling them by the eigenvalue).
Controls: Tab selector for the Pauli matrix. A slider to blend an arbitrary input vector, showing how the matrix action distorts non-eigenvectors but preserves eigenvectors.
Behavior: Selecting a Pauli matrix updates all displayed quantities. The slider smoothly interpolates between an eigenvector and a general vector, illustrating the geometric meaning of the eigenvalue equation.
Implementation: p5.js with 3D Bloch sphere rendering and matrix arithmetic.
</details>

## 11. Unitary Matrices

In quantum computing, all reversible operations on quantum states are represented by **unitary matrices**. A square matrix $U$ is unitary if its conjugate transpose is also its inverse.

#### Unitarity Condition

$$U^\dagger U = U U^\dagger = I$$

where:

- $U^\dagger = (\overline{U})^T$ is the conjugate transpose of $U$ (also written $U^*$ in some texts)
- $I$ is the identity matrix

Unitarity has several equivalent characterizations and consequences:

- The columns of $U$ form an orthonormal basis for $\mathbb{C}^n$, and likewise the rows.
- $U$ **preserves inner products**: $\langle U\phi | U\psi \rangle = \langle \phi | \psi \rangle$ for all vectors $|\phi\rangle, |\psi\rangle$.
- In particular, $U$ **preserves norms**: $\| U|\psi\rangle \| = \| |\psi\rangle \|$. This ensures that applying a unitary gate to a normalized quantum state produces another normalized quantum state, preserving the total probability.
- All eigenvalues of a unitary matrix have modulus 1: $|\lambda| = 1$, so each eigenvalue can be written as $\lambda = e^{i\theta}$ for some real $\theta$.

Every quantum gate is a unitary matrix. The single-qubit gates encountered most often in quantum computing include:

| Gate | Matrix | Description |
|---|---|---|
| Pauli-$X$ | $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ | Bit flip (quantum NOT) |
| Pauli-$Y$ | $\begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}$ | Bit and phase flip |
| Pauli-$Z$ | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ | Phase flip |
| Hadamard $H$ | $\frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$ | Creates superposition |
| Phase $S$ | $\begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}$ | Quarter-turn phase |
| $T$ gate | $\begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}$ | Eighth-turn phase |

The requirement that quantum gates be unitary is the mathematical expression of the reversibility of quantum mechanics: if $U$ sends $|\psi\rangle$ to $|\psi'\rangle = U|\psi\rangle$, then $U^\dagger$ recovers the original state $|\psi\rangle = U^\dagger |\psi'\rangle$. No information is lost, in contrast to classical irreversible gates such as AND and OR.

## 12. Hermitian Matrices

While unitary matrices represent quantum dynamics (gates), **Hermitian matrices** represent quantum observables (measurable physical quantities). A square matrix $A$ is Hermitian (or self-adjoint) if it equals its own conjugate transpose.

#### Hermiticity Condition

$$A = A^\dagger$$

where:

- $A^\dagger$ is the conjugate transpose of $A$
- Equivalently, $A_{jk} = A_{kj}^*$ for all entries

Hermitian matrices have the following crucial properties for quantum mechanics:

1. **All eigenvalues are real.** This is physically necessary because eigenvalues of an observable correspond to measurement outcomes, which must be real numbers.
2. **Eigenvectors corresponding to distinct eigenvalues are orthogonal.** This ensures that distinct measurement outcomes are distinguishable.
3. **The spectral theorem guarantees a complete orthonormal eigenbasis.** This means that any Hermitian matrix can be diagonalized by a unitary change of basis.

The relationship between Hermitian and unitary matrices is deep and bidirectional. Given a Hermitian matrix $H$, the matrix exponential $U = e^{iH}$ is unitary. Conversely, any unitary matrix $U$ can be written as $U = e^{iH}$ for some Hermitian $H$. In quantum mechanics, the time evolution of a closed system is governed by the Schrodinger equation, which states that the Hamiltonian (a Hermitian operator representing the total energy) generates unitary time evolution via $U(t) = e^{-iHt/\hbar}$.

The Pauli matrices $X$, $Y$, $Z$ are both Hermitian and unitary (they are their own inverses). Together with the identity $I$, they form a basis for the vector space of all $2 \times 2$ Hermitian matrices. Any $2 \times 2$ Hermitian matrix can be written as:

$$A = a_0 I + a_1 X + a_2 Y + a_3 Z$$

where $a_0, a_1, a_2, a_3 \in \mathbb{R}$. This decomposition is the mathematical foundation of the **Bloch sphere representation** of single-qubit states and operations.

## 13. Tensor Product

The **tensor product** is the mathematical operation that combines the state spaces of individual quantum systems into a joint state space for composite systems. If system $A$ has state space $\mathbb{C}^m$ and system $B$ has state space $\mathbb{C}^n$, the composite system $AB$ has state space $\mathbb{C}^m \otimes \mathbb{C}^n \cong \mathbb{C}^{mn}$.

#### Tensor Product of Vectors

$$|\psi\rangle \otimes |\phi\rangle = \begin{pmatrix} \psi_1 \\ \psi_2 \\ \vdots \\ \psi_m \end{pmatrix} \otimes \begin{pmatrix} \phi_1 \\ \phi_2 \\ \vdots \\ \phi_n \end{pmatrix} = \begin{pmatrix} \psi_1 \phi_1 \\ \psi_1 \phi_2 \\ \vdots \\ \psi_1 \phi_n \\ \psi_2 \phi_1 \\ \vdots \\ \psi_m \phi_n \end{pmatrix}$$

where:

- $|\psi\rangle \in \mathbb{C}^m$ and $|\phi\rangle \in \mathbb{C}^n$
- The result $|\psi\rangle \otimes |\phi\rangle \in \mathbb{C}^{mn}$ (also written $|\psi\rangle|\phi\rangle$ or $|\psi, \phi\rangle$ or $|\psi\phi\rangle$)

For matrices, the tensor product (also called the **Kronecker product**) of an $m \times n$ matrix $A$ and a $p \times q$ matrix $B$ is the $mp \times nq$ block matrix:

$$(A \otimes B) = \begin{pmatrix} A_{11}B & A_{12}B & \cdots & A_{1n}B \\ A_{21}B & A_{22}B & \cdots & A_{2n}B \\ \vdots & \vdots & \ddots & \vdots \\ A_{m1}B & A_{m2}B & \cdots & A_{mn}B \end{pmatrix}$$

The tensor product satisfies several important algebraic properties:

- **Bilinearity:** $|\psi\rangle \otimes (\alpha |\phi_1\rangle + \beta |\phi_2\rangle) = \alpha (|\psi\rangle \otimes |\phi_1\rangle) + \beta (|\psi\rangle \otimes |\phi_2\rangle)$
- **Associativity:** $(|\psi\rangle \otimes |\phi\rangle) \otimes |\chi\rangle = |\psi\rangle \otimes (|\phi\rangle \otimes |\chi\rangle)$
- **Mixed product property:** $(A \otimes B)(C \otimes D) = (AC) \otimes (BD)$, provided the matrix dimensions are compatible

The computational basis for a two-qubit system is:

$$|00\rangle = |0\rangle \otimes |0\rangle, \quad |01\rangle = |0\rangle \otimes |1\rangle, \quad |10\rangle = |1\rangle \otimes |0\rangle, \quad |11\rangle = |1\rangle \otimes |1\rangle$$

A state that **cannot** be written as a tensor product of individual qubit states is called an **entangled state**. The canonical example is the Bell state:

$$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$

This state has no decomposition of the form $|\psi\rangle \otimes |\phi\rangle$, reflecting the deeply non-classical correlations of quantum entanglement. For an $n$-qubit system, the state space has dimension $2^n$, and the exponential growth of this dimension is both the source of quantum computational power and the reason classical simulation of quantum systems is intractable.

#### Diagram: Tensor Product and Entanglement

<iframe src="../../sims/tensor-product/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive demonstration of tensor products for two-qubit states and entanglement</summary>
Type: MicroSim
Learning objective: Students can construct product states using the tensor product and distinguish product states from entangled states (Bloom: Analyze).
Visual elements: Two single-qubit Bloch spheres on the left, each with a draggable state vector. On the right, the four-component state vector of the two-qubit system is displayed as a bar chart of amplitudes ($|00\rangle$, $|01\rangle$, $|10\rangle$, $|11\rangle$). A panel below tests separability by attempting to factor the state. A toggle allows switching to predefined entangled states (Bell states).
Controls: Drag qubit states on each Bloch sphere. Buttons to load Bell states $|\Phi^+\rangle$, $|\Phi^-\rangle$, $|\Psi^+\rangle$, $|\Psi^-\rangle$.
Behavior: For product states, the factorization panel shows the successful decomposition. For entangled states, it shows that no decomposition exists and highlights the non-classical correlations.
Implementation: p5.js with two 3D Bloch sphere renderings and amplitude bar chart.
</details>

## 14. Spectral Decomposition

The **spectral theorem** is one of the most powerful results in linear algebra and underpins the entire measurement theory of quantum mechanics. It states that any normal matrix (and in particular, any Hermitian or unitary matrix) can be decomposed in terms of its eigenvalues and eigenvectors.

#### Spectral Decomposition (Hermitian Case)

$$A = \sum_{j=1}^{n} \lambda_j \, |e_j\rangle \langle e_j|$$

where:

- $\lambda_j \in \mathbb{R}$ are the eigenvalues of the Hermitian matrix $A$
- $\{|e_j\rangle\}_{j=1}^{n}$ is a complete orthonormal set of eigenvectors
- $|e_j\rangle\langle e_j|$ is the projection operator onto the eigenspace of $\lambda_j$

This decomposition expresses the matrix $A$ as a weighted sum of projection operators, with the eigenvalues as weights. The spectral decomposition has immediate physical significance: it tells us that a measurement of the observable $A$ yields outcome $\lambda_j$ with probability $p_j = |\langle e_j | \psi \rangle|^2$, and after the measurement the system is left in the eigenstate $|e_j\rangle$. This is the mathematical formulation of the **projection postulate** of quantum mechanics.

The spectral decomposition also provides the natural way to define **functions of matrices**. If $f : \mathbb{R} \to \mathbb{C}$ is any function, we define:

$$f(A) = \sum_{j=1}^{n} f(\lambda_j) \, |e_j\rangle \langle e_j|$$

For example, the matrix exponential $e^{iA} = \sum_j e^{i\lambda_j} |e_j\rangle\langle e_j|$, which, as noted earlier, is unitary when $A$ is Hermitian. Similarly, the square root of a positive semi-definite matrix is $\sqrt{A} = \sum_j \sqrt{\lambda_j} |e_j\rangle\langle e_j|$.

For the unitary case, the spectral decomposition takes the same form but with eigenvalues on the unit circle:

#### Spectral Decomposition (Unitary Case)

$$U = \sum_{j=1}^{n} e^{i\theta_j} \, |e_j\rangle \langle e_j|$$

where:

- $e^{i\theta_j}$ are the eigenvalues of the unitary matrix $U$, each with unit modulus
- $\{|e_j\rangle\}$ is an orthonormal eigenbasis

This decomposition reveals that every unitary operation is a collection of phase rotations applied to orthogonal subspaces, a perspective that is central to understanding quantum algorithms such as quantum phase estimation.

## 15. Probability Theory

Quantum mechanics is fundamentally probabilistic: even with complete knowledge of a quantum state, measurement outcomes are generally random. The mathematical framework of probability theory therefore plays a dual role in quantum computing -- it describes both classical uncertainty (our ignorance about the state of a system) and quantum uncertainty (the intrinsic randomness of measurement outcomes).

A **probability distribution** over a discrete set of outcomes $\{x_1, x_2, \ldots, x_n\}$ is a function $p$ assigning a non-negative real number $p(x_j)$ to each outcome, such that:

#### Normalization Condition

$$\sum_{j=1}^{n} p(x_j) = 1$$

where:

- $p(x_j) \geq 0$ for all $j$
- The sum extends over all possible outcomes

The **expectation value** (or mean) of a random variable $X$ that takes value $x_j$ with probability $p(x_j)$ is:

#### Expectation Value

$$\langle X \rangle = \mathbb{E}[X] = \sum_{j=1}^{n} x_j \, p(x_j)$$

where:

- $\langle X \rangle$ denotes the expectation value (borrowing Dirac notation)
- $\mathbb{E}[X]$ is the standard probability-theory notation for expectation

The **variance** measures the spread of outcomes around the mean:

$$\text{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$$

In quantum mechanics, if the system is in state $|\psi\rangle$ and we measure the observable $A$ (a Hermitian matrix), the expectation value of the measurement outcome is:

$$\langle A \rangle_\psi = \langle \psi | A | \psi \rangle$$

and the variance is:

$$(\Delta A)^2 = \langle \psi | A^2 | \psi \rangle - \langle \psi | A | \psi \rangle^2$$

The **Heisenberg uncertainty principle** provides a fundamental lower bound on the product of the variances of two observables:

$$\Delta A \cdot \Delta B \geq \frac{1}{2} |\langle [A, B] \rangle|$$

This inequality states that for any pair of non-commuting observables, it is impossible to simultaneously know both with arbitrary precision -- a statement with no classical analogue.

#### Diagram: Measurement Probability Distribution

<iframe src="../../sims/measurement-probability/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive simulation of quantum measurement outcomes and probability distributions</summary>
Type: MicroSim
Learning objective: Students can predict measurement outcome probabilities from a given quantum state using the Born rule, and verify predictions through simulated repeated measurements (Bloom: Apply).
Visual elements: A Bloch sphere on the left showing the current qubit state $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$. On the right, a bar chart showing the theoretical probabilities $|\alpha|^2$ and $|\beta|^2$ alongside a histogram of simulated measurement outcomes that builds up over repeated trials.
Controls: A draggable point on the Bloch sphere to set the state. A "Measure" button to perform a single measurement. A "Run N Measurements" button with a slider for $N$ (10 to 10000). A reset button to clear the histogram. A dropdown to select measurement basis (computational, Hadamard, or custom).
Behavior: Each measurement collapses the state to $|0\rangle$ or $|1\rangle$ with the appropriate probabilities, and the histogram accumulates. As $N$ grows, the histogram converges to the theoretical distribution, illustrating the law of large numbers.
Implementation: p5.js with 3D Bloch sphere rendering, pseudorandom sampling, and dynamic histogram.
</details>

**Conditional probability** and **Bayes' theorem** also appear in quantum information. The conditional probability of event $A$ given event $B$ is:

$$P(A | B) = \frac{P(A \cap B)}{P(B)}$$

provided $P(B) > 0$. Bayes' theorem follows immediately:

$$P(A | B) = \frac{P(B | A) \, P(A)}{P(B)}$$

In quantum computing, these classical probability concepts arise in the context of mixed states and partial measurements. A **mixed state**, represented by a **density matrix** $\rho$, describes a system about which we have incomplete classical information. The density matrix formalism unifies quantum and classical uncertainty: a pure state $|\psi\rangle$ corresponds to $\rho = |\psi\rangle\langle\psi|$ (rank 1), while a classical probabilistic mixture of states $\{p_j, |\psi_j\rangle\}$ is described by:

$$\rho = \sum_j p_j \, |\psi_j\rangle \langle \psi_j|$$

The density matrix satisfies three properties: (i) $\rho = \rho^\dagger$ (Hermiticity), (ii) $\rho \geq 0$ (positive semi-definiteness), and (iii) $\operatorname{Tr}(\rho) = 1$ (unit trace, reflecting normalization). Measurement expectation values generalize to $\langle A \rangle = \operatorname{Tr}(\rho A)$. The density matrix formalism is the proper mathematical framework for describing open quantum systems, decoherence, and quantum noise -- all essential topics for understanding real quantum hardware.

## Chapter Summary

The mathematical foundations presented in this chapter -- complex numbers and their conjugates, Euler's formula, vector spaces and linear independence, inner and outer products, matrix multiplication, eigenvalues and eigenvectors, unitary and Hermitian matrices, tensor products, spectral decomposition, and probability theory -- constitute the essential toolkit for quantum computing. The following table summarizes the role each concept plays in the quantum formalism:

| Mathematical Concept | Role in Quantum Computing |
|---|---|
| Complex numbers | Quantum amplitudes |
| Complex conjugate | Probability computation via $\lvert\alpha\rvert^2 = \alpha^* \alpha$ |
| Euler's formula | Phase representation of quantum gates |
| Vector spaces | State spaces of quantum systems |
| Linear independence | Basis construction, dimensionality |
| Inner product | Transition amplitudes, Born rule |
| Outer product | Projection operators, density matrices |
| Matrix multiplication | Gate composition, time evolution |
| Eigenvalues | Measurement outcomes |
| Eigenvectors | Post-measurement states |
| Unitary matrices | Quantum gates (reversible evolution) |
| Hermitian matrices | Observable quantities |
| Tensor product | Composite quantum systems, entanglement |
| Spectral decomposition | Measurement formalism, matrix functions |
| Probability theory | Measurement statistics, mixed states |

Each subsequent chapter builds on these foundations. Chapter 2 (Physical Limits) will use information theory and thermodynamics to explore fundamental bounds on computation, while Chapter 7 (Quantum Mechanics) will recast the mathematical tools developed here as the formal postulates of quantum theory. A solid command of this material will ensure that the transition from mathematics to physics -- and from physics to quantum algorithms -- is as seamless as possible.
