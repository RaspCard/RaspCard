<script lang="ts">
    import { Table, Input } from 'flowbite-svelte';
    import HeadWithButtons from '$lib/components/HeadWithButtons.svelte';
    import TableRowUser from '$lib/components/TableRowUser.svelte';
    import TableHeadUsers from '$lib/components/TableHeadUsers.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const { currentAdmin, users } = data;

    let searchInput = '';
    $: dynamicUsers = users.filter(user => user.id.includes(searchInput));
</script>


<div class="container-raspcard b-d">
    <HeadWithButtons establishment={currentAdmin.establishmentName} seller={currentAdmin.name}/>
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