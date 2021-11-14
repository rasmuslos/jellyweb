<script lang="ts">
    import type {JellyfinItem} from "$lib/typings/jellyfin";
    import {icons} from "feather-icons";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import Chapters from "../sections/Chapters.svelte";
    import PersonList from "../sections/PersonList.svelte";
    import {createEventDispatcher} from "svelte";
    import Hero from "../sections/Hero.svelte";
    import {getMediaData} from "$lib/helper";
    import Stream from "./Stream.svelte";
    import Wave from "../sections/Wave.svelte";
    import {getItem} from "$lib/api/internal";

    export let jellyfinItem: JellyfinItem
    export let returnUrl: string

    let itemPromise = getItem(jellyfinItem.Id, true)
    const streams = getMediaData(jellyfinItem)

    const dispatcher = createEventDispatcher()
    const seek = (ticks: number) => dispatcher("seek", ticks)
</script>

<style>
    div.background {
        padding-top: 125px;
        background-color: var(--background-secondary);
    }
    div.container {
        padding-top: 50px;
        background-color: var(--background);

        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    div.wrapper {
        background-color: var(--background-light);
    }
    div.holder {
        padding: 25px;
    }
    div.streams {
        display: flex;
        flex-wrap: wrap;

        margin: 40px 0;
    }

    a {
        color: var(--dimmed);
        font-size: 20px;

        display: flex;
        align-items: center;
    }
    a :global(svg) {
        margin-right: 10px;
    }
</style>

<div class="background">
    <div class="container">
        <ApplyWidth>
            <a href={returnUrl}>{@html icons["arrow-left"].toSvg({ height: 20, width: 20 })} go Back</a>

            {#await itemPromise}
                <h1>Loading...</h1>
            {:then { item }}
                <Hero hideImage={true} {item} includeMoreButton={false} reduceOffset={true} noButton={true} noImage={true} />
                <Chapters chapters={item.chapters || []} itemId={item.id} handleClick={false} on:click={({detail}) => seek(detail)} />
                <PersonList persons={item.people || []} />
            {:catch error}
                <h1>Error while loading</h1>
            {/await}
        </ApplyWidth>
        <Wave />
        <div class="wrapper">
            <ApplyWidth>
                <div class="holder">
                    <h1>Details</h1>
                    <div class="streams">
                        {#each streams.mediaSources as source}
                            <Stream stream={source} />
                        {/each}
                    </div>
                    <div class="streams">
                        {#each streams.audioStreams.concat(streams.subtitleStreams) as stream}
                            {#if stream.Index !== -1}
                                <Stream {stream} />
                            {/if}
                        {/each}
                    </div>
                </div>
            </ApplyWidth>
        </div>
    </div>
</div>