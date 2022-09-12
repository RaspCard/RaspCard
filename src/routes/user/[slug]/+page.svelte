<script lang="ts">
    import { Button, Modal } from 'flowbite-svelte';
    import * as Icon from 'svelte-heros-v2'
    import Head from '$lib/components/Head.svelte';

    let establishment: string = "STREGATTO";
    let seller: string = "SELLER #1";

    let deleteModal: boolean = false;
</script>

<div class="container-raspcard base-dimention">
    <div>
        <Head establishment={establishment} seller={seller}/>
    </div>
    <Button gradient color="blue"><Icon.CurrencyEuro/> New Transaction</Button>
    <Button color="blue"><Icon.Backward/> Rollback</Button>
    <Button on:click={() => deleteModal = true} gradient color="red"><Icon.Trash/> Delete User</Button>
</div>


<!-- Delete modal -->
<Modal bind:open={deleteModal}>
    <div class="text-center">
        <Icon.ExclamationTriangle class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"/>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
        <Button color="red" class="mr-2">Yes, I'm sure</Button>
        <Button color='alternative'>No, cancel</Button>
    </div>
</Modal>

<style>
    .container-raspcard {
        
    }

    .container-table {
        
    }
</style>