<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { masterclasses } from './index';
	import type { MasterclassesInput } from './schema';
	import Masterclasses from './Masterclasses.svelte';

	const { Story } = defineMeta({
		title: 'templates/Masterclasses',
		component: Masterclasses,
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
	const getUrl = (args: MasterclassesInput) => {
		return `http://localhost:5173/opengraph/${masterclasses.id}?${new URLSearchParams(args as unknown as Record<string, string>).toString()}`;
	};
</script>

<Story
	name="Default"
	args={{
		...masterclasses.example
	}}
>
	{#snippet template(args: MasterclassesInput)}
		<div style="display: flex; align-items: center; justify-content: center;">
			<img
				src={getUrl(args)}
				style:width={masterclasses.width + 'px'}
				style:height={masterclasses.height + 'px'}
			/>
		</div>
	{/snippet}
</Story>
