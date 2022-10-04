<script lang="ts">
    import { Button, Label, Input, Checkbox, Helper, Alert } from 'flowbite-svelte';
    import * as Icon from 'svelte-heros-v2';
    import HeadWithButtons from '$lib/components/HeadWithButtons.svelte';
    import type { PageData, ActionData } from './$types';
    import { applyAction, enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';


    export let form: ActionData;
    export let data: PageData;
    const { currentAdmin } = data;

    let tos: boolean = true;
</script>

<div class="flex justify-center w-screen">

    

    {#if form?.message}
        <Alert dismissable class="absolute w-96 top-20 shadow" style="max-width: 40vw" color={form?.success === true ? 'green': 'red'}>
            {#if form?.success === true}
                <Icon.InformationCircle class="w-5 h-5"/>
                <span class="font-medium">Success!</span>{form?.message}.
            {/if}

            {#if form?.success === false}    
                <Icon.ExclamationCircle class="w-5 h-5"/>
                <div class="ml-3">
                    <span class="sr-only">Error</span>
                    <span class="font-medium">Impossibile creare la tessera:</span>        
                </div>
                <ul class="mt-0 ml-8 list-disc list-inside">
                    <li>{form?.message}</li>
                </ul>
            {/if}
        </Alert>
    {/if}
</div>

<div class="container-raspcard b-d">
    <HeadWithButtons establishment={currentAdmin.establishmentName} seller={currentAdmin.name}/>
    <form
        method="POST"
        use:enhance={() => {
            return async ({ result }) => {
                invalidateAll();
                await applyAction(result);
            }
        }}
    >
        <div class="m-4 mt-6">
            <div>
                <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900">Create a new card</h1>
                <p class="mb-6 text-lg font-normal text-gray-500">
                    All the fields are optional, but for a more simple management is preferable
                </p>
            </div>
            <div class="container-content w-3/4">
                <div class="w-full flex flex-col gap-4">
                    <Label class="space-y-2">
                        <span>Name</span>
                        <Input autocomplete="off" disabled={tos} type="text" name="name" />
                    </Label>
                    <Label class="space-y-2">
                        <span>Surname</span>
                        <Input autocomplete="off" disabled={tos} type="text" name="surname" />
                    </Label>
                    <Label class="space-y-2">
                        <span>Phone number</span>
                        <Input autocomplete="off" disabled={tos} type="number" name="phoneNumber" />
                    </Label>
                    <Checkbox on:click={() => tos = !tos}>Agree TOS</Checkbox>
                </div>
                <div class="flex flex-col gap-4">
                    <Label class="space-y-2">
                        <span>Migration ID</span>
                        <Input autocomplete="off" type="number" name="migrationID" />
                    </Label>
                    <Label class="space-y-2">
                        <span>Initial Deposit</span>
                        <Input autocomplete="off" type="number" name="deposit" />
                        <Helper class='text-sm'>CashBack applied of 20%</Helper>
                    </Label>
                </div>
            </div>
        </div>
        <div class="m-4 bottom-button-container">
            <Button type="submit" gradient color="blue" class="w-72 h-20"><Icon.Plus class="mr-2 -ml-1 w-7 h-7"/>Create Card</Button>
        </div>
    </form>
</div>


<style>
    .container-raspcard {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 10vh 75vh 15vh; /* fix the height of the container */
    }

    .container-content {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .bottom-button-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
</style>