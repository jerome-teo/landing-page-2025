<script lang="ts">
	import FrontClouds from '$lib/media/front_clouds.svg';
	import MiddleClouds from '$lib/media/middle_clouds.svg';
	import BackClouds from '$lib/media/back_clouds.svg';

	import Skyscrapers from '$lib/media/skyscrapers.svg';
	import Shadows from '$lib/media/shadows.svg';
</script>

<div class="w-full h-full">
	<div
		id="bg-overlay"
		class="fixed left-0 top-0 w-full h-full"
		style="z-index:0;background: linear-gradient(180deg, #6ad4ff 0%, #e27272 48%);mix-blend-mode:multiply"
	/>
	<div class="skyline">
		<img src={FrontClouds} alt="clouds" class="cloud cloudA relative group1 w-full" />
		<img src={FrontClouds} alt="clouds" class="cloud cloudA  relative group2 w-full" />
		<img src={MiddleClouds} alt="clouds" class="cloud cloudB group1 w-11/12" />
		<img src={MiddleClouds} alt="clouds" class="cloud cloudB group2 w-11/12" />
		<img src={BackClouds} alt="clouds" class="cloud cloudC group1 w-full" />
		<img src={BackClouds} alt="clouds" class="cloud cloudC  group2 w-full" />
	</div>
	<div>
		<img
			src={Shadows}
			alt="shadows"
			class="bottom-0 fixed w-11/12 right-[1.5vw]"
			style="z-index:40"
		/>
		<img
			src={Skyscrapers}
			alt="buildings"
			class="bottom-0 fixed w-10/12 right-0"
			style="z-index:50"
		/>
	</div>
</div>

<style>
	html,
	body {
		height: 100%;
		margin: 0;
		overflow: hidden; /* Prevents scroll */
	}

	.fullscreen-gradient {
		height: 100vh; /* 100% of the viewport height */
		width: 100vw; /* 100% of the viewport width */
		background: linear-gradient(180deg, #6ad4ff 0%, #e27272 48%);
	}
	.skyline {
		margin: 0;
	}
	.cloud {
		position: fixed;
		overflow-x: hidden;
	}
	.cloudA {
		animation: moveClouds 70s linear infinite;
		z-index: 75;
		width: 100%;
		height: auto;
		padding-top: 0%;
	}
	.cloudB {
		top: 5%; /* Adjust as needed */
		animation: moveClouds 100s linear infinite;
		z-index: 45;
		width: 90%;
		height: auto;
		padding-right: 20%;
		padding-top: 10%;
	}

	.cloudC {
		top: 5%; /* Adjust as needed */
		animation: moveClouds 130s linear infinite;
		left: 30%;
		z-index: 25;
		width: 15%;
		height: auto;
		padding-top: 10%;
		/* transform: scale(0.1); */
	}
	.group1 {
		right: 0%;
		animation-delay: 0s;
	}
	.group2 {
		right: 100%;
		animation-delay: 0s;
	}
	@keyframes moveClouds {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(100vw); /* Move clouds far left outside the screen */
		}
	}
</style>
