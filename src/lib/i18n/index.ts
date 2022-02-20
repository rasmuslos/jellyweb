import {addMessages, init, register} from "svelte-i18n";
import en from "./en.json"

addMessages("en", en)
register("de", () => import("./de.json"))

init({
    initialLocale: "en",
    fallbackLocale: "en",
})