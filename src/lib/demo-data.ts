export type Center = 'Body' | 'Heart' | 'Head';
export type InsightKind = 'patterns' | 'growth' | 'blind';
export type Territory = 'Strengthen Strengths' | 'Stress & Growth' | 'Fortify Growth Areas' | 'Team Development';
export type TypeAffinity = {
	primary?: number;
	secondary?: number[];
	general?: boolean;
};

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
	category: 'Self-Leadership' | 'Communication & Relationships' | 'Decisions & Execution' | 'Collaboration & Leadership';
	description: string;
	typeAffinity?: TypeAffinity;
};

export type Course = {
	id: string;
	title: string;
	description: string;
	primarySkill: string;
	secondarySkills: string[];
	level: 'Foundation' | 'Intermediate' | 'Advanced';
	duration: string;
	territories: Territory[];
	outline: string[];
	progress: number;
	teamRelevance: 'Individual' | 'Team' | 'Both';
	category?: 'Core' | 'Type Development' | 'Type Perspective' | 'Collaboration';
	purpose?: string;
	typeAffinity?: TypeAffinity;
	prerequisites?: string[];
	recommendedNext?: string[];
};

export type Recommendation = {
	courseId: string;
	priority: 'Core' | 'Recommended' | 'Strength Mastery';
	territory: Territory;
	reason: string;
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
	recommendations: Recommendation[];
	pathwayCourseIds: string[];
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

export const skills: Skill[] = [
	{ id: 'SK01', name: 'Self-Awareness', category: 'Self-Leadership', description: 'Recognising habitual reactions, motives, blind spots and behavioural patterns early enough to choose a response.', typeAffinity: { general: true } },
	{ id: 'SK02', name: 'Emotional Regulation', category: 'Self-Leadership', description: 'Remaining engaged and effective when emotions, frustration, pressure or uncertainty intensify.', typeAffinity: { general: true } },
	{ id: 'SK03', name: 'Prioritisation', category: 'Self-Leadership', description: 'Identifying what matters most, making trade-offs and protecting important work.', typeAffinity: { primary: 3, secondary: [1, 7] } },
	{ id: 'SK04', name: 'Focus & Follow-Through', category: 'Self-Leadership', description: 'Sustaining attention and effort through completion.', typeAffinity: { primary: 1, secondary: [3, 7, 4] } },
	{ id: 'SK05', name: 'Adaptability', category: 'Self-Leadership', description: 'Adjusting behaviour and approach when circumstances change while retaining clarity about the objective.', typeAffinity: { primary: 7, general: true } },
	{ id: 'SK06', name: 'Active & Consultative Listening', category: 'Communication & Relationships', description: 'Listening for meaning, reservations, needs and perspectives before advice or decisions.', typeAffinity: { primary: 9, secondary: [2] } },
	{ id: 'SK07', name: 'Assertive Communication', category: 'Communication & Relationships', description: 'Expressing needs, priorities, positions and disagreement clearly while preserving respect.', typeAffinity: { primary: 8 } },
	{ id: 'SK08', name: 'Boundary Setting', category: 'Communication & Relationships', description: 'Establishing sustainable limits around responsibility, support, workload and expectations.', typeAffinity: { primary: 8, secondary: [1, 2] } },
	{ id: 'SK09', name: 'Feedback Integration', category: 'Communication & Relationships', description: 'Giving, receiving and using feedback without defensiveness or endless revision.', typeAffinity: { primary: 4, secondary: [1] } },
	{ id: 'SK10', name: 'Strategic Communication', category: 'Communication & Relationships', description: 'Turning complex thinking into clear, timely and audience-appropriate communication.', typeAffinity: { primary: 5, secondary: [3] } },
	{ id: 'SK11', name: 'Stakeholder Empathy & Trust', category: 'Communication & Relationships', description: 'Understanding stakeholder motivations while building credibility through dependable commitments.', typeAffinity: { primary: 2, secondary: [6] } },
	{ id: 'SK12', name: 'Decision-Making Under Uncertainty', category: 'Decisions & Execution', description: 'Making proportionate, timely decisions when information is incomplete.', typeAffinity: { primary: 6, secondary: [8, 3], general: true } },
	{ id: 'SK13', name: 'Risk Judgement', category: 'Decisions & Execution', description: 'Calibrating risks without dismissing them or allowing them to dominate.', typeAffinity: { primary: 6, secondary: [5] } },
	{ id: 'SK14', name: 'Iterative Execution', category: 'Decisions & Execution', description: 'Moving from concept to action through manageable steps, feedback and refinement.', typeAffinity: { primary: 3, secondary: [7] } },
	{ id: 'SK15', name: 'Delegation & Empowerment', category: 'Decisions & Execution', description: 'Transferring meaningful ownership while setting clear expectations.', typeAffinity: { primary: 8, secondary: [3] } },
	{ id: 'SK16', name: 'Constructive Conflict', category: 'Collaboration & Leadership', description: 'Engaging disagreement directly and productively without avoiding or escalating it.', typeAffinity: { primary: 8, secondary: [9] } },
	{ id: 'SK17', name: 'Facilitation & Perspective Integration', category: 'Collaboration & Leadership', description: 'Helping groups surface different perspectives and move toward useful decisions.', typeAffinity: { primary: 9 } },
	{ id: 'SK18', name: 'Collaborative Influence', category: 'Collaboration & Leadership', description: 'Creating momentum through clarity, credibility, listening and participation.', typeAffinity: { primary: 2, secondary: [3, 9] } }
];

const courseAffinities: Record<string, TypeAffinity> = {
	C01: { general: true },
	C02: { general: true },
	C03: { general: true },
	C04: { primary: 8 },
	C05: { primary: 8, secondary: [1] },
	C06: { primary: 8, secondary: [9] },
	C07: { primary: 8, secondary: [9] },
	C08: { primary: 9, secondary: [2] },
	C09: { primary: 2, secondary: [3, 9] },
	C10: { primary: 6, secondary: [8, 3] },
	C11: { primary: 6, secondary: [5] },
	C12: { primary: 3, secondary: [1] },
	C13: { primary: 3, secondary: [5] },
	C14: { primary: 7, secondary: [3] },
	C15: { primary: 4, secondary: [1] },
	C16: { primary: 8, secondary: [3] },
	C17: { primary: 8, secondary: [3] },
	C18: { primary: 5, secondary: [3] },
	C19: { primary: 3, secondary: [1, 7] },
	C20: { primary: 9, secondary: [8] },
	C21: { primary: 2, secondary: [6] },
	C22: { general: true }
};

const course = (
	id: string,
	title: string,
	description: string,
	primarySkill: string,
	secondarySkills: string[],
	level: Course['level'],
	duration: string,
	territories: Territory[],
	outline: string[],
	teamRelevance: Course['teamRelevance'],
	progress = 0,
	links: Pick<Course, 'prerequisites' | 'recommendedNext' | 'category' | 'purpose' | 'typeAffinity'> = {}
): Course => ({
	id,
	title,
	description,
	primarySkill,
	secondarySkills,
	level,
	duration,
	territories,
	outline,
	teamRelevance,
	progress,
	category: 'Core',
	typeAffinity: courseAffinities[id],
	...links
});

export const courses: Course[] = [
	course('C01', 'Know Your Pattern', 'Build practical awareness of habitual strengths, reactions and blind spots.', 'SK01', ['SK02'], 'Foundation', '35 min', ['Strengthen Strengths', 'Stress & Growth'], ['Your default pattern', 'Strength versus overuse', 'Choosing rather than reacting'], 'Individual', 80, { recommendedNext: ['C02', 'C03'] }),
	course('C02', 'Staying Effective Under Pressure', 'Recognise personal stress signals early and remain engaged under pressure.', 'SK02', ['SK01', 'SK05'], 'Foundation', '45 min', ['Stress & Growth'], ['Stress signatures', 'Early warning signs', 'Regulation', 'Re-engagement'], 'Both', 35, { prerequisites: ['C01'], recommendedNext: ['C10', 'C15'] }),
	course('C03', 'Working Beyond Your Default', 'Practise accessing alternative ways of thinking, relating and acting.', 'SK05', ['SK01'], 'Intermediate', '45 min', ['Stress & Growth'], ['Default strategies', 'Alternative responses', 'Behavioural experiments'], 'Individual', 15, { prerequisites: ['C01'] }),
	course('C04', 'Finding Your Voice', 'State preferences, needs and positions earlier and more clearly.', 'SK07', ['SK08'], 'Foundation', '45 min', ['Fortify Growth Areas'], ['Passive to assertive', 'Stating a position', 'Making requests'], 'Both', 24, { recommendedNext: ['C06', 'C07'] }),
	course('C05', 'Healthy Boundaries at Work', 'Establish sustainable limits while remaining supportive and collaborative.', 'SK08', ['SK07', 'SK03'], 'Foundation', '40 min', ['Fortify Growth Areas'], ['Boundary signals', 'Workload limits', 'Renegotiating expectations'], 'Individual', 0, { recommendedNext: ['C04', 'C06'] }),
	course('C06', 'Constructive Conflict', 'Engage disagreement as useful information without avoidance or escalation.', 'SK16', ['SK06', 'SK07', 'SK02'], 'Intermediate', '60 min', ['Fortify Growth Areas', 'Team Development'], ['Conflict styles', 'Surfacing disagreement', 'Moving forward'], 'Both', 46, { prerequisites: ['C04', 'C08'], recommendedNext: ['C07', 'C20'] }),
	course('C07', 'Difficult Conversations', 'Combine listening, assertion and regulation in high-stakes conversations.', 'SK16', ['SK07', 'SK06', 'SK02'], 'Advanced', '70 min', ['Fortify Growth Areas', 'Team Development'], ['Preparing', 'Opening clearly', 'Agreeing next steps'], 'Both', 0, { prerequisites: ['C06'], recommendedNext: ['C20'] }),
	course('C08', 'Listening Before Leading', 'Surface reservations and competing perspectives before moving toward a solution.', 'SK06', ['SK18', 'SK11'], 'Foundation', '40 min', ['Strengthen Strengths', 'Fortify Growth Areas', 'Team Development'], ['Questions before solutions', 'Hearing dissent', 'Confirming understanding'], 'Both', 60, { recommendedNext: ['C06', 'C09'] }),
	course('C09', 'Collaborative Influence', 'Build commitment through participation, credibility and clear reasoning.', 'SK18', ['SK06', 'SK10'], 'Intermediate', '55 min', ['Strengthen Strengths', 'Fortify Growth Areas', 'Team Development'], ['Influence styles', 'Creating ownership', 'Inviting challenge'], 'Both', 20, { prerequisites: ['C08'], recommendedNext: ['C17', 'C20'] }),
	course('C10', 'Decisions Without Certainty', 'Make timely decisions when information is incomplete by defining thresholds.', 'SK12', ['SK13', 'SK03'], 'Intermediate', '55 min', ['Fortify Growth Areas', 'Stress & Growth'], ['Decision thresholds', 'Reversible choices', 'Commit and review'], 'Both', 10, { recommendedNext: ['C11', 'C13'] }),
	course('C11', 'Calibrating Risk', 'Distinguish meaningful risks from low-probability noise.', 'SK13', ['SK12'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Risk versus uncertainty', 'Probability and impact', 'Analysis limits'], 'Both', 52, { recommendedNext: ['C10', 'C19'] }),
	course('C12', 'Priorities That Hold', 'Convert competing goals and opportunities into explicit trade-offs.', 'SK03', ['SK04', 'SK12'], 'Foundation', '45 min', ['Fortify Growth Areas'], ['Priority versus preference', 'Trade-offs', 'Protecting the chosen path'], 'Both', 0, { recommendedNext: ['C13', 'C19'] }),
	course('C13', 'From Analysis to Action', 'Recognise diminishing returns in analysis and convert thinking into action.', 'SK14', ['SK12', 'SK04'], 'Intermediate', '50 min', ['Fortify Growth Areas', 'Stress & Growth'], ['Analysis thresholds', 'Smallest useful action', 'Experiments'], 'Individual', 0, { prerequisites: ['C10'], recommendedNext: ['C19'] }),
	course('C14', 'From Idea to Delivery', 'Turn creative possibilities into deliverable work through constraints and iteration.', 'SK14', ['SK03', 'SK04', 'SK05'], 'Intermediate', '55 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Define the outcome', 'Useful constraints', 'Definition of done'], 'Both', 30, { prerequisites: ['C12'], recommendedNext: ['C15'] }),
	course('C15', 'Feedback Without Losing the Work', 'Use feedback as information while retaining ownership.', 'SK09', ['SK02', 'SK05'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Receiving feedback', 'Signal from preference', 'Closing the loop'], 'Both', 0, { recommendedNext: ['C14', 'C20'] }),
	course('C16', 'Delegating for Ownership', 'Transfer responsibility clearly without reclaiming control.', 'SK15', ['SK18', 'SK11'], 'Intermediate', '55 min', ['Fortify Growth Areas', 'Strengthen Strengths'], ['What to delegate', 'Outcomes and boundaries', 'Resisting re-control'], 'Both', 0, { recommendedNext: ['C17'] }),
	course('C17', 'Leading with Strength and Space', 'Combine decisiveness and standards with genuine participation from others.', 'SK18', ['SK15', 'SK06'], 'Advanced', '65 min', ['Strengthen Strengths', 'Fortify Growth Areas', 'Team Development'], ['Strength versus force', 'Space for dissent', 'Decisive closure'], 'Both', 0, { prerequisites: ['C08', 'C16'], recommendedNext: ['C20'] }),
	course('C18', 'Strategic Communication', 'Translate complex analysis or recommendations into concise messages.', 'SK10', ['SK18'], 'Intermediate', '50 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Audience and purpose', 'Lead with the point', 'Clear asks'], 'Both', 25, { recommendedNext: ['C09', 'C20'] }),
	course('C19', 'Sustainable Execution', 'Balance opportunity, ambition and delivery capacity so commitments remain credible.', 'SK04', ['SK03', 'SK14'], 'Intermediate', '50 min', ['Fortify Growth Areas'], ['Capacity reality', 'Commitment discipline', 'Review before expansion'], 'Both', 0, { prerequisites: ['C12'], recommendedNext: ['C21'] }),
	course('C20', 'Facilitating Productive Disagreement', 'Help a group surface perspectives and convert disagreement into a clearer decision.', 'SK17', ['SK16', 'SK06', 'SK18'], 'Advanced', '70 min', ['Strengthen Strengths', 'Team Development'], ['Preparing the room', 'Balancing voices', 'Integrating perspectives'], 'Both', 0, { prerequisites: ['C06'], recommendedNext: ['C22'] }),
	course('C21', 'Consultative Stakeholder Conversations', 'Explore needs and constraints before advocating a solution.', 'SK11', ['SK06', 'SK10'], 'Intermediate', '55 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Discover before proposing', 'Hidden concerns', 'Credible commitments'], 'Both', 0, { prerequisites: ['C08'], recommendedNext: ['C09'] }),
	course('C22', 'High-Trust Team Decisions', 'Create a repeatable team process where disagreement is visible and decisions close.', 'SK17', ['SK16', 'SK12', 'SK18'], 'Advanced', '75 min', ['Team Development'], ['Decision roles', 'Dissent before closure', 'Commitment after decision'], 'Team', 0, { prerequisites: ['C06', 'C10'] }),
	course('T01', 'Standards Without Rigidity', 'Turn strong standards into disciplined improvement without over-control or perfectionistic delay.', 'SK03', ['SK04'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Constructive standards', 'Improvement without over-control', 'Good-enough thresholds'], 'Individual', 0, { category: 'Type Development', typeAffinity: { primary: 1 }, purpose: 'A Type 1 learning territory resource for disciplined improvement.' }),
	course('T02', 'Support With Sustainable Boundaries', 'Combine warmth and responsiveness with clearer limits, direct requests and sustainable contribution.', 'SK11', ['SK08'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Generous support', 'Direct requests', 'Sustainable contribution'], 'Individual', 0, { category: 'Type Development', typeAffinity: { primary: 2 }, purpose: 'A Type 2 learning territory resource for relational support with clean limits.' }),
	course('T03', 'Competition as Transformation', 'Use goals, performance feedback and healthy competition as information for growth rather than personal worth.', 'SK03', ['SK04', 'SK05'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas', 'Stress & Growth'], ['Performance feedback', 'Healthy goals', 'Worth separate from outcome'], 'Individual', 0, { category: 'Type Development', typeAffinity: { primary: 3 }, purpose: 'A Type 3 learning territory resource for goal energy and adaptive execution.' }),
	course('T04', 'Creative Identity Into Contribution', 'Turn originality and personal meaning into work that can absorb feedback, constraints and collaborative refinement.', 'SK09', ['SK05'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Original contribution', 'Feedback as refinement', 'Constraints that strengthen the work'], 'Individual', 0, { category: 'Type Development', typeAffinity: { primary: 4 }, purpose: 'A Type 4 learning territory resource for meaning, ownership and refinement.' }),
	course('T05', 'Strategic Detachment', 'Use analytical distance and specialist depth to clarify complexity while remaining connected to decisions and action.', 'SK13', ['SK10'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Analytical distance', 'Decision connection', 'Specialist contribution'], 'Individual', 0, { category: 'Type Development', typeAffinity: { primary: 5 }, purpose: 'A Type 5 learning territory resource for strategic depth that still moves work forward.' }),
	course('T06', 'Risk as Information', 'Convert vigilance and questioning into proportionate preparation, clearer thresholds and confident action.', 'SK13', ['SK12'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas', 'Stress & Growth'], ['Useful questioning', 'Risk thresholds', 'Confident action'], 'Individual', 0, { category: 'Type Development', typeAffinity: { primary: 6 }, purpose: 'A Type 6 learning territory resource for preparedness and calibrated risk.' }),
	course('T07', 'Possibility Into Experiment', 'Convert options and curiosity into focused experiments, useful constraints and learning through action.', 'SK05', ['SK14'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Option filtering', 'Testable experiments', 'Learning through action'], 'Individual', 0, { category: 'Type Development', typeAffinity: { primary: 7 }, purpose: 'A Type 7 learning territory resource for possibility and focused experimentation.' }),
	course('T08', 'Assertiveness and Clean Boundaries', 'Practise directness, protective clarity and decisive action while keeping challenge proportionate and workable.', 'SK07', ['SK08', 'SK16'], 'Intermediate', '45 min', ['Strengthen Strengths', 'Fortify Growth Areas'], ['Direct requests', 'Clean boundaries', 'Proportionate challenge'], 'Individual', 0, { category: 'Type Development', typeAffinity: { primary: 8 }, purpose: 'A Type 8 learning territory resource for directness and protective agency.' }),
	course('T09', 'From Harmony to Facilitative Leadership', 'Develop perspective holding and mediation into active facilitation, visible priorities and confident group leadership.', 'SK06', ['SK17', 'SK18'], 'Advanced', '60 min', ['Strengthen Strengths', 'Fortify Growth Areas', 'Team Development'], ['Perspective holding', 'Visible priorities', 'Group leadership'], 'Both', 0, { category: 'Type Development', typeAffinity: { primary: 9 }, purpose: 'A Type 9 learning territory resource for integration and facilitative cohesion.' }),
	...enneagramTypes.map((type) =>
		course(
			`TP${String(type.number).padStart(2, '0')}`,
			`Understanding Type ${type.number} at Work`,
			`${type.traditional.split('/')[0].trim()} patterns can shape contribution, stress signals, communication and team expectations.`,
			type.number === 1 ? 'SK09' : type.number === 2 ? 'SK11' : type.number === 3 ? 'SK18' : type.number === 4 ? 'SK09' : type.number === 5 ? 'SK10' : type.number === 6 ? 'SK13' : type.number === 7 ? 'SK05' : type.number === 8 ? 'SK07' : 'SK06',
			type.number === 9 ? ['SK17'] : ['SK01'],
			'Foundation',
			'30 min',
			['Team Development'],
			[`How Type ${type.number} contributes`, 'Common pressure signals', 'Practical collaboration cues'],
			'Both',
			0,
			{ category: 'Type Perspective', typeAffinity: { primary: type.number }, purpose: `Understand ${type.number} / ${type.name} as a working-style perspective in team collaboration.` }
		)
	),
	course('COL01', 'Aligning Standards Without Gridlock', 'Distinguish shared quality standards from competing definitions of what good enough requires.', 'SK09', ['SK03', 'SK16'], 'Intermediate', '50 min', ['Team Development'], ['Shared standards', 'Good-enough decisions', 'Quality without stalemate'], 'Team', 0, { category: 'Collaboration', typeAffinity: { primary: 1 }, purpose: 'A collaboration node for colleagues who share Type 1 standards and improvement energy.' }),
	course('COL03', 'Ambition, Momentum & Credible Commitment', 'Align achievement energy and opportunity pursuit with realistic delivery capacity and explicit commitments.', 'SK03', ['SK18', 'SK04'], 'Intermediate', '50 min', ['Team Development'], ['Momentum checks', 'Capacity truth', 'Credible commitments'], 'Team', 0, { category: 'Collaboration', typeAffinity: { primary: 3 }, purpose: 'A collaboration node for shared Type 3 momentum, achievement and delivery pressure.' }),
	course('COL06', 'Working Together Through Risk & Uncertainty', 'Use preparation, questioning and risk awareness constructively without allowing uncertainty to stall action.', 'SK13', ['SK12', 'SK10'], 'Intermediate', '50 min', ['Team Development'], ['Risk calibration', 'Confidence thresholds', 'Visible preparation'], 'Team', 0, { category: 'Collaboration', typeAffinity: { primary: 6 }, purpose: 'A collaboration node for shared Type 6 preparedness and trust calibration.' }),
	course('COL07', 'Exploration With Decision Discipline', 'Use possibility generation and scenario exploration while establishing clear thresholds for commitment and closure.', 'SK05', ['SK03', 'SK14'], 'Intermediate', '50 min', ['Team Development'], ['Exploration boundaries', 'Decision thresholds', 'Commitment rituals'], 'Team', 0, { category: 'Collaboration', typeAffinity: { primary: 7 }, purpose: 'A collaboration node for shared Type 7 possibility, exploration and closure.' })
];

const rec = (courseId: string, priority: Recommendation['priority'], territory: Territory, reason: string): Recommendation => ({
	courseId,
	priority,
	territory,
	reason
});

export const members: Member[] = [
	{
		id: 'emily',
		name: 'Emily Carter',
		role: 'Client Success & Project Lead',
		teamId: 'atlas',
		primaryType: 9,
		profile: [9, 2, 6],
		profileName: 'Steady Supportive Guardian',
		scores: { 1: 61, 2: 79, 3: 58, 4: 42, 5: 47, 6: 72, 7: 50, 8: 37, 9: 88 },
		summary: 'Relationship-building, mediation and anticipation of team concerns are strong. The main development edge is making her own position visible earlier.',
		profileDescription: 'Harmony leads, supported by interpersonal attentiveness and preparedness. Emily can stabilise a group, notice unheard voices and anticipate concerns, but may suppress her own position when it risks disappointment or uncertainty.',
		patterns: ['Notices who has not been heard', 'Builds cohesion before pushing action', 'Anticipates interpersonal and project concerns'],
		growthEdges: ['State priorities earlier', 'Distinguish support from over-accommodation', 'Make decisions when consensus is unavailable'],
		blindSpots: ['Withholding can look like agreement', 'Harmony can delay useful conflict', 'Reassurance seeking can slow decisions'],
		recommendations: [
			rec('C20', 'Strength Mastery', 'Strengthen Strengths', 'Builds her natural mediation into higher-level facilitation.'),
			rec('C05', 'Core', 'Fortify Growth Areas', 'Her 9/2 blend can make support and accommodation difficult to distinguish.'),
			rec('C04', 'Core', 'Fortify Growth Areas', 'Helps her make her own position visible while preserving connection.'),
			rec('C06', 'Core', 'Team Development', 'Directly addresses delaying disagreement until tension is established.'),
			rec('C10', 'Recommended', 'Stress & Growth', 'Supports decision confidence when consensus is unavailable.'),
			rec('C02', 'Recommended', 'Stress & Growth', 'Helps her recognise withdrawal and interpersonal worry early.'),
			rec('C09', 'Strength Mastery', 'Strengthen Strengths', 'Converts relational credibility into greater influence.')
		],
		pathwayCourseIds: ['C05', 'C04', 'C06', 'C20']
	},
	{
		id: 'james',
		name: 'James Bennett',
		role: 'Commercial & Delivery Director',
		teamId: 'atlas',
		primaryType: 8,
		profile: [8, 3, 1],
		profileName: 'Decisive Delivery Leader',
		scores: { 1: 68, 2: 48, 3: 76, 4: 31, 5: 46, 6: 54, 7: 60, 8: 91, 9: 39 },
		summary: 'Decisive leadership, momentum, accountability and standards are prominent. The development edge is creating room for dissent.',
		profileDescription: 'Direct action leads, reinforced by achievement and standards. James can push difficult work through obstacles, but speed, quality pressure and force can reduce the amount of challenge he hears.',
		patterns: ['Owns decisions quickly', 'Pushes through obstacles', 'Holds a strong quality threshold'],
		growthEdges: ['Create space for dissent', 'Listen before deciding', 'Delegate without reclaiming control'],
		blindSpots: ['Silence can be mistaken for agreement', 'Urgency can become impatience', 'Force can reduce useful opposition'],
		recommendations: [
			rec('C17', 'Core', 'Strengthen Strengths', 'Refines decisiveness into leadership that creates space for other voices.'),
			rec('C08', 'Core', 'Fortify Growth Areas', 'Addresses the blind spot where silence may be mistaken for agreement.'),
			rec('C16', 'Core', 'Fortify Growth Areas', 'Develops accountability without unnecessary control.'),
			rec('C09', 'Recommended', 'Team Development', 'Broadens influence beyond authority, urgency and force.'),
			rec('C06', 'Recommended', 'Team Development', 'Makes disagreement productive and safe enough for others to join.'),
			rec('C20', 'Strength Mastery', 'Strengthen Strengths', 'Builds on willingness to address hard issues.'),
			rec('C02', 'Recommended', 'Stress & Growth', 'Helps him notice when useful intensity becomes control.')
		],
		pathwayCourseIds: ['C08', 'C09', 'C16', 'C17']
	},
	{
		id: 'sophie',
		name: 'Sophie Harris',
		role: 'Product & Experience Designer',
		teamId: 'atlas',
		primaryType: 4,
		profile: [4, 7, 1],
		profileName: 'Creative Quality Seeker',
		scores: { 1: 64, 2: 52, 3: 62, 4: 84, 5: 49, 6: 43, 7: 73, 8: 36, 9: 55 },
		summary: 'Creative depth, possibility generation and design standards are strong. The development edge is moving from exploration to committed delivery.',
		profileDescription: 'Meaning and originality lead, supported by possibility and standards. Sophie can make work distinctive, but may reopen direction when reality does not match the ideal internal vision.',
		patterns: ['Finds meaningful angles', 'Generates rich possibilities', 'Protects design quality'],
		growthEdges: ['Commit to one direction', 'Use constraints productively', 'Maintain momentum after inspiration drops'],
		blindSpots: ['Exploration can reopen decisions', 'Refinement can become perfectionism', 'Practical feedback can feel like dilution'],
		recommendations: [
			rec('C14', 'Core', 'Strengthen Strengths', 'Converts creativity into a repeatable path to completed work.'),
			rec('C15', 'Core', 'Fortify Growth Areas', 'Supports using pragmatic feedback without losing ownership.'),
			rec('C12', 'Core', 'Fortify Growth Areas', 'Resolves tension between possibility, idealisation and refinement.'),
			rec('C02', 'Recommended', 'Stress & Growth', 'Helps recognise emotional dissatisfaction before unnecessary redesign.'),
			rec('C03', 'Recommended', 'Stress & Growth', 'Encourages structure when inspiration is low.'),
			rec('C09', 'Strength Mastery', 'Team Development', 'Helps bring others into a creative vision.'),
			rec('C19', 'Recommended', 'Fortify Growth Areas', 'Reinforces completion after the exploratory phase.')
		],
		pathwayCourseIds: ['C12', 'C14', 'C15', 'C19']
	},
	{
		id: 'thomas',
		name: 'Thomas Parker',
		role: 'Data & Solutions Analyst',
		teamId: 'atlas',
		primaryType: 5,
		profile: [5, 6, 7],
		profileName: 'Scenario Analyst',
		scores: { 1: 58, 2: 34, 3: 45, 4: 44, 5: 90, 6: 81, 7: 69, 8: 40, 9: 53 },
		summary: 'Deep analysis, risk testing and scenario generation are strong. The development edge is turning complex models into action.',
		profileDescription: 'Analysis leads, supported by risk testing and possibility generation. Thomas is valuable when problems need depth, but complexity can expand until commitment is postponed.',
		patterns: ['Investigates from several angles', 'Identifies hidden assumptions', 'Builds careful scenario maps'],
		growthEdges: ['Decide with incomplete information', 'Communicate before analysis feels finished', 'Convert models into experiments'],
		blindSpots: ['More analysis can stop adding value', 'Silence can look like disengagement', 'Expertise can arrive too late'],
		recommendations: [
			rec('C11', 'Strength Mastery', 'Strengthen Strengths', 'Refines strong risk detection into proportionate judgement.'),
			rec('C10', 'Core', 'Fortify Growth Areas', 'Addresses the convergence of preparation, uncertainty and options.'),
			rec('C13', 'Core', 'Stress & Growth', 'Converts analysis into experiments or decisions.'),
			rec('C18', 'Core', 'Fortify Growth Areas', 'Develops concise communication before every detail is resolved.'),
			rec('C02', 'Recommended', 'Stress & Growth', 'Supports recognition of scenario and threat scanning loops.'),
			rec('C03', 'Recommended', 'Stress & Growth', 'Builds access to more embodied, decisive action.'),
			rec('C09', 'Recommended', 'Team Development', 'Helps valuable expertise shape decisions earlier.')
		],
		pathwayCourseIds: ['C11', 'C10', 'C13', 'C18']
	},
	{
		id: 'sarah',
		name: 'Sarah Mitchell',
		role: 'Strategy & Operations Manager',
		teamId: 'beacon',
		primaryType: 9,
		profile: [9, 5, 3],
		profileName: 'Quiet Strategic Executor',
		scores: { 1: 63, 2: 38, 3: 70, 4: 47, 5: 77, 6: 59, 7: 45, 8: 52, 9: 86 },
		summary: 'Calm synthesis, analysis and quiet execution are strong. The development edge is making disagreement and ownership more visible.',
		profileDescription: 'Harmony leads, supported by analysis and execution. Sarah can reduce noise and structure complexity, but may remain too private when early challenge would protect delivery.',
		patterns: ['Synthesises quietly', 'Reduces unnecessary drama', 'Turns complexity into practical work'],
		growthEdges: ['Make disagreement visible', 'Share thinking before it is complete', 'Step into visible leadership'],
		blindSpots: ['Calm can hide disengagement', 'Analysis can become private delay', 'Ownership can remain invisible'],
		recommendations: [
			rec('C18', 'Core', 'Strengthen Strengths', 'Turns internal synthesis into earlier, clearer contribution.'),
			rec('C09', 'Strength Mastery', 'Strengthen Strengths', 'Builds low-ego collaboration into visible influence.'),
			rec('C04', 'Core', 'Fortify Growth Areas', 'Helps make analysis and priorities explicit.'),
			rec('C06', 'Recommended', 'Team Development', 'Distinguishes calm resolution from quiet disengagement.'),
			rec('C10', 'Recommended', 'Fortify Growth Areas', 'Supports ownership when a decision is needed.'),
			rec('C03', 'Core', 'Stress & Growth', 'Uses Type 3 signal as a development resource toward agency.'),
			rec('C20', 'Strength Mastery', 'Team Development', 'Develops synthesis into advanced group facilitation.')
		],
		pathwayCourseIds: ['C04', 'C18', 'C09', 'C20']
	},
	{
		id: 'oliver',
		name: 'Oliver Grant',
		role: 'Business Development Lead',
		teamId: 'beacon',
		primaryType: 3,
		profile: [3, 7, 8],
		profileName: 'Opportunity Driver',
		scores: { 1: 49, 2: 62, 3: 89, 4: 35, 5: 39, 6: 55, 7: 78, 8: 66, 9: 44 },
		summary: 'Achievement, opportunity seeking and confidence are strong. The development edge is protecting delivery capacity before momentum becomes commitment.',
		profileDescription: 'Achievement leads, supported by possibility and assertiveness. Oliver can create commercial movement quickly, but attractive opportunities can outrun capacity or unspoken reservations.',
		patterns: ['Creates external momentum', 'Spots opportunity quickly', 'Persuades people into action'],
		growthEdges: ['Listen for reservations', 'Test assumptions before promising', 'Close existing commitments before adding new ones'],
		blindSpots: ['Momentum can create hidden workload', 'Optimism can skip objections', 'New opportunities can fragment focus'],
		recommendations: [
			rec('C21', 'Core', 'Strengthen Strengths', 'Builds commercial energy into consultative discovery.'),
			rec('C08', 'Core', 'Fortify Growth Areas', 'Helps notice concerns that disappear when momentum dominates.'),
			rec('C12', 'Core', 'Fortify Growth Areas', 'Creates explicit trade-offs between opportunities and commitments.'),
			rec('C19', 'Core', 'Fortify Growth Areas', 'Connects ambition to delivery capacity and follow-through.'),
			rec('C11', 'Recommended', 'Fortify Growth Areas', 'Encourages testing assumptions without killing opportunity.'),
			rec('C09', 'Strength Mastery', 'Strengthen Strengths', 'Refines persuasion into shared ownership.'),
			rec('C02', 'Recommended', 'Stress & Growth', 'Helps recognise fragmented performance pressure.')
		],
		pathwayCourseIds: ['C08', 'C21', 'C12', 'C19']
	}
];

export const teams: Team[] = [
	{
		id: 'atlas',
		name: 'Team Atlas',
		description: 'A four-person cross-functional delivery team responsible for turning client needs into a coherent project and delivering it successfully.',
		memberIds: ['emily', 'james', 'sophie', 'thomas'],
		strengths: ['relational awareness', 'decisive action', 'creative exploration', 'analytical depth', 'quality orientation', 'risk awareness', 'delivery energy'],
		risks: ['speed versus deliberation', 'harmony versus productive disagreement', 'exploration versus completion', 'unequal airtime', 'hidden disagreement'],
		priorities: ['Make disagreement visible earlier', 'Improve decision closure', 'Protect both quality and momentum'],
		pathwayName: 'From Diverse Perspectives to Confident Decisions',
		pathwayCourseIds: ['C08', 'C06', 'C10', 'C20', 'C22']
	},
	{
		id: 'beacon',
		name: 'Team Beacon',
		description: 'A small strategy and implementation partnership where opportunity generation and operational judgement are especially visible.',
		memberIds: ['sarah', 'oliver'],
		strengths: ['opportunity recognition', 'persuasion and momentum', 'synthesis', 'feasibility', 'operational judgement'],
		risks: ['commitment before challenge', 'late braking', 'unequal visibility', 'expansion versus capacity'],
		priorities: ['Earlier challenge', 'Disciplined opportunity selection', 'Credible external commitments'],
		pathwayName: 'From Opportunity to Credible Commitment',
		pathwayCourseIds: ['C21', 'C12', 'C10', 'C19', 'C22']
	}
];

export const relationships: Relationship[] = [
	{ id: 'emily-james', teamId: 'atlas', memberIds: ['emily', 'james'], complementarity: 'Inclusion plus decisive action.', friction: 'James may think the decision is settled before Emily has expressed disagreement.', theme: 'Productive disagreement without avoidance or domination', courses: ['C06', 'C08', 'C20', 'C22'], viewerNotes: { emily: 'His directness is usually an attempt to create clarity and momentum rather than interpersonal conflict.', james: 'She may need explicit invitation and enough space to disagree before her real position becomes visible.' } },
	{ id: 'emily-sophie', teamId: 'atlas', memberIds: ['emily', 'sophie'], complementarity: 'Stability plus creative depth.', friction: 'Harmony can mask frustration when exploration keeps reopening decisions.', theme: 'Creative disagreement with clear commitment', courses: ['C06', 'C15', 'C20', 'C22'], viewerNotes: { emily: 'Her challenge may be directed at the quality or meaning of the work rather than the relationship.', sophie: 'Emily may not state that the process is too open-ended unless you actively check.' } },
	{ id: 'emily-thomas', teamId: 'atlas', memberIds: ['emily', 'thomas'], complementarity: 'Relational insight plus analysis.', friction: 'Both may delay action for different reasons when input remains hidden.', theme: 'Turning thoughtful input into timely shared decisions', courses: ['C10', 'C18', 'C22', 'C02'], viewerNotes: { emily: 'Thomas may be processing rather than withdrawing from the team.', thomas: 'If your thinking is not visible, Emily may keep the group open because she believes input is missing.' } },
	{ id: 'james-sophie', teamId: 'atlas', memberIds: ['james', 'sophie'], complementarity: 'Delivery plus originality.', friction: 'Closure and exploration can both feel like protecting quality.', theme: 'Balancing creative quality with decisive delivery', courses: ['C14', 'C15', 'C12', 'C22'], viewerNotes: { james: 'Exploration may be intended to protect distinctiveness and quality, not resist accountability.', sophie: 'James is more likely to tolerate exploration when decision points and completion rules are explicit.' } },
	{ id: 'james-thomas', teamId: 'atlas', memberIds: ['james', 'thomas'], complementarity: 'Action plus analytical rigour.', friction: 'Speed can look risky; analysis can look like reluctance.', theme: 'Fast enough to act; rigorous enough to trust', courses: ['C10', 'C11', 'C13', 'C18', 'C22'], viewerNotes: { james: 'Thomas is more likely to move quickly when he knows the decision threshold required.', thomas: 'James is more receptive to analysis when it ends with a recommendation.' } },
	{ id: 'sophie-thomas', teamId: 'atlas', memberIds: ['sophie', 'thomas'], complementarity: 'Creative and analytical exploration.', friction: 'Both can expand complexity until completion becomes distant.', theme: 'Turning rich exploration into a testable direction', courses: ['C14', 'C11', 'C15', 'C12', 'C22'], viewerNotes: { sophie: 'Thomas may need assumptions made explicit before supporting an intuitive direction.', thomas: 'Sophie’s intuitive reaction may contain useful design evidence.' } },
	{ id: 'sarah-oliver', teamId: 'beacon', memberIds: ['sarah', 'oliver'], complementarity: 'Operational judgement plus opportunity.', friction: 'Oliver may accelerate before Sarah has made reservations visible.', theme: 'Opportunity with disciplined commitment', courses: ['C21', 'C12', 'C19', 'C10', 'C22'], viewerNotes: { sarah: 'Your analysis is most valuable before momentum becomes commitment.', oliver: 'Before moving from interest to commitment, actively ask what constraint could make the promise unrealistic.' } }
];
