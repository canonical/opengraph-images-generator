<script lang="ts">
	import '../app.scss';

	let { children } = $props();
</script>

<main>
	{@render children?.()}
</main>
