# Demo LMS — Course System Architecture v3

**Status:** Canonical course-system reference  
**Purpose:** Define the new course/content model that supports the demo's interactive Pathways maps.

---

# 1. Product principle

This is a **demo LMS**, not an Enneagram product.

The Enneagram is useful because it gives the demo:

- nine recognisable profile territories;
- different strengths and working styles;
- stress/growth connections;
- team overlap;
- enough content to demonstrate recommendation and mapping interfaces.

The course system is therefore designed to showcase:

> **how assessment information can organise learning in meaningful, interactive ways.**

The course architecture should remain conceptually reusable if the real product later uses different assessment systems.

---

# 2. The four canonical course pathways

Every course belongs to **exactly one** pathway.

## `strengths`

### User-facing label
**Strengths**

### Purpose
Develop skills that are already associated with one of the learner's strongest types.

The learner is not starting from zero. The development story is:

> natural preference → deliberate capability → advanced application

### Categories
`type-1` through `type-9`

### Map rule
Only the learner's top-three type sectors are active.

---

## `stress-growth`

### User-facing label
**Stress & Growth**

### Purpose
Help the learner:

- recognise pressure patterns;
- regulate effectively;
- understand the primary type's stress connection;
- deliberately access growth resources;
- build general resilience useful across every type.

### Categories

- `stress-1` through `stress-9`
- `growth-1` through `growth-9`
- `general`

`stress-9` means **stress development for a Type 9 learner**.  
`growth-9` means **growth development for a Type 9 learner**.

The category names refer to the learner's primary type, not the connected destination type.

### Map rule
For a learner with primary Type N:

- show `stress-N`;
- show `growth-N`;
- show `general` in a separate general-learning area.

---

## `fortification`

### User-facing label
**Fortification**

### Purpose
Build useful capabilities associated with types outside the learner's strongest profile.

The developmental story is:

> less-familiar territory → learnable capability → broader behavioural range

This is not a deficit score.

A person may already possess the skill. The map simply uses another type's territory as a useful development frame.

### Categories
`type-1` through `type-9`

### Map rule
Mute the learner's top-three sectors and highlight the other six.

---

## `team`

### User-facing label
**Team**

### Purpose
Help the learner understand and work with other operating styles, then build shared team capability.

### Categories

- `type-1` through `type-9`
- `center-body`
- `center-heart`
- `center-head`
- `general`

### Map rule
Type categories can sit in the nine type sectors.

Center and general courses can sit in separate supporting areas rather than being forced into a type cone.

---

# 3. Type-associated skill territories

For the demo, each type has a recognisable set of associated capabilities.

These are **not exclusive ownership claims**.

The correct interpretation is:

> “This capability is especially easy to illustrate in this type's learning territory.”

A person of any type can learn any of these skills.

## Type 1 — Standards & disciplined improvement

- Quality Judgement
- Standards Setting
- Prioritisation
- Continuous Improvement
- Constructive Feedback

## Type 2 — Support & relational influence

- Relational Awareness
- Supportive Communication
- Stakeholder Trust
- Mentoring & Support
- Relational Influence

## Type 3 — Agency & achievement

- Goal Clarity
- Execution Momentum
- Visible Ownership
- Performance Learning
- Adaptive Influence

## Type 4 — Creative identity & meaningful contribution

- Emotional Literacy
- Creative Insight
- Authentic Expression
- Feedback Integration
- Meaning-Making

## Type 5 — Analysis & strategic depth

- Analytical Reasoning
- Systems Thinking
- Knowledge Synthesis
- Strategic Communication
- Research Discipline

## Type 6 — Preparedness & calibrated risk

- Risk Judgement
- Contingency Planning
- Trust Calibration
- Responsible Challenge
- Decision Confidence

## Type 7 — Possibility & experimentation

- Opportunity Framing
- Ideation
- Experimentation
- Adaptability
- Reframing

## Type 8 — Directness & protective agency

- Assertive Communication
- Boundary Setting
- Decisive Action
- Negotiation
- Courageous Challenge
- Delegation

## Type 9 — Integration & facilitative cohesion

- Active Listening
- Mediation
- Facilitation
- Perspective Integration
- Consensus Building
- Calm Coordination

---

# 4. General skills

Some capabilities should not be assigned to a single type in the course architecture.

These are especially useful in Stress & Growth and Team:

- Self-Awareness
- Emotional Regulation
- Stress Recovery
- Attention Management
- Decision-Making Under Uncertainty
- Behavioural Flexibility
- Reflective Practice
- Team Listening
- Productive Disagreement
- Team Decision-Making
- Role Clarity
- Team Feedback
- Cross-Style Collaboration
- Shared Commitment

---

# 5. Canonical course metadata

The v3 YAML uses this conceptual course shape:

```ts
type Course = {
  id: string;
  name: string;
  description: string;
  lengthMinutes: number;

  pathway:
    | 'strengths'
    | 'stress-growth'
    | 'fortification'
    | 'team';

  category: string;

  level:
    | 'foundation'
    | 'intermediate'
    | 'advanced';

  courseType:
    | 'micro-course'
    | 'guided-practice'
    | 'reflection-sprint'
    | 'scenario-lab'
    | 'workshop'
    | 'team-workshop';

  audience:
    | 'individual'
    | 'pair'
    | 'team'
    | 'all';

  develops: string[];
  learningFocus: string[];

  recommendedWhen: string[];
  recommendationContext: string;

  prerequisites: string[];
  unlocks: string[];

  chain?: {
    id: string;
    sequence: number;
  };

  map: {
    radialBand: 'inner' | 'middle' | 'outer';
    placementNote: string;
  };
};
```

