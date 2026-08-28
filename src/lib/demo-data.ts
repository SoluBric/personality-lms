import catalogData from './course-catalog-v3.json';

export type Center = 'Body' | 'Heart' | 'Head';
export type InsightKind = 'patterns' | 'growth' | 'blind';
export type Territory = 'Strengthen Strengths' | 'Stress & Growth' | 'Fortify Growth Areas' | 'Team Development';

export type EnneagramType = {
	number: number;
	name: string;
	traditional: string;
	center: Center;
	capacity: string;
	description: string;
	healthyExpression: string;
	overusedExpression: string;
	underusedExpression: string;
	blindSpotsDetailed: string[];
	growthPractices: string[];
	developmentQuestion: string;
	developmentLevels: DevelopmentLevel[];
	strengths: string[];
	weaknesses: string[];
	skills: string[];
	color: string;
};

export type DevelopmentLevel = {
	level: number;
	band: 'Flexible' | 'Balanced' | 'Reactive';
	title: string;
	summary: string;
	signal: string;
};

export type Skill = {
	id: string;
	name: string;
	category: 'type' | 'general';
	description: string;
	typeNumber?: number;
};

export type CoursePathway = 'strengths' | 'stress-growth' | 'fortification' | 'team';
export type CourseLevel = 'foundation' | 'intermediate' | 'advanced';
export type CourseStatus = 'not-started' | 'in-progress' | 'completed';

export type Course = {
	id: string;
	name: string;
	description: string;
	lengthMinutes: number;
	pathway: CoursePathway;
	category: string;
	level: CourseLevel;
	courseType: 'micro-course' | 'guided-practice' | 'reflection-sprint' | 'scenario-lab' | 'workshop' | 'team-workshop';
	audience: 'individual' | 'pair' | 'team' | 'all';
	develops: string[];
	learningFocus: string[];
	recommendedWhen: string[];
	recommendationContext: string;
	prerequisites: string[];
	unlocks: string[];
	chain: { id: string; sequence: number } | null;
	map: {
		radialBand: 'inner' | 'middle' | 'outer';
		placementNote: string;
	};
};

export type Recommendation = {
	courseId: string;
	learnerId: string;
	priority: 'primary' | 'supporting' | 'explore';
	reason: string;
	source: {
		pathway: CoursePathway;
		type?: number;
		relationshipId?: string;
		teamId?: string;
	};
};

export type LearnerCourseState = {
	learnerId: string;
	courseId: string;
	status: CourseStatus;
	progressPct: number;
};

export type Member = {
	id: string;
	name: string;
	role: string;
	teamId: string;
	primaryType: number;
	profile: number[];
	profileName: string;
	scores: Record<number, number>;
	summary: string;
	profileDescription: string;
	patterns: string[];
	growthEdges: string[];
	blindSpots: string[];
};

export type Team = {
	id: string;
	name: string;
	description: string;
	memberIds: string[];
	strengths: string[];
	risks: string[];
	priorities: string[];
	pathwayName: string;
	pathwayCourseIds: string[];
};

export type Relationship = {
	id: string;
	teamId: string;
	memberIds: [string, string];
	complementarity: string;
	friction: string;
	theme: string;
	courses: string[];
	viewerNotes: Record<string, string>;
};

const developmentLevels = (capacity: string, overuse: string, practice: string): DevelopmentLevel[] => [
	{ level: 1, band: 'Flexible', title: 'Liberated capacity', summary: `The ${capacity} is available without defensiveness, pressure or identity protection.`, signal: 'Can choose the response rather than defend the pattern.' },
	{ level: 2, band: 'Flexible', title: 'Generous strength', summary: `The ${capacity} is expressed in ways that help other people and the work at the same time.`, signal: 'Uses the pattern as a contribution, not a demand.' },
	{ level: 3, band: 'Flexible', title: 'Effective expression', summary: `The pattern is visible, constructive and practically useful in ordinary work situations.`, signal: 'Strength is active while feedback still gets in.' },
	{ level: 4, band: 'Balanced', title: 'Identity investment', summary: `The person begins relying on this pattern to feel secure, valued or in control.`, signal: 'Starts needing the pattern to be recognised.' },
	{ level: 5, band: 'Balanced', title: 'Narrowing range', summary: `The pattern becomes less flexible and other response options are used less often.`, signal: `Watch for ${overuse}.` },
	{ level: 6, band: 'Balanced', title: 'Defensive repetition', summary: `The same strategy is repeated even when the situation is asking for something different.`, signal: `Development practice: ${practice}.` },
	{ level: 7, band: 'Reactive', title: 'Reactive protection', summary: `Pressure turns the pattern into a protective reflex that can distort judgement and relationships.`, signal: 'Pause before acting from urgency or threat.' },
	{ level: 8, band: 'Reactive', title: 'Constricted behaviour', summary: `The person becomes increasingly captured by the pattern and less able to take in balancing information.`, signal: 'External feedback may be dismissed, avoided or over-controlled.' },
	{ level: 9, band: 'Reactive', title: 'Pattern collapse', summary: `The pattern is no longer serving the person or the system and requires support beyond ordinary performance advice.`, signal: 'Stabilise first; do not treat this as a course-completion problem.' }
];

