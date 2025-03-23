<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import clsx from 'clsx';

	let {
		ref = $bindable(null),
		class: className,
		side = 'bottom',
		...restProps
	}: TooltipPrimitive.ContentProps = $props();

	const tooltipVanillaSideMap: Record<typeof side, string> = {
		top: 'top-center',
		right: 'right',
		bottom: 'bottom-center',
		left: 'left'
	};
</script>

<span class={clsx(`p-tooltip--${tooltipVanillaSideMap[side]}`, 'is-detached')}>
	<TooltipPrimitive.Content
		{side}
		bind:ref
		class={clsx('p-tooltip__message', className)}
		{...restProps}
	/>
</span>
