# Enneagram Demo LMS — Skills, Courses and Individual Recommendation Map

**Status:** Working demo content architecture  
**Scope:** Compact skills taxonomy, compact course catalogue, course-linking metadata, and recommendations for the six fixed demo personas.  
**Purpose:** Demonstrate personalised development pathways without producing full course content.

---

# 1. Design Principles

The demo should make the **learning architecture** richer than the actual course content.

A course page therefore needs enough information to feel real and to support pathway visualisation, but the lesson body can simply display:

> **Course content will go here.**

The important demonstration is:

**Personality signal → development theme → skill → course → pathway → next capability**

Courses should **not** be hard-coded directly to Enneagram types. The same course can be recommended to different people for different reasons.

The four development territories remain:

1. **Strengthen Strengths**
2. **Optimise Stress Management & Growth**
3. **Fortify Areas of Growth**
4. **Team Development**

---

# 2. Compact Skills Taxonomy

The demo uses **18 skills**. These are ordinary professional capabilities that exist independently of the Enneagram.

## A. Self-Leadership

### SK01 — Self-Awareness
Recognising habitual reactions, motives, blind spots and behavioural patterns early enough to choose a response rather than simply repeat it.

### SK02 — Emotional Regulation
Remaining engaged and effective when emotions, frustration, pressure or uncertainty intensify.

### SK03 — Prioritisation
Identifying what matters most, making trade-offs and protecting important work from competing demands or attractive distractions.

### SK04 — Focus & Follow-Through
Sustaining attention and effort through completion rather than losing momentum, over-refining or continually reopening choices.

### SK05 — Adaptability
Adjusting behaviour and approach when circumstances change while retaining clarity about the objective.

---

## B. Communication & Relationships

### SK06 — Active & Consultative Listening
Listening for meaning, reservations, needs and perspectives before moving toward advice, persuasion or decisions.

### SK07 — Assertive Communication
Expressing needs, priorities, positions and disagreement clearly while preserving respect and connection.

### SK08 — Boundary Setting
Establishing sustainable limits around responsibilities, support, workload and interpersonal expectations.

### SK09 — Feedback Integration
Giving, receiving and using feedback without becoming defensive, over-accommodating or losing ownership of the work.

### SK10 — Strategic Communication
Turning complex thinking into clear, timely and audience-appropriate communication that helps others act.

### SK11 — Stakeholder Empathy & Trust
Understanding stakeholder motivations and concerns while building credibility through realistic expectations and dependable commitments.

---

## C. Decisions & Execution

### SK12 — Decision-Making Under Uncertainty
Making proportionate, timely decisions when information is incomplete and certainty is unavailable.

### SK13 — Risk Judgement
Identifying, testing and calibrating risks without either dismissing them or allowing them to dominate the decision.

### SK14 — Iterative Execution
Moving from concept to action through manageable steps, feedback and refinement rather than waiting for a perfect final solution.

### SK15 — Delegation & Empowerment
Transferring meaningful ownership while setting clear expectations and resisting unnecessary control.

---

## D. Collaboration & Leadership

### SK16 — Constructive Conflict
Engaging disagreement directly and productively without avoiding, personalising or unnecessarily escalating it.

### SK17 — Facilitation & Perspective Integration
Helping groups surface different perspectives, find common ground and move toward useful decisions.

### SK18 — Collaborative Influence
Creating momentum and commitment through clarity, credibility, listening and participation rather than relying mainly on authority, force or persuasion.

---

# 3. Skill Relationships

The skills form a network rather than a flat list.

Examples:

**Self-Awareness + Emotional Regulation → Constructive Conflict**

**Active Listening + Assertive Communication → Constructive Conflict**

**Active Listening + Constructive Conflict → Facilitation & Perspective Integration**

**Risk Judgement + Prioritisation → Decision-Making Under Uncertainty**

**Decision-Making Under Uncertainty + Iterative Execution → Focus & Follow-Through**

**Strategic Communication + Active Listening → Collaborative Influence**

**Delegation + Collaborative Influence → Empowering Leadership**

**Stakeholder Empathy + Strategic Communication → Stakeholder Trust**

These relationships can later be rendered as a professional skill graph or “forging” interface.

---

# 4. Course Metadata Model

Each course should support the following metadata.

| Field | Purpose |
|---|---|
| **Course ID** | Stable internal identifier |
| **Title** | User-facing course name |
| **Short Description** | One-paragraph summary |
| **Primary Skill** | Main capability developed |
| **Secondary Skills** | Additional skills supported |
| **Level** | Foundation / Intermediate / Advanced |
| **Duration** | Approximate demo duration |
| **Development Territories** | One or more of the four pathway families |
| **Prerequisites** | Required prior courses, if any |
| **Recommended Next** | Courses that naturally follow |
| **Related Courses** | Useful lateral connections |
| **Team Relevance** | Individual / Team / Both |
| **Outline** | Optional 3–5 module headings |
| **Content Status** | Demo placeholder |

