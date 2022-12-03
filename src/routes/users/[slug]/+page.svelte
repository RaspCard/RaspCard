<script lang="ts">
    import { Button, Modal, Listgroup, Input, Label, Heading, Span, Hr, Radio } from 'flowbite-svelte';
    import { Trash, ArrowPathRoundedSquare, CurrencyEuro, ExclamationTriangle } from 'svelte-heros-v2'
    import type { ActionData, PageData } from './$types';
    import { applyAction, enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import BaseCard from '$lib/components/BaseCard.svelte';
    import ListItem from '$lib/components/ListItem.svelte';
    import Notification from '$lib/components/Notification.svelte';

    export let data: PageData;
    export let form: ActionData;
    $: ({ user } = data );

    let list: any[] = [];

    let deleteModal: boolean = false;
    let transactionModal: boolean = false;
    let rollbackModal: boolean = false;
    let editModal: boolean = false;

    let checkedDate: Date | undefined;
</script>

<Notification success={form?.success} message={form?.message} checkedDate={checkedDate}/>

<div class="flex flex-col h-full">
    <div class="w-full h-full flex flex-col lg:flex-row justify-start">
        <div class="w-full lg:w-[30vw]">
            <BaseCard title="Dati del profilo"> <!-- Top card -->
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
                <div class="w-full flex items-center text-lg">
                    <Span class="font-medium text-lg text-gray-500">{user.balance}€</Span>
                </div>
            </BaseCard>
        </div>
        <div class="w-full lg:w-[30vw]"> <!-- Last Transaction card -->
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
        <div class="w-full lg:w-[40vw]"> <!-- Func card -->
            <BaseCard title="Dati Speciali">
                {#if list.length > 0}
                    <ul>
                        {#each [] as item}
                            <ListItem fieldName={""} fieldValue={null} border={true}/>
                        {/each}
                    </ul>
                    <div class="text-lg text-gray-500 border-t-2 my-2">{"Field"}</div>
                    <Listgroup items={list} let:item class="border-0">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 space-y-1 font-medium">
                                <div>{item.name}</div>
                                <div class="text-sm text-gray-500">{item.status}</div>
                            </div>
                            <Button gradient color="blue" class="h-8">Details</Button>
                        </div>
                    </Listgroup>
                {:else}
                    <Heading tag="h6" color="text-gray-500">Nessun Informazione Disponibile</Heading>
                {/if}
            </BaseCard>
        </div>
    </div>
    <div class="w-full lg:w-auto lg:fixed lg:bottom-4 lg:right-4">
        <div class="m-4 lg:m-0 flex flex-col lg:flex-row align-middle gap-4">
            <Button on:click={() => deleteModal = true} gradient color="red" class="w-full lg:w-56"><Trash/>Elimina Utente</Button>
            <Button on:click={() => rollbackModal = user.rollback?.active ? true : false} gradient color="green" class="w-full lg:w-56"><ArrowPathRoundedSquare/>Annulla L'ultima Transazione</Button>
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
            return async ({ result, form }) => {
                form.reset();
                invalidateAll();
                await applyAction(result);
                editModal = false;
                checkedDate = new Date();
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
            return async ({ result }) => {
                invalidateAll();
                await applyAction(result);
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
                        <ListItem fieldName={"Effettuare La Transazione:"} fieldValue={(user.balance - (user.rollback?.balance || 0)) * -1} currency={"€"}/>
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
        on:keypress={e => e.key == "Enter" ? e.preventDefault() : null}
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