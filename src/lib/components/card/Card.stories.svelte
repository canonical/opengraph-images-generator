<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';

	const { Story } = defineMeta({
		title: 'Card',
		component: Card,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<Card title="We'd love to have you join us as a partner.">
		If you are an independent software vendor or bundle author, it's easy to apply. You can find out
		more below.
	</Card>
</Story>

<Story name="Highlighted">
	<Card highlighted title="We'd love to have you join us as a partner.">
		If you are an independent software vendor or bundle author, it's easy to apply. You can find out
		more below.
	</Card>
</Story>

<Story name="Overlay">
	<Card overlay title="We'd love to have you join us as a partner.">
		If you are an independent software vendor or bundle author, it's easy to apply. You can find out
		more below.
	</Card>
</Story>
