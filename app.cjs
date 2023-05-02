async function loadApp() {
    const { app } = await import("./build/index.js"); // this is your normal entry file - (index.js, main.js, app.mjs etc.)
}

loadApp()