<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";
    import {setFetcher} from "$lib/api/internal";
    import {getHomeItems} from "$lib/api/internal/methods/v3";

    export const load: Load = async ({fetch}) => {
        setFetcher(fetch)
        const items = await getHomeItems()

        return {
            props: {
                ...items,
            }
        }
    }
</script>
<script lang="ts">
    import {mobile, navigationExpanded} from "$lib/stores";
    import type { Item } from "$lib/typings";
    import { session } from "$app/stores";
    import { applyHeight, applyWidth } from "$lib/helper";
    import Hero from "../../components/hero/cards/Hero.svelte";
    import ApplyMeasurements from "../../components/ApplyMeasurements.svelte";
    import Push from "../../Push.svelte";

    export let featured: Item[]
    export let suggested: Item[]
</script>

<Push />
<Hero items={featured} />
<ApplyMeasurements>
    <hr />
    <h1>{featured?.[0]?.name}</h1>
    <img src={`${$session.data.server}/${applyHeight(featured?.[0]?.images?.primary.url, 500)}`} alt="oof" />
    <img src={`${$session.data.server}/${applyWidth(featured?.[0]?.images?.backdrop.url, 1000)}`} alt="oof2" />

    <hr />
    <p>
        {$mobile}
    </p>
    <button on:click={() => navigationExpanded.update(expanded => !expanded)}>
        TOGGLE
    </button>
    <p>
        Odit laboriosam veniam ex cumque architecto. Aperiam voluptatum eum voluptatum qui perferendis. Aut assumenda eum cupiditate praesentium dicta. Sed sapiente et provident temporibus consequatur assumenda nobis. Delectus rem ipsam harum quo.
        Perferendis blanditiis minus corrupti est nihil harum. Est qui neque est in necessitatibus assumenda ea. Ut ut dicta ratione itaque et dicta et velit. Ex qui corporis sequi sunt est.
        Odio nihil quas laudantium. Eius optio aut voluptas. Aperiam voluptatem rerum ratione repellat aliquam.
        Quaerat quas magnam totam. Quia corrupti voluptatem voluptas sapiente voluptatem enim ut in. Est debitis quidem quia est exercitationem fuga. Similique autem nesciunt quis et omnis esse in. Sint porro nam repudiandae qui alias reprehenderit molestias. Voluptate tempore soluta recusandae.
        Dolores nisi sed quo quibusdam. Est voluptatibus sapiente qui cupiditate laudantium maiores unde nihil. Magni qui autem illo numquam ut. Dolorum quisquam eligendi velit reiciendis quasi quo qui beatae.
    </p>
    <p>
        Odit laboriosam veniam ex cumque architecto. Aperiam voluptatum eum voluptatum qui perferendis. Aut assumenda eum cupiditate praesentium dicta. Sed sapiente et provident temporibus consequatur assumenda nobis. Delectus rem ipsam harum quo.
        Perferendis blanditiis minus corrupti est nihil harum. Est qui neque est in necessitatibus assumenda ea. Ut ut dicta ratione itaque et dicta et velit. Ex qui corporis sequi sunt est.
        Odio nihil quas laudantium. Eius optio aut voluptas. Aperiam voluptatem rerum ratione repellat aliquam.
        Quaerat quas magnam totam. Quia corrupti voluptatem voluptas sapiente voluptatem enim ut in. Est debitis quidem quia est exercitationem fuga. Similique autem nesciunt quis et omnis esse in. Sint porro nam repudiandae qui alias reprehenderit molestias. Voluptate tempore soluta recusandae.
        Dolores nisi sed quo quibusdam. Est voluptatibus sapiente qui cupiditate laudantium maiores unde nihil. Magni qui autem illo numquam ut. Dolorum quisquam eligendi velit reiciendis quasi quo qui beatae.
    </p>
    <p>
        Odit laboriosam veniam ex cumque architecto. Aperiam voluptatum eum voluptatum qui perferendis. Aut assumenda eum cupiditate praesentium dicta. Sed sapiente et provident temporibus consequatur assumenda nobis. Delectus rem ipsam harum quo.
        Perferendis blanditiis minus corrupti est nihil harum. Est qui neque est in necessitatibus assumenda ea. Ut ut dicta ratione itaque et dicta et velit. Ex qui corporis sequi sunt est.
        Odio nihil quas laudantium. Eius optio aut voluptas. Aperiam voluptatem rerum ratione repellat aliquam.
        Quaerat quas magnam totam. Quia corrupti voluptatem voluptas sapiente voluptatem enim ut in. Est debitis quidem quia est exercitationem fuga. Similique autem nesciunt quis et omnis esse in. Sint porro nam repudiandae qui alias reprehenderit molestias. Voluptate tempore soluta recusandae.
        Dolores nisi sed quo quibusdam. Est voluptatibus sapiente qui cupiditate laudantium maiores unde nihil. Magni qui autem illo numquam ut. Dolorum quisquam eligendi velit reiciendis quasi quo qui beatae.
    </p>
    <p>
        Odit laboriosam veniam ex cumque architecto. Aperiam voluptatum eum voluptatum qui perferendis. Aut assumenda eum cupiditate praesentium dicta. Sed sapiente et provident temporibus consequatur assumenda nobis. Delectus rem ipsam harum quo.
        Perferendis blanditiis minus corrupti est nihil harum. Est qui neque est in necessitatibus assumenda ea. Ut ut dicta ratione itaque et dicta et velit. Ex qui corporis sequi sunt est.
        Odio nihil quas laudantium. Eius optio aut voluptas. Aperiam voluptatem rerum ratione repellat aliquam.
        Quaerat quas magnam totam. Quia corrupti voluptatem voluptas sapiente voluptatem enim ut in. Est debitis quidem quia est exercitationem fuga. Similique autem nesciunt quis et omnis esse in. Sint porro nam repudiandae qui alias reprehenderit molestias. Voluptate tempore soluta recusandae.
        Dolores nisi sed quo quibusdam. Est voluptatibus sapiente qui cupiditate laudantium maiores unde nihil. Magni qui autem illo numquam ut. Dolorum quisquam eligendi velit reiciendis quasi quo qui beatae.
    </p>
    <p>
        Odit laboriosam veniam ex cumque architecto. Aperiam voluptatum eum voluptatum qui perferendis. Aut assumenda eum cupiditate praesentium dicta. Sed sapiente et provident temporibus consequatur assumenda nobis. Delectus rem ipsam harum quo.
        Perferendis blanditiis minus corrupti est nihil harum. Est qui neque est in necessitatibus assumenda ea. Ut ut dicta ratione itaque et dicta et velit. Ex qui corporis sequi sunt est.
        Odio nihil quas laudantium. Eius optio aut voluptas. Aperiam voluptatem rerum ratione repellat aliquam.
        Quaerat quas magnam totam. Quia corrupti voluptatem voluptas sapiente voluptatem enim ut in. Est debitis quidem quia est exercitationem fuga. Similique autem nesciunt quis et omnis esse in. Sint porro nam repudiandae qui alias reprehenderit molestias. Voluptate tempore soluta recusandae.
        Dolores nisi sed quo quibusdam. Est voluptatibus sapiente qui cupiditate laudantium maiores unde nihil. Magni qui autem illo numquam ut. Dolorum quisquam eligendi velit reiciendis quasi quo qui beatae.
    </p>
    <p>
        Odit laboriosam veniam ex cumque architecto. Aperiam voluptatum eum voluptatum qui perferendis. Aut assumenda eum cupiditate praesentium dicta. Sed sapiente et provident temporibus consequatur assumenda nobis. Delectus rem ipsam harum quo.
        Perferendis blanditiis minus corrupti est nihil harum. Est qui neque est in necessitatibus assumenda ea. Ut ut dicta ratione itaque et dicta et velit. Ex qui corporis sequi sunt est.
        Odio nihil quas laudantium. Eius optio aut voluptas. Aperiam voluptatem rerum ratione repellat aliquam.
        Quaerat quas magnam totam. Quia corrupti voluptatem voluptas sapiente voluptatem enim ut in. Est debitis quidem quia est exercitationem fuga. Similique autem nesciunt quis et omnis esse in. Sint porro nam repudiandae qui alias reprehenderit molestias. Voluptate tempore soluta recusandae.
        Dolores nisi sed quo quibusdam. Est voluptatibus sapiente qui cupiditate laudantium maiores unde nihil. Magni qui autem illo numquam ut. Dolorum quisquam eligendi velit reiciendis quasi quo qui beatae.
    </p>
</ApplyMeasurements>

<div>
    HELLO
</div>

<style>
    div {
        height: 100px;
        width: 100%;

        background-color: rebeccapurple;
    }
</style>