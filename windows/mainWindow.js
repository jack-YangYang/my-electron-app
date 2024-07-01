const { BrowserWindow, app } = require('electron')
const path = require('path')

let mainWindow = null

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: truem,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.on('closed', () => {
        console.log('closed => closed')
        mainWindow = null
    })

    // 当窗口关闭时触发
    mainWindow.on('close', (event) => {
        console.log('close => close');
        // isQuiting 变量用于判断是否是用户主动退出 还是手动关闭
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
