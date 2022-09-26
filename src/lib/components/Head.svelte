<script lang="ts">
    import Logo from './Logo.svelte';
    import { goto } from '$app/navigation';

    export let establishment: string | undefined;
    export let seller: string | undefined;
</script>


<div class="head">
    <div class="logo" on:click={() => goto("/dashboard")}>
        <Logo/>
    </div>
    <div>
        <h1 class="text-base font-bold tracking-tight leading-none text-gray-900">{establishment}</h1>
        <p class="text-base font-normal text-gray-500">{seller}</p>
    </div>
</div>


<style>
    .head {
        height: 3rem; /* temp 48px then fit-content */
        width: 25vw;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
    }

    .logo {
        height: 50px;
        width: 134px;
        flex: none;
    }
</style>