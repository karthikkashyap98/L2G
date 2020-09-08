const postData = async () => {
    const response = await fetch('https://localhost:3000/code', options)
    if (response.status === 200) {
        alert('Successful. Check logs on server')
    } else {
        alert('Retry. Check logs on server')
    }
}

const code = document.querySelector('.CodeMirror-code').innerHTML

const questionElement = document.querySelector('.css-v3d350').innerText.split('.')

const data = {
    questionNumber: questionElement[0],
    questionTitle: questionElement[1],
    code
}

const options = {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
}

postData()

// module.exports = postData