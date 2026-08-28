# Enneagram Demo LMS — Development Map Content Model v2

**Status:** Working demo content extension  
**Purpose:** Reorganise the existing skills, courses, profile and team content for the revised Pathways / Development Map interface.  
**Relationship to existing content:** This document supplements — rather than replaces — the existing skills/course catalogue, persona recommendations, team pathways and Enneagram foundation material.

---

# 1. Why This Additional Content Layer Exists

The existing content model was deliberately designed so that professional skills and courses were **not owned by Enneagram types**.

That remains the cleaner underlying model:

**Profile signal → development interpretation → skill → course → pathway**

The revised Development Map has a different need. It uses the nine-point Enneagram structure as a **visual demo framework** for showing how learning can be arranged spatially, progressively and interactively.

For that purpose, this document introduces a **presentation-layer affinity model**.

A course or skill may therefore be *displayed near* a type because that type makes the capability especially easy to illustrate, without claiming:

> “Only this type can possess or learn this capability.”

Preferred wording in the UI:

- **Associated with Type 8**
- **Type 8 learning territory**
- **A capability especially visible in this pattern**
- **A useful resource from Type 8**

Avoid:

- “Type 8 owns Assertiveness”
- “Only Type 8s are assertive”
- “This is a Type 8 skill score”

The purpose is to create a compelling development-map demo while keeping the underlying data model reusable for other assessment systems later.

---

# 2. Revised Development Map Modes

The Development Map now has five views:

1. **All**
2. **Strengths**
3. **Stress & Growth**
4. **Fortification**
5. **Team**

The four development territories still underpin the content:

- **Strengthen Strengths**
- **Optimise Stress Management & Growth**
- **Fortify Areas of Growth**
- **Team Development**

For the map interface, **Fortification** becomes the shorter user-facing label for *Fortify Areas of Growth*.

---

# 3. Shared Visual Grammar

## 3.1 Nine-sector wheel

Strengths, Stress & Growth, Fortification and part of Team can share a common Enneagram-derived wheel.

The wheel contains:

- a true circle;
- nine evenly spaced type positions;
- nine equal angular sectors;
- a central profile / map hub;
- developmental distance extending outward from the type positions;
- optional radial bands representing broad progression.

The nine sectors are always geometrically equal even when only some sectors are active.

## 3.2 Radial progression

Where appropriate:

### Inner
Foundation / awareness / first practice

### Middle
Intermediate / applied capability

### Outer
Advanced / mastery / complex application

This is a broad visual grammar rather than a psychometric scale.

Use actual course metadata such as **Foundation / Intermediate / Advanced** wherever possible.

## 3.3 Shared object types

The interface may display:

- **Type / Profile Anchor**
- **Capability / Skill**
- **Course**
- **Pathway**
- **Stress / Growth Resource**
- **Colleague**
- **Team**
- **Shared Team Capability**

The same course may appear in more than one map because the *reason it is relevant* changes by context.

---

# 4. Course Node Display Hierarchy

Space inside the map is valuable. The most important information should appear first.

For map course nodes, use approximately this hierarchy:

### Top
**Category / role in the map**, where useful.

Examples:

- FOUNDATION COURSE
- STRENGTH MASTERY
- GROWTH RESOURCE
- FORTIFICATION
- SHARED TEAM LEARNING
- TYPE PERSPECTIVE
- COLLABORATION COURSE

### Main
**Course title**

### Supporting
Level / duration or primary capability where space permits.

### Bottom
Learning state:

- Not Started
- In Progress
- Completed

Do **not** use `Not Started` / `In Progress` as the dominant top label on map cards.

Status is operational metadata. The developmental meaning of the node is more important.

In a detailed sidebar / inspector, status can be shown alongside course metadata, but it still does not need to be the headline.

---

# 5. ALL — Development Overview

The **All** view does not need a spatial wheel.

It can function as a 2 × 2 overview of the four development worlds.

Each area can contain:

- title;
- 1–2 sentence explanation;
- number of relevant courses or active routes;
- 1–3 example courses / capabilities;
- progress or activity where useful;
- entry action.

## 5.1 Strengthen Strengths

**Summary**

Build on capabilities that already appear naturally in the learner's strongest profile patterns and turn them into increasingly deliberate professional strengths.

**Typical content**

