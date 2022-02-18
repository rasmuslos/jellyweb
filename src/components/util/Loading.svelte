<div>...</div>

<style>
    @keyframes loading {
        0% {
            color: var(--primary);
        }
        50% {
            color: var(--secondary);
        }
        100% {
            color: var(--primary);
        }
    }

    div {
        margin: 50px 0;
        text-align: center;
        width: 100%;

        font-size: 60px;
        animation: loading 2s infinite;
    }
</style>