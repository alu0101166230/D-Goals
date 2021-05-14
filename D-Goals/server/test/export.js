// function suma(a, b) {
//   return a + b;
// }
// module.exports = suma;

//http://nodejs.dev/learn/making-http-requests-with-nodejs
const http = require('http')
/// Funcion que realiza una peticion POST a una ruta  y con unos datos dados
function POST_REQ(path_,data_){
  var body = [];
  new Promise (function (resolve, reject){

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
      console.log("-------------------");
      console.log(body);
      res.on('end', function() {
        try {
            body = JSON.parse(Buffer.concat(body).toString());
        } catch(e) {
            reject(e);
        }
        resolve(body);
      });
      
    })
    req.write(data)
    req.end()

    //// fin de promesa
  }).then(()=>{
    console.log("------------------------------------------");
    console.log(body)
  })
}

module.exports=POST_REQ;