- listening;
- facilitation;
- influence;
- leadership;
- analysis;
- creativity;
- execution;
- other strengths depending on profile.

**Emily examples**

- C09 Collaborative Influence
- C20 Facilitating Productive Disagreement

---

## 5.2 Stress & Growth

**Summary**

Recognise how the learner's default strategy changes under pressure, strengthen general regulation and deliberately access a wider range of responses.

**Typical content**

- self-awareness;
- emotional regulation;
- decision-making under uncertainty;
- stress signals;
- growth resources;
- connection-line learning.

**Emily examples**

- C02 Staying Effective Under Pressure
- C10 Decisions Without Certainty

---

## 5.3 Fortification

**Summary**

Explore useful capabilities associated with patterns outside the learner's strongest profile and strengthen areas that may require more deliberate effort.

**Typical content**

- assertiveness;
- boundaries;
- prioritisation;
- analytical distance;
- decisive action;
- creative experimentation;
- strategic communication;
- other profile-dependent capabilities.

**Emily examples**

- C05 Healthy Boundaries at Work
- C04 Finding Your Voice
- C06 Constructive Conflict

---

## 5.4 Team Development

**Summary**

Connect personal development with colleagues, overlapping working styles, complementary perspectives and shared team capability.

**Typical content**

- understanding other working styles;
- pair collaboration;
- productive disagreement;
- team decision-making;
- shared learning pathways.

**Emily / Team Atlas examples**

- C08 Listening Before Leading
- C06 Constructive Conflict
- C20 Facilitating Productive Disagreement
- C22 High-Trust Team Decisions

---

# 6. Type-Affinity Framework for the Wheel

The following associations are **presentation affinities** for the demo.

They describe capabilities especially easy to illustrate through each type's archetypal pattern.

They are not exclusive ownership claims.

| Type | Demo learning territory | Especially useful capability themes |
|---|---|---|
| **1** | Standards & disciplined improvement | quality, structure, prioritisation, follow-through, constructive standards |
| **2** | Support & relational influence | empathy, trust, listening, collaborative influence, supportive boundaries |
| **3** | Agency & achievement | goals, momentum, execution, visible action, prioritisation, performance learning |
| **4** | Creative identity & meaningful contribution | creativity, feedback integration, ownership, expression, adaptive refinement |
| **5** | Analysis & strategic depth | investigation, risk analysis, strategic communication, evidence, analytical distance |
| **6** | Preparedness & calibrated risk | risk judgement, questioning, preparation, decision confidence, trust calibration |
| **7** | Possibility & experimentation | adaptability, ideation, experimentation, iterative action, opportunity exploration |
| **8** | Directness & protective agency | assertiveness, boundaries, confrontation, decisive action, leadership presence |
| **9** | Integration & facilitative cohesion | listening, mediation, perspective integration, facilitation, constructive consensus |

---

# 7. Existing Skills — Suggested Type Affinities

These affinities are useful for spatial placement only.

| Skill | Primary demo affinity | Secondary affinities / notes |
|---|---|---|
| SK01 Self-Awareness | General | Can appear in Stress & Growth rather than a fixed cone |
| SK02 Emotional Regulation | General | Broad-resilience area |
| SK03 Prioritisation | 3 / 1 | Also useful in 7 fortification |
| SK04 Focus & Follow-Through | 1 / 3 | Useful in 7 and 4 fortification |
| SK05 Adaptability | 7 | Also general Stress & Growth resource |
| SK06 Active & Consultative Listening | 9 / 2 | Strong team relevance |
| SK07 Assertive Communication | 8 | Common fortification resource |
| SK08 Boundary Setting | 8 / 1 | Type 2 may also develop it for balance |
| SK09 Feedback Integration | 4 / 1 | Especially useful in creative/delivery routes |
| SK10 Strategic Communication | 5 / 3 | Complex thought → clear action |
| SK11 Stakeholder Empathy & Trust | 2 / 6 | Relationship and credibility |
| SK12 Decision-Making Under Uncertainty | 6 / 8 / 3 | Also general Stress & Growth |
| SK13 Risk Judgement | 6 / 5 | Strong analysis / preparedness link |
| SK14 Iterative Execution | 3 / 7 | Possibility → action |
| SK15 Delegation & Empowerment | 8 / 3 | Leadership application |
| SK16 Constructive Conflict | 8 / 9 | Directness + integration |
| SK17 Facilitation & Perspective Integration | 9 | Advanced integration |
| SK18 Collaborative Influence | 2 / 3 / 9 | Relational influence / momentum |

