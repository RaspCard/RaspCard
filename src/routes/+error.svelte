<script lang="ts">
    import { Button, P } from "flowbite-svelte";
    import { page } from "$app/stores";
</script>

<div class="flex flex-col gap-2 max-w-[20rem]">
    <div class="flex flex-row">
        <P weight="thin" size="5xl" class="mr-2">
            {$page.status}
        </P>
        <P weight="thin" size="2xl" class="flex items-center border-l-[1px] border-l-gray-400 pl-2">
            {#if $page.status === 404}
                La pagina/utente che stai cercando non esiste!
            {:else if $page.status === 500}
                C'è stato un errore nel server.
            {:else}
                C'è stato un errore.
            {/if}
        </P>
    </div>
    <Button outline color="dark" href="/">Torna indietro!</Button>
</div>