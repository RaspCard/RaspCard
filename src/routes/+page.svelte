<script lang="ts">
    import { P, Heading, Card } from 'flowbite-svelte';
    import { Home } from "svelte-heros-v2";
    import { goto } from '$app/navigation';
    import Scanner from "$lib/components/Scanner.svelte";
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Scanner on:scan={e => goto(`/users/${e.detail.id}`)}/>
<div class="p-4 flex flex-col items-start gap-4">
    <Heading tag="h2">Benvenuto</Heading>
    <Card class="p-4">
        <div class="flex flex-col items-center">
            <Heading tag="h5" class="mb-2">Utenti Attivi</Heading>
            <div class="flex space-x-3">
                <P size="lg" weight="semibold">{data.userLenght}</P>
            </div>
        </div>
    </Card>
</div>