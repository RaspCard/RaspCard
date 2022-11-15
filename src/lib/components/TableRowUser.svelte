<script lang="ts">
    import { enhance } from "$app/forms";
    import { TableBodyRow, TableBodyCell, Button } from "flowbite-svelte";

    export let cardId: string;
    export let name: string | null;
    export let surname: string | null;
    export let phoneNumber: number | null;
    export let active: boolean;
</script>


<TableBodyRow>
    <TableBodyCell>{cardId}</TableBodyCell>
    <TableBodyCell>{name}</TableBodyCell>
    <TableBodyCell>{surname}</TableBodyCell>
    <TableBodyCell>{phoneNumber}</TableBodyCell>
    <TableBodyCell>
        {#if active}
            <Button data-sveltekit-prefetch href={`/users/${cardId}`} outline>
                Modifica
            </Button>
        {:else}
            <form
                action={`/users/${cardId}?/active`}
                method="POST"
                use:enhance
            >
                <Button type="submit" outline color="green">Riattiva</Button>
            </form>
        {/if}
    </TableBodyCell>
</TableBodyRow>