<script lang="ts">
    import { Badge } from "flowbite-svelte";

    export let fieldName: string;
    export let fieldValue: any;
    export let currency: string | undefined = "";
    export let border: boolean = false;

    function isNumber(value: any) {
        return typeof value === "number";
    }
</script>


<li class="py-2 w-full text-sm font-medium" class:border-t-2={border}>
    <div class="flex items-center space-x-4">
        <div class="flex-1 space-y-1 font-medium">
            <div class="text-base text-gray-500">{fieldName}</div>
            <div class="text-sm">
                {`${fieldValue}${currency !== undefined ? currency : ""}`}
                {#if isNumber(fieldValue) && fieldValue < 0}
                    <Badge class="ml-2" large={true} color="red">PAGAMENTO</Badge>
                {:else if isNumber(fieldValue) && fieldValue > 0}
                    <Badge class="ml-2" large={true} color="green">DEPOSITO</Badge>
                {/if}
            </div>
        </div>
    </div>
</li>