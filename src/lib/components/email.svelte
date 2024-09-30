<script lang="ts">
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

<form
	class="flex flex-row w-full max-w-[40ch] lg:max-w-[50ch] xl:max-w-[65ch] relative justify-between gap-6 md:gap-8"
	on:submit|preventDefault={submitHandler}
>
	{#if error === undefined && !success}
		<div>
			<div>
				<input
					bind:value={text}
					type="email"
					placeholder="Enter your email for updates"
					class="w-full px-5 py-2 leading-tight text-gray-900 border border-gray-500 appearance-none font-reactor7 lg:text-2xl xl:text-4xl focus:shadow-outline"
					style="border-radius:50px"
				/>
			</div>
			<div class="w-full mt-4">
				<label class="flex items-center">
					<input type="checkbox" bind:checked={isChecked} class="mr-2" />
					<span class="text-gray-900 font-reactor7 lg:text-2xl xl:text-4xl"
						>I would like a stipend !</span
					>
				</label>
			</div>
		</div>
		{#if !loading}
			<button
				type="submit"
				id="submit"
				class="px-3 py-3 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
				style="border-radius:100%;aspect-ratio:1/1;background:#ede8d0"
			>
				<img src={Arrow} />
			</button>
		{:else}
			<button
				disabled
				type="submit"
				id="submit"
				class="px-2 py-2"
				style="border-radius:100%;aspect-ratio:1/1;width:50px;height:50px;background:#05034a"
			>
				<Circle2 size="30" colorOuter="#fff" colorCenter="#fff" colorInner="#fff" />
			</button>
		{/if}
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

<style>
	@import url(https://db.onlinewebfonts.com/c/3101d0058e2d7317cd5a5af7a1216ff3?family=Reactor7);
	input::placeholder {
		text-align: center;
		font-family: 'Reactor7', monospace;
	}
	input,
	button {
		background-color: #ede8d0;
		outline: solid 1px grey;
	}
</style>
