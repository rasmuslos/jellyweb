<script lang="ts" context="module">
    import {getJellyfinItem, setFetcher} from "$lib/api/internal";
    export async function load({ fetch, page }) {
        const { id } = page.params
        setFetcher(fetch);
        const item = await getJellyfinItem(id)

        return {
            status: 200,
            props: {
                item
            }
        }
    }
</script>
<script lang="ts">
    import Player from "../../components/player/Player.svelte";
    import type {JellyfinItem} from "$lib/typings/jellyfin";

    export let item: JellyfinItem
</script>

<Player {item} />