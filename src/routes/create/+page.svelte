<script lang="ts">
    import { Button, Label, Input, Heading, P, Span, A } from 'flowbite-svelte';
    import { Plus } from 'svelte-heros-v2';
    import toast, { Toaster } from 'svelte-french-toast';
    import { enhance } from '$app/forms';
    import Scanner from '$lib/components/Scanner.svelte';

    let cardID = "";
    let cardDisabled = true;
</script>


<Toaster/>
<Scanner on:scan={e => cardID = e.detail.id}/>

<form
    on:keypress={e => e.key == "Enter" ? e.preventDefault() : null}
    class="form-container"
    method="POST"
    use:enhance={() => {
        return async ({ result, form }) => {
            if(result.type === "success") {
                form.reset();
                toast.success(result.data?.message);
            } else if(result.type === "failure") {
                toast.error(result.data?.message);
            }
        }
    }}
>
    <div class="m-4 mt-6">
        <div>
            <Heading tag="h2" class="mb-4 text-gray-700">Crea una carta</Heading>
            <P size="lg" weight="normal" color="text-gray-500" class="mb-6">
                Tutti i campi sono facoltativi, ma per una gestione più semplice è preferibile l'inserimento di tutti i dati. <br>
                La raccolta dei dati personali è soggetta al consenso dell'utente. Creando la carta l'utente accetta i <A href="/tos" class="!text-accent">termini di servizio</A> per l'utilizzo del servizio.
            </P>
        </div>
        <div class="container-content w-full lg:w-3/4 overflow-scroll scrollbar-none">
            <div class="w-full flex flex-col gap-4">
                <Label class="space-y-2">
                    <Span>ID carta</Span>
                    <div class="w-full flex flex-row gap-2">
                        <Input bind:value={cardID} disabled={cardDisabled} autocomplete="off" required type="text" name="cardId" placeholder="ID numerico" size="lg" class="focus:ring-0 focus:border-secondary-button"/>
                        <Button on:click={() => cardDisabled = !cardDisabled} class="bg-primary-button hover:bg-primary-button hover:opacity-90 focus:!ring-0">Inserisci manualmente</Button>
                    </div>
                </Label>
                <Label class="space-y-2">
                    <Span>Nome</Span>
                    <Input autocomplete="off" type="text" name="name" placeholder="Nome" size="lg" class="focus:ring-0 focus:border-secondary-button"/>
                </Label>
                <Label class="space-y-2">
                    <Span>Cognome</Span>
                    <Input autocomplete="off" type="text" name="surname" placeholder="Cognome" size="lg" class="focus:ring-0 focus:border-secondary-button"/>
                </Label>
                <Label class="space-y-2">
                    <Span>Numero di Telefono</Span>
                    <Input autocomplete="off" type="tel" name="phoneNumber" placeholder="+39" size="lg" pattern={"3[0-9]{9}"} class="focus:ring-0 focus:border-secondary-button"/>
                </Label>
            </div>
        </div>
    </div>
    <div class="w-full flex justify-center h-20 p-4 lg:p-0 lg:fixed lg:bottom-4 lg:right-4 lg:w-44">
        <Button type="submit" class="w-full h-full text-lg bg-primary-button hover:bg-primary-button hover:opacity-90 focus:!ring-0"><Plus class="mr-2 -ml-1 w-7 h-7"/>Crea la Carta</Button>
    </div>
</form>


<style>
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
</style>