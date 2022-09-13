<script lang="ts">
    import { Table, Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import * as Icon from 'svelte-heros-v2';
    import Head from '$lib/components/Head.svelte';
    import TableRowUser from '$lib/components/TableRowUser.svelte';
    import TableHeadUsers from '$lib/components/TableHeadUsers.svelte';

    let establishment: string = "STREGATTO";
    let seller: string = "SELLER #1";
    
    
</script>

<div class="container-raspcard b-d">
    <div class="m-4 container-header">
        <Head establishment={establishment} seller={seller}/>
        <div class="container-buttons">
            <Button on:click={() => goto("/scanner")} gradient color="blue" class="w-56"><Icon.CreditCard class="mr-2 -ml-1 w-7 h-7"/>Scan</Button>
            <Button on:click={() => goto("/dashboard")} gradient color="blue" class="w-56"><Icon.RectangleGroup class="mr-2 -ml-1 w-7 h-7"/>Dashboard</Button>
        </div>
    </div>
    <div class="m-4 container-table">
        <Table shadow>
            <TableHeadUsers>
                {#each {length:160} as _, i}
                    <TableRowUser id={i.toString()} name={null} surname={null} phoneNumber={null}/>
                {/each}
            </TableHeadUsers>
        </Table>
    </div>
</div>

<style>
    .container-raspcard {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 10vh 90vh;
    }

    .container-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .container-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 1rem;
    }

    .container-table {
        overflow-y: scroll;
    }
</style>