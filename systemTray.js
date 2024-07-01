const { app, Tray, Menu } = require('electron')
const path = require("path")
const { getMainWindow, mainWindowIsExist } = require('./windows/mainWindow')

let tray = null
const iconPath = path.join(__dirname, './logo.png')

function initTray() {
    tray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '退出',
            click: () => {
                // 定义一个变量 表示当前是退出程序 而不是关闭程序
                app.isQuiting = true
                app.quit()
            }
        },
        {
            label: '打开应用',
            click: () => {
                mainWindowIsExist() && getMainWindow().show()
            }
        }
    ])
    tray.setToolTip('这是一个系统托盘')
    tray.setContextMenu(contextMenu)
    tray.on('click', () => {
        mainWindowIsExist() && getMainWindow().show()
    })
}

function getTray() {
    return tray
}

module.exports = {
    initTray,
    getTray
}
