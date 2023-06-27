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

    // see https://stackoverflow.com/questions/34303423/is-it-possible-to-have-a-css-selector-based-on-a-css-property-and-its-value
    contents.insertCSS(
        `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        div[style~="ui-sans-serif,"] {
            font-family: 'Inter', apple-system, Helvetica, Arial, sans-serif !important;
        }

        .notion-sidebar-container {
            padding-top: 2rem !important;
        }
        .notion-topbar > div > div[style="flex-grow: 1; flex-shrink: 1;"] {
            height: 100%;
            -webkit-app-region: drag;
        }
        .notion-topbar-action-buttons {
            margin-right: 9rem;
        }
        `
    );
});

// .notion-topbar {
//     margin-top: 2rem !important;
//     background-color: red;
//     height: 100%;
// }
