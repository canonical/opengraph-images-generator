<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Navigation from './index';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Navigation',
		component: Navigation.Root,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<Navigation.Root theme="dark" fullWidth>
		{#snippet logo()}
			<Navigation.Link href="/" isLogo>
				<Navigation.Logo
					logoUrl="https://assets.ubuntu.com/v1/82818827-CoF_white.svg"
					title="Thumbnail Generator"
				/>
			</Navigation.Link>
		{/snippet}
		{#snippet leftNav()}
			<Navigation.Menu label="Menu">
				<Navigation.Link href="/">Home</Navigation.Link>
				<Navigation.Link href="/about">About</Navigation.Link>
				<Navigation.Link href="/contact">Contact</Navigation.Link>
			</Navigation.Menu>
		{/snippet}

		{#snippet rightNav()}
			<Navigation.Link href="/">Home</Navigation.Link>
			<Navigation.Link href="/about">About</Navigation.Link>
		{/snippet}
	</Navigation.Root>
</Story>
