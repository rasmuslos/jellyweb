<script lang="ts">
    import type {Item} from "$lib/typings";
    import {session} from "$app/stores";
    import {applyHeight} from "$lib/helper";

    export let item: Item
    const progress = (item.userData?.position / item.runtime) * 100
</script>

<a class="holder">
    <img src={`${$session.data.server}/${applyHeight(item.images?.backdrop.url, 500)}`} alt={`${item.name}'s backdrop`} />
    <div class="blur"></div>
    <h1 style="background-image: linear-gradient(90deg, #CE5374 0%, #CE5374 {progress}%, var(--white) {progress}%, var(--white) 100%);">{item.name}</h1>
</a>

<style>
    a.holder {
        position: relative;
        height: 250px;
        width: 100%;

        overflow: hidden;
        border-radius: 15px;
        box-shadow: 0 3px 15px rgba(0,0,0,0.2);

        flex: 125px 0 0;
        margin-bottom: 10px;
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

    h1 {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        margin: 0 20px;
        color: transparent;

        background-clip: text;
        -webkit-background-clip: text;
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