<script lang="ts">
    import { Button, ButtonGroup } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import * as Icon from 'svelte-heros-v2';
    import Head from '$lib/components/Head.svelte';
    
    export let establishment: string;
    export let seller: string;
    export let userPage: boolean = false;
</script>


<div class="m-4 head-container">
    <Head establishment={establishment} seller={seller}/>
    <ButtonGroup class="space-x-px">
        <Button on:click={() => goto("/scanner")} gradient color="blue" class="w-56 text-lg"><Icon.CreditCard class="mr-2 -ml-1 w-7 h-7"/>Scansiona</Button>
        {#if userPage}
            <Button on:click={() => goto("/users")} gradient color="blue" class="w-56 text-lg"><Icon.Users class="mr-2 -ml-1 w-7 h-7"/>Utenti</Button>
        {/if}
        <Button on:click={() => goto("/")} gradient color="blue" class="w-56 text-lg"><Icon.RectangleGroup class="mr-2 -ml-1 w-7 h-7"/>Home</Button>
    </ButtonGroup>
</div>


<style>
    .head-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>