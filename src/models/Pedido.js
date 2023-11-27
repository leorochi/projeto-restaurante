import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  id: { 
    type: String
  },
  nomeCliente: {
    type: String,
    required: [true, 'O campo nome do cliente é obrigatório']
  },
  numeroPedido: {
    type: Number,
    required: [true, 'O campo numero do pedido é obrigatório']
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menus',
    required: [true, 'O menu é obrigatório']
  }
}, {versionKey: false})

const pedido = mongoose.model('pedidos', pedidoSchema);

export default pedido;