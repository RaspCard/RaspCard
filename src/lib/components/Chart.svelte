<script lang="ts">
    import { onMount } from 'svelte';
    import { Chart, DoughnutController, ArcElement } from 'chart.js';

    export let chartName: string;
    export let data: any;
    export let divClass: string;

    // Update register to make the component handle the registration
    Chart.register(DoughnutController);
    Chart.register(ArcElement);

    onMount(() => {
        let ctx = document.getElementById(chartName) as HTMLCanvasElement;
        new Chart(ctx, data).render();
    });
</script>

<div class={divClass}>
    <canvas id={chartName}></canvas>
</div>