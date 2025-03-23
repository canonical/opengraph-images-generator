<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import clsx from 'clsx';

	let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List bind:ref class={clsx('p-tabs__list', className)} {...restProps} />
