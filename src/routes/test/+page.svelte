<script lang="ts">
    import { Sidebar, SidebarWrapper, SidebarGroup, SidebarBrand, SidebarItem } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import * as Icon from 'svelte-heros-v2';
    import Head from '$lib/components/Head.svelte';
    import Scanner from "$lib/components/Scanner.svelte";

    let test = "flex flex-col items-center justify-between h-screen bg-gray-100 p-4";

    let site = {
        name: 'RaspCard',
        href: '/',
        img: '/raspcard-logo.svg'
    }
</script>

<div class="container-raspcard b-d">
    <Sidebar>
        <SidebarWrapper divClass={test}>
            <SidebarGroup>
                <SidebarBrand {site} />
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
            <SidebarGroup ulClass={"w-full"}>
                <SidebarItem label="Logout" aClass={"flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"}>
                    <svelte:fragment slot="icon">
                        <Icon.ArrowLeftOnRectangle/>
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
    <div class="m-4 container-data"> <!-- column 1 -->
        <div class="text"> <!-- row 2 -->
            <h1>WELCOME</h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eligendi similique beatae quam ratione sit at optio reprehenderit voluptatem et vitae dolores repudiandae quo, in sapiente officiis nam iure necessitatibus.
            </p>
        </div>
    </div>
    <!-- <div class="m-4 button-group">
        <div class="button-list">
            <Button href="/users" gradient color="blue" class="h-20 w-full text-lg"><Icon.Users class="mr-2 -ml-1 w-7 h-7"/>Utenti</Button>
            <Button href="/create" gradient color="blue" class="h-20 w-full text-lg"><Icon.Plus class="mr-2 -ml-1 w-7 h-7"/>Crea Carta</Button>
        </div>
        <div class="button-list">
            <form
                class="h-16 w-full"
                method="POST"
                action="/logout"
                use:enhance
            >
                <Button type="submit" gradient color="blue" class="h-full w-full text-lg"><Icon.ArrowLeftOnRectangle class="mr-2 -ml-1 w-7 h-7"/>Logout</Button>
            </form>
        </div>
    </div> -->
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

    .button-group {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .button-list {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
    }
</style>