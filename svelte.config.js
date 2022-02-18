import preprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";

const config = {
	preprocess: preprocess(),
	kit: {
		target: "body",
		adapter: node({
			env: {
				host: "BIND",
			}
		})
	}
};

export default config;
