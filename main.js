const { app } = require('electron')
const { createMainWindow } = require('./windows/mainWindow')
const { initTray } = require('./systemTray')

app.on('ready', () => {
    createMainWindow()
    initTray()
})

app.on('window-all-closed', () => {
    // 不是Mac OS系统
    if (process.platform !== 'darwin') {
        console.log('window-all-closed => window-all-closed')
        app.quit()
    }
})

// Mac OS系统 时被激活
app.on('activate', () => {
    if (!mainWindowIsExist()) {
        console.log('activate', mainWindowIsExist())
        createMainWindow()
    }
})
