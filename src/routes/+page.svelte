<script lang="ts">
    import { P, Heading, Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import Scanner from "$lib/components/Scanner.svelte";

    
</script>


<Scanner on:scan={(event) => goto(`/users/${event.detail.id}`)}/>
<div class="m-4 flex flex-col items-start gap-4">
    <Heading tag="h1">Benvenuto</Heading>
    <P>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eligendi similique beatae quam ratione sit at optio reprehenderit voluptatem et vitae dolores repudiandae quo, in sapiente officiis nam iure necessitatibus.
    </P>
    <Card class="p-4">
        <div class="flex flex-col items-center">
            <Heading tag="h5" class="mb-2">Utenti Attivi</Heading>
            <div class="flex space-x-3">
                <P size="lg" weight="semibold">{"123"}</P>
            </div>
        </div>
      </Card>
</div>