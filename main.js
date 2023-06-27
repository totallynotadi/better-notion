if (require("electron-squirrel-startup")) return;

const { app, BrowserWindow } = require("electron");
if (handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require("child_process");
    const path = require("path");

    const appFolder = path.resolve(process.execPath, "..");
    const rootAtomFolder = path.resolve(appFolder, "..");
    const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true,
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case "--squirrel-install":
        case "--squirrel-updated":
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(["--createShortcut", exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case "--squirrel-uninstall":
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(["--removeShortcut", exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case "--squirrel-obsolete":
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            app.quit();
            return true;
    }
}

const path = require("path");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        title: "BetterNotion",
        icon: "./assets/notion.ico",
        titleBarOverlay: {
            color: "#19191900",
            symbolColor: "#cfcfcf",
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
            padding-top: 3px !important;
        }

        .notion-body {
            background: #191919 !important;
        }
        
        .notion-topbar > div > div[style="flex-grow: 1; flex-shrink: 1;"] {
            height: 100%;
            -webkit-app-region: drag;
        }

        .notion-peek-renderer > div[style="flex-direction: column; position: absolute; display: flex; margin-left: auto; background: rgb(32, 32, 32); box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px; top: 0px; right: 0px; width: 100%; height: 100%; border-radius: 0px;"] {
            padding-top: 44px !important;
        }
        .notion-peek-renderer > div > div:nth-child(2) > div:nth-child(1) {
            padding-left: 50px !important;
            padding-right: 9px important;
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
        .shadow-cursor-breadcrumb div[style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px;"] {
            padding-left: 0px !important;
            padding-right: 0px !important;
        }

        .shadow-cursor-breadcrumb div[data-block-id] > a {
            padding: 0px 8px !important;
        }

        .shadow-cursor-breadcrumb div[role="button"] {}

        .shadow-cursor-breadcrumb img {
            margin-left: -4px !important;
            margin-right: -4px !important;
        }
        `
    );
});
