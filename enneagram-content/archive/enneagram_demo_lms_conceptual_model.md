# Enneagram Demo LMS — Conceptual Model and Development Architecture

## Purpose and Scope

This document captures the conceptual model developed for a demonstration web application that combines personality-assessment results with an LMS and personalised learning pathways.

The Enneagram is being used as the personality framework for the **demo**, rather than as the intended assessment system for the eventual production application. The purpose is not to reproduce every aspect of Enneagram theory. Instead, the demo should contain enough depth and variation to demonstrate:

- rich personality-result interfaces;
- personalised learning recommendations;
- connections between personality patterns and skill development;
- interactive development pathways;
- stress and growth pathways;
- strengths-based development;
- blind-spot and growth-area development;
- team-development functionality; and
- professional interfaces that borrow selected ideas from RPG skill trees, crafting, forging and progression systems without becoming visually or conceptually frivolous.

The guiding principle is to create a **coherent but deliberately bounded hybrid Enneagram model**.

The demo does not need instincts, 27 subtypes, every Enneagram triad, or every school-specific theoretical construct.

---

# 1. The Core Demo Model

The demo will draw together selected aspects of several Enneagram traditions rather than attempting to reproduce one particular school.

Five layers form the personality model.

| Layer | Model Used | Purpose |
|---|---|---|
| **Core Pattern** | Nine Enneagram types | Identifies the learner's primary orientation or operating pattern |
| **Profile Variance** | Weighted results across all nine types, with the top three highlighted | Creates meaningful variation between people who share the same primary type |
| **Operating State** | Nine Levels of Development | Provides a vertical-development dimension |
| **Dynamic Movement** | Lines of connection | Provides stress, growth and alternative-response pathways |
| **Broad Orientation** | Three Centers | Organises patterns and development across Head, Heart and Body |

The following are deliberately excluded from the demo scope:

- the three instincts;
- the 27 instinctual subtypes;
- detailed Hornevian and Harmonic groupings;
- extensive school-specific subtype theory; and
- other specialist extensions unless later required.

This provides considerable depth without allowing Enneagram theory itself to overwhelm the LMS demonstration.

---

# 2. Weighted Type Profile Rather Than a Fixed Wing Model

## 2.1 Why not rely primarily on wings?

The traditional wing model constrains secondary influence to one or both types immediately adjacent to the primary type. For example, a Type 9 can have an 8 or 1 wing.

This is useful within traditional Enneagram theory, but it is unnecessarily restrictive for the purposes of the demo.

The application should instead retain the learner's scores across all nine types and emphasise the three strongest patterns. For example:

- **Primary Type:** Type 9 — 86%
- **Secondary Influence:** Type 2 — 78%
- **Tertiary Influence:** Type 6 — 71%

The remaining six type scores can remain available as part of the broader profile.

## 2.2 Why not call this Trifix or Tritype?

Traditional Trifix/Tritype approaches generally identify one type or fixation from each of the three Centers rather than simply selecting the three highest assessment scores.

The demo should therefore avoid presenting its weighted top-three system as a formal Trifix or Tritype methodology.

Possible neutral terminology includes **Type Profile**, **Type Blend**, **Top Type Pattern**, or **Enneagram Profile**. The exact user-facing term can be determined later.

## 2.3 Why the weighted approach is valuable

This permits two people with the same primary type to have substantially different profiles.

### Person A
**9 → 2 → 6**

### Person B
**9 → 5 → 3**

Both users receive the core developmental material associated with Type 9. However, their secondary strengths, converging development needs, blind spots, course recommendations, stress-management recommendations and learning pathways can differ.

This also anticipates the eventual production platform, where recommendations may be derived from several different personality assessments rather than a single typology.

The important architectural concept is:

> **Multiple personality signals → synthesis → developmental inference → skills → learning pathways**

rather than:

> **Personality label → predetermined course list**

---

# 3. Converging Development Signals

Weighted results allow the system to identify areas where several personality signals point toward a similar developmental opportunity.

For example, consider Type 9 as the primary pattern, Type 2 as a strong secondary pattern and Type 6 as a strong tertiary pattern.