export const enneagramTypes: EnneagramType[] = [
	{
		number: 1,
		name: 'Meticulous Judge',
		traditional: 'Reformer / Improver',
		center: 'Body',
		capacity: 'integrity and disciplined improvement',
		description: 'This pattern notices what could be improved, clarified, cleaned up, or held to a better standard.',
		healthyExpression: 'Improves systems without shaming people or self.',
		overusedExpression: 'Rigidity, criticism and chronic dissatisfaction.',
		underusedExpression: 'Tolerating poor standards or avoiding responsibility.',
		blindSpotsDetailed: ['Impatience with messy process', 'Moral overcertainty', 'Difficulty relaxing when the work is already good enough'],
		growthPractices: ['Self-compassion', 'Iterative improvement', 'Values-based prioritisation'],
		developmentQuestion: 'What standard matters most here, and what can be improved without tightening everything?',
		developmentLevels: developmentLevels('capacity for principled improvement', 'rigidity, criticism and chronic dissatisfaction', 'self-compassion and values-based prioritisation'),
		strengths: ['Raises quality bars', 'Spots gaps in standards', 'Turns values into discipline'],
		weaknesses: ['Can become critical', 'May overcorrect small flaws', 'Can struggle to relax standards'],
		skills: ['Feedback Integration', 'Prioritisation', 'Iterative Execution'],
		color: '#eac95f'
	},
	{
		number: 2,
		name: 'Supportive Cheerleader',
		traditional: 'Helper / Supporter',
		center: 'Heart',
		capacity: 'empathy and boundaried support',
		description: 'This pattern notices people, offers help, and creates warmth without losing clean boundaries.',
		healthyExpression: 'Offers help with warmth, directness and clear boundaries.',
		overusedExpression: 'People-pleasing, rescue behaviour and indirect need expression.',
		underusedExpression: 'Emotional distance or lack of relational initiative.',
		blindSpotsDetailed: ['Hidden expectations', 'Resentment after over-giving', 'Confusing care with taking responsibility for others'],
		growthPractices: ['Boundary setting', 'Asking directly', 'Differentiating care from control'],
		developmentQuestion: 'Where can support stay generous without becoming self-erasing or controlling?',
		developmentLevels: developmentLevels('capacity for empathy and boundaried support', 'people-pleasing, rescue behaviour and indirect need expression', 'boundary setting and asking directly'),
		strengths: ['Builds trust quickly', 'Reads relational needs', 'Creates visible support'],
		weaknesses: ['Can over-help', 'May hide personal needs', 'Can carry unspoken resentment'],
		skills: ['Stakeholder Empathy & Trust', 'Boundary Setting', 'Active & Consultative Listening'],
		color: '#2fbf86'
	},
	{
		number: 3,
		name: 'Ambitious Task Master',
		traditional: 'Achiever / Performer',
		center: 'Heart',
		capacity: 'goal focus and adaptive execution',
		description: 'This pattern converts goals into visible progress, adapts to expectations, and keeps momentum high.',
		healthyExpression: 'Creates momentum while staying connected to values and people.',
		overusedExpression: 'Image management, burnout and worth tied to results.',
		underusedExpression: 'Low drive or difficulty translating ideas into visible outcomes.',
		blindSpotsDetailed: ['Emotional bypassing', 'Performative productivity', 'Impatience with slower processing'],
		growthPractices: ['Values clarification', 'Sustainable pacing', 'Honest status reflection'],
		developmentQuestion: 'What outcome matters, and how can progress stay aligned with values rather than image?',
		developmentLevels: developmentLevels('capacity for goal focus and adaptive execution', 'image management, burnout and worth tied to results', 'values clarification and sustainable pacing'),
		strengths: ['Creates momentum', 'Clarifies outcomes', 'Adapts to what works'],
		weaknesses: ['Can over-identify with results', 'May bypass emotion', 'Can make image too central'],
		skills: ['Collaborative Influence', 'Strategic Communication', 'Focus & Follow-Through'],
		color: '#86c99a'
	},
	{
		number: 4,
		name: 'Sensitive Maverick',
		traditional: 'Individualist / Creator',
		center: 'Heart',
		capacity: 'emotional literacy and creative meaning',
		description: 'This pattern brings emotional depth, originality, and meaning into work that could otherwise become flat.',
		healthyExpression: 'Brings emotional truth and originality without becoming self-absorbed.',
		overusedExpression: 'Comparison, mood identification and feeling misunderstood.',
		underusedExpression: 'Shallow emotional vocabulary or fear of distinctive expression.',
		blindSpotsDetailed: ['Idealisation', 'Withdrawal', 'Amplifying what is missing'],
		growthPractices: ['Emotional regulation', 'Disciplined creative output', 'Appreciation practice'],
		developmentQuestion: 'What is meaningful here, and what action would honour it without waiting for perfect conditions?',
		developmentLevels: developmentLevels('capacity for emotional literacy and creative meaning', 'comparison, mood identification and feeling misunderstood', 'emotional regulation and disciplined creative output'),
		strengths: ['Names emotional nuance', 'Creates distinctive ideas', 'Protects authenticity'],
		weaknesses: ['Can amplify what is missing', 'May withdraw under comparison', 'Can over-identify with mood'],
		skills: ['Emotional Regulation', 'Feedback Integration', 'Adaptability'],
		color: '#bad9c2'
	},
	{
		number: 5,
		name: 'Expert Observer',
		traditional: 'Investigator / Observer',
		center: 'Head',
		capacity: 'analysis and conceptual clarity',
		description: 'This pattern builds models, protects attention, and turns complexity into understanding.',
		healthyExpression: 'Shares knowledge generously and acts before certainty is perfect.',
		overusedExpression: 'Detachment, hoarding time or energy and analysis paralysis.',
		underusedExpression: 'Acting without enough understanding or weak mental models.',
		blindSpotsDetailed: ['Isolation', 'Low emotional participation', 'Delayed decision-making'],
		growthPractices: ['Embodied action', 'Concise communication', 'Collaborative inquiry'],
		developmentQuestion: 'What is the smallest useful action that would test the model in the real world?',
		developmentLevels: developmentLevels('capacity for analysis and conceptual clarity', 'detachment, hoarding time or energy and analysis paralysis', 'embodied action and concise communication'),
		strengths: ['Builds strong mental models', 'Finds signal in complexity', 'Protects deep work'],
		weaknesses: ['Can delay action', 'May withhold useful thinking', 'Can detach from people'],
		skills: ['Strategic Communication', 'Decision-Making Under Uncertainty', 'Iterative Execution'],
		color: '#3864b0'
	},
	{
		number: 6,
		name: 'Vigilant Questioner',
		traditional: 'Loyalist / Guardian',
		center: 'Head',
		capacity: 'preparedness and trust calibration',
		description: 'This pattern anticipates risk, tests assumptions, and helps groups prepare without drifting into fear.',
		healthyExpression: 'Anticipates problems while building shared confidence.',
		overusedExpression: 'Suspicion, anxiety loops and excessive checking.',
		underusedExpression: 'Naive optimism or poor contingency thinking.',
		blindSpotsDetailed: ['Outsourcing authority', 'Worst-case fixation', 'Testing loyalty instead of asking directly'],
		growthPractices: ['Trust calibration', 'Decision confidence', 'Premortems with closure'],
		developmentQuestion: 'What risk needs preparation, and what threshold would let the team move?',
		developmentLevels: developmentLevels('capacity for preparedness and trust calibration', 'suspicion, anxiety loops and excessive checking', 'trust calibration and premortems with closure'),
		strengths: ['Sees risk early', 'Builds contingency plans', 'Tests trust carefully'],
		weaknesses: ['Can over-check', 'May spiral in uncertainty', 'Can outsource authority'],
		skills: ['Risk Judgement', 'Decision-Making Under Uncertainty', 'Emotional Regulation'],
		color: '#8f99c5'
	},
	{
		number: 7,
		name: 'Positive Dreamer',
		traditional: 'Enthusiast / Explorer',
		center: 'Head',
		capacity: 'possibility and focused experimentation',
		description: 'This pattern opens options, reframes stuck moments, and brings energy to experimentation.',
		healthyExpression: 'Energises options while staying present to constraints.',
		overusedExpression: 'Distraction, avoidance of pain and overcommitment.',
		underusedExpression: 'Pessimism, lack of creative options or low energy for exploration.',
		blindSpotsDetailed: ['Unfinished work', 'Minimising discomfort', 'Novelty seeking when commitment is needed'],
		growthPractices: ['Focus', 'Completion rituals', 'Staying with hard emotions'],
		developmentQuestion: 'Which possibility deserves commitment, and what discomfort needs to be included?',
		developmentLevels: developmentLevels('capacity for possibility and focused experimentation', 'distraction, avoidance of pain and overcommitment', 'focus, completion rituals and staying with hard emotions'),
		strengths: ['Generates options', 'Reframes constraints', 'Energizes exploration'],
		weaknesses: ['Can scatter focus', 'May avoid discomfort', 'Can leave loops open'],
		skills: ['Prioritisation', 'Focus & Follow-Through', 'Adaptability'],
		color: '#c9cce5'
	},
	{
		number: 8,
		name: 'Tough Protector',
		traditional: 'Challenger / Protector',
		center: 'Body',
		capacity: 'courage and calibrated power',
		description: 'This pattern brings directness, protection, and the willingness to confront what others avoid.',
		healthyExpression: 'Uses power to protect, clarify and mobilise.',
		overusedExpression: 'Domination, intensity and dismissing vulnerability.',
		underusedExpression: 'Conflict avoidance, weak boundaries or difficulty taking charge.',
		blindSpotsDetailed: ['Impact of force', 'Impatience with hesitation', 'Distrust of softness or vulnerability'],
		growthPractices: ['Calibrated assertiveness', 'Vulnerability', 'Power sharing'],
		developmentQuestion: 'Where is directness useful, and where would calibrated strength create more trust?',
		developmentLevels: developmentLevels('capacity for courage and calibrated power', 'domination, intensity and dismissing vulnerability', 'calibrated assertiveness and power sharing'),
		strengths: ['Takes charge under pressure', 'Protects boundaries', 'Names hard truths'],
		weaknesses: ['Can overpower', 'May distrust vulnerability', 'Can move faster than consent'],
		skills: ['Assertive Communication', 'Delegation & Empowerment', 'Constructive Conflict'],
		color: '#f2b84b'
	},
	{
		number: 9,
		name: 'Adaptive Diplomat',
		traditional: 'Peacemaker / Harmoniser',
		center: 'Body',
		capacity: 'mediation and inclusive steadiness',
		description: 'This pattern holds multiple perspectives, steadies groups, and helps conflict become workable.',
		healthyExpression: 'Creates shared ground without disappearing.',
		overusedExpression: 'Conflict avoidance, inertia and self-forgetting.',
		underusedExpression: 'Low patience, poor listening or forcing premature decisions.',
		blindSpotsDetailed: ['Passive resistance', 'Unclear priorities', "Merging with others' agendas"],
		growthPractices: ['Priority setting', 'Conflict engagement', 'Clear preference expression'],
		developmentQuestion: 'What matters to me here, and how can I make that visible while still holding the group?',
		developmentLevels: developmentLevels('capacity for mediation and inclusive steadiness', 'conflict avoidance, inertia and self-forgetting', 'priority setting and clear preference expression'),
		strengths: ['Holds multiple views', 'Creates calm', 'Builds shared ground'],
		weaknesses: ['Can avoid conflict', 'May lose personal priority', 'Can delay decisions'],
		skills: ['Facilitation & Perspective Integration', 'Active & Consultative Listening', 'Assertive Communication'],
		color: '#f6d77a'
	}
];

