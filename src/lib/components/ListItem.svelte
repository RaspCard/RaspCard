<script lang="ts">
    export let fieldName: string;
    export let fieldValue: any;
    export let border: boolean = false;
</script>


<li class="py-2 w-full text-sm font-medium" class:border-t-2={border}>
    <div class="flex items-center space-x-4">
        <div class="flex-1 space-y-1 font-medium">
            <div class="text-base text-gray-500">{fieldName}</div>
            <div class="text-sm">{fieldValue}</div>
        </div>
    </div>
</li>