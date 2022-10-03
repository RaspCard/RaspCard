<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import * as Icon from 'svelte-heros-v2';
    import Head from '$lib/components/Head.svelte';
    import type { PageData } from './$types';
    import { applyAction, enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';

    export let data: PageData;
    const { currentAdmin } = data;
</script>


<div class="container-raspcard b-d">
    <div class="m-4 container-data"> <!-- column 1 -->
        <Head establishment={currentAdmin?.establishmentName} seller={currentAdmin?.name}/>
        <div class="text"> <!-- row 2 -->
            <h1>WELCOME</h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eligendi similique beatae quam ratione sit at optio reprehenderit voluptatem et vitae dolores repudiandae quo, in sapiente officiis nam iure necessitatibus.
            </p>
        </div>
    </div>
    <div class="m-4 button-group"> <!-- column 2 -->
        <div class="button-list">
            <Button on:click={() => goto("/scanner")} gradient color="blue" class="h-20 w-full"><Icon.CreditCard class="mr-2 -ml-1 w-7 h-7"/> Scan</Button>
            <Button on:click={() => goto("/users")} gradient color="blue" class="h-20 w-full"><Icon.Users class="mr-2 -ml-1 w-7 h-7"/> All Users</Button>
            <Button on:click={() => goto("/create")} gradient color="blue" class="h-20 w-full"><Icon.Plus class="mr-2 -ml-1 w-7 h-7"/> Create Card</Button>
        </div>
        <div class="button-list">
            <form
                class="h-15 w-full"
                method="POST"
                action="/logout"
                use:enhance={() => {
                    return async ({ result }) => {
                        invalidateAll();
                        await applyAction(result);
                    }
                }}
            >
                <Button type="submit" gradient color="blue" class="h-full w-full"><Icon.ArrowLeftOnRectangle class="mr-2 -ml-1 w-7 h-7"/> Logout</Button>
            </form>
        </div>
    </div>
</div>


<style>
    .container-raspcard {
        display: grid;
        grid-template-columns: 60vw 40vw;
        grid-template-rows: 1fr;
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