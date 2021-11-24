<script context="module" lang="ts">
    import {createHandoff, getHostUrl, getMe, setFetcher} from "$lib/api/internal";
    import {toDataURL} from "qrcode";

    enum Stage {
        LOADING,
        WAITING,
        PASSWORD,
        CONFIRMATION,

        FAILED,
    }

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
        const [host, { hash, ...handoffData }] = await Promise.all([getHostUrl(), createHandoff()])
        // @ts-ignore
        const code = await toDataURL(hash, {
            color: {
                light: "#00000000",
                dark: "#2E3440",
            },
            margin: 0,
        })

        return {
            status: 200,
            props: {
                host,
                stage: Stage.WAITING,
                data: {
                    ...handoffData,
                    hash,
                    code,
                },
            }
        }
    }
</script>
<script lang="ts">
    import GenericInput from "../../components/input/GenericInput.svelte";
    import GenericButton from "../../components/input/GenericButton.svelte";
    import {onDestroy, onMount} from "svelte";
    import {authoriseUserByName, getHandoffStatus, getSession} from "$lib/api/internal";
    import {getBrowserName, hash as hashString} from "$lib/helper";

    export let host: string = ""
    let secure: boolean = true

    let server: string = host
    let username: string = ""
    let password: string = ""
    let loading: boolean = false

    let error: string = null

    type HandoffData = {
        hash: string,
        secret: string,
        code: string,

        name?: string,
        userId?: string,
        avatar?: number,
    }

    export let data: HandoffData
    export let stage: Stage = Stage.LOADING

    // We make a request every two seconds and the handoff expires after 5 minutes
    let remainingAttempts = 30 * 5
    let interval: number

    onMount(() => {
        secure = window.location.protocol === "https:"

        interval = window.setInterval(async () => {
            if((stage === Stage.WAITING || stage === Stage.PASSWORD) && remainingAttempts > 0) {
                try {
                    const { name, userId, ready } = await getHandoffStatus(data.hash)
                    remainingAttempts--

                    if(name && userId) {
                        const hashed = hashString(userId)

                        data = {
                            ...data,
                            name,
                            userId,
                            avatar: hashed,
                        }
                        stage = Stage.PASSWORD
                    }
                    if(ready) {
                        stage = Stage.CONFIRMATION
                        clearInterval(interval)
                    }
                } catch (error) {
                    stage = Stage.FAILED
                    clearInterval(interval)
                    console.error("Handoff failed", error)
                }
            }
        }, 2000)
    })
    onDestroy(() => {
        if(interval) clearInterval(interval)
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
    const retrieveSession = async (destroy: boolean = true) => {
        getSession(data.hash, destroy === false ? data.secret : null)
            .then(() => window.location.href = "/")
            .catch(err => {
                console.error(err)
                stage = Stage.FAILED
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
    aside div[data-stage] {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    aside div[data-stage="1"] {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;

        padding: 15px 15px;
        border-radius: 10px;

        background-color: var(--background-secondary);
    }
    aside div[data-stage="1"] p {
        margin: 10px 0 0 0;
    }
    aside div[data-stage="1"] img {
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

    div.image {
        display: block;
        margin: 0 auto 10px auto;
        border-radius: 50%;

        position: relative;
        width: 100px;
        height: 100px;

        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
    }
    div.image span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-weight: 600;
        font-size: 26px;

        color: var(--black);
        margin: 0;
    }
    p.dimmed span {
        text-align: left;
        color: var(--text);
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
            {#if stage === Stage.LOADING}
                <h2 class="dimmed">Loading...</h2>
            {:else if stage === Stage.FAILED}
                <h2 class="error">Handoff failed</h2>
            {:else if stage === Stage.WAITING}
                <img src={data.code} alt="QR code used for simple login" />
                <p class="dimmed">Login with other device</p>
            {:else if stage === Stage.PASSWORD || stage === Stage.CONFIRMATION}
                <div class="image" style="background: linear-gradient({data.avatar % 360}deg, hsl({data.avatar % 360}, 95%, 50%), hsl({data.avatar + 120 % 360}, 95%, 50%))">
                    <span>{data.name.split(" ").map(str => str[0]).join("")}</span>
                </div>
                <p class="dimmed">
                    Logging in as <span>{data.name}</span>...
                </p>
                {#if stage === Stage.CONFIRMATION}
                    <figure class="center">
                        <GenericButton label="Yes, this is me" on:click={() => retrieveSession(false)} />
                        <span class="error" on:click={() => retrieveSession(true)}>Abort</span>
                    </figure>
                {/if}
            {/if}
        </div>
    </aside>
</div>