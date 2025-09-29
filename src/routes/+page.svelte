<script lang="ts">
	import Row from '$lib/components/layout/Row.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
	import { usePrefersColorScheme } from '$lib/components/utils/index';
	const { data } = $props();
	const colorScheme = usePrefersColorScheme(data.colorScheme);
</script>

<Strip class="p-suru--divider" dark={colorScheme.value === 'dark'}>
	<Row>
		<h1>OG Image Generator</h1>
		<p class="subtitle">Create beautiful OG images for your content with our templates</p>
	</Row>
</Strip>
<Strip dark={colorScheme.value === 'dark'}>
	<Row>
		<h2>Templates</h2>
	</Row>
</Strip>
