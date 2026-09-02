<script lang="ts">
	import LogoutButton from '$lib/LogoutButton.svelte';
	import MemberPicker from '$lib/MemberPicker.svelte';
	import ThemeControls from '$lib/ThemeControls.svelte';
	import { courseCategoryLabel, selectedDemoLearner, setSelectedDemoLearner } from '$lib/demo-routing.svelte';
	import {
		courses,
		learnerCourseStates,
		members,
		recommendations,
		skills,
		teams,
		type Course,
		type CoursePathway,
		type LearnerCourseState,
		type Recommendation,
		type Skill
	} from '$lib/demo-data';
	import { themeState, themeStyle } from '$lib/theme.svelte';

	let { data } = $props();

	const pathwayLabels: Record<CoursePathway, string> = {
		strengths: 'Strengths',
		'stress-growth': 'Stress & Growth',
		fortification: 'Fortification',
		team: 'Team'
	};
	const courseSections = ['Course Start', 'Section 1', 'Section 2', 'Section 3'];

	let selectedMemberId = $derived(selectedDemoLearner.id);
	let courseView = $state<'details' | 'content'>('details');
	let activeSection = $state(courseSections[0]);
	let activeCourseTray = $state<'current' | 'recommended' | undefined>();

	const course = $derived(courses.find((item) => item.id === data.courseId)!);
	const selectedMember = $derived(members.find((member) => member.id === selectedMemberId) ?? members[0]);
	const recommendation = $derived(recommendations.find((item) => item.learnerId === selectedMember.id && item.courseId === course.id));
	const courseState = $derived(learnerCourseStates.find((state) => state.learnerId === selectedMember.id && state.courseId === course.id));
	const developedSkills = $derived(course.develops.map(getSkill).filter(isSkill));
	const courseAlreadyAvailable = $derived(courseState?.status === 'in-progress' || courseState?.status === 'completed');
	const unmetPrerequisite = $derived(courseAlreadyAvailable ? undefined : course.prerequisites.map(getCourse).filter(isCourse).find((prerequisite) => getCourseState(prerequisite.id)?.status !== 'completed'));
	const routeCourses = $derived(getRouteCourses(course));
	const shouldShowLearningRoute = $derived(Boolean(course.chain || course.prerequisites.length || course.unlocks.length));
	const currentCourses = $derived(
		learnerCourseStates
			.filter((state) => state.learnerId === selectedMember.id && state.status === 'in-progress')
			.map((state) => getCourse(state.courseId))
			.filter(isCourse)
	);
	const recommendedCourses = $derived(
		recommendations
			.filter((item) => item.learnerId === selectedMember.id)
			.map((item) => getCourse(item.courseId))
			.filter(isCourse)
	);
	const trayCourses = $derived(activeCourseTray === 'current' ? currentCourses : activeCourseTray === 'recommended' ? recommendedCourses : []);

	function getCourse(courseId: string) {
		return courses.find((item) => item.id === courseId);
	}

	function isCourse(item: Course | undefined): item is Course {
		return Boolean(item);
	}

	function getSkill(skillId: string) {
		return skills.find((item) => item.id === skillId);
	}

	function isSkill(item: Skill | undefined): item is Skill {
		return Boolean(item);
	}

	function getCourseState(courseId: string): LearnerCourseState | undefined {
		return learnerCourseStates.find((state) => state.learnerId === selectedMember.id && state.courseId === courseId);
	}

	function titleCase(value: string) {
		return value.replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
	}

	function courseCategoryContext(item: Course) {
		return courseCategoryLabel(item, pathwayLabels);
	}

	function recommendationPriorityLabel(priority: Recommendation['priority']) {
		if (priority === 'primary') return 'Top recommendation';
		if (priority === 'supporting') return 'Recommended';
		return 'Explore';
	}

	function statusLabel() {
		if (unmetPrerequisite) return 'Locked';
		if (courseState?.status === 'completed') return 'Completed';
		if (courseState?.status === 'in-progress') return 'In progress';
		return 'Not started';
	}

	function actionLabel() {
		if (unmetPrerequisite) return 'View prerequisite';
		if (courseState?.status === 'completed') return 'Review course';
		if (courseState?.status === 'in-progress') return 'Continue course';
		return 'Start course';
	}

	function progressPct() {
		return courseState?.progressPct ?? 0;
	}

	function getRouteCourses(item: Course) {
		if (item.chain) {
			return courses
				.filter((candidate) => candidate.chain?.id === item.chain?.id)
				.sort((a, b) => (a.chain?.sequence ?? 0) - (b.chain?.sequence ?? 0));
		}

		const linkedIds = [...item.prerequisites, item.id, ...item.unlocks];
		return linkedIds.map(getCourse).filter(isCourse);
	}

	function routeStateLabel(item: Course) {
		if (item.id === course.id) return 'Current course';
		const state = getCourseState(item.id);
		if (state?.status === 'completed') return 'Completed';
		if (state?.status === 'in-progress') return 'In progress';
		if (item.prerequisites.some((courseId) => getCourseState(courseId)?.status !== 'completed')) return 'Locked';
		return 'Available';
	}

	function whyLabel() {
		return recommendation ? 'Why this course for you' : 'Why this course may be useful';
	}

	function whyText() {
		return recommendation?.reason ?? course.recommendationContext;
	}

	function courseUrl(item: Course) {
		return `/courses/${item.id}`;
	}

	function selectMember(memberId: string) {
		setSelectedDemoLearner(memberId);
	}

	function toggleCourseTray(tray: 'current' | 'recommended') {
		activeCourseTray = activeCourseTray === tray ? undefined : tray;
	}
