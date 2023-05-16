<script lang="ts">
	import { enhance } from "$app/forms";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Button, A } from 'flowbite-svelte'
    import { ArrowLeftOnRectangle } from "svelte-heros-v2";

    export let username: string;
    export let systemName: string;
</script>

<!-- TODO: add page selected -->
<Navbar class="h-20 relative z-10 !text-primary" navDivClass="h-full max-w-full flex flex-row items-center justify-center" let:hidden let:toggle>
    <div class="flex flex-wrap justify-between container">
        <NavBrand href="/">
            <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Raspcard</span>
        </NavBrand>
        <div class="flex items-center md:order-2">
            <A id="more-info" class="text-primary font-medium hover:no-underline hover:text-accent">ADMIN</A>
            <NavHamburger on:click={toggle} class="w-full md:flex md:w-auto md:order-1" />
        </div>
        <Dropdown placement="bottom" triggeredBy="#more-info">
            <DropdownHeader>
                <span class="block text-sm font-bold">{ username }</span>
                <span class="block truncate text-sm font-medium">{ systemName }</span>
            </DropdownHeader>
            <DropdownItem href="/">Home</DropdownItem>
            <DropdownDivider />
            <form
                method="POST"
                action="/logout"
                use:enhance
            >
                <button type="submit" class="w-full">
                    <DropdownItem class="flex flex-row items-center gap-2"><ArrowLeftOnRectangle class="w-5 h-5"/>esci</DropdownItem>
                </button>
            </form>
        </Dropdown>
        <NavUl {hidden}>
            <NavLi class="!text-primary hover:!text-accent" href="/">HOME</NavLi>
            <NavLi class="!text-primary hover:!text-accent" href="/users">UTENTI</NavLi>
            <NavLi class="!text-primary hover:!text-accent" href="/create">CREAZIONE UTENTI</NavLi>
            <NavLi class="!text-primary hover:!text-accent" href="/tos">TERMINI E CONDIZIONI</NavLi>
            <NavLi class="!text-primary hover:!text-accent" href="/help">AIUTO</NavLi>
        </NavUl>
    </div>
</Navbar>