// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			currentAdmin: {
				id: string;
				name: string;
				establishmentId: number;
				establishmentName: string;
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
