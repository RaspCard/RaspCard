<script lang="ts">
    import { fly } from 'svelte/transition';
    import { Toast } from 'flowbite-svelte';
    import { Check, XMark } from 'svelte-heros-v2';
    
    export let success: boolean | unknown;
    export let message: string | unknown;
    export let checkedDate: Date | undefined;

    let show: boolean = false;
    
    function timeout() {
        let counter = 3;

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

<Toast simple class="fixed w-96 right-10 top-10 shadow" color={success ? 'green': 'red'} transition={fly} params="{{x: 200}}" bind:open={show}> 
    <svelte:fragment slot="icon">
        {#if success}
            <Check class="w-5 h-5"/>
        {:else}
            <XMark class="w-5 h-5"/>
        {/if}
    </svelte:fragment>
    {message}
</Toast>