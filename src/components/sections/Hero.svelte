<script lang="ts">
    import type {Item} from "$lib/typings";
    import {generateImageUrl, getResolutionText} from "$lib/helper";
    import WatchNowButton from "../input/WatchNowButton.svelte";

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
            <img src={generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 200)} alt="Movie Poster">
            <div class="details">
                {#if tip}
                    <p class="tip">{tip}</p>
                {/if}
                <div class="heading">
                    <h1>{item.Name} - {item.ProductionYear}</h1>
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