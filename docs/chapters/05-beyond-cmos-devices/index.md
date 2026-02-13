---
title: Beyond-CMOS Devices
description: Emerging device technologies including spintronics, memristors, tunnel FETs, and negative capacitance FETs based on ferroelectric materials and Landau-Ginzburg theory
generated_by: claude skill chapter-content-generator
date: 2026-02-12
version: 0.04
---

# Beyond-CMOS Devices

## Summary

This chapter examines emerging device technologies that aim to overcome the fundamental scaling limitations of CMOS. Topics include spintronic devices with spin-transfer torque and spin-orbit coupling, memristive devices and their resistive switching models, tunnel FETs exploiting band-to-band tunneling, and negative capacitance FETs based on Landau-Ginzburg theory and ferroelectric materials.

## Concepts Covered

This chapter covers the following 10 concepts:

1. Spintronics
2. Spin Transfer Torque
3. Spin-Orbit Coupling
4. Memristor
5. Resistive Switching
6. Tunnel Field-Effect Transistor
7. Band-To-Band Tunneling
8. Negative Capacitance FET
9. Landau-Ginzburg Theory
10. Ferroelectric Materials

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Classical Computing Fundamentals](../04-classical-computing/index.md)

---

## Introduction

The preceding chapters have established that CMOS technology faces fundamental scaling barriers. As discussed in [Chapter 2](../02-physical-limits/index.md), the Boltzmann tyranny imposes a minimum subthreshold swing of $SS = (kT/q)\ln 10 \approx 60$ mV/decade at room temperature for conventional MOSFETs, which in turn sets a floor on the supply voltage and hence on dynamic power dissipation. The end of Dennard scaling, also developed in Chapter 2, means that further miniaturization no longer yields proportional reductions in power density. Meanwhile, [Chapter 4](../04-classical-computing/index.md) detailed the static power crisis: subthreshold leakage and gate oxide tunneling currents grow exponentially as gate lengths shrink below 10 nm.

These converging constraints motivate the exploration of **beyond-CMOS** device technologies---devices that encode, store, or process information using physical mechanisms fundamentally different from the charge-based switching of the MOSFET. This chapter develops the physics of four major classes of beyond-CMOS devices: (1) spintronic devices that exploit electron spin angular momentum, (2) memristive devices that store information in resistance states, (3) tunnel field-effect transistors (TFETs) that achieve sub-60 mV/decade switching via quantum-mechanical tunneling, and (4) negative capacitance FETs (NC-FETs) that amplify the gate voltage through ferroelectric instability.

For each device class, we derive the governing equations from first principles, analyze the relevant figures of merit, and compare performance against the CMOS baseline. The chapter concludes with a comprehensive comparison table that synthesizes the key trade-offs across all beyond-CMOS technologies.

## Spintronics

**Spintronics** (spin transport electronics) is a paradigm in which the intrinsic angular momentum of the electron---its **spin**---serves as the information carrier, either in place of or in addition to its charge. Whereas conventional CMOS encodes a bit in the presence or absence of charge on a capacitor, a spintronic device encodes a bit in the orientation of a magnetic moment.

### Electron Spin as Information Carrier

The electron possesses an intrinsic angular momentum $\mathbf{S}$ with quantum number $s = 1/2$. Along any chosen quantization axis (conventionally $z$), the spin projection takes only two values:

#### Spin Angular Momentum Quantization

$$
S_z = m_s \hbar, \quad m_s = \pm \frac{1}{2}
$$

where:

- $\hbar = h / (2\pi) \approx 1.055 \times 10^{-34}$ J$\cdot$s is the reduced Planck constant
- $m_s = +1/2$ is the **spin-up** state $|\!\uparrow\rangle$, and $m_s = -1/2$ is the **spin-down** state $|\!\downarrow\rangle$
- The total spin magnitude is $|\mathbf{S}| = \hbar\sqrt{s(s+1)} = \frac{\sqrt{3}}{2}\hbar$

The associated magnetic moment is:

$$
\boldsymbol{\mu}_s = -g_e \mu_B \frac{\mathbf{S}}{\hbar}
$$

where $g_e \approx 2.002$ is the electron $g$-factor and $\mu_B = e\hbar / (2m_e) \approx 9.274 \times 10^{-24}$ J/T is the Bohr magneton.

The two-state nature of electron spin provides a natural binary encoding: spin-up represents logical 1 and spin-down represents logical 0 (or vice versa). This encoding has several advantages over charge-based representations:

- **Non-volatility:** A spin state aligned with a magnetic anisotropy axis can retain its orientation indefinitely without power, unlike a CMOS SRAM cell that requires continuous bias.
- **Low switching energy:** Changing a spin orientation does not require moving large amounts of charge across a capacitor; the energy scale is set by the magnetic anisotropy barrier, which can be as low as $\sim 1$ aJ (attojoule) for nanoscale magnets.
- **Scalability:** The spin degree of freedom is intrinsic to the electron and does not diminish with device size, unlike gate capacitance which introduces parasitic effects at small scales.

### Giant Magnetoresistance and Magnetic Tunnel Junctions

The practical foundation of spintronic devices is the **magnetic tunnel junction** (MTJ), a trilayer structure consisting of two ferromagnetic layers separated by a thin insulating barrier (typically MgO, $\sim 1$--2 nm thick). The resistance of the MTJ depends on the relative orientation of the magnetizations of the two ferromagnetic layers:

- **Parallel configuration (P):** Both magnetizations aligned $\Rightarrow$ low resistance $R_P$
- **Antiparallel configuration (AP):** Magnetizations opposed $\Rightarrow$ high resistance $R_{AP}$

The **tunnel magnetoresistance** (TMR) ratio quantifies this resistance contrast:

#### Tunnel Magnetoresistance Ratio

$$
\text{TMR} = \frac{R_{AP} - R_P}{R_P} = \frac{2P_1 P_2}{1 - P_1 P_2}
$$

where:

- $R_P$ and $R_{AP}$ are the resistances in the parallel and antiparallel configurations
- $P_1$ and $P_2$ are the spin polarizations of the two ferromagnetic electrodes
- Modern CoFeB/MgO MTJs achieve TMR ratios exceeding 200% at room temperature

The MTJ is the basic storage element of **spin-transfer torque magnetic random-access memory** (STT-MRAM), where the parallel state encodes a 0 and the antiparallel state encodes a 1. Reading is accomplished by sensing the resistance; writing is accomplished by passing a spin-polarized current through the junction, as described in the next section.

## Spin Transfer Torque

**Spin transfer torque** (STT) is the mechanism by which a spin-polarized current exerts a torque on a magnetic moment, enabling electrical control of magnetization without external magnetic fields. This effect, predicted independently by Slonczewski and Berger in 1996, is the write mechanism for STT-MRAM.

### Physical Mechanism

