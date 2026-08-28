# Demo LMS — Development Map Content Rules v3

**Purpose:** Explain how the v3 course data should drive the Pathways / Development Map.

This is a content-to-layout reference. It does not prescribe exact CSS, SVG or Svelte components.

---

# 1. The map should be data-derived

The map should not maintain a second list of course definitions.

For every node, resolve the canonical course from `02-course-catalog-v3.yaml` (or the TypeScript data generated from it).

Placement should come from:

- `pathway`
- `category`
- `level`
- `chain`
- selected learner profile
- selected learner primary type
- selected team
- learner course state

---

# 2. ALL

The `All` view is an overview, not an Enneagram spatial map.

Recommended structure:

```text
┌──────────────────────┬──────────────────────┐
│ Strengths            │ Stress & Growth      │
│ short explanation    │ short explanation    │
│ 2–3 relevant courses │ 2–3 relevant courses │
│ progress / count     │ progress / count     │
└──────────────────────┴──────────────────────┘
┌──────────────────────┬──────────────────────┐
│ Fortification        │ Team                 │
│ short explanation    │ short explanation    │
│ 2–3 relevant courses │ 2–3 relevant courses │
└──────────────────────┴──────────────────────┘
```

The existing `Development Atlas` idea can remain, but it no longer needs a radial/spatial arrangement.

---

# 3. STRENGTHS

## Activation

For learner profile `[a,b,c]`:

- highlight `type-a`, `type-b`, `type-c`;
- mute other type sectors.

Example Emily:

`9,2,6` active.

## Course filter

```text
course.pathway == strengths
AND course.category in learner top-three type categories
```

## Placement

- type category determines cone;
- level determines radial band;
- chain determines connecting line / unlock order.

## Unlock example

Type 9:

```text
S9-01
  ↓
S9-02
  ↓
S9-03
```

Not every Strengths course belongs to a chain.

## Visual meaning

This map answers:

> “What can I build further from what already comes naturally?”

---

# 4. STRESS & GROWTH

## Activation

Use only the learner's `primaryType`.

For primary type `N`:

- show category `stress-N`;
- show category `growth-N`;
- show `general` separately.

The wheel can highlight:

- primary type;
- connected stress type;
- connected growth type.

The canonical connection table lives in the YAML.

## Important category distinction

If Emily is Type 9:

- `stress-9` is the Type 9 stress curriculum;
- the map may place it toward Type 6 because Type 6 is the stress connection.
- `growth-9` is the Type 9 growth curriculum;
- the map may place it toward Type 3.

Do not query `stress-6` merely because the connected type is 6. `stress-6` is for a Type 6 primary learner.

## General tray

All `stress-growth / general` courses belong in a separate lower area.

This is intentional.

Examples:

- Know Your Stress Signature
- Emotional Regulation Under Pressure
- Recovery and Reset
- Decisions Under Uncertainty
- Working Beyond Your Default

## Visual meaning

This map answers:

> “What happens under pressure, what resources can I access, and what general practices increase flexibility?”

---

# 5. FORTIFICATION

## Activation

For learner profile `[a,b,c]`:

- mute `type-a`, `type-b`, `type-c`;
- activate all other type categories.

## Course filter

```text
course.pathway == fortification
AND course.category NOT IN learner top-three type categories
```

The app does not need to show every active course at once.

Use the recommendation layer to foreground the most useful sectors/courses while retaining the ability to explore the rest.

## Placement

- category determines type cone;
- level determines radial band;
- linked pairs/chains can connect inner → outer.

## Visual meaning

This map answers:

> “What useful capabilities sit outside my most familiar profile territory?”

Do not label active sectors as weaknesses.

---

# 6. TEAM

The Team view combines several course sources.

## Type-specific courses

If a teammate has Type N in their top three:

```text
team / type-N
```

becomes relevant.

Example:

Emily viewing James:
`TM-T8-01 Working With Direct-Challenge Colleagues`

## Center courses

If team composition or the interface lens makes a center relevant:

- `center-body`
- `center-heart`
- `center-head`