---

# 8. Existing Courses — Suggested Map Affinities

These are **display affinities**, not permanent course ownership.

| Course | Suggested anchor(s) | Useful map roles |
|---|---|---|
| C01 Know Your Pattern | General | Stress & Growth foundation |
| C02 Staying Effective Under Pressure | General | Stress & Growth foundation |
| C03 Working Beyond Your Default | General / connection-dependent | Stress & Growth bridge |
| C04 Finding Your Voice | 8 | Fortification / assertiveness |
| C05 Healthy Boundaries at Work | 8 / 1 | Fortification / foundation |
| C06 Constructive Conflict | 8 / 9 | Fortification, Strengths, Team |
| C07 Difficult Conversations | 8 / 9 | Advanced fortification / Team |
| C08 Listening Before Leading | 9 / 2 | Strengths, Team, fortification depending learner |
| C09 Collaborative Influence | 2 / 3 / 9 | Strengths / Team |
| C10 Decisions Without Certainty | 6 / 8 / 3 | Stress & Growth / Fortification |
| C11 Calibrating Risk | 6 / 5 | Strengths / Fortification |
| C12 Priorities That Hold | 3 / 1 | Fortification |
| C13 From Analysis to Action | 3 / 5 | Fortification / Stress & Growth |
| C14 From Idea to Delivery | 7 / 3 | Strengths / Fortification |
| C15 Feedback Without Losing the Work | 4 / 1 | Strengths / Fortification |
| C16 Delegating for Ownership | 8 / 3 | Strengths / Fortification |
| C17 Leading with Strength and Space | 8 / 3 | Strength mastery / Team |
| C18 Strategic Communication | 5 / 3 | Strengths / Fortification |
| C19 Sustainable Execution | 3 / 1 / 7 | Fortification / advanced execution |
| C20 Facilitating Productive Disagreement | 9 / 8 | Strength mastery / Team |
| C21 Consultative Stakeholder Conversations | 2 / 6 | Strengths / Team |
| C22 High-Trust Team Decisions | Team | Shared team outer-ring learning |

---

# 9. New Type-Anchored Development Course Family

The existing 22-course catalogue is strong for general professional development, but the new wheel benefits from at least one **recognisable type-anchored development course** per sector.

These are optional demo additions.

They can use placeholder lesson content just like the rest of the catalogue.

## T01 — Standards Without Rigidity
**Type affinity:** 1  
**Purpose:** Turn strong standards into disciplined improvement without over-control or perfectionistic delay.  
**Primary skills:** Prioritisation; Focus & Follow-Through  
**Level:** Intermediate  
**Useful in:** Strengths for Type 1 profiles; Fortification for others.

## T02 — Support With Sustainable Boundaries
**Type affinity:** 2  
**Purpose:** Combine warmth and responsiveness with clearer limits, direct requests and sustainable contribution.  
**Primary skills:** Stakeholder Empathy & Trust; Boundary Setting  
**Level:** Intermediate  
**Useful in:** Strengths for Type 2 profiles; Fortification for others.

## T03 — Competition as Transformation
**Type affinity:** 3  
**Purpose:** Use goals, performance feedback and healthy competition as information for growth rather than as a measure of personal worth.  
**Primary skills:** Prioritisation; Focus & Follow-Through; Adaptability  
**Level:** Intermediate  
**Useful in:** Strengths for Type 3 profiles; Fortification for others.

## T04 — Creative Identity Into Contribution
**Type affinity:** 4  
**Purpose:** Turn originality and personal meaning into work that can absorb feedback, constraints and collaborative refinement.  
**Primary skills:** Feedback Integration; Adaptability  
**Level:** Intermediate  
**Useful in:** Strengths for Type 4 profiles; Fortification for others.

## T05 — Strategic Detachment
**Type affinity:** 5  
**Purpose:** Use analytical distance and specialist depth to clarify complex situations while remaining connected to decisions and action.  
**Primary skills:** Risk Judgement; Strategic Communication  
**Level:** Intermediate  
**Useful in:** Strengths for Type 5 profiles; Fortification for others.

