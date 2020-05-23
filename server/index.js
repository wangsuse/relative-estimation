const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080
module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets')



async function createApp() {
  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))
  // sends index.html

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })
  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

async function startListening() {
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )
}


async function bootApp() {
  await createApp()
  await startListening()
}

bootApp();
