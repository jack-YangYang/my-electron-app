const { app } = require('electron')
const { createMainWindow } = require('./windows/mainWindow')
const { initTray } = require('./systemTray')

app.on('ready', () => {
    createMainWindow()
    initTray()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (!mainWindowIsExist()) {
        createMainWindow()
    }
})
