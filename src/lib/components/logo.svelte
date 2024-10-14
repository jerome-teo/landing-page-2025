<script lang="ts">
	import Logo from '../media/logo.svg';
</script>

<!-- <div id="logo-parent" class="w-full grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5"> -->
<div id="logo-parent" class="w-full top-1/4 scale-50">
	<!-- Added top padding here -->
	<div id="image" class="w-full items-start justify-start pl-4">
		<!-- Added left padding here -->
		<!-- Logo image -->
		<img src={Logo} alt="QWERHACKS Logo" class="w-[100%] max-w-none md:w-[70%] h-auto" />
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap');
	.name {
		display: grid;
		grid-template-areas: 'zero';
		min-height: 0;
		grid-template-columns: 1fr;
		grid-template-columns: 1fr;
		font-size: 5rem;
	}
	.front {
		grid-area: zero;
		z-index: 1000;
	}
	.back {
		-webkit-text-stroke-color: red;
		-webkit-text-stroke-width: 30px;
		grid-area: zero;
		position: relative;
		left: 20px;
		top: 20px;
	}
	span {
		font-family: 'Fredoka', sans-serif;
		font-size: max(3.5vw, 1.4rem);
		color: white;
	}
	.ucla {
		position: relative;
		color: white;
		left: 25%;
		bottom: -12%;
	}
	.date {
		margin-top: -3%;
	}
</style>