## Recommendation metadata

The recommendation itself should be stored separately from the course.

A recommendation can therefore contain:

- learner;
- course;
- priority;
- development territory;
- reason;
- contributing profile signals;
- related strength/challenge/blind spot;
- pathway position.

This allows the **same course** to be recommended for different reasons.

---

# 5. Compact Demo Course Catalogue

The catalogue contains **22 courses**.

## C01 — Know Your Pattern

**Description:** Build practical awareness of habitual strengths, reactions and blind spots, and learn to recognise when a useful default pattern has become automatic or overused.

- **Primary skill:** SK01 Self-Awareness
- **Secondary skills:** SK02 Emotional Regulation
- **Level:** Foundation
- **Duration:** 35 min
- **Territories:** Strengthen Strengths; Optimise Stress Management & Growth
- **Prerequisite:** None
- **Recommended next:** C02, C03
- **Team relevance:** Individual
- **Outline:** Your default pattern; Strength versus overuse; Recognising early signals; Choosing rather than reacting
- **Content:** Course content will go here.

---

## C02 — Staying Effective Under Pressure

**Description:** Recognise personal stress signals early and use practical regulation techniques to remain engaged, proportionate and effective.

- **Primary skill:** SK02 Emotional Regulation
- **Secondary skills:** SK01 Self-Awareness, SK05 Adaptability
- **Level:** Foundation
- **Duration:** 45 min
- **Territories:** Optimise Stress Management & Growth
- **Prerequisite:** C01 recommended
- **Recommended next:** C10, C15
- **Team relevance:** Both
- **Outline:** Stress signatures; Early warning signs; Regulation; Re-engagement
- **Content:** Course content will go here.

---

## C03 — Working Beyond Your Default

**Description:** Practise deliberately accessing alternative ways of thinking, relating and acting when your usual strategy is not the best fit for the situation.

- **Primary skill:** SK05 Adaptability
- **Secondary skills:** SK01 Self-Awareness
- **Level:** Intermediate
- **Duration:** 45 min
- **Territories:** Optimise Stress Management & Growth
- **Prerequisite:** C01
- **Recommended next:** Profile-dependent
- **Team relevance:** Individual
- **Outline:** Default strategies; Alternative responses; Growth resources; Behavioural experiments
- **Content:** Course content will go here.

---

## C04 — Finding Your Voice

**Description:** Learn to state preferences, needs and positions earlier and more clearly without becoming unnecessarily confrontational.

- **Primary skill:** SK07 Assertive Communication
- **Secondary skills:** SK08 Boundary Setting
- **Level:** Foundation
- **Duration:** 45 min
- **Territories:** Fortify Areas of Growth
- **Prerequisite:** None
- **Recommended next:** C06, C07
- **Team relevance:** Both
- **Outline:** Passive–assertive–aggressive; Stating a position; Making requests; Saying what you need
- **Content:** Course content will go here.

---

## C05 — Healthy Boundaries at Work

**Description:** Establish clear, sustainable limits while remaining supportive, collaborative and responsive to legitimate needs.

- **Primary skill:** SK08 Boundary Setting
- **Secondary skills:** SK07 Assertive Communication, SK03 Prioritisation
- **Level:** Foundation
- **Duration:** 40 min
- **Territories:** Fortify Areas of Growth
- **Prerequisite:** None
- **Recommended next:** C04, C06
- **Team relevance:** Individual
- **Outline:** Boundary signals; Workload and relational limits; Saying no; Renegotiating expectations
- **Content:** Course content will go here.

---

## C06 — Constructive Conflict

**Description:** Engage disagreement as useful information, surface competing needs and move toward resolution without avoidance or escalation.

- **Primary skill:** SK16 Constructive Conflict
- **Secondary skills:** SK06 Active Listening, SK07 Assertive Communication, SK02 Emotional Regulation
- **Level:** Intermediate
- **Duration:** 60 min
- **Territories:** Fortify Areas of Growth; Team Development
- **Prerequisite:** C04 or C08 recommended
- **Recommended next:** C07, C20
- **Team relevance:** Both
- **Outline:** Conflict styles; Surfacing disagreement; Staying engaged; Finding the real issue; Moving forward
- **Content:** Course content will go here.

---

## C07 — Difficult Conversations

