<script lang="ts">
    import type { Item } from "$lib/typings";
    import {session} from "$app/stores";
    import {applyHeight} from "$lib/helper";

    export let item: Item
    const progress = (item.userData?.position / item.runtime) * 100
</script>

<a class="holder">
    <img src={`${$session.data.server}/${applyHeight(item.images?.backdrop.url, 500)}`} alt={`${item.name}'s backdrop`} />
    <div class="text">
        <h1 style="background-image: linear-gradient(90deg, #CE5374 0%, #CE5374 {progress}%, var(--white) {progress}%, var(--white) 100%);">{item.name}</h1>
        <p>
            {#if item.genres}
                {#each item.genres.splice(0, 3) as { name }}
                    <!--TODO: add links-->
                    <a>{name}</a>
                {/each}
            {:else if item.seriesInfo}
                <a>{item.seriesInfo.showName}</a>
                {#if item.seriesInfo.season}
                    <a>{item.seriesInfo.seasonName}</a>
                {/if}
            {/if}
        </p>
        <div class="blur"></div>
    </div>
</a>

<style>
    a.holder {
        position: relative;
        height: 500px;
        width: 100%;

        border-radius: 15px;
        box-shadow: 0 3px 15px rgba(0,0,0,0.2);
        margin-bottom: 100px;
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

        box-sizing: content-box;
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
    a {
        position: relative;
        padding: 5px;
        margin: 0 5px 0 0;

        color: var(--grey);
    }

    img {
        position: absolute;
        top: 0;
        left: 0;

        object-fit: cover;
        border-radius: 15px;

        height: 100%;
        width: 100%;
    }
</style>