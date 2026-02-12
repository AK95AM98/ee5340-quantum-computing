---
title: Course Description for EE 5340 Introduction to Quantum Computing and Physical Basics of Computing
description: A detailed course description for EE 5340 including overview, topics covered and learning objectives in the format of the 2001 Bloom Taxonomy
quality_score: 95
---

# Course Description

## Course Title

EE 5340: Introduction to Quantum Computing and Physical Basics of Computing

## Institution

University of Minnesota, Twin Cities - Department of Electrical and Computer Engineering

## Credits

3.0

## Instructor

Ulya Karpuzcu

## Target Audience

Graduate students in Computer Science and Engineering (CSE). The course is suitable for students interested in understanding the physical foundations of computing and how emerging paradigms such as quantum computing address fundamental limits of classical computation.

## Prerequisites

- A previous course in computer architecture is suggested but not required
- Basic familiarity with linear algebra and probability
- Graduate standing in CSE

## Pedagogical Approach

This textbook emphasizes detailed mathematical treatment of every concept. Each topic includes rigorous derivations, step-by-step proofs, worked examples with full solutions, and mathematical intuition behind key results. Students are expected to follow derivations from first principles and develop fluency with the mathematical formalisms (linear algebra, probability theory, information theory, quantum mechanics) that underpin each computing paradigm.

## Course Description

This course explores how physical principles and limits have been shaping paradigms of computing. A key goal of this course is to understand how (and to what extent) a paradigm shift in computing can help with emerging energy problems. Topics include physical limits of computing, coding and information theoretical foundations, computing with beyond-CMOS devices, reversible computing, quantum computing, and stochastic computing.

## Course Topics

1. **Mathematical Foundations** - Complex numbers, vector spaces, linear algebra review, matrix operations, eigenvalues and eigenvectors, inner products, tensor products, unitary and Hermitian matrices, probability theory and random variables
2. **Physical Limits of Computing** - Thermodynamic limits of computation, Landauer's principle (derivation of $k_BT\ln 2$ bound), Brillouin's resolution of Maxwell's demon, entropy and information equivalence, Moore's Law and the end of Dennard scaling, Margolus-Levitin theorem on computational speed limits
3. **Information Theory Foundations** - Shannon entropy (derivation and properties), mutual information, data processing inequality, coding theorems, channel capacity, Kolmogorov complexity, information-theoretic bounds on computation, connections between thermodynamic and information entropy
4. **Classical Computing Fundamentals** - Boolean algebra and logic minimization, CMOS transistor physics, power dissipation models ($P = \alpha C V_{dd}^2 f + V_{dd} I_{leak}$), subthreshold leakage, gate oxide tunneling, Boltzmann tyranny ($kT/q$ thermal voltage limit)
5. **Beyond-CMOS Devices** - Spintronic devices (spin-transfer torque, spin-orbit torque), memristive devices (mathematical model of resistance switching), tunnel FETs (subthreshold swing below 60 mV/decade), negative capacitance FETs (Landau-Ginzburg theory), device physics and energy comparisons
6. **Reversible Computing** - Logical vs. physical reversibility, Bennett's proof that computation can be done reversibly, reversible logic gates (Toffoli gate matrix, Fredkin gate matrix), adiabatic computing circuits, energy recovery logic, charge recovery analysis
7. **Quantum Mechanics Foundations** - Postulates of quantum mechanics (mathematical formulation), wave-particle duality, superposition principle with complex amplitudes, Dirac notation (bras, kets, operators), Hilbert space formalism, measurement theory (projection operators, Born rule derivation), uncertainty principle (proof from commutation relations), density matrices for mixed states
8. **Qubits and Quantum States** - Qubit as a two-level quantum system ($|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ with $|\alpha|^2 + |\beta|^2 = 1$), Bloch sphere parametrization ($\theta, \phi$), global vs. relative phase, multi-qubit state spaces (tensor product construction), entangled states (Schmidt decomposition), Bell states (derivation and properties), partial trace and reduced density matrices
9. **Quantum Gates and Circuits** - Pauli matrices (algebraic properties, commutation and anti-commutation relations), Hadamard transform (matrix form and action on basis states), rotation operators ($R_x, R_y, R_z$ derivations from matrix exponentials), CNOT gate (matrix representation, entanglement generation proof), universal gate sets (Solovay-Kitaev theorem), circuit model of computation, T-gate and magic state distillation, gate decomposition techniques
10. **Quantum Algorithms** - Quantum parallelism and interference (mathematical framework), Deutsch-Jozsa algorithm (step-by-step derivation), Bernstein-Vazirani algorithm, Simon's algorithm, quantum Fourier transform (derivation of $O(n^2)$ circuit), phase estimation (error analysis), Shor's algorithm (reduction to period finding, QFT application, continued fractions), Grover's algorithm (amplitude amplification proof, optimality of $O(\sqrt{N})$), oracle construction techniques
11. **Quantum Error Correction** - Quantum noise channels (Kraus operator formalism), bit-flip and phase-flip error models, three-qubit repetition code (encoding, syndrome measurement, recovery), Knill-Laflamme conditions (derivation), stabilizer formalism (Pauli group, stabilizer generators), surface codes (toric code construction, logical operators), code distance and error thresholds (threshold theorem statement), fault-tolerant gate constructions
12. **Quantum Hardware Platforms** - Superconducting qubits (Josephson junction Hamiltonian, transmon regime $E_J/E_C \gg 1$, charge dispersion analysis), trapped ions (Paul trap equations of motion, Rabi oscillations, Molmer-Sorensen gate derivation), photonic qubits (linear optical quantum computing, KLM scheme), comparison of coherence times, gate fidelities, and connectivity
13. **Stochastic Computing** - Stochastic number representation (bipolar and unipolar encoding), mathematical analysis of stochastic logic gates (multiplication as AND, addition via MUX), variance analysis and accuracy bounds, correlation effects on computation accuracy, applications in neural networks and image processing, comparison with deterministic computing energy efficiency
14. **Quantum-Classical Hybrid Computing** - Variational principle (Rayleigh-Ritz method), VQE algorithm (ansatz design, parameter optimization, gradient estimation), QAOA (derivation from adiabatic evolution, performance guarantees for MAX-CUT), barren plateau analysis, classical optimization landscape, NISQ-era algorithm design constraints
15. **Energy-Efficient Computing Paradigms** - Neuromorphic computing (spiking neural network mathematics), approximate computing (error analysis frameworks), in-memory computing (analog matrix-vector multiply), thermodynamic computing, comparative energy analysis across paradigms ($\text{energy per operation}$ metrics)
16. **Future of Computing** - Quantum supremacy milestones (random circuit sampling complexity arguments), post-Moore computing landscape, convergence of computing paradigms, quantum advantage in chemistry and optimization (resource estimation), roadmaps for fault-tolerant quantum computing

