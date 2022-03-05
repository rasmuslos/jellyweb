<script>
    import ApplyMeasurements from "../ApplyMeasurements.svelte";
</script>

<ApplyMeasurements>
    <div>
        <h1>
            <slot/>
        </h1>
    </div>
</ApplyMeasurements>

<style lang="less">
    div {
        width: 100%;

        h1 {
            font-size: 60px;
            text-align: center;

            background-clip: text;
            -webkit-background-clip: text;

            color: transparent;
            background-image: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);

            margin: 0 auto;
            width: fit-content;
        }
    }
</style>