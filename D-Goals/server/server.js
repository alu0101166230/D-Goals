const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


const {mongoose} = require('./mongoose');

const {Usuario} = require('./models/index');
const {Habito} = require ('./models/index');



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
  }).catch((e)=>{
    res.send(e);
  });
});

app.post("/update_usuario",(req,res)=>{
    let user = req.body.user;
    let cambio = req.body.cambio;
    let valor = req.body.valor;
    let query = { $set:{
        [cambio]:valor,
	nombre:user
    }}
	console.log(user);
	console.log(cambio);
	console.log(valor);
	console.log(query);
    Usuario.find({nombre:user}).then((lists)=>{
    res.send(lists);
    let cuenta = lists[0][cambio];
	console.log(cuenta);
    Usuario.updateOne ({[cambio]:cuenta,nombre:user},query,function(err,res){
	if (err) throw err;
	    console.log("1 document updated");
    });
    res.send();

  }).catch((e)=>{
    res.send(e);
  });

})
app.post("/usuario",(req,res)=>{
  let user = req.body.user;
  let nombre_habito = req.body.habit["nombre"];
  let habit = { $set: {
	habito:{
		[nombre_habito]:{
			dias:req.body.habit["dias"],
			horario:req.body.habit["horario"],
			horas:req.body.habit["horas"]
			}
		},
	nombre:user
	}
  };
  // hacemos la consulta segun el usuario y la pass, retornamos el perfil
  Usuario.find({nombre:user}).then((lists)=>{
    res.send(lists);
    let cuenta = lists[0];
    Usuario.updateOne ({habito:{vacio:true},nombre:user},habit,function(err,res){
	if (err) throw err;
	    console.log("1 document updated");
    });
    res.send();

  }).catch((e)=>{
    res.send(e);
  });

});

$addFields
app.post("/usuario",(req,res)=>{
  let user = req.body.user;
  let habit =req.body.habit;

  console.log(habit);
  // hacemos la consulta segun el usuario y la pass, retornamos el perfil
  Usuario.find({nombre:user}).then((lists)=>{
    res.send(lists);
    let cuenta = lists[0];
    Usuario.updateOne ({$addFields:{habito: habit}},function(err,res){
     if (err) throw err;
         console.log("1 document updated");
         db.close();

    });
    res.send();

  }).catch((e)=>{
    res.send(e);
  });

})

app.post("/singin",(req,res)=>{
  // Creamos el objeto de perfil nuevo, conforme a la informacion proporcionada por el formulario html 
  let newUser = new Usuario({
    nombre : req.body.user,
    password : req.body.password,
    correo : req.body.email,
    schema_version:1.1,
    habito: {
	vacio:true
	}
  });
  // Escribimos en la Base de datos el nuevo perfil
  newUser.save().then((listDoc)=>{
    res.send(listDoc);
  })
})

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


///////////////////////// Habitos /////////////////
app.delete("/habit",(req,res)=>{
  Habito.findOneAndRemove({
    nombre: req.body.name
  }).then((removed)=>{
    res.send(removed);
  })

})
app.post("/habit",(req,res)=>{
  let newHabit = new Habito({
    nombre : req.body.name,
    descripcion: req.body.description
  });
  
  newHabit.save().then((listDoc)=>{

    res.send(listDoc);
  })
 
})


// Peticion GET para obtener los habitos 

app.get("/habit",(req,res)=>{
  Habito.find().then((lists)=>{
    console.log("entro")
    res.statusCode ='200';
    res.statusMessage = 'Solicitod realizada con exito';
    res.send(lists);
    
    console.log(lists);
  }).catch((e)=>{
    res.statusCode ='500';
    res.send(e);
  });
})


app.listen('8081','0.0.0.0',()=>{
  console.log("El servidor esta corriendo en el puerto 8081");
})