When an electron current passes through a ferromagnetic layer (the "fixed" or "reference" layer), the transmitted electrons become spin-polarized along the magnetization direction of that layer. These spin-polarized electrons then impinge on a second ferromagnetic layer (the "free" layer). If the free layer's magnetization is not aligned with the incoming spin polarization, the transverse component of spin angular momentum is absorbed by the free layer, exerting a torque that can reorient its magnetization.

The dynamics of the free layer magnetization $\mathbf{m}$ (a unit vector) are governed by the **Landau-Lifshitz-Gilbert-Slonczewski** (LLGS) equation:

#### LLGS Equation with Spin Transfer Torque

$$
\frac{d\mathbf{m}}{dt} = -\gamma \mathbf{m} \times \mathbf{H}_{\text{eff}} + \alpha \mathbf{m} \times \frac{d\mathbf{m}}{dt} + \gamma \frac{\hbar J P}{2 e M_s t_F} \, \mathbf{m} \times (\mathbf{m} \times \hat{\mathbf{p}})
$$

where:

- $\gamma \approx 1.76 \times 10^{11}$ rad/(s$\cdot$T) is the gyromagnetic ratio
- $\mathbf{H}_{\text{eff}}$ is the effective magnetic field (including anisotropy, exchange, demagnetization, and external fields)
- $\alpha \sim 0.005$--$0.02$ is the Gilbert damping parameter
- $J$ is the current density (A/m$^2$)
- $P$ is the spin polarization of the current ($0 \leq P \leq 1$)
- $e$ is the electron charge, $M_s$ is the saturation magnetization, $t_F$ is the free layer thickness
- $\hat{\mathbf{p}}$ is the unit vector along the fixed layer magnetization (spin-polarization direction)

The first term describes the precessional motion of $\mathbf{m}$ around the effective field. The second term is the Gilbert damping, which causes $\mathbf{m}$ to spiral toward $\mathbf{H}_{\text{eff}}$. The third term is the **Slonczewski spin-transfer torque**, which acts as an anti-damping (or pro-damping) torque depending on the sign of the current.

### Critical Switching Current

For STT-induced switching of a free layer with uniaxial perpendicular magnetic anisotropy (PMA), the critical current density is obtained by balancing the spin-transfer torque against the damping torque at the instability threshold:

#### Critical Switching Current Density

$$
J_{c0} = \frac{2 e \alpha M_s t_F}{\hbar P}\left(H_k + \frac{M_s}{2}\right)
$$

where:

- $H_k = 2K_u / (\mu_0 M_s)$ is the anisotropy field
- $K_u$ is the uniaxial anisotropy energy density (J/m$^3$)
- The term $M_s/2$ accounts for the demagnetization field in the thin-film geometry
- Typical values for CoFeB/MgO devices: $J_{c0} \sim 2$--$5 \times 10^{10}$ A/m$^2$

The switching energy per bit for an STT-MRAM cell of area $A$ and switching pulse duration $t_{\text{pulse}}$ is:

$$
E_{\text{switch}} = J_c^2 \rho \, A \, t_F \, t_{\text{pulse}}
$$

where $\rho$ is the resistivity of the tunnel barrier. For a 20 nm diameter MTJ, $E_{\text{switch}} \sim 0.1$--$1$ fJ, which is competitive with SRAM write energy.

### STT-MRAM Operation

An STT-MRAM cell consists of an MTJ connected in series with an access transistor. The write and read operations proceed as follows:

- **Write 0 (P $\to$ P):** Current flows from the free layer to the fixed layer. Electrons reflected from the fixed layer carry spin angular momentum that stabilizes the parallel state.
- **Write 1 (P $\to$ AP):** Current flows from the fixed layer to the free layer. Spin-polarized electrons transmitted through the fixed layer exert anti-damping torque on the free layer, destabilizing the parallel state and driving a switch to antiparallel.
- **Read:** A small sense current (below the critical switching current) is passed through the MTJ, and the resistance is compared to a reference value midway between $R_P$ and $R_{AP}$.

| Parameter | STT-MRAM | SRAM (6T) | DRAM |
|-----------|----------|-----------|------|
| Cell size | $\sim 6$--$12 F^2$ | $\sim 120$--$150 F^2$ | $\sim 6$--$8 F^2$ |
| Read time | 2--10 ns | 0.5--1 ns | 10--50 ns |
| Write time | 2--20 ns | 0.5--1 ns | 10--50 ns |
| Endurance | $>10^{12}$ cycles | $>10^{16}$ cycles | $>10^{16}$ cycles |
| Non-volatile | Yes | No | No (refresh needed) |
| Write energy/bit | 0.1--1 fJ | $\sim 1$ fJ | $\sim 10$ fJ |

## Spin-Orbit Coupling

**Spin-orbit coupling** (SOC) is the relativistic interaction between an electron's spin and its orbital motion around an atomic nucleus (or through a crystal lattice). In the context of beyond-CMOS devices, SOC provides an alternative mechanism for generating spin currents and switching magnetic states---one that can be more efficient than STT for certain geometries.

### Spin-Orbit Interaction Hamiltonian

In an atom, the electron orbiting the nucleus at velocity $\mathbf{v}$ experiences the nuclear electric field $\mathbf{E}$. In the electron's rest frame, this electric field transforms (via special relativity) into an effective magnetic field $\mathbf{B}_{\text{eff}} = -(\mathbf{v} \times \mathbf{E})/(c^2)$, which couples to the electron spin. The resulting spin-orbit Hamiltonian is:

#### Atomic Spin-Orbit Hamiltonian

$$
\hat{H}_{SO} = \frac{1}{2m_e^2 c^2} \frac{1}{r}\frac{dV}{dr}\hat{\mathbf{L}} \cdot \hat{\mathbf{S}}
$$

where:

- $m_e$ is the electron mass, $c$ is the speed of light
- $V(r)$ is the nuclear potential, so $(1/r)(dV/dr)$ is the radial electric field
- $\hat{\mathbf{L}}$ is the orbital angular momentum operator
- $\hat{\mathbf{S}}$ is the spin angular momentum operator
- The $\hat{\mathbf{L}} \cdot \hat{\mathbf{S}}$ coupling lifts the degeneracy between states with the same $l$ but different $j = l \pm 1/2$
- The factor of $1/2$ is the Thomas precession correction

In a crystalline solid, the analogous coupling depends on the crystal symmetry and gives rise to two principal effects: the Rashba and Dresselhaus interactions.

### Rashba Effect

The **Rashba effect** arises in systems with structural inversion asymmetry---for example, at the interface between two different materials, or in a quantum well with asymmetric confinement. The Rashba Hamiltonian for a two-dimensional electron gas is:

#### Rashba Spin-Orbit Hamiltonian

$$
\hat{H}_R = \alpha_R (\hat{\boldsymbol{\sigma}} \times \mathbf{k}) \cdot \hat{z}
$$

where:

- $\alpha_R$ is the Rashba coupling parameter (units: eV$\cdot$m), typically $\alpha_R \sim 10^{-11}$--$10^{-10}$ eV$\cdot$m for heavy-metal/ferromagnet interfaces
- $\hat{\boldsymbol{\sigma}} = (\sigma_x, \sigma_y, \sigma_z)$ is the vector of Pauli spin matrices
- $\mathbf{k} = (k_x, k_y)$ is the in-plane electron wavevector
- $\hat{z}$ is the surface normal direction

