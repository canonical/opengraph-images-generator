<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { lpMergeProposal } from './index';
	import LpMergeProposal from './LpMergeProposal.svelte';
	import type { LpMergeProposalInput } from './schema';

	const { Story } = defineMeta({
		title: 'templates/LpMergeProposal',
		component: LpMergeProposal,
		tags: ['autodocs']
	});
	const getUrl = (args: LpMergeProposalInput) => {
		return `http://localhost:5173/opengraph/${lpMergeProposal.id}?${new URLSearchParams(args as unknown as Record<string, string>).toString()}`;
	};
</script>

<Story
	name="Default"
	args={{
		project: 'Ubuntu',
		gitRepository: 'ubuntu-core',
		mergeId: 54123,
		title: 'Add support for ARM64',
		filesCount: 10,
		commentsCount: 123,
		createdAt: new Date('2025-09-29'),
		authorName: 'John Smith'
	}}
>
	{#snippet template(args: LpMergeProposalInput)}
		<div style="display: flex; align-items: center; justify-content: center;">
			<img
				src={getUrl(args)}
				style:width={lpMergeProposal.width + 'px'}
				style:height={lpMergeProposal.height + 'px'}
			/>
		</div>
	{/snippet}
</Story>

<Story
	name="Local"
	args={{
		project: 'Ubuntu',
		gitRepository: 'ubuntu-core',
		mergeId: 54123,
		title: 'Add support for ARM64',
		filesCount: 10,
		commentsCount: 123,
		createdAt: new Date('2025-09-29'),
		authorName: 'John Smith'
	}}
>
	{#snippet template(args: LpMergeProposalInput)}
		<div style:width={lpMergeProposal.width + 'px'} style:height={lpMergeProposal.height + 'px'}>
			<LpMergeProposal {...args} />
		</div>
	{/snippet}
</Story>
