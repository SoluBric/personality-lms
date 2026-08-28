# Demo LMS Course Reset v3 — Document and Code Migration Plan

**Purpose:** Identify which existing documents and code structures should remain, be rewritten, or be retired so the project has one coherent course model.

## 1. Why a reset is needed

The project currently contains three overlapping generations of course thinking:

1. an early **type-linked course** model in `research/04-lms-course-catalog.md`;
2. the later **18 skills + 22 reusable courses + multi-territory recommendations** model in `enneagram_demo_skills_courses_recommendations.md`;
3. the recent **Development Map v2** model adding type affinities, Txx / TPxx / COLxx courses and map-placement concepts.

The new direction is simpler and more useful for the demo:

> Every course belongs to exactly one of four pathways, and its category determines where it sits inside that pathway.

The four canonical pathways are:

- `Strengths`
- `Stress & Growth`
- `Fortification`
- `Team`

The Enneagram is being used as a rich demo scaffold for mapping courses and showing interactive learning structures. Type-associated skills are therefore an intentional presentation/content convention for the demo, not a claim that a skill is exclusive to one type.

---

# 2. Canonical v3 files

The following new files should become the primary course references:

1. **`01-course-system-architecture-v3.md`**  
   Defines the new course model, metadata, pathway/category rules, skill territories, recommendation separation, progression rules and code-shape guidance.

2. **`02-course-catalog-v3.yaml`**  
   Canonical structured course data. This is the file Codex should convert into TypeScript/JSON/database seed data.

3. **`03-demo-recommendations-v3.md`**  
   Curated demo recommendations for the six personas and the two teams using the new course IDs.

4. **`04-development-map-rules-v3.md`**  
   Explains how pathway/category/level data maps into the Pathways interface without hard-coding course coordinates.

---

# 3. Documents to retire or move to an archive

These files conflict materially with the v3 model and should not remain beside the canonical documents without a clear `ARCHIVE` label.

## `research/04-lms-course-catalog.md`

**Retire.**

Why:
- contains the old one-course-per-type catalogue;
- does not use the four canonical pathways;
- uses a different course ID system;
- has center pathways that do not match the new pathway/category model.

Its useful course ideas have been absorbed or reinterpreted in v3.

---

## `research/07-recommendation-logic.md`

**Retire and replace later if recommendation automation is expanded.**

Why:
- assumes old type-linked course IDs;
- includes instinct-stack modifiers even though instincts were intentionally removed from the current demo scope;
- recommends center-gap and lowest-score courses using an older model;
- does not reflect the new four-pathway/category architecture.

The v3 recommendation layer should use pathway-specific logic instead.

---

## `research/10-course-detail-template.md`

**Retire.**

Why:
- assumes `linked_type`, `linked_capacity`, instinct variants and an older type-course model;
- mixes canonical course definition with personalised recommendation reason;
- needs to be replaced by the v3 metadata schema.

The useful concept of a lightweight course page remains, but the field model changes.

---

## `research/12-next-iteration-application-direction.md`

**Archive as historical direction.**

Why:
- explicitly says courses should not be hard-coded as Type 8 / Type 9 courses;
- was correct for the previous architecture but conflicts with the new demo-mapping convention;
- refers to the old 18-skill / 22-course catalogue as the next target.

The broad product ideas remain useful, but it should not guide current course implementation.

---

## `enneagram-content/new/enneagram_demo_development_map_content_model_v2.md`

**Retire.**

Why:
- it was an intermediate bridge;
- adds Txx / TPxx / COLxx course families that are superseded by the v3 catalogue;
- uses multi-territory course membership rather than the new one-pathway-per-course model;
- should not remain as a competing source of course truth.

---

## `enneagram-content/enneagram_demo_skills_courses_recommendations.md`

**Retire as a canonical course source.**

Why:
- defines the old 18-skill / C01–C22 catalogue;
- allows courses to belong to multiple territories;
- embeds course progress in the catalogue concept;
- uses a recommendation system that predates the new four-pathway category model.