**Description:** Combine listening, assertion and emotional regulation to navigate high-stakes conversations where relationships and outcomes both matter.

- **Primary skill:** SK16 Constructive Conflict
- **Secondary skills:** SK07 Assertive Communication, SK06 Active Listening, SK02 Emotional Regulation
- **Level:** Advanced
- **Duration:** 70 min
- **Territories:** Fortify Areas of Growth; Team Development
- **Prerequisite:** C06
- **Recommended next:** C20
- **Team relevance:** Both
- **Outline:** Preparing the conversation; Opening clearly; Handling reactions; Maintaining boundaries; Agreeing next steps
- **Content:** Course content will go here.

---

## C08 — Listening Before Leading

**Description:** Develop disciplined listening that surfaces reservations, competing perspectives and information that can disappear when a leader moves too quickly toward a solution.

- **Primary skill:** SK06 Active & Consultative Listening
- **Secondary skills:** SK18 Collaborative Influence, SK11 Stakeholder Empathy & Trust
- **Level:** Foundation
- **Duration:** 40 min
- **Territories:** Strengthen Strengths; Fortify Areas of Growth; Team Development
- **Prerequisite:** None
- **Recommended next:** C06, C09
- **Team relevance:** Both
- **Outline:** Listening versus waiting; Questions before solutions; Hearing dissent; Confirming understanding
- **Content:** Course content will go here.

---

## C09 — Collaborative Influence

**Description:** Build commitment through participation, credibility and clear reasoning rather than relying primarily on authority, force or enthusiasm.

- **Primary skill:** SK18 Collaborative Influence
- **Secondary skills:** SK06 Active Listening, SK10 Strategic Communication
- **Level:** Intermediate
- **Duration:** 55 min
- **Territories:** Strengthen Strengths; Fortify Areas of Growth; Team Development
- **Prerequisite:** C08 recommended
- **Recommended next:** C17, C20
- **Team relevance:** Both
- **Outline:** Influence styles; Creating ownership; Inviting challenge; Building commitment
- **Content:** Course content will go here.

---

## C10 — Decisions Without Certainty

**Description:** Make timely, proportionate decisions when information is incomplete by defining decision thresholds, calibrating risk and committing to action.

- **Primary skill:** SK12 Decision-Making Under Uncertainty
- **Secondary skills:** SK13 Risk Judgement, SK03 Prioritisation
- **Level:** Intermediate
- **Duration:** 55 min
- **Territories:** Fortify Areas of Growth; Optimise Stress Management & Growth
- **Prerequisite:** None
- **Recommended next:** C11, C13
- **Team relevance:** Both
- **Outline:** What certainty is enough?; Decision thresholds; Reversible versus irreversible choices; Commit and review
- **Content:** Course content will go here.

---

## C11 — Calibrating Risk

**Description:** Distinguish meaningful risks from low-probability noise and decide how much analysis, mitigation or monitoring each risk actually deserves.

- **Primary skill:** SK13 Risk Judgement
- **Secondary skills:** SK12 Decision-Making Under Uncertainty
- **Level:** Intermediate
- **Duration:** 45 min
- **Territories:** Strengthen Strengths; Fortify Areas of Growth
- **Prerequisite:** None
- **Recommended next:** C10, C19
- **Team relevance:** Both
- **Outline:** Risk versus uncertainty; Probability and impact; Analysis limits; Mitigation and monitoring
- **Content:** Course content will go here.

---

## C12 — Priorities That Hold

**Description:** Convert competing goals and attractive opportunities into explicit priorities, trade-offs and protected commitments.

- **Primary skill:** SK03 Prioritisation
- **Secondary skills:** SK04 Focus & Follow-Through, SK12 Decision-Making Under Uncertainty
- **Level:** Foundation
- **Duration:** 45 min
- **Territories:** Fortify Areas of Growth
- **Prerequisite:** None
- **Recommended next:** C13, C19
- **Team relevance:** Both
- **Outline:** Priority versus preference; Trade-offs; Capacity; Protecting the chosen path
- **Content:** Course content will go here.

---

## C13 — From Analysis to Action

**Description:** Recognise when further thinking has diminishing returns and convert sound analysis into a clear next action, experiment or decision.

- **Primary skill:** SK14 Iterative Execution
- **Secondary skills:** SK12 Decision-Making Under Uncertainty, SK04 Focus & Follow-Through
- **Level:** Intermediate
- **Duration:** 50 min
- **Territories:** Fortify Areas of Growth; Optimise Stress Management & Growth
- **Prerequisite:** C10 recommended
- **Recommended next:** C19
- **Team relevance:** Individual
- **Outline:** Analysis thresholds; Smallest useful action; Experiments; Learning through movement
- **Content:** Course content will go here.

