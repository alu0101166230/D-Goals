const mongoose = require ('mongoose');


mongoose.Promise = global.Promise; 
const mongodb_url = process.env.MONGODB_URL 
mongoose.connect (mongodb_url).then(()=>{
  console.log("Conexion a la base de datos correcta");

}).catch((e)=>{
    console.log("Error al conectar con la base de datos");
    console.log(e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.exports = {
  mongoose
};
