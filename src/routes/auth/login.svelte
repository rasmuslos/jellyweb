<script lang="ts">
    import Layout from "../../components/Layout.svelte";
    import {Theme} from "$lib/typings";
    import ApplyMeasurements from "../../components/ApplyMeasurements.svelte";
    import {_} from "svelte-i18n";
    import Input from "../../components/form/Input.svelte";
    import Button from "../../components/form/Button.svelte";
    import {performLogin} from "$lib/api/internal/methods/v3";

    let server: string = ""
    let username: string = ""
    let password: string = ""

    let status: any = null
    let working: boolean = false

    const handleSubmit = () => {
        working = true
        performLogin(server, username, password)
            .then(() => window.location.href = "/app")
            .catch(error => status = error)
            .finally(() => working = false)
    }
</script>

<Layout showNavigation={false} i18n="en" theme={Theme.DARK}>
    <ApplyMeasurements>
        <h1>{$_("auth.login.hello", { values: { name: username === "" ? "Stranger" : username }})}</h1>
        {#if status}
            <p>
                {$_(status.payload ?? "Unknown error")}
            </p>
        {/if}
        <form on:submit|preventDefault={handleSubmit}>
            <Input type="url" placeholder="https://demo.jellyfin.org/stable" label="auth.login.server" required bind:value={server} disabled={working} />
            <Input type="text" placeholder="rasmus" label="auth.login.username" bind:value={username} required disabled={working} />
            <Input type="password" placeholder="********" label="auth.login.password" bind:value={password} disabled={working} />
            <Button action="submit" disabled={working} {working}>{$_("auth.login.submit")}</Button>
        </form>
    </ApplyMeasurements>
</Layout>

<style>
    h1 {
        margin: 100px 0 35px 0;
        text-align: center;
    }
    p {
        text-align: center;
        color: var(--secondary);

        margin-bottom: 20px;
    }
</style>