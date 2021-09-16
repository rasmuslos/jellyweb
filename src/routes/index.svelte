<script lang="ts" context="module">
    import {resume, setFetcher} from "$lib/api/internal";

    export async function load({ fetch }) {
        setFetcher(fetch)
        const { Items } = await resume()

        return {
            status: 200,
            props: { resume: Items }
        }
    }
</script>
<script lang="ts">
    import type {Item} from "$lib/typings";
    import {noPadding} from "$lib/stores";
    import {onDestroy} from "svelte";
    import Hero from "../components/sections/Hero.svelte";

    export let resume: Item[]
    let hero = resume.length > 0 ? resume[0] : null

    if(hero !== null) noPadding.set(true)

    onDestroy(() => noPadding.set(false))
</script>

<style>
</style>

{#if hero != null}
    <Hero item={hero} tip="Continue watching" />
{/if}

<p on:mouseover={() => hero = resume[1]} on:mouseleave={() => hero = resume[0]}>
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