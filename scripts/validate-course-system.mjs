import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const yamlPath = 'new-course-approach/02-course-catalog-v3.yaml';
const jsonPath = 'src/lib/course-catalog-v3.json';
const dataPath = 'src/lib/demo-data.ts';

const catalog = parse(readFileSync(yamlPath, 'utf8'));
const runtimeCatalog = JSON.parse(readFileSync(jsonPath, 'utf8'));
const dataSource = readFileSync(dataPath, 'utf8');
const errors = [];

const canonicalJson = `${JSON.stringify(catalog, null, 2)}\n`;
const runtimeJson = `${JSON.stringify(runtimeCatalog, null, 2)}\n`;
if (canonicalJson !== runtimeJson) {
	errors.push(`${jsonPath} is not current. Run pnpm generate:courses.`);
}

const courses = catalog.courses ?? [];
const courseIds = new Set();
const skillIds = new Set([
	...Object.values(catalog.typeSkillTerritories ?? {}).flatMap((territory) => territory.skills.map((skill) => skill.id)),
	...(catalog.generalSkills ?? []).map((skill) => skill.id)
]);

const allowedCategories = {
	strengths: new Set(Array.from({ length: 9 }, (_, index) => `type-${index + 1}`)),
	'stress-growth': new Set([...Array.from({ length: 9 }, (_, index) => `stress-${index + 1}`), ...Array.from({ length: 9 }, (_, index) => `growth-${index + 1}`), 'general']),
	fortification: new Set(Array.from({ length: 9 }, (_, index) => `type-${index + 1}`)),
	team: new Set([...Array.from({ length: 9 }, (_, index) => `type-${index + 1}`), 'center-body', 'center-heart', 'center-head', 'general'])
};

for (const course of courses) {
	if (courseIds.has(course.id)) errors.push(`Duplicate course id: ${course.id}`);
	courseIds.add(course.id);
	if (!allowedCategories[course.pathway]?.has(course.category)) {
		errors.push(`Invalid category ${course.category} for ${course.pathway} course ${course.id}`);
	}
	for (const key of ['prerequisites', 'unlocks']) {
		for (const linkedId of course[key] ?? []) {
			if (!courseIds.has(linkedId) && !courses.some((candidate) => candidate.id === linkedId)) {
				errors.push(`${course.id} ${key} references missing course ${linkedId}`);
			}
		}
	}
	for (const skillId of course.develops ?? []) {
		if (!skillIds.has(skillId)) errors.push(`${course.id} develops missing skill ${skillId}`);
	}
	if (course.chain) {
		const chainMembers = courses.filter((candidate) => candidate.chain?.id === course.chain.id);
		const sequences = chainMembers.map((candidate) => candidate.chain.sequence);
		if (new Set(sequences).size !== sequences.length) {
			errors.push(`Duplicate sequence values in chain ${course.chain.id}`);
		}
	}
}

const recommendations = [];
for (const match of dataSource.matchAll(/rec\('([^']+)', '([^']+)', '([^']+)', '([^']+)', [\s\S]*?(?:, \{([^}]*)\})?\)/g)) {
	const sourceText = match[5] ?? '';
	const typeMatch = sourceText.match(/type: (\d+)/);
	const teamMatch = sourceText.match(/teamId: '([^']+)'/);
	const relationshipMatch = sourceText.match(/relationshipId: '([^']+)'/);
	recommendations.push({
		learnerId: match[1],
		courseId: match[2],
		priority: match[3],
		pathway: match[4],
		type: typeMatch ? Number(typeMatch[1]) : undefined,
		teamId: teamMatch?.[1],
		relationshipId: relationshipMatch?.[1]
	});
}
const teams = [...dataSource.matchAll(/\{ id: '([^']+)', name: 'Team/g)].map((match) => match[1]);
const relationships = [...dataSource.matchAll(/\{ id: '([^']+)', teamId: '([^']+)', memberIds/g)].map((match) => ({ id: match[1], teamId: match[2] }));
for (const recommendation of recommendations) {
	const course = courses.find((candidate) => candidate.id === recommendation.courseId);
	if (!course) {
		errors.push(`Recommendation for ${recommendation.learnerId} references missing course ${recommendation.courseId}`);
		continue;
	}
	if (course.pathway !== recommendation.pathway) {
		errors.push(`Recommendation ${recommendation.courseId} for ${recommendation.learnerId} has pathway ${recommendation.pathway}, expected ${course.pathway}`);
	}
	const categoryType = course.category.match(/(?:type|stress|growth)-(\d+)/)?.[1];
	if (recommendation.type && categoryType && recommendation.type !== Number(categoryType)) {
		errors.push(`Recommendation ${recommendation.courseId} for ${recommendation.learnerId} has source type ${recommendation.type}, expected ${categoryType}`);
	}
	if (recommendation.teamId && !teams.includes(recommendation.teamId)) {
		errors.push(`Recommendation ${recommendation.courseId} references missing team ${recommendation.teamId}`);
	}
	if (recommendation.relationshipId && !relationships.some((relationship) => relationship.id === recommendation.relationshipId)) {
		errors.push(`Recommendation ${recommendation.courseId} references missing relationship ${recommendation.relationshipId}`);
	}
}

const stateBlock = dataSource.match(/export const learnerCourseStates:[\s\S]*?\]\.map/);
const states = [...(stateBlock?.[0] ?? '').matchAll(/\['([^']+)', '([^']+)', '([^']+)', (\d+)\]/g)].map((match) => ({
	learnerId: match[1],
	courseId: match[2],
	status: match[3],
	progressPct: Number(match[4])
}));
for (const state of states) {
	if (!courseIds.has(state.courseId)) errors.push(`LearnerCourseState for ${state.learnerId} references missing course ${state.courseId}`);
	if (!['not-started', 'in-progress', 'completed'].includes(state.status)) errors.push(`Invalid learner course status ${state.status}`);
	if (state.progressPct < 0 || state.progressPct > 100) errors.push(`Invalid progress ${state.progressPct} for ${state.learnerId}/${state.courseId}`);
}

const courseCounts = Object.fromEntries(Object.entries(Object.groupBy(courses, (course) => course.pathway)).map(([pathway, items]) => [pathway, items.length]));
const recommendationCounts = Object.fromEntries(Object.entries(Object.groupBy(recommendations, (recommendation) => recommendation.learnerId)).map(([learner, items]) => [learner, items.length]));
const stateCounts = Object.fromEntries(Object.entries(Object.groupBy(states, (state) => state.learnerId)).map(([learner, items]) => [learner, items.length]));

if (errors.length) {
	console.error(errors.join('\n'));
	process.exit(1);
}

console.log('Course catalogue valid.');
console.log(`Course counts: ${JSON.stringify(courseCounts)}`);
console.log(`Recommendation counts: ${JSON.stringify(recommendationCounts)}`);
console.log(`LearnerCourseState counts: ${JSON.stringify(stateCounts)}`);
