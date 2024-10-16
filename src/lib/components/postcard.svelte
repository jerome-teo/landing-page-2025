<script lang="ts">
	//Postcard portion
	// import Textfield from '@smui/textfield';
	import { onMount } from 'svelte';
	import Alaska from '$lib/media/Alaska.svg';
	import QWER from '$lib/media/qwerhacks_LA.svg';
	import PostcardFront from '$lib/media/postcard_front.svg';
	import Back from '$lib/media/postcard back.svg';
	let isFlipped = false;
	let isLoaded = false;
	// Function to toggle the flip state
	function toggleFlip() {
		isFlipped = true;
	}

	onMount(() => {
		setTimeout(() => {
			isLoaded = true;
		}, 300); // Delay to start the animation
	});

	//Email portion
	import Arrow from '$lib/media/arrow.svg';
	import { Circle2, Circle } from 'svelte-loading-spinners';
	import Stamp from '$lib/media/stamp.svg';
	import Updates from '$lib/media/signup_updates.svg';
	let name_participant: string = '';
	let school: string = '';
	let text: string = '';

	let isChecked: boolean = false;

	let error: string | undefined = undefined;

	let success: boolean = false;

	let loading: boolean = false;

	async function submitHandler(e: Event) {
		console.log('Submitted');
		loading = true;
		
		try {
			const resp = await fetch('/api/email', {
				method: 'POST',
				body: JSON.stringify({
					name: name_participant,
					college: school,
					userId: text,
					needsTravelStipend: isChecked,
				}),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (resp.ok) {
				success = true;
				loading = false;
			} else {
				error = await resp.text();
				success = false;
				loading = false;
			}
		} catch (err) {
			let message = 'Unknown Error';
			if (err instanceof Error) message = err.message;
			error = message;
			success = false;
			loading = false;
		}
		console.error(error);
	}
</script>

<div class="container" on:click={toggleFlip}>
	<div class="card {isLoaded ? 'slide-in' : 'slide-out'} {isFlipped ? 'flipped' : ''}">
		<div class="front">
			<img src={PostcardFront} alt="postcard front" />
		</div>
		<div class="back cardback">
			<!-- <img src={Back} alt="postcard back" /> -->
			<div class="postcard">
				<!-- Left side: Address and message -->
				<div class="left">
					<img src={Stamp} class="stamp" alt="stamp" />
					<div class="pad" />
					<div class="welcome tentang-nanti">See you there!</div>
					<div class="address spectral">UCLA, Los Angeles</div>
					<div class="address spectral">CA 90024</div>
				</div>
				<div class="center" />
				<!-- Right side: Sign-up form -->
				<div class="right">
					<img src={Updates} alt="Sign up for Updates!" />
					<form on:submit|preventDefault={submitHandler}>
						{#if error === undefined && !success}
							<div class="input-group">
								<label class="input-label rubik purple" for="fullName">Full Name</label>
								<input
									type="text"
									id="fullName"
									bind:value={name_participant}
									class="input-field spectral italic w-full"
									placeholder="Steve Jobs"
								/>
							</div>

							<div class="input-group">
								<label class="input-label rubik purple" for="university"
									>College or University</label
								>
								<input
									type="text"
									id="university"
									bind:value={school}
									class="input-field spectral italic w-full"
									placeholder="UCLA"
								/>
							</div>

							<div class="input-group">
								<label class="input-label rubik purple" for="email">Email Address</label>
								<input
									type="email"
									id="email"
									bind:value={text}
									class="input-field spectral italic w-full"
									placeholder="steve@apple.com"
								/>
							</div>
							<div class="checkbox-container">
								<input
									type="checkbox"
									bind:checked={isChecked}
									id="stipend"
									name="stipend"
									class="checkbox-input"
								/>
								<label for="stipend" class="checkbox-label">I would like a stipend!</label>
							</div>
							<div style="height: 10px" />
							<div class="w-full flex justify-center items-center">
								{#if !loading}
									<button type="submit" id="submit" class="submit-btn rubik-submit">
										Submit
									</button>
								{:else}
									<button
										disabled
										type="submit"
										id="submit"
										class="px-2 py-2"
										style="background:#fbf8f2"
									/>
								{/if}
							</div>
						{:else if success}
							<div>
								<p class="text-center spectral italic text-grey text-m">
									Thank you! Please keep an eye on your email for more info.
								</p>
							</div>
						{:else}
							<div>
								<p class="text-center spectral italic text-grey text-m ">
									Error encountered. Please reload and try again.
								</p>
							</div>
							<div class="max-h-[7ch] overflow-scroll">Error: {error}</div>
						{/if}
					</form>
				</div>
			</div>
			<!-- <form
				class="flex w-full max-w-[40ch] lg:max-w-[50ch] xl:max-w-[65ch] relative justify-between gap-6 md:gap-8 email-form"
				on:submit|preventDefault={submitHandler}
			>
				{#if error === undefined && !success}
					<div>
						<div>
							<input
								bind:value={text}
								type="email"
								placeholder="Enter your email for updatesC"
								class=" w-2/3 px-5 py-2 leading-tight text-gray-900 border border-gray-500 appearance-none font-serif lg:text-1.5xl xl:text-4xl focus:shadow-outline"
							/>
						</div>
						<div class="w-full mt-4 flex-grow">
							<label class="flex items-center space-x-2">
								<input type="checkbox" bind:checked={isChecked} class="mr-2" />
								<span class="text-gray-900 spectral flex-grow lg:text-1.5xl xl:text-4xl ml-3">
									I would like a stipend UCLA!C</span
								>
								{#if !loading}
									<button type="submit" id="submit" class="submit-btn">
										Send
									</button>
								{:else}
									<button
										disabled
										type="submit"
										id="submit"
										class="px-2 py-2"
										style="background:#fbf8f2"
									>
									</button>
								{/if}
							</label>
						</div>
					</div>
				{:else if success}
					<div>
						<p class="text-center font-reactor7 text-white text-xl lg:text-5xl">
							Thank you! Please keep an eye on your email for more info.
						</p>
					</div>
				{:else}
					<div>
						<p class="text-center font-reactor7 text-white text-xl lg:text-5xl">
							Error encountered. Please reload and try again.
						</p>
					</div>
					<div class="max-h-[7ch] overflow-scroll">Error: {error}</div>
				{/if}
			</form> -->
		</div>
	</div>
</div>

<style>
	@import url(https://db.onlinewebfonts.com/c/3101d0058e2d7317cd5a5af7a1216ff3?family=Reactor7);
	@import url(https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap);
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		height: 100vh;
		overflow: hidden;
		background: linear-gradient(45deg, #061de3, #e306ca);
		font-family: Helvetica, sans-serif;
		color: rgb(211, 211, 211);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		width: 500px;
		height: 354px;
		perspective: 800px;
	}
	.flipped {
		transform: rotateY(180deg);
	}
	.slide-in {
		/* Starting state for sliding in */
		top: 100vh; /* Start off-screen */
		animation: slideIn 1s forwards; /* Optional: using keyframes */
	}

	.card.slide-out {
		top: 100vh; /* Keep it outside the viewport */
	}

	.card {
		height: 100%;
		width: 100%;
		position: relative;
		transition: transform 1500ms ease, top 500ms ease;
		transform-style: preserve-3d;
		top: 100vh;
	}
	@keyframes slideIn {
		from {
			top: 100vh; /* Start off-screen */
		}
		to {
			top: 0%; /* Move to the center */
		}
	}

	.front,
	.back {
		height: 100%;
		width: 100%;
		border-radius: 1rem;
		box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25);
		position: absolute;
		backface-visibility: hidden;
		overflow: hidden;
	}

	.back {
		background-color: #f5ffff;
		transform: rotateY(180deg);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 5rem;
	}
	.cardback {
		display: flex;
		justify-content: space-between;
		padding: 2rem;
		/* background-color: #f9fbfa; */
		/* border-radius: 15px; */
		/* border: 1px solid #e0e0e0; */
	}

	.email-form {
		position: absolute;
		top: 82%; /* Adjust this value to control vertical position */
		width: 85%; /* Adjust width to fit within the postcard */
		display: flex;
		/* flex-direction: column; */
	}
	.stamp {
		height: 25%;
		width: 50%;
	}
	input::placeholder,
	.spectral {
		text-align: left;
		font-family: 'Spectral', serif;
		font-weight: 400;
		color: #9ca3a3;
	}
	.spectral.welcome,
	.spectral.address {
		text-align: left;
		font-family: 'Spectral', serif;
		font-weight: 400;
		color: #000000;
	}
	.italic {
		font-style: italic;
	}

	.left {
		width: 27.5%;
	}
	.center {
		/* width: 10%; */
		width: 0.5px;
		height: 300px; /* The height of the vertical line */
		background-color: rgba(0, 0, 0, 0.3); /* Faint line color */
		margin: 0 20px;
	}
	.right {
		width: 62.5%; /* Ensure both the left and right sides take up equal space */
	}
	input,
	button {
		background-color: #f5ffff;
		outline: solid 0.5px #abb2b2;
	}

	input,
	.welcome {
		border: none; /* Remove all borders */
		border-bottom: 0.5px solid #abb2b2; /* Apply only bottom border */
		padding: 5px; /* Optional: Add padding */
		outline: none;
		font-size: 20px;
	}
	.address {
		border: none; /* Remove all borders */
		border-bottom: 0.5px solid #abb2b2; /* Apply only bottom border */
		padding: 5px; /* Optional: Add padding */
		outline: none;
		font-size: 13px;
	}
	.submit-btn {
		display: inline-block;
		background-color: #3d00b7; /* Purple color */
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 25px; /* Makes the button rounded */
		padding: 0.375rem 1.25rem;
		text-align: center;
		text-transform: uppercase; /* Make the text uppercase */
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.submit-btn:hover {
		background-color: #2a0082; /* Darken the button on hover */
		transform: scale(1.05); /* Slightly increase size on hover */
	}

	.submit-btn:active {
		background-color: #1e005e; /* Darker on click */
		transform: scale(0.98); /* Shrink slightly on click */
	}

	.postcard {
		display: flex;
		justify-content: space-between;
		background-color: #f5ffff;
	}

	@font-face {
		font-family: 'Tentang Nanti';
		src: url('$lib/fonts/TNanti-Demo.otf') format('truetype'); /* Update the path as necessary */
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: 'Rubik';
		src: url('$lib/fonts/Rubik-Mono-One-Regular.ttf.woff') format('truetype'); /* Update the path as necessary */
		font-weight: normal;
		font-style: normal;
	}
	.tentang-nanti {
		font-family: 'Tentang Nanti';
	}
	.rubik {
		font-family: 'Rubik';
		font-size: 15px;
	}
	.rubik-submit {
		font-family: 'Rubik';
		font-size: 12px;
	}
	.rubik.purple {
		color: #474580;
	}
	.input-field {
		font-size: 13px;
	}
	.pad {
		height: 10%;
	}
	.checkbox-container {
		display: flex;
		align-items: center;
		margin-top: 20px;
	}

	.checkbox-input {
		appearance: none; /* Removes default checkbox styling */
		width: 13px;
		height: 13px;
		border: 2px solid #474580; /* Custom border color */
		border-radius: 4px;
		position: relative;
		cursor: pointer;
		transition: background-color 0.2s ease, border-color 0.2s ease;
	}

	.checkbox-input:checked {
		background-color: #474580;
		border-color: #474580;
	}

	.checkbox-input:checked::before {
		content: '✔';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -59%);
		font-size: 14px;
		color: white;
	}

	.checkbox-label {
		margin-left: 10px;
		font-size: 10px;
		color: #535a5a;
		cursor: pointer; /* Makes the label clickable */
		font-family: 'Spectral', serif;
	}

	.checkbox-input:focus {
		outline: 2px solid #474580;
		outline-offset: 2px;
	}

	.checkbox-input:hover {
		border-color: #2e008b; /* Darker shade on hover */
	}
</style>
