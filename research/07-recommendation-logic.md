# Recommendation Logic

This is a working model, not a final algorithm. The goal is to make the demo feel coherent while leaving room to change weights, language, and course mapping as the app develops.

## Recommendation Inputs

- Main type: highest score.
- Trifix: ordered top three type numbers.
- Full score distribution: all nine scores from 0-100.
- Center balance: Body, Heart, and Head averages.
- Instinct stack: optional `sp`, `so`, `sx` order.
- Team context: aggregate team scores and missing capacities.
- User goal: chosen development goal or demo scenario.
- Course history: later app state for completed, started, or dismissed courses.

## Recommendation Slots

Use slots rather than one undifferentiated list. This makes the interface explainable.

### Slot 1: Main Type Maturity

Purpose: help the user mature their strongest pattern.

Rule:

- Select the course linked to `main_type`.
- Use language like "mature your main pattern" rather than "fix your weakness".

Example:

- Main type 3 / Ambitious Task Master
- Recommend `T3-VALUES`
- Explanation: "This helps turn achievement into sustainable, values-led execution."

### Slot 2: Trifix Calibration

Purpose: show how the user's top three patterns interact.

Rule:

- Identify a likely friction from the ordered trifix.
- Recommend a course linked to either the second or third type if it helps calibrate the main type.

Examples:

- `3-8-5`: execution plus force plus analysis can become fast, intense, and overly controlled. Recommend `T8-ASSERTIVENESS` or `T5-ACTION`.
- `2-9-3`: support plus harmony plus performance can become over-accommodation. Recommend `T2-BOUNDARIES` or `T9-MEDIATION`.
- `7-4-3`: possibility plus emotional expression plus achievement can become scattered identity-driven activity. Recommend `T7-FOCUS`.

### Slot 3: Underused Capacity

Purpose: encourage development across all nine capacities.

Rule:

- Find the lowest score, or the lowest score below a threshold such as 45.
- If that type is already covered by another recommendation, choose the next-lowest meaningful gap.

Examples:

- Low Type 8: recommend `T8-ASSERTIVENESS`.
- Low Type 2: recommend `T2-BOUNDARIES`, framed as relational initiative and clear support.
- Low Type 1: recommend `T1-QUALITY`, framed as standards and disciplined improvement.

### Slot 4: Center Balance

Purpose: support broader development if one center is materially lower.

Rule:

- Calculate average Body, Heart, and Head scores.
- If one center is 12 or more points below the highest center, suggest the relevant center pathway.

Examples:

- Low Body: boundaries, action, standards.
- Low Heart: emotional honesty, care, identity, values.
- Low Head: risk, clarity, options, decision thinking.

### Slot 5: Team Gap

Purpose: connect individual development to team performance.

Rule:

- Calculate team aggregate type and center scores.
- If a team capacity is low, recommend a team course even if it is not obvious from the user's personal profile.

Examples:

- Team low Type 6: `T6-RISK`.
- Team low Type 9: `T9-MEDIATION`.
- Team low Type 1: `T1-QUALITY`.

### Slot 6: User Goal Override

Purpose: let intentional development beat automated inference.

Rule:

- If the user selects a goal, at least one recommendation must directly support that goal.

Examples:

- Goal "lead difficult conversations": recommend `T8-ASSERTIVENESS` and `T9-MEDIATION`.
- Goal "make better decisions": recommend `T5-ACTION` or `T6-RISK`.
- Goal "avoid burnout": recommend `T3-VALUES`, `T7-FOCUS`, or instinct-context content for self-preservation.

## Instinct Modifiers

Instincts should modify course examples, not multiply the catalog.

### Self-Preservation First

- Emphasize energy, health, resources, sustainability, safety, and practical follow-through.
- Example copy: "Apply this in the routines, limits, and resource decisions that keep you stable."

### Social First

- Emphasize belonging, role, reputation, contribution, group coordination, and shared norms.
- Example copy: "Apply this in team expectations, status dynamics, and group commitments."

### Sexual / One-to-One First

- Emphasize intensity, focus, chemistry, attraction, direct bonds, and deep commitment.
- Example copy: "Apply this in high-stakes one-to-one dynamics and places where intensity drives behavior."

## Ranking Rules

Recommended default ranking:

1. User goal override, if present.
2. Main type maturity.
3. Trifix calibration.
4. Underused capacity.
5. Team gap.
6. Center balance.

For the demo UI, show three primary recommendations and keep the rest under "More ways to develop".

## Copy Pattern

Use this structure:

> Recommended because [signal]. This course helps you [behavioral outcome].

Examples:

- "Recommended because Ambitious Task Master is your main pattern. This course helps you pursue outcomes without tying your worth to performance."
- "Recommended because Type 9 is currently underused in your profile. This course helps you surface disagreement while preserving trust."
- "Recommended because your team is low in risk-preparation signals. This workshop helps the group name risks and close the loop without spiraling."

## Open Questions

- Should the app force trifix to include one type from each center, or preserve the measured top three exactly?
- Should instinct stack be entered manually, imported from assessment output, or inferred from a separate score?
- Should completed courses change future recommendations or simply appear as progress history?

Current recommendation: preserve measured top three exactly, import instincts only if available, and let completed courses influence ranking later.

