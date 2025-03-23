<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	type RowProps = HTMLAttributes<HTMLElement>;
	let { class: className, children, ...restProps }: RowProps = $props();
</script>

<div class={clsx('row', className)} {...restProps}>
	{@render children?.()}
</div>
