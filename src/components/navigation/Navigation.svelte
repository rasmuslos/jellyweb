<script lang="ts">
    import type {Item} from "$lib/typings/navigation";

    const items: Item[] = [
        { title: "Movies", href: "/movies", regex: "(\\/?movies\\/?.*)|(\\/)" },
        { title: "Series", href: "/series", regex: "(\\/?series\\/?.*)|(\\/)" },
        { title: "Generes", href: "/generes", regex: "(\\/?generes\\/?.*)|(\\/)" },
    ]
</script>

<div>
    <nav></nav>
</div>