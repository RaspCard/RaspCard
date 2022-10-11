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
    <div class="m-4 overflow-y-scroll">
        <Input bind:value={searchInput}/>
        <Table shadow>
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