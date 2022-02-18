<script lang="ts" context="module">
    import { setFetcher } from "$lib/api/internal";
    import { getExtendedItem } from "$lib/api/internal/methods/v3";
    import { getItemPath } from "$lib/helper";
    import type { ExtendedItem } from "$lib/typings";
    import type { Load } from "@sveltejs/kit";

    export const load: Load = async ({fetch, params}) => {
        setFetcher(fetch)
        const id = params.id
        const item = await getExtendedItem(id)

        if(item.type != "episode" && item.type != "movie") return {
            status: 301,
            redirect: getItemPath(item.id)
        }

        return {
            status: 200,
            props: {
                item,
            }
        }
    }
</script>
<script lang="ts">
    export let item: ExtendedItem

    throw new Error(JSON.stringify({
        status: 202,
        payload: `Work in Progress (play ${item.name})`
    }))
</script>