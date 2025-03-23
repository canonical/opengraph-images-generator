<script>
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import NavigationLink from '$lib/components/navigation/NavigationLink.svelte';
	import NavigationLogo from '$lib/components/navigation/NavigationLogo.svelte';
	import '../app.scss';

	let { children } = $props();
</script>

<Navigation theme="dark" fullWidth>
	{#snippet logo()}
		<NavigationLink href="/" isLogo>
			<NavigationLogo
				logoUrl="https://assets.ubuntu.com/v1/82818827-CoF_white.svg"
				title="Thumbnail Generator"
			/>
		</NavigationLink>
	{/snippet}
</Navigation>

<main>
	{@render children?.()}
</main>
