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
    <Navbar username={$page.data.currentAdmin.name} systemName={$page.data.currentAdmin.establishmentName}/>
    <div class="h-20"></div>
    <div class="w-full h-[calc(100svh-5rem)]">
      <slot />
    </div>
  {:else}
    <div class="h-full w-full flex justify-center items-center">
      <slot />
    </div>
  {/if}
</main>
