<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		(document.querySelector('#profileMenu') as any).open = false;
	});
	const openMenu = () => {
		(document.querySelector('#profileMenu') as any).open = !(
			document.querySelector('#profileMenu') as any
		).open;
	};
</script>

<mwc-top-app-bar style="display: flex; flex-direction: row;">
	<img
		style="margin-left: 20vw"
		class="sniper-profile"
		slot="navigationIcon"
		src="/assets/sniper-profile.png"
		alt="Sniper profile"
	/>

	<div slot="title">Sniper</div>
	<div class="">
		<mwc-icon-button
			on:click={openMenu}
			class="profile-button"
			slot="actionItems"
			icon="person"
			style="padding-right: 20vw;"
			id="profileButton"
		/>
		<mwc-menu id="profileMenu">
			<mwc-list-item><span style="color: #fff">Log Out</span></mwc-list-item>
		</mwc-menu>
	</div>
</mwc-top-app-bar>

<style lang="scss">
	.sniper-profile {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}
	.profile-button {
		--mdc-icon-size: 40px;
	}
</style>
