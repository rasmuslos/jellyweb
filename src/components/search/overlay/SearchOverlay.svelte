<script lang="ts">
    import {icons} from "feather-icons";
    import {modal} from "$lib/stores";
    import {addClass, removeClass} from "$lib/helper";
    import {goto} from "$app/navigation";

    let search: string = ""
    let index: number = -1
    let selected

    const handleKeydown = (event: KeyboardEvent) => {
        const items = document.querySelectorAll(".result")
        const length = items.length - 1

        if(event.key === "ArrowDown") {
            index++

            if(selected) {
                removeClass(selected, "active")
                const next = items[index]

                if(typeof next !== undefined && index <= length) selected = next
                else {
                    index = 0;
                    selected = items[0]
                }
            } else {
                index = 0;
                selected = items[0]
            }
            addClass(selected, "active")
        } else if(event.key === "ArrowUp") {
            if(selected) {
                index--
                removeClass(selected, "active")

                const next = items[index]
                if (typeof next !== undefined && index >= 0) selected = next
                else {
                    index = length;
                    selected = items[length];
                }
            } else {
                index = 0
                selected = items[length]
            }
            addClass(selected, "active")
        } else if(event.key === "Enter") {
            const item = selected && selected.dataset && selected.dataset.item ?? 0

            if(item == 0) return
            else if(item == -1) return goto(`/search/?query=${encodeURIComponent(search)}`)
            else alert(item)
        }
    }
</script>
<svelte:window on:keydown={handleKeydown} />

<style>
    div.holder {
        position: relative;
        overflow: hidden;

        height: 100%;
        width: 100%;

        border-radius: 10px;
        background-color: var(--background-light);

        color: var(--text);
        font-family: var(--font);
    }

    input {
        width: 100%;
        height: 50px;

        margin: 0;
        padding: 10px 50px 10px 20px;

        background-color: transparent;
        border: none;

        color: var(--text);
        font-weight: 600;
        font-family: var(--font);
    }
    input:focus {
        outline: none;
    }

    div.results {
        width: 100%;
        padding: 0 20px 20px 20px;

        cursor: pointer;
    }
    div.result {
        display: grid;
        grid-template-columns: 30px 1fr;
        align-items: center;

        transition: padding 200ms ease;
        border-radius: 5px;

        margin: 0 0 7px 0;
        padding: 5px 0;
    }
    div.result:global(.active) {
        background-color: var(--highlight);
        padding: 5px 7px;
    }

    div.close {
        position: absolute;
        top: 15px;
        right: 20px;

        cursor: pointer;
    }
</style>

<div class="holder">
    <input placeholder="Search" type="text" bind:value={search} />
    <div class="results">
        <div class="result dimmed" data-item="-1">
            <div class="icon">{@html icons.search.toSvg()}</div>
            <span>Advanced search</span>
        </div>

        <div class="result">
            <div class="icon">{@html icons.feather.toSvg()}</div>
            <span>PLACEHOLDER</span>
        </div>
        <div class="result">
            <div class="icon">{@html icons.feather.toSvg()}</div>
            <span>PLACEHOLDER</span>
        </div>
        <div class="result">
            <div class="icon">{@html icons.feather.toSvg()}</div>
            <span>PLACEHOLDER</span>
        </div>
        <div class="result">
            <div class="icon">{@html icons.feather.toSvg()}</div>
            <span>PLACEHOLDER</span>
        </div>
        <div class="result">
            <div class="icon">{@html icons.feather.toSvg()}</div>
            <span>PLACEHOLDER</span>
        </div>
        <div class="result">
            <div class="icon">{@html icons.feather.toSvg()}</div>
            <span>PLACEHOLDER</span>
        </div>
    </div>

    <div class="close" on:click={() => modal.set(null)}>{@html icons["minimize-2"].toSvg({ height: 17, width: 17, stroke: "var(--text)" })}</div>
</div>