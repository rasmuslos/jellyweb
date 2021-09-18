<script lang="ts">
    import type {Item} from "$lib/typings";
    import ApplyWidth from "./ApplyWidth.svelte";
    import {generateImageUrl, generateItemUrl} from "$lib/helper";

    export let persons: Item[]
</script>

<style>
    div.holder {
        display: flex;
        flex: 0 0 100px;

        overflow-y: hidden;
        overflow-x: auto;
    }
    a.person {
        margin: 0 10px;
        text-align: center;
    }
    div.image {
        display: block;
        margin: 0 auto 10px auto;

        width: 100px;
        height: 100px;

        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        background-color: var(--background-secondary);

        border-radius: 50%;
    }
</style>

{#if persons && persons.length > 0}
    <section>
        <ApplyWidth>
            <h1>Actors</h1>
            <div class="holder">
                {#each persons as person}
                    <a class="person" href={generateItemUrl(person.Id)}>
                        <div class="image" style="background-image: url('{(person.Id && person.PrimaryImageTag && generateImageUrl(person.Id, person.PrimaryImageTag, `Primary`, 100)) ?? ``}')"></div>
                        <span>{person.Name}</span>
                    </a>
                {/each}
            </div>
        </ApplyWidth>
    </section>
{/if}