Possible developmental signals might include:

- Type 9 → assertiveness and agency;
- Type 2 → boundaries and self-advocacy;
- Type 6 → decision confidence and calibrated trust.

The application can therefore identify a converging pathway such as **Healthy Boundaries and Assertiveness**.

This recommendation is more sophisticated than simply stating: “You are a Type 9, therefore take an assertiveness course.” The eventual recommendation engine can explain *why* a particular pathway has been suggested.

---

# 4. Overall Development Philosophy

The demo should not present personality type as a prison or as a fixed set of behavioural capabilities.

Within the Enneagram framework, the learner's primary type can be understood as a relatively stable underlying orientation or default strategy. Development does not require eliminating that orientation.

Instead, development means becoming **less compulsively governed by the default pattern and more capable of selecting responses appropriate to the situation**.

> **The objective is not to escape your type. It is to become less constrained by it.**

A highly developed Type 9 remains primarily oriented in a Type 9 way, but may become increasingly capable of drawing deliberately on qualities represented elsewhere in the Enneagram: assertiveness, agency, analytical distance, emotional awareness, decisiveness, standards, creativity, vigilance and interpersonal support.

The ultimate developmental objective is therefore not to change the learner's personality. It is to **expand the repertoire of ways in which the learner can successfully respond to the world**.

A concise user-facing formulation might be:

> **Know your pattern. Build on your strengths. Recognise what limits you. Learn new ways to respond.**

---

# 5. Four Dimensions of the Learner

## 5.1 Pattern — How do I characteristically orient myself?

This includes the nine weighted Enneagram scores, the primary type, the two strongest secondary influences and the Three Centers.

Pattern describes the learner's characteristic orientation. It does **not** directly describe skill or performance.

## 5.2 State — How am I currently expressing that pattern?

This includes the Nine Levels of Development, stress signals, stress responses, lines of connection, integration resources, and flexibility versus rigidity of the learner's normal strategy.

A learner's state can vary even while their underlying pattern remains relatively stable.

## 5.3 Capability — What am I able to do?

This includes skills, knowledge, behaviours, completed learning, practice, applied experience and demonstrated competencies.

Capability must remain conceptually separate from personality. A Type 9 may already be highly skilled at conflict management. A Type 8 may already be highly diplomatic.

Personality results should therefore affect the **reason, framing and weighting of recommendations**, rather than being treated as direct skill scores.

## 5.4 Context — How does my pattern interact with other people and situations?

Context becomes especially important when the application moves from individual development to team development.

It includes team composition, colleagues' patterns, role, relationship, situational demands, communication styles, complementary strengths and potential sources of friction.

The four dimensions can therefore be summarised as:

> **Pattern + State + Capability + Context**

These should remain separate concepts throughout the demo.

---

# 6. The Four Major Development Pathways

## I. Strengthen Strengths

The application should not become a deficit-correction system. Personality results should first help learners recognise and develop what they already do naturally well.

### A. Natural Strength Development

A natural disposition can be developed into increasingly sophisticated professional capability.

For a Type 9, for example:

**Harmony orientation**

↓

**Interpersonal sensitivity**

↓

**Active listening**

↓

**Mediation**

↓

**Conflict facilitation**

↓

**Team cohesion**

↓

**Facilitative leadership**

The learner is therefore not merely correcting weaknesses. They are **forging an existing disposition into expertise**.

### B. Primary-Type Operating Development

The Nine Levels of Development sit here. This development is different from acquiring an ordinary skill. It concerns how flexibly and constructively the learner is expressing their underlying personality pattern.

This creates two distinct developmental axes.

#### Horizontal Development

> **What capabilities have I developed?**

Examples include communication, conflict management, strategy, delegation, leadership, prioritisation and facilitation.

#### Vertical Development

> **How flexibly and constructively am I using my underlying personality strategy?**

The learner may possess sophisticated skills while nevertheless operating from a stressed or rigid personality state in a particular situation.

Horizontal capability and vertical development are therefore related but not equivalent.

---

## II. Optimising Stress Management and Growth

