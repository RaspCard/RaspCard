<script lang="ts">
    import { browser } from "$app/environment";
    import { onDestroy, onMount, createEventDispatcher } from "svelte";
    //@ts-ignore
    import onScan from "onscan.js";

    const dispatch = createEventDispatcher();

    onMount(() => {
        if (onScan.isAttachedTo(document)) return;

        onScan.attachTo(document, {
            onScan: function(sScanned: string, iQty: number) {
                dispatch("scan", { id: sScanned });
            }
        });
    });

    onDestroy(() => {
        if (browser && onScan.isAttachedTo(document)) onScan.detachFrom(document);
    });
</script>