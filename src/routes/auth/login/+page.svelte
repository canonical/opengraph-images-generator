<script>
	import Button from '$lib/components/button/Button.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import Col from '$lib/components/layout/Col.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
	import * as Navigation from '$lib/components/navigation';
</script>

<Strip includeCol={false}>
	<Col size={6} emptyLarge={4}>
		<Card class="u-no-padding">
			<Navigation.Root theme="dark">
				{#snippet logo()}
					<Navigation.Link href="/" isLogo>
						<Navigation.Logo
							logoUrl="https://assets.ubuntu.com/v1/82818827-CoF_white.svg"
							title="Thumbnail Generator"
						/>
					</Navigation.Link>
				{/snippet}
			</Navigation.Root>
			<div class="p-card__inner page-inner">
				<h4>Sign in with Google</h4>
				<br />
				<Button appearance="brand" as="a" href="/auth/google/login">Sign in</Button>
			</div>
		</Card>
	</Col>
</Strip>
