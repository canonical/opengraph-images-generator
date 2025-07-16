<script lang="ts">
	import type { TemplateInput } from '../inputs';

	let { title, date, category, description }: TemplateInput = $props();

	const d = new Date(date);

	function formatTime(date: Date, timeZone: string, hour12 = true) {
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12,
			timeZone
		});
	}

	const month = d.toLocaleString('en-US', { month: 'long' });
	const day = d.getDate();
	const usTime = formatTime(d, 'America/New_York');
	const euTime = formatTime(d, 'Europe/Paris').replace(':', '.');

	const formattedDate = `${month} ${day}, ${usTime} EST | ${euTime} CET`;
</script>

<div id="suru-background" style="display: flex;">
	<img
		src="https://assets.ubuntu.com/v1/d11e6f0f-05_suru2_light_glow_3K.jpg"
		alt=""
		width="1024"
		height="576"
	/>
</div>
<hr id="marker" />
<article>
	<header>
		<img
			src="https://assets.ubuntu.com/v1/d86e845a-Canonical_logo_2023.svg"
			alt="Canonical"
			width="134"
			height="42"
		/>
		<div id="date-category" style="display: flex;">
			{#if category}
				<span class="category">{category}</span>
			{/if}
			<time>{formattedDate}</time>
		</div>
	</header>
	<main>
		<div id="title-description" style="display: flex;">
			<h1>{title}</h1>
			{#if description}
				<p>{description}</p>
			{/if}
		</div>
	</main>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		height: 100%;
		width: 100%;

		padding: 75px 100px;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 75px;
	}

	#date-category {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}

	time {
		color: #666;
	}

	.category {
		font-size: 1.25rem;
		font-weight: 500;
	}

	main {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#title-description {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 0.25rem;
	}

	h1 {
		font-size: 3.3125rem;
		font-weight: 600;
	}

	p {
		font-size: 1.25rem;
		font-weight: 400;
		color: #666;
	}

	#suru-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#marker {
		position: absolute;
		top: 140px;
		left: 0;
		width: 4px;
		height: 158px;
		background-color: #ea5f2d;
	}
</style>
