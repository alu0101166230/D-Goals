// function suma(a, b) {
//   return a + b;
// }
// module.exports = suma;

//http://nodejs.dev/learn/making-http-requests-with-nodejs
const http = require('http')
/// Funcion que realiza una peticion POST a una ruta  y con unos datos dados

async function GET_REQ(path_){
  return new Promise (()=>{
    const options = {
      hostname: 'localhost',
      port: 8081,
      path: path_,
      method: 'GET'
    }
    
    const req = http.request(options, res => {
      // console.log(`statusCode: ${res.statusCode}`)
      var data = ""
      res.on('data', d => {
        data += d;
      })
      res.on('end', () => {
        console.log(req.data); // 'Buy the milk'
        
      })
    })

    var  peticion = req;
    req.on('error', error => {
      // console.error(error)
    })
    // peticion= "Asdf";
    req.end()
    return peticion;
  });
}


module.exports=GET_REQ;