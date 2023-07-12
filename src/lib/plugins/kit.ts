import type { ComponentType } from "svelte";
import Default from "./default/components/Default.svelte";

export class Navigator {
    components: ComponentType[] = [Default];
    position: number = 0;

    constructor(components: ComponentType[]) {
        this.components = this.components.concat(components);
        this.position = 0;
    }

    getCurrent() {
        return this.components[this.position];
    }

    getNext() {
        if (this.position < this.components.length - 1) {
            this.position++;
        } else {
            this.position = 0;
        }
        return this.components[this.position];
    }

    getPrevious() {
        if (this.position > 0) {
            this.position--;
        } else {
            this.position = this.components.length - 1
        }
        return this.components[this.position];
    }
}

export class UpdaterFailure {
    success: boolean;
    message: string;

    constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message;
    }
}

export function parseStoredPlugin<T>(json: string): T {
    return JSON.parse(json) as T;
}