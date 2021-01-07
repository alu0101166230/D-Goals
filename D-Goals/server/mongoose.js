const mongoose = require ('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect ('mongoose://localhost:27017/Usuarios',{useNewUrlParser:true}).then(()=>{
  console.log("Coneccion a la base de dato correcta");

}).catch((e)=>{
    console.log("Error al conectar con la base de datos");
    console.log(e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

mondule.exports = {
  mongoose
};