This pathway concerns what happens when the learner's normal operating strategy comes under pressure and how they can broaden their available responses.

### A. Stress Awareness and Management

Possible learning content includes:

- common stressors for the learner's primary type;
- early warning signs;
- behavioural changes under strain;
- emotional and cognitive warning signals;
- recognising downward movement through Levels of Development;
- regulation strategies;
- maintaining flexibility under pressure; and
- recovery practices.

A pathway might look like:

**Stress Awareness → Identify Personal Triggers → Recognise Early Warning Signs → Regulation Skills → Staying Flexible Under Pressure**

### B. Integration and Lines of Connection

The lines connecting Enneagram types can be used as developmental pathways.

Rather than teaching an overly rigid formula in which one arrow is simply “bad stress” and the other is simply “good growth,” both connected types can be treated as containing useful resources, alternative strategies, potential reactive patterns and qualities that can be deliberately accessed.

For example, Type 9 connects with Types 3 and 6.

Possible Type 3 resources include agency, purposeful action, goal orientation and visible engagement.

Possible Type 6 resources include preparedness, questioning assumptions, responsible vigilance and risk awareness.

The interface can therefore present **Integration Pathways** rather than merely arrows. These pathways can contain awareness content, reflective exercises, skills courses, scenarios and applied challenges.

---

## III. Fortifying Areas of Growth

This area deals with aspects of the learner's pattern that may constrain performance or development.

### A. Weak Spots / Development Areas

These are areas the learner may already recognise as difficult.

For example: “I know I avoid difficult conversations.”

A possible learning pathway could be:

**Constructive Conflict Fundamentals → Assertive Communication → Difficult Conversations → Negotiation**

These are conventional skill-development pathways informed by the personality profile.

### B. Blind Spots

Blind spots are more subtle. They concern aspects of the learner's normal pattern that may prevent them from recognising how their behaviour is experienced by others.

For example, a Type 9 might experience themselves as “easy-going and accommodating” while failing to recognise that withholding their own position can cause colleagues to carry responsibility for decisions.

Blind-spot development should therefore begin with awareness rather than immediately prescribing a conventional skills course.

A possible pathway is:

**Seeing the Pattern → Seeing Through Another Lens → Understanding the Impact → Trying Another Response → Practising the Skill**

This opens the door to interactive learning. A workplace scenario could be shown from the learner's own type perspective, from another type's perspective and from a neutral observer's perspective.

The learner can then experiment with alternative responses. This naturally connects individual development with team development.

---

## IV. Team Development

Team development should be treated as a major dimension of the demo rather than a minor extension of individual personality results.

The learner will have access to their own detailed profile and development pathways. They may also be permitted to see selected information about colleagues' personality patterns, depending on appropriate organisational and privacy settings.

The purpose is not to expose another person's entire psychological profile. Instead, team information should help answer practical questions such as:

- How might this person communicate differently from me?
- What strengths do they bring?
- Where do our approaches complement one another?
- Where might friction occur?
- What might I misunderstand about their behaviour?
- What could I do differently when working with them?
- What could they potentially learn from my perspective?
- Which skills might help us work together more effectively?

---

# 7. Strength → Overuse → Blind Spot → Development

A particularly useful organising principle is that many personality weaknesses can be understood as **strengths that have become overextended or inflexible**.

The system should therefore avoid a simplistic good-characteristic / bad-characteristic model.

> **Strength → Overuse → Blind Spot → Development Opportunity**

| Type | Strength | Possible Overuse | Possible Blind Spot | Development Direction |
|---|---|---|---|---|
| **1** | Standards | Perfectionism | “I'm simply maintaining quality.” | Flexibility |
| **2** | Helping | Over-involvement | “I'm just being supportive.” | Boundaries |
| **3** | Achievement | Performance/image focus | “Results are what matter.” | Authenticity and listening |
| **4** | Emotional depth | Emotional absorption | “I'm being authentic.” | Perspective and action |
| **5** | Analysis | Withdrawal | “I need more information first.” | Engagement and action |
| **6** | Risk awareness | Over-vigilance | “I'm just being responsible.” | Calibrated trust |
| **7** | Possibility | Scattering | “I'm keeping our options open.” | Focus |
| **8** | Decisiveness | Domination | “Someone has to say it.” | Receptivity |
| **9** | Harmony | Self-erasure / avoidance | “It isn't worth making an issue of it.” | Agency |

