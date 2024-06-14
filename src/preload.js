const { ipcRenderer, contextBridge } = require("electron/renderer");

contextBridge.exposeInMainWorld('electronAPI', {
    onGotCreds: (username, password) => ipcRenderer.send('got-creds', username, password),
    onProxyAddress: (callback) => ipcRenderer.on('send-proxy-addr', (event, hostname, port) => callback(hostname, port)),
});