<script lang="ts">
    import { TableBodyRow, TableBodyCell } from "flowbite-svelte";

    export let id: string;
    export let name: string | null;
    export let surname: string | null;
    export let phoneNumber: number | null;

</script>


<TableBodyRow>
    <TableBodyCell>{id}</TableBodyCell>
    <TableBodyCell>{name}</TableBodyCell>
    <TableBodyCell>{surname}</TableBodyCell>
    <TableBodyCell>{phoneNumber}</TableBodyCell>
    <TableBodyCell>
        <a sveltekit:prefetch href={`/user/${id}`} class="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Edit
        </a>
    </TableBodyCell>
</TableBodyRow>