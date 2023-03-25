<script>
  import "../app.postcss";
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
  <title>RaspCard</title>
</svelte:head>

<main class="w-screen h-screen">
  {#if $page.data.currentAdmin}
    <Navbar />
    <div style="height: calc(100vh - 6rem)" class="w-full">
      <slot />
    </div>
  {:else}
    <div class="h-full w-full flex justify-center items-center">
      <slot />
    </div>
  {/if}
</main>
