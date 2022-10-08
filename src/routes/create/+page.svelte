<script lang="ts">
    import { Button, Label, Input, Toast, Helper } from 'flowbite-svelte';
    import { slide } from 'svelte/transition';
    import * as Icon from 'svelte-heros-v2';
    import HeadWithButtons from '$lib/components/HeadWithButtons.svelte';
    import type { PageData, ActionData } from './$types';
    import { applyAction, enhance } from '$app/forms';

    let show: boolean = false;

    function timeout() {
        let counter = 6;

        const trigger = () : NodeJS.Timeout | void => {
            if (--counter > 0)
                return setTimeout(trigger, 1000);
            show = false;
        };

        trigger();
    }

    export let form: ActionData;
    export let data: PageData;
    const { currentAdmin } = data;
</script>

<div class="flex justify-center w-screen">
    <Toast class="mb-2 absolute w-96 top-20 shadow" color={form?.success === true ? 'green': 'red'} transition={slide} bind:visible={show}> 
        <svelte:fragment slot="icon">
            {#if form?.success === true}
                <Icon.Check class="w-5 h-5"/>
            {:else}
                <Icon.XMark class="w-5 h-5"/>
            {/if}
        </svelte:fragment>
        {form?.message}
    </Toast>
</div>


<div class="container-raspcard b-d">
    <HeadWithButtons establishment={currentAdmin.establishmentName} seller={currentAdmin.name}/>
    <form
        class="form-container"
        method="POST"
        use:enhance={() => {
            return async ({ result, form }) => {
                if(result.type === "success") form.reset();
                
                show = true;
                timeout();

                await applyAction(result);
            }
        }}
    >
        <div class="m-4 mt-6">
            <div>
                <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900">Create a new card</h1>
                <p class="mb-6 text-lg font-normal text-gray-500">
                    All the fields are optional, but for a more simple management is preferable
                </p>
            </div>
            <div class="container-content w-3/4">
                <div class="w-full flex flex-col gap-4">
                    <Label class="space-y-2">
                        <span>Name</span>
                        <Input autocomplete="off" type="text" name="name" />
                    </Label>
                    <Label class="space-y-2">
                        <span>Surname</span>
                        <Input autocomplete="off" type="text" name="surname" />
                    </Label>
                    <Label class="space-y-2">
                        <span>Phone number</span>
                        <Input autocomplete="off" type="number" name="phoneNumber" />
                    </Label>
                </div>
                <div class="flex flex-col gap-4">
                    <Label class="space-y-2">
                        <span>Migration ID</span>
                        <Input autocomplete="off" type="number" name="migrationID" />
                    </Label>
                    <Label class="space-y-2">
                        <span>Initial Deposit</span>
                        <Input autocomplete="off" type="number" name="deposit" />
                        <Helper class='text-sm'>CashBack applied of 20%</Helper>
                    </Label>
                </div>
            </div>
        </div>
        <div class="m-4 bottom-button-container">
            <Button type="submit" gradient color="blue" class="w-72 h-20"><Icon.Plus class="mr-2 -ml-1 w-7 h-7"/>Create Card</Button>
        </div>
    </form>
</div>


<style>
    .container-raspcard {
        display: flex;
        flex-direction: column;
    }

    .form-container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .container-content {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .bottom-button-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
</style>