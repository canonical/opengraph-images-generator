<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import clsx from 'clsx';

	let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.RootProps = $props();
</script>

<TabsPrimitive.Root bind:ref class={clsx('p-tabs', className)} {...restProps} />