---

## C14 — From Idea to Delivery

**Description:** Turn creative possibilities into deliverable work through constraints, sequencing, iteration and explicit completion criteria.

- **Primary skill:** SK14 Iterative Execution
- **Secondary skills:** SK03 Prioritisation, SK04 Focus & Follow-Through, SK05 Adaptability
- **Level:** Intermediate
- **Duration:** 55 min
- **Territories:** Strengthen Strengths; Fortify Areas of Growth
- **Prerequisite:** C12 recommended
- **Recommended next:** C15
- **Team relevance:** Both
- **Outline:** Define the outcome; Useful constraints; Iteration; Definition of done
- **Content:** Course content will go here.

---

## C15 — Feedback Without Losing the Work

**Description:** Use feedback as information while retaining ownership, distinguishing essential improvement from preference and avoiding defensive or endless revision cycles.

- **Primary skill:** SK09 Feedback Integration
- **Secondary skills:** SK02 Emotional Regulation, SK05 Adaptability
- **Level:** Intermediate
- **Duration:** 45 min
- **Territories:** Strengthen Strengths; Fortify Areas of Growth
- **Prerequisite:** None
- **Recommended next:** C14, C20
- **Team relevance:** Both
- **Outline:** Receiving feedback; Separating signal from preference; Responding without defensiveness; Closing the loop
- **Content:** Course content will go here.

---

## C16 — Delegating for Ownership

**Description:** Transfer responsibility clearly, establish decision boundaries and support others without reclaiming control when their approach differs from yours.

- **Primary skill:** SK15 Delegation & Empowerment
- **Secondary skills:** SK18 Collaborative Influence, SK11 Stakeholder Empathy & Trust
- **Level:** Intermediate
- **Duration:** 55 min
- **Territories:** Fortify Areas of Growth; Strengthen Strengths
- **Prerequisite:** None
- **Recommended next:** C17
- **Team relevance:** Both
- **Outline:** What to delegate; Outcomes and boundaries; Check-ins; Resisting re-control
- **Content:** Course content will go here.

---

## C17 — Leading with Strength and Space

**Description:** Combine decisiveness and standards with receptivity, psychological space and genuine participation from others.

- **Primary skill:** SK18 Collaborative Influence
- **Secondary skills:** SK15 Delegation, SK06 Active Listening
- **Level:** Advanced
- **Duration:** 65 min
- **Territories:** Strengthen Strengths; Fortify Areas of Growth; Team Development
- **Prerequisite:** C08 and C16 recommended
- **Recommended next:** C20
- **Team relevance:** Both
- **Outline:** Strength versus force; Space for dissent; Shared ownership; Decisive closure
- **Content:** Course content will go here.

---

## C18 — Strategic Communication

**Description:** Translate complex analysis, priorities or recommendations into concise messages that make the decision, rationale and required action visible.

- **Primary skill:** SK10 Strategic Communication
- **Secondary skills:** SK18 Collaborative Influence
- **Level:** Intermediate
- **Duration:** 50 min
- **Territories:** Strengthen Strengths; Fortify Areas of Growth
- **Prerequisite:** None
- **Recommended next:** C09, C20
- **Team relevance:** Both
- **Outline:** Audience and purpose; Lead with the point; Evidence without overload; Clear asks
- **Content:** Course content will go here.

---

## C19 — Sustainable Execution

**Description:** Balance opportunity, ambition and delivery capacity so that commitments remain credible and important work reaches completion.

- **Primary skill:** SK04 Focus & Follow-Through
- **Secondary skills:** SK03 Prioritisation, SK14 Iterative Execution
- **Level:** Intermediate
- **Duration:** 50 min
- **Territories:** Fortify Areas of Growth
- **Prerequisite:** C12 recommended
- **Recommended next:** C21
- **Team relevance:** Both
- **Outline:** Capacity reality; Commitment discipline; Completion; Review before expansion
- **Content:** Course content will go here.

---

## C20 — Facilitating Productive Disagreement

**Description:** Help a group surface competing perspectives, prevent domination or avoidance and convert disagreement into a clearer shared decision.

- **Primary skill:** SK17 Facilitation & Perspective Integration
- **Secondary skills:** SK16 Constructive Conflict, SK06 Active Listening, SK18 Collaborative Influence
- **Level:** Advanced
- **Duration:** 70 min
- **Territories:** Strengthen Strengths; Team Development
- **Prerequisite:** C06 recommended
- **Recommended next:** C22
- **Team relevance:** Both
- **Outline:** Preparing the room; Surfacing differences; Balancing voices; Integrating perspectives; Closing decisions
- **Content:** Course content will go here.

