<script context="module">
    export async function load({ session }) {
        if(session != null) return {
            status: 302,
            redirect: "/",
        }
        else return { status: 200 }
    }
</script>
<script lang="ts">
    import GenericInput from "../../components/input/GenericInput.svelte";
    import {HOST} from "$lib/env";
    import GenericButton from "../../components/input/GenericButton.svelte";
    import {onMount} from "svelte";

    let username: string = ""
    let password: string = ""
    let loading: boolean = false
    let error: string = null

    let client
    const uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);

    onMount(async () => {
        const {ApiClient} = await import("jellyfin-apiclient")
        client = new ApiClient(HOST, "Jellyweb", "0.0.1", "JELLYWEB-BETA", uuid)
    })

    const handleLogin = async () => {
        if(client == null) return error = "Please wait a few seconds"

        client.authenticateUserByName(username, password)
            .then(async data => {
                await fetch("/api/v1/session/store", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: data.AccessToken,
                    }),
                })
                console.log(data)
                window.location.href = "/"
            })
            .catch(err => {
                console.error(err.toString())

                loading = false
                error = "Login failed"
            })
    }
</script>

<style>
    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 100%;
        max-width: 400px;
    }

    h1 {
        display: inline-block;

        font-size: 50px;
        margin-bottom: 0;
        margin-right: 5px;
    }
    p:last-of-type {
        margin-bottom: 20px;
    }
    p.error {
        color: var(--error);
    }
</style>

<div>
    <h1>Login</h1>
    <span class="dimmed">{HOST}</span>
    <p>
        Login with your Jellyfin account credentials
        <span class="highlight">This application wont store your password</span>
    </p>
    {#if error}
        <p class="error">
            {error}
        </p>
    {/if}
    <GenericInput type="name" placeholder="Username" bind:value={username} />
    <GenericInput type="password" placeholder="Password" bind:value={password} />
    <GenericButton label="Login" on:click={handleLogin} />
</div>