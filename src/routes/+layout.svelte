<script>
  import "../app.postcss";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>RaspCard</title>
</svelte:head>

<main class="b-d">
  {#if $page.url.pathname === '/login' || $page.status === 404 || $page.status === 500}
    <div class="h-full w-full flex justify-center items-center">
      <slot />
    </div>
  {:else}
    <Sidebar establishment={$page.data.currentAdmin.establishmentName} seller={$page.data.currentAdmin.name} activeURL={$page.url.pathname}>
      <slot />
    </Sidebar>
  {/if}
</main>
