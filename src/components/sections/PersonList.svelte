<script lang="ts">
    import type {Item} from "$lib/typings";
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import {changeScrollDirection, generateImageUrl, generateItemUrl} from "$lib/helper";
    import {icons} from "feather-icons";
    import {t} from "$lib/i18n";

    let holder
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

        position: relative;
        width: 100px;
        height: 100px;

        overflow: hidden;
        border-radius: 50%;
        background-color: var(--background-secondary);
    }
    div.photo {
        height: 100%;
        width: 100%;

        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
    }
    div.fallback {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        height: 24px;
        width: 24px;
    }

    span.dimmed {
        display: none;
    }
    a.person:hover span.dimmed {
        display: block;
    }
    a.person:hover span:not(.dimmed) {
        display: none;
    }

    h3 {
        margin: 75px 0;
        color: var(--error);

        font-weight: 600;
        text-align: center;
    }
</style>

<section>
    <ApplyWidth>
        <h1>{$t("actors")}</h1>
        {#if !persons || persons.length === 0}
            <h3>{$t("no_actors")}</h3>
        {:else}
            <div class="holder" bind:this={holder} on:wheel|preventDefault={event => changeScrollDirection(event, holder)}>
                {#each persons as person}
                    <a class="person" href={generateItemUrl(person.Id)}>
                        <div class="image">
                            {#if person.Id && person.PrimaryImageTag}
                                <div class="photo" style="background-image: url('{generateImageUrl(person.Id, person.PrimaryImageTag, `Primary`, 100)}')"></div>
                            {:else}
                                <div class="fallback">{@html icons["user"].toSvg()}</div>
                            {/if}
                        </div>
                        <span>{person.Name}</span>
                        <span class="dimmed">{person.Role || person.Type || "unknown"}</span>
                    </a>
                {/each}
            </div>
        {/if}
    </ApplyWidth>
</section>