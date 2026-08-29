# Enneagram Demo App --- Learning & Course Experience Design Reference

**Document type:** Conceptual blueprint / design reference\
**Intended use:** Scaffolding and inspiration for Codex while developing
the demo application\
**Scope:** Learning / individual course experience

------------------------------------------------------------------------

## How to Use This Document

This is a lightweight reference for the Learning / Course area of the
demo.

It is intentionally **not a detailed LMS specification**. The demo does
not need complete course content, sophisticated assessment,
certificates, authoring tools or a production learning engine.

The main purpose of this area is to show how a learning experience can
sit inside the wider system of:

**Profile insights → Skills → Recommendations → Courses → Pathways →
Team development**

Suggested content and interactions below are possibilities rather than
implementation requirements.

------------------------------------------------------------------------

# 1. Overall Concept

The Course experience broadly answers:

> **What is this learning experience, what could it help me develop, and
> why is it relevant to me?**

The important part of the demo is not the actual educational content.

The important part is the **context surrounding the course**.

A learner should be able to understand:

-   what the course is about;
-   what skills it develops;
-   why it has been recommended;
-   where it fits into a pathway;
-   whether it is relevant personally, relationally or at team level;
-   what related learning might come next.

The actual course-learning area can simply demonstrate where future
content would live.

------------------------------------------------------------------------

# 2. Course Overview

## Purpose

Give enough information for the learner to understand the learning
opportunity before entering it.

## Information that may be useful

A course may have:

-   title;
-   short description;
-   estimated duration;
-   level or difficulty where useful;
-   relevant skills;
-   canonical pathway and pathway-specific category;
-   short module / section outline;
-   prerequisites where relevant;
-   related courses;
-   optional chain membership;
-   current progress.

## Possible presentation ideas

A conventional course header and summary may work perfectly well.

The course area does not need to be visually experimental merely because
the Pathways area may be.

A concise overview could make the course feel like a clear destination
reached from the richer development map.

------------------------------------------------------------------------

# 3. Why This Is Recommended

## Purpose

Make personalisation visible.

This is one of the most important parts of the Course experience.

Rather than showing:

> **Recommended for you**

with no explanation, the system can show why the recommendation exists.

## Example

### F8-01 Assertiveness and Clean Boundaries

A learner such as Emily might see:

> Your profile suggests that preserving harmony can sometimes delay
> expression of your own position. This course may help develop more
> direct communication while retaining your collaborative style.

The recommendation could originate from:

-   a profile strength or overuse pattern;
-   a blind spot;
-   a development-level theme;
-   a connection-line resource;
-   a learner-selected goal;
-   a colleague relationship;
-   a team-development priority.

## Considerations

The explanation does not need to expose technical recommendation logic.

A short, human-readable reason is enough.

------------------------------------------------------------------------

# 4. The Same Course, Different Reasons

A particularly useful platform concept is that a course remains neutral
while its **developmental relevance changes by learner and context**.

For example:

### Relational Influence

The same canonical course can be recommended to several demo members for
different reasons, while remaining assigned to one pathway.

One learner may be extending an existing interpersonal strength.

Another may be learning to influence without relying on authority.

Another may be developing better listening before advocating a position.

The course itself stays canonical; Recommendation records carry the learner-specific explanation.

The surrounding system provides the personalisation.

This is an important idea for the demo to communicate somewhere,
although it does not need to be explained explicitly to the learner as a
technical feature.

------------------------------------------------------------------------

# 5. Skills Developed

## Purpose

Connect learning interventions to persistent capabilities.

A course may contribute to one or more skills.

For example:

### F8-01 Assertiveness and Clean Boundaries

May contribute toward:

-   Assertive Communication;
-   Boundary Setting.

### TM-GEN-02 Productive Disagreement

May contribute toward:

-   Productive Disagreement;
-   Assertive Communication;
-   Active Listening.

The exact relationships are available in the content material.

## Possible presentation ideas

Skills might appear as:

-   simple labels;
-   linked capability nodes;
-   progress indicators;
-   pathway connections;
-   expandable explanations.

A dedicated Skills page is not required.

------------------------------------------------------------------------

# 6. Pathway Context

## Purpose

Help the learner understand where the course sits in a larger
development journey.

In the v3 architecture, a canonical course belongs to exactly one
pathway and one pathway-specific category.

Example:

### From Accommodation to Constructive Assertion

**F8-01 Assertiveness and Clean Boundaries**\
→ **F8-02 Difficult Conversations With Directness**

The learner may be able to see:

