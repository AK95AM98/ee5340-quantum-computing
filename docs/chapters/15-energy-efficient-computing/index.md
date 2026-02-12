---
title: Energy-Efficient Computing Paradigms
description: Neuromorphic, approximate, in-memory, and thermodynamic computing paradigms with energy-delay analysis
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Energy-Efficient Computing Paradigms

## Summary

This chapter surveys alternative computing paradigms focused on energy efficiency beyond traditional CMOS and quantum approaches. Topics include neuromorphic computing with spiking neural networks, approximate computing with formal error analysis, in-memory and compute-near-memory architectures, thermodynamic computing, analog neural accelerators, and quantitative energy-delay product comparisons.

## Concepts Covered

This chapter covers the following 8 concepts:

1. Neuromorphic Computing
2. Spiking Neural Networks
3. Approximate Computing
4. In-Memory Computing
5. Thermodynamic Computing
6. Compute-Near-Memory
7. Analog Neural Accelerator
8. Energy-Delay Product

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Physical Limits of Computing](../02-physical-limits/index.md)
- [Chapter 4: Classical Computing Fundamentals](../04-classical-computing/index.md)
- [Chapter 5: Beyond-CMOS Devices](../05-beyond-cmos-devices/index.md)

---

## Introduction

In Chapter 2, we established fundamental thermodynamic bounds on computation, culminating in Landauer's principle and the power density wall that has stalled Dennard scaling since approximately 2006. Chapter 4 formalized the von Neumann architecture and its inherent memory-processor bottleneck, while Chapter 5 surveyed device-level alternatives to CMOS transistors. This chapter ascends from device physics to system-level architecture, asking a different question: rather than replacing the transistor, can we restructure the *paradigm* of computation itself to achieve orders-of-magnitude improvement in energy efficiency?

The answer, explored across eight concepts, is a qualified yes. Nature provides compelling existence proofs: the human brain executes sophisticated pattern recognition at roughly 20 watts, while a GPU performing comparable image classification tasks may consume 300 watts or more. This three-order-of-magnitude gap motivates neuromorphic and analog approaches that emulate biological information processing. Meanwhile, the observation that many practical workloads tolerate bounded errors motivates approximate computing, and the recognition that data movement dominates energy budgets in modern systems motivates in-memory and compute-near-memory architectures.

We develop each paradigm with mathematical rigor, derive the governing equations, and conclude with the energy-delay product as a unified figure of merit for quantitative comparison across paradigms.

## Neuromorphic Computing

**Neuromorphic computing** is a computing paradigm that draws architectural inspiration from the structure and function of biological neural systems, organizing computation around large populations of simple processing elements (artificial neurons) connected by adaptive weighted links (artificial synapses). The term was coined by Carver Mead in 1990, who observed that analog VLSI circuits operating in the subthreshold regime could emulate neural dynamics with extraordinary energy efficiency.

The fundamental departure from von Neumann architecture is threefold:

- **Collocated memory and computation:** Synaptic weights are stored at the point of computation (the synapse), eliminating the memory bus bottleneck
- **Massive parallelism:** Millions of neurons compute simultaneously, trading clock speed for throughput
- **Event-driven operation:** Neurons consume power only when they fire (spike), yielding workload-dependent energy consumption

| Property | Von Neumann | Neuromorphic |
|----------|-------------|--------------|
| Memory model | Separate (DRAM/SRAM) | Distributed (synaptic) |
| Data flow | Sequential fetch-execute | Parallel, event-driven |
| Precision | 64-bit floating point | Low precision (1-8 bit) |
| Clock | Synchronous (GHz) | Asynchronous (spike-based) |
| Power scaling | Static + dynamic | Primarily activity-dependent |
| Fault tolerance | Low (single bit flip = error) | High (graceful degradation) |

The energy advantage of neuromorphic systems arises fundamentally from two sources. First, the elimination of data movement between memory and processor removes what has become the dominant energy cost in conventional computing: in a modern processor, a 64-bit DRAM access costs approximately 20 nJ, while a 64-bit floating-point multiply costs roughly 4 pJ—a ratio of 5000:1. Second, event-driven computation means that the vast majority of neurons in any given inference step remain quiescent and draw no dynamic power.

Major neuromorphic hardware platforms include Intel's Loihi 2 (128 cores, 1 million neurons, 120 million synapses), IBM's TrueNorth (4096 cores, 1 million neurons, 256 million synapses), and SpiNNaker 2 (ARM-based digital neuromorphic system from the University of Manchester). These systems demonstrate power consumption on the order of milliwatts to watts for tasks that consume tens to hundreds of watts on conventional hardware.

## Spiking Neural Networks

**Spiking neural networks** (SNNs) are the computational model that underpins neuromorphic hardware. Unlike artificial neural networks (ANNs) that communicate continuous-valued activations, SNNs transmit information through discrete temporal events called **spikes**. The timing and frequency of spikes encode information, introducing time as a fundamental computational variable.

The dynamics of a single spiking neuron are governed by the **leaky integrate-and-fire** (LIF) model, the most widely used abstraction that balances biological fidelity with computational tractability.

#### Leaky Integrate-and-Fire Membrane Equation

$$\tau_m \frac{dV(t)}{dt} = -[V(t) - V_{\text{rest}}] + R_m I(t)$$

where:

- $V(t)$ is the membrane potential at time $t$
- $V_{\text{rest}}$ is the resting membrane potential (typically $-70$ mV)
- $\tau_m = R_m C_m$ is the membrane time constant (typically 10-30 ms)
- $R_m$ is the membrane resistance
- $C_m$ is the membrane capacitance
- $I(t)$ is the total input current (synaptic plus external)

