<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type HeadingProps = {
		level: 1 | 2 | 3 | 4 | 5 | 6;
		children: Snippet;
	} & HTMLAttributes<HTMLElement>;

	const { level, children, class: className, ...rest }: HeadingProps = $props();
	const element = `h${level}` as const;
</script>

<svelte:element this={element} {...rest} class={clsx('base', className)}
	>{@render children?.()}</svelte:element
>

<style>
	.base {
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: balance;
	}

	h1 {
		font-size: 32px;
		font-weight: 550;
		line-height: 40px;
	}

	h2 {
		font-size: 32px;
		font-weight: 180;
		line-height: 40px;
	}

	h3 {
		font-size: 24px;
		font-weight: 180;
		line-height: 32px;
	}

	h4 {
		font-size: 20px;
		font-weight: 180;
		line-height: 28px;
	}

	h5 {
		font-size: 16px;
		font-weight: 180;
		line-height: 24px;
	}

	h6 {
		font-size: 14px;
		font-weight: 180;
		line-height: 24px;
	}
</style>
