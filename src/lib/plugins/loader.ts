import type { plugin } from "./types";

export const getPlugin = async (system: string) : Promise<plugin> => {
    let mod;
    try {
        mod = await import(`./${system}/mod`);
        console.log(`Loaded plugin for ${system}`);
    } catch(e) {
        mod = await import(`./default/mod`);
        console.log(`No plugin for ${system}, loading default`);
    }

    return mod;
}