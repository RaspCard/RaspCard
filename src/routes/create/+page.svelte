<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import type { ActionData } from './$types';
    import { Button, Label, Input } from 'flowbite-svelte';
    import * as Icon from 'svelte-heros-v2';
    import Notification from '$lib/components/Notification.svelte';

    export let form: ActionData;

    let checkedDate: Date | undefined;
</script>

<Notification success={form?.success} message={form?.message} checkedDate={checkedDate}/>

<div class="container-raspcard">
    <form
        on:keypress={(event) => event.key !== 'Enter'}
        class="form-container"
        method="POST"
        use:enhance={() => {
            return async ({ result, form }) => {
                if(result.type === "success") form.reset();
                
                checkedDate = new Date();

                await applyAction(result);
            }
        }}
    >
        <div class="m-4 mt-6">
            <div>
                <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900">Crea una carta</h1>
                <p class="mb-6 text-lg font-normal text-gray-500">
                    Tutti i campi sono facoltativi, ma per una gestione più semplice è preferibile l'inserimento di tutti i dati.
                </p>
            </div>
            <div class="container-content w-3/4">
                <div class="w-full flex flex-col gap-4">
                    <Label class="space-y-2">
                        <span>ID carta</span>
                        <Input autocomplete="off" required type="text" name="cardId" size="lg"/>
                    </Label>
                    <Label class="space-y-2">
                        <span>Nome</span>
                        <Input autocomplete="off" type="text" name="name" size="lg"/>
                    </Label>
                    <Label class="space-y-2">
                        <span>Cognome</span>
                        <Input autocomplete="off" type="text" name="surname" size="lg"/>
                    </Label>
                    <Label class="space-y-2">
                        <span>Numero di Telefono</span>
                        <Input autocomplete="off" type="number" name="phoneNumber" size="lg"/>
                    </Label>
                </div>
                <div class="flex flex-col gap-4">
                    <Label class="space-y-2">
                        <span>Deposito iniziale</span>
                        <Input autocomplete="off" min="0" step="0.01" type="number" name="deposit" size="lg"/>
                    </Label>
                </div>
            </div>
        </div>
        <div class="m-4 bottom-button-container">
            <Button type="submit" gradient color="green" class="w-72 h-20 text-lg"><Icon.Plus class="mr-2 -ml-1 w-7 h-7"/>Crea la Carta</Button>
        </div>
    </form>
</div>


<style>
    .container-raspcard {
        display: flex;
        flex-direction: column;
    }

    .form-container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
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