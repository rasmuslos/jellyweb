/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Locals {
        session: Session,
    }

	interface Platform {}

	interface Session {
        agent?: string,
        data: SessionData,
        destroy: () => any,
    }

	interface Stuff {}
}