When the membrane potential reaches the threshold $V_{\text{th}}$, the neuron emits a spike and resets:

$$V(t) \geq V_{\text{th}} \implies \text{spike at time } t, \quad V(t^+) = V_{\text{reset}}$$

The input current $I(t)$ aggregates contributions from presynaptic neurons:

#### Synaptic Current Summation

$$I(t) = \sum_{j} w_j \sum_{k} \alpha(t - t_j^{(k)})$$

where:

- $w_j$ is the synaptic weight from presynaptic neuron $j$
- $t_j^{(k)}$ is the time of the $k$-th spike from neuron $j$
- $\alpha(t)$ is the postsynaptic current kernel (e.g., $\alpha(t) = \frac{t}{\tau_s}e^{-t/\tau_s}\Theta(t)$ for alpha synapses)
- $\Theta(t)$ is the Heaviside step function

Learning in SNNs typically employs **spike-timing-dependent plasticity** (STDP), a biologically observed learning rule in which the synaptic weight change depends on the relative timing of pre- and post-synaptic spikes:

#### STDP Learning Rule

$$\Delta w = \begin{cases} A_+ \exp\left(-\frac{\Delta t}{\tau_+}\right) & \text{if } \Delta t > 0 \text{ (pre before post: potentiation)} \\ -A_- \exp\left(\frac{\Delta t}{\tau_-}\right) & \text{if } \Delta t < 0 \text{ (post before pre: depression)} \end{cases}$$

where:

- $\Delta t = t_{\text{post}} - t_{\text{pre}}$ is the spike timing difference
- $A_+, A_-$ are the maximum weight change amplitudes
- $\tau_+, \tau_-$ are the time constants for potentiation and depression (typically 10-20 ms)

The energy per synaptic operation in a neuromorphic SNN implementation is on the order of femtojoules (approximately $1$-$10$ fJ per synaptic event on Loihi 2), compared to picojoules for a multiply-accumulate operation on a digital accelerator. This three-order-of-magnitude advantage compounds across the billions of synaptic operations in a typical inference pass.

#### Diagram: Spiking Neural Network Simulator
<iframe src="../../sims/spiking-neural-network/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Spiking Neural Network Simulator</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: simulate, demonstrate

Learning Objective: Students can simulate a small spiking neural network using the LIF model, observing how membrane potential integrates incoming spikes, crosses threshold to produce output spikes, and how STDP modifies synaptic weights over time.

Instructional Rationale: A parameter exploration is appropriate for an Apply-level objective because students must manipulate synaptic weights, input spike rates, and membrane parameters to observe emergent spiking behavior. Direct manipulation of the LIF dynamics builds intuition for how temporal coding and event-driven processing differ from rate-based ANNs.

Visual elements:
- A network diagram showing 4 input neurons connected to 1 output LIF neuron
- Real-time raster plot showing input and output spike trains
- Membrane potential trace $V(t)$ for the output neuron with threshold line
- Synaptic weight bar chart showing current values of $w_1, w_2, w_3, w_4$
- STDP weight change visualization when learning is enabled

Interactive controls:
- Sliders: Input spike rates for each of the 4 input neurons (0-100 Hz)
- Sliders: Synaptic weights $w_1$ through $w_4$ (range $-1$ to $1$)
- Slider: Membrane time constant $\tau_m$ (5-50 ms)
- Slider: Threshold $V_{\text{th}}$ (adjustable)
- Toggle: Enable/disable STDP learning
- Button: Reset simulation
- Button: Pause/Resume

Behavior:
- Input neurons generate Poisson spike trains at specified rates
- Membrane potential integrates according to LIF equation with Euler method
- When $V \geq V_{\text{th}}$, output spike appears on raster plot and $V$ resets
- With STDP enabled, weights update based on pre-post spike timing differences
- Raster plot scrolls horizontally showing recent 2 seconds of activity

Canvas layout:
- Top (25%): Network diagram with labeled weights
- Middle (50%): Raster plot (top half) and membrane potential trace (bottom half)
- Bottom (25%): Controls panel and weight bar chart

Implementation: p5.js. Responsive design adapts to window resize events.
</details>

## Approximate Computing

**Approximate computing** is a paradigm that systematically trades computational accuracy for reductions in energy, latency, or area by exploiting the intrinsic error tolerance of many application domains. Image processing, machine learning, signal processing, and data analytics all exhibit significant tolerance to bounded computational errors, making them candidates for approximation at every level of the system stack: from transistor-level voltage scaling to algorithmic-level precision reduction.

The theoretical foundation rests on bounding the error introduced by approximation. Consider an exact function $f: \mathcal{X} \to \mathcal{Y}$ and its approximate counterpart $\tilde{f}: \mathcal{X} \to \mathcal{Y}$. We define the approximation quality through a distance metric on the output space.

#### Approximation Error Bound

$$\epsilon = \sup_{x \in \mathcal{X}} d(\tilde{f}(x), f(x))$$

where:

- $\epsilon$ is the worst-case approximation error
- $d(\cdot, \cdot)$ is a suitable distance metric (e.g., absolute error, relative error, or application-specific quality metric)
- $\mathcal{X}$ is the input domain
- $f$ is the exact computation, $\tilde{f}$ is the approximate computation

In practice, we more often work with probabilistic error bounds:

#### Probabilistic Approximation Guarantee

$$\Pr[d(\tilde{f}(X), f(X)) > \delta] \leq \eta$$

where:

- $X$ is a random variable drawn from the input distribution
- $\delta$ is the error tolerance threshold
- $\eta$ is the acceptable probability of exceeding the tolerance

