<script lang="ts">
    import { P, Button } from 'flowbite-svelte';
    import Logo from '$lib/components/Logo.svelte';
    import * as Icon from 'svelte-heros-v2';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    
    export let data: PageData;
    const { currentAdmin } = data;
</script>

<div class="container-raspcard b-d">
    <Logo class="max-w-6xl"/>
    <P size="xl" height="normal" class="max-w-lg text-slate-700" weight="semibold" align="center" space="normal" opacity={69} italic>
        RaspCard an hackable fidelty card system
    </P>
    {#if currentAdmin}
        <Button gradient class="w-56" on:click={() => (goto("/dashboard"))}><Icon.RectangleGroup class="mr-2 -ml-1 w-7 h-7"/>Dashboard</Button>
    {:else}
        <Button gradient class="w-56" on:click={() => (goto("/login"))}><Icon.ArrowRightOnRectangle class="mr-2 -ml-1 w-7 h-7"/>Login</Button>
    {/if}
</div>

<style>
    .container-raspcard {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }
</style>