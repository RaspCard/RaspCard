<script lang="ts">
    import { Card } from 'flowbite-svelte';

    export let title: string;
</script>


<Card class="m-3 max-h-[90%]" size="xl" padding="lg">
    <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {title}
        </h5>
        <slot name="head"/>
    </div>
    <div class="overflow-scroll scrollbar-none">
        <slot/>
    </div>
</Card>