The key engineering insight is that energy savings scale superlinearly with reduced precision. For a digital multiplier operating on $n$-bit operands, both the energy and area scale as:

#### Multiplier Energy Scaling

$$E_{\text{mult}} \propto n^2, \qquad A_{\text{mult}} \propto n^2$$

where:

- $n$ is the operand bit width
- The quadratic scaling arises from the partial-product array structure

Reducing precision from 32-bit floating point to 8-bit integer (a common technique in neural network inference) therefore yields an approximate $16\times$ reduction in multiply energy. Further reduction to binary or ternary weights achieves even more dramatic savings.

Approximate computing techniques span multiple abstraction layers:

- **Circuit level:** Voltage overscaling (operating below $V_{\text{dd,min}}$), approximate adders (truncated carry chains), approximate multipliers (partial product truncation)
- **Architecture level:** Load value prediction, approximate caches (allowing occasional bit flips), significance-based storage
- **Algorithm level:** Loop perforation (skipping loop iterations), memoization with approximate matching, reduced-precision arithmetic
- **Application level:** Quality-configurable outputs, progressive computation, early termination

| Technique | Abstraction Layer | Typical Energy Savings | Error Characteristics |
|-----------|------------------|----------------------|----------------------|
| Voltage overscaling | Circuit | 2-10$\times$ | Random bit errors, increasing with voltage reduction |
| Approximate adder | Circuit | 2-5$\times$ | Bounded carry-chain error |
| Precision reduction (FP32 to INT8) | Architecture | 10-20$\times$ | Quantization noise |
| Loop perforation | Algorithm | 2-5$\times$ | Sampling error, depends on loop body |
| Early termination | Application | 2-50$\times$ | Convergence-dependent |

#### Diagram: Approximate Computing Error-Energy Tradeoff
<iframe src="../../sims/approximate-computing-tradeoff/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Approximate Computing Error-Energy Tradeoff</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, examine

Learning Objective: Students can examine the tradeoff between approximation level and output quality for different computational tasks, comparing energy savings against error metrics to identify optimal operating points on the Pareto frontier.

Instructional Rationale: A parameter exploration with linked error and energy displays is appropriate for an Analyze-level objective because students must deconstruct the relationship between precision, energy, and output quality. Comparing multiple approximation techniques on the same task builds understanding of when and why approximate computing is advantageous.

Visual elements:
- A Pareto frontier plot with energy (x-axis) vs. output quality (y-axis)
- Side-by-side display of exact and approximate computation outputs (e.g., image filtering)
- Error histogram showing distribution of per-element errors
- Energy breakdown bar chart showing contribution of each operation type

Interactive controls:
- Dropdown: Select task (image blur, matrix multiplication, sorting)
- Slider: Bit precision (2 to 32 bits)
- Slider: Loop perforation rate (0% to 90% of iterations skipped)
- Toggle: Approximate vs exact adder
- Button: Reset to exact computation

Behavior:
- Adjusting precision slider reduces bit width of internal computations
- Output image/result updates in real time showing approximation artifacts
- Error histogram shifts right (more error) as approximation increases
- Energy estimate decreases as approximation increases
- Pareto frontier highlights current operating point

Canvas layout:
- Left (50%): Side-by-side exact/approximate output display
- Right top (25%): Pareto frontier plot with current operating point
- Right bottom (25%): Error histogram and energy breakdown

Implementation: p5.js. Responsive design adapts to window resize events.
</details>

## In-Memory Computing

**In-memory computing** (IMC) eliminates the von Neumann bottleneck by performing computation directly within the memory array, avoiding the energy and latency costs of transferring data between memory and processor. In a conventional system, data movement accounts for 60-90% of total energy consumption for data-intensive workloads; in-memory computing attacks this dominant cost directly.

The fundamental operation in IMC is the **multiply-accumulate** (MAC) performed in the analog domain within a crossbar array. Consider a resistive crossbar with input voltages applied to the rows and conductances $G_{ij}$ programmed at each crosspoint (representing synaptic weights or matrix elements). By Kirchhoff's current law, the current collected at column $j$ is:

#### Crossbar MAC Operation

$$I_j = \sum_{i=1}^{N} V_i \cdot G_{ij}$$

where:

- $V_i$ is the voltage applied to row $i$ (representing input $x_i$)
- $G_{ij}$ is the conductance at crosspoint $(i,j)$ (representing weight $w_{ij}$)
- $I_j$ is the output current at column $j$ (representing the MAC result $y_j = \sum_i x_i w_{ij}$)
- $N$ is the number of rows

This analog computation executes a full matrix-vector multiplication $\mathbf{y} = \mathbf{W}\mathbf{x}$ in a single step ($O(1)$ time complexity), with energy determined by the $I^2R$ dissipation in the crossbar rather than by the number of digital operations. The crossbar implements:

#### Matrix-Vector Multiplication

$$\mathbf{I} = \mathbf{G} \cdot \mathbf{V} \quad \Longleftrightarrow \quad \mathbf{y} = \mathbf{W} \cdot \mathbf{x}$$

where:

- $\mathbf{G}$ is the $N \times M$ conductance matrix
- $\mathbf{V}$ is the $N$-dimensional input voltage vector
- $\mathbf{I}$ is the $M$-dimensional output current vector

The devices used to implement programmable conductances include resistive RAM (ReRAM/memristors), phase-change memory (PCM), spin-transfer torque magnetic RAM (STT-MRAM), and ferroelectric FETs. Each technology offers different tradeoffs in precision, endurance, speed, and energy:

