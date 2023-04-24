<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { Input } from 'flowbite-svelte';
    import Table from '$lib/components/Table.svelte';
    import TableHead from '$lib/components/TableHead.svelte';
    import TableRow from '$lib/components/TableRow.svelte';
    import Scanner from "$lib/components/Scanner.svelte";

    export let data: PageData;

    let searchInput = '';
    $: dynamicUsers = data.users.filter(user => user.cardId.includes(searchInput));
</script>

<Scanner on:scan={e => goto(`/users/${e.detail.id}`)}/>
<div class="flex flex-col py-4 px-8 w-full h-full">
    <!-- TODO: Update search bar -->
    <div class="h-[10%] min-h-[10%]">
        <Input autocomplete="off" id="search" placeholder="Search" size="md" bind:value={searchInput}>
            <!-- Can't use Icon component for some reason -->
            <svg slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </Input>
    </div>
    <!-- Custom Table -->
    <Table>
        <TableHead />
        {#each dynamicUsers as user (user.id)}
            <TableRow {...user}/>
        {/each}
    </Table>
</div>
