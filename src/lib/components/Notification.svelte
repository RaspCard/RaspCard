<script lang="ts">
    import { fly } from 'svelte/transition';
    import { Toast } from 'flowbite-svelte';
    import * as Icon from 'svelte-heros-v2';
    
    export let success: boolean | unknown;
    export let message: string | unknown;
    export let checkedDate: Date | undefined;

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

    $: if(checkedDate !== undefined) {
        show = true;
        timeout();
    }
</script>

<div class="flex justify-center w-screen">
    <Toast class="mb-2 absolute w-96 top-20 shadow" color={success ? 'green': 'red'} transition={fly} params="{{x: 200}}" bind:visible={show}> 
        <svelte:fragment slot="icon">
            {#if success}
                <Icon.Check class="w-5 h-5"/>
            {:else}
                <Icon.XMark class="w-5 h-5"/>
            {/if}
        </svelte:fragment>
        {message}
    </Toast>
</div>