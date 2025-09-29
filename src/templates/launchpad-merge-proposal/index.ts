import type { Component } from 'svelte';
import type { Template } from '../types';
import { lpMergeProposalInputSchema } from './schema';
import LpMergeProposal from './LpMergeProposal.svelte';

export const lpMergeProposal = {
	id: 'launchpad-merge-proposal',
	component: LpMergeProposal as Component,
	schema: lpMergeProposalInputSchema,
	width: 1200,
	height: 600,
	example: {
		project: 'Ubuntu',
		gitRepository: 'ubuntu-core',
		mergeId: 54123,
		title: 'Add support for ARM64',
		filesCount: 10,
		commentsCount: 123,
		createdAt: new Date('2025-09-29'),
		authorName: 'Goulin Khoge',
		avatar: 'https://api.launchpad.net/devel/~goulinkh/mugshot'
	}
} as const satisfies Template<typeof lpMergeProposalInputSchema>;