</script>

<svelte:head>
	<title>{course.name} | Personality LMS Demo</title>
	<meta name="description" content={course.description} />
</svelte:head>

<div class="app-shell" data-mode={themeState.mode} style={themeStyle()}>
	<header class="topbar">
		<div class="user-mark">
			<strong>{selectedMember.name}</strong>
			<span>{selectedMember.role}</span>
		</div>

		<nav class="main-nav" aria-label="Primary">
			<a href="/profile">Profile</a>
			<a href="/pathways">Pathways</a>
			<a href="/team">Team</a>
			<span class="nav-divider" aria-hidden="true"></span>
			<a class="about-link" href="/about">About This Demo</a>
		</nav>

		<MemberPicker members={members} teams={teams} value={selectedMemberId} onSelect={selectMember} />

		<ThemeControls />

		<div class="logout-form"><LogoutButton /></div>

		<details class="tablet-settings">
			<summary aria-label="Open display settings"><span class="settings-glyph" aria-hidden="true"></span></summary>
			<div class="tablet-settings-panel">
				<MemberPicker members={members} teams={teams} value={selectedMemberId} onSelect={selectMember} />
				<ThemeControls />
				<div class="logout-form"><LogoutButton /></div>
			</div>
		</details>
	</header>

	<main>
		<div class="course-context-actions">
			<a class="context-outline-button" href="/pathways">Back to Pathways</a>
			<button class:active={activeCourseTray === 'current'} class="context-outline-button" type="button" onclick={() => toggleCourseTray('current')}>Current Courses</button>
			<button class:active={activeCourseTray === 'recommended'} class="context-outline-button" type="button" onclick={() => toggleCourseTray('recommended')}>Recommended Courses</button>
		</div>

		{#if activeCourseTray}
			<section class="panel course-tray-panel">
				<div class="course-tray-heading">
					<p class="eyebrow">{activeCourseTray === 'current' ? 'Current courses' : 'Recommended courses'}</p>
					<span>{trayCourses.length} in view</span>
				</div>
				{#if trayCourses.length}
					<div class="course-tray-scroll">
						{#each trayCourses as trayCourse}
							<a class:active={trayCourse.id === course.id} class="course-tray-card" href={courseUrl(trayCourse)}>
								<span>{courseCategoryContext(trayCourse)}</span>
								<strong>{trayCourse.name}</strong>
								<small>{titleCase(trayCourse.level)} · {trayCourse.lengthMinutes} min · {titleCase(trayCourse.courseType)}</small>
							</a>
						{/each}
					</div>
				{:else}
					<p>No {activeCourseTray === 'current' ? 'current' : 'recommended'} courses for {selectedMember.name}.</p>
				{/if}
			</section>
		{/if}

		<section class="course-hero panel">
			<div>
				<p class="eyebrow">{courseCategoryContext(course)}</p>
				<h1>{course.name}</h1>
				<p>{course.description}</p>
				<div class="course-meta-row">
					<span>{titleCase(course.level)}</span>
					<span>{course.lengthMinutes} min</span>
					<span>{titleCase(course.courseType)}</span>
					<span>{titleCase(course.audience)}</span>
				</div>
			</div>
			<aside class="course-action-card">
				<span>{statusLabel()}</span>
				<strong>{courseView === 'content' ? 'Course in progress' : actionLabel()}</strong>
				{#if courseView === 'content' || progressPct() > 0}
					<div class="split-progress">
						<span>{progressPct()}% complete</span>
						<div class="progress-track"><i style={`width: ${progressPct()}%;`}></i></div>
					</div>
				{/if}
				{#if unmetPrerequisite}
					<a href={courseUrl(unmetPrerequisite)}>{unmetPrerequisite.name}</a>
				{:else if courseView === 'content'}
					<button class="outline" type="button" onclick={() => (courseView = 'details')}>Course details</button>
				{:else}
					<button type="button" onclick={() => (courseView = 'content')}>{actionLabel()}</button>
				{/if}
			</aside>
		</section>

		{#if courseView === 'details'}
			<section class="course-detail-grid">
				<div class="course-main-column">
					<article class="panel course-info-panel">
						<p class="eyebrow">{whyLabel()}</p>
						{#if recommendation}
							<span class="recommendation-badge">{recommendationPriorityLabel(recommendation.priority)}</span>
						{/if}
						<p>{whyText()}</p>
					</article>

					<article class="panel course-info-panel">
						<p class="eyebrow">Develops</p>
						<div class="skill-tags">
							{#each developedSkills as skill}
								<span>{skill.name}</span>
							{/each}
						</div>
					</article>

					<article class="panel course-info-panel">
						<p class="eyebrow">What you'll practise</p>
						<div class="learning-focus-list">
							{#each course.learningFocus as focus}
								<div>{focus}</div>
							{/each}
						</div>
					</article>
				</div>

				<aside class="course-side-column">
					<article class="panel course-info-panel">
						<p class="eyebrow">Course details</p>
						<div class="course-fact-list">
							<div><span>Pathway</span><strong>{pathwayLabels[course.pathway]}</strong></div>
							<div><span>Category</span><strong>{courseCategoryContext(course)}</strong></div>
							<div><span>Format</span><strong>{titleCase(course.courseType)}</strong></div>
							<div><span>Audience</span><strong>{titleCase(course.audience)}</strong></div>
						</div>
					</article>

					{#if shouldShowLearningRoute}
						<article class="panel course-info-panel">
							<p class="eyebrow">Learning route</p>
							<div class="learning-route-list">
								{#each routeCourses as routeCourse}
									<a class:current={routeCourse.id === course.id} href={courseUrl(routeCourse)}>
										<strong>{routeCourse.name}</strong>
										<span>{routeStateLabel(routeCourse)}</span>
									</a>
								{/each}
							</div>
						</article>
					{/if}
				</aside>
			</section>
		{:else}
			<section class="panel course-content-panel">
				<p class="eyebrow">Course content</p>
				<div class="course-content-window">
					<strong>{activeSection}</strong>
					<span>Course content will go here</span>
				</div>
				<nav class="course-map-nav" aria-label="Course sections">
					{#each courseSections as section, index}
						<button class:active={activeSection === section} type="button" onclick={() => (activeSection = section)}>{section}</button>
						{#if index < courseSections.length - 1}
							<i aria-hidden="true"></i>
						{/if}
					{/each}
				</nav>
			</section>
		{/if}
	</main>
</div>
