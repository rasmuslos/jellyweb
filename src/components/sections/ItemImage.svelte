<script lang="ts">
    import {generateImageUrl} from "$lib/helper";
    import {icons} from "feather-icons";
    import Item from "../navigation/Item.svelte";

    export let wide: boolean = false
    export let item: Item

    const url =
        wide
            ? item.Type === "Episode" && item.SeriesId && item.SeriesPrimaryImageTag && item.SeriesPrimaryImageTag.length > 0
            ? generateImageUrl(item.SeriesId, item.SeriesPrimaryImageTag[0], `Backdrop`, 300)
            : item.BackdropImageTags && item.BackdropImageTags.length > 0
            ? generateImageUrl(item.Id, item.BackdropImageTags[0], "Backdrop", 300)
            : null
            : generateImageUrl(item.Id, item.ImageTags.Primary, "Primary", 200)
</script>

<style>
    div.holder {
        position: relative;
        cursor: pointer;

        border-radius: 10px;
        overflow: hidden;
        width: 200px;
    }
    div.holder.wide {
        width: 300px;
    }

    img {
        display: block;
    }
    div.overlay {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }
    div.progress {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        opacity: 0.4;
        background: linear-gradient(45deg, rgba(143,188,187,1) 0%, rgba(94,129,172,1) 100%);
    }
    div.play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        opacity: 0;
        transition: opacity 150ms ease;
    }
    div:hover div.play {
        opacity: 1;
    }
</style>

<div class="holder" class:wide on:click>
    <img src={url} alt="Movie Poster">
    <div style="width: {item.UserData.PlayedPercentage}%" class="progress"></div>
    <div class="overlay"></div>
    <div class="play">
        {@html icons.play.toSvg({ height: 50, width: 50 })}
    </div>
</div>