<script lang="ts">
    import { P, Heading, Card } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import Scanner from "$lib/components/Scanner.svelte";
    import Chart from "$lib/components/Chart.svelte";

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
                "#825f0d",
                "#f2ecdb"
                ],
                circumference: 240,
                rotation: 240
            }]
        }
    }
</script>

<Scanner on:scan={e => goto(`/users/${e.detail.id}`)}/>
<div class="p-4 flex flex-col lg:items-start items-center gap-4">
    <Heading class="!text-primary" tag="h2">Bentornato {data.currentAdmin.name}</Heading>
    <div class="flex flex-col md:flex-row gap-2">
        <Card class="p-4 w-full lg:w-auto shadow">
            <!-- TODO: update card with new table -->
            <div class="flex flex-col">
                {#each data.latestTransactions as transaction}
                    <div class="flex flex-row gap-4 font-mono">
                        <span>{transaction.createdAt.toLocaleTimeString()}</span>
                        <span>{transaction.user.cardId}</span>
                        <span>{transaction.transaction}</span>
                    </div>
                {/each}
            </div>
        </Card>
        <Card class="p-4 w-full lg:w-auto shadow text-primary">
            <div class="flex flex-col items-center">
                <Heading tag="h5" class="text-center">Utenti Registrati</Heading>
                <div class="w-full flex flex-row items-center justify-center gap-5 sm:gap-0 sm:flex-col sm:items-center">
                    <Chart divClass="w-24 h-24 sm:w-40 sm:h-40" chartName={"users"} data={userChartSettings}/>
                    <div class="flex flex-row gap-2 text-base">
                        <div class="flex flex-col">
                            <div class="flex flex-row items-center gap-1">
                                <div class="w-3 h-3 rounded-sm bg-accent"></div>
                                <span>Utenti Attivi</span>
                            </div>
                            <div class="flex flex-row items-center gap-1">
                                <div class="w-3 h-3 rounded-sm bg-secondary-button"></div>
                                <span>Utenti Disattivati</span>
                            </div>
                        </div>
                        <div class="flex flex-col font-semibold">
                            <span>{data.activeUsersCount}</span>
                            <span>{data.inactiveUsersCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</div>