<script>
	import Row from '$lib/components/layout/Row.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
</script>

<div class="container">
	<Strip dark>
		<h1>Thumbnail Generator</h1>
		<p class="subtitle">Create beautiful thumbnails for your content with our templates</p>
	</Strip>

	<Strip shallow>
		<h2>Choose a Template</h2>
		<br />
		<Row></Row>
	</Strip>
</div>
