import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  id: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  nome: {
    type: String,
    required: [true, 'O campo nome é obrigatório']
  },
  tipo: {
    type: String,
    required: [true, 'O campo tipo é obrigatório']
  },
  descricao: {
    type: String,
    required: [true, 'O campo descrição é obrigatório']
  },
  valor: {
    type: Number,
    required: [true, 'O campo valor é obrigatório'],
    validate: {
      validator: (valor) => {
        return valor >= 0 && valor <= 1000;
      },
      message: 'O valor deve estar entre 0 e 1000 Valor fornecido: {VALUE}'
    }
  }
}, {versionKey: false})

const menu = mongoose.model('menus', menuSchema);

export default menu;