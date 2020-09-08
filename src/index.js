const express = require('express')
const fs = require('fs')
const https = require('https')
const Solution = require('./models/solution')
const lib = require('./utils/lib')
const cors = require('cors')
require('./db/mongoose')

const key = fs.readFileSync('src/cert.key')
const cert = fs.readFileSync('src/cert.pem')

const app = express()
const port = 3000

const server = https.createServer({key, cert}, app)

app.use(cors())

app.use(express.json())

app.post('/code', async (req, res) => {
    console.log('Received')
    console.log(req.body)
    const solution = new Solution({
        _id: req.body.questionNumber,
        questionTitle: req.body.questionTitle,
        code: req.body.code
    })
    try {
        await solution.save()
        await lib.createFile(solution)
        await lib.push(solution)
        res.status(200).send()
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})