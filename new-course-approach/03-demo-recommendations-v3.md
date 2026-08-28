# Demo LMS — Persona and Team Recommendations v3

**Purpose:** Provide curated demo recommendation seeds using the v3 course catalogue.

This file is **context data**, not part of the canonical course definitions.

The same course may be recommended to different people for different reasons. A course definition should therefore not contain learner-specific copy.

---

# 1. Recommendation record shape

Conceptually:

```ts
type Recommendation = {
  learnerId: string;
  courseId: string;
  reason: string;
  priority: 'primary' | 'supporting' | 'explore';
  source: {
    pathway: 'strengths' | 'stress-growth' | 'fortification' | 'team';
    type?: number;
    relationshipId?: string;
    teamId?: string;
  };
};
```

---

# 2. Learner course state

Progress should be separate from course data.

```ts
type LearnerCourseState = {
  learnerId: string;
  courseId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progressPct: number;
};
```

The values below are demo seeds only.

---

# 3. Emily Carter — 9 / 2 / 6 — Team Atlas

## Strengths

### S9-01 — Listening for the Whole System
**Priority:** primary  
**Reason:** Emily's Type 9 pattern already gives her strong access to listening and perspective holding. This course makes that natural capacity more deliberate and usable in complex group situations.

### S9-02 — Mediation That Surfaces Difference
**Priority:** primary  
**Reason:** Builds directly on Emily's harmony and mediation strengths while moving beyond smoothing disagreement toward making useful differences visible.

### S2-02 — Support That Builds Ownership
**Priority:** supporting  
**Reason:** Her Type 2 influence makes support natural; this develops support as a capability that strengthens other people's ownership rather than quietly carrying more responsibility.

### S6-01 — Risk Sense and Early Signals
**Priority:** supporting  
**Reason:** Her Type 6 influence already notices possible concerns. This course turns that signal into clearer, proportionate risk communication.

## Stress & Growth

### SG-S9-01 — When Calm Turns to Worry
**Priority:** primary  
**Reason:** Emily's Nine stress story can move from apparent steadiness toward doubt, reassurance-seeking and hidden vigilance.

### SG-S9-02 — Move From Reassurance to Decision
**Priority:** primary  
**Reason:** Useful when uncertainty or the absence of consensus causes Emily to delay commitment.

### SG-G9-01 — Make Your Priorities Visible
**Priority:** primary  
**Reason:** Uses Type 3-associated agency and goal visibility as a growth resource for a Type 9 primary pattern.

### SG-GEN-02 — Emotional Regulation Under Pressure
**Priority:** supporting  
**Reason:** Gives Emily a type-independent regulation practice for staying engaged when interpersonal pressure rises.

### SG-GEN-04 — Decisions Under Uncertainty
**Priority:** supporting  
**Reason:** Helps turn uncertainty into a decision threshold instead of a search for complete reassurance.

## Fortification

### F8-01 — Assertiveness and Clean Boundaries
**Priority:** primary  
**Reason:** Type 8's directness and boundary territory gives Emily a strong complementary capability to her natural accommodation and relationship awareness.

### F8-02 — Difficult Conversations With Directness
**Priority:** primary  
**Reason:** Extends directness into situations where conflict needs to become visible early rather than being delayed.

### F3-01 — Goal Clarity and Visible Ownership
**Priority:** supporting  
**Reason:** Builds greater visible agency and explicit ownership without asking Emily to abandon her collaborative style.

### F1-02 — Good-Enough Decisions
**Priority:** explore  
**Reason:** Adds clearer standards and closure when the group could otherwise stay open too long.

## Team

### TM-T8-01 — Working With Direct-Challenge Colleagues
**Why:** James's 8-led profile makes directness and challenge especially relevant to Emily's daily team context.

### TM-T4-01 — Working With Meaning-Driven Colleagues
**Why:** Helps Emily interpret Sophie's challenge and creative intensity without assuming it is relational conflict.

### TM-T5-01 — Working With Analysis-Driven Colleagues
**Why:** Helps Emily distinguish Thomas's processing and analytical distance from disengagement.

