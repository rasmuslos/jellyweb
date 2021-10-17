<script context="module" lang="ts">
    import {getHostUrl, setFetcher, me as getMe} from "$lib/api/internal";

    export async function load({ fetch, session }) {
        if(session.active != null) {
            try {
                setFetcher(fetch)
                await getMe(false)

                return {
                    status: 302,
                    redirect: "/",
                }
            } catch (error) {
                return {
                    status: 302,
                    redirect: "/user/logout",
                }
            }
        }

        try {
            setFetcher(fetch)
            const host = await getHostUrl()

            return {
                status: 200,
                props: { host }
            }
        } catch(error) {
            return {
                status: 200,
            }
        }
    }
</script>
<script lang="ts">
    import GenericInput from "../../components/input/GenericInput.svelte";
    import GenericButton from "../../components/input/GenericButton.svelte";
    import {onMount} from "svelte";
    import {login} from "$lib/api/internal";
    import {getBrowserName} from "$lib/helper";

    export let host: string = ""
    let secure: boolean = true

    let server: string = host
    let username: string = ""
    let password: string = ""
    let loading: boolean = false

    let error: string = null

    onMount(() => {
        secure = window.location.protocol === "https:"
    })
    const handleLogin = async () => {
        if(server.trim() === "" || username.trim() === "") return error = "Please provide a server and a username"
        else if(!/^(http|https):\/\/[^ "]+$/.test(server) || server.endsWith("/")) return error = "Provide a url like http(s)://HOST.TLD"

        loading = true
        login(server, username, password, getBrowserName())
            .then(() => window.location.href = "/")
            .catch(err => {
                console.error(err)

                loading = false
                error = "Login failed"
            })
    }

    const handleKeydown = (event: KeyboardEvent) => event.key === "Enter" && handleLogin()
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
    p.error, span.error {
        color: var(--error);
    }
</style>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div>
    <h1>Login</h1>
    <span class="dimmed">{server}</span>
    <p>
        Login with your Jellyfin account credentials
        <span class="highlight">This application wont store your password</span>
        {#if !secure}
            <span class="error">
                This connection is not secure
            </span>
        {/if}
    </p>
    {#if error}
        <p class="error">
            {error}
        </p>
    {/if}
    <GenericInput type="url" placeholder="Server" bind:value={server} on:keydown={handleKeydown} disabled={host !== ""} />
    <GenericInput type="name" placeholder="Username" bind:value={username} on:keydown={handleKeydown} />
    <GenericInput type="password" placeholder="Password" bind:value={password} on:keydown={handleKeydown} />
    <figure class="center">
        <GenericButton label="Login" on:click={handleLogin} />
    </figure>
</div>