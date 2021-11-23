<script context="module" lang="ts">
    import {createHandoff, getHostUrl, getMe, setFetcher} from "$lib/api/internal";
    import {toDataURL} from "qrcode";

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

        setFetcher(fetch)
        const [host, { hash }] = await Promise.all([getHostUrl(), createHandoff()])

        return {
            status: 200,
            props: {
                host,
                stage: 1,
                data: {
                    hash,
                    code: await toDataURL(hash, {}),
                },
            }
        }
    }
</script>
<script lang="ts">
    import GenericInput from "../../components/input/GenericInput.svelte";
    import GenericButton from "../../components/input/GenericButton.svelte";
    import {onMount} from "svelte";
    import {authoriseUserByName} from "$lib/api/internal";
    import {getBrowserName} from "$lib/helper";

    export let host: string = ""
    let secure: boolean = true

    let server: string = host
    let username: string = ""
    let password: string = ""
    let loading: boolean = false

    let error: string = null

    type HandoffData = {
        hash: string,
        code: string,
    }

    export let data: HandoffData
    export let stage = 0
    let remainingAttempts = 5

    onMount(() => {
        secure = window.location.protocol === "https:"
    })
    const handleLogin = async () => {
        if(server.trim() === "" || username.trim() === "") return error = "Please provide a server and a username"
        else if(!/^(http|https):\/\/[^ "]+$/.test(server) || server.endsWith("/")) return error = "Provide a url like http(s)://HOST.TLD"

        loading = true
        authoriseUserByName(server, username, password, getBrowserName())
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
    div.wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 100%;
        max-width: 700px;

        display: grid;
        grid-template-columns: 400px 1fr;
    }

    aside {
        position: relative;
    }
    aside div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;

        text-align: center;
    }
    aside div[data-stage="1"] {
        padding: 10px;
        border-radius: 10px;
        background-color: white;
    }
    aside img {
        height: 150px;
        width: 150px;
    }
    aside span {
        cursor: pointer;
        margin-top: 10px;
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

    @media screen and (max-width: 750px) {
        div.wrapper {
            max-width: 400px;
            grid-template-columns: 1fr;
        }

        main {

        }
        aside {
            display: none;
        }
    }
</style>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="wrapper">
    <main>
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
    </main>
    <aside>
        <div data-stage={stage}>
            {#if stage === 0}
                <h2 class="dimmed">Loading...</h2>
            {:else if stage === 1}
                <img src={data.code} alt="QR code used for simple login" />
                {#if remainingAttempts <= 0}
                    <span on:click={() => remainingAttempts = 5} class="dimmed">retry</span>
                {/if}
            {/if}
        </div>
    </aside>
</div>