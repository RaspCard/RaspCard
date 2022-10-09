<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import * as Icon from 'svelte-heros-v2';
    import Head from '$lib/components/Head.svelte';
    
    export let establishment: string;
    export let seller: string;
    export let userPage: boolean = false;
</script>


<div class="m-4 head-container">
    <Head establishment={establishment} seller={seller}/>
    <div class="container-buttons">
        <Button on:click={() => goto("/scanner")} gradient color="blue" class="w-56"><Icon.CreditCard class="mr-2 -ml-1 w-7 h-7"/>Scan</Button>
        {#if userPage}
            <Button on:click={() => goto("/users")} gradient color="blue" class="w-56"><Icon.Users class="mr-2 -ml-1 w-7 h-7"/>Users</Button>
        {/if}
        <Button on:click={() => goto("/dashboard")} gradient color="blue" class="w-56"><Icon.RectangleGroup class="mr-2 -ml-1 w-7 h-7"/>Dashboard</Button>
    </div>
</div>


<style>
    .head-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .container-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 1rem;
    }
</style>