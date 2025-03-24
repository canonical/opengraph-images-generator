<script>
	import Button from '$lib/components/button/Button.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import Col from '$lib/components/layout/Col.svelte';
	import Row from '$lib/components/layout/Row.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
	import { EXAMPLE_TEMPLATES } from '$lib/templates/constants';
</script>

<div class="container">
	<Strip dark>
		<h1>Thumbnail Generator</h1>
		<p class="subtitle">Create beautiful thumbnails for your content with our templates</p>
	</Strip>

	<Strip shallow>
		<h2>Choose a Template</h2>
		<br />
		<Row>
			{#each EXAMPLE_TEMPLATES as template}
				<Col size={4}>
					<Card title={template.name} class="u-no-padding">
						{#snippet image()}
							<div
								class="template-preview"
								style="background-color: {template.backgroundColor}; background-image: url({template.backgroundImage});"
							>
								<div class="dimensions">{template.width} × {template.height}</div>
							</div>
						{/snippet}
						<!-- https://svelte.dev/docs/svelte/snippet -->
						<p>{template.description}</p>

						{#each template.tags || [] as tag}
							<div class="p-chip">
								<span class="p-chip__value">{tag}</span>
							</div>
						{/each}

						<div class="actions">
							<Button as="a" href={`/generate?templateId=${template.id}`} appearance="positive">
								Generate</Button
							>
						</div>
					</Card>
				</Col>
			{/each}
		</Row>
	</Strip>
</div>

<style>
	.template-preview {
		height: 160px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.dimensions {
		position: absolute;
		bottom: 8px;
		right: 8px;
		background: rgba(0, 0, 0, 0.2);
		color: white;
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 0.8rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 0.5rem;
	}
</style>
