const mongoose = require ('mongoose');
const opciones = {useNewUrlParser:true,
                  user:"user",
                  pass:"usuario1",
                  useUnifiedTopology: true};

mongoose.Promise = global.Promise; 
mongoose.connect ('mongodb://10.6.129.31:8082/app_user',opciones).then(()=>{
  console.log("Conexion a la base de dato correcta");
}).catch((e)=>{
    console.log("Error al conectar con la base de datos");
    console.log(e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.exports = {
  mongoose
};