The Rashba effect locks the spin orientation perpendicular to the electron momentum, creating a spin texture in momentum space where spin-up electrons travel in one direction and spin-down electrons in the other. This spin-momentum locking is the basis for **spin-orbit torque** (SOT) switching.

### Dresselhaus Effect

The **Dresselhaus effect** arises from bulk inversion asymmetry in the crystal structure (e.g., zinc-blende semiconductors like GaAs). For a two-dimensional electron gas confined along $z$, the linearized Dresselhaus Hamiltonian is:

$$
\hat{H}_D = \beta_D (k_x \sigma_x - k_y \sigma_y)
$$

where $\beta_D$ is the Dresselhaus coupling parameter. When both Rashba and Dresselhaus couplings are present, the total spin-orbit Hamiltonian is $\hat{H}_{SO} = \hat{H}_R + \hat{H}_D$, and the interplay between the two terms determines the spin relaxation length and the efficiency of spin-charge interconversion.

### Spin-Orbit Torque Switching

In a **spin-orbit torque** (SOT) device, a charge current $\mathbf{J}_c$ flowing in a heavy-metal layer (e.g., Pt, Ta, W) adjacent to a ferromagnetic free layer generates a transverse spin current via the spin Hall effect. The spin current exerts two torque components on the free layer magnetization:

#### SOT Effective Fields

$$
\boldsymbol{\tau}_{DL} = \tau_{DL} \, \mathbf{m} \times (\mathbf{m} \times \hat{\boldsymbol{\sigma}})
$$

$$
\boldsymbol{\tau}_{FL} = \tau_{FL} \, \mathbf{m} \times \hat{\boldsymbol{\sigma}}
$$

where:

- $\boldsymbol{\tau}_{DL}$ is the **damping-like** (Slonczewski-like) torque, analogous to the STT anti-damping torque
- $\boldsymbol{\tau}_{FL}$ is the **field-like** torque, equivalent to an effective magnetic field along $\hat{\boldsymbol{\sigma}}$
- $\hat{\boldsymbol{\sigma}}$ is the spin polarization direction, determined by $\hat{z} \times \hat{\mathbf{J}}_c$ for the spin Hall effect
- The torque magnitudes are proportional to the spin Hall angle $\theta_{SH} = J_s / J_c$, where $J_s$ is the spin current density

The key advantage of SOT over STT is that the write current flows **in-plane** through the heavy metal, not **through** the tunnel barrier. This decouples the read and write current paths, eliminating the reliability concern of tunnel barrier degradation during writing and enabling faster switching ($< 1$ ns demonstrated experimentally).

## Memristor

The **memristor** (memory resistor) is the fourth fundamental passive circuit element, postulated by Leon Chua in 1971 to complete the symmetry relationships among the four basic circuit variables: voltage ($v$), current ($i$), charge ($q$), and magnetic flux linkage ($\varphi$). While the resistor relates $v$ and $i$, the capacitor relates $v$ and $q$, and the inductor relates $i$ and $\varphi$, no element related $q$ and $\varphi$ until Chua's theoretical construction.

### Chua's Memristor Theory

Chua defined the memristor as a two-terminal device characterized by a constitutive relation between charge and flux linkage:

#### Memristor Constitutive Relation

$$
d\varphi = M(q) \, dq
$$

where:

- $\varphi = \int_{-\infty}^{t} v(\tau) \, d\tau$ is the magnetic flux linkage (time integral of voltage)
- $q = \int_{-\infty}^{t} i(\tau) \, d\tau$ is the electric charge (time integral of current)
- $M(q)$ is the **memristance**, with units of ohms ($\Omega$)
- The memristance $M(q)$ is a single-valued function of charge, distinguishing the memristor from an ordinary nonlinear resistor

Since $d\varphi/dt = v$ and $dq/dt = i$, the memristor obeys the instantaneous relation:

$$
v(t) = M(q(t)) \cdot i(t)
$$

This looks like Ohm's law, but with a crucial difference: the "resistance" $M(q)$ depends on the entire history of current that has flowed through the device (via the accumulated charge $q$). The memristor thus has **memory**: its present resistance encodes information about past electrical stimuli.

### Ideal Memristor Equations

For an ideal **linear drift** memristor model (the simplest physically motivated model, approximating the HP Labs TiO$_2$ device reported in 2008), the memristance varies linearly between two bounds:

#### Linear Drift Memristor Model

$$
M(w) = R_{\text{ON}} \frac{w}{D} + R_{\text{OFF}}\left(1 - \frac{w}{D}\right)
$$

where:

- $w$ is the width of the doped (conductive) region, $0 \leq w \leq D$
- $D$ is the total device thickness
- $R_{\text{ON}}$ is the resistance when the device is fully doped ($w = D$)
- $R_{\text{OFF}}$ is the resistance when the device is fully undoped ($w = 0$)
- Typically $R_{\text{OFF}} / R_{\text{ON}} \sim 10^2$--$10^3$

The state variable $w$ evolves according to the ionic drift equation:

$$
\frac{dw}{dt} = \mu_v \frac{R_{\text{ON}}}{D} i(t)
$$

where $\mu_v$ is the average ion mobility ($\sim 10^{-14}$ m$^2$/(V$\cdot$s) for oxygen vacancies in TiO$_2$). This equation encodes the fundamental memristive property: positive current expands the doped region, decreasing resistance; negative current contracts it, increasing resistance.

### Symmetry and the Fourth Element

The elegance of Chua's construction lies in its completion of the circuit-element symmetry. The six possible pairwise relationships among the four circuit variables $(v, i, q, \varphi)$ are:

| Relationship | Element | Defining Equation |
|-------------|---------|------------------|
| $v$ vs. $i$ | Resistor | $v = R \cdot i$ |
| $q$ vs. $v$ | Capacitor | $q = C \cdot v$ |
| $\varphi$ vs. $i$ | Inductor | $\varphi = L \cdot i$ |
| $\varphi$ vs. $q$ | **Memristor** | $d\varphi = M \, dq$ |
| $q$ vs. $i$ | (definition) | $dq = i \, dt$ |
| $\varphi$ vs. $v$ | (definition) | $d\varphi = v \, dt$ |

## Resistive Switching

**Resistive switching** is the physical phenomenon underlying memristive device operation: the electrically induced, reversible change of resistance in a metal-insulator-metal (MIM) structure. While Chua's memristor theory provides the mathematical framework, resistive switching describes the actual microscopic mechanisms by which resistance states are programmed in **resistive random-access memory** (RRAM) devices.

### Switching Mechanisms

Two principal mechanisms of resistive switching have been identified:

