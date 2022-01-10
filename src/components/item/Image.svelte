<script lang="ts">
    export let url: string
</script>

<div class="holder">
    <img src={url} alt="Image" />
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
    img {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        object-fit: cover;
    }
</style>