<script lang="ts">
    import { goto } from '$app/navigation';
    import Scanner from "$lib/components/Scanner.svelte";
</script>

<Scanner on:scan={(event) => goto(`/users/${event.detail.id}`)}/>
<div class="container-raspcard">
    <div class="m-4 container-data">
        <div class="text">
            <h1>WELCOME</h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eligendi similique beatae quam ratione sit at optio reprehenderit voluptatem et vitae dolores repudiandae quo, in sapiente officiis nam iure necessitatibus.
            </p>
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