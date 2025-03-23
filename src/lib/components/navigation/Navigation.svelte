<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import NavigationLink from './NavigationLink.svelte';

	type NavigationProps = {
		logo?: Snippet;
		leftNav?: Snippet;
		rightNav?: Snippet;
		/** default: false */
		fullWidth?: boolean;
		/** default: "light" */
		theme?: 'light' | 'dark';
	};

	let { logo, leftNav, rightNav, fullWidth = false, theme = 'light' }: NavigationProps = $props();

	let mobileMenuOpen = $state(false);
</script>

<header
	class={clsx('p-navigation', theme === 'dark' ? 'is-dark' : 'is-light', {
		'has-menu-open': mobileMenuOpen
	})}
>
	<div class={fullWidth ? 'p-navigation__row--full-width' : 'p-navigation__row'}>
		<div
			class={clsx({
				'p-navigation__row--25-75': leftNav && rightNav
			})}
		>
			<div class="p-navigation__banner">
				{#if logo}
					<div class="p-navigation__tagged-logo">
						{@render logo()}
					</div>
				{/if}

				<ul class="p-navigation__items">
					<NavigationLink
						as="button"
						aria-pressed={mobileMenuOpen}
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					>
						{mobileMenuOpen ? 'Close' : 'Menu'}
					</NavigationLink>
				</ul>
			</div>

			<nav class="p-navigation__nav">
				<!-- Always include the left nav list -->
				<ul class="p-navigation__items">
					{@render leftNav?.()}
				</ul>

				{#if rightNav}
					<ul class="p-navigation__items">
						{@render rightNav?.()}
					</ul>
				{/if}
			</nav>
		</div>
	</div>
</header>