These do not need to occupy a single type cone.

## General courses

Team-wide learning lives in:

`team / general`

These can be shown:

- below the wheel;
- in an outer shared ring;
- in a separate team pathway panel.

## Radial meaning

If the wheel uses rings:

### Inner
Understand the working style

### Middle
Collaborate across styles / centers

### Outer
Shared team capability

## Visual meaning

This map answers:

> “How can I understand the people around me and build capabilities we need together?”

---

# 7. Course node copy hierarchy

Map space is scarce.

Do not place operational status at the top of the card.

Preferred order:

### Category / role
Examples:

- STRENGTH
- GROWTH RESOURCE
- PRESSURE PRACTICE
- FORTIFICATION
- TYPE PERSPECTIVE
- TEAM PRACTICE

### Course name

### Level · duration

### Status at the bottom

Examples:

```text
FORTIFICATION
Assertiveness and Clean Boundaries
Foundation · 40 min

In progress · 24%
```

or:

```text
STRENGTH
Mediation That Surfaces Difference
Intermediate · 50 min

Locked — complete Listening for the Whole System
```

---

# 8. Status and progress

Resolve status from `LearnerCourseState`.

Never read progress from the canonical course.

Suggested rendering:

- completed: clear completion marker;
- in progress: small progress line / percentage;
- not started: subtle status;
- locked: lock state plus prerequisite.

Status should be useful but visually secondary to developmental meaning.

---

# 9. Sidebar inspector

The right sidebar can resolve a selected course by ID and combine:

## Canonical course data

- name
- description
- pathway
- category
- level
- type
- length
- develops
- prerequisite / unlock

## Learner context

- recommendation reason
- priority
- progress

## Map context

- why this sector is active;
- what the category means.

This prevents map cards from becoming crowded.

---

# 10. Recommended map labels

## Strengths

Type sector:
`TYPE 9 — INTEGRATION & FACILITATION`

Course role:
`STRENGTH`

Advanced chained course:
`STRENGTH MASTERY`

## Stress & Growth

Stress course:
`PRESSURE PRACTICE`

Growth course:
`GROWTH RESOURCE`

General:
`CORE RESILIENCE`

## Fortification

Course:
`FORTIFICATION`

Type sector:
`TYPE 8 — DIRECTNESS & PROTECTIVE AGENCY`

## Team

Type course:
`TYPE PERSPECTIVE`

Center:
`CENTER COLLABORATION`

General:
`TEAM PRACTICE`

Advanced shared:
`SHARED TEAM CAPABILITY`

---

# 11. Avoid duplicated courses across pathways

The v2 model reused the same course in several territories.

The v3 model intentionally does not.

If two pathways need similar subject matter, create courses that fit their distinct developmental contexts.

Example:

### Strengths / Type 8
`S8-01 Clean Directness`

Focus:
Refine directness that already comes naturally.

### Fortification / Type 8
`F8-01 Assertiveness and Clean Boundaries`

Focus:
Build greater access to directness and boundaries when these are less familiar.

They are related subjects, but the learning story is different.

That difference is exactly what makes the pathway maps meaningful.

---

# 12. Development-map counts

The v3 catalogue currently contains:

- **22 Strengths courses**
- **36 Stress & Growth courses**
- **18 Fortification courses**
- **20 Team courses**

Total:

**96 demo courses**

The UI should never attempt to show all 96 simultaneously.

The catalogue is intentionally richer than any one learner view.

---

# 13. Personalisation is a view, not a catalogue mutation

Switching from Emily to James should not rewrite course objects.

It changes:

- active Strengths sectors;
- selected Stress/Growth categories;
- active Fortification sectors;
- relevant Team type courses;
- recommendation priority/reasons;
- learner progress.

This is an important test of whether the data architecture is clean.

---

# 14. Future-proofing

The Enneagram map is one projection.

The canonical course model intentionally separates:

- course content;
- assessment/profile;
- recommendation;
- progress;
- map placement.

A future assessment system could use:

- different dimensions;
- different categories;
- a different geometry;

while still reusing the same LMS architecture.