This framework is particularly valuable because it treats the learner's developmental challenges as connected to genuine assets.

---

# 8. Nine Levels of Development

The Nine Levels of Development provide the demo's principal **vertical-development model**.

They should not be treated simply as nine static personality descriptions. Instead, they can show how the same underlying orientation changes depending on the flexibility or rigidity with which it is being expressed.

For example, consider Type 9's orientation toward harmony.

At healthier functioning:

> **Harmony becomes facilitation.**

At more ordinary functioning:

> **Harmony becomes accommodation.**

Under greater strain:

> **Harmony becomes avoidance.**

At highly dysfunctional extremes:

> **Harmony becomes disengagement.**

The underlying orientation remains recognisable, but its expression changes.

This distinction creates several different categories of learning intervention.

### Strength Development
**Advanced Facilitation**

### Operating Development
**Recognising Conflict Avoidance**

### Stress Management
**Staying Engaged Under Interpersonal Pressure**

### Growth Development
**From Agreement to Agency**

The Levels of Development therefore become useful for organising learning content without confusing personality development with ordinary course completion.

The application should **not** imply that completing courses automatically moves a learner from one psychological level to another.

---

# 9. The Three Centers

The Three Centers provide a broad organising layer across the nine types.

## Head Center — Types 5, 6 and 7

Broad themes include thinking, analysis, anticipation, planning, ideas, uncertainty and mental strategies.

## Heart Center — Types 2, 3 and 4

Broad themes include relationships, identity, emotional information, interpersonal response, recognition and connection.

## Body / Instinctive Center — Types 8, 9 and 1

Broad themes include action, autonomy, boundaries, instinctive response, control, standards and embodied reaction.

The Centers can be used to organise skills without requiring every course to be explicitly labelled as Enneagram content.

For example, if a profile draws heavily on Body and Heart strategies, a development opportunity might involve increasing deliberate access to Head capabilities such as critical thinking, strategic analysis, decision frameworks and risk assessment.

The underlying courses remain ordinary professional-development courses. The personality system helps determine **which routes into those courses may be particularly useful for a learner**.

---

# 10. Learning Nodes Should Not All Be Courses

The development map should contain several kinds of learning experience:

1. **Awareness**
2. **Perspective**
3. **Knowledge**
4. **Skill**
5. **Practice**
6. **Application**

For example:

**Recognise a Blind Spot** *(Awareness)*

↓

**Experience the Situation from Another Type's Perspective** *(Perspective)*

↓

**Understand Productive Conflict** *(Knowledge)*

↓

**Assertive Communication** *(Skill)*

↓

**Interactive Difficult-Conversation Scenario** *(Practice)*

↓

**Apply the Technique in a Workplace Challenge** *(Application)*

This allows the pathway interface to become much richer than a conventional catalogue of courses.

---

# 11. Example: Type 9 Working with Type 8

A Type 9 learner viewing a Type 8 colleague might see information such as:

## What the Type 8 Pattern May Contribute

- decisiveness;
- directness;
- willingness to confront problems;
- protection of the team; and
- momentum.

## What the Type 9 May Appreciate

- the Type 8 may say things the Type 9 hesitates to say;
- the Type 8 may generate action when consensus has stalled.

## Where Friction May Occur

- Type 8 directness may feel unnecessarily forceful to the Type 9;
- Type 9 apparent agreement may be interpreted by the Type 8 as genuine commitment;
- unexpressed Type 9 disagreement may later appear as withdrawal or resistance.

## What the Type 9 Can Learn

- stating a position early;
- tolerating productive disagreement;
- acting before complete consensus; and
- distinguishing harmony from avoidance.

## What the Type 8 May Need

- explicit disagreement rather than silent resistance;
- clear commitments; and
- direct feedback.

