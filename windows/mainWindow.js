const { BrowserWindow, app } = require('electron')

let mainWindow = null

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // 当窗口关闭时触发
    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault()
            mainWindow.hide()
        }
    })
}

function getMainWindow() {
    return mainWindow
}

function mainWindowIsExist() {
    return mainWindow !== null
}

module.exports = { createMainWindow, getMainWindow, mainWindowIsExist }
