<!-- SearchableDropdown.svelte -->
<script lang="ts">
	export let options: string[] = [];
	export let value: string = '';
	export let placeholder: string = 'Select an option';
	export let required: boolean = false;
	export let id: string = '';
	export let label: string = '';

	let isOpen = false;
	let searchTerm = '';
	let filteredOptions: string[] = [];

	$: {
		if (searchTerm === '') {
			filteredOptions = options;
		} else {
			filteredOptions = options.filter((option) =>
				option.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
	}

	function selectOption(option: string) {
		value = option;
		searchTerm = option;
		isOpen = false;
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchTerm = target.value;
		isOpen = true;
	}

	function handleBlur() {
		// Delay closing to allow for click events
		setTimeout(() => {
			isOpen = false;
		}, 200);
	}
</script>

<div class="dropdown-container">
	<label class="input-label rubik purple" for={id}>{label}</label>
	<div class="relative">
		<div>
			<input
				type="text"
				{id}
				bind:value={searchTerm}
				on:input={handleInput}
				on:blur={handleBlur}
				on:focus={() => (isOpen = true)}
				class="input-field spectral italic w-full input-underline"
				{placeholder}
				{required}
				autocomplete="off"
			/>
		</div>
		{#if isOpen && filteredOptions.length > 0}
			<div class="dropdown-list">
				{#each filteredOptions as option}
					<div class="dropdown-item" on:mousedown={() => selectOption(option)}>
						{option}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.dropdown-container {
		width: 100%;
		position: relative;
	}
	input::placeholder,
	.spectral {
		text-align: left;
		font-family: 'Spectral', serif;
		font-weight: 400;
		background: #f5ffff;

		/* color: #9ca3a3; */
	}
	.dropdown-list {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		max-height: 200px;
		overflow-y: auto;
		background: #f5ffff;
		border: 1px solid #474580;
		border-radius: 4px;
		z-index: 1000;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		font-family: 'Spectral', serif;
		font-style: italic;
	}

	.dropdown-item {
		padding: 8px 12px;
		cursor: pointer;
		transition: background-color 0.2s;
		font-style: italic;
		font-family: 'Spectral', serif;
	}

	.dropdown-item:hover {
		background-color: #f5ffff;
		font-family: 'Spectral', serif;
		font-style: italic;
	}

	/* Custom scrollbar for the dropdown list */
	.dropdown-list::-webkit-scrollbar {
		width: 6px;
		font-family: 'Spectral', serif;
	}

	.dropdown-list::-webkit-scrollbar-track {
		background: #f5ffff;
		border-radius: 3px;
		font-family: 'Spectral', serif;
		font-style: italic;
	}

	.dropdown-list::-webkit-scrollbar-thumb {
		background: #474580;
		border-radius: 3px;
		font-family: 'Spectral', serif;
		font-style: italic;
	}

	.dropdown-list::-webkit-scrollbar-thumb:hover {
		background: #2e008b;
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
	input.input-field {
		padding-left: 0.25rem;
	}
	.input-underline {
		border: none;
		border-bottom: 1px solid #bdbdbd;
		border-radius: 0;
		box-shadow: none;
	}
	.input-field,
	.dropdown-container input,
	select {
		font-size: 1rem !important;
	}
	.dropdown-list,
	.dropdown-item {
		font-size: 1rem !important;
	}
</style>
