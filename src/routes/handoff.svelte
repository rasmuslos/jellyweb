<script lang="ts">
    import ApplyWidth from "../components/helper/sections/ApplyWidth.svelte";
    import {browser} from "$app/env";
    import {onMount} from "svelte";
    import jsQR from "jsqr";
    import {getMe} from "$lib/api/internal";

    let found: string
    let supported = false
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

        const me = getMe(true)
    }
    const tick = () => {
        if(video.readyState === video.HAVE_ENOUGH_DATA) {
            text = "looking for code..."
            canvas.height = video.videoHeight
            canvas.width = video.videoWidth

            canvasData.drawImage(video, 0, 0, canvas.height, canvas.width)

            const imageData = canvasData.getImageData(0, 0, canvas.height, canvas.width)
            const code = jsQR(imageData.data, imageData.width, imageData.height)

            if(code) found = code.data
        }

        if(!found) requestAnimationFrame(tick)
    }
</script>

<style>
    canvas {
        display: block;
        margin: 0 auto;

        max-width: 100%;
    }
    code {
        word-break: break-all;
    }
</style>

<ApplyWidth>
    {#if !found}
        {#if !supported}
            <h1 class="error">You device doesnt support quick login</h1>
        {/if}

        <p>{text}</p>
        <canvas bind:this={canvas}></canvas>
    {:else}
        <p>Processing code...</p>
        <code>{found}</code>
    {/if}
</ApplyWidth>