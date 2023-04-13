<script lang="ts">
    import { P, Heading, Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import Scanner from "$lib/components/Scanner.svelte";
    import Chart from "$lib/components/Chart.svelte";
    import type { PageData } from './$types';

    export let data: PageData;

    let userChartSettings = {
        type: 'doughnut',
        data: {
            labels: [
                'attivi',
                'disattivati'
            ],
            datasets: [{
                label: 'UserChart',
                data: [data.activeUsersCount, data.inactiveUsersCount],
                backgroundColor: [
                '#15803d',
                '#94a3b8'
                ],
                circumference: 240,
                rotation: 240
            }]
        }
    }
</script>

<Scanner on:scan={e => goto(`/users/${e.detail.id}`)}/>
<div class="p-4 flex flex-col items-start gap-4">
    <Heading tag="h2">Benvenuto</Heading>
    <Card class="p-4 rounded-md">
        <div class="flex flex-row">
            <div class="flex flex-col items-center">
                <Heading tag="h5" class="mb-2">Utenti Registrati</Heading>
                <Chart chartName={"users"} data={userChartSettings}/>
            </div>
        </div>
    </Card>
</div>