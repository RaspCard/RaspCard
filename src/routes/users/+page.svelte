<script lang="ts">
    import { Table, Input } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import TableRowUser from '$lib/components/TableRowUser.svelte';
    import TableHeadUsers from '$lib/components/TableHeadUsers.svelte';
    import Scanner from "$lib/components/Scanner.svelte";

    export let data: PageData;
    const { users } = data;

    let searchInput = '';
    $: dynamicUsers = users.filter(user => user.cardId.includes(searchInput));
</script>

<Scanner on:scan={(event) => goto(`/users/${event.detail.id}`)}/>
<div class="container-raspcard m-4">
    <div class="mr-4 ml-4">
        <Input bind:value={searchInput} placeholder="Ricerca" class="w-full"/>
    </div>
    <div class="m-4 overflow-y-scroll">
        <Table shadow striped hoverable>
            <TableHeadUsers>
                {#each dynamicUsers as user (user.id)}
                    <TableRowUser  {...user}/>
                {/each}
            </TableHeadUsers>
        </Table>
    </div>
</div>


<style>
    .container-raspcard {
        display: flex;
        flex-direction: column;
    }
</style>