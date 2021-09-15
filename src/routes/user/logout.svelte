<script context="module">
    export async function load({fetch}) {
        const res = await fetch("/api/v1/session/destroy", {
            method: "DELETE",
        })
        console.log(await res.text())

        return {
            status: 302,
            redirect: "/user/login",
        }
    }
</script>