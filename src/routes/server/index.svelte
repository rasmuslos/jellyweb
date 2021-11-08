<script context="module" lang="ts">
    import {setFetcher, getTasks} from "$lib/api/internal";

    export async function load({fetch}) {
        try {
            setFetcher(fetch)
            const tasks = await getTasks()

            return {
                status: 200,
                props: {
                    tasks,
                }
            }
        } catch(error) {
            return {
                status: 301,
                redirect: "/error"
            }
        }
    }
</script>
<script lang="ts">
    import LargeHeading from "../../components/helper/LargeHeading.svelte";
    import {t} from "$lib/i18n";

    export let tasks
</script>

<LargeHeading>{$t("server")}</LargeHeading>