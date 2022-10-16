<script lang="ts">
    import { TableHead, TableHeadCell, TableBody } from 'flowbite-svelte';
</script>

<TableHead class="bg-gray-200">
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Nome</TableHeadCell>
    <TableHeadCell>Cognome</TableHeadCell>
    <TableHeadCell>Numero di telefono</TableHeadCell>
    <TableHeadCell>
        <span class="sr-only"> Modifica </span>
    </TableHeadCell>
</TableHead>
<TableBody class="divide-y">
    <slot />
</TableBody>

<style>

</style>