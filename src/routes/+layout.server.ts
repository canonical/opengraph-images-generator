import type { ColorScheme } from '$lib/components/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const colorScheme = event.cookies.get('colorScheme') as ColorScheme | undefined;
	return {
		colorScheme: (['light', 'dark'] as ColorScheme[]).includes(colorScheme!)
			? colorScheme
			: undefined
	};
};
