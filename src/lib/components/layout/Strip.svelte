<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ColSize } from './Col.svelte';
	import Col from './Col.svelte';
	import Row from './Row.svelte';

	type StripProps = {
		/**
		 * Whether the strip should display borders.
		 */
		bordered?: boolean;
		/**
		 * The width of the column if `includeCol` has been set.
		 */
		colSize?: ColSize;
		/**
		 * Whether the strip should be dark.
		 */
		dark?: boolean;
		/**
		 * Whether the strip should be deep.
		 */
		deep?: boolean;
		/**
		 * Whether the strip should wrap the content in a column.
		 */
		includeCol?: boolean;
		/**
		 * Whether the strip should be light.
		 */
		light?: boolean;
		/**
		 * Optional classes to apply to the row.
		 */
		rowClass?: string;
		/**
		 * Optional classes to apply to the column.
		 */
		colClass?: string;

		/**
		 * Whether the strip should be shallow.
		 */
		shallow?: boolean;
		/**
		 * The type of the strip (e.g. "accent" or "image").
		 */
		type?: string;
	} & HTMLAttributes<HTMLElement>;

	let {
		bordered = false,
		colSize = 12,
		dark = false,
		deep = false,
		includeCol = true,
		light = false,
		shallow = false,
		type,
		rowClass,
		colClass,
		class: className,
		children,
		...restProps
	}: StripProps = $props();
</script>

<div
	class={clsx(className, {
		[`p-strip--${type}`]: !!type,
		'p-strip': !type,
		'is-bordered': bordered,
		'is-dark': dark,
		'is-deep': deep,
		'is-light': light,
		'is-shallow': shallow
	})}
	{...restProps}
>
	<Row class={rowClass}>
		{#if includeCol}
			<Col size={colSize} class={colClass}>
				{@render children?.()}
			</Col>
		{:else}
			{@render children?.()}
		{/if}
	</Row>
</div>
