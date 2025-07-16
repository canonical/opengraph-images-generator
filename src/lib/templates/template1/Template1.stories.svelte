<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Template1 from './Template1.svelte';

	const { Story } = defineMeta({
		title: 'templates/Template1',
		component: Template1,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ text: 'Hello' }}></Story>