**Filamentary switching:** A nanoscale conductive filament (CF) forms and ruptures within the insulating layer. The filament typically consists of metal atoms (in conductive-bridge RAM, CBRAM) or oxygen vacancies (in valence-change memory, VCM). In the low-resistance state (LRS), the filament bridges the two electrodes; in the high-resistance state (HRS), a gap in the filament interrupts the conduction path.

**Interface switching:** The resistance change occurs uniformly across the entire electrode-insulator interface, typically driven by the redistribution of oxygen vacancies that modulates the Schottky barrier height at the metal-oxide contact. Interface switching devices tend to have more gradual, analog-like resistance transitions, making them attractive for neuromorphic computing applications.

### SET and RESET Processes

The transition between resistance states is controlled by voltage polarity and magnitude:

- **SET (HRS $\to$ LRS):** A positive voltage above the SET voltage $V_{\text{SET}}$ is applied. In filamentary devices, this drives the formation or regrowth of the conductive filament via ion migration and electrochemical redox reactions. A compliance current $I_{CC}$ is imposed to prevent permanent breakdown.
- **RESET (LRS $\to$ HRS):** A voltage of opposite polarity (for bipolar switching) or the same polarity (for unipolar switching) exceeding $V_{\text{RESET}}$ is applied. This ruptures the filament through Joule heating and ion dissolution.

The SET process can be modeled by a nucleation-and-growth framework. The filament growth rate in a VCM device follows an Arrhenius-type thermally activated ion hopping model:

#### Filament Growth Rate

$$
\frac{dg}{dt} = v_0 \exp\left(-\frac{E_a - q a_h E_{\text{ox}}}{kT}\right)
$$

where:

- $g$ is the filament gap distance (the length of the insulating gap in the filament)
- $v_0$ is the attempt frequency ($\sim 10^{12}$--$10^{13}$ Hz)
- $E_a$ is the activation energy for ion hopping ($\sim 0.5$--$1.5$ eV)
- $a_h$ is the hopping distance ($\sim 0.2$--$0.5$ nm)
- $E_{\text{ox}}$ is the electric field across the oxide
- $kT$ is the thermal energy

### I-V Characteristics

The current-voltage characteristics of a bipolar RRAM device exhibit the characteristic "pinched hysteresis loop" that is the fingerprint of memristive behavior:

1. Starting in the HRS, increasing positive voltage produces low current (Schottky or Poole-Frenkel emission through the gap region).
2. At $V = V_{\text{SET}}$, the filament completes and the current jumps to the compliance limit $I_{CC}$.
3. Sweeping back to zero, the device remains in the LRS.
4. Applying negative voltage, the current follows the LRS (low-resistance) characteristic.
5. At $V = V_{\text{RESET}}$, filament rupture occurs and the current drops as the device returns to HRS.
6. Sweeping back to zero completes the hysteresis loop.

The on/off resistance ratio is a key device metric:

$$
\frac{R_{\text{HRS}}}{R_{\text{LRS}}} \sim 10 \text{ -- } 10^3
$$

depending on the material system and filament geometry.

#### Diagram: Memristor I-V Characteristic

<iframe src="../../sims/memristor-iv-curve/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive visualization of the pinched hysteresis loop in a memristive RRAM device</summary>
Type: MicroSim
Learning objective: Understand the SET/RESET switching processes in resistive memory devices by observing the characteristic pinched hysteresis I-V curve and its dependence on device parameters. Bloom level: Analyze.
Visual elements: An I-V plot showing the voltage sweep on the horizontal axis and current on the vertical axis, with the hysteresis loop traced in real time. Color coding distinguishes the HRS branch (blue) from the LRS branch (red). A schematic cross-section of the MIM structure shows the filament forming and rupturing as the voltage sweep progresses. Annotations indicate V_SET, V_RESET, and the compliance current I_CC.
Controls: Sweep voltage amplitude slider (1--5 V), compliance current slider (10 uA -- 1 mA), R_ON/R_OFF ratio selector, sweep speed control, unipolar/bipolar mode toggle, reset button.
Behavior: As the voltage sweeps sinusoidally, the I-V trace follows the pinched hysteresis loop. The filament schematic animates in synchrony: the gap shrinks during SET and widens during RESET. Adjusting R_ON/R_OFF changes the loop shape, and changing the compliance current affects the LRS resistance.
Implementation: p5.js with real-time curve tracing and synchronized device cross-section animation.
</details>

### RRAM Device Physics Summary

| Property | Filamentary (VCM) | Filamentary (CBRAM) | Interface Type |
|----------|-------------------|---------------------|---------------|
| Switching ion | O$^{2-}$ vacancies | Metal cations (Ag$^+$, Cu$^+$) | O$^{2-}$ vacancies |
| Insulator | HfO$_x$, TaO$_x$, TiO$_x$ | SiO$_2$, GeS$_x$, Al$_2$O$_3$ | SrTiO$_3$, Pr$_{0.7}$Ca$_{0.3}$MnO$_3$ |
| Switching type | Bipolar | Bipolar | Bipolar |
| $R_{\text{HRS}}/R_{\text{LRS}}$ | $10$--$10^2$ | $10^2$--$10^6$ | $10$--$10^2$ |
| Switching speed | $< 1$ ns -- 100 ns | 1--100 ns | 10 ns -- 1 $\mu$s |
| Endurance (cycles) | $10^6$--$10^{12}$ | $10^6$--$10^{10}$ | $10^6$--$10^9$ |
| Scalability | $< 10$ nm | $< 10$ nm | $> 50$ nm |

## Tunnel Field-Effect Transistor

The **tunnel field-effect transistor** (TFET) is a gated p-i-n diode that exploits quantum-mechanical band-to-band tunneling (BTBT) to achieve subthreshold swings below the $60$ mV/decade Boltzmann limit of conventional MOSFETs. This is perhaps the most direct response to the scaling limitations discussed in [Chapter 2](../02-physical-limits/index.md) and [Chapter 4](../04-classical-computing/index.md): by replacing thermionic emission with tunneling as the switching mechanism, the TFET decouples the subthreshold slope from $kT/q$.

### Operating Principle

In a conventional MOSFET, the current in the subthreshold regime is controlled by thermionic emission of carriers over a potential barrier. The fraction of carriers with sufficient energy to surmount the barrier follows the Boltzmann distribution $\exp(-E/kT)$, which imposes the fundamental limit:

$$
SS_{\text{MOSFET}} = \frac{\partial V_{GS}}{\partial (\log_{10} I_D)} = \frac{kT}{q}\ln 10 \cdot \left(1 + \frac{C_D}{C_{ox}}\right) \geq 60 \text{ mV/dec at 300 K}
$$

A TFET circumvents this by operating in the reverse-biased p-i-n configuration. The gate voltage modulates the band alignment between the source valence band and the channel conduction band, controlling the tunneling window:

- **OFF state:** The source valence band edge lies below the channel conduction band edge. There is no energy window for tunneling, and the current is negligibly small.
- **ON state:** The gate voltage pulls the channel conduction band below the source valence band edge, opening a tunneling window $\Delta E$. Electrons tunnel from the source valence band into the channel conduction band through the energy gap.