| Device Technology | Conductance Levels | Write Energy | Read Latency | Endurance (Cycles) |
|------------------|-------------------|-------------|-------------|-------------------|
| ReRAM (HfO$_x$) | 4-64 | 0.1-1 pJ | 1-10 ns | $10^6$-$10^{12}$ |
| PCM (GST) | 16-256 | 1-10 pJ | 10-100 ns | $10^8$-$10^{12}$ |
| STT-MRAM | 2 | 0.01-0.1 pJ | 1-10 ns | $>10^{15}$ |
| FeRAM/FeFET | 4-16 | 0.01-1 pJ | 1-10 ns | $10^{10}$-$10^{14}$ |

The energy advantage of analog crossbar computation over digital MAC can be quantified. A digital 8-bit MAC requires approximately 2 pJ (for the multiplication) plus 0.5 pJ (for the accumulation), while an analog crossbar MAC in a ReRAM array consumes approximately 0.01-0.1 pJ per element, yielding a 10-100$\times$ improvement. However, this advantage is partially offset by the energy cost of analog-to-digital and digital-to-analog conversion (ADC/DAC) at the periphery of the array, which can dominate for high-precision computations.

The fundamental precision limitation of analog IMC arises from device variability and noise. The effective number of bits (ENOB) achievable in a crossbar computation is bounded by:

#### Analog Precision Bound

$$\text{ENOB} \leq \frac{1}{2}\log_2\left(\frac{P_{\text{signal}}}{P_{\text{noise}} + P_{\text{variation}}}\right)$$

where:

- $P_{\text{signal}}$ is the signal power (proportional to the squared mean conductance times input voltage)
- $P_{\text{noise}}$ is the thermal and shot noise power
- $P_{\text{variation}}$ is the power contribution from device-to-device conductance variation

Typical crossbar arrays achieve 4-8 ENOB, sufficient for neural network inference but inadequate for scientific computing applications requiring double-precision accuracy.

## Thermodynamic Computing

**Thermodynamic computing** represents a paradigm that harnesses thermal fluctuations—ordinarily viewed as noise to be suppressed—as a computational resource. Rather than fighting thermodynamic noise with deterministic digital circuits operating far from thermal equilibrium, thermodynamic computing operates at or near thermal equilibrium, using the natural stochastic dynamics of physical systems to perform useful computation such as sampling, optimization, and probabilistic inference.

The theoretical foundation connects directly to Landauer's principle from Chapter 2. Recall that erasing one bit of information dissipates at least $k_B T \ln 2$ of energy. Thermodynamic computing approaches this bound by designing computations that minimize information erasure and exploit reversible thermodynamic processes.

The central object in thermodynamic computing is the **Boltzmann machine**, a stochastic recurrent network whose equilibrium distribution is the Boltzmann distribution:

#### Boltzmann Distribution

$$P(\mathbf{s}) = \frac{1}{Z}\exp\left(-\frac{E(\mathbf{s})}{k_B T}\right)$$

where:

- $\mathbf{s} = (s_1, s_2, \ldots, s_n)$ is a binary state configuration with $s_i \in \{0, 1\}$
- $E(\mathbf{s}) = -\sum_{i<j} w_{ij}s_i s_j - \sum_i b_i s_i$ is the energy function defined by weights $w_{ij}$ and biases $b_i$
- $Z = \sum_{\mathbf{s}} \exp(-E(\mathbf{s})/k_B T)$ is the partition function
- $k_B T$ is the thermal energy scale

A physical implementation maps the Boltzmann machine onto a network of coupled stochastic elements (e.g., nanomagnets, Josephson junctions, or resistive devices) whose thermal fluctuations naturally sample from the Boltzmann distribution. The key insight is that thermal noise, which digital circuits spend enormous energy suppressing, becomes the engine of computation.

The energy cost per sample in a thermodynamic computer scales fundamentally differently from a digital sampler:

#### Thermodynamic Sampling Energy

$$E_{\text{sample}} \sim n \cdot k_B T \ln 2$$

where:

- $n$ is the number of binary variables
- $k_B T \ln 2 \approx 0.018$ eV $\approx 2.9 \times 10^{-21}$ J at room temperature

Compare this with the energy cost of generating $n$ pseudorandom bits on a digital processor, which requires $n$ multiplications at approximately 1 pJ each—a ratio of approximately $10^9$ per bit. While practical thermodynamic computers do not yet achieve the Landauer bound, they can in principle operate within 10-100$\times$ of it, still yielding enormous advantages for sampling-intensive workloads.

Applications of thermodynamic computing include:

- **Combinatorial optimization:** Sampling from low-energy states of an Ising Hamiltonian to solve NP-hard problems (analogous to quantum annealing but using classical thermal fluctuations)
- **Probabilistic inference:** Performing Bayesian inference by sampling from posterior distributions encoded in the Boltzmann weights
- **Generative modeling:** Training and sampling from Boltzmann machines for machine learning applications
- **Monte Carlo simulation:** Accelerating Markov chain Monte Carlo methods through physical thermal dynamics

#### Diagram: Thermodynamic Computing Energy Landscape
<iframe src="../../sims/thermodynamic-computing-landscape/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Thermodynamic Computing Energy Landscape</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: examine, relate

Learning Objective: Students can examine how a thermodynamic computer explores an energy landscape through thermal fluctuations, relating the temperature parameter to the tradeoff between exploration (escaping local minima) and exploitation (settling into low-energy states).

Instructional Rationale: An energy landscape visualization with temperature control is appropriate for an Analyze-level objective because students must relate the abstract Boltzmann distribution to the physical dynamics of state exploration. Observing how temperature controls the exploration-exploitation tradeoff builds intuition for simulated annealing and thermodynamic optimization.

