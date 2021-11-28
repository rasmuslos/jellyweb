<script lang="ts">
    import ApplyWidth from "../components/helper/sections/ApplyWidth.svelte";
    import {browser} from "$app/env";
    import {onMount} from "svelte";
    import jsQR from "jsqr";
    import {getMe, postHandoffData, sendPassword} from "$lib/api/internal";
    import GenericInput from "../components/input/GenericInput.svelte";
    import GenericButton from "../components/input/GenericButton.svelte";
    import LargeHeading from "../components/helper/LargeHeading.svelte";

    let found: string
    let password = null
    let supported = false
    let failed = false
    let done = false
    let text = "loading..."

    let video: HTMLVideoElement
    let canvas: HTMLCanvasElement
    let canvasData: CanvasRenderingContext2D

    onMount(() => {
        video = document.createElement("video")
        canvasData = canvas.getContext("2d")

        if(browser && navigator && "mediaDevices" in navigator && canvas && canvasData && video) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                .then(stream => {
                    video.srcObject = stream
                    video.playsInline = true
                    video.muted = true
                    video.play()

                    supported = true
                    text = "loading video..."
                    requestAnimationFrame(tick)
                })
        }
    })

    const foundCode = async (code: string) => {
        if(found) return

        text = "Fetching user info..."
        found = code

        const { Name } = await getMe()

        try {
            await postHandoffData(code, {
                name: Name,
            })
        } catch (error) {
            failed = true
        }

        text = "Enter Password to confirm..."
        password = ""
    }
    const tick = () => {
        if(video.readyState === video.HAVE_ENOUGH_DATA) {

            text = "looking for code..."
            canvas.height = video.videoHeight
            canvas.width = video.videoWidth

            canvasData.drawImage(video, 0, 0, canvas.width, canvas.height)

            const imageData = canvasData.getImageData(0, 0, canvas.height, canvas.width)
            const code = jsQR(imageData.data, imageData.width, imageData.height)

            if(code) foundCode(code.data)
        }

        if(!found) requestAnimationFrame(tick)
    }

    const finish = async () => {
        try {
            await sendPassword(found, password)
            done = true
        } catch (error) {
            failed = true
        }
    }
</script>

<style>
    div {
        text-align: center;
    }

    canvas {
        display: block;
        margin: 0 auto;

        max-width: 100%;
    }
    code {
        display: block;
        word-break: break-all;
        margin-bottom: 20px;
    }
</style>

<ApplyWidth>
    <div>
        <LargeHeading>Quick Login</LargeHeading>
        {#if failed}
            <h2 class="error">Handoff failed</h2>
        {:else if done}
            <h2>Done!</h2>
        {:else}
            {#if !found}
                <canvas bind:this={canvas}></canvas>
            {/if}
            {#if !supported}
                <h1 class="error">You device doesnt support quick login</h1>
            {:else}
                <p>{text}</p>
                {#if found}
                    {#if password === null}
                        <code>{found}</code>
                    {:else}
                        <GenericInput type="password" placeholder="Password" bind:value={password} />
                        <figure class="center">
                            <GenericButton label="Login" on:click={finish} />
                        </figure>
                    {/if}
                {/if}
            {/if}
        {/if}
    </div>
</ApplyWidth>