type CatalogData = {
  typeSkillTerritories: Record<string, { type: number; skills: { id: string; name: string }[] }>;
  generalSkills: { id: string; name: string }[];
  courses: Course[];
  stressGrowthConnections: Record<string, { stressType: number; growthType: number }>;
};

const catalog = catalogData as unknown as CatalogData;

const sentence = (text: string) => text.endsWith('.') ? text : `${text}.`;

export const pathwayLabels: Record<CoursePathway, string> = {
  strengths: 'Strengths',
  'stress-growth': 'Stress & Growth',
  fortification: 'Fortification',
  team: 'Team'
};

export const pathwayToTerritory: Record<CoursePathway, Territory> = {
  strengths: 'Strengthen Strengths',
  'stress-growth': 'Stress & Growth',
  fortification: 'Fortify Growth Areas',
  team: 'Team Development'
};

export const territoryToPathway: Record<Territory, CoursePathway> = {
  'Strengthen Strengths': 'strengths',
  'Stress & Growth': 'stress-growth',
  'Fortify Growth Areas': 'fortification',
  'Team Development': 'team'
};

export const skills: Skill[] = [
  ...Object.values(catalog.typeSkillTerritories).flatMap((territory) =>
    territory.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      category: 'type' as const,
      description: sentence(`A Type ${territory.type} learning-territory capability used to organise demo development content`),
      typeNumber: territory.type
    }))
  ),
  ...catalog.generalSkills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    category: 'general' as const,
    description: 'A broadly useful capability that supports development across profile patterns and team contexts.'
  }))
];

