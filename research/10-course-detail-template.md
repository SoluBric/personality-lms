# Course Detail Template

Use this structure for every LMS course. It keeps content consistent and gives the later app predictable fields for cards, course pages, progress views, and completion states.

## Course Fields

- `id`
- `title`
- `linked_type`
- `linked_capacity`
- `level`
- `format`
- `duration_minutes`
- `recommended_for`
- `why_recommended`
- `outcomes`
- `modules`
- `practice`
- `reflection_prompt`
- `completion_artifact`
- `team_variant`
- `instinct_variants`
- `related_courses`

## Page Structure

### 1. Course Header

Content:

- Course title.
- Linked type heading.
- Capacity.
- Format and duration.
- Recommendation reason.

Example:

- "Constructive Assertiveness"
- "Linked capacity: Type 8 / Tough Protector"
- "Scenario lab · 35 minutes"
- "Recommended because Type 8 is underused in your profile and your goal is to lead difficult conversations."

### 2. Why This Matters

Purpose: connect personality result to real behavior.

Template:

> This course develops [capacity]. It is useful when [common situation]. The goal is not to become a different type, but to build more access to this capacity when it is needed.

### 3. Learning Outcomes

Use three outcomes maximum for the demo.

Outcome pattern:

- Recognize...
- Practice...
- Apply...

Example:

- Recognize when directness becomes force or avoidance.
- Practice clean requests with calibrated intensity.
- Apply assertiveness in a real conversation script.

### 4. Modules

Use three modules per course for the first demo.

Module fields:

- `title`
- `time_minutes`
- `content_type`
- `summary`
- `interaction`

Example:

1. Clean Directness
2. Force vs Clarity
3. Repair After Impact

### 5. Practice

Every course needs an action.

Practice types:

- Script a conversation.
- Complete a reflection.
- Run a team ritual.
- Rewrite a message.
- Build a decision brief.
- Choose a real-life experiment.

### 6. Reflection Prompt

Use one sharp prompt.

Examples:

- "Where did I confuse speed with effectiveness?"
- "What support did I offer that was not actually requested?"
- "What risk did I name, and what decision did I make after naming it?"

### 7. Completion Artifact

This gives the LMS a concrete progress object.

Examples:

- Boundary script.
- Decision brief.
- Premortem notes.
- Quality bar checklist.
- Conflict map.
- Option list with chosen next step.

### 8. Team Variant

Optional but useful.

Template:

- Individual version: personal reflection and practice.
- Team version: shared ritual, group discussion, or facilitated exercise.

### 9. Instinct Variants

Keep this small.

- `sp`: examples focus on energy, routines, safety, resources.
- `so`: examples focus on team role, belonging, contribution, expectations.
- `sx`: examples focus on one-to-one intensity, commitment, attraction, direct bonds.

## Example Course Page

### T8-ASSERTIVENESS: Constructive Assertiveness

- Linked type: 8 / Tough Protector
- Capacity: courage, directness, boundaries
- Level: foundation
- Format: scenario lab
- Duration: 35 minutes
- Recommended for: users high in Type 8 needing calibration, users low in Type 8 needing access to directness, teams low in boundaries
- Why recommended: this course builds clear requests, calibrated intensity, and repair after forceful impact

Outcomes:

- Recognize the difference between force, clarity, and avoidance.
- Practice direct requests at three intensity levels.
- Apply a repair move after unintended impact.

Modules:

1. Clean Directness: convert frustration into a clear request.
2. Force vs Clarity: identify when intensity helps and when it overwhelms.
3. Repair After Impact: restore trust without abandoning the boundary.

Practice:

- Write a difficult conversation script in three versions: too soft, too forceful, and cleanly direct.

Reflection prompt:

- "Where do I need more directness, and where do I need more calibration?"

Completion artifact:

- A saved conversation script.

Team variant:

- Define decision rights for one current project and name the escalation path.

Instinct variants:

- `sp`: focus on boundaries around time, workload, and resources.
- `so`: focus on directness around team roles and expectations.
- `sx`: focus on directness in one-to-one trust and commitment conversations.

