<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import clsx from 'clsx';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.TriggerProps = $props();
</script>

<div class="p-tabs__item">
	<TabsPrimitive.Trigger bind:ref class={clsx('p-tabs__link', className)} {...restProps} />
</div>