### TM-GEN-01 — Listening Before Leading
**Why:** Useful across Team Atlas and aligned with Emily's natural listening strengths.

### TM-GEN-02 — Productive Disagreement
**Why:** Especially relevant to Emily–James and to Team Atlas's need to make disagreement visible earlier.

### TM-GEN-03 — Team Decisions That Close
**Why:** Supports the team's recurring tension between rich input and timely decision closure.

---

# 4. James Bennett — 8 / 3 / 1 — Team Atlas

## Strengths

- **S8-01 Clean Directness** — refines natural directness into clear challenge that others can use.
- **S8-02 Decisive Action With Calibration** — develops speed and confidence without forcing premature closure.
- **S8-03 Protective Leadership Without Overreach** — advanced use of authority, challenge and delegation.
- **S3-01 Goals That Create Momentum** — strengthens visible execution and outcome clarity.
- **S1-01 Turning Standards Into Clear Judgement** — develops his standards signal into more explicit quality criteria.

## Stress & Growth

- **SG-S8-01 When Force Withdraws** — recognises guarded distance after challenge.
- **SG-S8-02 Re-enter After Defensive Distance** — provides a deliberate route back into collaboration.
- **SG-G8-01 Power With Relational Awareness** — uses Type 2-associated empathy and receptivity as a growth resource.
- **SG-G8-02 Receive Support Without Losing Agency** — broadens strength by allowing help and shared ownership.
- **SG-GEN-02 Emotional Regulation Under Pressure** — general regulation under intensity.

## Fortification

- **F9-01 Perspective Holding and Mediation** — adds listening and integration before decisive closure.
- **F9-02 Consensus Without Disappearing** — builds the ability to close with real participation rather than assumed agreement.
- **F2-02 Trust Through Support** — develops relational influence beyond authority and urgency.
- **F5-01 Analytical Distance** — adds deliberate distance before immediate action.

## Team

- **TM-T9-01 Working With Harmony-Driven Colleagues** — directly relevant to Emily.
- **TM-T4-01 Working With Meaning-Driven Colleagues** — directly relevant to Sophie.
- **TM-T5-01 Working With Analysis-Driven Colleagues** — directly relevant to Thomas.
- **TM-GEN-01 Listening Before Leading**
- **TM-GEN-02 Productive Disagreement**
- **TM-GEN-03 Team Decisions That Close**
- **TM-GEN-04 Role Clarity and Ownership**

---

# 5. Sophie Harris — 4 / 7 / 1 — Team Atlas

## Strengths

- **S4-01 Emotional Signal to Creative Insight** — turns emotional and aesthetic sensitivity into usable creative information.
- **S4-02 Feedback Into Better Work** — develops originality that remains collaborative.
- **S7-01 Possibility Scanning** — sharpens option generation into opportunity judgement.
- **S7-02 Experiment Design for Fast Learning** — turns possibility into testable learning.
- **S1-02 Continuous Improvement Without Overcorrection** — develops quality standards without endless refinement.

## Stress & Growth

- **SG-S4-01 When Longing Turns to Over-Attunement**
- **SG-S4-02 Stop Chasing Reassurance**
- **SG-G4-01 Structure the Creative Signal**
- **SG-G4-02 Discipline Without Flattening Originality**
- **SG-GEN-05 Attention Under Load**

## Fortification

- **F3-01 Goal Clarity and Visible Ownership** — adds clearer delivery ownership.
- **F3-02 Performance Feedback as Learning** — makes progress information usable rather than threatening to identity.
- **F5-01 Analytical Distance** — gives a more detached way to test assumptions.
- **F8-01 Assertiveness and Clean Boundaries** — supports clear challenge and commitment points.

## Team

- **TM-T9-01 Working With Harmony-Driven Colleagues** — Emily.
- **TM-T8-01 Working With Direct-Challenge Colleagues** — James.
- **TM-T5-01 Working With Analysis-Driven Colleagues** — Thomas.
- **TM-GEN-05 Feedback That Travels**
- **TM-GEN-03 Team Decisions That Close**
- **TM-GEN-08 From Different Perspectives to One Plan**

---

# 6. Thomas Parker — 5 / 6 / 7 — Team Atlas