## T06 — Risk as Information
**Type affinity:** 6  
**Purpose:** Convert vigilance and questioning into proportionate preparation, clearer thresholds and confident action.  
**Primary skills:** Risk Judgement; Decision-Making Under Uncertainty  
**Level:** Intermediate  
**Useful in:** Strengths for Type 6 profiles; Fortification for others.

## T07 — Possibility Into Experiment
**Type affinity:** 7  
**Purpose:** Convert options and curiosity into focused experiments, useful constraints and learning through action.  
**Primary skills:** Adaptability; Iterative Execution  
**Level:** Intermediate  
**Useful in:** Strengths for Type 7 profiles; Fortification for others.

## T08 — Assertiveness and Clean Boundaries
**Type affinity:** 8  
**Purpose:** Practise directness, protective clarity and decisive action while keeping challenge proportionate and relationally workable.  
**Primary skills:** Assertive Communication; Boundary Setting; Constructive Conflict  
**Level:** Intermediate  
**Useful in:** Strengths for Type 8 profiles; Fortification for others.

## T09 — From Harmony to Facilitative Leadership
**Type affinity:** 9  
**Purpose:** Develop perspective holding and mediation into active facilitation, visible priorities and confident group leadership.  
**Primary skills:** Active Listening; Facilitation & Perspective Integration; Collaborative Influence  
**Level:** Advanced  
**Useful in:** Strengths for Type 9 profiles; Fortification for others.

---

# 10. STRENGTHS Map

## 10.1 Activation rule

Highlight only the learner's top-three sectors.

All other type sectors remain visible but subdued.

Examples:

- Emily: **9 / 2 / 6**
- James: **8 / 3 / 1**
- Sophie: **4 / 7 / 1**
- Thomas: **5 / 6 / 7**
- Sarah: **9 / 5 / 3**
- Oliver: **3 / 7 / 8**

## 10.2 Placement rule

Courses / capabilities should be placed:

1. in one of the three active sectors;
2. closer to the centre when foundation / first-practice learning;
3. further outward when intermediate / advanced;
4. along a connected radial chain where a genuine pathway or prerequisite exists.

## 10.3 Emily example

### Type 9 — Integration / facilitation
Potential nodes:

- SK06 Active & Consultative Listening
- SK16 Constructive Conflict
- SK17 Facilitation & Perspective Integration
- C08 Listening Before Leading
- C20 Facilitating Productive Disagreement
- T09 From Harmony to Facilitative Leadership

Possible progression:

**Listening → Constructive Conflict → Facilitation → Facilitative Leadership**

### Type 2 — Relational influence
Potential nodes:

- SK11 Stakeholder Empathy & Trust
- SK18 Collaborative Influence
- C09 Collaborative Influence
- C21 Consultative Stakeholder Conversations
- T02 Support With Sustainable Boundaries

### Type 6 — Preparedness / risk
Potential nodes:

- SK13 Risk Judgement
- SK12 Decision-Making Under Uncertainty
- C11 Calibrating Risk
- T06 Risk as Information

Because Emily's current personal recommendation map does not prioritise all of these courses, the UI may distinguish:

- **Recommended for you**
- **Explore this strength**
- **Advanced option**

The map does not need to imply equal recommendation priority.

---

# 11. STRESS & GROWTH Map

## 11.1 Classic connection table

For demo purposes, use the conventional direction pair:

| Primary type | Pressure / stress direction | Growth direction |
|---|---:|---:|
| 1 | 4 | 7 |
| 2 | 8 | 4 |
| 3 | 9 | 6 |
| 4 | 2 | 1 |
| 5 | 7 | 8 |
| 6 | 3 | 9 |
| 7 | 1 | 5 |
| 8 | 5 | 2 |
| 9 | 6 | 3 |

This is a structural Enneagram reference, but the app should preserve the more nuanced framing already used elsewhere:

- a stress-connected type is not simply "bad";
- both connected patterns may contain useful resources;
- the map is for awareness and response flexibility.

## 11.2 Wheel activation

Highlight:

- the primary type;
- the stress-connected type;
- the growth-connected type.

Other sectors remain subdued.

For Emily:

- origin: **9**
- pressure: **6**
- growth resource: **3**

## 11.3 Type-linked learning

### Type 6 / pressure-side examples for Emily
- SK13 Risk Judgement
- SK12 Decision-Making Under Uncertainty
- C10 Decisions Without Certainty
- T06 Risk as Information