Because the tunneling current depends on the overlap of the source and channel band edges---a sharp, step-function-like onset---the TFET can achieve:

$$
SS_{\text{TFET}} < 60 \text{ mV/dec}
$$

Theoretical predictions suggest $SS < 10$ mV/dec is achievable with optimized III-V heterojunction TFETs, though experimental demonstrations have been more modest.

### TFET Current Model

The drain current in a TFET is dominated by the BTBT current, which can be expressed in a compact form:

#### TFET Drain Current

$$
I_D = A \cdot T_{\text{WKB}} \cdot F(V_{GS}, V_{DS})
$$

where:

- $A$ is a prefactor proportional to the tunneling area and the density of states
- $T_{\text{WKB}}$ is the tunneling probability (derived in the next section via the WKB approximation)
- $F(V_{GS}, V_{DS})$ captures the voltage-dependent tunneling window and the supply of carriers

The TFET's key limitation is its low ON-state current ($I_{\text{ON}} \sim 1$--$100$ $\mu$A/$\mu$m) compared to MOSFETs ($I_{\text{ON}} \sim 1$ mA/$\mu$m), because tunneling is inherently a low-probability process. This ON-current deficit is the central challenge facing TFET technology.

## Band-To-Band Tunneling

**Band-to-band tunneling** (BTBT) is the quantum-mechanical process by which an electron tunnels from the valence band to the conduction band (or vice versa) through the forbidden energy gap of a semiconductor. It is the fundamental transport mechanism in TFETs and also governs breakdown in heavily doped p-n junctions (Zener breakdown).

### WKB Approximation

The tunneling probability through a potential barrier is calculated using the **Wentzel-Kramers-Brillouin** (WKB) approximation, one of the foundational results of semiclassical quantum mechanics. For a one-dimensional barrier $V(x)$, the tunneling probability is:

#### WKB Tunneling Probability

$$
T_{\text{WKB}} = \exp\left(-2 \int_{x_1}^{x_2} \kappa(x) \, dx\right)
$$

where:

- $x_1$ and $x_2$ are the classical turning points (where the electron energy equals the barrier potential)
- $\kappa(x) = \sqrt{2m^*(V(x) - E)}/\hbar$ is the imaginary wavevector inside the barrier
- $m^*$ is the effective mass of the tunneling carrier
- $E$ is the electron energy

The derivation proceeds from the time-independent Schrodinger equation in the classically forbidden region where $E < V(x)$:

$$
-\frac{\hbar^2}{2m^*}\frac{d^2\psi}{dx^2} + V(x)\psi = E\psi
$$

In this region, the wavefunction is evanescent: $\psi(x) \sim \exp(-\int \kappa(x) dx)$, and the transmission coefficient follows from matching boundary conditions at both turning points.

### Kane's Model for BTBT

For a uniform electric field $\mathcal{E}$ in a semiconductor with bandgap $E_g$, the triangular barrier approximation yields the celebrated result due to Kane (1961):

#### Kane's BTBT Generation Rate

$$
G_{\text{BTBT}} = A_K \frac{\mathcal{E}^2}{\sqrt{E_g}} \exp\left(-B_K \frac{E_g^{3/2}}{\mathcal{E}}\right)
$$

where:

- $G_{\text{BTBT}}$ is the band-to-band tunneling generation rate (carriers/cm$^3$/s)
- $\mathcal{E}$ is the electric field at the tunnel junction (V/cm)
- $E_g$ is the semiconductor bandgap (eV)
- $A_K$ and $B_K$ are material-dependent parameters

The parameters $A_K$ and $B_K$ are derived from the WKB integral for a triangular barrier:

$$
A_K = \frac{q^2 \sqrt{2m^*}}{4\pi^3 \hbar^2}, \quad B_K = \frac{4\sqrt{2m^*}}{3q\hbar}
$$

For silicon, $B_K \approx 1.9 \times 10^7$ V/cm $\cdot$ eV$^{-3/2}$. The exponential dependence on $E_g^{3/2}/\mathcal{E}$ reveals the critical design trade-off for TFETs:

- **Smaller bandgap** $\Rightarrow$ higher tunneling probability $\Rightarrow$ higher ON current, but also higher OFF-state leakage
- **Higher electric field** $\Rightarrow$ higher tunneling probability $\Rightarrow$ achieved by using thin body, high-$\kappa$ gate dielectrics, and abrupt doping profiles

This is why III-V semiconductors with narrow bandgaps (InAs: $E_g = 0.35$ eV, GaSb: $E_g = 0.73$ eV) are preferred over silicon ($E_g = 1.12$ eV) for high-performance TFETs.

### Tunneling Probability for Common Semiconductors

| Material | $E_g$ (eV) | $m^*/m_0$ | $B_K$ (V/cm$\cdot$eV$^{-3/2}$) | $T_{\text{WKB}}$ at $\mathcal{E} = 10^6$ V/cm |
|----------|-----------|-----------|------|------|
| Si | 1.12 | 0.26 | $1.9 \times 10^7$ | $\sim 10^{-10}$ |
| Ge | 0.66 | 0.08 | $9.5 \times 10^6$ | $\sim 10^{-3}$ |
| InAs | 0.35 | 0.023 | $3.3 \times 10^6$ | $\sim 10^{-1}$ |
| In$_{0.53}$Ga$_{0.47}$As | 0.74 | 0.041 | $7.1 \times 10^6$ | $\sim 10^{-5}$ |
| GaSb | 0.73 | 0.041 | $7.0 \times 10^6$ | $\sim 10^{-5}$ |

The table dramatically illustrates why silicon TFETs have struggled to achieve high ON currents: the tunneling probability is seven to nine orders of magnitude lower than in narrow-gap III-V materials at the same electric field.

## Negative Capacitance FET

The **negative capacitance field-effect transistor** (NC-FET) is a beyond-CMOS device that achieves sub-60 mV/decade subthreshold swing by incorporating a ferroelectric material into the gate stack. The ferroelectric layer provides an intrinsic voltage amplification mechanism that effectively reduces the gate voltage required to modulate the channel potential.

### Voltage Amplification Mechanism

In a conventional MOSFET, the channel surface potential $\psi_s$ is always less than the applied gate voltage $V_G$ due to the voltage divider formed by the gate oxide capacitance $C_{ox}$ and the semiconductor depletion/inversion capacitance $C_s$:

$$
\frac{d\psi_s}{dV_G} = \frac{C_{ox}}{C_{ox} + C_s} < 1
$$

This body factor $m = 1 + C_s/C_{ox} > 1$ is directly responsible for $SS > 60$ mV/dec in conventional FETs. The NC-FET introduces a ferroelectric layer with **negative differential capacitance** in series with the gate stack:

#### NC-FET Voltage Amplification

$$
A_V = \frac{d\psi_s}{dV_G} = \frac{1}{1 + C_s/C_{ox} + C_s/C_{FE}} = \frac{1}{1 + C_s/C_{ox} - C_s/|C_{FE}|}
$$

