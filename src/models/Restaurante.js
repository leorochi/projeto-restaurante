import mongoose from "mongoose";
import { stateAndCityEnum } from "../helpers/stateAndCity.js";



const restauranteSchema = new mongoose.Schema({
  id: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  nome: {
    type: String,
    required: [true, 'O campo nome é obrigatório']
  },
  estado: {
    type: String,
    required: [true, 'O campo estado é obrigatório'],
    enum: {
      values: stateAndCityEnum.map(estado => estado.id),
      message: 'O estado {VALUE} não é um valor permitido',
      index: true
    }
  },
  cidade: {
    type: String,
    required: [true, 'O campo cidade é obrigatório'],
  },
  bairro: {
    type: String,
    required: [true, 'O campo bairro é obrigatório'],
  }
}, {versionKey: false});

const restaurante = mongoose.model('restaurantes', restauranteSchema);

export default restaurante;