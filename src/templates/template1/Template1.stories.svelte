<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { template1 } from './index';
	import type { Template1Input } from './schema';
	import Template1 from './Template1.svelte';

	const { Story } = defineMeta({
		title: 'templates/Template1',
		component: Template1,
		tags: ['autodocs'],
		argTypes: {
			// @ts-expect-error additional og image params
			scale: {
				control: {
					type: 'range',
					min: 1,
					max: 3,
					step: 0.25
				}
			}
		}
	});
	const getUrl = (args: Template1Input) => {
		return `http://localhost:5173/opengraph/template1?${new URLSearchParams(args as unknown as Record<string, string>).toString()}`;
	};
</script>

<Story
	name="Default"
	args={{
		category: 'Ubuntu',
		date: new Date('2025-01-01'),
		description: 'This is a test',
		title: 'Hello'
	}}
>
	{#snippet template(args: Template1Input)}
		<div style="display: flex; align-items: center; justify-content: center;">
			<img
				src={getUrl(args)}
				style:width={template1.width + 'px'}
				style:height={template1.height + 'px'}
			/>
		</div>
	{/snippet}
</Story>
