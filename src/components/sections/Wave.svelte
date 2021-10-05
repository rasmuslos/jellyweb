<script lang="ts">
    export let colored: boolean = true
    export let rotated: boolean = false
</script>

<style>
    section {
        position: relative;
        display: block;
    }
    section.rotated {
        transform: rotate(180deg);
    }

    svg {
        display: block;
        position: relative;
        bottom: -1px;
    }

    section:not(.colored) svg {
        fill: var(--background);
    }
    section.colored {
        background-color: var(--background);
    }
    section.colored svg {
        fill: var(--background-light);
    }
</style>

<section class:colored class:rotated>
    <!-- https://getwaves.io -->
    <svg class:colored xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill-opacity="1" d="M0,96L48,106.7C96,117,192,139,288,176C384,213,480,267,576,266.7C672,267,768,213,864,170.7C960,128,1056,96,1152,112C1248,128,1344,192,1392,224L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
</section>