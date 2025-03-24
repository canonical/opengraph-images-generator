<script lang="ts">
	import EditableField from './EditableField.svelte';
	import type { Field, ImageField, Position, Template, TextField } from './types';

	type TemplateRendererProps = {
		template: Template;
		fieldValues: Record<string, string>;
		fieldMetadata?: Record<string, Record<string, any>>;
		onFieldInput: (id: string, value: string) => void;
		onFieldUpdate?: (id: string, updates: Record<string, any>) => void;
	};

	let {
		template,
		fieldValues,
		fieldMetadata = {},
		onFieldInput,
		onFieldUpdate
	}: TemplateRendererProps = $props();

	let sortedFields = $state<Field[]>([]);
	let aspectRatio = $state<number>(1);

	// Sort fields by zIndex to ensure proper layering
	$effect(() => {
		sortedFields = [...template.fields].sort(
			(a, b) => (a.position.zIndex || 0) - (b.position.zIndex || 0)
		);

		aspectRatio = template.width / template.height;
	});

	let selectedFieldId = $state<string>();

	function isTextField(field: Field): field is TextField {
		return field.type === 'text';
	}

	function isImageField(field: Field): field is ImageField {
		return field.type === 'image';
	}

	function handleFieldSelect(id: string) {
		selectedFieldId = id;
	}

	function handleFieldUpdate(id: string, position: Position) {
		const fieldIndex = template.fields.findIndex((f) => f.id === id);

		if (fieldIndex !== -1) {
			template.fields[fieldIndex].position = position;

			if (onFieldUpdate) {
				onFieldUpdate(id, { position });
			}
		}
	}

	function handleFieldInput(id: string, value: string) {
		onFieldInput(id, value);
	}

	function handleFieldBlur(id: string) {
		selectedFieldId = undefined;
	}

	function getMergedField(field: Field): Field {
		if (fieldMetadata[field.id]) {
			// Create a new field object with the base field properties
			const mergedField: Field = { ...field };

			// Apply metadata properties that are applicable to this field type
			const metadata = fieldMetadata[field.id];

			// Apply position if it exists in metadata
			if (metadata.position) {
				mergedField.position = { ...field.position, ...metadata.position };
			}

			// Apply type-specific properties
			if (field.type === 'text' && isTextField(field)) {
				const textField = mergedField as TextField;
				if (metadata.fontSize !== undefined) textField.fontSize = metadata.fontSize;
				if (metadata.fontFamily !== undefined) textField.fontFamily = metadata.fontFamily;
				if (metadata.fontWeight !== undefined) textField.fontWeight = metadata.fontWeight;
				if (metadata.color !== undefined) textField.color = metadata.color;
				if (metadata.alignment !== undefined) textField.alignment = metadata.alignment;
			} else if (field.type === 'image' && isImageField(field)) {
				const imageField = mergedField as ImageField;
				if (metadata.aspectRatio !== undefined) imageField.aspectRatio = metadata.aspectRatio;
			}

			return mergedField;
		}
		return field;
	}
</script>

<div
	class="template-container"
	style="aspect-ratio: {aspectRatio}; background-color: {template.backgroundColor}"
>
	{#if template.backgroundImage}
		<img
			class="background-image"
			src={`/generate/api?assetUrl=${template.backgroundImage}`}
			alt="Background"
		/>
	{/if}
	{#each sortedFields as field (field.id)}
		<EditableField
			field={getMergedField(field)}
			value={fieldValues[field.id] || ''}
			isSelected={selectedFieldId === field.id}
			onSelect={handleFieldSelect}
			onUpdate={handleFieldUpdate}
			onInput={handleFieldInput}
			onBlur={handleFieldBlur}
		/>
	{/each}
</div>

<style>
	.template-container {
		position: relative;
		overflow: hidden;
		border: 1px solid var(--vf-color-border-default);
		width: 100%;
	}

	.background-image {
		position: absolute;
		inset: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
