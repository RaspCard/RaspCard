<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { goto } from "$app/navigation";
</script>

<h1>
    Error
</h1>
<Button on:click={() => goto("/")}>Vai alla Home</Button>