Visual elements:
- A 2D energy landscape (height map) with multiple local minima and one global minimum
- An animated particle representing the current state, moving stochastically across the landscape
- A histogram showing visited states accumulating over time, converging to the Boltzmann distribution
- Temperature gauge showing current $k_B T$ value
- Energy trace plot showing $E(\mathbf{s})$ vs. time step

Interactive controls:
- Slider: Temperature $T$ (0.01 to 10, in units of $E_{\text{barrier}}/k_B$)
- Dropdown: Energy landscape shape (double well, rugged, funnel)
- Button: Run 1000 steps
- Button: Run simulated annealing schedule
- Button: Reset histogram and trajectory

Behavior:
- At low $T$: particle trapped in nearest local minimum, histogram concentrated
- At high $T$: particle explores uniformly, histogram flat
- At intermediate $T$: particle samples preferentially from low-energy regions
- Annealing schedule gradually reduces $T$, guiding particle toward global minimum
- Histogram converges to $P(\mathbf{s}) \propto \exp(-E/k_B T)$

Canvas layout:
- Left (50%): 2D energy landscape with animated particle trajectory
- Right top (25%): State histogram vs. Boltzmann prediction
- Right bottom (25%): Energy trace and temperature controls

Implementation: p5.js. Responsive design adapts to window resize events.
</details>

## Compute-Near-Memory

**Compute-near-memory** (CNM) architectures represent a less radical but more immediately deployable alternative to in-memory computing. Rather than performing computation inside the memory array itself, CNM places processing elements in close physical proximity to memory—typically at the memory controller, on the logic die of a 3D-stacked memory, or at the bank level within a DRAM chip. This approach preserves digital precision while dramatically reducing the distance (and hence the energy) of data movement.

The energy cost of data movement in a conventional system follows a well-established hierarchy:

| Data Movement | Distance | Energy per 64-bit Word |
|--------------|----------|----------------------|
| Register file access | ~0.1 mm | ~1 pJ |
| L1 cache access | ~1 mm | ~5 pJ |
| L2 cache access | ~5 mm | ~25 pJ |
| L3 cache access | ~10 mm | ~100 pJ |
| DRAM access (on-package) | ~10 mm (vertical in 3D) | ~1-5 nJ |
| DRAM access (off-package) | ~50 mm | ~15-20 nJ |
| HBM access (3D-stacked) | ~0.1 mm (TSV) | ~3-7 pJ/bit |

The energy per bit of data movement scales approximately linearly with distance due to wire capacitance:

#### Data Movement Energy

$$E_{\text{wire}} = C_{\text{wire}} \cdot V_{\text{dd}}^2 \cdot l$$

where:

- $C_{\text{wire}}$ is the capacitance per unit length (approximately 0.2 fF/$\mu$m for modern interconnects)
- $V_{\text{dd}}$ is the supply voltage
- $l$ is the wire length

CNM architectures exploit this scaling by minimizing $l$. In a 3D-stacked memory such as Hybrid Memory Cube (HMC) or High Bandwidth Memory (HBM), through-silicon vias (TSVs) connect memory dies to a logic die with vertical distances of 10-50 $\mu$m, compared to the 10-50 mm traces on a conventional PCB. This 1000$\times$ reduction in distance translates to a comparable reduction in per-access energy for the data movement component.

The architectural design space for CNM systems spans several configurations:

- **Processing-in-memory controller (PIM-C):** Logic added to the memory controller chip, operating on data before it traverses the memory channel. Suitable for simple reductions, filtering, and address transformations.
- **Processing-near-memory on logic die (PNM-LD):** Compute cores placed on the logic die of a 3D-stacked memory. Samsung's FIMDRAM and SK Hynix's GDDR6-AiM exemplify this approach, integrating SIMD units capable of vector MAC operations directly on the DRAM buffer die.
- **Bank-level processing:** Compute logic integrated at the DRAM bank level, enabling row-buffer-width SIMD operations. UPMEM's PIM-DIMM integrates a small processor at each DRAM bank.

The effective bandwidth improvement of CNM over conventional memory access can be quantified. A standard DDR5 DIMM provides approximately 50 GB/s of bandwidth to the processor. An HBM3 stack provides approximately 800 GB/s. A bank-level PIM architecture with 16 banks each operating independently at internal row-buffer bandwidth can achieve an effective internal bandwidth of:

#### Internal CNM Bandwidth

$$B_{\text{internal}} = N_{\text{banks}} \times W_{\text{row}} \times f_{\text{bank}}$$

where:

- $N_{\text{banks}}$ is the number of independently operated memory banks
- $W_{\text{row}}$ is the row buffer width (typically 8192 bits = 1 KB)
- $f_{\text{bank}}$ is the bank activation frequency

For a typical HBM3 stack with 32 banks per channel and 16 channels, the internal bandwidth can exceed 10 TB/s—over 10$\times$ the external bandwidth—because data never leaves the memory die.

## Analog Neural Accelerator

An **analog neural accelerator** is a specialized hardware system that performs neural network inference using analog signal processing rather than digital arithmetic. By representing activations as continuous voltages or currents and weights as programmable conductances or capacitor charge levels, these accelerators exploit the physics of Ohm's law and Kirchhoff's laws to compute multiply-accumulate operations with minimal energy overhead.

The core computation in an analog neural accelerator is identical to the crossbar MAC described in the in-memory computing section, but analog accelerators typically integrate additional analog circuit blocks to implement full neural network layers:

