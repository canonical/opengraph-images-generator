<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import '../../../app.scss';

	const { Story } = defineMeta({
		title: 'components/Button',
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
	Button
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
	args={{
		disabled: true
	}}
>
	Button
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
	args={{
		appearance: 'base'
	}}
>
	Base button
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
	args={{
		appearance: 'base',
		disabled: true
	}}
>
	Base button disabled
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
	args={{
		appearance: 'link'
	}}
>
	Link button
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
	args={{
		appearance: 'link',
		disabled: true
	}}
>
	Link button disabled
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
	args={{
		appearance: 'positive'
	}}
>
	Positive button
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
	args={{
		appearance: 'positive',
		disabled: true
	}}
>
	Positive button disabled
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
	args={{
		appearance: 'negative'
	}}
>
	Negative button
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
	args={{
		appearance: 'negative',
		disabled: true
	}}
>
	Negative button disabled
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
	args={{
		appearance: 'brand'
	}}
>
	Brand button
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
	args={{
		appearance: 'brand',
		disabled: true
	}}
>
	Brand button disabled
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
	args={{
		inline: true
	}}
>
	<span>Everything you need to get started with Vanilla.</span>
	Inline button
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
	args={{
		dense: true
	}}
>
	<span>Everything you need to get started with Vanilla.</span>
	Dense button
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
	args={{
		small: true
	}}
>
	Small button Small dense button
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
	args={{
		hasIcon: true
	}}
>
	<i class="p-icon--plus"></i>
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
	args={{
		hasIcon: true
	}}
>
	<i class="p-icon--plus"></i> <span>Button with icon & text</span>
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
	args={{
		appearance: 'base',
		as: 'a',
		href: '#test'
	}}
>
	Button as link
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
	args={{
		appearance: 'base',
		as: 'a',
		href: '#test',
		disabled: true
	}}
>
	Button as link disabled
</Story>
