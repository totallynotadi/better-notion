const { app, BrowserWindow } = require("electron");

const path = require("path");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        titleBarOverlay: {
            color: "#19191900",
            symbolColor: "#ffffff",
            height: 45,
        },
        titleBarStyle: "hidden",
        backgroundColor: "#191919",
    });

    mainWindow.loadURL("https://notion.so");

    return mainWindow;
};

app.whenReady().then(() => {
    let mainWindow = createWindow();

    let contents = mainWindow.webContents;

    contents.insertCSS(
        `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        div[style~="ui-sans-serif,"] {
            font-family: 'Inter', apple-system, Helvetica, Arial, sans-serif !important;
        }

        .notion-sidebar {
            padding-top: 2px !important;
        }
        .notion-topbar > div > div[style="flex-grow: 1; flex-shrink: 1;"] {
            height: 100%;
            -webkit-app-region: drag;
        }

        .notion-topbar {
            padding-top: 2px !important;
        }
        
        .notion-topbar-action-buttons {
            margin-right: 9rem;
        }
        `
    );
});
