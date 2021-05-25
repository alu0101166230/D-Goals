const https = require('http')

function GET_REQ(path_){
  
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: path_,
    method: 'GET'
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

  req.end()
}

function POST_REQ(path_, data){
  
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: path_,
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
}


function DEL_REQ (path_,data){
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: path_,
    method: 'DELETE',
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

}


let resultado =GET_REQ("/habit");
// const data = JSON.stringify({
//   name: 'comprar leche',
//   description:'ir a comprar leche es necesario'
// })

// let resultado = POST_REQ("/habit",data)
// let resultado = DEL_REQ("/habit",data)
console.log(resultado)