## Strengths

- **S5-01 Deep Analysis, Better Questions**
- **S5-02 Strategic Synthesis**
- **S5-03 Expert Communication Under Complexity**
- **S6-01 Risk Sense and Early Signals**
- **S7-02 Experiment Design for Fast Learning**

## Stress & Growth

- **SG-S5-01 When Analysis Scatters**
- **SG-S5-02 Reduce Option Overload Under Pressure**
- **SG-G5-01 Act Before Certainty**
- **SG-G5-02 Embodied Decisiveness**
- **SG-GEN-04 Decisions Under Uncertainty**

## Fortification

- **F3-01 Goal Clarity and Visible Ownership** — makes ownership and action more visible.
- **F3-02 Performance Feedback as Learning** — strengthens action-feedback loops.
- **F8-01 Assertiveness and Clean Boundaries** — supports decisive expression before analysis is complete.
- **F9-01 Perspective Holding and Mediation** — broadens relational participation and integration.

## Team

- **TM-T9-01 Working With Harmony-Driven Colleagues** — Emily.
- **TM-T8-01 Working With Direct-Challenge Colleagues** — James.
- **TM-T4-01 Working With Meaning-Driven Colleagues** — Sophie.
- **TM-GEN-06 Working Across Different Operating Styles**
- **TM-GEN-03 Team Decisions That Close**
- **TM-GEN-08 From Different Perspectives to One Plan**

---

# 7. Sarah Mitchell — 9 / 5 / 3 — Team Beacon

## Strengths

- **S9-01 Listening for the Whole System**
- **S9-02 Mediation That Surfaces Difference**
- **S5-02 Strategic Synthesis**
- **S5-03 Expert Communication Under Complexity**
- **S3-01 Goals That Create Momentum**

## Stress & Growth

- **SG-S9-01 When Calm Turns to Worry**
- **SG-S9-02 Move From Reassurance to Decision**
- **SG-G9-01 Make Your Priorities Visible**
- **SG-G9-02 Agency Through Small Commitments**
- **SG-GEN-04 Decisions Under Uncertainty**

## Fortification

- **F8-01 Assertiveness and Clean Boundaries** — helps make challenge visible earlier.
- **F8-02 Difficult Conversations With Directness** — supports earlier disagreement with Oliver.
- **F2-01 Relational Initiative** — creates more visible relational communication rather than private synthesis.
- **F1-01 Standards That Clarify** — supports explicit delivery constraints.

## Team

- **TM-T3-01 Working With Achievement-Driven Colleagues** — Oliver shares Type 3 with Sarah and leads with it.
- **TM-T7-01 Working With Possibility-Driven Colleagues** — directly relevant to Oliver's opportunity orientation.
- **TM-T8-01 Working With Direct-Challenge Colleagues** — relevant to Oliver's assertive third signal.
- **TM-GEN-03 Team Decisions That Close**
- **TM-GEN-04 Role Clarity and Ownership**
- **TM-GEN-07 High-Trust Team Commitments**

---

# 8. Oliver Grant — 3 / 7 / 8 — Team Beacon

## Strengths

- **S3-01 Goals That Create Momentum**
- **S3-02 Sustainable High Performance**
- **S3-03 Influence Through Visible Progress**
- **S7-01 Possibility Scanning**
- **S8-02 Decisive Action With Calibration**

## Stress & Growth

- **SG-S3-01 When Momentum Goes Flat**
- **SG-S3-02 Re-engage After Performance Exhaustion**
- **SG-G3-01 Pause for Risk and Reality**
- **SG-G3-02 Trust Through Shared Preparation**
- **SG-GEN-04 Decisions Under Uncertainty**

## Fortification

- **F6-01 Risk Intelligence and Premortems** — adds more deliberate challenge before commitments are made.
- **F6-02 Trust Calibration Under Uncertainty** — supports credible commercial judgement.
- **F9-01 Perspective Holding and Mediation** — increases listening and space for reservations.
- **F5-01 Analytical Distance** — helps test opportunity before momentum becomes commitment.

## Team

