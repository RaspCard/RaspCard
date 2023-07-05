import Default from "./components/Default.svelte";

import type { navigator } from './types';

export class Navigator implements navigator {
    forms: any[] = [Default];
    position: number = 0;

    constructor(forms: any[]) {
        this.forms = this.forms.concat(forms);
        this.position = 0;
    }

    getNext() {
        if (this.position < this.forms.length - 1) {
            this.position++;
        } else {
            this.position = 0;
        }
        return this.forms[this.position];
    }

    getPrevious() {
        if (this.position > 0) {
            this.position--;
        } else {
            this.position = this.forms.length - 1
        }
        return this.forms[this.position];
    }
}