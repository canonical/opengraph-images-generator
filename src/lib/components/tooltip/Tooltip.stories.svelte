<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Tooltip from '$lib/components/tooltip';

	const { Story } = defineMeta({
		title: 'components/Tooltip',
		tags: ['autodocs']
	});
</script>

<Story name="Default" asChild>
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>Hover</Tooltip.Trigger>
			<Tooltip.Content>Add to library</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</Story>

<Story name="Normal text">
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<span {...props}> Hover </span>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>Add to library</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</Story>

<Story name="left">
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>Hover</Tooltip.Trigger>
			<Tooltip.Content side="left">Add to library</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</Story>

<Story name="right">
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>Hover</Tooltip.Trigger>
			<Tooltip.Content side="right">Add to library</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</Story>

<Story name="top">
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>Hover</Tooltip.Trigger>
			<Tooltip.Content side="top">Add to library</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</Story>
