<script lang="ts">
	import Col from '$lib/components/layout/Col.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import { caseToTitle, debounce } from '../../(utils)/index.js';
	import Button from '$lib/components/button/Button.svelte';

	const { data } = $props();

	let format = $state('svg');
	let formData = $state<typeof data.template.example & { format?: string }>(data.template.example);
	const generateImgSrc = () => {
		return `/opengraph/${data.template.id}?${new URLSearchParams(formData as unknown as Record<string, string>).toString()}&format=${format}`;
	};
	let imgSrc = $state(generateImgSrc());

	const onformchange: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		formData = {
			...formData,
			[(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
			format
		};
		debounce(loadOgImage, 200);
	};

	let lastImgLoadStart = $state<number>();
	let lastImgLoadEnd = $state<number>();
	const loadOgImage = async () => {
		lastImgLoadStart = Date.now();
		imgSrc = generateImgSrc();
	};
</script>

<Strip includeCol={false}>
	<Col size={6}>
		<div class="image-container">
			<img
				src={imgSrc}
				onload={() => {
					lastImgLoadEnd = Date.now();
				}}
			/>
		</div>
		<div class="image-actions">
			<div class="action">
				<label for="format">Format</label>
				<select name="format" id="format" bind:value={format} onchange={loadOgImage}>
					<option value="svg">SVG</option>
					<option value="png">PNG</option>
				</select>
			</div>
			<Button as="a" href={imgSrc} download={`${data.template.id}.${format}`}>Download</Button>
		</div>
		{#if lastImgLoadStart && lastImgLoadEnd && lastImgLoadEnd > lastImgLoadStart}
			<div class="image-load-time">
				<p class="u-text--muted" style="font-size: 0.8rem;">
					Image loaded in <strong>{lastImgLoadEnd - lastImgLoadStart}</strong>ms
				</p>
			</div>
		{/if}
	</Col>
	<Col size={6}>
		<form class="p-form p-form--stacked" method="get" action={imgSrc} oninput={onformchange}>
			{#each Object.values(data.template.schema) as field (field.name)}
				{@const formFieldValue = formData[field.name as keyof typeof formData] as unknown}
				{@const formFieldLabel = caseToTitle(field.name)}
				<div class="p-form__group row">
					<div class="col-1">
						<label for={field.name} style:text-wrap="wrap">{formFieldLabel}</label>
					</div>
					<div class="col-5">
						{#if field.type === 'unknown'}
							<p>{field.name}: Unknown field type</p>
						{/if}
						{#if field.type === 'string'}
							<input type="text" name={field.name} value={formFieldValue} id={field.name} />
						{/if}
						{#if field.type === 'number'}
							<input
								type="number"
								name={field.name}
								value={formFieldValue as number}
								id={field.name}
							/>
						{/if}
						{#if field.type === 'boolean'}
							<input
								type="checkbox"
								name={field.name}
								checked={formFieldValue as boolean}
								id={field.name}
							/>
						{/if}
						{#if field.type === 'date'}
							<input
								type="datetime-local"
								name={field.name}
								value={new Date(formFieldValue as Date).toISOString().slice(0, 16)}
								id={field.name}
							/>
						{/if}
						{#if field.type === 'enum' && field.enum}
							<select name={field.name} id={field.name}>
								{#if !formFieldValue}
									<option value="" selected>Select an option</option>
								{/if}
								{#each field.enum as option (option)}
									<option value={option} selected={(formFieldValue as string) === option}
										>{option}</option
									>
								{/each}
							</select>
						{/if}
					</div>
				</div>
			{/each}
		</form>
	</Col>
</Strip>

<style>
	.image-container {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 0.2rem;
	}

	.image-actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-block-start: 0.5rem;

		.action {
			display: flex;
			align-items: start;
			gap: 0.5rem;
		}
	}

	.image-load-time {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
