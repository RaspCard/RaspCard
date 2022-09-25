<script lang="ts">
    import { Table } from 'flowbite-svelte';
    import HeadWithButtons from '$lib/components/HeadWithButtons.svelte';
    import TableRowUser from '$lib/components/TableRowUser.svelte';
    import TableHeadUsers from '$lib/components/TableHeadUsers.svelte';
    import type { PageData } from '.svelte-kit/types/src/routes/users/$types';
    import BaseCard from '$lib/components/BaseCard.svelte';

    export let data: PageData;
    const { users } = data;

    let establishment: string = "STREGATTO";
    let seller: string = "SELLER #1";
</script>


<div class="container-raspcard b-d">
    <HeadWithButtons establishment={establishment} seller={seller}/>
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
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 10vh 90vh;
    }
</style>