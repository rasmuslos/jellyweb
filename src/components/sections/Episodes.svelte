<script lang="ts">
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import type {Item} from "$lib/typings/internal";
    import {t} from "$lib/i18n"
    import {generateItemUrl, getBadge} from "$lib/helper";
    import {icons} from "feather-icons";
    import {getEpisodes} from "$lib/api/internal";
    import ItemImage from "../helper/item/ItemImage.svelte";
    import ItemBadges from "../helper/ItemBadges.svelte";
    import {browser} from "$app/env";

    export let selected: string
    export let showId: string

    let episodes: Item[]
    export let seasons: Item[]

    let expanded
    let active

    selected = selected ?? seasons[0].id
    const updateEpisodes = async () => episodes = await getEpisodes(selected, showId)

    $: active = seasons.find(seasons => seasons.id === selected)
    $: browser && window.history.replaceState({}, document.title, generateItemUrl(showId, selected))
    $: if(!episodes || episodes.length < 1 || episodes[0].showData.seasonId != selected) updateEpisodes().catch(console.error)
</script>

<style>
    h3 {
        margin: 75px 0;
        color: var(--red);

        font-weight: 600;
        text-align: center;
    }

    div.seasons {
        position: relative;
        display: inline-block;
    }
    div.content {
        position: absolute;
        z-index: 2;

        display: none;
        flex-direction: column;

        background-color: var(--background-light);
    }

    h1 {
        width: 100%;
        margin: 0;
    }
    div.content a {
        font-weight: 700;

        padding: 20px;

        white-space: nowrap;
        word-break: keep-all;
    }

    div.seasons:hover div.content, div.seasons.expanded div.content {
        display: flex;
    }

    h1 :global(svg) {
        margin-left: 3px;
        transition: transform 250ms ease;
    }
    div.seasons:hover h1 :global(svg), .seasons.expanded h1 :global(svg) {
        transform: rotate(180deg);
    }

    div.episodes {
        display: flex;
        flex-wrap: wrap;
    }
    a.episode {
        display: grid;
        grid-template-columns: auto 1fr;

        flex: 1 0 calc(50% - 40px);
        margin: 20px;
    }
    a.episode div.inner {
        margin-left: 20px;
    }

    @media screen and (max-width: 1000px) {
        a.episode {
            grid-template-columns: 1fr;
        }
        a.episode div.image {
            display: none;
        }
    }
</style>

<section>
    <ApplyWidth>
        {#if active == null}
            <h3>{$t("episodes.error")}</h3>
        {:else}
            <div class:expanded class="seasons">
                <h1 class="active" on:click={() => expanded = !expanded}>{active.name}{@html icons["chevron-down"].toSvg()}</h1>
                <div class="content" on:click={() => expanded = false}>
                    {#each seasons as {id, name}}
                        <a href={generateItemUrl(showId, id)} on:click|preventDefault={() => selected = id}>{name}</a>
                    {/each}
                </div>
            </div>
            <div class="episodes">
                {#if !episodes || episodes.length < 1}
                    <h3>{$t("episodes.loading")}</h3>
                {:else}
                    {#each episodes as episode}
                        <a class="episode" href={generateItemUrl(episode.id)}>
                            <div class="image">
                                <ItemImage small badge={getBadge(episode)} item={episode} />
                            </div>
                            <div class="inner">
                                <h1>{episode.name}</h1>
                                {#if episode.overview}
                                    <p>{episode.overview}</p>
                                {/if}
                                {#if episode.badges}
                                    <ItemBadges badges={episode.badges} />
                                {/if}
                            </div>
                        </a>
                    {/each}
                {/if}
            </div>
        {/if}
    </ApplyWidth>
</section>