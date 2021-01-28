const mongoose = require('mongoose');
const { TypedRule } = require('tslint/lib/rules');

const ListSchema = new mongoose.Schema({
  nombre:{
    type: String,
    unique:true
  },
  schema_version:{
    type: Number
  },
  correo:{
    type:String,
    unique:true
  },
  password:{
    type:String
  },
  habito:{
    type:Object
  },
  numero_de_horas_totales:{
    type: Number,
    default:0
  },
  tareas_cumplidas:{
    type:Number,
    default:0
  },
  dias_seguidos:{
    type:Number,
    default:0
  }
})
const Usuario = mongoose.model('usuarios',ListSchema);
module.exports = {Usuario}

