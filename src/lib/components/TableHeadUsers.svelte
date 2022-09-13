<script lang="ts">
    import { TableHead, TableHeadCell, TableBody } from 'flowbite-svelte';
</script>

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
    <slot />
</TableBody>