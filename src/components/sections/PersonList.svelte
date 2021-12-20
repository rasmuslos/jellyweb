<script lang="ts">
    import ApplyWidth from "../helper/sections/ApplyWidth.svelte";
    import {changeScrollDirection, generateImageUrl, generatePeopleUrl} from "$lib/helper";
    import {icons} from "feather-icons";
    import {t} from "$lib/i18n";
    import type {Person} from "$lib/typings/internal/person";

    let holder
    export let persons: Person[]
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
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
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
            <div class="holder" bind:this={holder} on:wheel={event => changeScrollDirection(event, holder)}>
                {#each persons as person}
                    <a class="person" href={generatePeopleUrl(person.id)}>
                        <div class="image">
                            {#if person.id && person.images.normal.tag}
                                <!--
                                <div class="photo" style="background-image: url('{generateImageUrl(person.id, person.images.normal.tag, `Primary`, 100)}')"></div>
                                -->
                                <img src={generateImageUrl(person.id, person.images.normal.tag, `Primary`, 100)} alt={person.name} />
                            {:else}
                                <div class="fallback">{@html icons["user"].toSvg()}</div>
                            {/if}
                        </div>
                        <span>{person.name}</span>
                        <span class="dimmed">{person.role}</span>
                    </a>
                {/each}
            </div>
        {/if}
    </ApplyWidth>
</section>