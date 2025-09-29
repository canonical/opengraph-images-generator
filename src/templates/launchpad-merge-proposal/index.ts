import type { Component } from 'svelte';
import type { Template } from '../types';
import { lpMergeProposalInputSchema } from './schema';
import LpMergeProposal from './LpMergeProposal.svelte';

export const lpMergeProposal = {
	id: 'launchpad-merge-proposal',
	component: LpMergeProposal as Component,
	schema: lpMergeProposalInputSchema,
	width: 1200,
	height: 600
} as const satisfies Template;
