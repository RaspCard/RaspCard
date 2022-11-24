<script lang="ts">
    import { Button, Modal, Listgroup, Input, Label, Radio, Heading, Span, Hr } from 'flowbite-svelte';
    import * as Icon from 'svelte-heros-v2'
    import type { ActionData, PageData } from './$types';
    import { applyAction, enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import BaseCard from '$lib/components/BaseCard.svelte';
    import ListItem from '$lib/components/ListItem.svelte';
    import Notification from '$lib/components/Notification.svelte';

    export let data: PageData;
    export let form: ActionData;
    $: ({ user } = data );

    let list = [
        { name: "Made in Abyss 11", status: "to be shipped soon" },
        { name: "Berserk 33", status: "shipped" },
        { name: "Grand Blue jp 1", status: "delivered" },
        { name: "Grand Blue jp 1", status: "delivered" },
        { name: "Grand Blue jp 1", status: "delivered" },
        { name: "Grand Blue jp 1", status: "delivered" },
    ];

    let deleteModal: boolean = false;
    let transactionModal: boolean = false;
    let rollbackModal: boolean = false;

    let checkedDate: Date | undefined;

    let choice: string = "normal";
</script>

<Notification success={form?.success} message={form?.message} checkedDate={checkedDate}/>

<div class="flex flex-col h-full">
    <div class="container-content">
        <div style="width: 30vw">
            <div> <!-- Top card -->
                <BaseCard title="Dati del profilo">
                    <ul>
                        <ListItem fieldName={"Nome"} fieldValue={user.name}/>
                        <ListItem fieldName={"Cognome"} fieldValue={user.surname} border={true}/>
                        <ListItem fieldName={"Numero di Telefono"} fieldValue={user.phoneNumber} border={true}/>
                    </ul>
                </BaseCard>
            </div>
            <div> <!-- Bottom card -->
                <BaseCard title="Saldo">
                    <div class="w-full flex items-center text-lg">
                        <Span class="font-medium text-lg text-gray-500">{user.balance}€</Span>
                    </div>
                </BaseCard>
            </div>
        </div>
        <div style="width: 30vw"> <!-- Last Transaction card -->
            <BaseCard title="Ultima transazione">
                {#if user.rollback?.active}
                    <ul>
                        <ListItem fieldName={"Transazione"} fieldValue={user.balance - user.rollback?.balance} currency={"€"}/>
                        <ListItem fieldName={"Data Ultima Transazione"} fieldValue={`${user.rollback?.updatedAt.toLocaleDateString()} ${user.rollback?.updatedAt.toLocaleTimeString()}`} border={true}/>
                        {#each [] as item}
                            <ListItem fieldName={""} fieldValue={null} border={true}/>
                        {/each}
                    </ul>
                {:else}
                    <Heading tag="h6" color="text-gray-500">Nessuna transazione disponibile</Heading>
                {/if}
            </BaseCard>
        </div>
        <div class="w-[40vw]"> <!-- Func card -->
            <BaseCard title="Field">
                <ul>
                    <ListItem fieldName={"Field"} fieldValue={null}/>
                    <ListItem fieldName={"Field"} fieldValue={null} border={true}/>
                </ul>
                <div class="text-lg text-gray-500 border-t-2 my-2">{"Field"}</div>
                <Listgroup items={list} let:item class="border-0">
                    <div class="flex items-center space-x-4">
                        <div class="flex-1 space-y-1 font-medium">
                            <div>{item.name}</div>
                            <div class="text-sm text-gray-500">{item.status}</div>
                        </div>
                        <Button gradient color="green" class="h-8">Details</Button>
                    </div>
                </Listgroup>
            </BaseCard>
        </div>
    </div>
    <div class="m-4 flex flex-row align-middle justify-between">
        <Button on:click={() => deleteModal = true} gradient color="red" class="w-56"><Icon.Trash/> Delete User</Button>
        <div class="flex flex-row align-middle gap-4">
            <Button on:click={() => rollbackModal = user.rollback?.active ? true : false} gradient color="blue" class="w-56"><Icon.ArrowPathRoundedSquare/>Rollback</Button>
            <Button on:click={() => transactionModal = true} gradient color="blue" class="w-56"><Icon.CurrencyEuro/>New Transaction</Button>    
        </div>
    </div>
</div>


<!-- Delete modal -->
<Modal bind:open={deleteModal} size="sm" autoclose={false}>
    <form
        method="POST"
        action="?/delete"
        class="flex flex-col space-y-6"
        use:enhance
    >
        <div class="text-center">
            <Icon.ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"/>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Sei sicuro di voler eliminare quest'utente? Quest'operazione è irreversibile</h3>
            <Button type="submit" color="red" class="mr-2">Yes, I'm sure</Button>
            <Button on:click={() => deleteModal = false} color='alternative'>No, cancel</Button>
        </div>
    </form>
</Modal>


<!-- Rollback modal -->
<Modal bind:open={rollbackModal} size="sm" autoclose={false}>
    <form
        method="POST"
        action="?/rollback"
        class="flex flex-col space-y-6"
        use:enhance={() => {
            return async ({ result }) => {
                invalidateAll();
                await applyAction(result);
                rollbackModal = false;
            }
        }}
    >
        <div class="text-center">
            <Icon.ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-red-900"/>
            <Heading tag="h5" class="font-normal text-gray-500">Sei sicuro di voler annullare la precedente transazione?</Heading>
            <Hr class="my-4" height="h-px" />
            <div class="flex flex-col gap-2">
                <Span class="font-semibold text-gray-500">Ciò comporta le seguenti modifiche:</Span>
                <div class="max-h-[10rem] overflow-scroll scrollbar-none text-start">
                    <ul>
                        <ListItem fieldName={"Effettuare La Transazione:"} fieldValue={(user.balance - user.rollback?.balance) * -1} currency={"€"}/>
                        {#each [] as item}
                            <ListItem fieldName={""} fieldValue={null} border={true}/>
                        {/each}
                    </ul>
                </div>
            </div>
            <Hr class="my-4" height="h-px" />
            <Button type="submit" gradient color="red" class="mr-2">SI, sono sicuro</Button>
            <Button on:click={() => rollbackModal = false} color='alternative'>NO, torna indietro</Button>
        </div>
    </form>
</Modal>


<!-- Transaction modal -->
<Modal bind:open={transactionModal} size="xs" autoclose={false}>
    <form
        on:keypress={(event) => (event.key == "Enter") ? event.preventDefault() : null}
        method="POST"
        action="?/balance"
        class="flex flex-col space-y-6"
        use:enhance={() => {
            return async ({ result, form }) => {
                form.reset();
                invalidateAll();
                await applyAction(result);
                transactionModal = false;
                checkedDate = new Date();
            }
        }}
    >
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">New Transaction</h3>
		<div class="container-transaction-content">
            <Label class="space-y-2">
                <span>Amount</span>
                <Input min="0.01" step="0.01" type="number" name="amount" placeholder="0" required class="w-24"/>
		    </Label>
            <Label class="space-y-2">
                <span>Cashback</span>
                <Input min="0" max="100" type="number" name="cashback" placeholder="0" class="w-24"/>
		    </Label>
        </div>
		<Button type="submit" name="operationType" value="-" gradient color="red" class="w-full">-</Button>
		<Button type="submit" name="operationType" value="+" gradient color="green" class="w-full">+</Button>
    </form>
</Modal>


<style>
    .container-content {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
</style>