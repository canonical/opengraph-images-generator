<script lang="ts">
	import clsx from 'clsx';
	import { setContext, type Snippet } from 'svelte';

	type Props = {
		label: string;
		/** default: 'left' */
		align?: 'left' | 'right';
		/**
		 * Dropdown navigation items, look for `NavigationLink` component
		 */
		children?: Snippet;
	};

	let { label, align = 'left', children }: Props = $props();

	const menuId = $props.id();
	let isOpen = $state(false);

	setContext('menu-dropdown-class', 'p-navigation__dropdown-item');
</script>

<li class={clsx('p-navigation__item--dropdown-toggle', { 'is-active': isOpen })}>
	<button aria-controls={menuId} onclick={() => (isOpen = !isOpen)} class="p-navigation__link">
		{label}
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
