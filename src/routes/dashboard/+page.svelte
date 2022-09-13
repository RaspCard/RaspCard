<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import * as Icon from 'svelte-heros-v2';
    import Head from '$lib/components/Head.svelte';

    let establishment: string = "STREGATTO";
    let seller: string = "SELLER #1";

</script>


<div class="container-raspcard b-d">
    <div class="container-data"> <!-- column 1 -->
        <Head establishment={establishment} seller={seller}/>
        <div class="text"> <!-- row 2 -->
            <h1>WELCOME</h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eligendi similique beatae quam ratione sit at optio reprehenderit voluptatem et vitae dolores repudiandae quo, in sapiente officiis nam iure necessitatibus.
            </p>
        </div>
    </div>
    <div class="button-group"> <!-- column 2 -->
        <div class="button-list">
            <Button on:click={() => goto("/scanner")} gradient color="blue" class="h-20 w-full"><Icon.CreditCard class="mr-2 -ml-1 w-7 h-7"/> Scan</Button>
            <Button on:click={() => goto("/users")} gradient color="blue" class="h-20 w-full"><Icon.Users class="mr-2 -ml-1 w-7 h-7"/> All Users</Button>
            <Button on:click={() => goto("/create")} gradient color="blue" class="h-20 w-full"><Icon.Plus class="mr-2 -ml-1 w-7 h-7"/> Create Card</Button>
            <Button on:click={() => goto("/migrate")} gradient color="blue" class="h-20 w-full"><Icon.CloudArrowUp class="mr-2 -ml-1 w-7 h-7"/> Migrate?</Button>
        </div>
        <div class="button-list">
            <Button on:click={() => goto("/logout")} gradient color="blue" class="h-15 w-full"><Icon.ArrowLeftOnRectangle class="mr-2 -ml-1 w-7 h-7"/> Logout</Button>
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
        padding: 15px 25px;
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
        padding: 30px 0px;
    }

    .button-list {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 16px;
        gap: 25px;
    }
/* 
    .button-list > * {
        width: 100%;
        height: 50px;
    } */
</style>