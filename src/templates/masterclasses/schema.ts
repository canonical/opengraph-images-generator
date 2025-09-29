import { z } from 'zod';

export const masterclassesInputSchema = z.object({
	category: z.string().optional(),
	date: z.string().pipe(z.coerce.date()),
	title: z.string(),
	description: z.string().optional(),
	avatar: z.string().optional()
});

export type MasterclassesInput = z.infer<typeof masterclassesInputSchema>;
