<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import clsx from 'clsx';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.ContentProps = $props();
</script>

<TabsPrimitive.Content bind:ref class={clsx(className)} {...restProps} />
