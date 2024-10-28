<script lang="ts">
	import Background from '$lib/components/background.svelte';
	import Hero from '$lib/components/hero.svelte';
	import Logo from '$lib/components/logo.svelte';
	import Postcard from '$lib/components/postcard.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		if (typeof window !== 'undefined') {
			document.body.style.overflow = 'hidden';
			document.addEventListener(
				'touchmove',
				(e) => {
					e.preventDefault();
				},
				{ passive: false }
			);
		} // Delay to start the animation
	});
</script>

<div class="w-full h-full overflow-hidden overscroll-contain">
	<a
		id="mlh-trust-badge"
		style="display:block;max-width:100px;min-width:60px;position:fixed;right:5%;top:0;width:10%;z-index:10000"
		href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=yellow"
		target="_blank"
		><img
			src="https://images.squarespace-cdn.com/content/v1/65b741a25c094207b27f1ddb/2ddcbe17-62cb-4bd0-8573-cf1b6c0b1d35/image-removebg-preview+%282%29.png"
			alt="Major League Hacking 2024 Hackathon Season"
			style="width:100%"
		/></a
	>
	<div id="background" class="absolute w-full h-full -z-10">
		<Background />
	</div>
	<div class="w-full max-w-none h-1/5 place-items-start grid">
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
