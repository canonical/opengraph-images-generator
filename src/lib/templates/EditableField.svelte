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
		templateWidth?: number;
		templateHeight?: number;
	};

	let {
		field,
		value,
		isSelected,
		onSelect,
		onUpdate,
		onInput,
		onBlur = () => {},
		templateWidth = Infinity,
		templateHeight = Infinity
	}: EditableFieldProps = $props();

	let previousValue = $state(value);
	let element: HTMLElement;
	let isDragging = $state(false);
	let isResizing = $state(false);

	let width = $state(Math.min(field.position.width || 100, templateWidth));
	let height = $state(Math.min(field.position.height || 50, templateHeight));

	let position = {
		x: Math.min(Math.max(0, field.position.x || 0), templateWidth - width),
		y: Math.min(Math.max(0, field.position.y || 0), templateHeight - height)
	};

	const fontSize = $derived(('fontSize' in field && field.fontSize) || 16);
	const fontFamily = $derived(('fontFamily' in field && field.fontFamily) || 'var(--font-sans)');
	const fontWeight = $derived(('fontWeight' in field && field.fontWeight) || 'normal');
	const color = $derived(('color' in field && field.color) || 'black');
	const alignment = $derived(('alignment' in field && field.alignment) || 'left');

	const isTextField = $derived(field.type === 'text');
	const isImageField = $derived(field.type === 'image');

	let aspectRatio = $state(
		'aspectRatio' in field && typeof field.aspectRatio === 'number' && field.aspectRatio > 0
			? field.aspectRatio
			: width / height || 1
	);

	// Update aspect ratio when field properties change
	$effect(() => {
		if ('aspectRatio' in field && typeof field.aspectRatio === 'number' && field.aspectRatio > 0) {
			aspectRatio = field.aspectRatio;
		} else {
			aspectRatio = width / height;
		}
	});

	// Apply resizing based on image aspect ratio
	function applyImageResize(imgElement: HTMLImageElement) {
		if (
			!isImageField ||
			!imgElement ||
			imgElement.naturalWidth <= 0 ||
			imgElement.naturalHeight <= 0
		)
			return;

		const newAspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;

		// Always update aspect ratio when image changes
		aspectRatio = newAspectRatio;

		// Use resize helper to maintain aspect ratio
		const { newWidth, newHeight, newX, newY } = calculateImageDimensions(
			width,
			aspectRatio,
			position.x,
			position.y
		);

		width = newWidth;
		height = newHeight;
		position.x = newX;
		position.y = newY;

		if (element) {
			element.style.width = `${width}px`;
			element.style.height = `${height}px`;
			element.style.transform = `translate(${position.x}px, ${position.y}px)`;
		}

		// Update parent component
		onUpdate(field.id, {
			...field.position,
			width,
			height,
			x: position.x,
			y: position.y
		});
	}

	// Helper function to calculate image dimensions while maintaining aspect ratio
	function calculateImageDimensions(
		currentWidth: number,
		imageAspectRatio: number,
		currentX: number,
		currentY: number
	) {
		// Start with current width as basis
		let newWidth = currentWidth;
		let newHeight = currentWidth / imageAspectRatio;

		// First try to fit within width
		if (newWidth > templateWidth) {
			newWidth = templateWidth;
			newHeight = newWidth / imageAspectRatio;
		}

		// Then check if height needs adjustment (takes priority)
		if (newHeight > templateHeight) {
			newHeight = templateHeight;
			newWidth = newHeight * imageAspectRatio;
		}

		// Apply minimum size constraints while maintaining aspect ratio
		if (newWidth < 50) {
			newWidth = 50;
			newHeight = newWidth / imageAspectRatio;
		}

		if (newHeight < 30) {
			newHeight = 30;
			newWidth = newHeight * imageAspectRatio;
		}

		// Ensure position is within bounds
		let newX = Math.min(currentX, templateWidth - newWidth);
		newX = Math.max(0, newX);
		let newY = Math.min(currentY, templateHeight - newHeight);
		newY = Math.max(0, newY);

		return { newWidth, newHeight, newX, newY };
	}

	// Update previousValue when value changes to detect image changes
	$effect(() => {
		if (isImageField && value !== previousValue) {
			previousValue = value;

			if (value && element) {
				const imgElement = element.querySelector('img');
				if (imgElement && imgElement.complete && imgElement.naturalWidth > 0) {
					console.log('Image loaded:', imgElement.src);
					applyImageResize(imgElement);
				}
			}
		}
	});

	function handleFocus() {
		onSelect(field.id);
	}

	function handleInput(event: Event) {
		const content = (event.target as HTMLElement).innerText;
		onInput(field.id, content || '');
	}

	function handleBlur() {
		onBlur(field.id);
	}

	onMount(() => {
		if (!element) return;

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
						let newX = position.x + event.dx;
						let newY = position.y + event.dy;

						newX = Math.max(0, Math.min(newX, templateWidth - width));
						newY = Math.max(0, Math.min(newY, templateHeight - height));

						position.x = newX;
						position.y = newY;

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
				// For images, only allow resizing from corner or right edge to better maintain aspect ratio
				edges: isImageField
					? { right: true, bottom: true, corner: true }
					: { left: true, right: true, bottom: true, top: true },
				inertia: false,
				margin: 8, // Increase the resize edge margin
				modifiers: [
					interact.modifiers.restrictSize({
						min: { width: 50, height: 30 },
						max: { width: templateWidth, height: templateHeight }
					}),
					interact.modifiers.restrictEdges({
						outer: 'parent'
					})
				],
				listeners: {
					start: () => {
						isResizing = true;
					},
					move: (event) => {
						if (isImageField) {
							// Start with current width and add deltas
							let newWidth = width + event.deltaRect.width;

							// Calculate new dimensions while preserving aspect ratio
							const {
								newWidth: finalWidth,
								newHeight: finalHeight,
								newX: finalX,
								newY: finalY
							} = calculateImageDimensions(
								newWidth,
								aspectRatio,
								position.x + event.deltaRect.left,
								position.y + event.deltaRect.top
							);

							width = finalWidth;
							height = finalHeight;
							position.x = finalX;
							position.y = finalY;
						} else {
							// Text fields - no aspect ratio constraint
							let newWidth = width + event.deltaRect.width;
							let newHeight = height + event.deltaRect.height;
							let deltaX = event.deltaRect.left;
							let deltaY = event.deltaRect.top;
							let newX = position.x + deltaX;
							let newY = position.y + deltaY;

							newWidth = Math.max(50, newWidth);
							newHeight = Math.max(30, newHeight);

							if (newX < 0) {
								if (deltaX !== 0) {
									newWidth -= Math.abs(newX);
									newWidth = Math.max(50, newWidth);
								}
								newX = 0;
							}

							if (newY < 0) {
								if (deltaY !== 0) {
									newHeight -= Math.abs(newY);
									newHeight = Math.max(30, newHeight);
								}
								newY = 0;
							}

							if (newX + newWidth > templateWidth) {
								if (deltaX === 0) {
									newWidth = templateWidth - newX;
								} else {
									newX = Math.max(0, templateWidth - newWidth);
									if (newX === 0) {
										newWidth = Math.min(templateWidth, Math.max(50, width - deltaX));
									}
								}
							}

							if (newY + newHeight > templateHeight) {
								if (deltaY === 0) {
									newHeight = templateHeight - newY;
								} else {
									newY = Math.max(0, templateHeight - newHeight);
									if (newY === 0) {
										newHeight = Math.min(templateHeight, Math.max(30, height - deltaY));
									}
								}
							}

							newWidth = Math.min(newWidth, templateWidth);
							newHeight = Math.min(newHeight, templateHeight);

							width = newWidth;
							height = newHeight;
							position.x = newX;
							position.y = newY;
						}

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
	style:line-height={'lineHeight' in field ? field.lineHeight : undefined}
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
				<img
					src={value}
					alt={field.description || field.id}
					onload={(e) => applyImageResize(e.target as HTMLImageElement)}
					onerror={() => console.error(`Failed to load image: ${value}`)}
					draggable="false"
				/>
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
			border-color: var(--edit-color);

			.resize-handle {
				opacity: 1;
				background: var(--edit-color);
			}
		}

		&.dragging {
			cursor: move;
		}

		&.resizing {
			opacity: 0.7;
		}

		.drag-handle {
			position: absolute;
			top: 0;
			right: 0;
			background: var(--edit-color);
			color: white;
			padding: 3px;
			border-bottom-left-radius: 4px;
		}

		.resize-handle {
			position: absolute;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			opacity: 0;
			z-index: 10;

			&.resize-handle-n {
				top: -5px;
				left: 50%;
				cursor: n-resize;
			}
			&.resize-handle-e {
				right: -5px;
				top: 50%;
				cursor: e-resize;
			}
			&.resize-handle-s {
				bottom: -5px;
				left: 50%;
				cursor: s-resize;
			}
			&.resize-handle-w {
				left: -5px;
				top: 50%;
				cursor: w-resize;
			}
			&.resize-handle-ne {
				top: -5px;
				right: -5px;
				cursor: ne-resize;
			}
			&.resize-handle-se {
				bottom: -5px;
				right: -5px;
				cursor: se-resize;
			}
			&.resize-handle-sw {
				bottom: -5px;
				left: -5px;
				cursor: sw-resize;
			}
			&.resize-handle-nw {
				top: -5px;
				left: -5px;
				cursor: nw-resize;
			}
		}

		.image-content {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
		}
		.image-content img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			user-select: none;
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
	}
</style>