---

# 6. Why some metadata belongs outside `Course`

## Progress

Progress is person-specific.

Do not store:

```ts
course.progress = 46
```

Store:

```ts
type LearnerCourseState = {
  learnerId: string;
  courseId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progressPct: number;
};
```

---

## Personalised recommendation reason

The course can contain a **generic recommendation context**, but the sentence shown to Emily should be separate.

Example course context:

> Recommended when the learner would benefit from more directness, boundary clarity or willingness to take a position.

Example Emily recommendation:

> This is recommended because Emily's 9–2 pattern makes preserving connection especially natural, while direct boundary expression may require more deliberate practice.

Conceptually:

```ts
type Recommendation = {
  learnerId: string;
  courseId: string;
  reason: string;
  priority?: 'primary' | 'supporting' | 'explore';
  source?: {
    pathway: string;
    type?: number;
    relationshipId?: string;
    teamId?: string;
  };
};
```

---

## Map coordinates

Do not store permanent pixel coordinates in the canonical course data.

Map position should be derived from:

- pathway;
- category;
- level;
- chain;
- learner profile;
- team composition.

A view-specific placement record is fine if needed, but it should reference the canonical course ID.

---

# 7. Course IDs

The new IDs expose the pathway/category relationship.

## Strengths

`S1-01`, `S1-02`  
...  
`S9-01`, etc.

## Stress & Growth

Stress:
`SG-S1-01`

Growth:
`SG-G1-01`

General:
`SG-GEN-01`

## Fortification

`F1-01`  
...  
`F9-02`

## Team

Type:
`TM-T1-01`

Center:
`TM-CENTER-BODY-01`

General:
`TM-GEN-01`

This makes the data easy to inspect without making IDs responsible for runtime logic.

---

# 8. Linked courses and unlocks

Most courses should remain standalone.

Some chains exist to make progression visible and engaging.

A hard prerequisite should only be used when we intentionally want an unlock mechanic.

## Example Strengths chain

Type 9:

```text
S9-01 Listening for the Whole System
    ↓
S9-02 Mediation That Surfaces Difference
    ↓
S9-03 Facilitative Leadership
```

## Example Team chain

```text
TM-GEN-01 Listening Before Leading
    ↓
TM-GEN-02 Productive Disagreement
    ↓
TM-GEN-03 Team Decisions That Close
    ↓
TM-GEN-07 High-Trust Team Commitments
```

A softer conceptual relationship should **not** be represented as a hard prerequisite.

Use UI copy such as:

- Supports
- Builds toward
- Related
- Recommended next

where access should remain open.

---

# 9. Map progression

The common radial language is:

## Inner
Foundation

## Middle
Intermediate

## Outer
Advanced

This is why `level` is first-class metadata.

It gives the interface a useful layout rule without inventing arbitrary coordinates.

---

# 10. Recommendation logic by pathway

## Strengths

Relevant when:

- category type is in the learner's top three;
- course develops a capability the learner already tends to access;
- course is an appropriate next level in a chain.

Copy pattern:

> Because Type {N} is one of your strongest patterns, this course develops an existing capacity into a more deliberate professional strength.

---

## Stress & Growth

Relevant when:

- category matches the learner's primary type;
- the course is `general`;
- the learner is currently exploring pressure/growth;
- course history suggests an appropriate next step.

Copy pattern:

> Because {signal}, this course helps you {flexibility outcome}.

---

## Fortification

Relevant when:

- category type is outside the learner's top three;
- its associated capability would meaningfully broaden the learner's range;
- persona content identifies a related challenge or blind spot.

Copy pattern:

> This course draws on the Type {N} learning territory to build {capability}, giving you another option when your usual approach is less useful.

---

## Team

Relevant when:

- a teammate has the type;
- several teammates share the type;
- the course matches a represented center;
- the whole team has a relevant development need;
- a pair relationship surfaces the issue.

Copy pattern:

> This course is relevant because {team/relationship signal}. It helps you/the team {collaboration outcome}.

---

# 11. Team category model

The Team pathway deliberately has more varied categories.

## Type categories

Purpose:

> Understand and collaborate with a particular working style.

Example:

`type-8`
→ Working With Direct-Challenge Colleagues

## Center categories

Purpose:

> Compare and collaborate across the broader Head / Heart / Body patterns.

Examples:

- `center-body`
- `center-heart`
- `center-head`

## General

Purpose:

> Build shared practices useful regardless of type.

Examples:

- listening;
- productive disagreement;
- team decision-making;
- role clarity;
- feedback;
- shared commitment.

---

# 12. What the course catalogue is not

It is not:

- a scientific claim that every Type 8 person has high assertiveness;
- a psychometric skill score;
- a complete Enneagram curriculum;
- a production LMS catalogue;
- a requirement that every type receives equal course counts forever.

It is:

> a coherent demo dataset designed to make interactive recommendation, progression and mapping interfaces possible.

---

# 13. Course page implications

The eventual course page can remain simple.

Recommended information hierarchy:

1. Course name
2. Short description
3. Pathway
4. Category / learning territory
5. Length
6. Level and course type
7. What it develops
8. Why this course is being recommended **to the current learner**
9. Prerequisite / next course if applicable
10. Lightweight learning outline / placeholder content
11. Learner progress

The personalised recommendation reason should be resolved from recommendation/context data rather than baked into the course.

---

# 14. Source-of-truth rule

The YAML catalogue is the canonical source for courses.

Do not duplicate full course definitions in:

- persona data;
- map-node arrays;
- team relationship objects;
- UI components.

Those objects should reference course IDs.

This is essential if the demo is going to show the same learning catalogue arranged differently in several interfaces.
