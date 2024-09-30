<script lang="ts">
	//Postcard portion
	import { onMount } from 'svelte';
	import Alaska from '$lib/media/Alaska.svg';
	import QWER from '$lib/media/qwerhacks_LA.svg';
	import Email from './email.svelte';
	import Back from '$lib/media/postcard_back.svg';
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

	let text: string = '';

	let isChecked: boolean = false;

	let error: string | undefined = undefined;

	let success: boolean = false;

	let loading: boolean = false;

	// +
	// 				new URLSearchParams({
	// 					email: text + 'abcupsertOneStatus'
	// 					// endpoint: 'upsertOneStatus' // Add this line to specify the endp
	// 				})
	async function submitHandler(e: Event) {
		console.log('Submitted');
		loading = true;
		const data = {
			email: text,
			needsTravelStipend: isChecked, // Example boolean
			endpoint: 'upsertOneStatus'
		};
		try {
			// console.log(data);
			const resp = await fetch(
				'https://script.google.com/macros/s/AKfycby7GQNgpbV6-2hf8K33QdrsCdyiIIqYo25dH_fPorpH1e4JLILw6S5JceYaygqnKbqK/exec?',
				{
					method: 'POST',
					body: JSON.stringify(data),
					mode: 'cors',
					credentials: 'include', // include, *same-origin, omit
					redirect: 'follow',
					headers: {
						'Content-Type': 'text/plain;charset=utf-8'
					}
				}
			);

			// const resp = await fetch(
			// 	'https://script.google.com/macros/s/AKfycbxic5DHupAnicOLZxuWe0rJQ5IEq_Osid37nFiwja3GcwTfcXyOurI57rorVrKB5o2U/exec',
			// 	{
			// 		method: 'POST',
			// 		body: JSON.stringify({ email: text, endpoint: 'upsertOneStatus' }),
			// 		mode: 'cors',
			// 		credentials: 'include', // include, *same-origin, omit
			// 		redirect: 'follow',
			// 		headers: {
			// 			'Content-Type': 'text/plain;charset=utf-8'
			// 		}
			// 	}
			// );

			console.log(JSON.stringify(resp));
			console.log('Check');
			if (resp.ok) {
				console.log('SuccA');
				console.log(resp);
				success = true;
				loading = false;
			} else {
				console.log('ErrorB');
				error = await resp.text();
				success = false;
				loading = false;
			}
		} catch (err) {
			// console.log('error33');
			let message = 'Unknown Error';
			if (err instanceof Error) message = err.message;
			error = message;
			success = false;
			loading = false;
		}
		console.log('error3');
		// console.log(JSON.stringify(resp));
		console.error(error);
	}
</script>

<div class="container" on:click={toggleFlip}>
	<div class="card {isLoaded ? 'slide-in' : 'slide-out'} {isFlipped ? 'flipped' : ''}">
		<div class="front">
			<img src={QWER} alt="postcard front" />
		</div>
		<div class="back">
			<img src={Back} alt="postcard back" />
			<form
				class="flex flex-row w-full max-w-[40ch] lg:max-w-[50ch] xl:max-w-[65ch] relative justify-between gap-6 md:gap-8 email-form"
				on:submit|preventDefault={submitHandler}
			>
				{#if error === undefined && !success}
					<div>
						<div>
							<input
								bind:value={text}
								type="email"
								placeholder="Enter your email for updates"
								class="w-full px-5 py-2 leading-tight text-gray-900 border border-gray-500 appearance-none font-reactor7 lg:text-1.5xl xl:text-4xl focus:shadow-outline"
							/>
						</div>
						<div class="w-full mt-4 flex-grow">
							<label class="flex items-center space-x-2">
								<input type="checkbox" bind:checked={isChecked} class="mr-2" />
								<span class="text-gray-900 font-reactor7 flex-grow lg:text-1.5xl xl:text-4xl ml-3">
									I would like a stipend !</span
								>

								{#if !loading}
									<button
										type="submit"
										id="submit"
										class="text-gray-900 font-reactor7 lg:text-1.5xl xl:text-4xl focus:shadow-outline ml-8"
										style="background:#fbf8f2; width: 70px; height: 17px; display: flex; margin-left: 78px; align-items: center; justify-content: center;"
									>
										<!-- <img src={Arrow} /> -->
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
										<!-- <Circle2 size="30" colorOuter="#fff" colorCenter="#fff" colorInner="#fff" /> -->
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
			</form>
		</div>
	</div>
</div>

<style>
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
		width: 350px;
		height: 500px;
		perspective: 800px;
	}

	/* .container:hover > .card {
		cursor: pointer;
		transform: rotateY(180deg);
	} */

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
		border-radius: 2rem;
		box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25);
		position: absolute;
		backface-visibility: hidden;
		overflow: hidden;
	}

	.back {
		background-color: #3a3a3a;
		transform: rotateY(180deg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5rem;
	}

	.email-form {
		position: absolute;
		top: 82%; /* Adjust this value to control vertical position */
		width: 85%; /* Adjust width to fit within the postcard */
		display: flex;
		flex-direction: column;
	}
	@import url(https://db.onlinewebfonts.com/c/3101d0058e2d7317cd5a5af7a1216ff3?family=Reactor7);
	input::placeholder {
		text-align: center;
		font-family: 'Reactor7', monospace;
	}
	input,
	button {
		background-color: #fbf8f2;
		outline: solid 0.5px grey;
	}
</style>
