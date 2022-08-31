<script lang="ts">
    import type { JsonResponse } from '$lib/types';
    let userUUID: string = '';

    async function handleLogin() {
        console.log("ok");

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: userUUID
            })
        });

        const data: JsonResponse  = await response.json();

        if(data.success) {
            window.location.href = '/';
        }
    }
</script>



<input bind:value={userUUID} type="text">
<button on:click="{handleLogin}">Register</button>