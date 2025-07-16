<script lang="ts">
	import * as Navigation from '$lib/components/navigation';
	import '../app.scss';

	let { children, data } = $props();
</script>

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
		<Navigation.Link href="/">Templates</Navigation.Link>
	{/snippet}

	{#snippet rightNav()}
		<Navigation.Menu>
			{#snippet content()}
				<div style="display: flex; align-items: center; gap: 0.5rem;">
					<img
						style="width: 24px; height: 24px; border-radius: 50%;"
						src={data.session.photo}
						alt={data.session.name}
					/>
				</div>
			{/snippet}
			<Navigation.Link href="/auth/google/logout">Logout</Navigation.Link>
		</Navigation.Menu>
	{/snippet}
</Navigation.Root>

<main>
	{@render children?.()}
</main>