## Topics Not Covered

The following topics are outside the scope of this course:

- Quantum field theory and relativistic quantum mechanics
- Detailed semiconductor fabrication processes
- Analog circuit design and RF engineering
- Quantum chemistry simulation details (beyond high-level applications)
- Quantum networking and quantum internet protocols
- Quantum cryptography beyond basic QKD concepts
- Detailed VLSI design and layout
- Classical machine learning and deep learning (except as it relates to hybrid quantum-classical approaches)
- Quantum sensing and quantum metrology
- Detailed compiler design for quantum computers

## Learning Outcomes

By the end of this course, students will be able to:

### Remember (Bloom's Level 1)
- State the postulates of quantum mechanics in mathematical form
- List the fundamental physical limits that constrain classical computing (Landauer, Margolus-Levitin, Boltzmann)
- Recall the matrix representations of standard quantum gates (Pauli, Hadamard, CNOT, Toffoli)
- Identify the algebraic properties of unitary and Hermitian operators

### Understand (Bloom's Level 2)
- Derive Landauer's energy bound $E \geq k_BT\ln 2$ from thermodynamic first principles
- Explain the mathematical relationship between Shannon entropy and thermodynamic entropy
- Describe quantum state evolution using density matrix formalism
- Interpret Bloch sphere geometry in terms of state vector parameters ($\theta, \phi$)
- Trace through the mathematical steps of Grover's amplitude amplification

### Apply (Bloom's Level 3)
- Construct quantum circuits and compute their unitary matrix representations
- Calculate energy dissipation bounds for reversible and irreversible logic operations
- Perform tensor product calculations for multi-qubit state construction
- Apply the quantum Fourier transform to solve period-finding problems
- Implement quantum algorithms step-by-step showing intermediate state vectors
- Compute stochastic computing accuracy bounds using variance analysis

### Analyze (Bloom's Level 4)
- Derive the computational complexity separation between quantum and classical algorithms
- Analyze quantum error correction codes using the stabilizer formalism
- Compare energy-per-operation across computing paradigms using quantitative models
- Decompose arbitrary unitary operations into universal gate sets with bounded error
- Evaluate transmon qubit Hamiltonians in different parameter regimes ($E_J/E_C$)

### Evaluate (Bloom's Level 5)
- Assess quantum advantage claims by analyzing computational complexity arguments
- Critique the assumptions and limitations of quantum error threshold theorems
- Judge the mathematical validity of resource estimates for fault-tolerant quantum computing
- Evaluate tradeoffs between gate fidelity, coherence time, and connectivity across hardware platforms
- Appraise the accuracy-efficiency tradeoffs in stochastic computing using formal error bounds

### Create (Bloom's Level 6)
- Design and mathematically verify a quantum circuit for a specific computational problem
- Derive a new error correction encoding for a given noise model
- Construct a variational ansatz and analyze its expressibility for a target Hamiltonian
- Develop a quantitative comparative analysis of computing paradigms for a target application with formal energy and complexity bounds
- Formulate mathematical proofs connecting physical limits to computational capabilities

## Course Format

- Lectures: Monday/Wednesday, 75 minutes each
- UNITE distributed learning section available (live video stream with archived recordings)
- Class size: approximately 40 students

## Assessment Methods

- Problem sets covering theoretical and computational exercises
- Midterm examination
- Final project or examination
- Participation in class discussions

## Textbook and References

- Nielsen, M. A., & Chuang, I. L. - *Quantum Computation and Quantum Information*
- Kaye, P., Laflamme, R., & Mosca, M. - *An Introduction to Quantum Computing*
- Additional readings and papers assigned per topic
