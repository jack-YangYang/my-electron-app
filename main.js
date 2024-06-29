const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron/main')
const path = require('node:path')

function handleSetTitle(event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
}

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (filePaths) return filePaths[0]
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => mainWindow.webContents.send('update-counter', 1),
                    label: 'Increment'
                },
                {
                    click: () => mainWindow.webContents.send('update-counter', -1),
                    label: 'Decrement'
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)
    ipcMain.on('set-title', handleSetTitle)
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg) // 在 Node 控制台中打印“ping”
        // 作用如同 `send`，但返回一个消息
        // 到发送原始消息的渲染器
        event.reply('asynchronous-reply', 'pong')
    })
    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
    ipcMain.on('counter-value', (_event, value) => {
        console.log(value) // will print value to Node console
    })
    ipcMain.handle('get-user-info', () => {
        return new Promise((resolve) => {
            const userInfo = {
                name: 'John Doe',
                age: 30
            }
            resolve(userInfo)
        })
    })
    ipcMain.handle('dialog:openFile', handleFileOpen)
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})