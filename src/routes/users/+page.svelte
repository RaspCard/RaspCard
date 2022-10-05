<script lang="ts">
    import { Table } from 'flowbite-svelte';
    import HeadWithButtons from '$lib/components/HeadWithButtons.svelte';
    import TableRowUser from '$lib/components/TableRowUser.svelte';
    import TableHeadUsers from '$lib/components/TableHeadUsers.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const { currentAdmin, users } = data;
</script>


<div class="container-raspcard b-d">
    <HeadWithButtons establishment={currentAdmin.establishmentName} seller={currentAdmin.name}/>
    <div class="m-4 overflow-y-scroll">
        <Table shadow>
            <TableHeadUsers>
                {#each users as user}
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