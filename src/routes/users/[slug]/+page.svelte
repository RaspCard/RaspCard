<script lang="ts">
    import { Button, Modal, Listgroup, Input, Label, Heading, Span, Hr } from 'flowbite-svelte';
    import { Trash, ArrowPathRoundedSquare, CurrencyEuro, ExclamationTriangle, FingerPrint, Identification, Banknotes, ArrowPath } from 'svelte-heros-v2';
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

<div class="relative flex flex-col lg:h-full">
    <div class="absolute w-full lg:static">
        <div class="p-3 w-full flex justify-end flex-col-reverse h-52 lg:h-20 lg:flex-row gap-4">
            <Button on:click={() => deleteModal = true} class="w-ful h-full lg:w-56 bg-secondary-button !text-primary hover:bg-secondary-button hover:opacity-90 active:ring-0"><Trash/>Elimina Utente</Button>
            <Button on:click={() => rollbackModal = true} disabled={user.rollback.length !== 0 ? false : true} class="w-full h-full lg:w-56 bg-primary-button hover:bg-primary-button enabled:hover:opacity-90 active:ring-0"><ArrowPathRoundedSquare/>Annulla L'ultima Transazione</Button>
            <Button on:click={() => transactionModal = true} class="w-full h-full lg:w-56 bg-primary-button hover:bg-primary-button hover:opacity-90 active:ring-0"><CurrencyEuro/>Nuova Transazione</Button>    
        </div>
    </div>
    <div class="px-3 pb-3 w-full pt-52 lg:pt-0 lg:h-[calc(100%-5rem)] flex flex-col lg:flex-row justify-start gap-3">
        <div class="w-full h-full lg:w-4/12 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            <BaseCard title="ID Utente"> <!-- Top card -->
                <svelte:fragment slot="icon">
                    <FingerPrint class="w-6 h-6 text-primary"/>
                </svelte:fragment>
                <Span class="font-medium text-lg !text-primary">{user.cardId}</Span>
            </BaseCard>
            <BaseCard title="Dati del profilo"> <!-- Middle card -->
                <svelte:fragment slot="icon">
                    <Identification class="w-6 h-6 text-primary"/>
                </svelte:fragment>
                <svelte:fragment slot="head-left">
                    <Button on:click={() => editModal = true} outline color="dark" class="!border-none !text-primary hover:!bg-transparent hover:!text-accent">modifica</Button>
                </svelte:fragment>
                <ul class="flex flex-col gap-2">
                    <ListItem fieldName={"Nome"} fieldValue={user.name}/>
                    <ListItem fieldName={"Cognome"} fieldValue={user.surname} border={true}/>
                    <ListItem fieldName={"Numero di Telefono"} fieldValue={user.phoneNumber} border={true}/>
                </ul>
            </BaseCard>
            <BaseCard title="Saldo"> <!-- Bottom card -->
                <svelte:fragment slot="icon">
                    <Banknotes class="w-6 h-6 text-primary"/>
                </svelte:fragment>
                <Span class="font-medium text-lg !text-primary">{user.balance}€</Span>
            </BaseCard>
        </div>
        <div class="w-full lg:w-8/12"> <!-- Last Transaction card -->
            <BaseCard title="Cronologia Transazioni">
                <svelte:fragment slot="icon">
                    <ArrowPath class="w-6 h-6 text-primary"/>
                </svelte:fragment>
                {#if user.rollback.length !== 0}
                    {#each user.rollback as transaction}
                        <ul class="grid grid-flow-row lg:grid-flow-col">
                            <!-- TODO: update with new component -->
                            <ListItem fieldName={"Transazione"} fieldValue={transaction.transaction} currency={"€"}/>
                            <ListItem fieldName={"Data Transazione"} fieldValue={`${transaction.createdAt.toLocaleDateString()} ${transaction.createdAt.toLocaleTimeString()}`}/>
                        </ul>
                    {/each}
                {:else}
                    <Heading tag="h6" color="text-gray-500">Nessuna transazione disponibile</Heading>
                {/if}
            </BaseCard>
        </div>
    </div>
</div>


<!-- Edit modal -->
<Modal bind:open={editModal} class="w-full max-w-md" autoclose={false}>
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
                    <Input type="text" name="name" value={user.name || ""} class="focus:border-secondary-button focus:ring-0" />
                </Label>
                <Label class="space-y-2">
                    <Span>Cognome</Span>
                    <Input type="text" name="surname" value={user.surname || ""} class="focus:border-secondary-button focus:ring-0" />
                </Label>
                <Label class="space-y-2">
                    <Span>Numero di telefono</Span>
                    <Input type="tel" name="phoneNumber" value={user.phoneNumber || ""} pattern={"3[0-9]{9}"} class="focus:border-secondary-button focus:ring-0" />
                </Label>
            </div>
            <div class="flex flex-row">
                <Button type="submit" class="mr-2 w-full bg-secondary-button !text-primary hover:bg-secondary-button hover:opacity-90 active:ring-0">Salva</Button>
                <Button on:click={() => editModal = false} class="w-full bg-primary-button hover:bg-primary-button hover:opacity-90 active:ring-0">Annulla</Button>
            </div>
        </div>
    </form>
</Modal>


<!-- Delete modal -->
<Modal bind:open={deleteModal} class="w-full max-w-md" autoclose={false}>
    <form
        method="POST"
        action="?/delete"
        class="flex flex-col space-y-6"
        use:enhance
    >
        <div class="text-center">
            <ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-primary"/>
            <h3 class="mb-5 text-lg font-normal text-primary">Sei sicuro di voler eliminare quest'utente?<br>L'utente verrà disattivato e sarà possibile riattivarlo in seguito.</h3>
            <Button type="submit" class="mr-2 !text-primary bg-secondary-button hover:bg-secondary-button hover:opacity-90 active:ring-0">SI, sono sicuro</Button>
            <Button on:click={() => deleteModal = false} class="bg-primary-button hover:bg-primary-button hover:opacity-90 active:ring-0">NO, torna indietro</Button>
        </div>
    </form>
</Modal>


<!-- Rollback modal -->
<Modal bind:open={rollbackModal} class="w-full max-w-md" autoclose={false}>
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
            <ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-primary"/>
            <Heading tag="h5" class="font-normal text-primary">Sei sicuro di voler annullare la precedente transazione?</Heading>
            <Hr class="my-4" height="h-px" />
            <div class="flex flex-col gap-2">
                <Span class="font-semibold text-primary">Ciò comporta le seguenti modifiche:</Span>
                <div class="max-h-[10rem] overflow-scroll scrollbar-none text-start">
                    <ul>
                        <ListItem fieldName={"Valore restituito"} fieldValue={user.rollback.length !== 0 ? user.rollback[0].transaction * -1 : 0} currency={"€"}/>
                    </ul>
                </div>
            </div>
            <Hr class="my-4" height="h-px" />
            <Button type="submit" class="mr-2 bg-secondary-button !text-primary hover:bg-secondary-button hover:opacity-90 active:ring-0">SI, sono sicuro</Button>
            <Button on:click={() => rollbackModal = false} class="bg-primary-button hover:bg-primary-button hover:opacity-90 active:ring-0">NO, torna indietro</Button>
        </div>
    </form>
</Modal>


<!-- Transaction modal -->
<Modal bind:open={transactionModal} class="w-full max-w-md" autoclose={false}>
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
            <Input min="0.01" step="0.01" type="number" name="amount" placeholder="0" required class="w-24 focus:border-secondary-button focus:ring-0"/>
        </Label>
        <Label class="space-y-2">
            <span>Cashback</span>
            <Input min="0" max="100" type="number" name="cashback" placeholder="0" class="w-24 focus:border-secondary-button focus:ring-0"/>
        </Label>
        <div class="flex flex-row gap-2">
            <Button type="submit" name="operationType" value="-" class="w-full bg-primary-button hover:bg-primary-button hover:opacity-90 active:ring-0">- Sottrai</Button>
            <Button type="submit" name="operationType" value="+" class="w-full !text-primary bg-secondary-button hover:bg-secondary-button hover:opacity-90 active:ring-0">+ Aggiungi</Button>
        </div>
    </form>
</Modal>