- **Digital-to-analog converters (DACs):** Convert digital input activations to analog voltages
- **Crossbar array:** Performs the matrix-vector multiplication $\mathbf{y} = \mathbf{W}\mathbf{x}$ in a single step
- **Analog activation functions:** Implement nonlinearities (ReLU, sigmoid) using analog circuits
- **Analog-to-digital converters (ADCs):** Convert analog output currents back to digital for interlayer communication
- **Sample-and-hold circuits:** Store intermediate results for pipelined operation

The total energy per inference for a layer with $N$ inputs and $M$ outputs decomposes as:

#### Analog Inference Energy per Layer

$$E_{\text{layer}} = E_{\text{DAC}}(N) + E_{\text{crossbar}}(N, M) + E_{\text{ADC}}(M) + E_{\text{activation}}(M)$$

where:

- $E_{\text{DAC}}(N) = N \cdot E_{\text{dac,1}}$ is the energy for $N$ digital-to-analog conversions
- $E_{\text{crossbar}}(N,M) = \sum_{i,j} V_i^2 G_{ij} \cdot t_{\text{compute}}$ is the Ohmic dissipation in the array
- $E_{\text{ADC}}(M) = M \cdot E_{\text{adc,1}}$ is the energy for $M$ analog-to-digital conversions
- $E_{\text{activation}}(M)$ is the energy for $M$ activation function evaluations

A critical design challenge is that the ADC energy scales exponentially with precision:

#### ADC Energy Scaling

$$E_{\text{ADC}} \propto 2^{\text{ENOB}}$$

where:

- ENOB is the effective number of bits of the ADC

This exponential scaling means that for high-precision requirements, the ADC dominates the total energy budget, negating the advantage of analog computation. The sweet spot for analog accelerators is low-to-medium precision (4-8 bits), which suffices for most neural network inference tasks.

| Accelerator | Technology | Precision | TOPS/W | Application |
|------------|-----------|-----------|--------|-------------|
| IBM Analog AI chip | PCM crossbar | 8-bit | 10-30 | DNN inference |
| Mythic M1076 | Flash crossbar | 8-bit | 25 | Edge AI |
| Syntiant NDP200 | Analog + digital | 8-bit | 100+ | Keyword spotting |
| Rain Neuromorphics | Memristor | 4-bit | 50+ | Sparse inference |
| Digital baseline (GPU) | CMOS | FP16 | 1-5 | General DNN |

The table illustrates the 10-100$\times$ improvement in energy efficiency (measured in tera-operations per second per watt, TOPS/W) that analog accelerators achieve over conventional digital implementations for inference workloads.

#### Diagram: Analog Crossbar Array Operation
<iframe src="../../sims/analog-crossbar-array/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Analog Crossbar Array Operation</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: compute, demonstrate

Learning Objective: Students can demonstrate how an analog crossbar array computes a matrix-vector product by setting input voltages and conductance values, then observing the resulting output currents and comparing them to the exact digital result.

Instructional Rationale: A parameter exploration is appropriate for an Apply-level objective because students must set conductance weights and input voltages, compute the expected MAC result, and verify it against the analog output. Adding device noise and variation lets students observe accuracy degradation and understand practical precision limits.

Visual elements:
- A crossbar grid ($4 \times 4$) with programmable conductances shown as resistor symbols
- Input voltage indicators on rows (left side)
- Output current indicators on columns (bottom)
- Numerical displays showing exact (digital) and noisy (analog) results side by side
- Error bars showing the impact of conductance variation
- Energy meter showing estimated computation energy

Interactive controls:
- Sliders: Input voltages $V_1$ through $V_4$ (range 0 to 1V)
- Editable grid: Conductance values $G_{ij}$ (range 0 to 100 $\mu$S)
- Slider: Device variation $\sigma_G/\bar{G}$ (0% to 30%)
- Slider: Thermal noise level
- Button: Compute (performs MAC with current settings)
- Button: Randomize weights and inputs
- Dropdown: Preset matrices (identity, Hadamard, random)

Behavior:
- Output currents update in real time as inputs or conductances change
- $I_j = \sum_i V_i G_{ij}$ computed exactly and with added noise
- Error between exact and noisy results displayed as percentage
- Energy estimate computed from $E = \sum_{i,j} V_i^2 G_{ij} t_{\text{compute}}$
- Increasing variation slider shows output degradation

Canvas layout:
- Center (60%): Crossbar grid with animated current flow
- Left (20%): Input voltage sliders and labels
- Right (20%): Output current displays, error metrics, energy estimate

Implementation: p5.js. Responsive design adapts to window resize events.
</details>

## Energy-Delay Product

The **energy-delay product** (EDP) is a figure of merit that captures the fundamental tradeoff between energy consumption and computational latency, enabling quantitative comparison across computing paradigms that operate at vastly different energy and speed scales. Minimizing energy alone can always be achieved by slowing down the computation (lowering voltage), while minimizing delay alone ignores energy cost. The EDP penalizes both wasteful energy expenditure and excessive latency.

#### Energy-Delay Product Definition

$$\text{EDP} = E \times D$$

where:

- $E$ is the energy consumed per operation (joules)
- $D$ is the delay (latency) per operation (seconds)
- The units of EDP are joule-seconds (J$\cdot$s)

For CMOS circuits, the EDP has a well-known dependence on supply voltage. The dynamic energy per switching event is $E = C V_{\text{dd}}^2$, and the delay through a CMOS gate scales as:

#### CMOS Gate Delay

$$D \propto \frac{C V_{\text{dd}}}{(V_{\text{dd}} - V_{\text{th}})^\alpha}$$

