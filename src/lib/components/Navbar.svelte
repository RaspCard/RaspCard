<script lang="ts">
	import { enhance } from "$app/forms";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Button } from 'flowbite-svelte'
    import { ArrowLeftOnRectangle, Users, UserPlus, BookmarkSquare, QuestionMarkCircle, Home } from "svelte-heros-v2";
</script>

<!-- TODO: fix navbar dimentions -->
<Navbar class="h-24 relative z-10 shadow" let:hidden let:toggle>
    <NavBrand href="/">
        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Raspcard</span>
    </NavBrand>
    <div class="flex items-center md:order-2">
        <Button id="more-info" class="font-semibold md:order-1">admin</Button>
        <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
    </div>
    <Dropdown placement="bottom" triggeredBy="#more-info">
        <DropdownHeader>
            <span class="block text-sm font-bold"> USER NAME </span>
            <span class="block truncate text-sm font-medium"> SYSTEM NAME </span>
        </DropdownHeader>
        <DropdownItem href="/">Home</DropdownItem>
        <DropdownDivider />
        <form
            method="POST"
            action="/logout"
            use:enhance
        >
            <button type="submit" class="w-full">
                <DropdownItem class="flex flex-row items-center gap-2"><ArrowLeftOnRectangle class="w-5 h-5"/>Disconnettiti</DropdownItem>
            </button>
        </form>
    </Dropdown>
    <NavUl {hidden}>
        <NavLi class="flex flex-col items-center" href="/"><Home class="w-5 h-5" /> Home</NavLi>
        <NavLi class="flex flex-col items-center" href="/users"><Users class="w-5 h-5" />Utenti</NavLi>
        <NavLi class="flex flex-col items-center" href="/create"><UserPlus class="w-5 h-5" />Creazione Utenti</NavLi>
        <NavLi class="flex flex-col items-center" href="/tos"><BookmarkSquare class="w-5 h-5"/>Termini d'utilizzo</NavLi>
        <NavLi class="flex flex-col items-center" href="/help"><QuestionMarkCircle class="w-5 h-5" />Aiuto</NavLi>
    </NavUl>
</Navbar>