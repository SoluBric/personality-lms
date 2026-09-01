<script lang="ts">
	import { setMode, setTheme, swatchColor, themeState, themes } from '$lib/theme.svelte';
</script>

<div class="header-controls">
	<div class="segmented" aria-label="Color mode">
		<button class:active={themeState.mode === 'dark'} type="button" onclick={() => setMode('dark')}>Dark</button>
		<button class:active={themeState.mode === 'light'} type="button" onclick={() => setMode('light')}>Light</button>
	</div>
	<div class="theme-switcher" aria-label="Theme color">
		{#each themes as theme}
			<button
				class:active={theme.id === themeState.themeId}
				type="button"
				aria-label={`Use ${theme.name} theme`}
				title={theme.name}
				style={`--swatch: ${swatchColor(theme)};`}
				onclick={() => setTheme(theme.id)}
			></button>
		{/each}
	</div>
</div>
