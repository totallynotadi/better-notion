const { app, BrowserWindow } = require("electron");
const {
    setupTitlebar,
    attachTitlebarToWindow,
} = require("custom-electron-titlebar/main");

const path = require("path");

// setupTitlebar();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        title: "Notion",
        titleBarOverlay: {
            color: "#19191900",
            // color: "ffffff",
            symbolColor: "#ffffff",
            height: 44,
        },
        titleBarStyle: "hidden",
        backgroundColor: "#191919",
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.loadURL("https://notion.so");

    // attachTitlebarToWindow(mainWindow);
    return mainWindow;
};

app.whenReady().then(() => {
    let mainWindow = createWindow();

    let contents = mainWindow.webContents;

    contents.insertCSS(
        `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .notion-app {
            font-family: 'Inter', Helvetica, apple-system, sans-serif;
        }

        .notion-sidebar-container {
            padding-top: 2rem !important;
        }
        .notion-topbar > div > div:nth-child(2) {
            height: 100%;
            -webkit-app-region: drag;
        }
        .notion-topbar-action-buttons {
            margin-right: 9rem;
        }
        `
    );
});
