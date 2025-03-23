<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Strip from './Strip.svelte';
	import Col from './Col.svelte';

	const { Story } = defineMeta({
		title: 'Strip',
		component: Strip,

		tags: ['autodocs']
	});
</script>

<Story name="LightStrip">
	<Strip type="light">
		<p>This is a light row</p>
	</Strip>
</Story>

<Story name="DarkStrip">
	<Strip type="dark">
		<p>This is a dark row</p>
	</Strip>
</Story>

<Story name="Accent Strip">
	<Strip type="accent" includeCol={false}>
		<Col size={8}>
			<h1>Still running Ubuntu 14.04 LTS?</h1>
			<p>Learn how to maintain ongoing security compliance for your Ubuntu 14.04 LTS systems.</p>
		</Col>
		<Col size={4}>
			<img src="https://assets.ubuntu.com/v1/2217d1c8-Security.svg" alt="Placeholder" />
		</Col>
	</Strip>
</Story>

<Story name="Bordered Strip">
	<Strip bordered colSize={8}>
		<h2>The node lifecycle</h2>
		<p>
			Each machine (“node”) managed by MAAS goes through a lifecycle — from its enlistment or
			onboarding to MAAS, through commissioning when we inventory and can setup firmware or other
			hardware-specific elements, then allocation to a user and deployment, and finally they are
			released back to the pool or retired altogether.
		</p>
	</Strip>
</Story>

<Story name="Deep Strip">
	<Strip deep includeCol={false} type="light" rowClass="u-vertically-center">
		<Col size={8}>
			<h2>The fastest way to go from development to production in IoT</h2>
			<p>Learn about how Ubuntu Core and snaps can help you build your connected devices.</p>
		</Col>
		<Col size={4} class="u-hide--small u-align--center">
			<img src="https://assets.ubuntu.com/v1/808a4e5b-iot.png?h=300" alt="Placeholder" />
		</Col>
	</Strip>
</Story>

<Story name="Shallow Strip">
	<Strip shallow includeCol={false} type="light" rowClass="u-vertically-center">
		<Col size={8}>
			<h2>The fastest way to go from development to production in IoT</h2>
			<p>Learn about how Ubuntu Core and snaps can help you build your connected devices.</p>
		</Col>
		<Col size={4} class="u-hide--small u-align--center">
			<img src="https://assets.ubuntu.com/v1/808a4e5b-iot.png?h=300" alt="Placeholder" />
		</Col>
	</Strip>
</Story>
