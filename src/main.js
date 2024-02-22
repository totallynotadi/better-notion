const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("path");

const URL = "https://notion.so";

ipcMain.on('got-creds', async (event, name, pass) => {
    if (global.authCallback !== undefined) {
        global.authCallback(name, pass)
        global.proxyCredsWindow.close()
    }
});

app.on('login', async (event, webContents, authRespDetails, authInfo, callback) => {
    global.shouldReturn = false;
    event.preventDefault();

    if (!authRespDetails.firstAuthAttempt) {
        console.log('incorrect credentials')
    }

    console.log('auth callback info: ', authInfo);

    const proxyCredsWindow = new BrowserWindow({
        width: 800,
        height: 400,
        title: "Proxy Authentication",
        webPreferences: { preload: path.join(__dirname, 'preload.js') },
        titleBarOverlay: {
            color: "#19191900",
            symbolColor: "#cfcfcf",
            height: 45,
        },
        parent: global.browserWindow,
        titleBarStyle: "hidden",
        backgroundColor: "#191919",
    })
    proxyCredsWindow.loadFile(path.join(__dirname, 'index.html'))
    global.proxyCredsWindow = proxyCredsWindow;
    global.authCallback = callback;
})

const createWindow = async () => {
    const browserWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        title: "BetterNotion",
        icon: path.join(__dirname, "assets", "notion.png"),
        titleBarOverlay: {
            color: "#19191900",
            symbolColor: "#cfcfcf",
            height: 45,
        },
        titleBarStyle: "hidden",
        backgroundColor: "#191919",
    });
    global.browserWindow = browserWindow;

    try {
        await browserWindow.loadURL(URL)
    } catch (error) {
        console.log('errorred out when laoding URL in main window')
    }

    return browserWindow;
};

app.whenReady().then(async () => {
    let mainWindow = await createWindow()

    decorateWebContents(mainWindow)
});

const decorateWebContents = (window) => {
    let contents = window.webContents;

    contents.insertCSS(`
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

    div[style~="ui-sans-serif,"] {
        font-family: "Inter", apple-system, Helvetica, Arial, sans-serif !important;
    }

    .notion-sidebar {
        padding-top: 3px !important;
    }

    .notion-body {
        background: #191919 !important;
    }

    .notion-topbar > div > div[style="flex-grow: 1; flex-shrink: 1;"] {
        height: 100%;
        -webkit-app-region: drag;
    }

    .notion-peek-renderer
        > div[style="flex-direction: column; position: absolute; display: flex; margin-left: auto; background: rgb(32, 32, 32); box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px; top: 0px; right: 0px; width: 100%; height: 100%; border-radius: 0px;"] {
        padding-top: 44px !important;
    }

    .notion-peek-renderer > div > div:nth-child(2) > div:nth-child(1) {
        padding-left: 50px !important;
        padding-right: 9px !important;
    }

    .notion-topbar {
        padding-top: 2px !important;
    }

    .notion-topbar-action-buttons {
        margin-right: 9rem;
    }

    .shadow-cursor-breadcrumb span {
        margin: 0px 3px !important;
    }

    .shadow-cursor-breadcrumb div[class="notranslate"],
    .shadow-cursor-breadcrumb
        div[style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px;"] {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }

    .shadow-cursor-breadcrumb div[data-block-id] > a {
        padding: 0px 8px !important;
    }

    .shadow-cursor-breadcrumb img {
        margin-left: -4px !important;
        margin-right: -4px !important;
    }
    #notion-app > div > div:nth-child(1) > div > div:nth-child(4) {
        display: none !important;
    }
`);
}
