<script lang="ts">
    import { Card, Button, Label, Input, Heading } from "flowbite-svelte";
    import Scanner from '$lib/components/Scanner.svelte';
    let input: string = "";
</script>

<Scanner on:scan={(event) => input=event.detail.id}/>
<Card class="min-w-[30rem]">
    <form class="flex flex-col space-y-6" method="POST">
        <Heading tag="h3" class="p-0">Accedi a RaspCard</Heading>
        <Label class="space-y-2">
            <span>Email</span>
            <Input name="uuid" type="text" placeholder="il codice della tua carta" required bind:value={input} on:keypress={(event) => event.key != 'Enter'}/>
        </Label>
        <Label class="space-y-2">
            <span>PIN</span>
            <Input type="password" name="password" placeholder="•••••" required on:keypress={(event) => event.key != 'Enter'}/>
        </Label>
        <Button type="submit" class="w-full">Login to your account</Button>
    </form>
</Card>