Some titles and concepts were reused when useful, but the v3 YAML is now authoritative.

---

# 4. Documents that need a rewrite rather than simple retirement

## `enneagram-content/enneagram_demo_lms_conceptual_model.md`

**Rewrite / replace with the v3 course architecture.**

Keep:
- weighted top-three profile concept;
- Pattern / State / Capability / Context distinction;
- development means increasing flexibility;
- strengths should be developed, not only deficits;
- vertical health/development is not the same as course completion;
- team context matters.

Rewrite:
- the four development territories as the four canonical **course pathways**;
- skill/capability architecture so each type has a useful associated skill territory;
- old statements that resist type-to-skill association;
- old learning-world diagrams.

The new architecture document is intended to replace the course-development portions of this file.

---

## `blueprints/enneagram_demo_pathways_development_design_reference.md`

**Rewrite.**

The old document is helpful historically but assumes a looser graph model in which skills/courses/pathways can belong to several territories.

The new blueprint should be based on:

- one pathway per course;
- pathway-specific categories;
- Strengths = top-three type sectors;
- Stress & Growth = stress-N / growth-N / general;
- Fortification = non-top-three type sectors;
- Team = type / center / general;
- optional linked course chains.

`04-development-map-rules-v3.md` provides the new content-side rules for this rewrite.

---

## `blueprints/enneagram_demo_learning_course_design_reference.md`

**Targeted rewrite.**

Keep:
- simple course page;
- recommendation reason;
- course description;
- progress;
- related learning;
- placeholder lesson content.

Update:
- course metadata to v3;
- pathway and category are first-class fields;
- personalised recommendation reason should not live in the canonical course object;
- type association is contextual and pathway-specific;
- remove assumptions that one course naturally belongs to several pathways.

---

## `enneagram-content/enneagram_demo_team_relationships_pathways.md`

**Keep the relationship analysis, rewrite the learning references.**

The pair dynamics are still valuable and should not be discarded.

Rewrite:
- old C01–C22 course references;
- old shared team pathways;
- learning suggestions so they use the new `TM-*` Team pathway courses.

This can be done after the new catalogue is integrated.

---

## `blueprints/enneagram_demo_team_relationships_design_reference.md`

**Minor-to-moderate update after Team courses are integrated.**

The interface concepts remain compatible:
- perspective switching;
- complementarity;
- friction;
- shared development.

Replace old course names/IDs with the v3 Team catalogue where necessary.

---

# 5. Documents that can remain substantially unchanged

## `enneagram-content/enneagram_demo_foundation_parts_1_to_3.md`

**Keep.**

Why:
- primarily profile/type/persona content;
- intentionally predates the course catalogue;
- does not prescribe the old course model in detail.

Its "next phase" section is historical but not dangerous if the canonical v3 files are clearly identified.

---

## `enneagram-content/enneagram_demo_content_blueprint.md`

**Keep, optionally add a short supersession note.**

It correctly describes the personality-content blueprint and intentionally leaves formal course design to a later phase.

---

## `research/01-enneagram-research-summary.md`

**Keep.**

Research background only.

---

## `research/03-type-development-map.md`

**Keep as profile/type reference, but treat its `LMS links` as illustrative historical examples.**

If desired, remove the `LMS links` lines to avoid old course-name confusion.

---

## `research/05-demo-users-and-teams.md`

**Keep.**

Persona/team source material.

---

## `research/06-aephoria-model-assessment.md`

**Keep.**

Background research; not a course-system authority.

---

## `research/08-result-view-content-hierarchy.md`

**Keep with only incidental copy updates if needed.**

---

## `research/09-team-dynamics-matrix.md`

**Keep.**

Team dynamics remain useful independently of course IDs.

---

## `research/11-terminology-and-copy-guide.md`

**Keep.**

Update only if the term `Fortification` needs to be added.

---

## `blueprints/enneagram_demo_profile_page_design_reference.md`

