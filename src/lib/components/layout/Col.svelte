<script module lang="ts">
	export const colSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
	export type ColSize = (typeof colSizes)[number];
</script>

<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	type ColProps = {
		/**
		 * The number of columns to skip before starting on large screens.
		 */
		emptyLarge?: ColSize;
		/**
		 * The number of columns to skip before starting on medium screens.
		 */
		emptyMedium?: ColSize;
		/**
		 * The number of columns to skip before starting on small screens.
		 */
		emptySmall?: ColSize;
		/**
		 * Override for the number of columns the content occupies on large screens.
		 */
		large?: ColSize;
		/**
		 * Override for the number of columns the content occupies on medium screens.
		 */
		medium?: ColSize;
		/**
		 * The number of columns the content occupies.
		 */
		size: ColSize;
		/**
		 * Override for the number of columns the content occupies on small screens.
		 */
		small?: ColSize;
	} & HTMLAttributes<HTMLElement>;

	let {
		emptyLarge,
		emptyMedium,
		emptySmall,
		large,
		medium,
		size,
		small,
		class: className,
		children,
		...restProps
	}: ColProps = $props();
</script>

<div
	class={clsx(className, `col-${size}`, {
		[`col-small-${small}`]: !!small,
		[`col-medium-${medium}`]: !!medium,
		[`col-large-${large}`]: !!large,
		[`col-start-small-${emptySmall}`]: !!emptySmall,
		[`col-start-medium-${emptyMedium}`]: !!emptyMedium,
		[`col-start-large-${emptyLarge}`]: !!emptyLarge
	})}
	{...restProps}
>
	{@render children?.()}
</div>
