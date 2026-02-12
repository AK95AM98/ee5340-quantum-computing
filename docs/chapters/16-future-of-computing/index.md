---
title: Future of Computing
description: Quantum supremacy, quantum advantage, benchmarking metrics, resource estimation, and post-Moore computing landscape
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Future of Computing

## Summary

This chapter assesses the current state and future directions of computing paradigms. We analyze quantum supremacy experiments and their complexity-theoretic arguments, distinguish quantum supremacy from practical quantum advantage, examine benchmarking metrics including cross-entropy benchmarking and quantum volume, discuss quantum resource estimation for fault-tolerant applications, and survey the post-Moore computing landscape.

## Concepts Covered

This chapter covers the following 6 concepts:

1. Quantum Supremacy Experiment
2. Quantum Advantage
3. Cross-Entropy Benchmarking
4. Quantum Volume
5. Quantum Resource Estimation
6. Post-Moore Landscape

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Classical Computing Fundamentals](../04-classical-computing/index.md)
- [Chapter 9: Quantum Gates and Circuits](../09-quantum-gates/index.md)
- [Chapter 11: Quantum Error Correction](../11-quantum-error-correction/index.md)
- [Chapter 12: Quantum Hardware Platforms](../12-quantum-hardware/index.md)
- [Chapter 15: Energy-Efficient Computing Paradigms](../15-energy-efficient-computing/index.md)

---

## Introduction

The preceding chapters have developed the theoretical foundations and hardware implementations of quantum computing. We now confront the central question: **does any quantum device actually surpass the capabilities of classical computers, and if so, in what sense?** The answer requires careful delineation of complexity-theoretic claims, experimental evidence, benchmarking methodology, and resource estimation for practical applications. Beyond quantum computing itself, the broader post-Moore landscape presents a rich tapestry of computing paradigms—neuromorphic, approximate, stochastic, and hybrid—each targeting distinct computational niches as Dennard scaling and Moore's law reach their physical limits.

This chapter proceeds in six sections. We begin with the concept and experimental realization of quantum supremacy (Section 1), then distinguish it from the more practically oriented notion of quantum advantage (Section 2). We next examine two key benchmarking metrics: cross-entropy benchmarking (Section 3) and quantum volume (Section 4). Section 5 develops the formalism of quantum resource estimation for fault-tolerant applications. We conclude with a survey of the post-Moore computing landscape (Section 6), placing quantum computing in the broader context of emerging computational paradigms.

The interplay between these concepts can be summarized as follows:

- **Quantum supremacy** establishes a complexity-theoretic separation: a quantum device performs a specific task that no classical computer can replicate in feasible time
- **Quantum advantage** demands that the task be practically useful, not merely computationally hard
- **Benchmarking metrics** provide the measurement apparatus to quantify and compare quantum device performance
- **Resource estimation** bridges the gap between current noisy devices and future fault-tolerant machines by quantifying the hardware requirements for target applications
- **Post-Moore landscape** contextualizes quantum computing within the broader ecosystem of next-generation computing technologies

## Quantum Supremacy Experiment

**Quantum supremacy** (also termed *quantum computational advantage*) denotes the milestone at which a programmable quantum device performs a well-defined computational task that no classical computer can complete in any feasible amount of time. The term was introduced by John Preskill in 2012, drawing on complexity-theoretic arguments that certain sampling problems—tractable for quantum computers—are intractable classically under plausible conjectures.

The theoretical foundation rests on the observation that sampling from the output distribution of a random quantum circuit is believed to be classically hard. Consider an $n$-qubit circuit $U$ composed of $d$ layers of random two-qubit gates drawn from a universal gate set. The output distribution is:

#### Random Circuit Sampling Distribution

$$
p(\mathbf{x}) = |\langle \mathbf{x} | U | 0^n \rangle|^2
$$

where:

- $\mathbf{x} \in \{0,1\}^n$ is a computational basis bitstring
- $U$ is the random unitary circuit
- $|0^n\rangle$ is the initial all-zeros state
- The distribution $p(\mathbf{x})$ is conjectured to be classically intractable to sample from when the circuit depth $d$ exceeds a threshold scaling polynomially in $n$

The complexity-theoretic argument proceeds as follows. If a classical computer could efficiently sample from the output distribution of random quantum circuits, then by a chain of polynomial-time reductions, the polynomial hierarchy (PH) would collapse to its third level. Since a collapse of PH is widely believed not to occur (an assumption comparable in status to $\mathrm{P} \neq \mathrm{NP}$), classical simulation of random quantum circuits is presumed to be exponentially hard.

