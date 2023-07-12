import * as defaultPlugin from '$lib/plugins/default/mod';
import { UpdaterFailure } from './kit';
import type { Plugin } from "./types";

export async function getPlugin(system: string) : Promise<Plugin> {
    let mod;
    try {
        mod = await import(`./${system}/mod.ts`);
        console.log(`Loaded plugin for ${system}`);
    } catch(e) {
        mod = await import(`./default/mod`);
        console.log(`No plugin for ${system}, loading default`);
    }

    return mod;
}

export async function getUpdater(updater: string, mod: Plugin) : Promise<CallableFunction | UpdaterFailure> {
    let func: CallableFunction | undefined;
    
    if (updater === 'default') {
        func = await defaultPlugin.updaters['defaultUpdater'];
    } else {
        func = await mod.updaters[updater.concat('Updater')];
    }

    if (func === undefined) {
        return new UpdaterFailure(false, 'Errore interno');
    }

    return func;
}