### Type 3 / growth-resource examples for Emily
- SK03 Prioritisation
- SK04 Focus & Follow-Through
- SK14 Iterative Execution
- C12 Priorities That Hold
- C13 From Analysis to Action
- T03 Competition as Transformation

These are illustrative growth resources, not a claim that all Type 9 growth must use these exact courses.

## 11.4 General resilience tray beneath the wheel

Some learning should remain explicitly **type-independent**.

Recommended general courses:

- C01 Know Your Pattern
- C02 Staying Effective Under Pressure
- C03 Working Beyond Your Default

General capabilities:

- SK01 Self-Awareness
- SK02 Emotional Regulation
- SK05 Adaptability

Optional panel title:

### Core Resilience Skills

Description:

> These capabilities support effective development across all profile patterns and do not need to be assigned to a specific Enneagram sector.

---

# 12. FORTIFICATION Map

## 12.1 Purpose

Fortification uses the nine-sector wheel in the inverse way to Strengths.

The learner's top-three sectors are muted.

The other six become the primary exploration territory.

Conceptually:

> **What useful capabilities sit outside my most familiar operating range?**

## 12.2 Important interpretation rule

The interface should make clear that:

- unfamiliar is not inferior;
- lower profile prominence is not lower skill;
- capabilities shown in another type's territory are still available to everyone.

## 12.3 Emily example — 9 / 2 / 6 muted

Active sectors:

- 1
- 3
- 4
- 5
- 7
- 8

Possible learning by sector:

### Type 1 — Standards & disciplined improvement
- SK03 Prioritisation
- SK04 Focus & Follow-Through
- C12 Priorities That Hold
- T01 Standards Without Rigidity

### Type 3 — Agency & execution
- SK14 Iterative Execution
- SK04 Focus & Follow-Through
- C13 From Analysis to Action
- C19 Sustainable Execution
- T03 Competition as Transformation

### Type 4 — Creative ownership / feedback
- SK09 Feedback Integration
- C15 Feedback Without Losing the Work
- T04 Creative Identity Into Contribution

### Type 5 — Analysis & strategic depth
- SK10 Strategic Communication
- SK13 Risk Judgement
- C18 Strategic Communication
- C11 Calibrating Risk
- T05 Strategic Detachment

### Type 7 — Possibility & experimentation
- SK05 Adaptability
- SK14 Iterative Execution
- C14 From Idea to Delivery
- T07 Possibility Into Experiment

### Type 8 — Directness / boundaries / action
This is especially relevant to Emily.

- SK07 Assertive Communication
- SK08 Boundary Setting
- SK16 Constructive Conflict
- C05 Healthy Boundaries at Work
- C04 Finding Your Voice
- C06 Constructive Conflict
- C07 Difficult Conversations
- T08 Assertiveness and Clean Boundaries

A strong Emily fortification route can remain:

**Healthy Boundaries → Finding Your Voice → Constructive Conflict → Difficult Conversations / Facilitating Productive Disagreement**

---

# 13. TEAM Map — Shared Nine-Type Distribution

The Team view can use the nine-sector wheel differently again.

Rather than showing only the current learner, overlay the top-three profiles of all members.

## 13.1 Team Atlas distribution

### Emily
9 / 2 / 6

### James
8 / 3 / 1

### Sophie
4 / 7 / 1

### Thomas
5 / 6 / 7

### Type coverage

| Type | Team Atlas members |
|---|---|
| 1 | James, Sophie |
| 2 | Emily |
| 3 | James |
| 4 | Sophie |
| 5 | Thomas |
| 6 | Emily, Thomas |
| 7 | Sophie, Thomas |
| 8 | James |
| 9 | Emily |

Team Atlas therefore has **at least one top-three signal in every one of the nine sectors**.

This is a useful demo feature.

Overlap sectors:

- **Type 1:** James + Sophie
- **Type 6:** Emily + Thomas
- **Type 7:** Sophie + Thomas

## 13.2 Team Beacon distribution

### Sarah
9 / 5 / 3

### Oliver
3 / 7 / 8

| Type | Team Beacon members |
|---|---|
| 1 | — |
| 2 | — |
| 3 | Sarah, Oliver |
| 4 | — |
| 5 | Sarah |
| 6 | — |
| 7 | Oliver |
| 8 | Oliver |
| 9 | Sarah |

