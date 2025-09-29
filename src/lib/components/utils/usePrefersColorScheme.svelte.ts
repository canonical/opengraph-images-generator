import { onMount } from 'svelte';

export type ColorScheme = 'light' | 'dark';

export function usePrefersColorScheme(defaultColorScheme?: ColorScheme): { value: ColorScheme } {
	const mediaQuery =
		typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
	let colorScheme = $state<ColorScheme>(
		mediaQuery?.matches ? 'dark' : defaultColorScheme || 'light'
	);

	onMount(() => {
		if (!mediaQuery) return;
		const onColorSchemeChange = (e: MediaQueryListEvent) => {
			colorScheme = e.matches ? 'dark' : 'light';
		};
		mediaQuery.addEventListener('change', onColorSchemeChange);
		return () => {
			mediaQuery.removeEventListener('change', onColorSchemeChange);
		};
	});

	$effect(() => {
		document.cookie = `colorScheme=${colorScheme}; path=/`;
	});

	return {
		get value() {
			return colorScheme;
		}
	};
}
