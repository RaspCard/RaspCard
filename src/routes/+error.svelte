<script lang="ts">
    import { Button, P } from "flowbite-svelte";
    import { page } from "$app/stores";
</script>

<div class="w-full h-full flex items-center justify-center gap-2">
    <div class="flex flex-col items-center max-w-xl gap-3">
        <P weight="thin" size="5xl" class="flex items-center mr-2">
            {$page.status}
        </P>
        <P weight="thin" size="2xl" class="text-center">
            {#if $page.status === 404}
                La pagina/utente che stai cercando non esiste!
            {:else if $page.status === 500}
                C'è stato un errore nel server.
            {:else}
                C'è stato un errore.
            {/if}
        </P>
        <Button href="/" class="bg-primary-button active:ring-0 hover:bg-primary-button hover:opacity-90">Torna alla Home</Button>
    </div>
</div>