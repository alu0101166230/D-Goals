// //https://nodejs.dev/learn/making-http-requests-with-nodejs
// const https = require('http')

// const data = JSON.stringify({
//   // user: 'Carol',
//   // password: '1234567123',
//   // email: "estoesunemail@gg.com"
// })

// const options = {
//   hostname: 'localhost',
//   port: 8081,
//   path: '/get_habit',
//   method: 'POST', 
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length
//   }
// }
// var respuesta;
// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     respuesta = d;
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.write(data)
// // console.log(respuesta.body)
// req.end()

const http = require('http')
/// Funcion que realiza una peticion POST a una ruta  y con unos datos dados
function POST_REQ(path_,data_){
  var body = [];
  var resultado ="";
  
    
  const data = JSON.stringify(data_)
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
  var req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    
    res.on('data', function(chunk) {
      body.push(chunk);
    });

  })
  req.write(data)
  req.end()
  resultado = JSON.stringify(body)
  console.log(resultado)
  return  resultado; 
}

var objeto = {}

var respuesta = POST_REQ("/get_habit",objeto);
console.log("las respuesta es \n"+respuesta);