<script>
	import { onMount } from 'svelte';
	import Footer from '../components/footer.svelte';
	import Navbar from '../components/navbar.svelte';
	import '../styles/global.scss';
	onMount(() => {
		import('@material/mwc-icon-button');
		import('@material/mwc-icon');
		import('@material/mwc-button');
		import('@material/mwc-top-app-bar');
		import('@material/mwc-menu');
		import('@material/mwc-list');
	});
</script>

<Navbar />
<slot />
<Footer />
