export const getPlugin = async (system: string) => {
    let mod;
    try {
        mod = await import(`./${system}/mod`);
    } catch(e) {
        mod = await import(`./default/mod`);
    }
}