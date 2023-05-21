<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    import { Card, Button, Label, Input, Heading, Alert, Span } from "flowbite-svelte";
    import { ExclamationTriangle } from "svelte-heros-v2";
    import Scanner from '$lib/components/Scanner.svelte';
    
    let idInput = "";
    export let form: ActionData;
</script>

<Scanner on:scan={e => idInput = e.detail.id}/>
<div class="w-full h-full flex justify-center items-center">
    <Card class="sm:max-w-[20rem] lg:min-w-[30rem]">
        <form 
            class="flex flex-col space-y-6"
            method="POST"
            use:enhance
            on:keypress={e => e.key == "Enter" ? e.preventDefault() : null}
        >
            <Heading tag="h3" class="p-0">Accedi a RaspCard</Heading>
            <Label class="space-y-2">
                <span>Codice della carta</span>
                <Input name="uuid" type="text" placeholder="codice della carta" required bind:value={idInput} class="focus:ring-0 focus:border-secondary-button"/>
            </Label>
            <Label class="space-y-2">
                <span>PIN</span>
                <Input type="password" name="password" placeholder="•••••" required class="focus:ring-0 focus:border-secondary-button"/>
            </Label>
            {#if form?.success === false}
                <Alert class="p-4 bg-secondary-button">
                    <div class="w-full flex flex-row gap-2">
                        <Span class="text-primary"><ExclamationTriangle class="w-5 h-5"/></Span>
                        <Span class="text-primary">{form?.message}</Span>
                    </div>
                </Alert>
            {/if}
            <Button type="submit" class="w-full bg-primary-button hover:bg-primary-button hover:opacity-90 focus:!ring-0">Accedi</Button>
        </form>
    </Card>
</div>