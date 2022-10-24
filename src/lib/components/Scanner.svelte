<script lang="ts">
    //@ts-ignore
    import onScan from "onscan.js";
    import { onDestroy, onMount, createEventDispatcher } from "svelte";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";

    const dispatch = createEventDispatcher();

    onMount(() => {
        onScan.attachTo(document, {
            onScan: function(sScanned: string, iQty: number) {
                dispatch("scan", { id: sScanned });
            }
        });
    });

    onDestroy(() => {
        if (browser) onScan.detachFrom(document);
    });

</script>