where:

- $C$ is the load capacitance
- $V_{\text{dd}}$ is the supply voltage
- $V_{\text{th}}$ is the threshold voltage
- $\alpha$ is the velocity saturation parameter ($\alpha \approx 1.3$ for short-channel devices)

Combining these expressions:

#### CMOS Energy-Delay Product

$$\text{EDP}_{\text{CMOS}} \propto \frac{C^2 V_{\text{dd}}^3}{(V_{\text{dd}} - V_{\text{th}})^\alpha}$$

where:

- The minimum EDP is achieved at an optimal voltage $V_{\text{dd}}^* > V_{\text{th}}$ that balances the cubic energy increase against the delay reduction

Differentiating with respect to $V_{\text{dd}}$ and setting to zero yields the optimal operating voltage. For $\alpha = 1$ (long-channel approximation):

$$V_{\text{dd}}^* = \frac{3}{2}V_{\text{th}}$$

This result has profound implications: the EDP-optimal operating point is at a voltage only 50% above threshold, well below the typical 3-5$\times$ $V_{\text{th}}$ used in high-performance designs. Operating at the EDP-optimal point sacrifices speed for dramatic energy savings.

The generalized **energy-delay$^n$ product** $E \times D^n$ allows weighting the relative importance of energy versus delay:

- $n = 0$: Pure energy optimization (minimize $E$ regardless of speed)
- $n = 1$: Energy-delay product (balanced tradeoff)
- $n = 2$: Energy-delay-squared product, used when latency is more critical
- $n \to \infty$: Pure delay optimization (minimize $D$ regardless of energy)

We can now compare the paradigms discussed in this chapter using EDP as the common metric:

| Paradigm | Energy per Op | Delay per Op | EDP (J$\cdot$s) | Relative to CMOS |
|----------|--------------|-------------|-----------------|------------------|
| CMOS digital (FP32 MAC) | ~4 pJ | ~1 ns | $4 \times 10^{-21}$ | 1$\times$ (baseline) |
| CMOS digital (INT8 MAC) | ~0.25 pJ | ~0.5 ns | $1.25 \times 10^{-22}$ | 0.03$\times$ |
| Analog crossbar (8-bit) | ~0.05 pJ | ~10 ns | $5 \times 10^{-22}$ | 0.13$\times$ |
| Neuromorphic (SNN event) | ~0.005 pJ | ~1 $\mu$s | $5 \times 10^{-21}$ | 1.25$\times$ |
| Thermodynamic (per sample bit) | ~0.003 aJ | ~100 ns | $3 \times 10^{-28}$ | $7.5 \times 10^{-8}\times$ |
| In-memory (ReRAM MAC) | ~0.01 pJ | ~10 ns | $1 \times 10^{-22}$ | 0.025$\times$ |

!!! note "Interpreting the EDP Table"
    The thermodynamic computing entry reflects the theoretical near-Landauer-limit operation and assumes ideal conditions. Practical implementations are currently 2-4 orders of magnitude above these theoretical values. Neuromorphic systems show a higher EDP than CMOS for a single operation because their advantage lies in massive parallelism and the elimination of data movement, not per-operation efficiency.

The EDP framework reveals that no single paradigm dominates across all dimensions. The optimal choice depends on the application characteristics:

- **Latency-critical, accuracy-required:** CMOS digital remains optimal
- **Energy-critical, error-tolerant:** Approximate and analog approaches excel
- **Data-movement-dominated:** In-memory and compute-near-memory architectures provide the greatest gains
- **Sampling-intensive:** Thermodynamic computing offers asymptotic advantages
- **Event-sparse, adaptive:** Neuromorphic systems achieve the best system-level efficiency

#### Diagram: Energy-Delay Product Comparison Dashboard
<iframe src="../../sims/energy-delay-product/main.html" width="100%" height="500xp" scrolling="no"></iframe>

<details markdown="1">
<summary>Energy-Delay Product Comparison Dashboard</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: compare, assess

Learning Objective: Students can compare computing paradigms on energy-delay axes, assess which paradigm is optimal for a given set of application constraints, and evaluate the tradeoffs between per-operation efficiency and system-level advantages such as parallelism and reduced data movement.

Instructional Rationale: An interactive comparison dashboard is appropriate for an Evaluate-level objective because students must judge the relative merits of multiple paradigms under varying constraints. The ability to adjust application parameters (error tolerance, parallelism requirements, data movement fraction) and observe how the optimal paradigm shifts builds critical evaluation skills.

Visual elements:
- Log-log scatter plot with energy per operation (x-axis) and delay per operation (y-axis)
- Iso-EDP curves shown as diagonal lines on the log-log plot
- Each paradigm represented as a labeled point (or region) on the plot
- Shaded feasibility regions based on application constraints (max energy, max delay, max error)
- Bar chart comparing system-level energy for a specific workload across paradigms

Interactive controls:
- Checkboxes: Show/hide each paradigm on the plot
- Slider: Application error tolerance (0% to 50%)
- Slider: Workload data movement fraction (10% to 90%)
- Slider: Required parallelism level (1 to $10^6$ operations)
- Dropdown: Workload type (DNN inference, optimization, signal processing, scientific computing)
- Dropdown: EDP weighting $n$ (0, 1, 2) to change iso-curves

Behavior:
- Adjusting error tolerance enables/disables approximate and analog paradigms
- Increasing data movement fraction shifts the advantage toward IMC and CNM
- Changing workload type repositions the optimal paradigm
- Iso-EDP$^n$ curves rotate as $n$ changes, highlighting different regions of the design space
- Hovering over a paradigm point shows detailed specifications

