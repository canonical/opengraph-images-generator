<script lang="ts">
	import Col from '$lib/components/layout/Col.svelte';
	import Strip from '$lib/components/layout/Strip.svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import { caseToTitle, debounce } from '../../(utils)/index.js';

	const { data } = $props();

	let formData = $state(data.template.example);
	let imgSrc = $state(
		`/opengraph/${data.template.id}?${new URLSearchParams(formData as unknown as Record<string, string>).toString()}`
	);

	const onformchange: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		formData = {
			...formData,
			[(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
		};
		debounce(loadOgImage, 200);
	};

	let lastImgLoadStart = $state<number>();
	let lastImgLoadEnd = $state<number>();
	const loadOgImage = async () => {
		lastImgLoadStart = Date.now();
		imgSrc = `/opengraph/${data.template.id}?${new URLSearchParams(formData as unknown as Record<string, string>).toString()}`;
	};
</script>

<Strip includeCol={false}>
	<Col size={6}>
		<img
			src={imgSrc}
			onload={() => {
				lastImgLoadEnd = Date.now();
			}}
		/>
		<p>
			<a href={imgSrc} download>Download</a>
		</p>
		{#if lastImgLoadStart && lastImgLoadEnd && lastImgLoadEnd > lastImgLoadStart}
			<p class="u-text--muted" style="font-size: 0.8rem;">
				Image loaded in <strong>{lastImgLoadEnd - lastImgLoadStart}</strong>ms
			</p>
		{/if}
	</Col>
	<Col size={6}>
		<form class="p-form p-form--stacked" method="get" action={imgSrc} oninput={onformchange}>
			<div class="p-form__group row">
				{#each Object.values(data.template.schema) as field (field.name)}
					{@const formFieldValue = formData[field.name as keyof typeof formData] as unknown}
					{@const formFieldLabel = caseToTitle(field.name)}
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
				{/each}
			</div>
		</form>
	</Col>
</Strip>
