<script lang="ts">
    import { Button, Label, Input, Heading, P, Span } from 'flowbite-svelte';
    import { Plus } from 'svelte-heros-v2';
    import toast, { Toaster } from 'svelte-french-toast';
    import { applyAction, enhance } from '$app/forms';
    import Scanner from '$lib/components/Scanner.svelte';


    let cardID: string = "";
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
                Tutti i campi sono facoltativi, ma per una gestione più semplice è preferibile l'inserimento di tutti i dati.
            </P>
        </div>
        <div class="container-content w-full lg:w-3/4 overflow-scroll scrollbar-none">
            <div class="w-full flex flex-col gap-4">
                <Label class="space-y-2">
                    <Span>ID carta</Span>
                    <Input bind:value={cardID} autocomplete="off" required type="text" name="cardId" placeholder="ID numerico" size="lg"/>
                </Label>
                <Label class="space-y-2">
                    <Span>Nome</Span>
                    <Input autocomplete="off" type="text" name="name" placeholder="Nome" size="lg"/>
                </Label>
                <Label class="space-y-2">
                    <Span>Cognome</Span>
                    <Input autocomplete="off" type="text" name="surname" placeholder="Cognome" size="lg"/>
                </Label>
                <Label class="space-y-2">
                    <Span>Numero di Telefono</Span>
                    <Input autocomplete="off" type="tel" name="phoneNumber" placeholder="+39" size="lg" pattern={"3[0-9]{9}"}/>
                </Label>
            </div>
        </div>
    </div>
    <div class="lg:fixed lg:bottom-4 w-screen flex justify-center lg:right-4 lg:w-72">
        <Button type="submit" gradient color="green" class="m-4 w-full lg:m-0 lg:w-72 h-20 text-lg"><Plus class="mr-2 -ml-1 w-7 h-7"/>Crea la Carta</Button>
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