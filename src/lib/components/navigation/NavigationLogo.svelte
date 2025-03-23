<script lang="ts">
	type LogoProps = {
		logoUrl?: string;
		title: string;
	};

	let { logoUrl, title }: LogoProps = $props();
</script>

<!--
@component

This component is used to render the logo in the navigation bar.
It can be used inside the `NavigationLink` component.
-->
<div class="p-navigation__logo-tag">
	{#if logoUrl}
		<img class="p-navigation__logo-icon" src={logoUrl} alt="Logo" />
	{/if}
</div>
<span class="p-navigation__logo-title">{title}</span>
