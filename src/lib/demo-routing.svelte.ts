import { browser } from '$app/environment';
import { members, type Course, type CoursePathway } from '$lib/demo-data';

const defaultLearnerId = members[0]?.id ?? 'emily';
const learnerStorageKey = 'personality-lms-demo-learner';

export const selectedDemoLearner = $state({
	id: defaultLearnerId
});

let restored = false;

export function validLearnerId(value: string | null | undefined) {
	return value && members.some((member) => member.id === value) ? value : undefined;
}

export function setSelectedDemoLearner(value: string | null | undefined) {
	const learnerId = validLearnerId(value) ?? defaultLearnerId;
	selectedDemoLearner.id = learnerId;
	if (browser) sessionStorage.setItem(learnerStorageKey, learnerId);
	return learnerId;
}

export function restoreSelectedDemoLearner() {
	if (!browser || restored) return selectedDemoLearner.id;
	restored = true;
	const storedLearner = validLearnerId(sessionStorage.getItem(learnerStorageKey));
	return setSelectedDemoLearner(storedLearner ?? selectedDemoLearner.id);
}

export function titleCase(value: string) {
	return value.replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function courseCategoryLabel(course: Course, pathwayLabels: Record<CoursePathway, string>) {
	const pathwayLabel = pathwayLabels[course.pathway];

	if (course.pathway === 'stress-growth') {
		if (course.category.startsWith('growth-')) return `${pathwayLabel} · Growth Resource`;
		if (course.category.startsWith('stress-')) return `${pathwayLabel} · Pressure Practice`;
		if (course.category === 'general') return `${pathwayLabel} · Core Resilience`;
	}

	const typeNumber = course.category.match(/^type-(\d+)$/)?.[1];
	if (typeNumber) return `${pathwayLabel} · Type ${typeNumber}`;

	if (course.pathway === 'team') {
		if (course.category.startsWith('center-')) return `${pathwayLabel} · ${titleCase(course.category.replace('center-', ''))} Center`;
		return `${pathwayLabel} · General`;
	}

	return pathwayLabel;
}
