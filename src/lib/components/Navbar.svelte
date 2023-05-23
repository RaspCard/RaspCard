<script lang="ts">
	import { enhance } from "$app/forms";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Button, A } from 'flowbite-svelte'
    import { ArrowLeftOnRectangle } from "svelte-heros-v2";

    export let username: string;
    export let systemName: string;
</script>

<div class="relative">
    <Navbar
      navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b h-20"
      navDivClass="h-full mx-auto"
    >
        <div class="h-full flex flex-row items-center justify-between container">
            <NavBrand href="/" class="bg-primary-button rounded-md px-3 py-2">
                <span class="self-center whitespace-nowrap text-2xl font-bold italic text-accent">Raspcard</span>
            </NavBrand>
            <div class="flex items-center gap-2 md:order-2">
                <A id="more-info" class="text-primary font-medium hover:no-underline hover:text-accent">ADMIN</A>
                <NavHamburger btnClass="lg:hidden" id="paths" />
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
            <Dropdown placement="bottom" triggeredBy="#paths">
                <DropdownItem class="!text-primary hover:!text-accent" href="/">HOME</DropdownItem>
                <DropdownItem class="!text-primary hover:!text-accent" href="/users">UTENTI</DropdownItem>
                <DropdownItem class="!text-primary hover:!text-accent" href="/create">CREAZIONE UTENTI</DropdownItem>
                <DropdownItem class="!text-primary hover:!text-accent" href="/tos">TERMINI E CONDIZIONI</DropdownItem>
                <DropdownItem class="!text-primary hover:!text-accent" href="/help">AIUTO</DropdownItem>
            </Dropdown>
            <NavUl class="hidden lg:flex flex-row">
                <NavLi class="!text-primary hover:!text-accent" href="/">HOME</NavLi>
                <NavLi class="!text-primary hover:!text-accent" href="/users">UTENTI</NavLi>
                <NavLi class="!text-primary hover:!text-accent" href="/create">CREAZIONE UTENTI</NavLi>
                <NavLi class="!text-primary hover:!text-accent" href="/tos">TERMINI E CONDIZIONI</NavLi>
                <NavLi class="!text-primary hover:!text-accent" href="/help">AIUTO</NavLi>
            </NavUl>
        </div>
    </Navbar>
</div>