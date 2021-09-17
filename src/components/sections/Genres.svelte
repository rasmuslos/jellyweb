<script lang="ts">
    import type {Item} from "$lib/typings";
    import ApplyWidth from "./ApplyWidth.svelte";

    export let genres: Item[]
    export let big: boolean = false
</script>

<style>
    div.holder {
        display: flex;
        flex-basis: 200px;
        flex-shrink: 0;
        padding-bottom: 20px;

        cursor: grab;
        overflow-y: hidden;
        overflow-x: auto;
    }
    div.genre {
        position: relative;
        display: block;
        margin: 0 20px;

        border-radius: 10px;
        background-color: var(--background-light);

        transition: transform 250ms ease;
        cursor: pointer;

        overflow: hidden;
        width: 400px;
        height: 125px;
    }
    div.genre:hover {
        transform: scale(1.01);
    }

    div.genre h1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        white-space: nowrap;
        margin: 0;
    }

    div.gradient {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
        opacity: 0.7;
    }
    div.gradient.no0 {
        background-color: #4158D0;
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    }
    div.gradient.no1 {
        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
    }
    div.gradient.no2 {
        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
    }
    div.gradient.no3 {
        background-color: #D9AFD9;
        background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    }
    div.gradient.no4 {
        background-color: #00DBDE;
        background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);
    }

    div.holder.big {
        flex-wrap: wrap;
        justify-content: center;
    }
    div.holder a {
        max-width: 100%;
    }
    div.holder.big div.genre {
        margin: 20px 20px;
    }
</style>

<section>
    <ApplyWidth>
        {#if !big}
            <h1>Genres</h1>
        {/if}
        <div class="holder" class:big>
            {#each genres as genre, i}
                <a href="/genres/{genre.Id}">
                    <div class="genre">
                        <div class="gradient no{i % 5}"></div>
                        <h1>{genre.Name}</h1>
                    </div>
                </a>
            {/each}
        </div>
    </ApplyWidth>
</section>