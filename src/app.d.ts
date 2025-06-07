// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { PoolClient } from "pg";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: PoolClient
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