### Google's Sycamore Experiment (2019)

The landmark supremacy experiment was performed by Google's AI Quantum team using the Sycamore processor, a 53-qubit superconducting transmon device. The experimental protocol was:

1. **Circuit construction**: Apply $d = 20$ cycles of alternating single-qubit gates (randomly chosen from $\{\sqrt{X}, \sqrt{Y}, \sqrt{W}\}$) and two-qubit $\sqrt{\text{iSWAP}}$ gates on a two-dimensional grid of qubits
2. **Measurement**: Sample bitstrings from the output distribution by repeated execution of the circuit
3. **Verification**: Evaluate the quality of the samples using cross-entropy benchmarking (see Section 3)

| Parameter | Value |
|---|---|
| Number of qubits | 53 (of 54 fabricated; one defective) |
| Circuit depth | 20 cycles |
| Two-qubit gate | $\sqrt{\text{iSWAP}}$ (fSim gate family) |
| Two-qubit gate error | $\sim 0.36\%$ |
| Single-qubit gate error | $\sim 0.15\%$ |
| Readout error | $\sim 3.8\%$ |
| Sampling time | 200 seconds ($10^6$ samples) |
| Estimated classical time (2019) | $\sim 10{,}000$ years (Summit supercomputer) |

The claim of supremacy rested on the assertion that the Sycamore processor completed the sampling task in 200 seconds, whereas the most powerful classical supercomputer at the time (IBM's Summit) would require approximately 10,000 years. Subsequent classical algorithmic improvements have reduced the estimated classical cost substantially, with tensor-network methods bringing the estimate down to days or weeks on modern hardware, though this remains far beyond the quantum runtime.

### Subsequent Experiments

The quantum supremacy landscape has evolved considerably since 2019:

- **USTC Jiuzhang (2020--2021)**: Demonstrated boson sampling supremacy with up to 113 detected photons using Gaussian boson sampling, a task estimated to require $10^{24}$ years classically
- **USTC Zuchongzhi (2021--2022)**: 66-qubit superconducting processor performing random circuit sampling at increased depth, strengthening the supremacy claim
- **IBM (2023--2024)**: Demonstrated utility-scale quantum computation on 127-qubit Eagle and 1121-qubit Condor processors, focusing on problems with practical relevance rather than pure supremacy
- **Google Willow (2024--2025)**: 105-qubit processor demonstrating below-threshold error correction, establishing a new milestone for fault-tolerant scalability

#### Diagram: Quantum Supremacy Timeline

<iframe src="../../sims/quantum-supremacy-timeline/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Quantum Supremacy Milestones and Classical Spoilers</summary>
Type: Interactive Timeline / Infographic
A horizontal timeline from 2012 (Preskill's coining of the term) to 2026, showing major supremacy experiments (Google Sycamore, USTC Jiuzhang, Zuchongzhi, IBM Eagle/Condor, Google Willow) as nodes with expandable details. Below each quantum milestone, corresponding classical "spoiler" results (improved tensor-network simulations, GPU-based sampling) are shown, illustrating the ongoing cat-and-mouse dynamic. Hovering over each node reveals the number of qubits, circuit depth, claimed speedup, and subsequent classical responses.
Implementation: D3.js timeline with expandable nodes and linked classical/quantum tracks.
</details>

## Quantum Advantage

While quantum supremacy establishes a complexity-theoretic separation, **quantum advantage** (sometimes called *practical quantum advantage*) demands that the quantum computation solve a problem of genuine practical value faster, cheaper, or more accurately than the best available classical alternative. This distinction is crucial: random circuit sampling, the basis for supremacy demonstrations, has no known direct application. Quantum advantage requires demonstrating superiority on tasks that matter to science, engineering, or industry.

The hierarchy of quantum computational milestones can be organized as follows:

| Milestone | Definition | Status (2026) |
|---|---|---|
| Quantum supremacy | Quantum device outperforms classical on *any* well-defined task | Demonstrated (contested) |
| Quantum utility | Quantum device produces results useful for scientific inquiry | Emerging evidence |
| Quantum advantage | Quantum device outperforms classical on a *practical* task | Not yet conclusively demonstrated |
| Fault-tolerant quantum computation | Logical error rates below threshold for scalable computation | Early demonstrations |

The candidate domains for near-term quantum advantage include:

- **Quantum chemistry**: Computing ground-state energies and reaction dynamics of molecular systems relevant to drug discovery and materials science. The electronic structure problem for strongly correlated systems (e.g., FeMo-cofactor in nitrogen fixation) remains intractable classically but is a natural target for quantum simulation.
- **Optimization**: Combinatorial optimization problems arising in logistics, finance, and machine learning. Variational quantum eigensolvers (VQE) and the quantum approximate optimization algorithm (QAOA) are the leading near-term approaches, though classical heuristics remain competitive for most problem instances studied to date.
- **Quantum machine learning**: Kernel methods in exponentially large Hilbert spaces, quantum neural networks, and quantum-enhanced sampling. Provable separations exist for contrived problems, but advantage on practical machine learning tasks remains elusive.
- **Cryptanalysis**: Shor's algorithm provides an exponential speedup for integer factoring and discrete logarithm, but requires millions of physical qubits with fault-tolerant error correction—far beyond current hardware.
- **Quantum simulation**: Simulating many-body quantum dynamics, lattice gauge theories, and topological phases of matter. These are perhaps the most natural applications, as the quantum computer directly embodies the quantum system being studied.

A rigorous framework for claiming quantum advantage requires specifying:

1. **The computational problem** $\mathcal{P}$ with a well-defined input-output relation
2. **The figure of merit** $\mathcal{F}$ (e.g., time-to-solution, energy, accuracy)
3. **The best classical algorithm** $\mathcal{A}_C$ for $\mathcal{P}$, running on the best available classical hardware
4. **The quantum algorithm** $\mathcal{A}_Q$ for $\mathcal{P}$, including compilation, error mitigation, and all overhead
5. **The advantage ratio** $R = \mathcal{F}(\mathcal{A}_C) / \mathcal{F}(\mathcal{A}_Q) > 1$ on problem instances of practical interest

The challenge of claiming quantum advantage is compounded by the fact that classical algorithms continue to improve. Several claimed quantum speedups have been "spoiled" by subsequent classical algorithmic advances—a phenomenon sometimes called the "classical spoiler" effect. Any credible quantum advantage claim must therefore be benchmarked against state-of-the-art classical methods, not merely naive baselines.

#### Diagram: Quantum Advantage Assessment Framework

<iframe src="../../sims/quantum-advantage-framework/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Quantum vs. Classical Performance Comparison Framework</summary>
Type: Interactive MicroSim
A two-panel visualization. The left panel shows a log-log plot of problem size $n$ versus time-to-solution for both classical (polynomial scaling, various colors for different algorithms) and quantum (with and without error correction overhead). The right panel shows a "breakeven" analysis: user selects an application domain (chemistry, optimization, machine learning, cryptography) and adjusts physical qubit count, gate error rate, and circuit depth. The tool computes and displays the crossover point where quantum outperforms classical, highlighting whether current or projected hardware reaches this threshold.
Implementation: p5.js with parameterized scaling curves and interactive selectors.
</details>

## Cross-Entropy Benchmarking

**Cross-entropy benchmarking (XEB)** is the primary metric used to verify quantum supremacy experiments. It quantifies how well the measured output distribution of a quantum circuit matches the theoretically predicted distribution by measuring the cross-entropy between the experimental samples and the ideal output probabilities.

Given a quantum circuit $U$ acting on $n$ qubits, the ideal output distribution assigns probability $p(\mathbf{x}) = |\langle \mathbf{x}|U|0^n\rangle|^2$ to each bitstring $\mathbf{x}$. The linear cross-entropy benchmark is defined as:

#### Linear Cross-Entropy Benchmark (Linear XEB)

$$
\mathcal{F}_{\text{XEB}} = 2^n \langle p(\mathbf{x}) \rangle_{\text{samples}} - 1
$$

where:

- $2^n$ is the Hilbert space dimension
- $\langle p(\mathbf{x}) \rangle_{\text{samples}} = \frac{1}{N_s}\sum_{i=1}^{N_s} p(\mathbf{x}_i)$ is the average ideal probability of the experimentally sampled bitstrings $\{\mathbf{x}_1, \ldots, \mathbf{x}_{N_s}\}$
- $\mathcal{F}_{\text{XEB}} = 1$ for a perfect (noiseless) quantum computer
- $\mathcal{F}_{\text{XEB}} = 0$ for a uniform random sampler (no quantum signal)
- $0 < \mathcal{F}_{\text{XEB}} < 1$ for a noisy quantum device, with the value reflecting the overall circuit fidelity

The physical interpretation of XEB is elegant. For a random circuit, the ideal output probabilities follow a Porter-Thomas distribution:

#### Porter-Thomas Distribution

$$
\Pr[p(\mathbf{x}) = p] = 2^n e^{-2^n p}
$$

where:

- This exponential distribution is characteristic of the output of Haar-random unitaries
- The mean probability is $\langle p \rangle = 2^{-n}$ (uniform), but the variance is large: $\text{Var}[p] = 2^{-2n}$

A perfect quantum sampler draws bitstrings preferentially from the high-probability tail of this distribution, yielding $\langle p(\mathbf{x})\rangle_{\text{samples}} = 2\cdot 2^{-n}$ (twice the mean), and hence $\mathcal{F}_{\text{XEB}} = 1$. A uniform random sampler draws uniformly, yielding $\langle p(\mathbf{x})\rangle_{\text{samples}} = 2^{-n}$ and $\mathcal{F}_{\text{XEB}} = 0$.

The connection between XEB and circuit fidelity arises from the global depolarizing noise model. If the quantum device implements the ideal unitary $U$ with probability $f$ (the circuit fidelity) and produces a uniformly random state with probability $1-f$, then:

#### XEB-Fidelity Connection

$$
\mathcal{F}_{\text{XEB}} \approx f = \prod_{g \in \text{gates}} (1 - \epsilon_g)
$$

where:

- $f$ is the overall circuit fidelity
- $\epsilon_g$ is the error rate of gate $g$
- The product extends over all gates in the circuit
- This approximation assumes that errors are independent and depolarizing

In the Sycamore experiment, the measured $\mathcal{F}_{\text{XEB}} \approx 0.002$ for the full 53-qubit, depth-20 circuit. While this value appears small, it is $\sim 10\sigma$ above the noise floor $\mathcal{F}_{\text{XEB}} = 0$, and the key point is that computing the ideal probabilities $p(\mathbf{x})$ for even this small fidelity requires exponential classical resources.

XEB has been subject to several criticisms and refinements:

- **Spoofing concerns**: Can a classical algorithm achieve $\mathcal{F}_{\text{XEB}} > 0$ without actually sampling from the correct distribution? Partial tensor-network simulations can exploit the structure of the circuit to "spoof" XEB for shallow circuits or circuits on low-connectivity graphs.
- **Patch-based XEB**: To verify supremacy claims, one can partition the qubit grid into smaller patches, compute XEB for each patch exactly, and then extrapolate the full-circuit fidelity assuming error multiplicativity.
- **Log XEB**: An alternative metric, $\mathcal{F}_{\text{log}} = \langle \log(2^n p(\mathbf{x})) \rangle + \gamma_E$ (where $\gamma_E$ is the Euler-Mascheroni constant), which is more robust to certain types of noise but harder to spoof.

## Quantum Volume

**Quantum volume (QV)** is a holistic benchmarking metric introduced by IBM in 2019 that captures the effective computational capacity of a quantum processor by accounting for the number of qubits, gate errors, connectivity, compiler efficiency, and measurement fidelity in a single number. Unlike XEB, which is tailored to verifying specific sampling experiments, quantum volume provides a platform-independent measure for comparing different quantum hardware architectures.

The quantum volume protocol works as follows. Consider a model circuit consisting of $d$ layers of random two-qubit gates (drawn from the Haar measure on $SU(4)$) acting on $m$ of the device's $n$ available qubits, where both the qubit selection and gate pairings are random. After compiling this abstract circuit to the device's native gate set and connectivity (including SWAP insertions for non-adjacent qubit pairs), one executes the compiled circuit and measures the output.

The quantum volume is defined as:

#### Quantum Volume Definition

$$
\log_2 V_Q = \max_{m \leq n} \left\{ m \;\Big|\; \Pr\left[\mathcal{F}_{\text{HO}}(m) > \frac{2}{3}\right] > \frac{2}{3} \right\}
$$

where:

- $V_Q$ is the quantum volume
- $m$ is the number of qubits used in the test circuit
- $n$ is the total number of physical qubits on the device
- $\mathcal{F}_{\text{HO}}(m)$ is the *heavy output probability*: the fraction of measured bitstrings that fall in the "heavy" half of the ideal output distribution (i.e., bitstrings $\mathbf{x}$ with $p(\mathbf{x})$ above the median ideal probability)
- The double threshold ($> 2/3$ in both probability and confidence) ensures statistical rigor
- The maximization over $m$ finds the largest circuit width for which the device passes the test

The heavy output probability for a perfect quantum computer is approximately:

$$
\mathcal{F}_{\text{HO}}^{\text{ideal}} = 1 - \frac{1}{e} + \frac{1}{2e} \approx 0.8534
$$

and for a uniform random sampler:

$$
\mathcal{F}_{\text{HO}}^{\text{random}} = \frac{1}{2}
$$

The threshold of $2/3$ lies between these extremes, providing a meaningful test of quantum coherence.

| Processor | Organization | Year | Quantum Volume | Qubits |
|---|---|---|---|---|
| IBM Eagle (r3) | IBM | 2023 | $2^7 = 128$ | 127 |
| Quantinuum H2 | Quantinuum | 2024 | $2^{20} = 1{,}048{,}576$ | 56 |
| IonQ Forte | IonQ | 2023 | $2^{15} = 32{,}768$ | 32 |
| Rigetti Ankaa-2 | Rigetti | 2024 | $2^8 = 256$ | 84 |
| IBM Heron | IBM | 2024 | $2^9 = 512$ | 133 |

The table above illustrates a key insight: quantum volume does not simply scale with qubit count. Trapped-ion systems (Quantinuum, IonQ) achieve disproportionately high quantum volumes relative to their qubit counts because of their high gate fidelities and all-to-all connectivity, which eliminate the need for costly SWAP operations during compilation.

Quantum volume has known limitations as a benchmarking metric:

- **Square circuit assumption**: QV uses circuits of depth $m$ on $m$ qubits, meaning it does not independently probe width and depth
- **Ceiling effects**: Once a device passes QV for all $m \leq n$, the metric saturates and cannot distinguish further improvements
- **Application irrelevance**: High QV does not guarantee good performance on any specific application
- **Compilation dependence**: The result depends on the quality of the compiler, not just the hardware

Several complementary metrics have been proposed to address these limitations, including circuit layer operations per second (CLOPS), algorithmic qubits, and application-specific benchmarks.

#### Diagram: Quantum Volume Benchmark Visualizer

<iframe src="../../sims/quantum-volume-benchmark/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Quantum Volume Protocol and Heavy Output Analysis</summary>
Type: Interactive MicroSim
A two-panel display. The left panel shows the quantum volume protocol: a random model circuit of width $m$ and depth $m$, compiled to a user-selectable device topology (grid, linear, all-to-all). The right panel shows the heavy output histogram comparing the ideal Porter-Thomas distribution with the measured output, highlighting heavy and light outputs. User can adjust $m$, gate error rate, and connectivity. The tool computes $\mathcal{F}_{\text{HO}}$ and determines whether the device passes the QV test at each width. A summary displays $\log_2 V_Q$.
Implementation: p5.js with Monte Carlo circuit simulation using a depolarizing noise model.
</details>

## Quantum Resource Estimation

**Quantum resource estimation** is the systematic analysis of the physical hardware requirements—number of physical qubits, gate counts, execution time, and classical co-processing—needed to execute a target quantum algorithm at a specified accuracy using fault-tolerant error correction. Resource estimation bridges the gap between asymptotic algorithmic speedups (e.g., Shor's algorithm achieves exponential speedup for factoring) and the concrete engineering question: *how large and how good must the quantum computer be?*

The resource estimation pipeline consists of several stages:

1. **Problem specification**: Define the computational problem, input size $N$, and target accuracy $\epsilon$
2. **Algorithm selection**: Choose the quantum algorithm (e.g., quantum phase estimation, Grover search, VQE) and determine its logical resource requirements
3. **Logical resource count**: Determine the number of logical qubits $n_L$, logical gate count $G_L$, and circuit depth $D_L$
4. **Error correction overhead**: Select an error-correcting code (typically the surface code) and compute the code distance $d$ required to achieve the target logical error rate
5. **Physical resource count**: Compute the number of physical qubits $n_P$, physical gate count $G_P$, and total execution time $T$

The surface code is the dominant error correction scheme for resource estimation due to its high threshold error rate ($\sim 1\%$) and 2D nearest-neighbor connectivity requirement. The key relations are:

#### Surface Code Logical Error Rate

$$
p_L(d) \approx A \left(\frac{p}{p_{\text{th}}}\right)^{\lfloor d/2 \rfloor + 1}
$$

where:

- $p_L$ is the logical error rate per code cycle
- $p$ is the physical error rate per gate
- $p_{\text{th}} \approx 0.01$ is the surface code threshold
- $d$ is the code distance (must be odd)
- $A$ is a constant of order $\sim 0.1$--$0.3$ depending on the noise model

The number of physical qubits per logical qubit in the surface code is:

#### Surface Code Qubit Overhead

$$
n_P^{(\text{per logical})} = 2d^2
$$

where:

- $d$ is the code distance
- The factor of 2 accounts for both data qubits and syndrome measurement (ancilla) qubits in the standard planar layout
- For $d = 17$ (a commonly estimated distance for practical applications): $n_P^{(\text{per logical})} = 578$

The total number of physical qubits for a computation requiring $n_L$ logical qubits is:

$$
n_P = n_L \cdot 2d^2 + n_{\text{distill}}
$$

where $n_{\text{distill}}$ is the additional qubit overhead for magic state distillation, which is typically a substantial fraction of the total.

Magic state distillation is required because the Clifford gates ($H$, $S$, CNOT) can be implemented transversally in the surface code, but the $T$ gate cannot. Each logical $T$ gate requires a distilled $|T\rangle = (|0\rangle + e^{i\pi/4}|1\rangle)/\sqrt{2}$ magic state. The distillation factory consumes noisy $|T\rangle$ states and produces high-fidelity ones:

#### Magic State Distillation Overhead

$$
n_{\text{raw}} \approx \left(\frac{p_T}{\epsilon_T}\right)^{\log(n_T)/\log(k)}
$$

where:

- $n_{\text{raw}}$ is the number of raw (noisy) magic states consumed per distilled state
- $p_T$ is the input magic state error rate
- $\epsilon_T$ is the target magic state error rate
- $n_T$ is the total number of $T$ gates in the algorithm
- $k$ is the distillation protocol parameter (e.g., $k = 15$ for the standard 15-to-1 distillation protocol)

The following table summarizes resource estimates for several landmark quantum algorithms:

| Application | Algorithm | Problem Size | Logical Qubits | $T$-gate Count | Code Distance | Physical Qubits | Runtime |
|---|---|---|---|---|---|---|---|
| RSA-2048 factoring | Shor + lattice surgery | 2048-bit integer | $\sim 4{,}000$ | $\sim 10^{10}$ | 17--27 | $\sim 4 \times 10^6$ | $\sim 8$ hours |
| FeMo-co ground state | QPE + Trotter | 54 orbitals | $\sim 200$ | $\sim 10^{12}$ | 17--31 | $\sim 4 \times 10^6$ | $\sim$ days |
| 100-bit Grover search | Grover + surface code | $N = 2^{100}$ | $\sim 200$ | $\sim 2^{50}$ | 21 | $\sim 10^5$ | $\sim$ millennia |
| Li$_2$O catalyst | VQE (fault-tolerant) | 30 orbitals | $\sim 100$ | $\sim 10^{8}$ | 13--17 | $\sim 10^5$ | $\sim$ hours |

These estimates reveal a sobering reality: even algorithms with proven exponential speedups (Shor, QPE for chemistry) require millions of physical qubits for practical problem sizes. The current state of the art is $\sim 10^2$--$10^3$ physical qubits with error rates $\sim 10^{-3}$, implying a gap of approximately three orders of magnitude in qubit count and one order of magnitude in error rate before fault-tolerant quantum computing becomes practical for the most impactful applications.

The resource estimation pipeline exposes a critical bottleneck: the $T$-gate count dominates the total resource cost. Consequently, a major area of research is $T$-gate optimization—reducing the number of $T$ gates through circuit synthesis, gate approximation (Solovay-Kitaev theorem, Ross-Selinger algorithm), and algorithmic redesign.

#### Diagram: Resource Estimation Pipeline

<iframe src="../../sims/resource-estimation-pipeline/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Fault-Tolerant Resource Estimation Calculator</summary>
Type: Interactive MicroSim
A multi-stage pipeline visualization. User selects an application (factoring, chemistry, optimization, search), specifies the problem size, and chooses a target accuracy. The tool walks through each stage of the estimation pipeline: (1) logical resource compilation showing qubit count and $T$-gate count, (2) surface code distance selection given a physical error rate slider, (3) magic state distillation factory sizing, (4) total physical qubit count and runtime. Each stage displays the intermediate results and the dominant cost contributor. A final summary compares the estimated requirements against current and projected hardware capabilities.
Implementation: p5.js with parameterized resource models based on published estimates from Azure Quantum Resource Estimator methodology.
</details>

## Post-Moore Landscape

The trajectory of classical computing has been governed for over five decades by **Moore's law**—the empirical observation that transistor density on integrated circuits doubles approximately every two years—and **Dennard scaling**—the principle that power density remains constant as transistors shrink because voltage and current scale down proportionally. Dennard scaling ended around 2006 when threshold voltage could no longer be reduced without unacceptable leakage currents, ushering in the multi-core era. Moore's law itself is approaching fundamental physical limits as feature sizes approach atomic dimensions ($\sim 2$--$3$ nm in 2025--2026).

The post-Moore landscape encompasses the diverse computational paradigms being pursued to sustain performance growth beyond the end of conventional CMOS scaling:

| Paradigm | Principle | Target Applications | Maturity |
|---|---|---|---|
| Quantum computing | Superposition and entanglement | Chemistry, optimization, cryptography | NISQ era ($10^2$--$10^3$ qubits) |
| Neuromorphic computing | Brain-inspired spiking neural networks | Pattern recognition, edge AI, robotics | Commercial (Intel Loihi, IBM TrueNorth) |
| Photonic computing | Optical matrix multiplication | Deep learning inference, signal processing | Early commercial (Lightmatter, Luminous) |
| In-memory computing | Computation within memory arrays | Matrix operations, search, inference | Prototype (memristive crossbars) |
| Approximate computing | Trading accuracy for efficiency | Machine learning, signal processing, multimedia | Integrated in some ASICs |
| Stochastic computing | Probabilistic bit streams | Edge inference, Bayesian networks, low-power | Research / niche deployment |
| Reversible computing | Logically reversible operations | Energy-limited computing, cryogenic logic | Research |
| Superconducting classical | Rapid single-flux-quantum (RSFQ) logic | High-speed digital, cryogenic co-processing | Research / niche (NSA, IARPA) |

### Scaling Limits and the End of Dennard Scaling

The fundamental energy limit for a binary switching event is set by the Landauer bound (Chapter 6):

#### Landauer Bound

$$
E_{\text{min}} = k_B T \ln 2
$$

where:

- $k_B$ is Boltzmann's constant
- $T$ is the operating temperature
- At $T = 300$ K: $E_{\text{min}} \approx 2.85 \times 10^{-21}$ J $\approx 0.018$ eV
- Current CMOS switching energy is $\sim 10^{-15}$ J, approximately $10^6$ times the Landauer limit

The gap between current switching energies and the Landauer limit suggests that enormous room for improvement remains in principle, but practical devices face constraints from noise margins, interconnect energy, and clock distribution that prevent approaching the thermodynamic limit.

The evolution of computing performance can be captured by three key metrics:

- **Single-thread performance**: Stagnant since $\sim$2010 due to the end of Dennard scaling and the "power wall"
- **Throughput (FLOPS/watt)**: Improving through specialization (GPUs, TPUs, FPGAs) but at diminishing rates
- **Application-specific efficiency**: Domain-specific architectures (DSAs) achieve orders-of-magnitude improvements for targeted workloads

### Heterogeneous and Domain-Specific Architectures

The post-Moore era is characterized by a shift from general-purpose scaling to **heterogeneous architectures** that combine multiple specialized processing elements:

- **CPUs** for control flow and serial computation
- **GPUs** for massively parallel floating-point workloads
- **TPUs/NPUs** for tensor operations in deep learning
- **FPGAs** for reconfigurable hardware acceleration
- **Quantum processing units (QPUs)** for specific quantum-amenable subroutines
- **Neuromorphic processors** for event-driven, low-power inference

This heterogeneous model implies that quantum computing will not *replace* classical computing but rather serve as a **co-processor** for specific problem classes where quantum algorithms provide provable or empirical speedups. The hybrid classical-quantum computing model (explored in Chapter 14) is therefore the most realistic near-term deployment scenario.

### Computing Paradigm Comparison

To place quantum computing in the broader context, we compare the key paradigms across several dimensions:

#### Diagram: Post-Moore Computing Landscape

<iframe src="../../sims/post-moore-landscape/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Post-Moore Computing Paradigm Comparison</summary>
Type: Interactive MicroSim
A multi-axis radar chart comparing eight computing paradigms (classical CMOS, quantum, neuromorphic, photonic, in-memory, approximate, stochastic, reversible) across six dimensions: computational throughput, energy efficiency, programmability, maturity, scalability, and application breadth. User can select any subset of paradigms for comparison and toggle between current performance and projected 2030 performance. A companion panel shows the estimated timeline to practical deployment for each paradigm.
Implementation: D3.js radar chart with interactive paradigm selection and projection toggles.
</details>

### The Road Ahead

The future of computing is not a single exponential trajectory but a branching tree of specialized paradigms, each optimized for different computational niches. Several convergent trends will shape this landscape over the coming decade:

1. **Error correction breakthrough**: Achieving logical error rates below $10^{-10}$ with surface codes or alternative codes (e.g., quantum LDPC codes, color codes) will unlock fault-tolerant quantum computing for chemistry, materials science, and cryptography
2. **Hybrid quantum-classical workflows**: Variational algorithms, quantum error mitigation, and quantum-inspired classical algorithms will form a continuum of approaches, blurring the boundary between quantum and classical
3. **Quantum networking**: Distributed quantum computing via quantum interconnects and quantum internet protocols will enable modular architectures that circumvent single-chip qubit count limitations
4. **Cryogenic classical computing**: Co-locating classical control electronics with quantum processors at millikelvin temperatures using superconducting RSFQ logic or cryo-CMOS will reduce the I/O bottleneck that currently limits scaling
5. **Application discovery**: The identification of new quantum algorithms with practical advantages—beyond the canonical examples of factoring, search, and simulation—remains the most important open question in the field

The ultimate impact of quantum computing on the post-Moore landscape will be determined not by theoretical speedups alone but by the engineering reality of building, programming, and maintaining large-scale quantum systems. The path from quantum supremacy to quantum advantage to quantum utility is neither straight nor guaranteed, but the intellectual and technological foundations laid in this course provide the tools to navigate it.

## Summary of Key Results

The following list recapitulates the principal results developed in this chapter:

1. **Random circuit sampling**: $p(\mathbf{x}) = |\langle\mathbf{x}|U|0^n\rangle|^2$ defines the output distribution whose classical intractability underlies quantum supremacy claims
2. **Linear XEB**: $\mathcal{F}_{\text{XEB}} = 2^n\langle p(\mathbf{x})\rangle_{\text{samples}} - 1$ provides a scalable metric for verifying quantum circuit fidelity against ideal predictions
3. **Porter-Thomas distribution**: $\Pr[p = p'] = 2^n e^{-2^n p'}$ characterizes the output statistics of random quantum circuits
4. **Quantum volume**: $\log_2 V_Q = \max_m\{m \mid \Pr[\mathcal{F}_{\text{HO}}(m) > 2/3] > 2/3\}$ provides a holistic, platform-independent benchmark
5. **Surface code logical error rate**: $p_L(d) \approx A(p/p_{\text{th}})^{\lfloor d/2\rfloor + 1}$ governs the code distance selection in fault-tolerant resource estimation
6. **Surface code qubit overhead**: $n_P = 2d^2$ physical qubits per logical qubit, with magic state distillation dominating the total cost
7. **Landauer bound**: $E_{\text{min}} = k_BT\ln 2$ sets the thermodynamic floor for irreversible computation, with current technology $\sim 10^6\times$ above this limit

## References

1. Preskill, J. "Quantum computing in the NISQ era and beyond." *Quantum* 2, 79 (2018).
2. Arute, F., et al. "Quantum supremacy using a programmable superconducting processor." *Nature* 574, 505--510 (2019).
3. Zhong, H.-S., et al. "Quantum computational advantage using photons." *Science* 370, 1460--1463 (2020).
4. Cross, A.W., et al. "Validating quantum computers using randomized model circuits." *Physical Review A* 100, 032328 (2019).
5. Bishop, L.S., et al. "Quantum volume." *Technical Report*, IBM (2017).
6. Gidney, C. and Ekera, M. "How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits." *Quantum* 5, 433 (2021).
7. Lee, J., et al. "Even more efficient quantum computations of chemistry through tensor hypercontraction." *PRX Quantum* 2, 030305 (2021).
8. Kim, Y., et al. "Evidence for the utility of quantum computing before fault tolerance." *Nature* 618, 500--505 (2023).
9. Acharya, R., et al. "Quantum error correction below the surface code threshold." *Nature* 638, 920--926 (2025).
10. Shalf, J. "The future of computing beyond Moore's law." *Philosophical Transactions of the Royal Society A* 378, 20190061 (2020).
