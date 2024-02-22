const { ipcRenderer, contextBridge } = require("electron/renderer");

contextBridge.exposeInMainWorld('electronAPI', {
    gotCreds: (username, password) => ipcRenderer.send('got-creds', username, password),
})