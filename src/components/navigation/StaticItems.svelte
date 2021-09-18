<script lang="ts">
    import Search from "./Search.svelte";
    import type {User} from "$lib/typings";
    import {generateImageUrl} from "$lib/helper";

    export let me: User
</script>

<style>
    div.holder {
        display: flex;
        margin-left: auto;
    }
    div.holder > * {
        margin-right: 7px;
        margin-left: 7px;
    }

    div.user {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;

        cursor: pointer;
        transition: transform 200ms ease;
    }
    div.user:hover {
        transform: scale(1.1);
    }
    div.user .image {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;

        border-radius: 50%;

        height: 35px;
        width: 35px;
    }
</style>

<div class="holder">
    <Search />
    <div class="user">
        <div class="image" style="background-image: url('{generateImageUrl(me.Id, me.PrimaryImageTag, `Primary`, 30, `Users`)}')"></div>
    </div>
</div>