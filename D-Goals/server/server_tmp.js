const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const { TypedRule } = require('tslint/lib/rules');
const Schema = mongoose.Schema;
const db=mongoose.connection;
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
const opciones = {
  user:"user",
  pass:"usuario1",
  useUnifiedTopology: true,
  useNewUrlParser:true
};

//var conn_u = mongoose.createConnection('mongodb://10.6.129.31:8082/app_user',opciones).then(()=>{
//  console.log("Conexion a la base de datos correcta");
//}).catch((e)=>{
//  console.log("Error al conectar con la base de datos");
//  console.log(e);
//});
mongoose.Promise=global.Promise
mongoose.connect('mongodb://10.6.129.31:8082/app_habit',opciones).then(()=>{
  console.log("Conexion a la base de datos correcta");
}).catch((e)=>{
  console.log("Error al conectar con la base de datos");
  console.log(e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

const Schema_usuario =  new Schema({
  nombre:{ type: String,unique:true},
  schema_version:{type: Number},
  correo:{type:String,unique:true},
  password:{type:String},
  habito:{type:Object},
  numero_de_horas_totales:{type: Number,default:0},
  tareas_cumplidas:{type:Number,default:0},
  dias_seguidos:{type:Number,default:0}
})


const Schema_habito = new Schema({
  nombre:{type: String,unique:true},
  descripcion:{type:String}
})

//const Usuario = db.model('usuarios',Schema_usuario);
const Habito = mongoose.model('habit',Schema_habito);

///////////////////////////////////////////////////////////////////////////
app.post("/login",(req,res)=>{
  // guardamos los parametros de usuario y password
  let user = req.body.user;
  let pass = req.body.password;
  // hacemos la consulta segun el usuario y la pass, retornamos el perfil
  Usuario.find({nombre:user,password:pass}).then((lists)=>{
    res.send(lists);
    console.log("Todo funciona bien");
  }).catch((e)=>{
    res.send(e);
  });
  
});

app.post("/singin",(req,res)=>{
  // Creamos el objeto de perfil nuevo, conforme a la informacion proporcionada por el formulario html 
  let newUser = new Usuario({
    nombre : req.body.user,
    password : req.body.password,
    correo : req.body.email,
    schema_version:1.1
  });
  // Escribimos en la Base de datos el nuevo perfil
  newUser.save().then((listDoc)=>{
    res.send(listDoc);
  })
})
///////////////////////////////////////////////////////////////////////////

app.post("/add_habit",(req,res)=>{
  let newHabit = new Habito({
    nombre : req.body.name,
    descripcion: req.body.description
  });
  newHabit.save().then((listDoc)=>{
    res.send(listDoc);
  })
})

app.post("/get_habit",(req,res)=>{
  Habito.find().then((lists)=>{
    res.send(lists);
    console.log(lists);
  }).catch((e)=>{
    res.send(e);
  });
})




app.listen('8081','0.0.0.0',()=>{
  console.log("El servidor esta corriendo en el puerto 8081");
})