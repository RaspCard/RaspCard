<script lang="ts">
    import { enhance } from "$app/forms";
    import { Button } from "flowbite-svelte";

    export let cardId: string;
    export let name: string | null;
    export let surname: string | null;
    export let phoneNumber: string | null;
    export let active: boolean;
</script>

<tr class="h-12">
    <td>{cardId}</td>
    <td>{name}</td>
    <td>{surname}</td>
    <td>{phoneNumber}</td>
    <td>
        {#if active}
            <Button href={`/users/${cardId}`} outline>
                Modifica
            </Button>
        {:else}
            <form
                action={`/users/${cardId}?/active`}
                method="POST"
                use:enhance
            >
                <Button type="submit" outline color="green">Riattiva</Button>
            </form>
        {/if}
    </td>
</tr>