- **TM-T9-01 Working With Harmony-Driven Colleagues** — Sarah's primary pattern.
- **TM-T5-01 Working With Analysis-Driven Colleagues** — Sarah's analytical supporting signal.
- **TM-GEN-01 Listening Before Leading**
- **TM-GEN-03 Team Decisions That Close**
- **TM-GEN-07 High-Trust Team Commitments**

---

# 9. Team Atlas shared learning

## Team pathway

### From Diverse Perspectives to Confident Decisions

Recommended linked sequence:

```text
TM-GEN-01 Listening Before Leading
    ↓
TM-GEN-02 Productive Disagreement
    ↓
TM-GEN-03 Team Decisions That Close
    ↓
TM-GEN-07 High-Trust Team Commitments
```

Supporting team courses:

- **TM-GEN-05 Feedback That Travels**
- **TM-GEN-06 Working Across Different Operating Styles**
- **TM-GEN-08 From Different Perspectives to One Plan**
- **TM-CENTER-BODY-01 Working Across Body-Center Styles**
- **TM-CENTER-HEART-01 Working Across Heart-Center Styles**
- **TM-CENTER-HEAD-01 Working Across Head-Center Styles**

---

# 10. Team Beacon shared learning

## Team pathway

### From Opportunity to Credible Commitment

A suitable demo route is:

```text
TM-GEN-01 Listening Before Leading
    ↓
TM-GEN-03 Team Decisions That Close
    ↓
TM-GEN-04 Role Clarity and Ownership
    ↓
TM-GEN-07 High-Trust Team Commitments
```

Supporting learning:

- **TM-T3-01 Working With Achievement-Driven Colleagues**
- **TM-T7-01 Working With Possibility-Driven Colleagues**
- **TM-T9-01 Working With Harmony-Driven Colleagues**
- **TM-GEN-06 Working Across Different Operating Styles**

---

# 11. Demo learner-state seeds

These are intentionally illustrative and can be changed by Codex.

## Emily

| Course | Status | Progress |
|---|---|---:|
| S9-01 | completed | 100 |
| S9-02 | in-progress | 46 |
| F8-01 | in-progress | 24 |
| SG-S9-01 | in-progress | 35 |
| TM-GEN-01 | completed | 100 |
| TM-GEN-02 | in-progress | 30 |

## James

| Course | Status | Progress |
|---|---|---:|
| S8-01 | completed | 100 |
| S8-02 | in-progress | 55 |
| F9-01 | in-progress | 20 |
| SG-G8-01 | not-started | 0 |
| TM-GEN-01 | in-progress | 60 |

## Sophie

| Course | Status | Progress |
|---|---|---:|
| S4-01 | completed | 100 |
| S7-02 | in-progress | 35 |
| F3-01 | in-progress | 20 |
| SG-G4-01 | not-started | 0 |
| TM-GEN-05 | in-progress | 45 |

## Thomas

| Course | Status | Progress |
|---|---|---:|
| S5-01 | completed | 100 |
| S5-02 | in-progress | 65 |
| F3-01 | not-started | 0 |
| SG-G5-01 | in-progress | 25 |
| TM-GEN-03 | in-progress | 30 |

## Sarah

| Course | Status | Progress |
|---|---|---:|
| S9-01 | completed | 100 |
| S5-02 | in-progress | 50 |
| F8-01 | not-started | 0 |
| SG-G9-01 | in-progress | 20 |
| TM-GEN-03 | in-progress | 35 |

## Oliver

| Course | Status | Progress |
|---|---|---:|
| S3-01 | completed | 100 |
| S3-02 | in-progress | 60 |
| F6-01 | in-progress | 25 |
| SG-G3-01 | not-started | 0 |
| TM-GEN-01 | in-progress | 40 |

---

# 12. Recommendation philosophy

These lists are curated for the six demo personas.

They should not be turned into a universal Enneagram rule engine.

The demo only needs enough recommendation logic to show:

- why something is in Strengths;
- why something is in Stress & Growth;
- why another type's sector is useful in Fortification;
- why a Team course appears because of a colleague or shared team need.

That is sufficient to make the interface feel coherent without pretending to have validated psychometric recommendation science.
