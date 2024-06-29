const setButton = document.getElementById('btn')
const getUserInfoBtn = document.getElementById('getUserInfo')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
})

getUserInfoBtn.addEventListener('click', async () => {
    window.electronAPI.getUserInfo().then((userInfo) => {
        console.log(userInfo)
    })
})


const openFileBtn = document.getElementById('openFile')
openFileBtn.addEventListener('click', async () => {
    const result = await window.electronAPI.openFile()
    console.log(result)
})


const asynchronousMessage = document.getElementById('asynchronousMessage')
asynchronousMessage.addEventListener('click', async () => {
    const result = await window.electronAPI.asynchronousMessage()
    console.log(result, 'result')
})
const counter = document.getElementById('counterValue')
window.electronAPI.onUpdateCounter(value => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value;
    document.getElementById('counterValue').innerText = newValue;
    window.electronAPI.counterValue(oldValue)
})

const getCountValue = document.getElementById('getCountValue')
getCountValue.addEventListener('click', async () => {
    const oldValue = document.getElementById('counterValue').innerText;
    window.electronAPI.counterValue(oldValue)
})