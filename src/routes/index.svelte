<script lang="ts" context="module">
    import type {Load} from "@sveltejs/kit";

    export const load: Load = ({session}) => {
        return {
            status: 302,
            redirect: session.data == null ? "/auth/login" : "/app"
        }
    }
</script>