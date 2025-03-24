<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes, HTMLAttributes } from 'svelte/elements';
	import type { BUTTON_APPEARANCES } from './constants';
	import type { Snippet } from 'svelte';

	type ButtonBaseProps = {
		appearance?: (typeof BUTTON_APPEARANCES)[number];
		dense?: boolean;
		hasIcon?: boolean;
		inline?: boolean;
		small?: boolean;
		disabled?: boolean;
		children?: Snippet;
	};

	type ButtonElProps = {
		as?: 'button';
	} & HTMLButtonAttributes;

	type AnchorElProps = {
		as: 'a';
	} & HTMLAnchorAttributes;

	type DivElProps = {
		as: 'div';
	} & HTMLAttributes<HTMLDivElement>;

	type ButtonProps = ButtonBaseProps & (ButtonElProps | AnchorElProps | DivElProps);

	let {
		appearance,
		dense = false,
		hasIcon = false,
		inline = false,
		small = false,
		as = 'button',
		disabled = false,
		children,
		class: className,
		...restProps
	}: ButtonProps = $props();
</script>

<svelte:element
	this={as}
	class={clsx(
		appearance ? `p-button--${appearance}` : 'p-button',
		{
			'has-icon': hasIcon,
			'is-dense': dense,
			'is-inline': inline,
			'is-small': small,
			'is-disabled': disabled
		},
		className
	)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
