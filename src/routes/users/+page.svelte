<script lang="ts">
    import { Table, Input, Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import * as Icon from 'svelte-heros-v2';
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
    <div class="mx-4 h-[5vh]">
        <Input id="search" placeholder="Search" size="lg" bind:value={searchInput}>
            <!-- WHY? -->
            <svg slot="left" aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </Input>
    </div>
    <Table 
        class="border-collapse table-auto w-full whitespace-nowrap relative" 
        divClass="m-4 scrollbar-none overflow-x-auto overflow-y-auto rounded-lg shadow relative max-h-[80vh] lg:max-h-[90vh] z-0"
        striped 
        hoverable={true}
    >
        <TableHeadUsers>
            {#each dynamicUsers as user (user.id)}
                <TableRowUser  {...user}/>
            {/each}
        </TableHeadUsers>
    </Table>
</div>


<style>
    .container-raspcard {
        display: flex;
        flex-direction: column;
    }
</style>