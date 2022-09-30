<script lang="ts">
    import { goto } from '$app/navigation';
    import type { JsonResponse } from '$lib/types';
    let userUUID: string = '';

    async function handleLogin() {
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
            console.log("ok");
            goto("/dashboard");
        }
    }
</script>



<input bind:value={userUUID} type="text">
<button on:click="{handleLogin}">Login</button>