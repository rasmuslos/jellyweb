<script lang="ts">
    import type {Item} from "$lib/typings";
    import {generateImageUrl, getResolutionText} from "$lib/helper";
    import WatchNowButton from "../input/WatchNowButton.svelte";
    import { icons } from "feather-icons"

    export let item: Item
    export let tip: string = null
</script>

<style>
    section {
        overflow: hidden;

        background-color: var(--background-light);
        background-repeat: no-repeat;
        background-size: cover;
    }
    div.inner {
        display: grid;
        grid-template-columns: 200px 1fr;
        align-items: normal;

        width: 100%;
        max-width: 1000px;

        padding: 0 25px;
        margin: 225px auto;
    }

    div.image {
        position: relative;
        cursor: pointer;
    }
    img {
        display: block;
    }
    div.overlay {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }
    div.progress {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        opacity: 0.4;
        background: linear-gradient(45deg, rgba(143,188,187,1) 0%, rgba(94,129,172,1) 100%);
    }
    div.play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        opacity: 0;
        transition: opacity 150ms ease;
    }
    div.image:hover div.play {
        opacity: 1;
    }

    div.details {
        display: flex;
        flex-direction: column;

        min-height: 300px;
        padding: 0 50px;
    }
    p.tip {
        margin: 0;
        color: var(--highlight);
    }
    div.heading {
        display: flex;
        align-items: center;
    }
    div.heading h1 {
        font-size: 40px;
        font-weight: 600;

        margin: 0 10px 0 0;
    }
    div.heading span {
        margin: 0 5px;
        padding: 5px 7px;
        font-size: 12px;
        border-radius: 7px;
        background-color: var(--background);

        border: 1px solid var(--text);
    }
    div.watch {
        display: block;
        margin: auto auto auto 0;
    }
</style>

<!--
{#if item}
-->
    <section style="background-image: url('{item.BackdropImageTags && item.BackdropImageTags.length > 0 ? generateImageUrl(item.Id, item.BackdropImageTags[0], `Backdrop`) : ``}')">
        <div class="inner">
            <div>
                <div class="image">
                    <img src={generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 200)} alt="Movie Poster">
                    <div style="width: {item.UserData.PlayedPercentage}%" class="progress"></div>
                    <div class="overlay"></div>
                    <div class="play">
                        {@html icons.play.toSvg({ height: 50, width: 50 })}
                    </div>
                </div>
            </div>
            <div class="details">
                {#if tip}
                    <p class="tip">{tip}</p>
                {/if}
                <div>
                    <div class="heading">
                        <h1>{item.Name}</h1>
                        <span>{getResolutionText(item)}</span>
                        {#if item.OfficialRating}
                            <span>{item.OfficialRating}</span>
                        {/if}
                        {#if item.CommunityRating}
                            <span>{item.CommunityRating}</span>
                        {/if}
                        {#if item.CriticRating}
                            <span>{item.CriticRating}%</span>
                        {/if}
                        <span>{item.HasSubtitles ? "CC" : "/"}</span>
                    </div>
                    {#if item.SeasonName && item.SeriesName}
                        <span class="dimmed">{item.SeasonName} - {item.SeriesName}</span>
                    {/if}
                </div>
                <p>{item.Overview}</p>

                <div class="watch">
                    <WatchNowButton/>
                </div>
            </div>
        </div>
    </section>
<!--
{/if}
-->