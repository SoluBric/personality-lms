import { error } from '@sveltejs/kit';
import { courses, members } from '$lib/demo-data';

export function load({ params, url }) {
	const course = courses.find((item) => item.id === params.courseId);
	if (!course) {
		error(404, {
			message: `Course ${params.courseId} was not found.`
		});
	}

	const requestedLearner = url.searchParams.get('learner');
	const initialLearnerId = requestedLearner && members.some((member) => member.id === requestedLearner) ? requestedLearner : members[0].id;

	return {
		courseId: course.id,
		initialLearnerId
	};
}
