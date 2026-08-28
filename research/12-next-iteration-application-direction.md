# Next Iteration Application Direction

This is a working synthesis after reviewing the current web app alongside `enneagram-content/` and `blueprints/`. It is not a locked specification. It should guide the next implementation pass and can change as the interface improves.

## Overall Direction

The demo should show a connected development system, not a personality-themed course catalogue.

The strongest through-line is:

```text
Assessment pattern
  -> self-understanding
  -> development opportunity
  -> skill
  -> course
  -> pathway
  -> team development
```

The app should make those relationships visible through the interface. It does not need exhaustive Enneagram theory, complete course lessons, or full production LMS functionality.

## What To Preserve From The Current App

- Dark/light mode and theme color switching.
- The single learner perspective with a demo member switcher.
- The interactive nine-type wheel as the profile anchor.
- Ranked pattern distribution.
- The idea that all nine patterns remain explorable.
- Recommendation cards that explain why a course appears.
- Compact team summary below the individual profile.

## What Should Change

### 1. Align Demo Data With The New Content

The current app has four members and invented teams. The reference content now defines six members:

- Emily Carter: `9 / 2 / 6`, Team Atlas
- James Bennett: `8 / 3 / 1`, Team Atlas
- Sophie Harris: `4 / 7 / 1`, Team Atlas
- Thomas Parker: `5 / 6 / 7`, Team Atlas
- Sarah Mitchell: `9 / 5 / 3`, Team Beacon
- Oliver Grant: `3 / 7 / 8`, Team Beacon

Next implementation should switch to these six personas and preserve the exact teams because the relationship and recommendation content has been written around them.

### 2. Use Neutral Top-Three Language In The Product

The reference material warns that this demo is not formal Trifix/Tritype methodology. The app can still show `9 / 2 / 6`, but the visible product language should lean toward:

- Type Profile
- Profile Blend
- Primary / Secondary / Tertiary patterns
- Top-three pattern

`Trifix` can remain an internal/content shorthand, but the app should avoid over-presenting it as a formal psychological claim.

### 3. Separate Personality Patterns From Skills

The current app still maps type directly to courses in places. The new content is stronger:

```text
Type signal -> development reason -> skill -> course
```

The next pass should introduce the 18-skill taxonomy and 22-course catalogue. Courses should not be hard-coded as "Type 8 course" or "Type 9 course". A course like `C06 Constructive Conflict` can be recommended to different people for different reasons.

### 4. Make Pathways A First-Class Demo Area

The current "Recommended pathways" section is useful but shallow. The reference content defines named visible pathways per learner:

- Emily: Healthy Boundaries -> Finding Your Voice -> Constructive Conflict -> Facilitating Productive Disagreement
- James: Listening Before Leading -> Collaborative Influence -> Delegating for Ownership -> Leading with Strength and Space
- Sophie: Priorities That Hold -> From Idea to Delivery -> Feedback Without Losing the Work -> Sustainable Execution
- Thomas: Calibrating Risk -> Decisions Without Certainty -> From Analysis to Action -> Strategic Communication
- Sarah: Finding Your Voice -> Strategic Communication -> Collaborative Influence -> Facilitating Productive Disagreement
- Oliver: Listening Before Leading -> Consultative Stakeholder Conversations -> Priorities That Hold -> Sustainable Execution

This should become the next major visual/interaction improvement.

### 5. Treat Team As Relationship Guidance, Not Full Profile Exposure

The Team area should show selected working-style information, not private psychological detail.

For another team member, show:

- name and role
- primary / secondary / tertiary pattern
- what they may naturally contribute
- where misunderstanding may occur
- how to work well with them
- shared courses or joint development themes

Avoid exposing:

- full nine-score distribution
- private stress details
- private blind-spot notes
- psychological health/development level

### 6. Add Relationship-Specific Views

The team content contains seven actual pair relationships. These are high-value for the demo because they show that the same colleague relationship can be interpreted differently depending on the viewer.

The next Team section/page should support:

- selecting a colleague
- complementarity
- likely misunderstanding
- potential friction
- "what I can learn from them"
- "what to keep in mind"
- shared courses

This is more compelling than a generic team-members list.

## Recommended Next Build Slice

The next implementation should be a data/model pass plus two UI upgrades.

### Data/Model Pass

Create structured Svelte data for:

- nine types
- 18 skills
- 22 courses
- six members
- individual recommendations
- pathways
- two teams
- seven pair relationships

Keep this in a local module such as `src/lib/demo-data.ts` so the page component becomes easier to reason about.

### UI Upgrade 1: Stronger Overview

Replace the current hard-coded four-person content with the six-person model.

The Overview page should show:

- profile wheel
- primary / secondary / tertiary pattern
- pattern distribution
- development opportunities
- top recommendation reasons
- current pathway preview
- team relationship preview

### UI Upgrade 2: Pathways Mode

The `Pathways` nav item should become an in-app mode before becoming a separate route.

It should show:

- four development territories
- the learner's visible pathway
- skill nodes connected to course nodes
- recommendation reasons
- progress without implying a global psychological score

## Design Judgement

The strongest visual metaphor is a professional development landscape or network, not a game-like skill tree copied literally. It can borrow satisfying progression ideas, but should stay clean, credible, and work-oriented.

For the demo, the app should prioritize:

- clear relationship between concepts
- interactive exploration
- smooth transitions
- understandable recommendations
- enough content to feel real

It should defer:

- full course content
- full development-level interaction
- full route architecture
- authentication
- persistent database state
- exhaustive type-combination coverage

## Immediate Next Step

Refactor the app into:

- `src/lib/demo-data.ts`
- `src/routes/+page.svelte`
- `src/routes/layout.css`

Then update the app to use the six-person Team Atlas / Team Beacon data and add an in-page nav mode for `Overview`, `Pathways`, and `Team`.

