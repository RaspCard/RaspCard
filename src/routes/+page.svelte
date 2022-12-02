<script lang="ts">
    import { P, Heading, Card, Span } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import Scanner from "$lib/components/Scanner.svelte";
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Scanner on:scan={e => goto(`/users/${e.detail.id}`)}/>
<div class="m-4 flex flex-col items-start gap-4">
    <Heading tag="h1">Benvenuto</Heading>
    <P size="lg" italic space="wide" whitespace="preline">
        Il Nuovo sistema RaspCard con l'uso di un <Span class="font-semibold">dispositivo RFID</Span> permette di accedere al sistema con un semplice tocco.<br/>
        <Span class="font-semibold">Online</Span> e <Span class="font-semibold">centralizzato</Span> in un unico punto, RaspCard è molto più veloce e semplice da usare.
    </P>
    <Card class="p-4">
        <div class="flex flex-col items-center">
            <Heading tag="h5" class="mb-2">Utenti Attivi</Heading>
            <div class="flex space-x-3">
                <P size="lg" weight="semibold">{data.userLenght}</P>
            </div>
        </div>
      </Card>
</div>