---

## C21 — Consultative Stakeholder Conversations

**Description:** Explore needs, reservations and constraints before advocating a solution, improving both trust and the quality of commitments.

- **Primary skill:** SK11 Stakeholder Empathy & Trust
- **Secondary skills:** SK06 Active Listening, SK10 Strategic Communication
- **Level:** Intermediate
- **Duration:** 55 min
- **Territories:** Strengthen Strengths; Fortify Areas of Growth
- **Prerequisite:** C08 recommended
- **Recommended next:** C09
- **Team relevance:** Both
- **Outline:** Discover before proposing; Hidden concerns; Testing assumptions; Credible commitments
- **Content:** Course content will go here.

---

## C22 — High-Trust Team Decisions

**Description:** Create a repeatable team process in which different working styles can contribute, disagreement is visible and decisions still reach timely closure.

- **Primary skill:** SK17 Facilitation & Perspective Integration
- **Secondary skills:** SK16 Constructive Conflict, SK12 Decision-Making Under Uncertainty, SK18 Collaborative Influence
- **Level:** Advanced
- **Duration:** 75 min
- **Territories:** Team Development
- **Prerequisite:** C06 and C10 recommended
- **Recommended next:** None
- **Team relevance:** Team
- **Outline:** Decision roles; Dissent before closure; Evidence thresholds; Commitment after decision
- **Content:** Course content will go here.

---

# 6. Course Network / Pathway Examples

The catalogue should support multiple intersecting routes.

## Assertiveness and Conflict Path

**C05 Healthy Boundaries at Work**  
→ **C04 Finding Your Voice**  
→ **C06 Constructive Conflict**  
→ **C07 Difficult Conversations**  
→ **C20 Facilitating Productive Disagreement**

## Analysis to Action Path

**C11 Calibrating Risk**  
→ **C10 Decisions Without Certainty**  
→ **C13 From Analysis to Action**  
→ **C19 Sustainable Execution**

## Collaborative Leadership Path

**C08 Listening Before Leading**  
→ **C09 Collaborative Influence**  
→ **C16 Delegating for Ownership**  
→ **C17 Leading with Strength and Space**

## Creative Delivery Path

**C12 Priorities That Hold**  
→ **C14 From Idea to Delivery**  
→ **C15 Feedback Without Losing the Work**  
→ **C19 Sustainable Execution**

## Team Decision Path

**C08 Listening Before Leading**  
→ **C06 Constructive Conflict**  
→ **C20 Facilitating Productive Disagreement**  
→ **C22 High-Trust Team Decisions**

## Stress and Flexibility Path

**C01 Know Your Pattern**  
→ **C02 Staying Effective Under Pressure**  
→ **C03 Working Beyond Your Default**  
→ then branch into a profile-specific skill course.

---

# 7. Individual Recommendation Maps

Each person receives **seven recommended courses**. The catalogue is intentionally reused: personalisation comes from the recommendation rationale and pathway context, not from creating a unique course for every learner.

Priority labels:

- **Core** — especially relevant to the person's current demo development story.
- **Recommended** — useful supporting development.
- **Strength Mastery** — develops an existing natural asset.

---

# Emily Carter — Client Success & Project Lead — 9 / 2 / 6

Emily's foundation profile identifies strong relationship-building, mediation and anticipation of team concerns, alongside development needs around boundaries, assertiveness, decision confidence and constructive conflict. Her stress story combines Nine disengagement with Six doubt. 

## Recommended courses

### 1. C20 — Facilitating Productive Disagreement
**Priority:** Strength Mastery  
**Territory:** Strengthen Strengths  
**Why:** Builds directly on Emily's natural mediation and team-cohesion strengths, moving harmony-building toward higher-level facilitation rather than simple accommodation.  
**Path:** Active listening strength → constructive conflict → facilitation.

### 2. C05 — Healthy Boundaries at Work
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Her 9/2 combination can make support and accommodation difficult to distinguish from taking on too much or suppressing her own priorities.

### 3. C04 — Finding Your Voice
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Helps Emily make her own position visible earlier while preserving the relational connection she values.

### 4. C06 — Constructive Conflict
**Priority:** Core  
**Territory:** Fortify Areas of Growth / Team Development  
**Why:** Directly addresses her tendency to delay disagreement until tension is already established.

### 5. C10 — Decisions Without Certainty
**Priority:** Recommended  
**Territory:** Optimise Stress Management & Growth  
**Why:** Supports decision confidence when consensus is unavailable and Six-like doubt begins to increase.