Primary overlap:

- **Type 3:** Sarah + Oliver

This gives Team Beacon a very different visual density from Team Atlas.

---

# 14. New Type-Perspective Course Family for Team View

The Team wheel benefits from a basic learning item associated with each represented type.

These can be generated from a common template.

## TP01 — Understanding Type 1 at Work
Standards, improvement, quality, frustration and disciplined contribution.

## TP02 — Understanding Type 2 at Work
Support, relationship attention, helpfulness, expectations and boundaries.

## TP03 — Understanding Type 3 at Work
Goals, achievement, adaptation, momentum and visible performance.

## TP04 — Understanding Type 4 at Work
Meaning, originality, emotional depth, identity and creative contribution.

## TP05 — Understanding Type 5 at Work
Analysis, autonomy, knowledge, information boundaries and specialist depth.

## TP06 — Understanding Type 6 at Work
Preparedness, questioning, trust, uncertainty and risk awareness.

## TP07 — Understanding Type 7 at Work
Possibility, optimism, experimentation, options and future orientation.

## TP08 — Understanding Type 8 at Work
Directness, autonomy, protection, challenge and decisive action.

## TP09 — Understanding Type 9 at Work
Harmony, mediation, perspective holding, inertia and inclusive steadiness.

**Level:** Foundation  
**Duration:** approximately 25–35 min  
**Team relevance:** Both  
**Content:** Course content will go here.

These courses exist primarily to demonstrate team-profile learning pathways and can be templated rather than authored as nine fully distinct curricula.

---

# 15. New Overlap / Collaboration Learning Nodes

Where multiple team members share a top-three type sector, the map can add a collaboration course or learning node.

These are contextual demo courses / workshops.

## Team Atlas

### Type 1 overlap — James + Sophie
**COL01 — Aligning Standards Without Gridlock**

**Purpose:** Help colleagues distinguish shared quality standards from competing definitions of what “good enough” requires.

**Skills:** Feedback Integration; Prioritisation; Constructive Conflict

---

### Type 6 overlap — Emily + Thomas
**COL06 — Working Together Through Risk & Uncertainty**

**Purpose:** Use preparation, questioning and risk awareness constructively without allowing uncertainty to stall action or amplify reassurance loops.

**Skills:** Risk Judgement; Decision-Making Under Uncertainty; Strategic Communication

---

### Type 7 overlap — Sophie + Thomas
**COL07 — Exploration With Decision Discipline**

**Purpose:** Use possibility generation and scenario exploration while establishing clear thresholds for commitment and closure.

**Skills:** Adaptability; Prioritisation; Iterative Execution

---

## Team Beacon

### Type 3 overlap — Sarah + Oliver
**COL03 — Ambition, Momentum & Credible Commitment**

**Purpose:** Align achievement energy and opportunity pursuit with realistic delivery capacity and explicit commitments.

**Skills:** Prioritisation; Collaborative Influence; Focus & Follow-Through

---

# 16. TEAM Map — Radial Meaning

A useful team radial structure is:

### Inner ring
**Understand the perspective**

Type-perspective courses such as:

- Understanding Type 6 at Work
- Understanding Type 8 at Work

### Middle ring
**Collaborate across or within patterns**

Examples:

- COL06 Working Together Through Risk & Uncertainty
- COL01 Aligning Standards Without Gridlock
- pair-specific learning / relationship workshops

### Outer ring
**Shared team capability**

Examples:

- C08 Listening Before Leading
- C06 Constructive Conflict
- C10 Decisions Without Certainty
- C20 Facilitating Productive Disagreement
- C22 High-Trust Team Decisions

This gives the Team wheel a clear progression from:

**understand → collaborate → develop collectively**

---

# 17. Team View — General Learning Below the Wheel

Below the Team wheel, use a 50 / 50 layout.

## 17.1 Left — My Team Skills

This area contains broadly useful individual learning that improves work across multiple relationships.

Suggested catalogue courses:

- C08 Listening Before Leading
- C09 Collaborative Influence
- C06 Constructive Conflict
- C21 Consultative Stakeholder Conversations

Possible description:

> Build capabilities that improve collaboration across many working styles, regardless of any one colleague's profile.

For Emily, prioritise according to her existing recommendation data rather than showing all options equally.

---

## 17.2 Right — Shared Team Learning

