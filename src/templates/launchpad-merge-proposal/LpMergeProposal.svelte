<script lang="ts">
	import pluralize from 'pluralize';
	import commentsIcon from './assets/comment-icon.svg';
	import filesIcon from './assets/files-icon.svg';
	import type { LpMergeProposalInput } from './schema';

	let {
		project,
		gitRepository,
		title,
		mergeId,
		filesCount,
		commentsCount,
		createdAt,
		authorName,
		mergeStatus,
		avatar
	}: LpMergeProposalInput = $props();

	const formatTime = (date: Date) =>
		date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});

	const formattedNumber = (number: number) =>
		number.toLocaleString('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});

	const truncate = (text: string, length: number) =>
		text.length > length ? text.slice(0, length) + '…' : text;

	const getStatusColor = (status: LpMergeProposalInput['mergeStatus']) => {
		switch (status) {
			case 'in-review':
				return '#EA5F2D';
			case 'merged':
				return '#008000';
		}
	};
</script>

<article style="background-color: #f5f5f5;">
	<div class="container">
		<main>
			<p class="project-info">~{project}/{gitRepository}</p>
			<div class="title-avatar">
				<div class="title">
					<div class="merge-id-status">
						<span class="merge-id"># {mergeId}</span>
						<span class="status" style:background-color={getStatusColor(mergeStatus)}
							>{mergeStatus}</span
						>
					</div>
					<h1>
						{truncate(title, 100)}
					</h1>
				</div>
			</div>
			<div class="mp-stats">
				<div class="icon-label-stat">
					<img src={commentsIcon} width={25} height={25} alt="Comments" />
					<span>
						{formattedNumber(commentsCount)}
						{pluralize('comment', commentsCount)}
					</span>
				</div>
				<div class="icon-label-stat">
					<img src={filesIcon} width={25} height={25} alt="Files" />
					<span>
						{formattedNumber(filesCount)}
						{pluralize('file', filesCount)}
					</span>
				</div>
			</div>
		</main>
		<div class="image-avatar">
			{#if avatar}
				<img src={avatar} alt="Avatar" width={160} height={160} class="avatar" />
			{/if}
		</div>
	</div>

	<footer>
		<div class="metadata">
			<div class="user">
				{#if avatar}
					<img src={avatar} alt="Avatar" width={45} height={45} class="avatar" />
				{/if}
				<span class="author-name">{authorName}</span>
			</div>
			<span>•</span>
			<div class="created-at">
				{formatTime(createdAt)}
			</div>
		</div>
		<div class="launchpad-logo">
			<img
				src="https://assets.ubuntu.com/v1/d15d89a9-Canonical%2520Launchpad%2520logo.svg"
				alt="Launchpad"
				height={37}
			/>
		</div>
	</footer>
</article>

<style>
	article {
		width: 100%;
		height: 100%;
		padding: 85px 70px;
		display: flex;
		flex-direction: column;
		gap: 50px;
	}

	.container {
		gap: 50px;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 40px;
		flex: 1;
	}

	.project-info {
		font-size: 25px;
		font-weight: 550;
		color: #666;
	}

	.title {
		gap: 2px;
		flex-direction: column;
		min-height: 150px;
		h1 {
			text-wrap: balance;
			font-size: 46px;
			margin: 0;
		}
	}
	.merge-id-status {
		color: #666;
		flex-direction: row;
		gap: 20px;
		font-size: 32px;

		.merge-id {
			color: #666;
		}

		.status {
			font-size: 25px;
			color: #fff;
			padding: 5px 10px;
			border-radius: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.mp-stats {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 35px;
		font-size: 25px;
	}
	.icon-label-stat {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #666;
		gap: 5px;
	}
	.image-avatar {
		display: flex;
		width: 160px;
	}

	.avatar {
		border-radius: 100%;
		overflow: hidden;
	}

	footer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.metadata {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 5px;
		}
		.launchpad-logo {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 5px;
		.author-name {
			font-weight: 500;
		}
	}
	.created-at {
		color: #666;
	}
</style>
