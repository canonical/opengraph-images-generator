<script lang="ts">
	import interact from 'interactjs';
	import { GripVertical } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { ImageField, Position, TextField } from './types';

	type EditableFieldProps = {
		field: TextField | ImageField;
		value: string;
		isSelected: boolean;
		onSelect: (id: string) => void;
		onUpdate: (id: string, position: Position) => void;
		onInput: (id: string, value: string) => void;
		onBlur: (id: string) => void;
	};

	let {
		field,
		value,
		isSelected,
		onSelect,
		onUpdate,
		onInput,
		onBlur = () => {}
	}: EditableFieldProps = $props();

	let element: HTMLElement;
	let isDragging = $state(false);
	let isResizing = $state(false);
	let position = { x: field.position.x || 0, y: field.position.y || 0 };
	let width = $state(field.position.width || 100);
	let height = $state(field.position.height || 50);

	const fontSize = $derived(('fontSize' in field && field.fontSize) || 16);
	const fontFamily = $derived(('fontFamily' in field && field.fontFamily) || 'var(--font-sans)');
	const fontWeight = $derived(('fontWeight' in field && field.fontWeight) || 'normal');
	const color = $derived(('color' in field && field.color) || 'black');
	const alignment = $derived(('alignment' in field && field.alignment) || 'left');

	const isTextField = $derived(field.type === 'text');
	const isImageField = $derived(field.type === 'image');

	let aspectRatio = $derived(
		'aspectRatio' in field && typeof field.aspectRatio === 'number'
			? field.aspectRatio
			: width / height
	);

	function handleFocus() {
		onSelect(field.id);
	}

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		onInput(field.id, input.value || '');
	}

	function handleBlur() {
		onBlur(field.id);
	}

	onMount(() => {
		if (!element) return;

		// Handle click outside
		const handleClickOutside = (event: MouseEvent) => {
			if (isSelected && !element.contains(event.target as Node)) {
				handleBlur();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		interact(element)
			.draggable({
				inertia: false,
				modifiers: [
					interact.modifiers.restrictRect({
						restriction: 'parent'
					})
				],
				listeners: {
					start: () => {
						isDragging = true;
					},
					move: (event) => {
						position.x += event.dx;
						position.y += event.dy;

						element.style.transform = `translate(${position.x}px, ${position.y}px)`;

						onUpdate(field.id, {
							...field.position,
							x: position.x,
							y: position.y
						});
					},
					end: () => {
						isDragging = false;
					}
				}
			})
			.resizable({
				// Enable resizing from the edges and corners
				edges: { left: true, right: true, bottom: true, top: true },
				inertia: false,
				margin: 8, // Increase the resize edge margin
				modifiers: [
					interact.modifiers.restrictSize({
						min: { width: 50, height: 30 }
					})
				],
				listeners: {
					start: () => {
						isResizing = true;
					},
					move: (event) => {
						// Update the element size
						let newWidth = width + event.deltaRect.width;
						let newHeight = height + event.deltaRect.height;

						if (isImageField) {
							const widthChange = Math.abs(event.deltaRect.width);
							const heightChange = Math.abs(event.deltaRect.height);

							if (widthChange >= heightChange) {
								newHeight = newWidth / aspectRatio;
							} else {
								newWidth = newHeight * aspectRatio;
							}
						}

						width = newWidth;
						height = newHeight;

						// If position changed during resize (e.g., resizing from left or top)
						position.x += event.deltaRect.left;
						position.y += event.deltaRect.top;

						// Apply the changes
						element.style.width = `${width}px`;
						element.style.height = `${height}px`;
						element.style.transform = `translate(${position.x}px, ${position.y}px)`;

						// Notify parent component
						onUpdate(field.id, {
							...field.position,
							width,
							height,
							x: position.x,
							y: position.y
						});
					},
					end: () => {
						isResizing = false;
					}
				}
			});

		return () => {
			interact(element).unset();
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

<div
	bind:this={element}
	class="editable-field"
	class:selected={isSelected}
	class:dragging={isDragging}
	class:resizing={isResizing}
	tabindex="0"
	role="button"
	onfocus={handleFocus}
	onblur={handleBlur}
	style:width="{width}px"
	style:height="{height}px"
	style:transform="translate({position.x}px, {position.y}px)"
	style:z-index={field.position.zIndex || 0}
	style:rotation="{field.position.rotation || 0}deg"
	style:font-size="{fontSize}px"
	style:font-family={fontFamily}
	style:font-weight={fontWeight}
	style:color
	style:text-align={alignment}
	contenteditable={isSelected && field.type === 'text' ? 'true' : 'false'}
	oninput={handleInput}
>
	{#if isTextField && field.type === 'text'}
		{value || field.description || ' '}
	{:else if isImageField && field.type === 'image'}
		<div class="image-content">
			{#if value}
				<img src={value} alt={field.description || field.id} />
			{:else}
				<div class="placeholder-image">
					{field.description || 'Image'}
				</div>
			{/if}
		</div>
	{/if}
	{#if isSelected}
		<div class="drag-handle">
			<GripVertical size={16} />
		</div>

		<div class="resize-handle resize-handle-n"></div>
		<div class="resize-handle resize-handle-e"></div>
		<div class="resize-handle resize-handle-s"></div>
		<div class="resize-handle resize-handle-w"></div>
		<div class="resize-handle resize-handle-ne"></div>
		<div class="resize-handle resize-handle-se"></div>
		<div class="resize-handle resize-handle-sw"></div>
		<div class="resize-handle resize-handle-nw"></div>
	{/if}
</div>

<style>
	.editable-field {
		--edit-color: #3498db;

		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
		touch-action: none;
		cursor: pointer;
		border: 2px solid transparent;
		outline: none;

		&.selected {
			border: 2px solid var(--edit-color);

			.resize-handle {
				opacity: 1;
			}
		}

		&.dragging {
			cursor: move;
		}

		&.resizing {
			opacity: 0.7;
		}
	}

	.text-content,
	.image-content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.image-content img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.placeholder-image {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(100, 100, 100, 0.25);
		color: #888;
		font-family: var(--font-mono);
		font-size: 1.5rem;
		border: 1px dashed #ccc;
	}

	.drag-handle {
		position: absolute;
		top: 0px;
		right: 0px;
		background-color: var(--edit-color);
		color: white;
		border-bottom-left-radius: 4px;
		cursor: move;
		padding: 3px;
		user-select: none;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.resize-handle {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: var(--edit-color);
		border-radius: 50%;
		opacity: 0;
		z-index: 10;
	}

	.resize-handle-n {
		top: -5px;
		left: calc(50% - 5px);
		cursor: n-resize;
	}

	.resize-handle-e {
		right: -5px;
		top: calc(50% - 5px);
		cursor: e-resize;
	}

	.resize-handle-s {
		bottom: -5px;
		left: calc(50% - 5px);
		cursor: s-resize;
	}

	.resize-handle-w {
		left: -5px;
		top: calc(50% - 5px);
		cursor: w-resize;
	}

	.resize-handle-ne {
		top: -5px;
		right: -5px;
		cursor: ne-resize;
	}

	.resize-handle-se {
		bottom: -5px;
		right: -5px;
		cursor: se-resize;
	}

	.resize-handle-sw {
		bottom: -5px;
		left: -5px;
		cursor: sw-resize;
	}

	.resize-handle-nw {
		top: -5px;
		left: -5px;
		cursor: nw-resize;
	}
</style>
