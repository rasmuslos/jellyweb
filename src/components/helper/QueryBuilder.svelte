<script lang="ts">
    import ApplyWidth from "./ApplyWidth.svelte";
    import type {SortItem} from "$lib/typings";

    const Sort = {
        SORT_NAME: {
            title: "Name",
            query: "SortName",
        },
        COMMUNITY_RATING: {
            title: "Community Rating",
            query: "CommunityRating",
        },
        CRITIC_RATING: {
            title: "Critic Rating",
            query: "CriticRating",
        },
        DATE_CREATED: {
            title: "Created",
            query: "DateCreated",
        },
        PLAY_COUNT: {
            title: "Plays",
            query: "PlayCount",
        },
        PREMIERE_DATE: {
            title: "Premiere",
            query: "PremiereDate",
        },
        PRODUKTION_YEAR: {
            title: "Production",
            query: "ProductionYear",
        },
        RUNTIME: {
            title: "Runtime",
            query: "Runtime",
        },
    }
    const Order = ["Ascending", "Descending"]

    let sort: SortItem = Sort.SORT_NAME
    let order: string = Order[0]

    export let sortQuery = ""
    $: sortQuery = `sortBy=${sort.query}&sortOrder=${order}`
</script>

<style>
    div.holder {
        display: grid;
        grid-template-columns: 1fr 1fr;

        position: relative;
        padding: 0 20px;

        background-color: var(--background-light);
        margin: 0 auto;

        height: 50px;
        width: 500px;
        max-width: 90%;

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

    div.holder:hover {
        height: auto;
    }
</style>

<section>
    <ApplyWidth>
        <div class="holder">
            <div class="preview">Sort by&#160;<span>{sort.title}</span></div>
            <div class="preview">Order by&#160;<span>{order}</span></div>
            <div class="content">
                {#each Object.values(Sort) as item}
                    <div on:click={() => sort = item} class:selected={item.query === sort.query} class="item">{item.title}</div>
                {/each}
            </div>
            <div class="content">
                {#each Order as item}
                    <div on:click={() => order = item} class:selected={item === order} class="item">{item}</div>
                {/each}
            </div>
        </div>
    </ApplyWidth>
</section>