export const courses: Course[] = catalog.courses;
export const stressGrowthConnections = catalog.stressGrowthConnections;

const rec = (
  learnerId: string,
  courseId: string,
  priority: Recommendation['priority'],
  pathway: CoursePathway,
  reason: string,
  source: Omit<Recommendation['source'], 'pathway'> = {}
): Recommendation => ({ learnerId, courseId, priority, reason, source: { pathway, ...source } });

export const recommendations: Recommendation[] = [
  rec('emily', 'S9-01', 'primary', 'strengths', "Emily's Type 9 pattern already gives her strong access to listening and perspective holding. This course makes that natural capacity more deliberate and usable in complex group situations.", { type: 9 }),
  rec('emily', 'S9-02', 'primary', 'strengths', "Builds directly on Emily's harmony and mediation strengths while moving beyond smoothing disagreement toward making useful differences visible.", { type: 9 }),
  rec('emily', 'S2-02', 'supporting', 'strengths', "Her Type 2 influence makes support natural; this develops support as a capability that strengthens other people's ownership rather than quietly carrying more responsibility.", { type: 2 }),
  rec('emily', 'S6-01', 'supporting', 'strengths', 'Her Type 6 influence already notices possible concerns. This course turns that signal into clearer, proportionate risk communication.', { type: 6 }),
  rec('emily', 'SG-S9-01', 'primary', 'stress-growth', "Emily's Nine stress story can move from apparent steadiness toward doubt, reassurance-seeking and hidden vigilance.", { type: 9 }),
  rec('emily', 'SG-S9-02', 'primary', 'stress-growth', 'Useful when uncertainty or the absence of consensus causes Emily to delay commitment.', { type: 9 }),
  rec('emily', 'SG-G9-01', 'primary', 'stress-growth', 'Uses Type 3-associated agency and goal visibility as a growth resource for a Type 9 primary pattern.', { type: 9 }),
  rec('emily', 'SG-GEN-02', 'supporting', 'stress-growth', 'Gives Emily a type-independent regulation practice for staying engaged when interpersonal pressure rises.'),
  rec('emily', 'SG-GEN-04', 'supporting', 'stress-growth', 'Helps turn uncertainty into a decision threshold instead of a search for complete reassurance.'),
  rec('emily', 'F8-01', 'primary', 'fortification', "Type 8's directness and boundary territory gives Emily a strong complementary capability to her natural accommodation and relationship awareness.", { type: 8 }),
  rec('emily', 'F8-02', 'primary', 'fortification', 'Extends directness into situations where conflict needs to become visible early rather than being delayed.', { type: 8 }),
  rec('emily', 'F3-01', 'supporting', 'fortification', 'Builds greater visible agency and explicit ownership without asking Emily to abandon her collaborative style.', { type: 3 }),
  rec('emily', 'F1-02', 'explore', 'fortification', 'Adds clearer standards and closure when the group could otherwise stay open too long.', { type: 1 }),
  rec('emily', 'TM-T8-01', 'primary', 'team', "James's 8-led profile makes directness and challenge especially relevant to Emily's daily team context.", { type: 8, teamId: 'atlas' }),
  rec('emily', 'TM-T4-01', 'supporting', 'team', "Helps Emily interpret Sophie's challenge and creative intensity without assuming it is relational conflict.", { type: 4, teamId: 'atlas' }),
  rec('emily', 'TM-T5-01', 'supporting', 'team', "Helps Emily distinguish Thomas's processing and analytical distance from disengagement.", { type: 5, teamId: 'atlas' }),
  rec('emily', 'TM-GEN-01', 'primary', 'team', "Useful across Team Atlas and aligned with Emily's natural listening strengths.", { teamId: 'atlas' }),
  rec('emily', 'TM-GEN-02', 'primary', 'team', 'Especially relevant to Emily-James and to Team Atlas making disagreement visible earlier.', { relationshipId: 'emily-james', teamId: 'atlas' }),
  rec('emily', 'TM-GEN-03', 'supporting', 'team', "Supports the team's recurring tension between rich input and timely decision closure.", { teamId: 'atlas' }),

  ...[
    ['james', 'S8-01', 'primary', 'strengths', 'Refines natural directness into clear challenge that others can use.', 8],
    ['james', 'S8-02', 'primary', 'strengths', 'Develops speed and confidence without forcing premature closure.', 8],
    ['james', 'S8-03', 'supporting', 'strengths', 'Advanced use of authority, challenge and delegation.', 8],
    ['james', 'S3-01', 'supporting', 'strengths', 'Strengthens visible execution and outcome clarity.', 3],
    ['james', 'S1-01', 'supporting', 'strengths', 'Develops his standards signal into more explicit quality criteria.', 1],
    ['james', 'SG-S8-01', 'primary', 'stress-growth', 'Recognises guarded distance after challenge.', 8],
    ['james', 'SG-S8-02', 'supporting', 'stress-growth', 'Provides a deliberate route back into collaboration.', 8],
    ['james', 'SG-G8-01', 'primary', 'stress-growth', 'Uses relational awareness as a growth resource for an 8-led pattern.', 8],
    ['james', 'F9-01', 'primary', 'fortification', 'Adds listening and integration before decisive closure.', 9],
    ['james', 'F9-02', 'supporting', 'fortification', 'Builds closure with real participation rather than assumed agreement.', 9],
    ['james', 'F2-02', 'supporting', 'fortification', 'Develops relational influence beyond authority and urgency.', 2],
    ['james', 'TM-T9-01', 'primary', 'team', 'Directly relevant to working with Emily.', 9],
    ['james', 'TM-GEN-01', 'primary', 'team', 'Supports listening before moving to decision.', undefined],
    ['james', 'TM-GEN-02', 'supporting', 'team', 'Makes disagreement productive and usable.', undefined],

    ['sophie', 'S4-01', 'primary', 'strengths', 'Turns emotional and aesthetic sensitivity into usable creative information.', 4],
    ['sophie', 'S4-02', 'primary', 'strengths', 'Develops originality that remains collaborative.', 4],
    ['sophie', 'S7-01', 'supporting', 'strengths', 'Sharpens option generation into opportunity judgement.', 7],
    ['sophie', 'S7-02', 'supporting', 'strengths', 'Turns possibility into testable learning.', 7],
    ['sophie', 'S1-02', 'supporting', 'strengths', 'Develops quality standards without endless refinement.', 1],
    ['sophie', 'SG-S4-01', 'primary', 'stress-growth', 'Helps recognise when longing turns into over-attunement.', 4],
    ['sophie', 'SG-G4-01', 'primary', 'stress-growth', 'Uses structure and standards as a growth resource.', 4],
    ['sophie', 'F3-01', 'primary', 'fortification', 'Adds clearer delivery ownership.', 3],
    ['sophie', 'F3-02', 'supporting', 'fortification', 'Makes progress information usable rather than threatening to identity.', 3],
    ['sophie', 'F8-01', 'supporting', 'fortification', 'Supports clear challenge and commitment points.', 8],
    ['sophie', 'TM-GEN-05', 'primary', 'team', 'Helps feedback travel without flattening the work.', undefined],
    ['sophie', 'TM-GEN-08', 'supporting', 'team', 'Turns different perspectives into one plan.', undefined],

    ['thomas', 'S5-01', 'primary', 'strengths', 'Builds deep analysis into better practical questions.', 5],
    ['thomas', 'S5-02', 'primary', 'strengths', 'Turns evidence and models into strategic synthesis.', 5],
    ['thomas', 'S5-03', 'supporting', 'strengths', 'Translates expertise into influence under complexity.', 5],
    ['thomas', 'S6-01', 'supporting', 'strengths', 'Refines risk detection into proportionate challenge.', 6],
    ['thomas', 'S7-02', 'supporting', 'strengths', 'Turns scenario exploration into experiments.', 7],
    ['thomas', 'SG-S5-01', 'primary', 'stress-growth', 'Recognises when analysis scatters under pressure.', 5],
    ['thomas', 'SG-G5-01', 'primary', 'stress-growth', 'Practises action before certainty.', 5],
    ['thomas', 'F3-01', 'primary', 'fortification', 'Makes ownership and action more visible.', 3],
    ['thomas', 'F8-01', 'supporting', 'fortification', 'Supports decisive expression before analysis is complete.', 8],
    ['thomas', 'TM-GEN-03', 'primary', 'team', 'Helps close decisions from rich input.', undefined],

    ['sarah', 'S9-01', 'primary', 'strengths', 'Builds calm synthesis and listening into deliberate capability.', 9],
    ['sarah', 'S9-02', 'supporting', 'strengths', 'Develops mediation that surfaces difference.', 9],
    ['sarah', 'S5-02', 'primary', 'strengths', 'Turns internal synthesis into earlier, clearer contribution.', 5],
    ['sarah', 'S3-01', 'supporting', 'strengths', 'Builds execution visibility.', 3],
    ['sarah', 'SG-S9-01', 'primary', 'stress-growth', 'Recognises when calm becomes worry or hidden vigilance.', 9],
    ['sarah', 'SG-G9-01', 'primary', 'stress-growth', 'Uses agency and visibility as a growth resource.', 9],
    ['sarah', 'F8-01', 'primary', 'fortification', 'Helps make challenge visible earlier.', 8],
    ['sarah', 'F2-01', 'supporting', 'fortification', 'Creates more visible relational communication rather than private synthesis.', 2],
    ['sarah', 'TM-T3-01', 'primary', 'team', 'Oliver shares Type 3 with Sarah and leads with it.', 3],
    ['sarah', 'TM-GEN-03', 'primary', 'team', 'Supports timely decision closure.', undefined],

    ['oliver', 'S3-01', 'primary', 'strengths', 'Builds achievement energy into clear momentum.', 3],
    ['oliver', 'S3-02', 'primary', 'strengths', 'Develops sustainable high performance.', 3],
    ['oliver', 'S3-03', 'supporting', 'strengths', 'Uses visible progress to create commitment.', 3],
    ['oliver', 'S7-01', 'supporting', 'strengths', 'Sharpens opportunity scanning.', 7],
    ['oliver', 'S8-02', 'supporting', 'strengths', 'Calibrates decisive action.', 8],
    ['oliver', 'SG-S3-01', 'primary', 'stress-growth', 'Recognises performance exhaustion and disengagement.', 3],
    ['oliver', 'SG-G3-01', 'primary', 'stress-growth', 'Adds risk and shared preparation before momentum runs ahead.', 3],
    ['oliver', 'F6-01', 'primary', 'fortification', 'Adds deliberate challenge before commitments are made.', 6],
    ['oliver', 'F9-01', 'supporting', 'fortification', 'Increases listening and space for reservations.', 9],
    ['oliver', 'TM-T9-01', 'primary', 'team', "Directly relevant to Sarah's primary pattern.", 9],
    ['oliver', 'TM-GEN-07', 'supporting', 'team', 'Builds commitment practices for the small team.', undefined]
  ].map(([learnerId, courseId, priority, pathway, reason, type]) =>
    rec(learnerId as string, courseId as string, priority as Recommendation['priority'], pathway as CoursePathway, reason as string, typeof type === 'number' ? { type } : {})
  )
];

