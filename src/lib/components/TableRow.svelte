<script lang="ts">
    import { enhance } from "$app/forms";
    import { Button } from "flowbite-svelte";

    export let cardId: string;
    export let name: string | null;
    export let surname: string | null;
    export let phoneNumber: string | null;
    export let active: boolean;
</script>

<tr class="h-12 border-t-[1px] border-stone-200">
    <td class="pl-2">{cardId}</td>
    <td class="truncate">{name}</td>
    <td class="truncate">{surname}</td>
    <td>{phoneNumber}</td>
    <td class="pr-2">
        {#if active}
            <Button href={`/users/${cardId}`} class="bg-primary-button !text-secondary hover:opacity-90 hover:bg-primary-button focus:!ring-0">Modifica</Button>
        {:else}
            <form
                action={`/users/${cardId}?/active`}
                method="POST"
                use:enhance
            >
                <Button type="submit" class="bg-secondary-button !text-primary hover:opacity-90 hover:bg-secondary-button focus:!ring-0">Riattiva</Button>
            </form>
        {/if}
    </td>
</tr>