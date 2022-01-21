<script lang="ts">
    import type { Item } from "$lib/typings";
    import {applyHeight} from "$lib/helper";
    import {wrap} from "$lib/helper";
    import {getItemPath} from "$lib/helper";
    import Image from "../../item/Image.svelte";

    export let item: Item

    let progress = (item.userData?.position / item.runtime) * 100
    if(isNaN(progress)) progress = 0
</script>

<a class="holder" href={getItemPath(item.id)}>
    <Image url={wrap(applyHeight(item.images?.backdrop.url, 1000))} alt={`${item.name}'s backdrop`} />
    <div class="text">
        <h1 style="background-image: linear-gradient(90deg, #CE5374 0%, #CE5374 {progress}%, var(--white) {progress}%, var(--white) 100%);">{item.name}</h1>
        <p>
            {#if item.genres}
                {#each item.genres.splice(0, 3) as { name }}
                    <!--TODO: add links-->
                    <a>{name}</a>
                {/each}
            {:else if item.seriesInfo}
                <a href={getItemPath(item.seriesInfo.show)}>{item.seriesInfo.showName}</a>
                {#if item.seriesInfo.season}
                    <a href={getItemPath(item.seriesInfo.season)}>{item.seriesInfo.seasonName}</a>
                {/if}
            {/if}
        </p>
        <div class="blur"></div>
    </div>
</a>

<style>
    a.holder {
        position: relative;
        display: block;

        height: 500px;
        width: 100%;
        flex: 0 0 100%;

        border-radius: 15px;
        box-shadow: 0 3px 15px rgba(0,0,0,0.2);
    }
    div.text {
        position: absolute;
        bottom: 20px;
        left: 20px;
    }

    h1 {
        position: relative;
        margin: 0;
        z-index: 1;

        font-size: 40px;
        color: transparent;

        background-clip: text;
        -webkit-background-clip: text;
    }
    div.blur {
        position: absolute;
        top: -20px;
        left: -20px;

        height: 100%;
        width: 100%;

        padding: 20px;

        filter: blur(20px);
        background-color: #00000070;
    }

    p {
        position: relative;
        z-index: 1;

        margin: 10px 0 0 0;
        color: var(--white);
    }
    a:not(.holder) {
        position: relative;
        padding: 5px;
        margin: 0 5px 0 0;

        color: var(--grey);
    }
</style>