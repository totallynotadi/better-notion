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

    if (!authRespDetails?.firstAuthAttempt) {
        console.log('incorrect credentials');
    }

    console.log('auth callback info:', authInfo);

    const proxyCredsWindow = new BrowserWindow({
        width: 600,
        height: 300,
        title: "Proxy Authentication",
        webPreferences: { preload: path.join(__dirname, 'preload.js') },
        resizable: false,
        minimizable: false,
        fullscreenable: false,
        titleBarOverlay: {
            color: "#19191900",
            symbolColor: "#cfcfcf",
            height: 45,
        },
        parent: global.browserWindow,
        titleBarStyle: "hidden",
        backgroundColor: "#191919",
    })
    await proxyCredsWindow.loadFile(path.join(__dirname, 'index.html'));

    proxyCredsWindow.webContents.send("send-proxy-addr", authInfo.host, authInfo.port);

    global.proxyCredsWindow = proxyCredsWindow;
    global.authCallback = callback;
})

const createWindow = async () => {
    const browserWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        title: "BetterNotion",
        icon: path.join(__dirname, "assets", "notion.ico"),
        backgroundMaterial: "acrylic",
        titleBarOverlay: {
            color: "#19191900",
            symbolColor: "#cfcfcf",
            height: 45,
        },
        webPreferences: {
            nodeIntegration: true,
            experimentalFeatures: true,
            webviewTag: true,
        },
        titleBarStyle: "hidden",
        backgroundColor: "#191919",
    });
    global.browserWindow = browserWindow;

    browserWindow.webContents.on('did-finish-load', (e) => {
        decorateWebContents(browserWindow);
    })
    browserWindow.webContents.on('dom-ready', (e) => {
        // browserWindow.hide()
        browserWindow.webContents.executeJavaScript(`
            setTimeout(() => {
                const bottomOptions = document.querySelector('#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(3) > div > div:nth-child(4) > div > div > div:nth-child(2)');
                const bottomOptionsContainer = document.querySelector('#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(3) > div > div:nth-child(5)');
                const upgradeButton = document.querySelector("#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(3) > div > div:nth-child(5) > div:nth-child(2)");
    
                upgradeButton.parentNode.removeChild(upgradeButton);
                bottomOptions.parentNode.removeChild(bottomOptions);
                bottomOptionsContainer.appendChild(bottomOptions);
                bottomOptionsContainer.style.padding = "8px !important;";
            }, 3500);
        `).then((res) => {
            // browserWindow.show();
        }, (err) => {
            console.error(`error on dom access: ${err}`);
            // browserWindow.show();
        });
    });

    try {
        await browserWindow.loadURL(URL);
    } catch (error) {
        console.log('errorred when loading URL in main window');
    }

    return browserWindow;
};

app.whenReady().then(() => {
    createWindow();
});

const decorateWebContents = (window) => {
    let contents = window.webContents

    contents.insertCSS(`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

        :root, *, div[style~="ui-sans-serif,"] {
            font-family: "Inter", apple-system, Helvetica, Arial, sans-serif !important;
        }

        .notion-sidebar {
            padding-top: 3px !important;
        }

        .notion-body {
            background: #191919 !important;
        }

        div[style="flex-grow: 1; flex-shrink: 1;"] {
            height: 100%;
            -webkit-app-region: drag;
            user-select: none;
            -webkit-user-select: none;
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
        .notion-ai-button {
            display: none !important;
        }

        ::-webkit-scrollbar-thumb {
            border: none !important;
        }
        ::-webkit-scrollbar {
            width: 8px !important;
            height: 8px !important;
        }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div {
            margin-left: -3px !important;
            width: 8px !important;
        }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(3) > div > div:nth-child(5) > div:nth-child(2) {
            padding: 6px 4px !important;
        }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(3) > div > div:nth-child(4) > div > div > div {
            gap: 0px !important;
        }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(3) > div > div:nth-child(4) > div {
            padding: 0px 8px 20px !important;
        }
    `);
}
