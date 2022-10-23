<script lang="ts">
    //@ts-ignore
    import onScan from "onscan.js";
    import { onDestroy, onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";


    onMount(() => {
        onScan.attachTo(document, {
            onScan: function(sScanned: string, iQty: number) {
                goto(`/users/${sScanned}`);
            }
        });
    });

    onDestroy(() => {
        if (browser) onScan.detachFrom(document);
    });

</script>