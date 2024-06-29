document.querySelector('#toggle-dark-mode').addEventListener('click', async () => {
    const isDark = await window.darkMode.toggle();
    document.querySelector('#theme-source').innerHTML = isDark ? 'Dark' : 'Light'
})


document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
}) 
