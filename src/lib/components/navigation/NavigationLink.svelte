<script lang="ts">
	import { page } from '$app/state';
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

	// eslint-disable-next-line svelte/no-unused-props
	let props: NavigationLinkProps = $props();

	let { as = 'a', isLogo, children, ...restProps } = props;

	const isSelected = $derived('href' in restProps ? restProps.href === page.url.pathname : false);
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
	<li
		class={clsx('p-navigation__item', {
			'is-selected': isSelected
		})}
	>
		{@render content()}
	</li>
{/if}
