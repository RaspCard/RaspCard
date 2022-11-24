<script lang="ts">
    import { Card, Button, Label, Input, Heading, Alert, Span } from "flowbite-svelte";
    import { ExclamationTriangle } from "svelte-heros-v2";
    import { applyAction, enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import type { ActionData } from "./$types";
    import Scanner from '$lib/components/Scanner.svelte';
    
    let input: string = "";
    export let form: ActionData;
</script>

<Scanner on:scan={(event) => input=event.detail.id}/>
<Card class="sm:max-w-[20rem] lg:min-w-[30rem]">
    <form 
        class="flex flex-col space-y-6"
        method="POST"
        use:enhance={() => {
            return async ({ result }) => {
                invalidateAll();
                await applyAction(result);
            }
        }}
        on:keypress={(event) => (event.key == "Enter") ? event.preventDefault() : null}
    >
        <Heading tag="h3" class="p-0">Accedi a RaspCard</Heading>
        <Label class="space-y-2">
            <span>Codice della carta</span>
            <Input name="uuid" type="text" placeholder="codice della carta" required bind:value={input}/>
        </Label>
        <Label class="space-y-2">
            <span>PIN</span>
            <Input type="password" name="password" placeholder="•••••" required/>
        </Label>
        {#if form?.success === false}
            <Alert color="red" class="p-4">
                <div class="w-full flex flex-row gap-2">
                    <Span class="text-red-800"><ExclamationTriangle class="w-5 h-5"/></Span>
                    <Span class="text-red-800">{form?.message}</Span>
                </div>
            </Alert>
        {/if}
        <Button type="submit" outline color="blue" class="w-full">Login to your account</Button>
    </form>
</Card>