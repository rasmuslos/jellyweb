<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {setFetcher} from "$lib/api/internal";
    import {getExtendedItem, getItemsStarring, getSimilarItems} from "$lib/api/internal/methods/v3";

    export const load: Load = async ({fetch, session, page}) => {
        if(session.data == null) return {
            status: 302,
            redirect: "/auth/login"
        }

        setFetcher(fetch)
        const id = page.params?.id
        const item = await getExtendedItem(id)

        let similar
        let media

        if(item.type === "movie" || item.type === "series") similar = getSimilarItems(item.id)
        if(item.type === "person") media = getItemsStarring(item.id)

        // Resolve all promises simultaneously
        await Promise.all([similar, media])

        return {
            props: {
                item,
                similar: await similar,
                media: await media,
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
    import {icons} from "feather-icons";
    import {getVideoRange} from "$lib/helper";
    import {getItemPath} from "$lib/helper";
    import Title from "../../../components/hero/Title.svelte";
    import Chapters from "../../../components/util/Chapters.svelte";
    import People from "../../../components/util/People.svelte";
    import ItemList from "../../../components/util/ItemList.svelte";
    import Image from "../../../components/item/Image.svelte";
    import {applyMaxHeight, wrap} from "$lib/helper";

    export let item: ExtendedItem
    export let similar: Item[]
    export let media: Item[]

    console.log(media)

    const range = getVideoRange(item)
</script>

<Push />
{#if item.type === "movie" || item.type === "series" || item.type === "season" || item.type === "episode"}
    {#if item.type === "movie" || item.type === "series"}
        <Hero {item} />
    {:else}
        <Title {item} />
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
                {#if item.seriesInfo}
                    <div class="series">
                        <a href={getItemPath(item.seriesInfo.show)}>{item.seriesInfo.showName}</a>
                        {#if item.seriesInfo.season}
                            · <a href={getItemPath(item.seriesInfo.season)}>{item.seriesInfo.seasonName}</a>
                        {/if}
                    </div>
                {/if}
                <div class="meta">
                    {#if item.ratings?.audience}
                        <span>{@html icons["star"].toSvg({ "fill": "#F5C518", "stroke": "#F5C518", })} {item.ratings?.audience}</span>
                    {/if}
                    {#if item.ratings?.critic}
                        <span>{item.ratings?.critic}%</span>
                    {/if}
                    {#if range}
                        <span>{range.toUpperCase()}</span>
                    {/if}
                    <!--
                    {#if item.mediaSources?.[0].container}
                        <span>{item.mediaSources?.[0].container}</span>
                    {/if}
                    -->
                </div>
                <div class="genres">
                    {#if item.genres}
                        {#each item.genres as {id, name}}
                            <a href={getItemPath(id)}>{name}</a>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </ApplyMeasurements>
    <Push big />
    {#if item.chapters?.length}
        <Push />
        <Chapters chapters={item.chapters} />
    {/if}
    {#if item.people?.length}
        <Push />
        <People people={item.people} />
    {/if}
    {#if similar?.length}
        <ApplyMeasurements>
            <Push />
            <h2>{$_("items.sections.similar")}</h2>
            <ItemList items={similar} />
        </ApplyMeasurements>
    {/if}
{:else if item.type === "genre"}
    <ApplyMeasurements>
        <div class="heading">
            <h1>{item.name}</h1>
        </div>
    </ApplyMeasurements>
{:else if item.type === "person"}
    <ApplyMeasurements smaller>
        <div class="heading">
            <h1>{item.name}</h1>
        </div>
        <div class="person">
            <div class="image">
                <Image url={wrap(applyMaxHeight(item.images?.primary?.url, 300))} alt={item.name} />
            </div>
            <p>
                {item.overview}
            </p>
        </div>
    </ApplyMeasurements>
    {#if media?.length}
        <ApplyMeasurements>
            <Push />
            <h2>{$_("items.sections.media")}</h2>
            <!--TODO: Replace with lazy loading list-->
            <ItemList items={media} />
        </ApplyMeasurements>
    {/if}
{/if}
<Push />

<style>
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
    div.meta {
        display: inline-block;
        color: var(--grey);

        padding-right: 7px;
        margin-right: 7px;
        border-right: 1px solid var(--grey);
    }
    div.meta :global(svg) {
        position: relative;
        top: 1px;

        height: 15px;
        width: 15px;
    }
    div.meta span {
        margin-right: 4px;
    }
    div.series {
        display: inline-block;
        color: var(--grey);

        padding-right: 10px;
        margin-right: 5px;
        border-right: 1px solid var(--grey);
    }
    div.genres {
        display: inline-block;
    }
    div.genres a {
        margin-right: 6px;
        color: var(--grey);
    }

    div.heading {
        width: 100%;
    }
    div.heading h1 {
        font-size: 60px;
        text-align: center;

        background-clip: text;
        -webkit-background-clip: text;

        color: transparent;
        background-image: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);

        margin: 0 auto;
        width: fit-content;
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
        border-radius: 50%;

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