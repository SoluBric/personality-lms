import { error } from '@sveltejs/kit';
import { courses } from '$lib/demo-data';

export function load({ params }) {
	const course = courses.find((item) => item.id === params.courseId);
	if (!course) {
		error(404, {
			message: `Course ${params.courseId} was not found.`
		});
	}

	return {
		courseId: course.id
	};
}
