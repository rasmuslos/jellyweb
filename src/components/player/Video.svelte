<script lang="ts">
    import {onDestroy} from "svelte";
    import {source} from "$lib/stores";

    let src: string
    let video: HTMLVideoElement

    let hlsInstance

    let unsubscribe = source.subscribe(source => {
        if(source == null) return
        if(hlsInstance) hlsInstance.destroy()

        const { type, url } = source

        if(type === "direct") src = url
        else src = null
    })
    onDestroy(unsubscribe)
</script>

<style>
    video {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }
</style>

<video
        autoplay playsinline
        {src}
        bind:this={video}>
</video>