<script lang="ts">
    export let url: string
    export let alt: string

    let showImage = true
</script>

<div class="holder">
    <div class="fallback">
        <h1>{alt.split(" ").splice(0, 2).map(str => str[0]).join("")}</h1>
    </div>
    {#if showImage}
        <img src={url} on:error={() => showImage = false} alt={alt ?? url} />
    {/if}
    <div class="overlay"></div>
</div>

<style>
    div.holder {
        position: relative;
        display: block;
        
        height: 100%;
        width: 100%;

        overflow: hidden;
        border-radius: 10px;
    }
    div.holder > * {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
    }

    div.fallback {
        border-radius: 11px;
        background-image: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
    }
    div.fallback h1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        margin: 0;
        color: var(--text);
    }

    img {
        object-fit: cover;
    }
</style>