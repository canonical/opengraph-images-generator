<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/button/Button.svelte';
	import ImageDropInput from '$lib/components/inputs/ImageDropInput.svelte';
	import Col from '$lib/components/layout/Col.svelte';
	import Row from '$lib/components/layout/Row.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
	import TemplateRenderer from '$lib/templates/TemplateRenderer.svelte';
	import { type Template, type TextField } from '$lib/templates/types';
	import domtoimage from 'dom-to-image';
	import { onMount } from 'svelte';

	let selectedTemplate: Template = page.data.template;
	let isCapturing = $state(false);
	let fieldValues = $state<Record<string, string>>({});
	let fieldMetadata = $state<Record<string, Record<string, any>>>({});
	let customBackgroundColor = $state(selectedTemplate.backgroundColor || '#ffffff');
	let customBackgroundImage = $state(selectedTemplate.backgroundImage || '');

	$effect(() => {
		if (selectedTemplate) {
			selectedTemplate.fields.forEach((field) => {
				if (!fieldMetadata[field.id]) {
					fieldMetadata[field.id] = {
						type: field.type,
						position: { ...field.position }
					};

					if (field.type === 'image' && 'objectFit' in field) {
						fieldMetadata[field.id].objectFit = field.objectFit;
					}

					if (field.type === 'text') {
						const textField = field as TextField;
						if (textField.fontSize) fieldMetadata[field.id].fontSize = textField.fontSize;
						if (textField.fontFamily) fieldMetadata[field.id].fontFamily = textField.fontFamily;
						if (textField.fontWeight) fieldMetadata[field.id].fontWeight = textField.fontWeight;
						if (textField.color) fieldMetadata[field.id].color = textField.color;
						if (textField.alignment) fieldMetadata[field.id].alignment = textField.alignment;
					}
				}
			});
		}
	});

	onMount(() => {
		const handleImageDimensions = (event: CustomEvent) => {
			const { fieldId, width, height } = event.detail;

			handleFieldUpdate(fieldId, {
				width,
				height,
				aspectRatio: width / height
			});
		};

		document.addEventListener('imageDimensions', handleImageDimensions as EventListener);

		return () => {
			document.removeEventListener('imageDimensions', handleImageDimensions as EventListener);
		};
	});

	const handleFieldInput = (id: string, value: string) => {
		fieldValues = { ...fieldValues, [id]: value };
	};

	const handleImageInput = (fieldId: string, value: string) => {
		handleFieldInput(fieldId, value);
	};

	const handleFieldUpdate = (id: string, updates: Record<string, any>) => {
		fieldMetadata = {
			...fieldMetadata,
			[id]: {
				...fieldMetadata[id],
				...updates
			}
		};
	};

	const captureScreenshot = async () => {
		const element = document.querySelector('.template-container') as HTMLElement;
		if (!element) return null;

		try {
			isCapturing = true;
			const dataUrl = await domtoimage.toPng(element, {
				bgcolor: undefined,
				cacheBust: true,
				style: {
					'transform-origin': 'top left'
				}
			});

			const canvas = document.createElement('canvas');
			const img = new Image();
			await new Promise((resolve) => {
				img.onload = resolve;
				img.src = dataUrl;
			});

			canvas.width = img.width * 2;
			canvas.height = img.height * 2;
			const ctx = canvas.getContext('2d');
			ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

			return canvas;
		} catch (error) {
			console.error('Error capturing screenshot:', error);
			return null;
		} finally {
			isCapturing = false;
		}
	};

	const downloadAsPNG = async () => {
		const canvas = await captureScreenshot();
		if (!canvas) return;

		const dataUrl = canvas.toDataURL('image/png');
		const link = document.createElement('a');
		link.download = `${selectedTemplate.name.replace(/\s+/g, '-').toLowerCase()}.png`;
		link.href = dataUrl;
		link.click();
	};

	const exportToAssets = async () => {
		// TODO: Implement
	};

	const handleImageDimensions = (fieldId: string, width: number, height: number) => {
		handleFieldUpdate(fieldId, { width, height, aspectRatio: width / height });
	};

	const updateBackgroundColor = (color: string) => {
		customBackgroundColor = color;
	};

	const updateBackgroundImage = (_fieldId: string, imageUrl: string) => {
		console.log('imageUrl', imageUrl);
		customBackgroundImage = imageUrl;
	};

	const hasBackgroundImage = () => selectedTemplate.backgroundImage !== undefined;
