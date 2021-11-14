<script context="module">
    import {logout, setFetcher} from "$lib/api/internal";

    export async function load({fetch}) {
        setFetcher(fetch)
        await logout()

        return {
            status: 302,
            redirect: "/user/login",
        }
    }
</script>