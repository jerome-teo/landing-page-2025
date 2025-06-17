<script lang="ts">
	//Postcard portion
	// import Textfield from '@smui/textfield';
	import { onMount } from 'svelte';
	import Alaska from '$lib/media/Alaska.svg';
	import QWER from '$lib/media/qwerhacks_LA.svg';
	import PostcardFront from '$lib/media/postcard_front.svg';
	import Back from '$lib/media/postcard back.svg';
	import Standout from '$lib/media/stand-out-stickers-logo.png';
	import SearchableDropdown from './SearchableDropdown.svelte';
	import schoolsCsv from '$lib/media/schools.csv?raw';
	import countriesCsv from '$lib/media/slim-2.csv?raw';
	// import { SCRIPTS_API } from '$env/static/private';

	let isFlipped = false;
	let isLoaded = false;
	// Function to toggle the flip state
	function toggleFlip() {
		isFlipped = true;
	}

	onMount(() => {
		setTimeout(() => {
			isLoaded = true;
		}, 300);
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', toggleFlip);
		} // Delay to start the animation
		return () => {
			// Clean up the event listener when the component is destroyed
			if (typeof window !== 'undefined') {
				window.removeEventListener('keydown', toggleFlip);
			}
		};
	});
	// window.addEventListener('keydown', toggleFlip);
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
	let datetime: string = '';

	// New form fields
	let firstName: string = '';
	let lastName: string = '';
	let age: string = '';
	let phoneNumber: string = '';
	let levelOfStudy: string = '';
	let countryOfResidence: string = '';
	let linkedinUrl: string = '';

	// Age options
	const ageOptions = Array.from({ length: 83 }, (_, i) => (i + 18).toString()); // Ages 13-95

	// Level of Study options
	const studyLevels = [
		'Less than Secondary / High School',
		'Secondary / High School',
		'Undergraduate University (2 year - community college or similar)',
		'Undergraduate University (3+ year)',
		'Graduate University (Masters, Professional, Doctoral, etc)',
		'Code School / Bootcamp',
		'Other Vocational / Trade Program or Apprenticeship',
		'Post Doctorate',
		'Other',
		"I'm not currently a student",
		'Prefer not to answer'
	];

	// Countries list (abbreviated for example - you should use the full ISO 3166 list)
	// const countries = [
	// 	'United States',
	// 	'Canada',
	// 	'Mexico'
	// 	// Add more countries here
	// ];

	const names = [
		'Chappell Roan',
		'Elton John',
		'Lady Gaga',
		'RuPaul',
		'Neil Patrick Harris',
		'Jodie Foster',
		'Anderson Cooper',
		'Laverne Cox',
		'Frank Ocean',
		'Kate McKinnon',
		'Sara Ramirez',
		'Sam Smith',
		'Kim Petras',
		'Hayley Kiyoko',
		'Elliot Page',
		'Troye Sivan',
		'Lil Nas X',
		'Miley Cyrus',
		'Conrad Ricamora',
		'Viola Davis',
		'Ennis Del Mar',
		'Jack Twist',
		'Gus Fring',
		'Denise Cloyd',
		'Tara Chambler',
		'Annalise Keating'
	];
	const fictionalEmails = [
		'chappell@roan.com',
		'elton@john.com',
		'lady@gaga.com',
		'rupaul@charles.com',
		'neil@harris.com',
		'jodie@foster.com',
		'anderson@cooper.com',
		'laverne@cox.com',
		'frank@ocean.com',
		'kate@mckinnon.com',
		'sara@ramirez.com',
		'sam@smith.com',
		'kim@petras.com',
		'hayley@kiyoko.com',
		'elliot@page.com',
		'troye@sivan.com',
		'lilnasx@montero.com',
		'miley@cyrus.com',
		'conrad@ricamora.com',
		'viola@davis.com',
		'hanya@alittlelife.com',
		'fabfive@queereye.com',
		'alice@thecolorpurple.com',
		'garrard@boyerased.com',
		'carmen@herbodyandotherparties.com',
		'madeline@thesongofachilles.com',
		'elizabeth@withthefireonhigh.com',
		'gus&max@lospolloshermanos.com',
		'ennis&jack@brokeback.com'
	];

	function getRandomName() {
		return names[Math.floor(Math.random() * names.length)];
	}
	function getRandomEmail() {
		return fictionalEmails[Math.floor(Math.random() * names.length)];
	}

	// Step 3: Reactive variable to hold the random name
	let placeholderName = getRandomName();
	let placeholderEmail = getRandomEmail();

	let schools: string[] = [];
	let countries: string[] = [];

	onMount(() => {
		try {
			// Parse schools CSV
			schools = schoolsCsv
				.split('\n')
				.slice(1) // Skip header row
				.map((line) => line.split(',')[0].trim()) // Get first column and trim
				.filter((school) => school); // Remove empty lines

			// Parse countries CSV
			countries = countriesCsv
				.split('\n')
				.slice(1) // Skip header row
				.map((line) => line.split(',')[0].trim()) // Get country name
				.filter((country) => country); // Remove empty lines
		} catch (error) {
			console.error('Error loading data:', error);
			schools = [];
			countries = [];
		}
	});

	async function submitHandler(e: Event) {
		loading = true;
		error = undefined;
		success = false;

		const payload = {
			firstName: firstName,
			lastName: lastName,
			age: age,
			phoneNumber: phoneNumber,
			college: school,
			userId: text,
			levelOfStudy: levelOfStudy,
			countryOfResidence: countryOfResidence,
			linkedinUrl: linkedinUrl
		};

		console.log('📦 Sending to API:', payload);
		console.log('📦 Sending payload:', JSON.stringify(payload));

		try {
			const resp = await fetch('/api/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});
			console.log('🔄 server said:', await resp.clone().json());

			const contentType = resp.headers.get('Content-Type');

			let serverResponse: any;
			if (contentType && contentType.includes('application/json')) {
				serverResponse = await resp.json();
			} else {
				serverResponse = { error: await resp.clone().text() };
			}

			console.log('📬 Response from server:', serverResponse);

			if (resp.ok) {
				success = true;
			} else {
				error = serverResponse.error || 'Unknown error';
			}
		} catch (err) {
			console.error('💥 Network or parsing error:', err);
			error = err instanceof Error ? err.message : 'Unknown error';
		} finally {
			loading = false;
		}
	}
	// Apply now
	function openApplicationForm() {
		window.open('https://tinyurl.com/qwerhacks25', '_blank');
	}
</script>

<div class="container sm: -mt-96" on:click={toggleFlip} on:keydown={toggleFlip}>
	{#if true}
		<div class="card {isLoaded ? 'slide-in' : 'slide-out'} {isFlipped ? 'flipped' : ''}">
			<div
				class="front"
				aria-label="front of postcard. click or press on any key to flip card to the back!"
			>
				<img src={PostcardFront} alt="postcard front " />
				<div class="overlay-text tentang-nanti">Applications out now! Click me!</div>
			</div>
			<div
				class="back cardback"
				aria-label="back of postcard. fill in your information here to register."
			>
				<!-- <img src={Back} alt="postcard back" /> -->
				<div class="postcard">
					<!-- Left side: Address and message -->
					<div class="left">
						<img src={Stamp} class="stamp relative" alt="stamp" />
						<div class="pad" />
						<div class="welcome input-field tentang-nanti">RSVP here for more updates!</div>
						<div class="address spectral">Date: TBD</div>
						<div class="address spectral">Addr: UCLA, CA 90024</div>
					</div>
					<div class="center" />
					<!-- Right side: Sign-up form -->
					<div class="right">
						<!-- <img
							src={Updates}
							alt="Sign up for Updates!"
							class="updates"
							style="visibility: hidden;"
						/> -->
						<form on:submit|preventDefault={submitHandler}>
							{#if error === undefined && !success}
								<div class="input-group flex-col flex">
									<label class="input-label rubik purple">RSVP Form</label>
									<!-- <a class="spectral italic w-full" href="https://tinyurl.com/qwerhacks25"
										>Apply at this link!</a
									> -->
								</div>
								<div class="input-group flex-col flex">
									<label class="input-label rubik purple" for="firstName">First Name</label>
									<input
										aria-label="first name"
										type="text"
										id="firstName"
										bind:value={firstName}
										class="input-field spectral italic w-full"
										placeholder="First Name"
										required
									/>
								</div>

								<div class="input-group flex-col flex">
									<label class="input-label rubik purple" for="lastName">Last Name</label>
									<input
										aria-label="last name"
										type="text"
										id="lastName"
										bind:value={lastName}
										class="input-field spectral italic w-full"
										placeholder="Last Name"
										required
									/>
								</div>

								<div class="input-group flex-col flex">
									<SearchableDropdown
										options={ageOptions}
										bind:value={age}
										placeholder="Select Age"
										required={true}
										id="age"
										label="Age"
									/>
								</div>

								<div class="input-group flex-col flex">
									<label class="input-label rubik purple" for="phoneNumber">Phone Number</label>
									<input
										aria-label="phone number"
										type="tel"
										id="phoneNumber"
										bind:value={phoneNumber}
										class="input-field spectral italic w-full"
										placeholder="(123) 456-7890"
										required
									/>
								</div>

								<div class="input-group flex-col flex">
									<label class="input-label rubik purple" for="email">Email Address</label>
									<input
										aria-label="email"
										type="email"
										id="email"
										bind:value={text}
										class="input-field spectral italic w-full"
										placeholder={placeholderEmail}
										required
									/>
								</div>

								<div class="input-group flex-col flex">
									<SearchableDropdown
										options={schools}
										bind:value={school}
										placeholder="Select your school"
										required={true}
										id="school"
										label="School"
									/>
								</div>

								<div class="input-group flex-col flex">
									<SearchableDropdown
										options={studyLevels}
										bind:value={levelOfStudy}
										placeholder="Select Level of Study"
										required={true}
										id="levelOfStudy"
										label="Level of Study"
									/>
								</div>

								<div class="input-group flex-col flex">
									<SearchableDropdown
										options={countries}
										bind:value={countryOfResidence}
										placeholder="Select your country"
										required={true}
										id="countryOfResidence"
										label="Country of Residence"
									/>
								</div>

								<div class="input-group flex-col flex">
									<label class="input-label rubik purple" for="linkedinUrl">LinkedIn URL</label>
									<input
										aria-label="linkedin url"
										type="url"
										id="linkedinUrl"
										bind:value={linkedinUrl}
										class="input-field spectral italic w-full"
										placeholder="https://linkedin.com/in/yourprofile"
										required
									/>
								</div>

								<!-- <div class="checkbox-container">
									<input
										aria-label="checkbox for travel stipend"
										type="checkbox"
										bind:checked={isChecked}
										id="stipend"
										name="stipend"
										class="checkbox-input"
									/>
									<label for="stipend" class="checkbox-label"
										>I need assistance with traveling from outside of Los Angeles.</label
									>
								</div> -->

								<!-- <div style="height: 10px" /> -->
								<div class="w-full flex-col flex justify-center items-center">
									{#if !loading}
										<!-- <label class="input-label rubik purple" for="fullName">Application Form</label> -->
										<button
											aria-label="submit"
											id="submit"
											class="submit-btn rubik-submit"
											style="margin-top: 20%;"
										>
											Submit
										</button>
										<!-- <label
											class="input-label rubik purple"
											for="fullName"
											style=" padding-top: 20px;">Sponsors</label
										>
										<img
											src={Standout}
											alt="standout logo "
											style="max-width: 70%; height: auto; display: block;"
										/> -->
									{:else}
										<button
											disabled
											type="submit"
											id="submit"
											class="px-2 py-2"
											style="background:#fbf8f2"
										/>
										<div class="lds-ripple">
											<div />
											<div />
										</div>
									{/if}
								</div>
							{:else if success}
								<div>
									<p class="text-center spectral italic text-grey text-m">
										Thank you! Please keep an eye on your email for more info. For any other
										concerns, please contact qwerhacks@gmail.com.
									</p>
								</div>
							{:else}
								<div>
									<p class="text-center spectral italic text-grey text-m">
										Error encountered. Please reload and try again. For any other concerns, please
										contact qwerhacks@gmail.com.
									</p>
								</div>
								<div class="max-h-[7ch] overflow-scroll">Error: {error}</div>
							{/if}
						</form>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p class="text-center spectral italic text-white text-[2.5vw]">
			Our server is currently experiencing difficulties. We seek your understanding and patience as
			we fix the issues. Kindly visit our page again later. We apologize for any inconvenience
			caused.
		</p>
	{/if}
</div>

<style>
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
		/* width: 60%; */
		/* max-width: 500px; */
		height: auto;
		aspect-ratio: 500/354;
		/* min-height: auto; */
		perspective: 800px;
	}

	@media (max-width: 400px) {
		/* Target small screens like phones */
		.container {
			width: 90%;
			margin-top: -50%;
		}
		.overlay-text {
			font-size: 12px;
		}
		.rubik {
			font-size: 7px;
		}
		.input-field {
			font-size: 9px;
		}
		.address {
			font-size: 6px;
		}
		.rubik-submit {
			font-size: 6px;
		}
		.checkbox-label {
			font-size: 6px;
		}
	}
	@media (min-width: 400px) {
		/* Target small screens like phones */
		.container {
			margin-top: -30%;
			width: 80%;
		}
		.overlay-text {
			font-size: 17px;
		}
		.rubik {
			font-size: 8px;
		}
		.input-field {
			font-size: 10px;
		}
		.address {
			font-size: 7px;
		}
		.rubik-submit {
			font-size: 6px;
		}
		.checkbox-label {
			font-size: 7px;
		}
	}
	@media (min-width: 500px) {
		/* Target small screens like phones */
		.container {
			margin-top: -10%;
			width: 70%;
		}
		.overlay-text {
			font-size: 22px;
		}
		.rubik {
			font-size: 8px;
		}
		.rubik-submit {
			font-size: 8px;
		}
		.input-field {
			font-size: 13px;
		}
		.checkbox-label {
			font-size: 8px;
		}
	}
	@media (min-width: 585px) {
		.container {
			margin-top: -2%; /* Adjust for large screens */
			width: 68%; /* Narrower width */
		}
		.overlay-text {
			font-size: 26px;
		}
		.rubik {
			font-size: 10px;
		}
		.address {
			font-size: 9px;
		}
		.checkbox-label {
			font-size: 10px;
		}
	}
	@media (min-width: 768px) {
		.container {
			margin-top: -6%; /* Adjust for large screens */
			width: 60%; /* Narrower width */
		}
		.overlay-text {
			font-size: 26px;
		}
		.rubik-submit {
			font-size: 12px;
		}
		.rubik {
			font-size: 11px;
		}
		.checkbox-label {
			font-size: 10px;
		}
	}
	/* Extra-large screens (min-width: 1200px) */
	@media (min-width: 900px) {
		.container {
			margin-top: 3%; /* Adjust for extra-large screens */
			width: 45%; /* Narrow width for big screens */
		}
		.overlay-text {
			font-size: 27px;
		}
		.rubik-submit {
			font-size: 12px;
		}
		.rubik {
			font-size: 15px;
		}
		.checkbox-label {
			font-size: 10px;
		}
	}
	@media (min-width: 1200px) {
		.container {
			margin-top: 3%; /* Adjust for extra-large screens */
			width: 45%; /* Narrow width for big screens */
		}
		.overlay-text {
			font-size: 27px;
		}
		.rubik-submit {
			font-size: 14px;
		}
		.rubik {
			font-size: 15px;
		}
		.checkbox-label {
			font-size: 12px;
		}
	}
	@media (min-width: 1500px) {
		.container {
			margin-top: 3%; /* Adjust for extra-large screens */
			width: 45%; /* Narrow width for big screens */
		}
		.overlay-text {
			font-size: 27px;
		}
		.rubik-submit {
			margin-top: 10px;
			font-size: 16px;
		}
		.rubik {
			font-size: 17px;
		}
		.checkbox-label {
			font-size: 13px;
		}
	}
	@media (min-width: 1800px) {
		.container {
			margin-top: 3%; /* Adjust for extra-large screens */
			width: 45%; /* Narrow width for big screens */
		}
		.overlay-text {
			font-size: 27px;
		}
		.rubik-submit {
			margin-top: 20px;
			font-size: 18px;
		}
		.rubik {
			font-size: 23px;
		}
		.checkbox-label {
			font-size: 15px;
		}
	}
	/* .container {
		width: 90vw;
		height: 
		max-width: 500px;
		max-height: 354px;
		perspective: 800px;
	} */
	@media (min-aspect-ratio: 5/7) and (max-aspect-ratio: 7/5) {
		.container {
			width: 70vw; /* Adjust for squarer screens */
			height: auto;
		}
		.rubik-submit {
			margin-top: 20px;
			font-size: 1.5vw;
		}
		.rubik {
			font-size: 1.6vw;
		}
		.checkbox-label {
			font-size: 1.3vw;
		}
		.input-field {
			font-size: 1.5vw;
		}
		.address {
			font-size: 1.4vw;
		}
	}

	.front {
		position: relative;
		width: 100%;
		padding-bottom: 70.8%;
	}

	.front img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
	}
	.overlay-text {
		position: absolute;
		top: 6%; /* Adjust to your needs */
		right: 2%; /* Adjust to your needs */
		/* background-color: rgba(0, 0, 0, 0.6); Optional: to make the text stand out */
		color: black;
		padding: 5px 10px;
		/* font-size: 29px; */
		border-radius: 5px;
		rotate: 10deg;
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
			top: -25%; /* Move to the center */
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
		/* color: #9ca3a3; */
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
		height: auto; /* The height of the vertical line */
		background-color: rgba(0, 0, 0, 0.3); /* Faint line color */
		margin: 0 20px;
	}
	.right {
		width: 62.5%;
		height: 100%; /* Ensure both the left and right sides take up equal space */
		overflow-y: auto; /* Enable vertical scrolling */
		max-height: 100%; /* Ensure it doesn't exceed the container height */
		padding-right: 10px; /* Add some padding for the scrollbar */
	}

	/* Add custom scrollbar styling */
	.right::-webkit-scrollbar {
		width: 6px;
	}

	.right::-webkit-scrollbar-track {
		background: #f5ffff;
		border-radius: 3px;
	}

	.right::-webkit-scrollbar-thumb {
		background: #474580;
		border-radius: 3px;
	}

	.right::-webkit-scrollbar-thumb:hover {
		background: #2e008b;
	}

	/* Ensure form takes full width */
	.right form {
		width: 100%;
	}

	/* Add some spacing between form elements */
	.input-group {
		margin-bottom: 15px;
	}

	/* Adjust the submit button container to stay at bottom */
	.right .w-full.flex-col.flex.justify-center.items-center {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	input,
	button {
		background-color: #f5ffff;
		outline: solid 0.5px #abb2b2;
	}
	input {
		/* The input will always be 50% of the viewport width */
		padding: 1vw; /* Padding adjusts based on viewport width */
		/* font-size: 0vw; */
	}
	input,
	.welcome {
		border: none; /* Remove all borders */
		border-bottom: 0.5px solid #abb2b2; /* Apply only bottom border */
		padding: 5px; /* Optional: Add padding */
		outline: none;
		/* font-size: 20px; */
	}
	.address {
		border: none; /* Remove all borders */
		border-bottom: 0.5px solid #abb2b2; /* Apply only bottom border */
		padding: 5px; /* Optional: Add padding */
		outline: none;
		/* font-size: 13px; */
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
		height: 95%;
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
		/* font-size: 15px; */
	}
	.rubik-submit {
		font-family: 'Rubik';
		/* font-size: 12px; */
	}
	.rubik.purple {
		color: #474580;
	}
	/* .input-field {
		font-size: 13px;
	} */
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

	/* loading spinner */

	.lds-ripple,
	.lds-ripple div {
		box-sizing: border-box;
	}
	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid #3d00b7;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 0;
		}
		4.9% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 0;
		}
		5% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 1;
		}
		100% {
			top: 0;
			left: 0;
			width: 80px;
			height: 80px;
			opacity: 0;
		}
	}
</style>