Possible recommended learning might include:

- **Working Productively with Direct Communicators**
- **From Conflict Avoidance to Productive Disagreement**
- **Assertive Communication**
- **Constructive Conflict**

The learner's weighted profile can further modify these recommendations. A **9 → 2 → 6** learner may receive somewhat different guidance from a **9 → 5 → 3** learner even though both share Type 9 as their primary pattern.

---

# 12. Personal and Team Maps

The demo can ultimately contain at least two major development views.

## My Development Map

Centred on the learner:

**Strengths → Growth → Stress → Blind Spots → Skills → Courses and Practice**

## My Team Map

Centred on relationships between the learner and colleagues.

Possible relationship information includes communication, complementary strengths, differences in operating style, potential friction, perspective taking, collaboration strategies, joint learning and team-development pathways.

A simplified conceptual representation might look like:

```text
                     TEAM

              3                  8
              │                  │
         Achievement        Direct action
              │                  │
              └─────── ME ───────┘
                       9
                    /     \
                   /       \
                  2         6
              Support    Security
```

Selecting another team member could reveal:

- **How we tend to communicate**
- **Where we complement one another**
- **Potential friction**
- **What I can do differently**
- **What we could practise together**

---

# 13. Overall Learning-World Architecture

## STRENGTHEN STRENGTHS

### Natural Strengths
→ Strength Mastery  
→ Advanced Applications

### Primary-Type Development
→ Levels Awareness  
→ Healthy Operation  
→ Sustaining Flexibility

## OPTIMISE STRESS MANAGEMENT AND GROWTH

### Stress Awareness
→ Triggers  
→ Early Warning Signs  
→ Regulation  
→ Flexibility Under Pressure

### Integration
→ Lines of Connection  
→ Alternative Strategies  
→ Broader Behavioural Repertoire  
→ Flexibility Under Pressure

## FORTIFY AREAS OF GROWTH

### Development Areas
→ Recognised Skill Gaps  
→ Skills Courses  
→ Practice  
→ Application

### Blind Spots
→ Awareness  
→ Perspective Taking  
→ Understanding Impact  
→ Alternative Responses  
→ Skills Development

## TEAM DEVELOPMENT

### Understanding Others
→ Type Perspectives  
→ Communication

### Working Together
→ Complementarity  
→ Friction  
→ Productive Conflict

### Team Capability
→ Joint Courses  
→ Pair or Group Challenges  
→ Team Development Pathways

---

# 14. Skill-Tree, Crafting and Forging Concepts

The demo can borrow selected mechanics from RPG and crafting systems while retaining a professional appearance.

The objective is not to turn personality development into a game. Instead, game-design concepts can make relationships between learning activities more understandable and engaging.

## Strength Forging

An existing disposition can be progressively refined.

**Type 9 Harmony Orientation → Interpersonal Awareness → Active Listening → Mediation → Conflict Facilitation → Facilitative Leadership**

## Capability Crafting

Several foundation skills can combine into a more sophisticated capability.

**Active Listening + Feedback Skills + Healthy Boundaries → Difficult Conversations**

Another example:

**Risk Awareness + Decision Frameworks + Ambiguity Tolerance → Strategic Judgement**

This makes course relationships visible rather than presenting every course as an isolated item.

---

# 15. A Better Recommendation Architecture

The eventual demo should avoid a deterministic rule such as:

```text
TYPE
  ↓
COURSE
```

A richer architecture is:

```text
PERSONALITY SIGNALS
  │
  ├── Primary type
  ├── Secondary type influence
  ├── Tertiary type influence
  ├── Center orientation
  ├── Current developmental concern
  └── Stress / growth pattern
          ↓
DEVELOPMENTAL INTERPRETATION
          ↓
STRENGTH / OVERUSE / BLIND SPOT / GROWTH RESOURCE
          ↓
CAPABILITY
          ↓
LEARNING PATHWAY
          ↓
AWARENESS / KNOWLEDGE / SKILL / PRACTICE
          ↓
APPLICATION
          ↓
NEXT DEVELOPMENT BRANCH
```

