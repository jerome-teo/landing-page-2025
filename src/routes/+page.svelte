<script lang="ts">
	import Background from '$lib/components/background.svelte';
	import Hero from '$lib/components/hero.svelte';
	import Logo from '$lib/components/logo.svelte';
	import Postcard from '$lib/components/postcard.svelte';
</script>

<div class="w-full h-full overflow-hidden overscroll-contain">
	<a
		id="mlh-trust-badge"
		style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000"
		href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=yellow"
		target="_blank"
		><img
			src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-yellow.svg"
			alt="Major League Hacking 2024 Hackathon Season"
			style="width:100%"
		/></a
	>
	<div id="background" class="absolute w-full h-full -z-10">
		<Background />
	</div>
	<div class="w-full max-w-none md:w-[70%] h-1/5 items-start justify-start flex-col p-4 md:p-0">
		<Logo />
	</div>
	<div id="content" class="z-10 flex flex-col items-center justify-center w-screen h-screen">
		<Postcard />
	</div>
</div>

<svelte:head>
	<link rel="preload" href="/fonts/NightyDEMO.woff2" as="font" type="font/woff2" crossorigin />
	<link
		rel="preload"
		href="/fonts/RanilleNormal-Regular.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link rel="preload" href="/fonts/Reactor7.woff2" as="font" type="font/woff2" crossorigin />
</svelte:head>

<style>
	.c {
		mix-blend-mode: screen;
	}
</style>
