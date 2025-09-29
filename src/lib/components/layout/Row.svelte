<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	type RowProps = HTMLAttributes<HTMLElement>;
	let { class: className, children, ...restProps }: RowProps = $props();
</script>

<div class={clsx(className, { row: !className?.includes('u-fixed-width') })} {...restProps}>
	{@render children?.()}
</div>