export const learnerCourseStates: LearnerCourseState[] = [
  ['emily', 'S9-01', 'completed', 100], ['emily', 'S9-02', 'in-progress', 46], ['emily', 'F8-01', 'in-progress', 24], ['emily', 'SG-S9-01', 'in-progress', 35], ['emily', 'TM-GEN-01', 'completed', 100], ['emily', 'TM-GEN-02', 'in-progress', 30],
  ['james', 'S8-01', 'completed', 100], ['james', 'S8-02', 'in-progress', 55], ['james', 'F9-01', 'in-progress', 20], ['james', 'SG-G8-01', 'not-started', 0], ['james', 'TM-GEN-01', 'in-progress', 60],
  ['sophie', 'S4-01', 'completed', 100], ['sophie', 'S7-02', 'in-progress', 35], ['sophie', 'F3-01', 'in-progress', 20], ['sophie', 'SG-G4-01', 'not-started', 0], ['sophie', 'TM-GEN-05', 'in-progress', 45],
  ['thomas', 'S5-01', 'completed', 100], ['thomas', 'S5-02', 'in-progress', 65], ['thomas', 'F3-01', 'not-started', 0], ['thomas', 'SG-G5-01', 'in-progress', 25], ['thomas', 'TM-GEN-03', 'in-progress', 30],
  ['sarah', 'S9-01', 'completed', 100], ['sarah', 'S5-02', 'in-progress', 50], ['sarah', 'F8-01', 'not-started', 0], ['sarah', 'SG-G9-01', 'in-progress', 20], ['sarah', 'TM-GEN-03', 'in-progress', 35],
  ['oliver', 'S3-01', 'completed', 100], ['oliver', 'S3-02', 'in-progress', 60], ['oliver', 'F6-01', 'in-progress', 25], ['oliver', 'SG-G3-01', 'not-started', 0], ['oliver', 'TM-GEN-01', 'in-progress', 40]
].map(([learnerId, courseId, status, progressPct]) => ({ learnerId: learnerId as string, courseId: courseId as string, status: status as CourseStatus, progressPct: progressPct as number }));

