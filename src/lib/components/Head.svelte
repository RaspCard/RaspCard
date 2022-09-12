<script lang="ts">
    import Logo from './Logo.svelte';

    export let establishment: string;
    export let seller: string;
</script>

<div class="logo">
    <Logo/>
    <div>
        <h1>{establishment}</h1>
        <p>{seller}</p>
    </div>
</div>

<style>
    .logo {
        height: 3rem; /* temp 48px then fit-content */

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
    }
</style>