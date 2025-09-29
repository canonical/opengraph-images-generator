<script lang="ts">
	import Row from '$lib/components/layout/Row.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
	import { usePrefersColorScheme } from '$lib/components/utils';
	import '../app.scss';

	let { children, data } = $props();
	const colorScheme = usePrefersColorScheme(data.colorScheme);
</script>

<main
	class={colorScheme.value === 'dark' ? 'is-dark' : 'is-light'}
	style:background-color="var(--vf-suru-background)"
	style:color="var(--vf-color-text-default)"
	style:min-height="100vh"
>
	<Strip class="p-suru--divider" rowClass="u-fixed-width" includeCol={false}>
		<Row>
			<h1>
				<a href="/" style="text-decoration: none; color: inherit;">OG Image Generator</a>
			</h1>
			<p class="subtitle">Create beautiful OG images for your content with our templates</p>
		</Row>
	</Strip>
	{@render children?.()}
</main>
