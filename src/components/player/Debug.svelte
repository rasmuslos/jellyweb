<script>
    import {bitrate, source} from "$lib/stores";
</script>

<style>
    div {
        position: absolute;
        top: 0;
        right: 0;

        font-family: monospace;

        background-color: black;
        color: white;
    }
</style>

<div>
    BITRATE: {$bitrate}
    <br>
    SOURCE: {$source ? $source.type : "?"}
</div>