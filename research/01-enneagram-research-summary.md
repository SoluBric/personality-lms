# Enneagram Research Summary

## Executive Summary

The Enneagram can support a strong demo experience because it gives nine recognizable behavioral patterns, maps naturally to strengths and blind spots, and is easy to connect to personal development pathways. For this project, the best product framing is:

> "Your scores show which patterns are most available to you right now. The LMS helps you strengthen useful capacities across all nine areas, not lock you into one identity."

That framing avoids overclaiming. It should now be adapted to an Aephoria-style result structure: a main type, an ordered trifix, and optionally an instinct stack. The previous "top three weighted results" model is still useful, but the product language should name the first score as the main type and treat the next two as secondary influences.

## Evidence and Credibility Notes

The Enneagram is widely used in coaching, leadership, and organizational development, but it is not as empirically established as major trait models such as the Big Five. Some published work discusses Enneagram personality styles in relation to psychology and coaching, but the instrument ecosystem is inconsistent and should not be presented as clinical assessment.

Practical implication for the demo:

- Use language like "patterns", "tendencies", "development focus", and "capacity".
- Avoid language like "diagnosis", "scientific profile", "fixed type", or "predictive accuracy".
- Make it clear that recommendations are reflective and developmental.
- Build the LMS around skills and behaviors, not around personality labels alone.
- Treat trifix and instinct results as coaching heuristics. They are useful for demo personalization, but less standardized than the core nine-type model.

## Useful Enneagram Concepts for the App

### Nine Types

The common type names used in many public Enneagram resources are:

1. Reformer / Perfectionist
2. Helper / Giver
3. Achiever / Performer
4. Individualist / Creative
5. Investigator / Observer
6. Loyalist / Skeptic
7. Enthusiast / Optimist
8. Challenger / Protector
9. Peacemaker / Mediator

The uploaded Aephoria-style wheel uses more vivid workplace/persona headings. These are better for this demo's visual interface because they feel concrete and memorable:

1. Meticulous Judge
2. Supportive Cheerleader
3. Ambitious Task Master
4. Sensitive Maverick
5. Expert Observer
6. Vigilant Questioner
7. Positive Dreamer
8. Tough Protector
9. Adaptive Diplomat

Recommendation: use the Aephoria-style headings as the app's display names, and keep the traditional names as secondary reference labels in research, tooltips, or expanded type detail.

### Three Centers

The nine types are often grouped into three centers:

- Body / Instinctive: 8, 9, 1
- Heart / Feeling: 2, 3, 4
- Head / Thinking: 5, 6, 7

This grouping is useful for the interface because it can drive ring segments, cluster views, filters, and course pathways.

### Main Type and Trifix

The trifix/tritype idea says that a person may show one prominent pattern from each center: one Body type, one Heart type, and one Head type. In the uploaded Aephoria direction, the result can be presented as:

- Main type: the highest weighted type.
- Trifix: the main type followed by the second and third highest types.
- Center signal: whether the trifix includes balanced representation across Body, Heart, and Head.

For the demo, use `trifix` as an ordered top-three code, such as `3-8-5`. If the top three do not include all three centers, still preserve the measured top three, then show a secondary "center gap" insight. That is simpler and more honest than forcing one type from every center.

### Instincts

Modern Enneagram teaching commonly discusses three instinctual drives:

- Self-preservation: safety, resources, wellbeing, practical security.
- Social: belonging, contribution, role, group standing.
- Sexual / one-to-one: intensity, attraction, deep focus, close bonds.

These are often represented as a dominant instinct or an ordered stack such as `sp/so/sx`. Instincts can add useful texture, but they also create 27 subtype combinations before trifix is even considered. Recommendation: include instinct stack as a small "operating context" chip in the demo user profile, but do not build separate course catalogs for all instinct/type combinations yet.

### Development Logic

The best LMS interpretation is that each type represents a capacity:

- Type 1 / Meticulous Judge: integrity, quality, disciplined improvement
- Type 2 / Supportive Cheerleader: support, empathy, relational attunement
- Type 3 / Ambitious Task Master: achievement, goal focus, adaptive execution
- Type 4 / Sensitive Maverick: emotional literacy, identity, creative expression
- Type 5 / Expert Observer: analysis, expertise, mental clarity
- Type 6 / Vigilant Questioner: risk awareness, loyalty, preparedness
- Type 7 / Positive Dreamer: possibility, reframing, energetic experimentation
- Type 8 / Tough Protector: courage, directness, protective leadership
- Type 9 / Adaptive Diplomat: mediation, steadiness, inclusive perspective

Every person can develop every capacity. A high score can point to a strength that needs maturity; a low score can point to a useful capacity that may need practice.

## App Content Strategy

### Individual Results

An individual results view should include:

- A weighted nine-type ring.
- Main type hero card.
- Ordered trifix path with the second and third patterns shown as supporting influences.
- Optional instinct stack chip.
- Center balance summary.
- Strengths currently available.
- Blind spots and stress risks.
- Recommended course pathway.
- "Build this capacity" actions for all nine types.

### Team Results

A team view should include:

- Aggregate nine-type distribution.
- Center distribution.
- Team strengths based on the strongest shared capacities.
- Team risks based on overrepresented and underrepresented capacities.
- Suggested team practice modules.
- Pair or subgroup friction notes, phrased constructively.

### LMS Pathways

Courses should be linked to type capacities rather than only to type labels. For example:

- A person high in Type 8 may take "Power with Calibration" to mature their dominant pattern.
- A person low in Type 8 may take "Constructive Assertiveness" to build access to that capacity.
- A team low in Type 9 may take "Conflict Mediation and Shared Understanding".
- A user with main Type 3 and trifix `3-8-5` can receive one course for dominant pattern maturity, one for trifix calibration, and one for the lowest center/type gap.

## Sources

- The Enneagram Institute, "The Nine Enneagram Type Descriptions": https://www.enneagraminstitute.com/type-descriptions/
- The Narrative Enneagram, "In the Workplace": https://www.narrativeenneagram.org/in-the-workplace/
- Integrative9, "Enneagram in Business": https://www.integrative9.com/enneagram/business/
- Sutton, A., Allinson, C., & Williams, H. M. (2013), "Personality type and work-related outcomes: An exploratory application of the Enneagram model": https://doi.org/10.1016/j.emj.2012.12.004
- Hook, J. N., Hall, T. W., Davis, D. E., Van Tongeren, D. R., & Conner, M. (2021), Enneagram-related validity discussion in clinical/personality literature: https://doi.org/10.1002/jclp.23097
- Kastelein, K. (2021), "The reliability and validity of the Open Enneagram of Personality Scales": https://www.jstor.org/stable/community.37867795
- Katherine Fauvre, "Instinctual Type and Subtype Origins": https://www.katherinefauvre.com/subtypes
- Katherine Fauvre, Tritype and instinctual subtype overview: https://www.katherinefauvre.com/
- Vanderbilt University Center for Teaching, "Bloom's Taxonomy": https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/
- The Learning Agency Lab, "Learning Engineering Toolkit" for practice, feedback, and learning design concepts: https://www.the-learning-agency-lab.com/the-learning-engineering-toolkit
