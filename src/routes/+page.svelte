<script lang="ts">
	import Row from '$lib/components/layout/Row.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
	import templates from '../templates/index.js';
	import { caseToTitle } from './(utils)/index.js';
</script>

<Strip rowClass="u-fixed-width" includeCol={false}>
	<h2>Templates</h2>
	<br />
	<div class="templates">
		{#each templates as template, index (template.id)}
			<a href={`/explore/${template.id}`} tabindex={index + 1}>
				<div class="screenshot">
					<img
						src={`/opengraph/${template.id}?${new URLSearchParams(template.example as unknown as Record<string, string>).toString()}`}
						width={template.width}
						height={template.height}
						alt={template.id}
					/>
					<span class="resolution">{template.width}x{template.height}</span>
				</div>
				<h3 class="template-id">
					{caseToTitle(template.id)}
				</h3>
			</a>
		{/each}
	</div>
</Strip>

<style>
	.templates {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;

		a {
			display: grid;
			grid-template-areas:
				'image'
				'title';
			grid-template-rows: 1fr auto;
			gap: 0.5rem;
			align-items: start;
			color: inherit;
			text-decoration: none;
			&:hover .template-id {
				color: var(--vf-color-link-default);
			}

			.screenshot {
				grid-area: image;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				border-radius: 0.2rem;
				position: relative;

				.resolution {
					position: absolute;
					bottom: 0.5rem;
					right: 0.5rem;
					font-size: 0.8rem;
					padding: 0.15rem 0.4rem;
					border-radius: 0.2rem;
					color: #fff;
					background-color: var(--vf-color-background-overlay);
				}
			}

			.template-id {
				grid-area: title;
				font-family: var(--font-mono);
				text-align: center;
				margin: 0;
				padding: 0.5rem;
			}
		}
	}
</style>