</script>

<Strip shallow>
	<div class="template-preview">
		<div class="header">
			<div class="info">
				<h2>{selectedTemplate.name}</h2>
				{#if selectedTemplate.description}
					<p class="u-text--muted">{selectedTemplate.description}</p>
				{/if}
			</div>
			<div class="actions">
				<Button onclick={downloadAsPNG} disabled={isCapturing}>
					{isCapturing ? 'Processing...' : 'Download as PNG'}
				</Button>
				<Button onclick={exportToAssets} disabled={isCapturing}>
					{isCapturing ? 'Processing...' : 'Export to assets'}
				</Button>
			</div>
		</div>

		<TemplateRenderer
			template={{
				...selectedTemplate,
				backgroundColor: customBackgroundColor,
				backgroundImage: customBackgroundImage
			}}
			{fieldValues}
			{fieldMetadata}
			onFieldInput={handleFieldInput}
			onFieldUpdate={handleFieldUpdate}
		/>

		<Strip>
			<h3>Background Customization</h3>
			<Row>
				{#if hasBackgroundImage()}
					<Col size={6}>
						<fieldset>
							<legend>Background Image</legend>
							<ImageDropInput
								fieldId="background-image"
								value={customBackgroundImage}
								onInput={updateBackgroundImage}
								onDimensionsChange={() => {}}
							/>
							{#if customBackgroundImage}
								<Button
									dense
									appearance="base"
									onclick={() => updateBackgroundImage('background-image', '')}
								>
									Remove Image
								</Button>
							{/if}
						</fieldset>
					</Col>
				{/if}

				<Col size={hasBackgroundImage() ? 6 : 12}>
					<fieldset>
						<legend>Background Color</legend>
						<div class="color-selector">
							<label for="background-color">Color:</label>
							<input
								type="color"
								id="background-color"
								value={customBackgroundColor}
								oninput={(e) => updateBackgroundColor(e.currentTarget.value)}
								class="color-input"
							/>
							<code>{customBackgroundColor}</code>
						</div>
					</fieldset>
				</Col>
			</Row>
		</Strip>

		{#if selectedTemplate.fields.length > 0}
			<Strip>
				<h3>Update Fields</h3>
				<Row>
					{#each selectedTemplate.fields as field (field.id)}
						<Col size={6}>
							<fieldset>
								<legend>
									<label for={field.id}>{field.description || field.id}</label>
								</legend>
								{#if field.type === 'text'}
									<input
										type="text"
										id={field.id}
										value={fieldValues[field.id] || ''}
										oninput={(e) => handleFieldInput(field.id, e.currentTarget.value)}
										placeholder={field.description || 'Enter text'}
									/>

									{#if field.type === 'text'}
										<div class="color-selector">
											<label for={`${field.id}-color`}>Text color:</label>
											<input
												type="color"
												id={`${field.id}-color`}
												value={fieldMetadata[field.id]?.color || '#000000'}
												oninput={(e) =>
													handleFieldUpdate(field.id, { color: e.currentTarget.value })}
												class="color-input"
											/>
											<code>{fieldMetadata[field.id]?.color || '#000000'}</code>
										</div>
									{/if}
								{:else if field.type === 'image'}
									<ImageDropInput
										fieldId={field.id}
										value={fieldValues[field.id] || ''}
										onInput={handleImageInput}
										onDimensionsChange={handleImageDimensions}
									/>
								{/if}
							</fieldset>
						</Col>
					{/each}
				</Row>
			</Strip>
		{/if}
	</div>
</Strip>

<style>
	.template-preview {
		margin-bottom: 2rem;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;

		.info {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.actions {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	.color-selector {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.color-input {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		border: none;
		cursor: pointer;
		overflow: hidden;
	}

	fieldset {
		margin-bottom: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	legend {
		padding: 0 0.5rem;
		font-weight: bold;
	}

	input[type='text'] {
		width: 100%;
		padding: 0.5rem;
		margin-top: 0.25rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}
</style>
