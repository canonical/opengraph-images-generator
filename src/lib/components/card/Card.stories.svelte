<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';
	import '../../../app.scss';
	const { Story } = defineMeta({
		title: 'components/Card',
		component: Card,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default"
	args={{
		title: "We'd love to have you join us as a partner."
	}}
>
	If you are an independent software vendor or bundle author, it's easy to apply. You can find out
	more below.
</Story>

<Story
	name="Highlighted"
	args={{
		highlighted: true,
		title: "We'd love to have you join us as a partner."
	}}
>
	If you are an independent software vendor or bundle author, it's easy to apply. You can find out
	more below.
</Story>

<Story
	name="Overlay"
	args={{
		overlay: true,
		title: "We'd love to have you join us as a partner."
	}}
>
	If you are an independent software vendor or bundle author, it's easy to apply. You can find out
	more below.
</Story>
