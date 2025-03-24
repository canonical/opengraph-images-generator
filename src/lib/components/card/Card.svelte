<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type CardProps = {
		highlighted?: boolean;
		overlay?: boolean;
		title?: string;
		image?: Snippet;
	} & HTMLAttributes<HTMLElement>;

	let {
		title,
		image,
		children,
		highlighted = false,
		overlay = false,
		class: className,
		...restProps
	}: CardProps = $props();

	const contentClass = image ? 'p-card__inner' : 'p-card__content';
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
	{#if image}
		<div class="p-card__thumbnail">
			{@render image?.()}
		</div>
		<hr />
	{/if}
	<div
		class={clsx({
			[contentClass]: image
		})}
	>
		{#if title}
			<h3 class="p-card__title">
				{title}
			</h3>
		{/if}
	</div>
	<div class={contentClass}>
		{@render children?.()}
	</div>
</div>
