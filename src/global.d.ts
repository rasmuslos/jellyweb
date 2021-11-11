/// <reference types="@sveltejs/kit" />
import {Writable} from "svelte/store";
import type {Session} from "$lib/typings/jellyfin";

interface ImportMetaEnv {
    VITE_HOST: string;
}
declare module '$app/stores' {
    export const session: Writable<Session>;
}