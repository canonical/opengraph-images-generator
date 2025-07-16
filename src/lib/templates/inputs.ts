import { z } from 'zod';

export const templateInputSchema = z.object({
	category: z.string().optional(),
	date: z.string().pipe(z.coerce.date()),
	title: z.string(),
	description: z.string().optional(),
	// TODO
	presenterEmail: z.string().optional()
});

export type TemplateInput = z.infer<typeof templateInputSchema>;
