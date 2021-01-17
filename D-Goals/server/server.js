const express = require ('express');
const app = express();

const {mongoose} = require('./mongoose');
const bodyParser = require('body-parser');
const {Usuario} = require('./models/index');

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

// Login de la aplicacion
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

// app.patch("/lists/:id",(req,res)=>{
//   List.findOneAndUpdate({_id: req.params.id},{
//     $set: req.body
//   }).then(()=>{
//     res.sendStatus(200);
//   });
// });

// app.delete("/lists/:id",(req,res)=>{
//   List.findOneAndRemove({
//     _id: req.params.id
//   }).then((removeListDoc)=>{
//     res.send(removedListDoc)
//   });

// });

// app.get('/lists/:listID/tasks',(req,res)=>{
//   Task.find({
//     _listId:req.params.listId
//   }).then(()=>{
//     res.send(tasks);
//   })
// });
   
// app.post('/lists/:listId/tasks',(req,res)=>{
//   let newTask = new Task({
//     title: req.body.title,
//     _listId: req.params.listId
//   });
//   newTask.save().then((newTaskDoc)=>{
//     res.send(newTaskDoc);
//   })
// })

// app.patch('/lists/:listId/tasks/:tasId',(req,res)=>{
//   Task.findOneAndUpdate({
//     _id:req.params.taskId,
//     _listId:req.params.listId
//   },{
//     $set:req.body
//   }).then(()=>{
//     res.sendStatus(200);
//   })
// });

// app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
//   Task.findOneAndRemove({
//     _id:req.params.taskId,
//     _listId:req.params.listId
//   }).then((removedTaskDoc)=>{
//     res.send(removedTaskDoc);
//   })
// });


app.listen('8081','0.0.0.0',()=>{
  console.log("El servidor esta corriendo en el puerto 8081");
})

