<script lang="ts">
    import SimpleLogo from "./SimpleLogo.svelte";
    import { Navbar, NavBrand, NavHamburger, NavUl } from "flowbite-svelte";

    export let establishment: string;
    export let seller: string;
    export let fixedButton: boolean = false;
</script>

<Navbar let:hidden let:toggle class="bg-slate-900">
    <NavBrand href="/">
        <div class="mr-2 h-11 w-11 sm:h-11 sm:w-11">
            <SimpleLogo/>
        </div>
        <span class="self-center whitespace-nowrap text-xl font-semibold text-white">RaspCard</span>
    </NavBrand>
    <div class="flex flex-col gap-px">
        <span class="self-center whitespace-nowrap text-lg font-semibold text-white">{establishment}</span>
        <span class="self-center whitespace-nowrap text-lg font-semibold text-white">{seller}</span>
    </div>
    {#if fixedButton}
        <div class="flex">
            <slot name="fixed"/>
        </div>
    {:else}
        <NavHamburger on:click={toggle} />
        <NavUl {hidden}>
            <slot/>
        </NavUl>
    {/if}
</Navbar>