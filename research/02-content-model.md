# Proposed Content Model

This is not final database schema. It is a stable enough content model for the later SvelteKit app and can be converted into JSON, TypeScript constants, SQLite/D1 tables, or CMS collections.

## Core Entities

### User

- `id`
- `name`
- `role`
- `team_id`
- `avatar_style`
- `scores`: object keyed by Enneagram type number, value 0-100
- `main_type`: highest weighted type number
- `trifix`: ordered list of the top three type numbers, displayed as a code such as `3-8-5`
- `center_gap`: optional lowest represented center or missing center in the top three
- `instinct_stack`: optional ordered list using `sp`, `so`, and `sx`
- `development_goal`: short user-selected goal
- `recommended_course_ids`

### Enneagram Type

- `number`
- `display_name`: Aephoria-style heading for the app interface
- `traditional_name`: common Enneagram label for reference
- `center`: body, heart, or head
- `core_capacity`
- `healthy_expression`
- `overused_expression`
- `underused_expression`
- `blind_spots`
- `growth_practices`
- `course_ids`
- `ring_color`

### Instinct

- `code`: sp, so, or sx
- `name`: self-preservation, social, or sexual / one-to-one
- `focus`
- `healthy_expression`
- `overused_expression`
- `learning_design_note`

### Course

- `id`
- `title`
- `linked_type`
- `capacity`
- `level`: foundation, applied, advanced, team
- `duration_minutes`
- `format`: micro-course, scenario lab, reflection sprint, team workshop
- `outcomes`
- `modules`
- `practice`
- `evidence_notes`

### Team

- `id`
- `name`
- `mission`
- `member_ids`
- `aggregate_scores`
- `dominant_centers`
- `team_strengths`
- `team_risks`
- `recommended_course_ids`

## Recommendation Rules

Use layered recommendations rather than a single formula.

### 1. Dominant Pattern Maturity

If a type is in the user's top three, recommend a course that helps mature that capacity.

Example: High Type 3 leads to "Achievement Without Overidentification".

### 2. Trifix Calibration

Use the ordered trifix to explain how the user's main type is supported by secondary strategies.

Example: `3-8-5` can be described as achievement led by decisive protection and analytical control. Recommend one course that matures the main type and one that improves the most likely trifix friction.

### 3. Blind Spot Compensation

If a type is very low compared with the user's top three, recommend a foundational course for that capacity.

Example: Low Type 9 leads to "Perspective Holding and Mediation Basics".

### 4. Center Balance

If one center is much lower than the others, recommend a center-level pathway.

Example: low Body center leads to decision, boundary, and implementation practices.

### 5. Team Gap

If the team has weak aggregate coverage in a type or center, recommend a team course.

Example: team low in Type 6 leads to "Premortems, Risk Language, and Trust Under Pressure".

### 6. Instinct Context

Use instinct stack as a modifier for examples, scenarios, and reflection prompts.

Example: `sp/so/sx` should receive practical resource and sustainability examples before group-status or one-to-one intensity examples.

Do not create 27 subtype course paths for the first demo. That would multiply content too early.

### 7. User Goal

User-selected goals should override personality-derived suggestions when relevant.

Example: a user who selects "leading difficult conversations" should see assertiveness, mediation, and emotional regulation modules even if those are not obvious from their top scores.

## Interface Implications

- The main results ring can show all nine scores using a conic gradient.
- Clicking a type can expand a focused view with strengths, risks, and course cards.
- A center toggle can animate between all types, center clusters, and team overlay.
- Course cards should show why they are recommended: "mature your main Ambitious Task Master pattern", "calibrate your 3-8-5 trifix", "build underused Tough Protector capacity", or "support team gap in Type 6".
- The app should allow browsing all courses by capacity, because development should not be locked to the user's top scores.
- Instinct chips should be compact and secondary, for example `sp/so/sx · practical security first`.
