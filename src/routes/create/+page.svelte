<script lang="ts">
    import { Button, Label, Input, Checkbox, Helper, Alert } from 'flowbite-svelte';
    import * as Icon from 'svelte-heros-v2';
    import HeadWithButtons from '$lib/components/HeadWithButtons.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const { currentAdmin } = data;

    let tos: boolean = true;
    
    let name: string = "";
    let surname: string = "";
    let phoneNumber: string = "";
    let migrationID: string = "";
    let deposit: string = "";

    let dataJson = {success: undefined, message: ""};

    async function handleCreation() {
        const parsedPhoneNumber = parseInt(phoneNumber);
        const parsedMigrationID = parseInt(migrationID);
        const parsedDeposit = parseInt(deposit);

        const res = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name || null,
                surname: surname || null,
                phoneNumber: (!isNaN(parsedPhoneNumber)) ? parsedPhoneNumber : null,
                migrationID: (!isNaN(parsedMigrationID)) ? parsedMigrationID : null,
                deposit: (!isNaN(parsedDeposit)) ? parsedDeposit : 0 // TODO add cashback to deposit after more istructions from client
            })
        });

        dataJson = await res.json();
    }
</script>

<div class="flex justify-center w-screen">
    {#if dataJson.success === false}
        <Alert dismissable class="absolute w-96 top-20 shadow" style="max-width: 40vw" color="red">
            <Icon.ExclamationCircle class="w-5 h-5"/>
            <div class="ml-3">
                <span class="sr-only">Error</span>
                <span class="font-medium">Impossibile creare la tessera:</span>        
            </div>
            <ul slot="extra" class="mt-0 ml-8 list-disc list-inside">
                <li>{dataJson.message}</li>
            </ul>
        </Alert>
    {/if}

    {#if dataJson.success === true}
        <Alert dismissable class="absolute w-96 top-20 shadow" style="max-width: 40vw" color="green">
            <Icon.InformationCircle class="w-5 h-5"/>
            <span class="font-medium">Success!</span>{dataJson.message}.
        </Alert>
    {/if}
</div>

<div class="container-raspcard b-d">
    <HeadWithButtons establishment={currentAdmin?.establishment.name} seller={currentAdmin?.name}/>
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
                    <Input autocomplete="off" disabled={tos} bind:value={name} type="text" name="name" />
                </Label>
                <Label class="space-y-2">
                    <span>Surname</span>
                    <Input autocomplete="off" disabled={tos} bind:value={surname} type="text" name="surname" />
                </Label>
                <Label class="space-y-2">
                    <span>Phone number</span>
                    <Input autocomplete="off" disabled={tos} bind:value={phoneNumber} type="number" name="phoneNumber" />
                </Label>
                <Checkbox on:click={() => tos = !tos}>Agree TOS</Checkbox>
            </div>
            <div class="flex flex-col gap-4">
                <Label class="space-y-2">
                    <span>Migration ID</span>
                    <Input autocomplete="off"  bind:value={migrationID} type="number" name="migrationID" />
                </Label>
                <Label class="space-y-2">
                    <span>Initial Deposit</span>
                    <Input autocomplete="off" bind:value={deposit} type="number" name="deposit" />
                    <Helper class='text-sm'>CashBack applied of 20%</Helper>
                </Label>
            </div>
        </div>
    </div>
    <div class="m-4 bottom-button-container">
        <Button on:click={handleCreation} gradient color="blue" class="w-72 h-20"><Icon.Plus class="mr-2 -ml-1 w-7 h-7"/>Create Card</Button>
    </div>
</div>


<style>
    .container-raspcard {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 10vh 75vh 15vh;
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