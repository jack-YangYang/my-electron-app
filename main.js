const { app, BrowserWindow, MessageChannelMain } = require('electron/main')
const path = require('node:path')


function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    const secondaryWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            contextIsolation: false,
            preload: path.join(__dirname, 'preloadSecondary.js')
        }
    })

    // 建立通道
    const { port1, port2 } = new MessageChannelMain()
    mainWindow.once('ready-to-show', () => {
        mainWindow.webContents.postMessage('port', 'null', [port1])
    })
    secondaryWindow.once('ready-to-show', () => {
        secondaryWindow.webContents.postMessage('port', 'null', [port2])
    })
    // 监听通道消息
    mainWindow.loadFile('index.html')

}

app.whenReady().then(() => {
    createWindow()


    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})