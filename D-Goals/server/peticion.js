//https://nodejs.dev/learn/making-http-requests-with-nodejs
const https = require('http')

const data = JSON.stringify({
//  name: 'correr',
//  description: "correr es una actividad sana que nos permite mejorar el metabolismo"
})

const options = {
  hostname: 'localhost',
  port: 8081,
  path: '/get_habit',
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()