where:

- $C_{FE} < 0$ is the (negative) differential capacitance of the ferroelectric layer
- $|C_{FE}|$ is the magnitude of the ferroelectric capacitance
- When $|C_{FE}|$ is chosen such that $C_s/|C_{FE}| > C_s/C_{ox}$, we get $A_V > 1$---the surface potential **exceeds** the applied gate voltage
- This voltage amplification yields $SS < 60$ mV/dec without violating thermodynamics, because the ferroelectric layer provides internal energy that supplements the gate voltage

The condition for sub-thermal switching is:

$$
|C_{FE}| > C_s + C_{ox} \cdot \frac{C_s}{C_{ox}} \quad \Rightarrow \quad |C_{FE}| > C_s
$$

but stability requires $|C_{FE}| < C_{ox} + C_s$ (otherwise the total gate capacitance becomes negative and the device is unstable). The operating window is therefore:

$$
C_s < |C_{FE}| < C_{ox} + C_s
$$

### Transient vs. Steady-State Negative Capacitance

A critical distinction exists between two operational modes of ferroelectric-based NC-FETs:

**Transient NC:** The ferroelectric operates in a non-equilibrium state during switching, passing through the unstable region of the energy landscape (the negative-curvature region of the Landau free energy, discussed below). The voltage across the ferroelectric temporarily decreases as the charge increases, producing a transient negative capacitance effect. This mode is accessible in pulsed operation and has been experimentally demonstrated in ferroelectric/dielectric bilayers.

**Steady-state NC:** The ferroelectric is stabilized in the negative-curvature region by the series combination with a positive capacitance (the MOS gate stack). The total capacitance remains positive, but the internal voltage amplification is maintained in DC operation. This mode requires careful capacitance matching and is more challenging to achieve experimentally.

The distinction has significant implications for circuit design: transient NC-FETs may exhibit hysteresis and are better suited for memory applications, while steady-state NC-FETs are required for low-power logic.

## Landau-Ginzburg Theory

**Landau-Ginzburg theory** (also called Landau-Devonshire theory in the context of ferroelectrics) provides the thermodynamic framework for describing the free energy landscape of ferroelectric materials and, crucially, for understanding why and when negative capacitance can occur.

### Free Energy Landscape

The Landau free energy density of a uniaxial ferroelectric is expressed as a polynomial expansion in the order parameter---the electric polarization $P$:

#### Landau Free Energy

$$
F(P) = \frac{\alpha}{2}P^2 + \frac{\beta}{4}P^4 + \frac{\gamma}{6}P^6 - EP
$$

where:

- $P$ is the electric polarization (C/m$^2$)
- $\alpha$, $\beta$, $\gamma$ are the Landau coefficients (with $\gamma > 0$ for stability)
- $E$ is the applied electric field
- The $-EP$ term represents the coupling between the polarization and the external field

The coefficients have the following physical significance:

- $\alpha = \alpha_0 (T - T_C)$, where $\alpha_0 > 0$ and $T_C$ is the Curie temperature. Above $T_C$, $\alpha > 0$ and the free energy has a single minimum at $P = 0$ (paraelectric phase). Below $T_C$, $\alpha < 0$ and the free energy has a double-well structure with minima at $\pm P_s$ (ferroelectric phase).
- $\beta$ determines the nature of the phase transition: $\beta > 0$ yields a second-order (continuous) transition; $\beta < 0$ yields a first-order (discontinuous) transition.
- $\gamma$ is required for stability when $\beta < 0$.

### Polarization Dynamics

The equilibrium polarization is found by minimizing the free energy, $\partial F / \partial P = 0$:

#### Equation of State

$$
E = \alpha P + \beta P^3 + \gamma P^5
$$

The differential capacitance per unit area of a ferroelectric of thickness $t_{FE}$ is:

#### Ferroelectric Differential Capacitance

$$
C_{FE}^{-1} = t_{FE}\frac{d^2 F}{dP^2} = t_{FE}(\alpha + 3\beta P^2 + 5\gamma P^5)
$$

where:

- For a second-order ferroelectric ($\beta > 0$) below $T_C$ ($\alpha < 0$), the curvature $d^2F/dP^2 = \alpha + 3\beta P^2$ is **negative** near $P = 0$
- This negative curvature is the origin of the negative capacitance: $C_{FE}^{-1} < 0 \Rightarrow C_{FE} < 0$
- The negative capacitance region is inherently unstable in isolation but can be stabilized by series combination with a positive capacitance load

### Spontaneous Polarization

The spontaneous polarization $P_s$ at zero applied field is obtained from the equation of state with $E = 0$. For a second-order transition ($\beta > 0$, $\gamma$ negligible):

$$
\alpha P_s + \beta P_s^3 = 0 \quad \Rightarrow \quad P_s = \sqrt{-\alpha / \beta} = \sqrt{\alpha_0(T_C - T)/\beta}
$$

This result shows that the spontaneous polarization grows continuously from zero at $T_C$, following the classic mean-field critical exponent $P_s \propto (T_C - T)^{1/2}$.

### Landau Coefficients for Common Ferroelectrics

| Material | $\alpha_0$ (m/F) | $\beta$ (m$^5$/(F$\cdot$C$^2$)) | $T_C$ (K) | Transition Order |
|----------|---------|-------|------|------|
| BaTiO$_3$ | $6.2 \times 10^5$ | $-3.6 \times 10^8$ | 393 | First |
| PbTiO$_3$ | $7.6 \times 10^5$ | $-2.9 \times 10^8$ | 763 | First |
| HfO$_2$ (doped) | $\sim 10^7$ | $\sim -10^{10}$ | $\sim 600$--$900$ | First |
| P(VDF-TrFE) | $\sim 10^8$ | $\sim -10^{10}$ | $\sim 350$--$400$ | First |

## Ferroelectric Materials

**Ferroelectric materials** are a class of dielectric crystals that possess a spontaneous electric polarization $\mathbf{P}_s$ that can be reversed by an applied electric field. This switchable polarization is the basis for non-volatile memory (FeRAM), negative capacitance devices, and ferroelectric tunnel junctions.

### Crystal Structure and Spontaneous Polarization

Ferroelectricity arises from a structural phase transition in which the crystal loses its center of inversion symmetry. The canonical example is barium titanate (BaTiO$_3$):

- **Above $T_C$ (paraelectric phase):** The crystal has cubic perovskite symmetry (space group $Pm\bar{3}m$). The Ti$^{4+}$ ion sits at the center of the oxygen octahedron, and there is no net dipole moment.
- **Below $T_C$ (ferroelectric phase):** The Ti$^{4+}$ ion displaces from the center of the oxygen cage by $\sim 0.1$ \AA, breaking inversion symmetry and creating a permanent electric dipole. The cooperative alignment of these dipoles throughout the crystal produces a macroscopic polarization $P_s \sim 0.26$ C/m$^2$.

