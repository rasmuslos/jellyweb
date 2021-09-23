<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";

    export async function load({ fetch, page }) {
        const { id } = page.params

        try {
            setFetcher(fetch);
            const { item } = await getItem(id, false)

            return {
                status: 200,
                props: { item }
            }
        } catch(error) {
            return {
                status: 301,
                redirect: "/error"
            }
        }
    }
</script>
<script lang="ts">
    import BackgroundSection from "../../components/helper/BackgroundSection.svelte";
    import type {Item, PlaybackInfo} from "$lib/typings";
    import {bitrateTest, getLargeBackdrop} from "$lib/helper";
    import {onDestroy, onMount} from "svelte";
    import {startPlayback, stopPlayback} from "$lib/api/internal";
    import {bitrate} from "$lib/stores";
    import deviceProfile from "$lib/deviceProfile";
    import browser from "$lib/browser";
    import {session} from "$app/stores";

    export let item: Item

    let id: string
    let liveStreamId: string
    let src: string

    const playItem = async () => {
        if(!browser) return

        await bitrateTest($session.active)
        const response: PlaybackInfo = await startPlayback(item.Id, {
            DeviceProfile: {
                ...deviceProfile(),
            },
            UserId: $session.active.userId,
            MaxStreamingBitrate: $bitrate,
            AutoOpenLiveStream: true,
            StartTimeTicks: 0,
        })

        id = response.PlaySessionId
        liveStreamId = response.MediaSources[0].LiveStreamId

        src = `${$session.active.server}${response.MediaSources[0].TranscodingUrl}`
    }
    onMount(playItem)
    onDestroy(() => stopPlayback(liveStreamId))
</script>

<style>
    div.wrapper {
        display: block;
        position: relative;

        width: 100%;
        height: 100%;
    }

    video {
        height: 100%;
        width: 100%;
    }
</style>

<div class="wrapper">
    <BackgroundSection url={getLargeBackdrop(item)}>
        <video controls autoplay {src}></video>
    </BackgroundSection>
</div>