const jsdom = require('jsdom')
const {JSDOM} = jsdom
const fs = require('fs')
const simpleGit = require('simple-git')
const path = require('path')
const https = require('https')
const octokit = require('@octokit/rest')
const config = require('../../config/config')

const createFile = async ({_id, questionTitle, code}) => {
    return new Promise((resolve, reject) => {
        try{
            const dom = new JSDOM(code)
            elements = dom.window.document.querySelectorAll('.CodeMirror-line')

            if(!fs.existsSync(config.dir)) {
                fs.mkdirSync(config.dir)
            }

            process.chdir(config.dir)

            let file = fs.createWriteStream(`${_id}_${questionTitle}.txt`)

            file.on('error', (err) => {
                console.log(err)
            })

            elements.forEach((element) => {
                file.write(`${element.textContent}\n`)
            })

            file.end()
            resolve()
        } catch(err) {
            reject('Could not write to file')
        }
    })
}

const initialiseRepo = (git) => {
    return git.init().then(() => git.add('./*')).then(() => git.commit('Init commit')).then(() => git.addRemote('origin', `https://${config.username}:${config.password}@github.com/${config.username}/${config.repoName}`)).then(() => git.push(['-u', 'origin', 'master']))
}

const checkLocalRepo = async (git) => {
    return new Promise(async (resolve) => {
        const res = await git.checkIsRepo()
        console.log(res)
        resolve(res)
    })
}

const checkGithubRepo = () => {
    https.get(`https://github.com/${config.username}/${config.repoName}`, async (res) => {
        if (res.statusCode === 404) {
            const user = new octokit.Octokit({
                auth: config.privateKey
            })

            try {
                const { data } = await user.request('/user')

                user.repos.createForAuthenticatedUser({
                    name: config.repoName,
                    description: config.repoDesc
                })
            } catch (err) {
                throw new Error(err)
            }
        }
    })
}

const push = async ({_id, questionTitle, code}) => {
    // const dir = path.join(__dirname, '../../Solutions')
    process.chdir(config.dir)

    checkGithubRepo()

    const git = simpleGit(config.dir)
    
    const isRepo = await checkLocalRepo(git)

    if(!isRepo) {
        console.log('yes')
        git.checkIsRepo().then((isRepo) => !isRepo && initialiseRepo(git)).then(() => git.fetch())
        return
    }
    else {
        try {
            await git.pull()
            await git.add('.')
            await git.commit(`${_id}_${questionTitle}`)
            await git.push('origin', 'master')
        } catch (err) {
            throw new Error(err)
            console.log(err)
        }
    }
}

module.exports = {
    createFile,
    push
}
