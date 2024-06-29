const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    getUserInfo: () => ipcRenderer.invoke('get-user-info'),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    asynchronousMessage: () => ipcRenderer.send('asynchronous-message', 'ping'),
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
    counterValue: (value) => ipcRenderer.send('counter-value', value)
})


ipcRenderer.on('asynchronous-reply', (_event, arg) => {
    console.log(arg, 'arg')
    return arg
})
