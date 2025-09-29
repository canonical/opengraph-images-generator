import { error } from '@sveltejs/kit';
import templates from '../../../templates';
import type { PageServerLoad } from './$types';
import z from 'zod';

const extractType = (def: z.ZodType) => {
	if (def instanceof z.ZodString) {
		return 'string';
	}
	if (def instanceof z.ZodNumber) {
		return 'number';
	}
	if (def instanceof z.ZodBoolean) {
		return 'boolean';
	}
	if (def instanceof z.ZodDate) {
		return 'date';
	}
	if (def instanceof z.ZodObject) {
		return 'object';
	}
	if (def instanceof z.ZodEnum) {
		return 'enum';
	}
	if (def instanceof z.ZodOptional) {
		return extractType((def as z.ZodOptional<z.ZodType>).def.innerType);
	}
	if (def instanceof z.ZodPipe) {
		return extractType((def as z.ZodPipe<z.ZodType>).def.out as z.ZodType);
	}
	return 'unknown';
};

const extractEnumValues = (def: z.ZodType) => {
	if (def instanceof z.ZodEnum) {
		return Object.values(def.def.entries) as string[];
	}
	if (def instanceof z.ZodOptional) {
		return extractEnumValues((def as z.ZodOptional<z.ZodType>).def.innerType);
	}
	return [];
};

export const load: PageServerLoad = async ({ params }) => {
	const template = templates.find((t) => t.id === params.template);
	if (!template) {
		throw error(
			404,
			'Template not found, available templates: ' + templates.map((t) => t.id).join(', ')
		);
	}
	return {
		template: {
			...template,
			// not json serializable
			component: undefined,
			schema: Object.entries(template.schema.shape).map(([key, field]) => {
				const type = extractType(field);
				const enumValues = type === 'enum' ? extractEnumValues(field) : undefined;
				return {
					name: key,
					type,
					enum: enumValues
				};
			})
		}
	};
};
