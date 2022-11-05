<script lang="ts">
    import { Sidebar, SidebarWrapper, SidebarGroup, SidebarBrand, SidebarItem, Drawer, CloseButton, Navbar, NavBrand, NavHamburger, P, Heading } from 'flowbite-svelte';
    import * as Icon from 'svelte-heros-v2';
    import { sineIn } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';

    let test = "flex flex-col items-center justify-between w-full h-full bg-gray-100 p-4";

    let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

    let breakPoint: number = 1100;
	let width: number;
    let drawerHidden: boolean = false;
    let activateClickOutside = true;

    $: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}

	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});

	const toggleDrawer = () => {
		drawerHidden = false;
	};

    let form: HTMLFormElement;

    let establishment: string = "stregatto";
    let seller: string = "mario";

    let site = {
        name: 'RaspCard',
        href: '/',
        img: '/raspcard-logo.svg'
    }
</script>

<svelte:window bind:innerWidth={width} />

{#if width < breakPoint}
    <Navbar>
        <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
        <NavBrand href="/" class="lg:ml-64">
            <Icon.Cog/>
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
                RaspCard
            </span>
        </NavBrand>
    </Navbar>
{/if}

<!-- TODO make transition not available in full screen mode -->
<div class="container-raspcard b-d">
    <Drawer
        transitionType="fly"
        backdrop={false}
        divClass="lg:!static"
        {transitionParams}
        bind:hidden={drawerHidden}
        bind:activateClickOutside
        id="sidebar"
    >
        <Sidebar asideClass="w-64 h-full">
            <SidebarWrapper divClass={test}>
                <SidebarGroup ulClass="w-full">
                    <div class="flex items-center">
                        <SidebarBrand {site} />
                        <CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
                    </div>
                    <div class="mt-4 mb-4 p-2 bg-gray-600 rounded-md ">
                        <div class="text-center">
                            <Heading tag="h5" color="text-gray-200">{establishment.toUpperCase()}</Heading>
                        </div>
                        <div class="flex flex-row justify-between mr-4 ml-4">
                            <P weight="semibold" color="text-gray-200">Utente:</P>
                            <P weight="bold" color="text-gray-200">{seller}</P>
                        </div>
                    </div>
                    <SidebarItem label="Home" href='/'>
                        <svelte:fragment slot="icon">
                            <Icon.Home/>
                        </svelte:fragment>
                    </SidebarItem>
                    <SidebarItem label="Utenti" href='/users/'>
                        <svelte:fragment slot="icon">
                            <Icon.Users/>
                        </svelte:fragment>
                    </SidebarItem>
                    <SidebarItem label="Crea una carta" href='/create/'>
                        <svelte:fragment slot="icon">
                            <Icon.UserPlus/>
                        </svelte:fragment>
                    </SidebarItem>
                </SidebarGroup>
                <SidebarGroup ulClass="w-full">
                    <form
                        method="POST"
                        action="/logout"
                        use:enhance
                        bind:this={form}
                    >
                        <SidebarItem on:click={() => form.requestSubmit()} label="Logout" aClass={"flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"}>
                            <svelte:fragment slot="icon">
                                <Icon.ArrowLeftOnRectangle/>
                            </svelte:fragment>
                        </SidebarItem>
                    </form>
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
    </Drawer>
    <div class="m-4 w-auto container-data"> <!-- column 1 -->
        <div class="text"> <!-- row 2 -->
            <h1>WELCOME</h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eligendi similique beatae quam ratione sit at optio reprehenderit voluptatem et vitae dolores repudiandae quo, in sapiente officiis nam iure necessitatibus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, fugiat? Recusandae quis quidem aliquam, enim, perspiciatis eligendi hic iste alias earum nam accusamus. Quod eaque itaque, dolorem culpa nobis labore architecto, veritatis dolore molestiae quam aliquid velit optio nihil neque ipsam? Officia in similique natus hic, sunt temporibus dolorem sint laudantium est dolor voluptatem accusamus, adipisci dignissimos necessitatibus vero modi eius, quisquam dolorum ullam saepe. Voluptatum repellat et illum quia!
            </p>
        </div>
    </div>
</div>


<style>
    .container-raspcard {
        display: flex;
        flex-direction: row;
    }

    .container-data {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }

    .text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 10px;
    }
</style>