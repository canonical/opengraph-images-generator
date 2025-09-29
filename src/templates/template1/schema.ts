import { z } from 'zod';

export const template1InputSchema = z.object({
	category: z.string().optional(),
	date: z.string().pipe(z.coerce.date()),
	title: z.string(),
	description: z.string().optional()
});

export type Template1Input = z.infer<typeof template1InputSchema>;
