<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import Logo from '../../components/Logo.svelte';

    let seller: string = "SELLER #1";

</script>

<div class="container">
    <div class="container-data"> <!-- column 1 -->
        <div class="logo"> <!-- row 1 -->
            <Logo/>
            <div>
                <h1>ENSTABLISHMENT</h1>
                <p>{seller}</p>
            </div>
        </div>
        <div class="text"> <!-- row 2 -->
            <h1>WELCOME</h1>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eligendi similique beatae quam ratione sit at optio reprehenderit voluptatem et vitae dolores repudiandae quo, in sapiente officiis nam iure necessitatibus.
        </div>
    </div>
    <div class="button-group"> <!-- column 2 -->
        <div class="button-list">
            <Button on:click={() => goto("/scanner")} gradient color="blue" style="width: 100%; height: 70px;"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> Scan</Button>
            <Button on:click={() => goto("/users")} gradient color="blue" style="width: 100%; height: 70px;"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> All Users</Button>
            <Button on:click={() => goto("/create")} gradient color="blue" style="width: 100%; height: 70px;"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Create Card</Button>
            <Button on:click={() => goto("/migrate")} gradient color="blue" style="width: 100%; height: 70px;"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg> Migrate?</Button>
        </div>
        <div class="button-list">
            <Button on:click={() => goto("/logout")} gradient color="blue" style="width: 100%; heigt: 40px;"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Logout</Button>
        </div>
    </div>
</div>

<style>
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    .container {
        width: 100vw;
        height: 100vh;

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

    .logo {
        height: 3rem; /* temp 48px then fit-content */

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
    }

    .text {

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

    .button-list > * {
        width: 100%;
        height: 50px;
    }
</style>