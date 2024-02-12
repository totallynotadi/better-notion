
const { app, BrowserWindow } = require("electron");

const path = require("path");
const fs = require("node:fs");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
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

    mainWindow.loadURL("https://notion.so");

    return mainWindow;
};

app.whenReady().then(() => {
    let mainWindow = createWindow();

    let contents = mainWindow.webContents;

    fs.readFile('./assets/styles.css', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        contents.insertCSS(data);
    });
});
