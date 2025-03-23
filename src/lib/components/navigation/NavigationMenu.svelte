<script lang="ts">
	import clsx from 'clsx';
	import { setContext, type Snippet, onMount, onDestroy } from 'svelte';

	type Props = {
		/** default: 'left' */
		align?: 'left' | 'right';
		/**
		 * Dropdown navigation items, look for `NavigationLink` component
		 */
		children?: Snippet;
	} & (
		| { label: string }
		| {
				content: Snippet;
		  }
	);

	let { align = 'left', children, ...props }: Props = $props();

	const menuId = $props.id();
	let isOpen = $state(false);
	let menuElement: HTMLElement;

	setContext('menu-dropdown-class', 'p-navigation__dropdown-item');

	function handleClickOutside(event: MouseEvent) {
		if (isOpen && menuElement && !menuElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<li
	bind:this={menuElement}
	class={clsx('p-navigation__item--dropdown-toggle', { 'is-active': isOpen })}
>
	<button aria-controls={menuId} onclick={() => (isOpen = !isOpen)} class="p-navigation__link">
		{#if 'label' in props}
			{props.label}
		{:else}
			{@render props.content?.()}
		{/if}
	</button>
	<ul
		aria-hidden={!isOpen}
		id={menuId}
		class={clsx('p-navigation__dropdown', {
			'p-navigation__dropdown--right': align === 'right'
		})}
	>
		{@render children?.()}
	</ul>
</li>