export const members: Member[] = [
  { id: 'emily', name: 'Emily Carter', role: 'Client Success & Project Lead', teamId: 'atlas', primaryType: 9, profile: [9, 2, 6], profileName: 'Steady Supportive Guardian', scores: { 1: 61, 2: 79, 3: 58, 4: 42, 5: 47, 6: 72, 7: 50, 8: 37, 9: 88 }, summary: 'Relationship-building, mediation and anticipation of team concerns are strong. The main development edge is making her own position visible earlier.', profileDescription: 'Harmony leads, supported by interpersonal attentiveness and preparedness. Emily can stabilise a group, notice unheard voices and anticipate concerns, but may suppress her own position when it risks disappointment or uncertainty.', patterns: ['Notices who has not been heard', 'Builds cohesion before pushing action', 'Anticipates interpersonal and project concerns'], growthEdges: ['State priorities earlier', 'Distinguish support from over-accommodation', 'Make decisions when consensus is unavailable'], blindSpots: ['Withholding can look like agreement', 'Harmony can delay useful conflict', 'Reassurance seeking can slow decisions'] },
  { id: 'james', name: 'James Bennett', role: 'Commercial & Delivery Director', teamId: 'atlas', primaryType: 8, profile: [8, 3, 1], profileName: 'Decisive Delivery Leader', scores: { 1: 68, 2: 48, 3: 76, 4: 31, 5: 46, 6: 54, 7: 60, 8: 91, 9: 39 }, summary: 'Decisive leadership, momentum, accountability and standards are prominent. The development edge is creating room for dissent.', profileDescription: 'Direct action leads, reinforced by achievement and standards. James can push difficult work through obstacles, but speed, quality pressure and force can reduce the amount of challenge he hears.', patterns: ['Owns decisions quickly', 'Pushes through obstacles', 'Holds a strong quality threshold'], growthEdges: ['Create space for dissent', 'Listen before deciding', 'Delegate without reclaiming control'], blindSpots: ['Silence can be mistaken for agreement', 'Urgency can become impatience', 'Force can reduce useful opposition'] },
  { id: 'sophie', name: 'Sophie Harris', role: 'Product & Experience Designer', teamId: 'atlas', primaryType: 4, profile: [4, 7, 1], profileName: 'Creative Quality Seeker', scores: { 1: 64, 2: 52, 3: 62, 4: 84, 5: 49, 6: 43, 7: 73, 8: 36, 9: 55 }, summary: 'Creative depth, possibility generation and design standards are strong. The development edge is moving from exploration to committed delivery.', profileDescription: 'Meaning and originality lead, supported by possibility and standards. Sophie can make work distinctive, but may reopen direction when reality does not match the ideal internal vision.', patterns: ['Finds meaningful angles', 'Generates rich possibilities', 'Protects design quality'], growthEdges: ['Commit to one direction', 'Use constraints productively', 'Maintain momentum after inspiration drops'], blindSpots: ['Exploration can reopen decisions', 'Refinement can become perfectionism', 'Practical feedback can feel like dilution'] },
  { id: 'thomas', name: 'Thomas Parker', role: 'Data & Solutions Analyst', teamId: 'atlas', primaryType: 5, profile: [5, 6, 7], profileName: 'Scenario Analyst', scores: { 1: 58, 2: 34, 3: 45, 4: 44, 5: 90, 6: 81, 7: 69, 8: 40, 9: 53 }, summary: 'Deep analysis, risk testing and scenario generation are strong. The development edge is turning complex models into action.', profileDescription: 'Analysis leads, supported by risk testing and possibility generation. Thomas is valuable when problems need depth, but complexity can expand until commitment is postponed.', patterns: ['Investigates from several angles', 'Identifies hidden assumptions', 'Builds careful scenario maps'], growthEdges: ['Decide with incomplete information', 'Communicate before analysis feels finished', 'Convert models into experiments'], blindSpots: ['More analysis can stop adding value', 'Silence can look like disengagement', 'Expertise can arrive too late'] },
  { id: 'sarah', name: 'Sarah Mitchell', role: 'Strategy & Operations Manager', teamId: 'beacon', primaryType: 9, profile: [9, 5, 3], profileName: 'Quiet Strategic Executor', scores: { 1: 63, 2: 38, 3: 70, 4: 47, 5: 77, 6: 59, 7: 45, 8: 52, 9: 86 }, summary: 'Calm synthesis, analysis and quiet execution are strong. The development edge is making disagreement and ownership more visible.', profileDescription: 'Harmony leads, supported by analysis and execution. Sarah can reduce noise and structure complexity, but may remain too private when early challenge would protect delivery.', patterns: ['Synthesises quietly', 'Reduces unnecessary drama', 'Turns complexity into practical work'], growthEdges: ['Make disagreement visible', 'Share thinking before it is complete', 'Step into visible leadership'], blindSpots: ['Calm can hide disengagement', 'Analysis can become private delay', 'Ownership can remain invisible'] },
  { id: 'oliver', name: 'Oliver Grant', role: 'Business Development Lead', teamId: 'beacon', primaryType: 3, profile: [3, 7, 8], profileName: 'Opportunity Driver', scores: { 1: 49, 2: 62, 3: 89, 4: 35, 5: 39, 6: 55, 7: 78, 8: 66, 9: 44 }, summary: 'Achievement, opportunity seeking and confidence are strong. The development edge is protecting delivery capacity before momentum becomes commitment.', profileDescription: 'Achievement leads, supported by possibility and assertiveness. Oliver can create commercial movement quickly, but attractive opportunities can outrun capacity or unspoken reservations.', patterns: ['Creates external momentum', 'Spots opportunity quickly', 'Persuades people into action'], growthEdges: ['Listen for reservations', 'Test assumptions before promising', 'Close existing commitments before adding new ones'], blindSpots: ['Momentum can create hidden workload', 'Optimism can skip objections', 'New opportunities can fragment focus'] }
];

