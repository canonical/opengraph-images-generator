<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	type CardProps = {
		highlighted?: boolean;
		overlay?: boolean;
		title?: string;
	} & HTMLAttributes<HTMLElement>;

	let {
		title,
		children,
		highlighted = false,
		overlay = false,
		class: className,
		...restProps
	}: CardProps = $props();
</script>

<div
	class={clsx(
		{
			'p-card': !highlighted && !overlay,
			'p-card--highlighted': highlighted,
			'p-card--overlay': overlay
		},
		className
	)}
	role="region"
	{...restProps}
>
	{#if title}
		<h3 class="p-card__title">
			{title}
		</h3>
	{/if}

	<p class="p-card__content">
		{@render children?.()}
	</p>
</div>
