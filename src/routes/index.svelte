<script lang="ts" context="module">
    import {home, setFetcher} from "$lib/api/internal";
    import type {Item} from "$lib/typings";

    export async function load({ fetch }) {
        setFetcher(fetch)
        const homeObj = await home()

        const resume: Item[] = homeObj.resume.Items
        const nextUp: Item[] = homeObj.nextUp.Items

        return {
            status: 200,
            props: { resume, nextUp }
        }
    }
</script>
<script lang="ts">
    import type {Item} from "$lib/typings";
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";
    import ListHero from "../components/sections/ListHero.svelte";

    export let resume: Item[]
    export let nextUp: Item[]

    const combined = resume.concat(nextUp).sort((a, b) => {
        if(!a.UserData || !a.UserData.LastPlayedDate || !b.UserData || !b.UserData.LastPlayedDate) return 0
        return new Date(a.UserData.LastPlayedDate).getTime() > new Date(b.UserData.LastPlayedDate).getTime() ? -1 : 1
    })
    const showHero = combined.length > 0

    if(showHero !== null) noPadding.set(true)
    onDestroy(() => noPadding.set(false))
</script>

<style>
</style>

{#if showHero != null}
    <ListHero items={combined} />
{/if}

<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>
<p>
    Quo sed voluptate fugit. Beatae commodi excepturi tempora omnis placeat voluptas sit voluptatibus. Placeat aliquid assumenda similique est.
    Alias perferendis id eligendi aspernatur. Ut quis rerum ea adipisci libero maiores nulla omnis. Cum voluptatem voluptatem deleniti vitae. Qui quo ea qui temporibus reiciendis.
    Atque dolorem aliquid consectetur at sunt at veritatis velit. Nam esse quia amet a omnis neque velit. Eos ea harum deleniti voluptas quasi quod.
    Minima sunt excepturi non. Illo fugiat rerum velit dolorem eligendi cum provident similique. Magni illum harum dignissimos reiciendis ratione quam.
    Fugiat consequatur nostrum deserunt consectetur perspiciatis vero neque ut. Dolorem cumque est ipsum. Sit quam rerum non illum rem modi dolores. Et sed maxime eius et. Voluptate nam sapiente est quisquam magnam explicabo. Ea voluptas ipsum nisi illo.
</p>