### 6. C02 — Staying Effective Under Pressure
**Priority:** Recommended  
**Territory:** Optimise Stress Management & Growth  
**Why:** Helps her recognise withdrawal, reassurance-seeking and interpersonal worry before these begin driving behaviour.

### 7. C09 — Collaborative Influence
**Priority:** Strength Mastery  
**Territory:** Strengthen Strengths  
**Why:** Converts her existing relational credibility into greater influence without requiring a forceful leadership style.

### Emily's visible pathway
**Healthy Boundaries → Finding Your Voice → Constructive Conflict → Facilitating Productive Disagreement**

---

# James Bennett — Commercial & Delivery Director — 8 / 3 / 1

James's profile combines decisive leadership, momentum, accountability and standards. His main development story concerns creating room for dissent, listening before deciding, delegating without controlling and retaining receptivity under challenge.

## Recommended courses

### 1. C17 — Leading with Strength and Space
**Priority:** Core  
**Territory:** Strengthen Strengths / Fortify Areas of Growth  
**Why:** Refines James's natural decisiveness into leadership that remains strong while actively creating space for other voices.

### 2. C08 — Listening Before Leading
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Directly addresses the blind spot in which silence may be mistaken for agreement.

### 3. C16 — Delegating for Ownership
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Develops his ability to retain accountability without reclaiming control when others work differently.

### 4. C09 — Collaborative Influence
**Priority:** Recommended  
**Territory:** Fortify Areas of Growth / Team Development  
**Why:** Broadens his influence repertoire beyond authority, urgency and force.

### 5. C06 — Constructive Conflict
**Priority:** Recommended  
**Territory:** Team Development  
**Why:** James is already comfortable with conflict; the developmental task is making disagreement productive and sufficiently safe for others to participate.

### 6. C20 — Facilitating Productive Disagreement
**Priority:** Strength Mastery  
**Territory:** Strengthen Strengths / Team Development  
**Why:** Builds on his willingness to address hard issues while developing balanced participation and integration of opposing views.

### 7. C02 — Staying Effective Under Pressure
**Priority:** Recommended  
**Territory:** Optimise Stress Management & Growth  
**Why:** Helps him recognise when useful intensity is becoming control or guarded withdrawal.

### James's visible pathway
**Listening Before Leading → Collaborative Influence → Delegating for Ownership → Leading with Strength and Space**

---

# Sophie Harris — Product & Experience Designer — 4 / 7 / 1

Sophie's profile combines creative depth, possibility generation and strong design standards. Her development story concerns committing to a direction, using constraints productively, integrating feedback and maintaining delivery momentum when the work no longer matches an idealised internal vision.

## Recommended courses

### 1. C14 — From Idea to Delivery
**Priority:** Core  
**Territory:** Strengthen Strengths / Fortify Areas of Growth  
**Why:** Converts Sophie's creativity into a repeatable path from possibility to completed work.

### 2. C15 — Feedback Without Losing the Work
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Supports her in using pragmatic feedback without experiencing every constraint as dilution of the idea.

### 3. C12 — Priorities That Hold
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Helps resolve tension between Seven-like possibility, Four-like idealisation and One-like refinement.

### 4. C02 — Staying Effective Under Pressure
**Priority:** Recommended  
**Territory:** Optimise Stress Management & Growth  
**Why:** Helps her recognise when emotional dissatisfaction and critical frustration are beginning to drive unnecessary redesign.

### 5. C03 — Working Beyond Your Default
**Priority:** Recommended  
**Territory:** Optimise Stress Management & Growth  
**Why:** Encourages deliberate use of structure, objectivity and alternative responses when inspiration or emotional resonance is low.

### 6. C09 — Collaborative Influence
**Priority:** Strength Mastery  
**Territory:** Strengthen Strengths / Team Development  
**Why:** Develops her ability to bring others into a creative vision while remaining responsive to operational realities.

### 7. C19 — Sustainable Execution
**Priority:** Recommended  
**Territory:** Fortify Areas of Growth  
**Why:** Reinforces completion and commitment after the exciting exploratory phase has passed.

### Sophie's visible pathway
**Priorities That Hold → From Idea to Delivery → Feedback Without Losing the Work → Sustainable Execution**

---

# Thomas Parker — Data & Solutions Analyst — 5 / 6 / 7

Thomas's Head-dominant profile combines deep analysis, risk testing and scenario generation. His development story concerns deciding with incomplete information, communicating before analysis feels finished and moving from increasingly complex models into action.

## Recommended courses

### 1. C11 — Calibrating Risk
**Priority:** Strength Mastery  
**Territory:** Strengthen Strengths  
**Why:** Refines Thomas's strong analytical and risk-detection capability into proportionate judgement rather than simply more analysis.

