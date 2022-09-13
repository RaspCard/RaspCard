<script lang="ts">
    import { Button, Modal, Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import * as Icon from 'svelte-heros-v2'
    import Head from '$lib/components/Head.svelte';
    import BaseCard from '$lib/components/BaseCard.svelte';

    let establishment: string = "STREGATTO";
    let seller: string = "SELLER #1";

    let user;


    let deleteModal: boolean = false;
</script>


<div class="container-raspcard b-d">
    <div class="m-4 container-header">
        <Head establishment={establishment} seller={seller}/>
        <div class="container-buttons">
            <Button on:click={() => goto("/scanner")} gradient color="blue" class="w-56"><Icon.CreditCard class="mr-2 -ml-1 w-7 h-7"/>Scan</Button>
            <Button on:click={() => goto("/dashboard")} gradient color="blue" class="w-56"><Icon.RectangleGroup class="mr-2 -ml-1 w-7 h-7"/>Dashboard</Button>
        </div>
    </div>
    <div class="container-content">
        <div>
            <div> <!-- Top card -->
                <BaseCard title="Profile Data">
                    <ul class="container-profile-data">
                        <li class="py-2 px-4 w-full text-sm font-medium">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 space-y-1 font-medium">
                                    <div class="text-base text-gray-500">Name</div>
                                    <div class="text-sm">{null}</div>
                                </div>
                            </div>
                        </li>
                        <li class="py-2 px-4 w-full text-sm font-medium border-t-2">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 space-y-1 font-medium">
                                    <div class="text-base text-gray-500">Surname</div>
                                    <div class="text-sm">{null}</div>
                                </div>
                            </div>
                        </li>
                        <li class="py-2 px-4 w-full text-sm font-medium border-t-2">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 space-y-1 font-medium">
                                    <div class="text-base text-gray-500">PhoneNumber</div>
                                    <div class="text-sm">{null}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </BaseCard>
            </div>
            <div> <!-- Bottom card -->
                <BaseCard title="Balance">

                </BaseCard>
            </div>
        </div>
        <div> <!-- Last Transaction card -->
            <BaseCard title="Last Transaction">

            </BaseCard>
        </div>
        <div> <!-- Func card -->
            <BaseCard title="Field">

            </BaseCard>
        </div>
    </div>
    <div class="m-4 bottom-buttons-container">
        <Button on:click={() => deleteModal = true} gradient color="red"><Icon.Trash/> Delete User</Button>
        <div class="container-buttons">
            <Button gradient color="blue" class="w-56"><Icon.Backward/>Rollback</Button>
            <Button gradient color="blue" class="w-56"><Icon.CurrencyEuro/>New Transaction</Button>    
        </div>
    </div>
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
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 10vh 80vh 10vh;
    }

    .container-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .container-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 1rem;
    }

    .container-profile-data {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .container-content {
        display: grid;
        grid-template-columns: 30vw 30vw 40vw;
        grid-template-rows: auto;
    }

    .bottom-buttons-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>