export const teams: Team[] = [
  { id: 'atlas', name: 'Team Atlas', description: 'A four-person cross-functional delivery team responsible for turning client needs into a coherent project and delivering it successfully.', memberIds: ['emily', 'james', 'sophie', 'thomas'], strengths: ['relational awareness', 'decisive action', 'creative exploration', 'analytical depth', 'quality orientation', 'risk awareness', 'delivery energy'], risks: ['speed versus deliberation', 'harmony versus productive disagreement', 'exploration versus completion', 'unequal airtime', 'hidden disagreement'], priorities: ['Make disagreement visible earlier', 'Improve decision closure', 'Protect both quality and momentum'], pathwayName: 'From Diverse Perspectives to Confident Decisions', pathwayCourseIds: ['TM-GEN-01', 'TM-GEN-02', 'TM-GEN-03', 'TM-GEN-07'] },
  { id: 'beacon', name: 'Team Beacon', description: 'A small strategy and implementation partnership where opportunity generation and operational judgement are especially visible.', memberIds: ['sarah', 'oliver'], strengths: ['opportunity recognition', 'persuasion and momentum', 'synthesis', 'feasibility', 'operational judgement'], risks: ['commitment before challenge', 'late braking', 'unequal visibility', 'expansion versus capacity'], priorities: ['Earlier challenge', 'Disciplined opportunity selection', 'Credible external commitments'], pathwayName: 'From Opportunity to Credible Commitment', pathwayCourseIds: ['TM-GEN-01', 'TM-GEN-03', 'TM-GEN-04', 'TM-GEN-07'] }
];

