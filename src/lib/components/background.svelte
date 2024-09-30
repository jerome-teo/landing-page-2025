<script lang="ts">
	import BottomLeft from '$lib/media/bottom_left.svg';
	import BottomRight from '$lib/media/bottom_right.svg';
	import TopRight from '$lib/media/top_right.svg';
	import TopLeft from '$lib/media/top_left.svg';
	import Right from '$lib/media/right_side.svg';
	import Demo1 from '$lib/media/demo_background_1.svg';
	import Demo2 from '$lib/media/demo_background_2.svg';
	import Demo3 from '$lib/media/demo_background_3.svg';
	import Demo4 from '$lib/media/demo_background_4.svg';
	import Demo5 from '$lib/media/demo_background_5.svg';
	import Demo6 from '$lib/media/demo_background_6.svg';
</script>

<!-- bg-[#491b55] -->
<!-- style="z-index:100;background:#491b55;opacity:0.5;mix-blend-mode:dodge" -->
<div class="w-full h-full">
	<div id="bg-overlay" class="fixed left-0 top-0 w-full h-full" />
	<img src={Demo5} alt="" class="fixed inset-0 w-full h-full object-cover" />
	<!-- <img
		src={BottomLeft}
		alt=""
		class="fixed left-0 bottom-0 z-10 max-w-screen max-h-[70vh] md:max-w-[82vw]"
	/>
	<img src={TopRight} alt="" class="fixed right-0 top-0 max-w-[60vw] md:max-w-[40vw]" />
	<img src={TopLeft} alt="" class="fixed top-0 left-0 max-w-[60vw] md:max-w-[55vw]" /> -->
</div>
