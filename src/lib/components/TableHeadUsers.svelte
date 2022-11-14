<script lang="ts">
    import { TableHead, TableHeadCell, TableBody } from 'flowbite-svelte';
</script>

<TableHead>
    <TableHeadCell class="sticky top-0 bg-gray-200">ID</TableHeadCell>
    <TableHeadCell class="sticky top-0 bg-gray-200">Nome</TableHeadCell>
    <TableHeadCell class="sticky top-0 bg-gray-200">Cognome</TableHeadCell>
    <TableHeadCell class="sticky top-0 bg-gray-200">Numero di telefono</TableHeadCell>
    <TableHeadCell class="sticky top-0 bg-gray-200">
        <span class="sr-only"> Modifica </span>
    </TableHeadCell>
</TableHead>
<TableBody class="divide-y">
    <slot />
</TableBody>