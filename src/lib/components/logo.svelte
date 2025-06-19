<script lang="ts">
	import Logo from '../media/QWERHacks.svg';
</script>

<!-- <div id="logo-parent" class="w-full grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5"> -->
<div id="logo-parent" class="w-full">
	<!-- Added top padding here -->
	<div id="image" class="w-full logo">
		<!-- Added left padding here -->
		<!-- Logo image -->
		<a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md">
			<img src={Logo} alt="QWERHACKS Logo" class=" absolute" />
		</a>
	</div>
</div>

<style>
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

	.date {
		margin-top: -3%;
	}
	/* @media (min-width: 585px) and (max-width: 666px) {
		.logo {
			width: 70%;
			justify-items: center;
			padding-top: 20%;
		}
	}
	@media (min-width: 666px) {
		.logo {
			width: 60%;
			justify-items: left;
		}
	}
	@media (min-width: 768px) {
		.logo {
			width: 80%;
			justify-items: left;
		}
	}
	@media (min-width: 900px) {
		.logo {
			width: 80%;
			justify-items: left;
			padding: 5%;
			position: absolute;
		}
	} */
	@media (max-aspect-ratio: 5/6) {
		.logo {
			width: 100%;
			justify-items: center;
			align-items: center;
			/* margin-top: 5%; */
			padding-top: 7%;
			position: absolute;
		}
	}
	@media (min-aspect-ratio: 5/6) and (max-aspect-ratio: 7/5) {
		.logo {
			width: 40%;
			justify-items: center;
			align-items: center;
			/* margin-top: 5%; */
			padding: 5%;
			position: absolute;
		}
	}
	@media (min-aspect-ratio: 7/5) {
		.logo {
			width: 30%;
			justify-items: left;
			align-items: left;
			/* margin-top: 5%; */
			padding: 5%;
			position: absolute;
		}
	}
</style>
