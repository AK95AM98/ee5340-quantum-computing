---
title: Quantum Gate Relationship Map
description: Interactive concept map of quantum gate families and their relationships. Click any node to see the gate's matrix, key properties, and role in quantum computation.
image: /sims/gate-relationship-map/gate-relationship-map.png
og:image: /sims/gate-relationship-map/gate-relationship-map.png
twitter:image: /sims/gate-relationship-map/gate-relationship-map.png
quality_score: 88
social:
   cards: false
---

# Quantum Gate Relationship Map

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This concept map shows the **taxonomy and relationships** of the key quantum gates covered in Chapter 9.

**Node color codes:**

| Color | Family |
|-------|--------|
| Purple (dark) | Root — all quantum gates |
| Blue | Category — single-qubit or multi-qubit |
| Red | Pauli Gates (X, Y, Z) |
| Violet | Hadamard Gate (H) |
| Teal | Phase Gates (Z, S, T) |
| Green | Multi-Qubit Gates (CNOT, CZ, Toffoli) |
| Orange | Universal Gate Set {H, T, CNOT} |

**Edge types:**

- **Solid arrow** — taxonomic relationship ("is a type of", "includes")
- **Dashed arrow** — mathematical equivalence (e.g., S² = Z, T² = S, CNOT ↔ CZ via Hadamard)

**Clicking a node** displays the gate's matrix representation, a plain-language description, and its key algebraic properties in the right panel.

### Why this taxonomy matters

Every quantum algorithm is built from gates. Understanding *which families* gates belong to — Pauli, Phase, Clifford, non-Clifford — determines:

- Whether a gate is **fault-tolerant** to implement (Clifford gates are; T is not directly)
- Whether a set of gates is **universal** (can approximate any unitary)
- Which gates create **entanglement** (multi-qubit gates only)

## Embed This MicroSim

```html
<iframe src="https://AK95AM98.github.io/ee5340-quantum-computing/sims/gate-relationship-map/main.html" height="582px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Subject:** Quantum Gates — Taxonomy and Relationships
**Level:** Graduate (EE 5340)
**Duration:** 15–20 minutes
**Prerequisites:** Linear algebra, unitary matrices, Dirac notation

**Learning Objectives:**

Students will be able to:

1. **Classify** quantum gates by family (Pauli, Phase, Hadamard, multi-qubit)
2. **Explain** the mathematical relationships between Z, S, and T gates (S² = Z, T² = S)
3. **Identify** why {H, T, CNOT} form a universal gate set
4. **Distinguish** Clifford from non-Clifford gates and their fault-tolerance implications

**Guided Activities:**

1. **Start at the root node.** Click "Quantum Gates." What does "unitary" mean in this context? (U†U = I)
2. **Click the Pauli Gates category.** What do X, Y, Z have in common? (Self-inverse: G² = I; π rotations)
3. **Click Z, then S, then T.** Follow the dashed arrows. Verify: T² = S, S² = Z algebraically.
4. **Click CNOT, then the dashed arrow to CZ.** How do Hadamard gates turn CNOT into CZ?
5. **Click Universal Gate Set.** Which gate in {H, T, CNOT} is non-Clifford, and why is that necessary?

**Assessment Questions:**

- Why is the T gate essential for universal quantum computing while H and CNOT alone are not?
- What does it mean for a gate to be self-inverse? Give two examples from the Pauli family.
- How would you implement a CZ gate on a system that only supports CNOT natively?
- The Toffoli gate is "classically universal." What does this mean, and why does it matter?

## References

- Nielsen, M. & Chuang, I. (2010). *Quantum Computation and Quantum Information*, Ch. 4. Cambridge.
- Gottesman, D. (1997). Stabilizer codes and the Clifford group. *Caltech PhD Thesis*.
- [Quantum logic gate — Wikipedia](https://en.wikipedia.org/wiki/Quantum_logic_gate)
- [Solovay–Kitaev theorem — Wikipedia](https://en.wikipedia.org/wiki/Solovay%E2%80%93Kitaev_theorem)