export const relationships: Relationship[] = [
  { id: 'emily-james', teamId: 'atlas', memberIds: ['emily', 'james'], complementarity: 'Inclusion plus decisive action.', friction: 'James may think the decision is settled before Emily has expressed disagreement.', theme: 'Productive disagreement without avoidance or domination', courses: ['TM-GEN-01', 'TM-GEN-02', 'TM-GEN-03'], viewerNotes: { emily: 'His directness is usually an attempt to create clarity and momentum rather than interpersonal conflict.', james: 'She may need explicit invitation and enough space to disagree before her real position becomes visible.' } },
  { id: 'emily-sophie', teamId: 'atlas', memberIds: ['emily', 'sophie'], complementarity: 'Stability plus creative depth.', friction: 'Harmony can mask frustration when exploration keeps reopening decisions.', theme: 'Creative disagreement with clear commitment', courses: ['TM-GEN-02', 'TM-GEN-05', 'TM-GEN-08'], viewerNotes: { emily: 'Her challenge may be directed at the quality or meaning of the work rather than the relationship.', sophie: 'Emily may not state that the process is too open-ended unless you actively check.' } },
  { id: 'emily-thomas', teamId: 'atlas', memberIds: ['emily', 'thomas'], complementarity: 'Relational insight plus analysis.', friction: 'Both may delay action for different reasons when input remains hidden.', theme: 'Turning thoughtful input into timely shared decisions', courses: ['TM-GEN-03', 'TM-T5-01', 'TM-GEN-08'], viewerNotes: { emily: 'Thomas may be processing rather than withdrawing from the team.', thomas: 'If your thinking is not visible, Emily may keep the group open because she believes input is missing.' } },
  { id: 'james-sophie', teamId: 'atlas', memberIds: ['james', 'sophie'], complementarity: 'Delivery plus originality.', friction: 'Closure and exploration can both feel like protecting quality.', theme: 'Balancing creative quality with decisive delivery', courses: ['TM-GEN-03', 'TM-GEN-05', 'TM-GEN-08'], viewerNotes: { james: 'Exploration may be intended to protect distinctiveness and quality, not resist accountability.', sophie: 'James is more likely to tolerate exploration when decision points and completion rules are explicit.' } },
  { id: 'james-thomas', teamId: 'atlas', memberIds: ['james', 'thomas'], complementarity: 'Action plus analytical rigour.', friction: 'Speed can look risky; analysis can look like reluctance.', theme: 'Fast enough to act; rigorous enough to trust', courses: ['TM-T5-01', 'TM-GEN-03', 'TM-GEN-07'], viewerNotes: { james: 'Thomas is more likely to move quickly when he knows the decision threshold required.', thomas: 'James is more receptive to analysis when it ends with a recommendation.' } },
  { id: 'sophie-thomas', teamId: 'atlas', memberIds: ['sophie', 'thomas'], complementarity: 'Creative and analytical exploration.', friction: 'Both can expand complexity until completion becomes distant.', theme: 'Turning rich exploration into a testable direction', courses: ['TM-GEN-06', 'TM-GEN-08', 'TM-GEN-03'], viewerNotes: { sophie: 'Thomas may need assumptions made explicit before supporting an intuitive direction.', thomas: "Sophie's intuitive reaction may contain useful design evidence." } },
  { id: 'sarah-oliver', teamId: 'beacon', memberIds: ['sarah', 'oliver'], complementarity: 'Operational judgement plus opportunity.', friction: 'Oliver may accelerate before Sarah has made reservations visible.', theme: 'Opportunity with disciplined commitment', courses: ['TM-GEN-01', 'TM-GEN-03', 'TM-GEN-07'], viewerNotes: { sarah: 'Your analysis is most valuable before momentum becomes commitment.', oliver: 'Before moving from interest to commitment, actively ask what constraint could make the promise unrealistic.' } }
];
