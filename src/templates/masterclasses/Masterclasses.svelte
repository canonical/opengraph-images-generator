<script lang="ts">
	import type { MasterclassesInput } from './schema';

	let { title, date, category, description, avatar }: MasterclassesInput = $props();

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

<div id="suru-background">
	<img
		src="https://assets.ubuntu.com/v1/d11e6f0f-05_suru2_light_glow_3K.jpg"
		alt=""
		width="100%"
		height="100%"
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
		<div id="date-category">
			{#if category}
				<span class="category">{category}</span>
			{/if}
			<time>{formattedDate}</time>
		</div>
	</header>
	<main>
		<div id="title-description">
			<h1>{title}</h1>
			{#if description}
				<p>{description}</p>
			{/if}
		</div>
		{#if avatar}
			<img src={avatar} alt="Avatar" width={160} height={160} class="avatar" />
		{/if}
	</main>
</article>

<style>
	article {
		z-index: 1;
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
		gap: 5px;
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
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	#title-description {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		max-width: 600px;
		text-wrap: balance;
	}

	h1 {
		font-size: 3.3125rem;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: balance;
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
		top: 30%;
		left: 0;
		width: 4px;
		height: 158px;
		background-color: #ea5f2d;
	}

	.avatar {
		border-radius: 100%;
		overflow: hidden;
	}
</style>
