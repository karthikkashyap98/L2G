// import postData from './content_script'

document.querySelector('#push').addEventListener('click', (e) => {
    e.preventDefault()
    chrome.tabs.executeScript({
        file: 'content_script.js'
    })
    // chrome.tabs.executeScript(() => {
    //     postData()
    // })
})