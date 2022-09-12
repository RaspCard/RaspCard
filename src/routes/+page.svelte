<script lang="ts">
    import { Button, Modal, Label, Input } from 'flowbite-svelte';
    import Head from '$lib/components/Head.svelte';
    import QrScanner from 'qr-scanner';
    import { onMount } from 'svelte';

    let formModal = false;
    let qrScanner: QrScanner;
    let uuid: string = '';
    let pin: string = '';
    let error: string | undefined;

    let debug: string;

    onMount(async() => {
        const cameras = await QrScanner.listCameras(true);

        let videoElem = document.getElementById('reader') as HTMLVideoElement;

        qrScanner = new QrScanner(
            videoElem,
            result => debug = result.data,
            { /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
        );

        qrScanner.setCamera(cameras[1].id);
        qrScanner.start();
    });

    async function handleLogin() {
        const res = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid,
                pin
            })
        });

        const data = await res.json();

        if(data.success) {
            window.location.href = '/dashboard';
        }

        error = data.message;
    }


    // async function onScanSuccess(decodedText: string) {
    //     console.log(`Code matched = ${decodedText}`);
    //     uuid = decodedText;
    //     setTimeout(async() => {
    //         await html5Qrcode?.stop();
    //     }, 400);
    //     formModal = true;
    // }

    // function onScanFailure(error: string) {
    //     console.warn(`Code scan error = ${error}`);
    // }

    // async function enableCamera() {
    //     setTimeout(() => {
    //         html5Qrcode?.start(
    //             {facingMode: "environment"},
    //             { fps: 10 },
    //             onScanSuccess,
    //             onScanFailure
    //         );
    //     }, 400);
    // }

    // async function disableCamera() {
    //     setTimeout(async() => {
    //         await html5Qrcode?.stop();
    //     }, 400);
    // }
</script>


<div class="container">
    <div>
    </div>
    <div class="reader-container">
        <video id="reader"></video>
    </div>
    <div class="test3">
        <h1>{debug}</h1>
        <p class="text">Impossible to login with the scanner?</p>
        <Button on:click={() => formModal = true}>ID Login</Button>
    </div>
</div>

<Modal bind:open={formModal} size="xs">
    <form on:submit|preventDefault={handleLogin} class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in to our platform</h3>
        <Label class="space-y-2">
            <span>ID</span>
            <Input bind:value={uuid} type="text" name="uuid" required />
        </Label>
        <Label class="space-y-2">
            <span>PIN</span>
            <Input bind:value={pin} type="password" name="password" placeholder="•••••" required />
        </Label>
        <Button type="submit" class="w-full1">Login to your account</Button>
    </form>
    {#if error}
        <h1>Error</h1>
    {/if}
</Modal>


<style>
    .container {
        width: 100vw;
        height: 100vh;

        display: grid;
        grid-template-rows: 50px 1fr 20vh;
    }

    .reader-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100vw;
    }

    #reader {
        width: 100%;
        height: 100%;
        background-color: black;
    }

    .test3 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;

        width: 100vw;
    }

</style>