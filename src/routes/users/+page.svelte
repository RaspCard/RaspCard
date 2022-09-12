<script lang="ts">
    import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte';
    import Head from '$lib/components/Head.svelte';

    let establishment: string = "STREGATTO";
    let seller: string = "SELLER #1";
</script>

<div class="container-raspcard base-dimention">
    <div>
        <Head establishment={establishment} seller={seller}/>
    </div>
    <div class="container-table">
        <Table shadow>
            <TableHead>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>name</TableHeadCell>
                <TableHeadCell>surname</TableHeadCell>
                <TableHeadCell>phone number</TableHeadCell>
                <TableHeadCell>
                    <span class="sr-only"> Edit </span>
                </TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                <TableBodyRow>
                    <TableBodyCell>123456789</TableBodyCell>
                    <TableBodyCell>Mario</TableBodyCell>
                    <TableBodyCell>Mario</TableBodyCell>
                    <TableBodyCell>+39 392 9436267</TableBodyCell>
                    <TableBodyCell>
                        <a href="/user/mario" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Edit
                        </a>
                    </TableBodyCell>
                </TableBodyRow>
            </TableBody>
        </Table>
    </div>
</div>

<style>
    .container-raspcard {

    }

    .container-table {
        
    }
</style>