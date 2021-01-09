//https://nodejs.dev/learn/making-http-requests-with-nodejs
const https = require('http')

const data = JSON.stringify({
  user: 'CArol',
  password: '1234567123'
})

const options = {
  hostname: 'localhost',
  port: 2523,
  path: '/login',
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