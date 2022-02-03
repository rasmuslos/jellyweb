<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {setFetcher} from "$lib/api/internal";
    import {
        getEpisodesOfSeason, getEpisodesOfSeasonExtended,
        getExtendedItem,
        getNextUpItem, getSeasons,
        getSimilarItems
    } from "$lib/api/internal/methods/v3";

    export const load: Load = async ({fetch, params}) => {
        setFetcher(fetch)
        const id = params.id
        const item = await getExtendedItem(id)

        let nextUp
        let similar
        let seasons
        let episodes

        // When type == season return the first item instead
        if(item.type === "season") {
            episodes = await getEpisodesOfSeasonExtended(item.seriesInfo?.show, item.id)
            const nextUp = episodes?.find(item => item.userData?.position > 0) ?? episodes?.find(item => item.userData?.watched === false) ?? episodes?.[0]

            if(!nextUp) return { status: 404 }
            return {
                props: {
                    item: nextUp,
                    episodes,
                }
            }
        }

        if(item.type === "movie" || item.type === "series") similar = getSimilarItems(item.id)
        if(item.type === "series") {
            nextUp = getNextUpItem(item.id)
            seasons = getSeasons(item.id)
        }
        if(item.type === "episode") {
            episodes = getEpisodesOfSeason(item.seriesInfo?.show, item.seriesInfo?.season)
            // seasons = getSeasons(item.seriesInfo?.show)
        }

        // Resolve all promises simultaneously
        await Promise.all([similar, episodes, seasons, nextUp])

        return {
            props: {
                item,
                nextUp: await nextUp,
                similar: await similar,
                seasons: await seasons,
                episodes: await episodes,
            }
        }
    }
</script>
<script lang="ts">
    import type {ExtendedItem, Item} from "$lib/typings";
    import ApplyMeasurements from "../../../components/ApplyMeasurements.svelte";
    import Push from "../../../Push.svelte";
    import Hero from "../../../components/hero/Hero.svelte";
    import Button from "../../../components/form/Button.svelte";
    import {_} from "svelte-i18n";
    import Title from "../../../components/hero/Title.svelte";
    import Chapters from "../../../components/util/Chapters.svelte";
    import People from "../../../components/util/People.svelte";
    import ItemList from "../../../components/util/ItemList.svelte";
    import Image from "../../../components/item/Image.svelte";
    import {applyMaxHeight, wrap} from "$lib/helper";
    import {onDestroy, onMount} from "svelte";
    import {currentItemId} from "$lib/stores";
    import List from "../../../components/util/List.svelte";
    import SmallItem from "../../../components/item/SmallItem.svelte";
    import Meta from "../../../components/item/Meta.svelte";
    import Fields from "../../../components/item/Fields.svelte";
    import {getItemPath} from "$lib/helper";
    import LazyList from "../../../components/util/LazyList.svelte";
    import Heading from "../../../components/hero/Heading.svelte";

    export let item: ExtendedItem
    export let nextUp: Item
    export let similar: Item[]
    export let seasons: Item[]
    export let episodes: Item[]

    let episodesList: HTMLDivElement

    $: currentItemId.set(item.id)
    onMount(() => currentItemId.set(item.id))
    onDestroy(() => $currentItemId === item.id && currentItemId.set(null))

    $: {
        const current = episodesList?.querySelector(`[data-id="${item.id}"]`)
        const sibling = current?.nextElementSibling

        if(sibling) sibling.scrollIntoView(false)
        else if(current) current.scrollIntoView(false)
    }
</script>

<svelte:head>
    <title>{item.name}</title>
</svelte:head>