**Keep.**

The Profile structure remains compatible. Update old wording such as "Fortify Growth Areas" to `Fortification` where it appears in learning links.

---

## `blueprints/enneagram_demo_dashboard_navigation_design_reference.md`

**Keep.**

Only update example course/pathway names if desired.

---

# 6. Current code audit

The current implementation already contains useful pieces, but the data model reflects the superseded v2 architecture.

## Current `Course` issues

The present `Course` type includes:

- `territories: Territory[]`
- `primarySkill`
- `secondarySkills`
- `progress`
- `typeAffinity`
- `category` using old values such as `Core`, `Type Development`, `Type Perspective`, `Collaboration`

These should change.

### v3 direction

A canonical course should have:

- exactly one `pathway`;
- exactly one pathway-valid `category`;
- `develops[]` rather than primary/secondary skill hierarchy unless a primary skill is genuinely useful;
- no learner progress on the canonical course;
- prerequisites/unlocks only where a real chain exists;
- course format/type;
- level;
- duration;
- generic recommendation conditions/context.

Learner progress belongs in separate learner state.

---

## Current progress problem

In `src/lib/demo-data.ts`, `progress` currently lives directly on `Course`.

That means the same course has one global progress value regardless of which persona is selected.

This is structurally wrong for the demo once multiple people use the same catalogue.

Create something conceptually like:

```ts
type LearnerCourseState = {
  learnerId: string;
  courseId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progressPct: number;
};
```

---

## Current multi-territory problem

Courses currently contain arrays such as:

```ts
territories: ['Fortify Growth Areas', 'Team Development']
```

The new model intentionally removes this ambiguity.

A course belongs to one canonical pathway.

If a similar learning topic is needed in another pathway, use a different course designed for that pathway/context.

This is important because map placement now depends on pathway/category.

---

## Current `typeAffinity` problem

The v2 code uses multi-type affinities on the course itself.

In v3:

- Strengths / Fortification type category already tells the map which type zone owns the course;
- Stress & Growth category tells the map which base-type stress/growth path it belongs to;
- Team category tells the map whether it is type-specific, center-specific or general.

Skills may still be associated with several types conceptually, but a course's display location should be unambiguous.

---

## Current Pathways map problem

The current Pathways route has substantial custom node-generation logic and intermediate v2 course IDs.

Do not keep extending those hard-coded course arrays.

Once v3 data is integrated, map data should be derived from:

```text
course.pathway
course.category
course.level
course.chain / prerequisites
selected learner profile
selected learner primary type
selected team
learner course state
```

Coordinates can then be generated by the view.

---

# 7. Recommended project folder cleanup

A clean future structure could be:

```text
enneagram-content/
  foundation/
    enneagram_demo_content_blueprint.md
    enneagram_demo_foundation_parts_1_to_3.md

  course-system/
    01-course-system-architecture-v3.md
    02-course-catalog-v3.yaml
    03-demo-recommendations-v3.md
    04-development-map-rules-v3.md

  team/
    team_relationships_v3.md

archive/
  research-04-lms-course-catalog.md
  research-07-recommendation-logic.md
  research-10-course-detail-template.md
  research-12-next-iteration-application-direction.md
  enneagram_demo_skills_courses_recommendations.md
  enneagram_demo_lms_conceptual_model.md
  enneagram_demo_development_map_content_model_v2.md
```

The exact folders are optional.

The important thing is that Codex can clearly distinguish **canonical current material** from **historical exploration**.

---

# 8. Source-of-truth order after the reset

For anything course-related:

1. `01-course-system-architecture-v3.md`
2. `02-course-catalog-v3.yaml`
3. `03-demo-recommendations-v3.md`
4. `04-development-map-rules-v3.md`

For type/profile/persona facts:

1. foundation/content files
2. persona/team research

For UI inspiration:

1. current blueprints after course references are updated
2. existing implementation

This prevents old course documents from silently reintroducing conflicting assumptions.