### 2. C10 — Decisions Without Certainty
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Directly addresses the convergence of Five preparation, Six uncertainty and Seven possibility generation.

### 3. C13 — From Analysis to Action
**Priority:** Core  
**Territory:** Fortify Areas of Growth / Optimise Stress Management & Growth  
**Why:** Helps him recognise diminishing returns in analysis and convert thinking into experiments or decisions.

### 4. C18 — Strategic Communication
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Develops concise communication of analysis before every detail has been resolved.

### 5. C02 — Staying Effective Under Pressure
**Priority:** Recommended  
**Territory:** Optimise Stress Management & Growth  
**Why:** Supports recognition of the stress loop in which analysis fragments into multiple scenarios and threat scanning.

### 6. C03 — Working Beyond Your Default
**Priority:** Recommended  
**Territory:** Optimise Stress Management & Growth  
**Why:** Provides an explicit bridge toward more embodied, decisive action—the useful 5 → 8 developmental resource already built into his profile.

### 7. C09 — Collaborative Influence
**Priority:** Recommended  
**Territory:** Team Development  
**Why:** Helps Thomas ensure that valuable expertise shapes decisions rather than remaining private or arriving too late.

### Thomas's visible pathway
**Calibrating Risk → Decisions Without Certainty → From Analysis to Action → Strategic Communication**

---

# Sarah Mitchell — Strategy & Operations Manager — 9 / 5 / 3

Sarah shares Emily's Type 9 primary pattern but has a markedly different development story: quiet synthesis and analysis, with Type 3 providing execution and ambition. Her needs centre on making disagreement and ownership visible, communicating thinking earlier and stepping into visible leadership.

## Recommended courses

### 1. C18 — Strategic Communication
**Priority:** Core  
**Territory:** Strengthen Strengths / Fortify Areas of Growth  
**Why:** Turns Sarah's strong internal synthesis into earlier, clearer and more visible contribution.

### 2. C09 — Collaborative Influence
**Priority:** Strength Mastery  
**Territory:** Strengthen Strengths  
**Why:** Builds on her low-ego collaborative style while helping her exercise greater visible influence.

### 3. C04 — Finding Your Voice
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Addresses the Nine tendency to keep disagreement private, but for Sarah the emphasis is less on interpersonal reassurance and more on making analysis and priorities explicit.

### 4. C06 — Constructive Conflict
**Priority:** Recommended  
**Territory:** Fortify Areas of Growth / Team Development  
**Why:** Helps distinguish calm resolution from quiet disengagement.

### 5. C10 — Decisions Without Certainty
**Priority:** Recommended  
**Territory:** Fortify Areas of Growth  
**Why:** Supports visible ownership when further analysis would be possible but a decision is needed.

### 6. C03 — Working Beyond Your Default
**Priority:** Core  
**Territory:** Optimise Stress Management & Growth  
**Why:** Her strong Type 3 signal provides a particularly natural development resource toward agency, visible action and goal-directed engagement.

### 7. C20 — Facilitating Productive Disagreement
**Priority:** Strength Mastery  
**Territory:** Strengthen Strengths / Team Development  
**Why:** Develops her Nine synthesis and Five perspective-taking into an advanced group capability.

### Sarah's visible pathway
**Finding Your Voice → Strategic Communication → Collaborative Influence → Facilitating Productive Disagreement**

---

# Oliver Grant — Business Development Lead — 3 / 7 / 8

Oliver's profile combines achievement, opportunity seeking and confidence. His development story concerns listening for reservations, testing assumptions, protecting delivery capacity and ensuring that momentum produces credible commitments rather than an expanding queue of promises.

## Recommended courses

### 1. C21 — Consultative Stakeholder Conversations
**Priority:** Core  
**Territory:** Strengthen Strengths / Fortify Areas of Growth  
**Why:** Builds on Oliver's commercial and interpersonal energy while requiring him to discover needs and reservations before moving into persuasion.

### 2. C08 — Listening Before Leading
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Helps him notice concerns that can disappear when opportunity and momentum become the dominant frame.

### 3. C12 — Priorities That Hold
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Creates explicit trade-offs between attractive opportunities and existing commitments.

### 4. C19 — Sustainable Execution
**Priority:** Core  
**Territory:** Fortify Areas of Growth  
**Why:** Connects commercial ambition to delivery capacity and credible follow-through.

### 5. C11 — Calibrating Risk
**Priority:** Recommended  
**Territory:** Fortify Areas of Growth  
**Why:** Encourages testing assumptions without suppressing his useful appetite for opportunity.

