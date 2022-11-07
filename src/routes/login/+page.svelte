<script lang="ts">
    import Scanner from '$lib/components/Scanner.svelte';
    let input: HTMLInputElement;
</script>

<Scanner on:scan={(event) => input.value=event.detail.id}/>

<form method="POST">
    <input bind:this={input} name="uuid" type="text" on:keypress={(event) => event.key != 'Enter'}>
    <button type="submit">Login</button>
</form>