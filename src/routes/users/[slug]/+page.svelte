<script lang="ts">
    import { Button, Modal, Listgroup, Input, Label, Heading, Span, Hr } from 'flowbite-svelte';
    import { Trash, ArrowPathRoundedSquare, CurrencyEuro, ExclamationTriangle } from 'svelte-heros-v2';
    import toast, { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import { enhance } from '$app/forms';
    import BaseCard from '$lib/components/BaseCard.svelte';
    import ListItem from '$lib/components/ListItem.svelte';

    export let data: PageData;
    $: ({ user } = data );

    let deleteModal: boolean = false;
    let transactionModal: boolean = false;
    let rollbackModal: boolean = false;
    let editModal: boolean = false;
</script>

<Toaster/>

<div class="flex flex-col h-full">
    <div class="w-full h-full flex flex-col lg:flex-row justify-start">
        <div class="w-full lg:w-4/12">
            <BaseCard title="ID Utente"> <!-- Top card -->
                <Span class="font-medium text-lg text-gray-500">{user.cardId}</Span>
            </BaseCard>
            <BaseCard title="Dati del profilo"> <!-- Middle card -->
                <svelte:fragment slot="head">
                    <Button on:click={() => editModal = true} outline color="dark" class="!border-none !text-gray-900 hover:!bg-transparent hover:!text-gray-600">modifica</Button>
                </svelte:fragment>
                <ul>
                    <ListItem fieldName={"Nome"} fieldValue={user.name}/>
                    <ListItem fieldName={"Cognome"} fieldValue={user.surname} border={true}/>
                    <ListItem fieldName={"Numero di Telefono"} fieldValue={user.phoneNumber} border={true}/>
                </ul>
            </BaseCard>
            <BaseCard title="Saldo"> <!-- Bottom card -->
                <Span class="font-medium text-lg text-gray-500">{user.balance}€</Span>
            </BaseCard>
        </div>
        <div class="w-full lg:w-8/12"> <!-- Last Transaction card -->
            <BaseCard title="Cronologia Transazioni">
                {#if user.rollback.length !== 0}
                    {#each user.rollback as transaction}
                        <ul>
                            <ListItem fieldName={"Transazione"} fieldValue={transaction.transaction} currency={"€"}/>
                            <ListItem fieldName={"Data Transazione"} fieldValue={`${transaction.createdAt.toLocaleDateString()} ${transaction.createdAt.toLocaleTimeString()}`} border={true}/>
                        </ul>
                    {/each}
                {:else}
                    <Heading tag="h6" color="text-gray-500">Nessuna transazione disponibile</Heading>
                {/if}
            </BaseCard>
        </div>
    </div>
    <div class="w-full bg-white border-t-2 pt-2 lg:bg-none lg:border-t-0 lg:p-0 lg:w-auto lg:fixed lg:bottom-4 lg:right-4">
        <div class="m-4 lg:m-0 flex flex-col lg:flex-row align-middle gap-4">
            <Button on:click={() => deleteModal = true} gradient color="red" class="w-full lg:w-56"><Trash/>Elimina Utente</Button>
            <Button on:click={() => rollbackModal = user.rollback.length !== 0 ? true : false} gradient color="green" class="w-full lg:w-56"><ArrowPathRoundedSquare/>Annulla L'ultima Transazione</Button>
            <Button on:click={() => transactionModal = true} gradient color="blue" class="w-full lg:w-56"><CurrencyEuro/>Nuova Transazione</Button>    
        </div>
    </div>
</div>


<!-- Edit modal -->
<Modal bind:open={editModal} size="sm" autoclose={false}>
    <form
        method="POST"
        action="?/edit"
        class="flex flex-col space-y-6"
        use:enhance={() => {
            return async ({ update, result }) => {
                if (result.type === "success") {
                    await update();
                    toast.success(result.data?.message);
                } else if (result.type === "failure"){
                    toast.error(result.data?.message);
                }
                editModal = false;
            }
        }}
    >
        <div class="text-center">
            <Heading tag="h4">Modifica i dati utente</Heading>
            <div class="text-left flex flex-col gap-2 my-3">
                <Label class="space-y-2">
                    <Span>Nome</Span>
                    <Input type="text" name="name" value={user.name || ""} />
                </Label>
                <Label class="space-y-2">
                    <Span>Cognome</Span>
                    <Input type="text" name="surname" value={user.surname || ""} />
                </Label>
                <Label class="space-y-2">
                    <Span>Numero di telefono</Span>
                    <Input type="tel" name="phoneNumber" value={user.phoneNumber || ""} pattern={"3[0-9]{9}"} />
                </Label>
            </div>
            <div class="flex flex-row">
                <Button type="submit" color="blue" class="mr-2 w-full">Salva</Button>
                <Button on:click={() => editModal = false} color='alternative' class="w-full">Annulla</Button>
            </div>
        </div>
    </form>
</Modal>


<!-- Delete modal -->
<Modal bind:open={deleteModal} size="sm" autoclose={false}>
    <form
        method="POST"
        action="?/delete"
        class="flex flex-col space-y-6"
        use:enhance
    >
        <div class="text-center">
            <ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-gray-400"/>
            <h3 class="mb-5 text-lg font-normal text-gray-500">Sei sicuro di voler eliminare quest'utente?<br>L'utente verrà disattivato e sarà possibile riattivarlo in seguito.</h3>
            <Button type="submit" color="red" class="mr-2">SI, sono sicuro</Button>
            <Button on:click={() => deleteModal = false} color='alternative'>NO, torna indietro</Button>
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
            return async ({ update, result }) => {
                if (result.type === "success") {
                    await update();
                    toast.success(result.data?.message);
                } else if (result.type === "failure"){
                    toast.error(result.data?.message);
                }
                rollbackModal = false;
            }
        }}
    >
        <div class="text-center">
            <ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-gray-400"/>
            <Heading tag="h5" class="font-normal text-gray-500">Sei sicuro di voler annullare la precedente transazione?</Heading>
            <Hr class="my-4" height="h-px" />
            <div class="flex flex-col gap-2">
                <Span class="font-semibold text-gray-500">Ciò comporta le seguenti modifiche:</Span>
                <div class="max-h-[10rem] overflow-scroll scrollbar-none text-start">
                    <ul>
                        <ListItem fieldName={"Valore restituito"} fieldValue={user.rollback.length !== 0 ? user.rollback[0].transaction * -1 : 0} currency={"€"}/>
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
        on:keypress={e => e.key == "Enter" ? e.preventDefault() : null}
        method="POST"
        action="?/balance"
        class="flex flex-col space-y-6"
        use:enhance={() => {
            return async ({ update, result, form }) => {
                form.reset();
                if (result.type === "success") {
                    await update();
                    toast.success(result.data?.message);
                } else if (result.type === "failure"){
                    toast.error(result.data?.message);
                }
                transactionModal = false;
            }
        }}
    >
        <Heading tag="h3" class="p-0">Nuova Transazione</Heading>
        <Label class="space-y-2">
            <span>Importo</span>
            <Input min="0.01" step="0.01" type="number" name="amount" placeholder="0" required class="w-24"/>
        </Label>
        <Label class="space-y-2">
            <span>Cashback</span>
            <Input min="0" max="100" type="number" name="cashback" placeholder="0" class="w-24"/>
        </Label>
        <div class="flex flex-row gap-2">
            <Button type="submit" name="operationType" value="-" gradient color="red" class="w-full">- Sottrai</Button>
            <Button type="submit" name="operationType" value="+" gradient color="green" class="w-full">+ Aggiungi</Button>
        </div>
    </form>
</Modal>