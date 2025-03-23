<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Button',
		component: Button,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default"
	parameters={{
		docs: {
			description: {
				story: 'Button with default appearance'
			}
		}
	}}
>
	<Button>Button</Button>
</Story>

<Story
	name="Default disabled"
	parameters={{
		docs: {
			description: {
				story: 'Disabled button with default appearance'
			}
		}
	}}
>
	<Button disabled>Button</Button>
</Story>

<Story
	name="Base"
	parameters={{
		docs: {
			description: {
				story: 'Button with base appearance'
			}
		}
	}}
>
	<Button appearance="base">Base button</Button>
</Story>

<Story
	name="Base disabled"
	parameters={{
		docs: {
			description: {
				story: 'Disabled button with base appearance'
			}
		}
	}}
>
	<Button appearance="base" disabled>Base button disabled</Button>
</Story>

<Story
	name="Link"
	parameters={{
		docs: {
			description: {
				story: 'Button with link appearance'
			}
		}
	}}
>
	<Button appearance="link">Link button</Button>
</Story>

<Story
	name="Link disabled"
	parameters={{
		docs: {
			description: {
				story: 'Disabled button with link appearance'
			}
		}
	}}
>
	<Button appearance="link" disabled>Link button disabled</Button>
</Story>

<Story
	name="Positive"
	parameters={{
		docs: {
			description: {
				story: 'Button with positive appearance'
			}
		}
	}}
>
	<Button appearance="positive">Positive button</Button>
</Story>

<Story
	name="Positive disabled"
	parameters={{
		docs: {
			description: {
				story: 'Disabled button with positive appearance'
			}
		}
	}}
>
	<Button appearance="positive" disabled>Positive button disabled</Button>
</Story>

<Story
	name="Negative"
	parameters={{
		docs: {
			description: {
				story: 'Button with negative appearance'
			}
		}
	}}
>
	<Button appearance="negative">Negative button</Button>
</Story>

<Story
	name="Negative disabled"
	parameters={{
		docs: {
			description: {
				story: 'Disabled button with negative appearance'
			}
		}
	}}
>
	<Button appearance="negative" disabled>Negative button disabled</Button>
</Story>

<Story
	name="Brand"
	parameters={{
		docs: {
			description: {
				story: 'Button with brand appearance'
			}
		}
	}}
>
	<Button appearance="brand">Brand button</Button>
</Story>

<Story
	name="Brand disabled"
	parameters={{
		docs: {
			description: {
				story: 'Disabled button with brand appearance'
			}
		}
	}}
>
	<Button appearance="brand" disabled>Brand button disabled</Button>
</Story>

<Story
	name="Inline"
	parameters={{
		docs: {
			description: {
				story: 'Button that displays on the same line as the sibling elements'
			}
		}
	}}
>
	<span>Everything you need to get started with Vanilla.</span>
	<Button inline>Inline button</Button>
</Story>

<Story
	name="Dense"
	parameters={{
		docs: {
			description: {
				story: 'Button with reduced vertical padding'
			}
		}
	}}
>
	<span>Everything you need to get started with Vanilla.</span>
	<Button dense>Dense button</Button>
</Story>

<Story
	name="Small"
	parameters={{
		docs: {
			description: {
				story: 'Button that can fit small text inside'
			}
		}
	}}
>
	<Button small>Small button</Button>
	<Button small dense>Small dense button</Button>
</Story>

<Story
	name="Icon"
	parameters={{
		docs: {
			description: {
				story: 'Button with an icon inside'
			}
		}
	}}
>
	<Button hasIcon>
		<i class="p-icon--plus"></i>
	</Button>
</Story>

<Story
	name="Icon & text"
	parameters={{
		docs: {
			description: {
				story: 'Button with both an icon and text inside'
			}
		}
	}}
>
	<Button hasIcon>
		<i class="p-icon--plus"></i> <span>Button with icon & text</span>
	</Button>
</Story>

<Story
	name="Button as link"
	parameters={{
		docs: {
			description: {
				story: 'Button that is rendered as an `a` element'
			}
		}
	}}
>
	<Button appearance="base" as="a" href="#test">Button as link</Button>
</Story>

<Story
	name="Button as link disabled"
	parameters={{
		docs: {
			description: {
				story: 'Disabled button that is rendered as an `a` element'
			}
		}
	}}
>
	<Button appearance="base" as="a" href="#test" disabled>Button as link disabled</Button>
</Story>