The polarization arises from the competition between short-range repulsive forces (which favor the centrosymmetric structure) and long-range Coulomb interactions (which favor the off-center displacement). Below $T_C$, the Coulomb interaction wins, and the crystal spontaneously polarizes.

### Hysteresis Loop

The hallmark of ferroelectric behavior is the **polarization-electric field hysteresis loop**, the ferroelectric analog of the B-H hysteresis loop in ferromagnets. The loop is characterized by three parameters:

#### Hysteresis Loop Parameters

$$
P(E) = P_s \tanh\left(\frac{E \pm E_c}{\delta}\right) \quad \text{(empirical model)}
$$

where:

- $P_s$ is the **saturation (spontaneous) polarization**---the maximum polarization achieved at high field
- $P_r$ is the **remanent polarization**---the polarization remaining after the field is removed ($P_r \leq P_s$)
- $E_c$ is the **coercive field**---the field required to reduce the polarization to zero
- $\delta$ is a width parameter related to the distribution of switching thresholds across domains

The coercive field $E_c$ is a critical parameter for device design: it determines the minimum write voltage for ferroelectric memory ($V_{\text{write}} = E_c \cdot t_{FE}$, where $t_{FE}$ is the ferroelectric film thickness). For CMOS-compatible NC-FETs, low $E_c$ is desirable to keep the operating voltage below 1 V.

### The HfO$_2$ Revolution

Conventional ferroelectrics (BaTiO$_3$, PbZr$_x$Ti$_{1-x}$O$_3$, SrBi$_2$Ta$_2$O$_9$) are incompatible with standard CMOS processing because they require high-temperature crystallization, contain elements that contaminate silicon, and lose their ferroelectric properties below $\sim 50$ nm thickness. The discovery of ferroelectricity in doped hafnium oxide (HfO$_2$) thin films in 2011 was transformative:

- **CMOS compatibility:** HfO$_2$ is already used as a high-$\kappa$ gate dielectric in advanced CMOS nodes.
- **Scalability:** Ferroelectricity persists down to $\sim 2$ nm thickness.
- **Low coercive field:** $E_c \sim 1$--$2$ MV/cm, enabling switching at $< 1$ V for thin films.
- **Moderate polarization:** $P_r \sim 10$--$30$ $\mu$C/cm$^2$, sufficient for memory and NC-FET applications.

### Curie Temperature and Phase Stability

The **Curie temperature** $T_C$ is the critical temperature above which a ferroelectric loses its spontaneous polarization and transitions to the paraelectric phase. For device applications, $T_C$ must be well above the operating temperature to ensure reliable polarization retention:

#### Curie-Weiss Law

$$
\chi_e = \frac{C}{T - T_C}, \quad T > T_C
$$

where:

- $\chi_e$ is the electric susceptibility ($P = \epsilon_0 \chi_e E$)
- $C$ is the Curie-Weiss constant
- The susceptibility diverges at $T_C$, signaling the phase transition
- Below $T_C$, the material is ferroelectric; above $T_C$, it is paraelectric

| Material | $T_C$ (K) | $P_s$ ($\mu$C/cm$^2$) | $E_c$ (kV/cm) | CMOS Compatible |
|----------|-----------|-------------|----------|------|
| BaTiO$_3$ | 393 | 26 | 10--50 | No |
| PbZr$_x$Ti$_{1-x}$O$_3$ (PZT) | 500--700 | 20--40 | 30--80 | No (Pb contamination) |
| SrBi$_2$Ta$_2$O$_9$ (SBT) | 583 | 8--15 | 30--60 | Marginal |
| HfO$_2$:Si (5%) | 700--900 | 10--20 | 1000--2000 | **Yes** |
| HfO$_2$:Zr (50%, HZO) | 600--800 | 15--30 | 800--1500 | **Yes** |

#### Diagram: Ferroelectric Hysteresis and Landau Energy

<iframe src="../../sims/ferroelectric-hysteresis/main.html" width="100%" height="500xp" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive visualization of the Landau free energy landscape and the resulting P-E hysteresis loop of a ferroelectric material</summary>
Type: MicroSim
Learning objective: Connect the double-well Landau free energy landscape to the macroscopic P-E hysteresis loop and understand how temperature, Landau coefficients, and applied field affect polarization switching. Bloom level: Analyze.
Visual elements: Left panel shows the Landau free energy F(P) as a function of polarization P, with the double-well shape below T_C and the single-well shape above T_C. A ball rolls along the energy landscape to indicate the current polarization state. Right panel shows the P-E hysteresis loop being traced in real time as the applied field E is swept. Dashed lines indicate the coercive field E_c and remanent polarization P_r. A temperature slider morphs the energy landscape between ferroelectric and paraelectric phases.
Controls: Temperature slider (200 K to 600 K), Landau alpha and beta coefficient sliders, applied field amplitude slider, sweep speed control, reset button.
Behavior: As the temperature decreases below T_C, the single well splits into a double well and the hysteresis loop appears. Sweeping the applied field causes the ball to move along the energy surface, jumping between wells at the coercive field. The P-E loop updates in real time. At T > T_C, the loop collapses to a linear dielectric response.
Implementation: p5.js with dual-panel layout, animated energy landscape, and synchronized hysteresis curve.
</details>

## Comprehensive Comparison of Beyond-CMOS Devices

The following table provides a side-by-side comparison of the major beyond-CMOS device technologies discussed in this chapter, evaluated against key performance metrics relevant to logic and memory applications.

| Device | Mechanism | Subthreshold Swing | Energy/Operation | Endurance (cycles) | Maturity Level |
|--------|-----------|-------------------|-----------------|-------------------|----------------|
| **CMOS MOSFET** (baseline) | Thermionic emission | $\geq 60$ mV/dec | $\sim 1$--$10$ fJ | $> 10^{16}$ | Production |
| **STT-MRAM** | Spin-polarized current torque on MTJ | N/A (memory) | 0.1--1 fJ/bit | $> 10^{12}$ | Production (embedded) |
| **SOT-MRAM** | Spin Hall current torque on FM | N/A (memory) | 0.01--0.1 fJ/bit | $> 10^{15}$ | Research/prototyping |
| **RRAM (HfO$_x$)** | Filamentary resistive switching | N/A (memory) | 0.1--10 fJ/bit | $10^6$--$10^{12}$ | Prototyping |
| **TFET (Si)** | Band-to-band tunneling | 30--50 mV/dec | $< 1$ fJ (at low $V_{DD}$) | N/A (logic) | Research |
| **TFET (III-V)** | Band-to-band tunneling | $< 30$ mV/dec (theory) | $< 0.1$ fJ (projected) | N/A (logic) | Research |
| **NC-FET (HfO$_2$)** | Ferroelectric negative capacitance | $< 60$ mV/dec (demonstrated) | $\sim 1$ fJ | N/A (logic) | Research/prototyping |
| **Memristor (analog)** | Continuous resistance modulation | N/A (synapse) | $\sim 1$ fJ/event | $10^6$--$10^{12}$ | Prototyping |

Several important observations emerge from this comparison:

1. **No single beyond-CMOS device dominates across all metrics.** STT-MRAM excels at non-volatile memory with high endurance, but cannot serve as a logic switch. TFETs offer steep subthreshold swing for low-power logic but suffer from low ON-current. NC-FETs provide a CMOS-compatible path to sub-thermal switching but face reliability challenges in the ferroelectric gate stack.

2. **Energy efficiency is the common motivation.** Every device in the table targets the power dissipation crisis identified in [Chapter 2](../02-physical-limits/index.md). Spintronic and memristive devices reduce standby power through non-volatility (eliminating leakage during idle states). TFETs and NC-FETs reduce dynamic power by enabling lower supply voltages through sub-60 mV/dec switching.

3. **Heterogeneous integration is the likely outcome.** Rather than replacing CMOS entirely, beyond-CMOS devices will likely be co-integrated with CMOS in heterogeneous platforms: STT-MRAM for last-level cache, RRAM for storage-class memory and neuromorphic computing, and TFETs or NC-FETs for ultra-low-power sensor interfaces and always-on circuits.

## Connections to Other Chapters

The beyond-CMOS devices introduced in this chapter intersect with several themes developed elsewhere in the textbook:

- **Landauer's principle** ([Chapter 2](../02-physical-limits/index.md)): The minimum energy per irreversible bit operation, $E_{\min} = kT \ln 2 \approx 2.9 \times 10^{-21}$ J at 300 K, provides a fundamental floor that all devices---CMOS and beyond-CMOS alike---must respect. Spintronic devices with switching energies of $\sim 1$ aJ ($10^{-18}$ J) are still $\sim 350 \times$ above this limit, indicating room for further optimization.

- **Boltzmann tyranny** ([Chapter 4](../04-classical-computing/index.md)): The 60 mV/dec barrier for MOSFET subthreshold swing, which arises from the Boltzmann distribution of carrier energies, is the specific limitation that TFETs and NC-FETs aim to break. The TFET achieves this by replacing thermionic emission with tunneling; the NC-FET achieves it by amplifying the gate voltage through ferroelectric instability.

- **Quantum mechanics** ([Chapter 7](../07-quantum-mechanics/index.md)): The electron spin states $|\!\uparrow\rangle$ and $|\!\downarrow\rangle$ used in spintronics are the same two-level quantum systems that form qubits in quantum computing. The spin-orbit Hamiltonian $\hat{H}_{SO} \propto \hat{\mathbf{L}} \cdot \hat{\mathbf{S}}$ is a direct application of the angular momentum coupling formalism developed in quantum mechanics. Similarly, the WKB tunneling calculation used to model TFETs is a semiclassical approximation to the full quantum-mechanical scattering problem.

- **Reversible computing** ([Chapter 6](../06-reversible-computing/index.md)): Memristive devices, with their inherent hysteresis and history-dependent behavior, are fundamentally irreversible. However, their extremely low switching energies approach the Landauer limit more closely than CMOS, making them relevant to discussions of thermodynamically efficient computation.

## Summary

This chapter has developed the physics of four major classes of beyond-CMOS devices, each exploiting a distinct physical mechanism to overcome the scaling limitations of conventional CMOS technology:

1. **Spintronics** encodes information in electron spin rather than charge, enabling non-volatile, low-energy storage in magnetic tunnel junctions.
2. **Spin transfer torque** provides electrical control of magnetic states via the Slonczewski torque, enabling STT-MRAM with switching energies of $\sim 0.1$--$1$ fJ/bit. **Spin-orbit torque** offers a faster, more reliable alternative by decoupling the read and write current paths.
3. **Memristors** are the fourth fundamental circuit element, characterized by a charge-flux constitutive relation that endows them with memory. **Resistive switching** in RRAM devices realizes memristive behavior through filamentary or interfacial resistance modulation.
4. **Tunnel FETs** exploit **band-to-band tunneling** (modeled via the WKB approximation and Kane's formula) to achieve sub-60 mV/dec subthreshold swing, overcoming the Boltzmann tyranny at the cost of reduced ON-state current.
5. **Negative capacitance FETs** use **ferroelectric materials** (described by **Landau-Ginzburg theory**) to amplify the gate voltage, achieving sub-thermal switching while maintaining CMOS compatibility. The discovery of ferroelectricity in HfO$_2$ has made NC-FETs a leading candidate for next-generation low-power logic.

No single beyond-CMOS technology is likely to replace CMOS entirely. Instead, the future of computing will involve heterogeneous integration of multiple device technologies, each optimized for its target application domain---a theme that will be further developed in the chapters on hybrid computing ([Chapter 14](../14-hybrid-computing/index.md)) and energy-efficient computing ([Chapter 15](../15-energy-efficient-computing/index.md)).

## References

1. J. C. Slonczewski, "Current-driven excitation of magnetic multilayers," *Journal of Magnetism and Magnetic Materials*, vol. 159, no. 1-2, pp. L1-L7, 1996.
2. L. O. Chua, "Memristor---the missing circuit element," *IEEE Transactions on Circuit Theory*, vol. 18, no. 5, pp. 507-519, 1971.
3. D. B. Strukov, G. S. Snider, D. R. Stewart, and R. S. Williams, "The missing memristor found," *Nature*, vol. 453, pp. 80-83, 2008.
4. A. C. Seabaugh and Q. Zhang, "Low-voltage tunnel transistors for beyond CMOS logic," *Proceedings of the IEEE*, vol. 98, no. 12, pp. 2095-2110, 2010.
5. S. Salahuddin and S. Datta, "Use of negative capacitance to provide voltage amplification for low power nanoscale devices," *Nano Letters*, vol. 8, no. 2, pp. 405-410, 2008.
6. T. S. Boscke, J. Muller, D. Brauhaus, U. Schroder, and U. Bottger, "Ferroelectricity in hafnium oxide thin films," *Applied Physics Letters*, vol. 99, p. 102903, 2011.
7. E. O. Kane, "Theory of tunneling," *Journal of Applied Physics*, vol. 32, no. 1, pp. 83-91, 1961.
8. A. Manchon, J. Zelezny, I. M. Miron, T. Jungwirth, J. Sinova, A. Thiaville, K. Garello, and P. Gambardella, "Current-induced spin-orbit torques in ferromagnetic and antiferromagnetic systems," *Reviews of Modern Physics*, vol. 91, no. 3, p. 035004, 2019.
9. H.-S. P. Wong, H.-Y. Lee, S. Yu, Y.-S. Chen, Y. Wu, P.-S. Chen, B. Lee, F. T. Chen, and M.-J. Tsai, "Metal-oxide RRAM," *Proceedings of the IEEE*, vol. 100, no. 6, pp. 1951-1970, 2012.
10. A. I. Khan, K. Chatterjee, B. Wang, S. Drapcho, L. You, C. Serrao, S. R. Bakaul, R. Ramesh, and S. Salahuddin, "Negative capacitance in a ferroelectric capacitor," *Nature Materials*, vol. 14, pp. 182-186, 2015.
