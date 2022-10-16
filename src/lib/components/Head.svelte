<script lang="ts">
    import Logo from './Logo.svelte';
    import { goto } from '$app/navigation';

    export let establishment: string;
    export let seller: string;
</script>


<div class="head">
    <div class="logo" on:click={() => goto("/")}>
        <Logo/>
    </div>
    <div class="p-1">
        <h1 class="text-base font-bold tracking-tight leading-none text-gray-700">{establishment}</h1>
        <p class="text-base text-gray-500">{seller}</p>
    </div>
</div>


<style>
    .head {
        height: 3rem; /* temp 48px then fit-content */
        width: 25vw;
        max-width: 15rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0;
    }

    .logo {
        height: 50px;
        width: 134px;
        flex: none;
    }
</style>