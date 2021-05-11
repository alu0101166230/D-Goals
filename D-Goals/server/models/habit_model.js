const mongoose = require('mongoose');

const Schema_habito = new mongoose.Schema({
  nombre:{type: String,unique:true},
  descripcion:{type:String}
})

const Habito = mongoose.model('habitos',Schema_habito);
module.exports = {Habito}