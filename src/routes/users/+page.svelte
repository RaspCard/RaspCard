<script lang="ts">
    import { Table } from 'flowbite-svelte';
    import HeadWithButtons from '$lib/components/HeadWithButtons.svelte';
    import TableRowUser from '$lib/components/TableRowUser.svelte';
    import TableHeadUsers from '$lib/components/TableHeadUsers.svelte';

    let establishment: string = "STREGATTO";
    let seller: string = "SELLER #1";
</script>


<div class="container-raspcard b-d">
    <HeadWithButtons establishment={establishment} seller={seller}/>
    <div class="m-4 overflow-y-scroll">
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
</style>