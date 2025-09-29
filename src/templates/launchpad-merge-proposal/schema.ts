import { z } from 'zod';

// const base64Schema = z.preprocess(
// 	(val) => (typeof val === 'string' ? val.replace(/\s+/g, '') : val),
// 	z.base64()
// );

export const lpMergeProposalInputSchema = z.object({
	project: z.string(),
	gitRepository: z.string(),
	mergeId: z.string().pipe(z.coerce.number()),
	title: z.string(),
	filesCount: z.string().pipe(z.coerce.number()),
	commentsCount: z.string().pipe(z.coerce.number()),
	createdAt: z.string().pipe(z.coerce.date()),
	authorName: z.string(),
	avatar: z.string().optional(),
	mergeStatus: z.enum(['in-review', 'merged']).optional()
});

export type LpMergeProposalInput = z.infer<typeof lpMergeProposalInputSchema>;
