import { browser } from '$app/environment';

export type ColorMode = 'dark' | 'light';

export const themes = [
	{
		id: 'teal',
		name: 'Teal',
		accent: '#2dd4bf',
		soft: '#102f2c',
		lightAccent: '#0f9f90',
		lightSoft: '#dff8f3'
	},
	{
		id: 'gold',
		name: 'Gold',
		accent: '#f6c85f',
		soft: '#332712',
		lightAccent: '#b98212',
		lightSoft: '#fff0bf'
	},
	{
		id: 'blue',
		name: 'Blue',
		accent: '#93c5fd',
		soft: '#172033',
		lightAccent: '#2563eb',
		lightSoft: '#e4efff'
	},
	{
		id: 'violet',
		name: 'Violet',
		accent: '#a78bfa',
		soft: '#251d3b',
		lightAccent: '#7c3aed',
		lightSoft: '#efe7ff'
	}
] as const;

export type ThemeId = (typeof themes)[number]['id'];

const modeKey = 'personality-lms-color-mode';
const themeKey = 'personality-lms-theme-color';

function savedMode(): ColorMode {
	if (!browser) return 'dark';
	const value = localStorage.getItem(modeKey);
	return value === 'light' || value === 'dark' ? value : 'dark';
}

function savedTheme(): ThemeId {
	if (!browser) return 'violet';
	const value = localStorage.getItem(themeKey);
	return themes.some((theme) => theme.id === value) ? (value as ThemeId) : 'violet';
}

export const themeState = $state({
	mode: savedMode(),
	themeId: savedTheme()
});

export function selectedTheme() {
	return themes.find((theme) => theme.id === themeState.themeId) ?? themes[0];
}

export function themeStyle() {
	const theme = selectedTheme();
	const accent = themeState.mode === 'light' ? theme.lightAccent : theme.accent;
	const soft = themeState.mode === 'light' ? theme.lightSoft : theme.soft;
	return `--accent: ${accent}; --accent-soft: ${soft};`;
}

export function swatchColor(theme: (typeof themes)[number]) {
	return themeState.mode === 'light' ? theme.lightAccent : theme.accent;
}

export function setMode(mode: ColorMode) {
	themeState.mode = mode;
	if (browser) localStorage.setItem(modeKey, mode);
}

export function setTheme(themeId: ThemeId) {
	themeState.themeId = themeId;
	if (browser) localStorage.setItem(themeKey, themeId);
}
