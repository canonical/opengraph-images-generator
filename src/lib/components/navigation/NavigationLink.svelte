<script lang="ts">
	import clsx from 'clsx';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = {
		as: 'button';
	} & HTMLButtonAttributes;

	type AnchorProps = {
		as?: 'a';
	} & HTMLAnchorAttributes;

	type BaseProps = {
		children: Snippet;
		isLogo?: boolean;
	};

	type NavigationLinkProps = BaseProps & (ButtonProps | AnchorProps);

	let props: NavigationLinkProps = $props();

	let { as = 'a', isLogo, children, ...restProps } = props;

	const menuDropdownClass = getContext<string>('menu-dropdown-class');
</script>

{#snippet content()}
	<svelte:element
		this={as}
		class={clsx('p-navigation__link', menuDropdownClass, restProps.class)}
		{...restProps}
	>
		{@render children()}
	</svelte:element>
{/snippet}

{#if menuDropdownClass || isLogo}
	{@render content()}
{:else}
	<li class="p-navigation__item">
		{@render content()}
	</li>
{/if}
