export const getPlugin = async (system: string) => {
    let mod;
    try {
        mod = await import(`./${system}/mod.ts`);
        console.log(`Loaded plugin for ${system}`);
    } catch(e) {
        mod = await import(`./default/mod.ts`);
        console.log(`No plugin for ${system}, loading default`);
    }

    return mod;
}