This area contains courses the team takes together.

### Team Atlas pathway

**From Diverse Perspectives to Confident Decisions**

1. C08 Listening Before Leading
2. C06 Constructive Conflict
3. C10 Decisions Without Certainty
4. C20 Facilitating Productive Disagreement
5. C22 High-Trust Team Decisions

### Team Beacon pathway

**From Opportunity to Credible Commitment**

1. C21 Consultative Stakeholder Conversations
2. C12 Priorities That Hold
3. C10 Decisions Without Certainty
4. C19 Sustainable Execution
5. C22 High-Trust Team Decisions

Possible description:

> Shared learning helps the team build practices that no single profile can supply on its own.

---

# 18. Map Selection and Sidebar Content

The right-hand panel can operate as:

1. **Mode introduction**
2. **Selected node inspector**

## 18.1 Mode intro priorities

### All
Explain the four development worlds.

### Strengths
Explain:
> develop what already comes naturally into deliberate mastery.

### Stress & Growth
Explain:
> recognise pressure, regulate and access a wider response range.

### Fortification
Explain:
> deliberately build capabilities associated with less familiar operating territories.

### Team
Explain:
> understand different working styles, collaborate across overlaps/differences and build shared capability.

## 18.2 Selected course inspector

Recommended information order:

### Category / role
Examples:
- Strength Mastery
- Fortification
- Growth Resource
- Shared Team Learning

### Course title

### Why it appears here

### Skills developed

### Relationship to the selected type / profile / team

### Level and duration

### Learning status
Not Started / In Progress / Completed

### Pathway / unlock relationships

### Action
Inspect / Continue / Start

Again, **learning status should not dominate the top of the panel**.

---

# 19. Unlocking and Course Chains

Hard locks should only be used where a genuine demo pathway has intentionally been defined.

Existing usable chains include:

## Assertiveness / Conflict
C05 Healthy Boundaries  
→ C04 Finding Your Voice  
→ C06 Constructive Conflict  
→ C07 Difficult Conversations  
→ C20 Facilitating Productive Disagreement

## Analysis → Action
C11 Calibrating Risk  
→ C10 Decisions Without Certainty  
→ C13 From Analysis to Action  
→ C19 Sustainable Execution

## Collaborative Leadership
C08 Listening Before Leading  
→ C09 Collaborative Influence  
→ C16 Delegating for Ownership  
→ C17 Leading with Strength and Space

## Creative Delivery
C12 Priorities That Hold  
→ C14 From Idea to Delivery  
→ C15 Feedback Without Losing the Work  
→ C19 Sustainable Execution

## Team Decisions
C08 Listening Before Leading  
→ C06 Constructive Conflict  
→ C20 Facilitating Productive Disagreement  
→ C22 High-Trust Team Decisions

## Stress / Flexibility
C01 Know Your Pattern  
→ C02 Staying Effective Under Pressure  
→ C03 Working Beyond Your Default  
→ profile-specific branch

Where a relationship is only conceptual rather than a formal prerequisite, use softer language:

- supports;
- contributes to;
- builds toward;
- related capability.

---

# 20. Important Content-Model Distinction

The underlying course catalogue should remain reusable and assessment-agnostic.

The new wheel-specific content should therefore ideally exist as **display / recommendation metadata**, for example:

```text
MapPlacement
- mode
- learner_id / team_id
- object_id
- sector_type
- radial_band
- relationship_role
- recommendation_weight
- connected_object_ids
- is_unlock_dependency
```

The course itself remains:

```text
Course
- id
- title
- skills
- level
- duration
- prerequisites
- etc.
```

This means a future non-Enneagram assessment can create a completely different map without rewriting the learning catalogue.

---

# 21. Recommended Interpretation for the Demo

The revised Development Map demonstrates four different ways the same learning architecture can be organised.

## Strengths
**Learning organised by what the learner already naturally brings.**

## Stress & Growth
**Learning organised by dynamic pressure and response flexibility.**

## Fortification
**Learning organised by capabilities outside the learner's dominant profile.**

## Team
**Learning organised by the distribution and interaction of multiple people.**

The Enneagram provides a useful nine-part scaffold for the demo, but it is not the product itself.

The long-term product idea is broader:

> assessment information can be transformed into interactive learning landscapes that make recommendation logic, progression and capability-building visible.
