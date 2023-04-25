<script lang="ts">
    import { P, Heading, Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import Scanner from "$lib/components/Scanner.svelte";
    import Chart from "$lib/components/Chart.svelte";
    import type { PageData } from './$types';

    export let data: PageData;

    let userChartSettings = {
        type: 'doughnut',
        options: {
            responsive: true
        },
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
<div class="p-4 flex flex-col lg:items-start items-center gap-4">
    <Heading class="!text-gray-700" tag="h2">Bentornato {data.currentAdmin.name}</Heading>
    <div class="flex flex-col lg:flex-row gap-2">
        <Card class="p-4 rounded-md w-full lg:w-auto">
            <div class="flex flex-col">
                {#each data.latestTransactions as transaction}
                    <div class="flex flex-row gap-4">
                        <span>{transaction.createdAt.toLocaleTimeString()}</span>
                        <span>{transaction.user.cardId}</span>
                        <span>{transaction.transaction}</span>
                    </div>
                {/each}
            </div>
        </Card>
        <Card class="p-4 rounded-md w-full lg:w-auto">
            <div class="flex flex-col items-center">
                <Heading tag="h5" class="!text-gray-700 text-center">Utenti Registrati</Heading>
                <div class="w-full flex flex-row items-center justify-center gap-5 sm:gap-0 sm:flex-col sm:items-center">
                    <Chart divClass="w-24 h-24 sm:w-40 sm:h-40" chartName={"users"} data={userChartSettings}/>
                    <div class="flex flex-row gap-2 text-base">
                        <div class="flex flex-col">
                            <div class="flex flex-row items-center gap-1">
                                <div class="w-3 h-3 rounded-sm bg-green-700"></div>
                                <span>Utenti Attivi</span>
                            </div>
                            <div class="flex flex-row items-center gap-1">
                                <div class="w-3 h-3 rounded-sm bg-slate-400"></div>
                                <span>Utenti Disattivati</span>
                            </div>
                        </div>
                        <div class="flex flex-col font-extrabold">
                            <span>{data.activeUsersCount}</span>
                            <span>{data.inactiveUsersCount}</span>
                        </div>
                    </div>
                </div>
            <div/>
        </Card>
    </div>
</div>