-   what came before;
-   where they are now;
-   what may follow;
-   optional related branches.

## Considerations

A pathway does not necessarily need to be a rigid prerequisite chain.

It may simply represent a useful learning route.

------------------------------------------------------------------------

# 7. Multiple Contexts of Relevance

The same capability or theme may be relevant in more than one learner
context, while the course remains assigned to one canonical pathway.

For Emily, **Productive Disagreement** might appear as:

### Personal

The capability supports more direct expression of disagreement.

### Relationship

The Emily ↔ James working dynamic creates a reason for a Team-pathway
recommendation.

### Team

Team Atlas's shared pathway can include **TM-GEN-02 Productive
Disagreement**.

This creates a strong demonstration of the underlying platform
architecture: the course definition stays canonical, while the
recommendation explains why it matters for an individual, relationship or
team context.

The interface may choose to surface these contexts where they add value.

------------------------------------------------------------------------

# 8. Course Outline

## Purpose

Make the demo course feel credible without requiring actual learning
content.

A lightweight outline may be enough.

Example:

### F8-01 Assertiveness and Clean Boundaries

1.  Passive, assertive and aggressive communication
2.  Stating a position clearly
3.  Making requests
4.  Expressing disagreement
5.  Practising assertive responses

Not every demo course requires a detailed module structure.

The existing course catalogue can provide short descriptions and, where
useful, lightweight outlines.

------------------------------------------------------------------------

# 9. Course Content Area

The actual learning-content portion of the demo can remain intentionally
minimal.

For example:

> **Course content will go here.**

The demo is showcasing the **personalisation and development
architecture around learning**, not attempting to demonstrate a complete
instructional-design platform.

A small amount of placeholder structure may be useful visually, but
comprehensive lesson content is outside the current scope.

------------------------------------------------------------------------

# 10. Progress

A course can support straightforward LMS-style progress.

Examples:

-   Not started
-   In progress
-   Completed
-   percentage completion where useful

Course completion may also contribute to pathway progress.

It should not automatically imply that a professional skill or
personality characteristic has been quantitatively transformed.

For example:

**Course completed**\
does not necessarily mean\
**Assertive Communication mastered**.

The broader Pathways blueprint contains the more nuanced concept of
skill-development states.

------------------------------------------------------------------------

# 11. Related Learning

A course may provide natural onward routes.

Possible relationships include:

-   prerequisite;
-   recommended next;
-   alternative course;
-   deeper course;
-   related skill;
-   another recommendation that points to a different course.

This can help the learning area feel connected without requiring a
conventional catalogue.

------------------------------------------------------------------------

# 12. Possible Course Information Model

The content may conceptually support something like:

``` text
Course
- id
- name
- description
- lengthMinutes
- pathway
- category
- level
- courseType
- audience
- develops[]
- learningFocus[]
- recommendedWhen[]
- recommendationContext
- prerequisites[]
- unlocks[]
- chain?
- map

Recommendation
- learnerId
- courseId
- reason
- priority
- source

LearnerCourseState
- learnerId
- courseId
- status
- progressPct
```

This is included only to clarify the distinction between:

**the course itself**

and

**why the course is relevant to a particular learner**.

It is not an implementation prescription.

------------------------------------------------------------------------

# 13. What Matters Most for the Demo

The Learning / Course area can remain relatively simple.

The highest-value concepts are likely to be:

1.  a clear course description;
2.  visible skills developed;
3.  a personalised explanation of why the course is relevant;
4.  pathway context;
5.  lightweight course outline;
6.  simple progress;
7.  related learning;
8.  the possibility that Recommendation records explain personal,
    relationship and team relevance;
9.  a placeholder for actual course content.

There is little benefit at this stage in building extensive
course-learning functionality.

------------------------------------------------------------------------

# 14. Core Experience

The Course area is successful if the learner broadly understands:

### "I know what this course is for."

The purpose is clear.

### "I know why it appeared for me."

The recommendation is contextual rather than arbitrary.

### "I know what capability it develops."

The course connects to persistent skills.

### "I know where it fits."

The learner can see its relationship to a wider pathway.

### "Learning here connects to the rest of my development."

The course does not exist as an isolated LMS object.

------------------------------------------------------------------------

# 15. Scope Reminder

This blueprint intentionally leaves the detailed learning interface
open.

Codex may use conventional LMS patterns, reinterpret them, or keep the
course experience extremely minimal.

For this demo, the surrounding intelligence --- **why this learning, for
this person, in this development context** --- is more important than
the sophistication of the course player itself.
