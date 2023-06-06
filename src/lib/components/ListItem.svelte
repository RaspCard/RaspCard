<script lang="ts">
    import { Badge } from "flowbite-svelte";

    export let vertical: boolean = false;
    export let badge: boolean = false;
    export let fieldName: string;
    export let fieldValue: any;
    export let currency: string | undefined = "";
    export let width: string = "w-fit";

    function isNumber(value: any) {
        return typeof value === "number";
    }
</script>

{#if vertical}
<li class={"flex flex-col gap-1 font-medium " + width} >
    <span class="text-base font-bold">{fieldName}</span>
    {#if badge && fieldValue < 0}
        <Badge class="!bg-secondary-button !text-accent" large={true}>PAGAMENTO</Badge>
    {:else if badge && fieldValue > 0}
        <Badge class="!bg-primary-button !text-secondary" large={true}>DEPOSITO</Badge>
    {/if}
    <span>{`${fieldValue}${currency !== undefined ? currency : ""}`}</span>
</li>
{:else}
<li class="w-full text-sm font-medium">
    <div class="flex items-center space-x-4">
        <div class="flex-1 space-y-1 font-medium text-primary">
            <span class="text-base font-bold">{fieldName}</span>
            <div class="text-sm flex flex-row gap-2">
                {`${fieldValue}${currency !== undefined ? currency : ""}`}
                {#if badge && fieldValue < 0}
                    <Badge class="!bg-secondary-button !text-accent" large={true}>PAGAMENTO</Badge>
                {:else if badge && fieldValue > 0}
                    <Badge class="!bg-primary-button !text-secondary" large={true}>DEPOSITO</Badge>
                {/if}
            </div>
        </div>
    </div>
</li>
{/if}