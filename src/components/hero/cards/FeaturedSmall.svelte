<script lang="ts">
    import type {Item} from "$lib/typings";
    import {applyHeight} from "$lib/helper";
    import {wrap} from "$lib/helper";
    import {getItemPath} from "$lib/helper";
    import Image from "../../item/Image.svelte";

    export let item: Item
    const progress = (item.userData?.position / item.runtime) * 100
</script>

<a class="holder" href={getItemPath(item.id)} sveltekit:prefetch>
    <Image url={wrap(applyHeight(item.images?.backdrop?.url, 500))} alt={`${item.name}'s backdrop`} />
    <div class="blur"></div>
    <h2 style="background-image: linear-gradient(90deg, var(--primary) 0%, var(--primary) {progress}%, var(--white) {progress}%, var(--white) 100%);">{item.name}</h2>
</a>

<style lang="less">
    a.holder {
        position: relative;
        width: 100%;

        overflow: hidden;
        border-radius: 15px;
        box-shadow: 0 3px 15px rgba(0,0,0,0.2);

        flex: 125px 0 0;
        margin-bottom: 10px;

        h2 {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            margin: 0 20px;
            color: transparent;

            background-clip: text;
            -webkit-background-clip: text;
        }
    }
    div.blur {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        filter: blur(20px);
        background-color: #00000070;
    }
</style>