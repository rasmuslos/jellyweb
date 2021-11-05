<script lang="ts">
    import ApplyWidth from "../sections/ApplyWidth.svelte";
    import type {SortItem} from "$lib/typings";
    import {t} from "$lib/i18n";
    import {orderBy, sortOrder, updatePreference} from "$lib/helper";

    export let value: string = ""

    const Sort = {
        SORT_NAME: {
            title: "sort.title",
            query: "SortName",
        },
        COMMUNITY_RATING: {
            title: "sort.community_rating",
            query: "CommunityRating",
        },
        CRITIC_RATING: {
            title: "sort.critic_rating",
            query: "CriticRating",
        },
        DATE_CREATED: {
            title: "sort.datecreated",
            query: "DateCreated",
        },
        PLAY_COUNT: {
            title: "sort.playcount",
            query: "PlayCount",
        },
        PREMIERE_DATE: {
            title: "sort.premieredate",
            query: "PremiereDate",
        },
        PRODUKTION_YEAR: {
            title: "sort.productionyear",
            query: "ProductionYear",
        },
        RUNTIME: {
            title: "sort.runtime",
            query: "Runtime",
        },
    }
    const Order = {
        ASCENDING: {
            title: "sort.ascending",
            query: "ascending",
        },
        DESCENDING: {
            title: "sort.descending",
            query: "descending",
        },
    }

    let sort: SortItem = Object.values(Sort).find(item => item.query === $sortOrder) ?? Sort.SORT_NAME
    let order: SortItem = Object.values(Order).find(item => item.query === $orderBy) ?? Order.ASCENDING

    let expanded: boolean = false

    export let sortQuery
    $: sortQuery = `sortBy=${sort.query}&sortOrder=${order.query}${value !== "" ? `&searchTerm=${value}` : ""}`
    $: sort != Sort[$sortOrder] && updatePreference("sort.order", sort.query)
    $: order != Order[$orderBy] && updatePreference("sort.by", order.query)
</script>

<style>
    section {
        margin: 50px 0;
    }

    div.wrapper {
        position: relative;
        overflow: hidden;

        display: block;
        margin: 0 auto;

        height: 100px;
        width: 500px;
        max-width: 90%;

        border-radius: 10px;
        background-color: var(--background-light);
    }

    input {
        color: var(--text);
        font-family: var(--font);

        border: none;
        padding: 10px 20px;

        outline: none;
        background-color: transparent;

        height: 50px;
        width: 100%;
    }
    input:focus {
        outline: none;
    }

    div.holder {
        display: grid;
        grid-template-columns: 1fr 1fr;

        position: relative;
        padding: 0 20px;
        overflow: hidden;
    }
    div.content {
        padding: 0 0 20px 0;
    }

    div.preview {
        display: flex;
        align-items: center;

        text-align: center;
        height: 50px;
    }
    div.preview span {
        color: var(--highlight);
    }

    div.item {
        cursor: pointer;
        padding: 5px 0;
    }
    div.item.selected {
        color: var(--highlight);
        font-weight: 600;
    }

    div.wrapper:hover, div.wrapper.expanded {
        height: auto;
    }
    div.wrapper:hover div.holder, div.wrapper.expanded div.holder {
        height: auto;
    }
</style>

<section>
    <ApplyWidth>
        <div class="wrapper" class:expanded>
            <input placeholder="{$t(`search`)}" bind:value type="text" />
            <div class="holder" on:click={() => expanded = !expanded}>
                <div class="preview">{$t("sort.by")}&#160;<span>{$t(sort.title)}</span></div>
                <div class="preview">{$t("sort.order")}&#160;<span>{$t(order.title)}</span></div>
                <div class="content">
                    {#each Object.values(Sort) as item}
                        <div on:click={() => sort = item} class:selected={item.query === sort.query} class="item">{$t(item.title)}</div>
                    {/each}
                </div>
                <div class="content">
                    {#each Object.values(Order) as item}
                        <div on:click={() => order = item} class:selected={item.query === order.query} class="item">{$t(item.title)}</div>
                    {/each}
                </div>
            </div>
        </div>
    </ApplyWidth>
</section>