{#if item.type === "movie" || item.type === "series" || item.type === "episode"}
    <Push />
    {#if item.type === "movie" || item.type === "series"}
        <Hero {item} />
    {:else}
        <Title {item} />
    {/if}
    {#if nextUp}
        <ApplyMeasurements smaller>
            <a href={getItemPath(nextUp.id)} class="nextUp">
                <h4>{$_("items.sections.nextUp", { values: { name: nextUp.name }})} · <span>{nextUp.seriesInfo?.seasonName}</span></h4>
            </a>
        </ApplyMeasurements>
    {/if}
    <ApplyMeasurements smaller>
        <div class="sub">
            <div class="actions">
                <Button large highlight>{$_("items.actions.play")}</Button>
                <Button large>{$_("items.actions.like")}</Button>
                <Button large>{$_("items.actions.watched")}</Button>
            </div>
            <div>
                <p class="overview">
                    {item.overview ?? "?"}
                </p>
                <Meta {item} />
            </div>
        </div>
    </ApplyMeasurements>
    <Push />
    <!--START: SECTIONS-->
    {#if seasons?.length}
        <Push smaller />
        <ApplyMeasurements>
            <List title="items.sections.seasons" increaseGap>
                {#each seasons as season}
                    <SmallItem item={season} />
                {/each}
            </List>
        </ApplyMeasurements>
    {/if}
    {#if episodes?.length}
        <Push smaller />
        <div bind:this={episodesList}>
            <ApplyMeasurements>
                <ItemList items={episodes} wide stretch title="items.sections.episodes" values={{ season: item.seriesInfo?.seasonName ?? item.name }} />
            </ApplyMeasurements>
        </div>
    {/if}
    {#if similar?.length}
        <Push smaller />
        <ApplyMeasurements>
            <ItemList items={similar} title="items.sections.similar" />
        </ApplyMeasurements>
    {/if}
    {#if item.chapters?.length}
        <Push smaller />
        <Chapters chapters={item.chapters} />
    {/if}
    {#if item.people?.length}
        <Push smaller />
        <People people={item.people} />
    {/if}
    {#if item.type === "movie" || item.type === "episode"}
        <Push />
        <Fields {item} />
    {:else}
        <Push />
    {/if}
{:else if item.type === "genre"}
    <Push />
    <Heading>{item.name}</Heading>
    <Push />
    <LazyList query="Items?SortOrder=Ascending&SortBy=SortName&IncludeItemTypes=Movie,Series&GenreIds={item.id}" />
    <Push />
{:else if item.type === "person"}
    <Push />
    <ApplyMeasurements smaller>
        <Heading>{item.name}</Heading>
        <div class="person">
            <div class="image">
                <Image url={wrap(applyMaxHeight(item.images?.primary?.url, 300))} alt={item.name} />
            </div>
            <p>
                {item.overview ?? $_("items.description.unavailable")}
            </p>
        </div>
    </ApplyMeasurements>
    <Push />
    <LazyList query="Items?SortOrder=Ascending&SortBy=SortName&IncludeItemTypes=Movie,Series&PersonIds={item.id}" align="left" title="items.sections.media" size="normal" />
    <Push />
{:else if item.type === "boxset"}
    <Push />
    <Hero {item} />
    <Push />
    <LazyList query="Items?SortOrder=Ascending&SortBy=Release&IncludeItemTypes=Movie&ParentId={item.id}" align="left" title="items.sections.items" size="normal" />
    <Push />
{:else}
    🤔 {item.type}
{/if}

<style>
    a.nextUp {
        text-align: center;
    }
    a.nextUp span {
        color: var(--grey);
    }

    div.sub {
        display: grid;
        grid-template-columns: 300px 1fr;

        margin-top: 25px;
    }
    div.actions {
        margin-right: 40px;
    }
    p.overview {
        margin-top: 10px;
    }

    div.person {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: auto 1fr;

        align-items: center;

        margin-top: 50px;
    }
    div.person .image {
        width: 200px;
        height: 200px;

        margin: 17px 50px 0 0;
        overflow: hidden;
        align-self: flex-start;
    }
    div.person .image h1 {
        text-align: center;
    }

    :global(#root.mobile) div.sub {
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
    }
    :global(#root.mobile) div.actions {
        width: 100%;
    }

    :global(#root.mobile) div.person {
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;

        align-items: center;
        justify-content: center;
    }
    :global(#root.mobile) div.person div.image {
        display: block;
        margin: 0 auto 25px auto;
    }
</style>