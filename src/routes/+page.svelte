<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	let log: string[] = [];

	const logEvent = (str: string) => {
		log = [...log, str];
	};

	const requestData = async () => {
		const res = await fetch('/api/test');
		const data = await res.json();
		console.log('Data from GET endpoint', data);
		logEvent(`[GET] data received: ${JSON.stringify(data)}`);
	};

	$: if ($page.form) {
		logEvent(`[FORM] repsonse: ${JSON.stringify($page.form)}`);
	}
</script>

<main>
	<h1>SvelteKit with WebTorrent Integration</h1>

	<button on:click={() => requestData()}> Request Data from GET endpoint </button>

	<form method="POST" use:enhance>
		<label for="torrentId">Download from a magnet link: </label>
		<input
			name="torrentId"
			placeholder="magnet:"
			value="magnet:?xt=urn:btih:674D163D2184353CE21F3DE5196B0A6D7C2F9FC2&dn=bbb_sunflower_1080p_60fps_stereo_abl.mp4&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.publicbt.com%3a80%2fannounce&ws=http%3a%2f%2fdistribution.bbb3d.renderfarming.net%2fvideo%2fmp4%2fbbb_sunflower_1080p_60fps_stereo_abl.mp4"
		/>
		<button type="submit">Download</button>
	</form>

	<ul>
		{#each log as event}
			<li>
				<code>{event}</code>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		font-family: sans-serif;
	}
</style>
