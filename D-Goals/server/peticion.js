//https://nodejs.dev/learn/making-http-requests-with-nodejs
const https = require('http')

const data = JSON.stringify({
//  user: 'Carol',
//  password: '1234567123',
//  email: "estoesunemail@gg.com"
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