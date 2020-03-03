import '@babel/polyfill'
import dotenv from 'dotenv'
import './db'
import app from './app'
import https from 'https'
import fs from 'fs'
dotenv.config()

import './models/Video'
import './models/Comment'
import './models/User'

const PORT = process.env.PORT || 4000

// const options = {
//   key: fs.readFileSync('./keys/private.pem'),
//   cert: fs.readFileSync('./keys/public.pem')
// }
const handleListening = () => {
  console.log(`★Listening on: http://lcalhost:${PORT}`)
}

app.listen(PORT, handleListening)

// https.createServer(options, app).listen(PORT, function () {
//   console.log('HTTPS server listening on port' + PORT)
// })
