<script lang="ts">
    import { 
        Sidebar, 
        SidebarWrapper, 
        SidebarGroup, 
        SidebarBrand, 
        SidebarItem, 
        Drawer, 
        CloseButton, 
        Navbar, 
        NavBrand, 
        NavHamburger, 
        P, 
        Heading,
        Span
    } from 'flowbite-svelte';
    import { Cog, Home, Users, UserPlus, ArrowLeftOnRectangle } from 'svelte-heros-v2';
    import { sineIn } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import Brand from '$lib/components/Brand.svelte';

    export let establishment: string | undefined;
    export let seller: string | undefined;
    export let divClass: string = "w-full lg:w-[80%] xl:w-[87%]";
    export let activeURL: string;
    
    let transitionParams = {
        x: -320,
		duration: 200,
		easing: sineIn
	};
    
    let breakPoint: number = 1100;
	let width: number;

    let drawerHidden: boolean = false;
    let activateClickOutside = true;
    
    let form: HTMLFormElement;

	onMount(() => checkWidth());
    $: if (width >= breakPoint) {
        drawerHidden = false;
        activateClickOutside = false;
    } else {
        drawerHidden = true;
        activateClickOutside = true;
    };
    
    function checkWidth() {
        if (width >= breakPoint) {
            drawerHidden = false;
            activateClickOutside = false;
        } else {
            drawerHidden = true;
            activateClickOutside = true;
        }
    }

    let site = {
        name: 'RaspCard',
        href: '/',
        img: '/raspcard-logo.svg'
    }
</script>

<svelte:window bind:innerWidth={width} />

{#if width < breakPoint}
    <Navbar>
        <NavHamburger on:click={() => drawerHidden=false} btnClass="ml-3 lg:hidden" />
        <NavBrand href="/" class="lg:ml-64">
            <Brand width={30} height={30}/>
        </NavBrand>
    </Navbar>
{/if}

<div class="flex flex-row w-auto lg:h-full">
    <Drawer
        transitionType={width < breakPoint ? "fly" : undefined}
        backdrop={false}
        divClass="z-50 lg:!static"
        {transitionParams}
        bind:hidden={drawerHidden}
        bind:activateClickOutside
        width="w-64 lg:w-[20%] xl:w-[13%]"
        id="sidebar"
    >
        <Sidebar asideClass="w-full h-full">
            <SidebarWrapper divClass="flex flex-col items-center justify-between w-full h-full bg-gray-100 p-4">
                <SidebarGroup ulClass="w-full">
                    <div class="max-md:flex max-md:items-center">
                        <div class="flex flex-row">
                            <Brand width={30} height={30}/>
                        </div>
                        <CloseButton on:click={() => drawerHidden=true} class="mb-4 lg:hidden" />
                    </div>
                    <div class="mt-4 mb-4 p-2 bg-gray-600 rounded-md">
                        <div class="text-center">
                            <Heading tag="h5" color="text-gray-300">{establishment?.toUpperCase()}</Heading>
                        </div>
                        <div class="flex flex-row justify-between mr-[10%] ml-[10%]">
                            <P weight="semibold" color="text-gray-200">Utente:</P>
                            <P weight="bold" color="text-gray-200">{seller}</P>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <SidebarItem label="Home" href='/' active={activeURL === "/"} class="hover:!bg-gray-200">
                            <svelte:fragment slot="icon">
                                <Home/>
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem label="Utenti" href='/users/' active={activeURL.startsWith("/users")} class="hover:!bg-gray-200">
                            <svelte:fragment slot="icon">
                                <Users/>
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem label="Crea una carta" href='/create/' active={activeURL === "/create"} class="hover:!bg-gray-200">
                            <svelte:fragment slot="icon">
                                <UserPlus/>
                            </svelte:fragment>
                        </SidebarItem>
                    </div>
                </SidebarGroup>
                <SidebarGroup ulClass="w-full">
                    <form
                        method="POST"
                        action="/logout"
                        use:enhance
                        bind:this={form}
                    >
                        <SidebarItem on:click={() => form.requestSubmit()} label="Logout" aClass="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:!bg-gray-200">
                            <svelte:fragment slot="icon">
                                <ArrowLeftOnRectangle/>
                            </svelte:fragment>
                        </SidebarItem>
                    </form>
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
    </Drawer>
    <div class={divClass}>
        <slot />
    </div>
</div>