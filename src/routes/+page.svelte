<script lang="ts">
    import { Button, Modal, Label, Input } from 'flowbite-svelte';
    import  {Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
    import { onMount } from 'svelte';


    let formModal = false;
    let isScanning = false;
    let html5Qrcode: Html5Qrcode | undefined;
    let uuid: string = '';

    onMount(() => {
        html5Qrcode = new Html5Qrcode(
            "reader",
        );
    });

    async function onScanSuccess(decodedText: string) {
        console.log(`Code matched = ${decodedText}`);
        uuid = decodedText;
        await html5Qrcode?.stop();
        isScanning = false;
        formModal = true;
    }

    function onScanFailure(error: string) {
        console.warn(`Code scan error = ${error}`);
    }

    async function changeScan() {
        isScanning = !isScanning;
        if(isScanning) {
            html5Qrcode?.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                onScanSuccess,
                onScanFailure
            )
        } else {
            await html5Qrcode?.stop();
        }
    }
</script>
  

<div>
    <div class="reader">
        <reader id="reader" />
        <Button  on:click={changeScan} pill={true} class="!p-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg></Button>
    </div>
    <div class="test3">
        <p class="text">Impossible to login with the scanner? ID Login</p>
        <Button on:click={() => formModal = true}>Form modal</Button>
    </div>
</div>

<Modal bind:open={formModal} size="xs">
    <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in to our platform</h3>
        <Label class="space-y-2">
            <span>ID</span>
            <Input bind:value={uuid} type="text" name="uuid" required />
        </Label>
        <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" name="password" placeholder="•••••" required />
        </Label>
        <Button type="submit" class="w-full1">Login to your account</Button>
    </form>
</Modal>


<h1>{uuid}</h1>


<style>
    .reader {
        box-sizing: border-box;

        /* Auto layout */

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding: 0px 0px 20px;

        width: 100vw;
        height: 90vh;

        border: 1px solid #000000;

        /* Inside auto layout */

        flex: none;
        order: 0;
        align-self: stretch;
        flex-grow: 1;
    }

    .test3 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: 100vw;
        height: 10vh;

        /* Inside auto layout */

        flex: none;
        order: 1;
        align-self: stretch;
        flex-grow: 0;
    }
</style>