### 6. C09 — Collaborative Influence
**Priority:** Strength Mastery  
**Territory:** Strengthen Strengths  
**Why:** Refines natural persuasion into commitment built through listening, credibility and shared ownership.

### 7. C02 — Staying Effective Under Pressure
**Priority:** Recommended  
**Territory:** Optimise Stress Management & Growth  
**Why:** Helps him recognise when performance pressure is fragmenting attention and driving further opportunity-seeking rather than consolidation.

### Oliver's visible pathway
**Listening Before Leading → Consultative Stakeholder Conversations → Priorities That Hold → Sustainable Execution**

---

# 8. Cross-Persona Course Reuse

Course reuse is desirable because it demonstrates personalisation without requiring a huge catalogue.

| Course | Emily | James | Sophie | Thomas | Sarah | Oliver |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| C02 Staying Effective Under Pressure | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| C03 Working Beyond Your Default |  |  | ✓ | ✓ | ✓ |  |
| C04 Finding Your Voice | ✓ |  |  |  | ✓ |  |
| C05 Healthy Boundaries | ✓ |  |  |  |  |  |
| C06 Constructive Conflict | ✓ | ✓ |  |  | ✓ |  |
| C08 Listening Before Leading |  | ✓ |  |  |  | ✓ |
| C09 Collaborative Influence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| C10 Decisions Without Certainty | ✓ |  |  | ✓ | ✓ |  |
| C11 Calibrating Risk |  |  |  | ✓ |  | ✓ |
| C12 Priorities That Hold |  |  | ✓ |  |  | ✓ |
| C13 From Analysis to Action |  |  |  | ✓ |  |  |
| C14 From Idea to Delivery |  |  | ✓ |  |  |  |
| C15 Feedback Without Losing the Work |  |  | ✓ |  |  |  |
| C16 Delegating for Ownership |  | ✓ |  |  |  |  |
| C17 Leading with Strength and Space |  | ✓ |  |  |  |  |
| C18 Strategic Communication |  |  |  | ✓ | ✓ |  |
| C19 Sustainable Execution |  |  | ✓ |  |  | ✓ |
| C20 Facilitating Productive Disagreement | ✓ | ✓ |  |  | ✓ |  |
| C21 Consultative Stakeholder Conversations |  |  |  |  |  | ✓ |

This table shows why a compact catalogue works well. **C09 Collaborative Influence**, for example, is relevant to all six people—but for six different reasons.

---

# 9. Strengthening vs Fortifying Examples

The same skill can appear in different territories.

## Facilitation
- **Emily:** Strength Mastery — develop natural harmony-building.
- **Sarah:** Strength Mastery — turn synthesis and low-ego collaboration into visible group leadership.
- **James:** Growth — learn to integrate voices rather than simply drive closure.

## Active Listening
- **Emily:** existing strength that can support facilitation.
- **James:** development area that creates room for dissent.
- **Oliver:** development area that improves consultative selling and stakeholder trust.

## Decision-Making Under Uncertainty
- **Thomas:** central growth need because analysis, risk scanning and possibility generation can delay action.
- **Emily:** growth need when lack of consensus increases doubt.
- **Sarah:** visible-leadership skill that helps convert synthesis into ownership.

This is exactly the behaviour the eventual production system should be able to reproduce across other personality assessments.

---

# 10. Recommended Demo Data Structure

A simple conceptual structure could be:

```text
Skill
- id
- name
- description
- category

Course
- id
- title
- description
- primary_skill
- secondary_skills[]
- level
- duration_minutes
- territories[]
- prerequisite_courses[]
- next_courses[]
- related_courses[]
- team_relevance
- outline[]
- content_status

LearnerCourseRecommendation
- learner_id
- course_id
- priority
- territory
- recommendation_reason
- contributing_profile_signals[]
- pathway_id
- pathway_order

Pathway
- id
- name
- description
- learner_id / team_id
- nodes[]
```

This is a **content model**, not an implementation prescription.

---

# 11. What Should Be Built Next

The next phase should **not** add more individual courses.

We now have enough material to build the two team experiences.

The logical next work is:

1. define the **seven actual pair relationships** within Team Atlas and Team Beacon;
2. identify shared development themes within each team;
3. create **Team Atlas** and **Team Beacon** learning pathways using the existing course catalogue;
4. decide what information a learner can see about another team member;
5. create recommendation explanations that change according to the viewer;
6. identify any genuine course gap revealed by the team pathways;
7. only then add one or two additional courses if needed.

That will allow the demo to show three increasingly rich layers:

**My Profile → My Development Path → My Team**

without expanding the course catalogue unnecessarily.
