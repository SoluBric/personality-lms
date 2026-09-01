<script lang="ts">
	import type { Member, Team } from '$lib/demo-data';

	let {
		members,
		teams,
		value = $bindable(),
		onSelect
	}: {
		members: Member[];
		teams: Team[];
		value: string;
		onSelect?: (memberId: string) => void;
	} = $props();

	let menu: HTMLDetailsElement;

	const selectedMember = $derived(members.find((member) => member.id === value) ?? members[0]);
	const selectedTeam = $derived(getTeamName(selectedMember.teamId));

	function getTeamName(teamId: string) {
		return teams.find((team) => team.id === teamId)?.name ?? 'Team';
	}

	function chooseMember(memberId: string) {
		value = memberId;
		onSelect?.(memberId);
		menu?.removeAttribute('open');
	}
</script>

<div class="member-picker">
	<span class="member-picker-label">For demo purposes</span>
	<details class="member-menu" bind:this={menu}>
		<summary>
			<strong>{selectedMember.name} / {selectedMember.profile.join('-')}</strong>
			<span>{selectedTeam}</span>
		</summary>
		<div class="member-menu-options">
			{#each members as member}
				<button class:active={member.id === selectedMember.id} type="button" onclick={() => chooseMember(member.id)}>
					<strong>{member.name} / {member.profile.join('-')}</strong>
					<span>{getTeamName(member.teamId)}</span>
				</button>
			{/each}
		</div>
	</details>
</div>
