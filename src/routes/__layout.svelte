<script context="module">
    export async function load({session}) {
        if(session == null || session.active == null) {
            return {
                status: 302,
                redirect: "/user/login",
            }
        } else return { status: 200 }
    }
</script>
<script lang="ts">
    import Navigation from "../components/navigation/Navigation.svelte";
</script>

<style>
    div {
        height: 100%;
        width: 100%;

        color: var(--text);
        font-size: var(--size);
        font-family: var(--font);

        background-color: var(--background);
        overflow: hidden;
    }
</style>

<div>
    <Navigation />
    <main>
        <slot />
    </main>
</div>