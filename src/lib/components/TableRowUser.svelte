<script lang="ts">
    import { TableBodyRow, TableBodyCell, Button } from "flowbite-svelte";

    export let cardId: string;
    export let name: string | null;
    export let surname: string | null;
    export let phoneNumber: number | null;

</script>


<TableBodyRow>
    <TableBodyCell>{cardId}</TableBodyCell>
    <TableBodyCell>{name}</TableBodyCell>
    <TableBodyCell>{surname}</TableBodyCell>
    <TableBodyCell>{phoneNumber}</TableBodyCell>
    <TableBodyCell>
        <Button data-sveltekit-prefetch href={`/users/${cardId}`} class="font-medium" gradient>
            Dettagli
        </Button>
    </TableBodyCell>
</TableBodyRow>