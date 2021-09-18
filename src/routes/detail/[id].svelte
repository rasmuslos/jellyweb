<script lang="ts" context="module">
    import {getItem, setFetcher} from "$lib/api/internal";

    export async function load({ fetch, page }) {
        const { id } = page.params

        if(id === null || id === "null") return { status: 301, redirect: "/" }

        setFetcher(fetch);
        const item = await getItem(id)

        return {
            status: 200,
            props: { item }
        }
    }
</script>
<script lang="ts">
    import type {Item} from "$lib/typings";
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";
    import HeroInner from "../../components/sections/HeroInner.svelte";
    import BackgroundSection from "../../components/sections/BackgroundSection.svelte";
    import {getLargeBackdrop} from "$lib/helper";

    export let item: Item[]

    noPadding.set(true)
    onDestroy(() => noPadding.set(false))

    // console.log(item)
</script>

<BackgroundSection url={getLargeBackdrop(item)}>
    <HeroInner {item} includeMoreButton={false} />
    <!---MEDIA--->
    <!--MEDIA INFO | ALL-->
    <!--CHAPTERS-->
    <!--ACTORS | ALL-->

    <!--SIMILAR | MOVIES    SEASONS | Series-->

    <!---PERSON--->
    <!--MEDIA-->
</BackgroundSection>