This better demonstrates the kind of recommendation architecture that could eventually combine several different personality assessments.

---

# 16. Personality Should Inform Skills, Not Define Them

The LMS should maintain an independent skills ontology.

For example:

```text
Communication
├── Listening
│   ├── Active Listening
│   └── Reflective Listening
├── Feedback
├── Assertive Communication
└── Difficult Conversations

Leadership
├── Decision-Making
│   ├── Risk Assessment
│   ├── Decisions Under Uncertainty
│   └── Strategic Judgement
├── Delegation
├── Facilitation
└── Team Leadership

Self-Management
├── Focus
├── Prioritisation
├── Emotional Regulation
└── Stress Management
```

These skills exist independently of the Enneagram.

The personality model influences recommendation weighting, pathway entry points, explanatory content, scenarios, examples, development priorities and reflection prompts.

This separation is crucial because the production application will ultimately use other personality assessments.

---

# 17. Design Principles Emerging from the Model

## 17.1 Strengths before deficits

Begin with what the learner naturally contributes before discussing limitations.

## 17.2 Personality is not capability

Never assume that a type automatically lacks or possesses a professional skill.

## 17.3 Recommendations are hypotheses

The system should be capable of saying:

> “This may be a useful development area based on your profile.”

rather than:

> “Because you are Type 9, you lack assertiveness.”

## 17.4 Allow the learner to disagree

Useful controls may eventually include:

- **This sounds like me**
- **This does not sound like me**
- **I already have this skill**
- **I want to develop this**
- **Not a priority right now**

This makes the learning system collaborative rather than deterministic.

## 17.5 Explain recommendations

Where possible, show why a course or pathway has been recommended.

For example:

> **Recommended because:** your primary Type 9 result and strong Type 2 influence both suggest that boundary-setting may be a useful development area.

## 17.6 Do not gamify psychological health

The Nine Levels of Development can inform content and visualisation, but users should not receive competitive psychological-health scores or public rankings.

Track things such as learning completed, skills practised, challenges completed, competencies developed and pathways explored.

Do not imply that completing a course automatically raises someone's psychological “health level.”

## 17.7 Development means increased flexibility

The central developmental objective is a broader behavioural repertoire.

The learner's primary orientation remains a resource, but increasingly becomes something they can use deliberately rather than something that automatically governs every situation.

---

# 18. The Emerging Philosophy of the Demo

The personality assessment answers:

> **How do I characteristically orient myself?**

The developmental model asks:

> **How is that pattern currently operating?**

The skills system asks:

> **What am I currently capable of doing, and what else could I learn?**

The team system asks:

> **How does my way of operating interact with the people around me?**

The LMS then provides routes between the learner's current position and the capabilities they want to develop.

The result is not a system designed to tell someone who they permanently are. It is a system designed to help them understand their normal pattern and then **increase their available choices**.

The overall philosophy can therefore be expressed as:

> **Know your pattern. Build on your strengths. Recognise what limits you. Learn new ways to respond.**

Or, at a deeper conceptual level:

> **The purpose of the learning pathways is not to change the learner's personality. It is to expand the number of ways in which they can successfully meet the world.**

---

# 19. Logical Next Stage

The conceptual Enneagram scope is now sufficiently defined for the purposes of the demo.

The next major information-design task should be the **developmental content architecture**, rather than adding additional Enneagram theory.

That work should define:

1. the core skills taxonomy;
2. relationships between skills and subskills;
3. foundation, intermediate and advanced capabilities;
4. the distinction between awareness, knowledge, skill, practice and application nodes;
5. strengths associated with each of the nine types;
6. how those strengths can become overused;
7. likely blind spots;
8. stress patterns and early warning signs;
9. growth and integration resources;
10. developmental skills associated with those patterns;
11. course concepts associated with those skills;
12. relationships between courses;
13. prerequisites and advanced pathways;
14. team-interaction themes between types; and
15. areas where several personality signals converge on the same developmental recommendation.

Once that architecture exists, it can provide the structured informational foundation for designing the eventual development maps, skill trees, course pathways, team views and professional crafting/forging interfaces.