Canvas layout:
- Left (65%): Log-log energy-delay scatter plot with iso-EDP curves
- Right (35%): Controls panel, workload specification, and system-level energy bar chart

Implementation: p5.js. Responsive design adapts to window resize events.
</details>

## Synthesis: The Energy-Efficient Computing Landscape

The paradigms surveyed in this chapter represent complementary approaches to the energy efficiency challenge, each exploiting a different physical or algorithmic insight. The following synthesis maps these paradigms to their foundational principles and primary application domains.

| Paradigm | Foundational Insight | Key Limitation | Best Application Domain |
|----------|---------------------|----------------|------------------------|
| Neuromorphic computing | Brain-inspired event-driven processing | Programming difficulty, limited precision | Always-on edge sensing, adaptive control |
| Spiking neural networks | Temporal spike coding replaces static activations | Training algorithms immature, accuracy gap vs. ANNs | Low-power pattern recognition |
| Approximate computing | Many workloads tolerate bounded errors | Formal error guarantees hard to derive | Image/signal processing, ML inference |
| In-memory computing | Eliminate data movement, compute where data lives | Limited precision (4-8 bits), device variability | Matrix-heavy ML inference |
| Thermodynamic computing | Harness thermal noise as computational resource | Early-stage technology, limited problem classes | Sampling, optimization, probabilistic inference |
| Compute-near-memory | Reduce data movement distance | Added design complexity, limited compute capability | Data-intensive analytics, graph processing |
| Analog neural accelerator | Physics does the multiply-accumulate for free | ADC bottleneck, noise, calibration overhead | DNN inference at the edge |
| Energy-delay product | Unified metric for energy-speed tradeoff | Does not capture accuracy or area | Architectural comparison and optimization |

The trajectory of computing architecture is moving decisively away from the one-size-fits-all von Neumann model toward heterogeneous systems that deploy the right paradigm for each computational task. A future system-on-chip may integrate a conventional CMOS core for control logic, an analog neural accelerator for inference, an in-memory computing block for matrix operations, and a thermodynamic sampling unit for probabilistic reasoning—all coordinated by a neuromorphic event-driven scheduler. The energy-delay product and its generalizations provide the quantitative framework for making these architectural allocation decisions rigorously.

## Key Takeaways

This chapter established the theoretical foundations and practical characteristics of eight energy-efficient computing paradigms:

1. **Neuromorphic computing** organizes computation around biologically inspired neurons and synapses, eliminating the memory-processor bottleneck through collocated storage and processing with event-driven activation.

2. **Spiking neural networks** encode information in spike timing, governed by the leaky integrate-and-fire equation, with learning through spike-timing-dependent plasticity achieving femtojoule-scale synaptic operations.

3. **Approximate computing** systematically trades accuracy for energy savings, with formal error bounds ensuring output quality, achieving up to 20$\times$ energy reduction through precision scaling ($E_{\text{mult}} \propto n^2$).

4. **In-memory computing** performs matrix-vector multiplication directly in resistive crossbar arrays via Ohm's law ($I_j = \sum_i V_i G_{ij}$), eliminating data movement at the cost of limited analog precision.

5. **Thermodynamic computing** exploits thermal fluctuations to sample from Boltzmann distributions at near-Landauer energy costs ($\sim n k_B T \ln 2$ per sample), offering asymptotic advantages for probabilistic workloads.

6. **Compute-near-memory** architectures reduce data movement energy by placing processing logic adjacent to memory arrays, exploiting the linear scaling of wire energy with distance ($E_{\text{wire}} \propto l$).

7. **Analog neural accelerators** implement neural network layers using analog circuits, achieving 10-100$\times$ improvement in TOPS/W over digital implementations, with the ADC energy ($\propto 2^{\text{ENOB}}$) as the critical bottleneck.

8. The **energy-delay product** $\text{EDP} = E \times D$ provides a unified figure of merit for comparing paradigms, with the CMOS-optimal operating point at $V_{\text{dd}}^* = \frac{3}{2}V_{\text{th}}$ in the long-channel limit.

??? question "Concept Check: Why does in-memory computing achieve its greatest advantage for neural network inference rather than scientific computing?"
    In-memory computing using analog crossbar arrays achieves 4-8 effective bits of precision, limited by device variability and noise. Neural network inference has been shown to tolerate this level of quantization with minimal accuracy degradation (often less than 1% accuracy loss for 8-bit inference on standard benchmarks). Scientific computing, however, typically requires 32-64 bits of floating-point precision for numerical stability. At these precision levels, the ADC energy ($\propto 2^{\text{ENOB}}$) would dominate the total computation energy, eliminating the advantage of analog MAC operations. The fundamental insight is that the energy advantage of analog computation is inversely related to the precision requirement of the workload.

??? question "Concept Check: How does the energy-delay product framework explain why different paradigms are optimal for different workloads?"
    The EDP $= E \times D$ penalizes both high energy and high latency equally. Neuromorphic systems have low per-event energy but high per-event latency (microseconds for spike propagation), yielding an EDP comparable to CMOS for single operations. However, their advantage emerges at the *system* level: event-driven processing means most of the network is quiescent most of the time, so the average system power is far below peak. Similarly, thermodynamic computing has extremely low per-bit energy (near Landauer limit) but relatively slow convergence times, making its EDP attractive only for workloads where many parallel samples are needed. The generalized $E \times D^n$ product captures application-specific emphasis: latency-critical applications (large $n$) favor CMOS, while energy-critical applications ($n = 0$) favor thermodynamic or neuromorphic approaches.
