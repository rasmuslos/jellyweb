/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Locals {
        session: Session,
    }

	interface Platform {}

	interface Session {
        data: SessionData,
        destroy: () => any,
    }

	interface Stuff {}
}