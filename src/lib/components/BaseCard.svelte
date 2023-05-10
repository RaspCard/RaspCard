<script lang="ts">
    import { Card } from 'flowbite-svelte';

    export let title: string;
</script>


<Card class="max-h-[50vh] lg:max-h-[85%] !p-3" size="xl">
    <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
            <slot name="icon"/>
            <h5 class="text-xl font-bold leading-none text-gray-500 dark:text-white">
                {title}
            </h5>
        </div>
        <slot name="head-left"/>
    </div>
    <div class="overflow-scroll scrollbar-none">
        <slot/>
    </div>
</Card>