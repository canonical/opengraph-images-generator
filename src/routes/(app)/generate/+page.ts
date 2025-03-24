import { EXAMPLE_TEMPLATES } from '$lib/templates/constants';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const templateId = url.searchParams.get('templateId');
	const template = EXAMPLE_TEMPLATES.find((template) => template.id === templateId);

	if (!template) {
		throw error(404, {
			message: 'Template not found'
		});
	}

	return { template };
};
