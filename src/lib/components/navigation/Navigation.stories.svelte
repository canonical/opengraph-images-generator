<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Navigation from './Navigation.svelte';
	import NavigationLink from './NavigationLink.svelte';
	import NavigationLogo from './NavigationLogo.svelte';
	import NavigationMenu from './NavigationMenu.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Navigation',
		component: Navigation,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<Navigation theme="dark" fullWidth>
		{#snippet logo()}
			<NavigationLink href="/" isLogo>
				<NavigationLogo
					logoUrl="https://assets.ubuntu.com/v1/82818827-CoF_white.svg"
					title="Thumbnail Generator"
				/>
			</NavigationLink>
		{/snippet}
		{#snippet leftNav()}
			<NavigationMenu label="Menu">
				<NavigationLink href="/">Home</NavigationLink>
				<NavigationLink href="/about">About</NavigationLink>
				<NavigationLink href="/contact">Contact</NavigationLink>
			</NavigationMenu>
		{/snippet}

		{#snippet rightNav()}
			<NavigationLink href="/">Home</NavigationLink>
			<NavigationLink href="/about">About</NavigationLink>
		{/snippet}
	</Navigation>
</Story>
