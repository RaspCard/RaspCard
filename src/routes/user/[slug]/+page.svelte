<script lang="ts">
    import { Button, Modal, Listgroup, Input, Label, Radio } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import * as Icon from 'svelte-heros-v2'
    import Head from '$lib/components/Head.svelte';
    import BaseCard from '$lib/components/BaseCard.svelte';
    import ListItem from '$lib/components/ListItem.svelte';

    let establishment: string = "STREGATTO";
    let seller: string = "SELLER #1";

    let user;
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

    let choice: string = "normal";

    async function handleDelete() {
        deleteModal = false;
        // Query
        goto('/users');
    }

    async function handleRollback() {
        rollbackModal = false;
        // Query
    }

    async function handleTransaction() {
        transactionModal = false;
        // Query
    }
</script>


<div class="container-raspcard b-d">
    <div class="m-4 container-header">
        <Head establishment={establishment} seller={seller}/>
        <div class="container-buttons">
            <Button on:click={() => goto("/scanner")} gradient color="blue" class="w-56"><Icon.CreditCard class="mr-2 -ml-1 w-7 h-7"/>Scan</Button>
            <Button on:click={() => goto("/dashboard")} gradient color="blue" class="w-56"><Icon.RectangleGroup class="mr-2 -ml-1 w-7 h-7"/>Dashboard</Button>
        </div>
    </div>
    <div class="container-content mt-6">
        <div>
            <div> <!-- Top card -->
                <BaseCard title="Profile Data">
                    <ul>
                        <ListItem fieldName={"Name"} fieldValue={null}/>
                        <ListItem fieldName={"Surname"} fieldValue={null} border={true}/>
                        <ListItem fieldName={"PhoneNumber"} fieldValue={null} border={true}/>
                    </ul>
                </BaseCard>
            </div>
            <div> <!-- Bottom card -->
                <BaseCard title="Balance">
                    <div class="w-full flex items-center text-lg">
                        <p>{123}€</p>
                    </div>
                </BaseCard>
            </div>
        </div>
        <div> <!-- Last Transaction card -->
            <BaseCard title="Last Transaction">
                <ul>
                    <ListItem fieldName={"Transaction"} fieldValue={null}/>
                    <ListItem fieldName={"Date"} fieldValue={null} border={true}/>
                    <ListItem fieldName={"Field"} fieldValue={null} border={true}/>
                    <ListItem fieldName={"Field"} fieldValue={null} border={true}/>
                </ul>
            </BaseCard>
        </div>
        <div> <!-- Func card -->
            <BaseCard title="Field">
                <ul>
                    <ListItem fieldName={"Field"} fieldValue={null}/>
                    <ListItem fieldName={"Field"} fieldValue={null} border={true}/>
                </ul>
                <div class="text-lg text-gray-500 border-t-2 my-2">{"Field"}</div>
                <Listgroup items={list} let:item class="border-0 h-52 overflow-scroll">
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
    <div class="m-4 mb-10 bottom-buttons-container">
        <Button on:click={() => deleteModal = true} gradient color="red" class="w-56"><Icon.Trash/> Delete User</Button>
        <div class="container-buttons">
            <Button on:click={() => rollbackModal = null ? true : false} gradient color="blue" class="w-56"><Icon.Backward/>Rollback</Button>
            <Button on:click={() => transactionModal = true} gradient color="blue" class="w-56"><Icon.CurrencyEuro/>New Transaction</Button>    
        </div>
    </div>
</div>


<!-- Delete modal -->
<Modal bind:open={deleteModal} size="sm">
    <div class="text-center">
        <Icon.ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"/>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Sei sicuro di voler eliminare quest'utente? Quest'operazione è irreversibile</h3>
        <Button on:click={handleDelete} color="red" class="mr-2">Yes, I'm sure</Button>
        <Button color='alternative'>No, cancel</Button>
    </div>
</Modal>


<!-- Rollback modal -->
<Modal bind:open={rollbackModal} size="sm">
    <div class="text-center">
        <Icon.ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"/>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Sei sicuro di voler effettuare un rollback su quest'utente? Quest'operazione è irreversibile</h3>
        <Button on:click={handleRollback} color="blue" class="mr-2">Yes, I'm sure</Button>
        <Button color='alternative'>No, cancel</Button>
    </div>
</Modal>


<!-- Transaction modal -->
<Modal bind:open={transactionModal} size="xs">
    <form class="flex flex-col space-y-6">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">New Transaction</h3>
		<div class="container-transaction-conent">
            <Label class="space-y-2">
                <span>Amount</span>
                <Input type="number" name="amount" placeholder="0" required class="w-24"/>
		    </Label>
            <div class="flex flex-col gap-1">
                <Radio bind:group={choice} value="comics">Comics</Radio>
                <Radio bind:group={choice} value="normal">Normal</Radio>
            </div>
        </div>
		<Button on:click={handleTransaction} type="submit" class="w-full">Confirm</Button>
	</form>
</Modal>


<style>
    .container-raspcard {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 10vh 80vh 10vh;
    }

    .container-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .container-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 1rem;
    }

    .container-content {
        display: grid;
        grid-template-columns: 30vw 30vw 40vw;
        grid-template-rows: auto;
    }

    .bottom-buttons-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .container-transaction-conent {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>