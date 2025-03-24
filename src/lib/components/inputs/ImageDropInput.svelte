<script lang="ts">
	import clsx from 'clsx';
	import { X } from 'lucide-svelte';
	import Button from '../button/Button.svelte';

	type ImageDropInputProps = {
		fieldId: string;
		value: string;
		onInput: (fieldId: string, value: string) => void;
		onDimensionsChange: (fieldId: string, width: number, height: number) => void;
	};

	let { fieldId, value, onInput, onDimensionsChange }: ImageDropInputProps = $props();

	let imageWidth = $state(0);
	let imageHeight = $state(0);

	const processImage = (dataUrl: string) => {
		const img = new Image();
		img.onload = () => {
			imageWidth = img.width;
			imageHeight = img.height;
			onInput(fieldId, dataUrl);
			onDimensionsChange(fieldId, imageWidth, imageHeight);
		};
		img.src = dataUrl;
	};

	const handleImageUpload = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const dataUrl = e.target?.result as string;
				processImage(dataUrl);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		const files = event.dataTransfer?.files;
		if (files && files[0]) {
			const file = files[0];
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const dataUrl = e.target?.result as string;
					processImage(dataUrl);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
	};

	const clearImage = () => {
		imageWidth = 0;
		imageHeight = 0;
		onInput(fieldId, '');
	};
</script>

<div
	class={clsx('image-upload-container', {
		'has-image': value
	})}
	ondragover={handleDragOver}
	ondrop={handleDrop}
>
	{#if value}
		<div class="image-preview">
			<img src={value} alt="Preview" />
			<button class="remove-image" onclick={clearImage}>
				<X size={16} />
			</button>
			<div class="dimensions-info">
				{imageWidth} × {imageHeight}
			</div>
		</div>
	{:else}
		<div class="drop-zone">
			<p>Drag image here or</p>
			<label for={`file-${fieldId}`}>
				<Button as="div">Select file</Button>
			</label>
		</div>
	{/if}
	<input
		type="file"
		id={`file-${fieldId}`}
		accept="image/*"
		class="file-input"
		onchange={handleImageUpload}
	/>
</div>

<style>
	.image-upload-container {
		border: 2px dashed #ddd;
		text-align: center;
		cursor: pointer;
		min-height: 120px;
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
		&:not(.has-image) {
			padding: 0.5rem 1rem;
		}
	}

	.image-upload-container:hover {
		border-color: #aaa;
	}

	.drop-zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.file-input {
		display: none;
	}

	.image-preview {
		position: relative;
		width: fit-content;
		display: flex;
	}

	.image-preview img {
		max-width: 100%;
		max-height: 200px;
	}

	.remove-image {
		position: absolute;
		top: -10px;
		right: -10px;
		border-radius: 50%;
		padding: 3px;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;

		&:hover {
			background-color: rgba(0, 0, 0, 0.7);
		}
	}

	.dimensions-info {
		position: absolute;
		bottom: 5px;
		right: 5px;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		padding: 2px 6px;
		border-radius: 2px;
		font-size: 12px;
	}
</style>
