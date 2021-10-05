<script lang="ts">
    import type {Item} from "$lib/typings";
    import {icons} from "feather-icons";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import Chapters from "../sections/Chapters.svelte";
    import PersonList from "../sections/PersonList.svelte";
    import {createEventDispatcher} from "svelte";
    import Hero from "../sections/Hero.svelte";

    export let item: Item
    export let returnUrl: string

    const dispatcher = createEventDispatcher()
    const seek = (ticks: number) => dispatcher("seek", ticks)

    console.log(item)
</script>

<style>
    section {
        padding: 40px;
        margin-bottom: 200px;
    }
    div {
        padding: 25px;
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

<section>
    <a href={returnUrl}>{@html icons["arrow-left"].toSvg({ height: 20, width: 20 })} go Back</a>
    <ApplyWidth>
        <Hero hideImage={true} item={item} includeMoreButton={false} reduceOffset={true} noButton={true} noImage={true} />
        <Chapters chapters={item.Chapters || []} itemId={item.Id} handleClick={false} on:click={({detail}) => seek(detail)} />
        <PersonList persons={item.People || []} />
        <div>
            <h1>Details</h1>
        </div>
    </ApplyWidth>
</section>