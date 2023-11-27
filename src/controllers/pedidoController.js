import mongoose from "mongoose";
import menu from "../models/Menu.js";
import pedido from "../models/Pedido.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class PedidoController {

  static listarPedidos(req, res, next) {

    try {
      const pedidosRegistrados = pedido.find();
      req.resultado = pedidosRegistrados;
      next();
    } catch (erro) {
      next(erro)
    }
  }

  static async listarPedidoPorId(req, res, next) {

    try {
      const id = req.params.id;
      const pedidoEncontrado = await pedido.findById(id);
      if(pedidoEncontrado !== null) {
        res.status(200).json(pedidoEncontrado);
      } else {
        next(new NaoEncontrado).json('ID do pedido não encontrado')
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarPedido(req, res, next) {
    
    try {
      const novoPedido = req.body;
      const menuEncontrado = await menu.findById(novoPedido.menu);
      const pedidoCompleto = {...novoPedido, menu: {...menuEncontrado._doc}};
      const pedidoCriado = await pedido.create(pedidoCompleto);
      res.status(201).json({message: 'Pedido criado com sucesso!', pedido: pedidoCriado});

    } catch (erro) {
      next(erro);
    }

  }

  static async atualizarPedido(req, res, next) {

    try {
      const id = req.params.id;
      const pedidoEncontrado = await pedido.findByIdAndUpdate(id, req.body);
      if(pedidoEncontrado !== null) {
        res.status(200).json({message: 'Pedido atualizado com sucesso!'});
      } else {
        next(new NaoEncontrado).json('Pedido não encontrado');
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async removerPedido(req, res, next) {
    const id = req.params.id;
    const pedidoEncontrado = await pedido.findByIdAndDelete(id);
    if(pedidoEncontrado !== null) {
      res.status(200).json({message: 'Pedido removido com sucesso!'})
    } else {
      next(new NaoEncontrado).json('Pedido não encontrado')
    }
  }

  static async listarPedidosPorFiltro(req, res, next) {

    try {
      const busca = await processaBusca(req.query);

      if(busca !== null) {
        const pedidosResultado = pedido
        .find(busca)
        .populate('menu')  

        req.resultado = pedidosResultado;
        next();

      } else {
        res.status(200).json([]);
      }

    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {

  const {nomeCliente, numeroPedido} = parametros;

  let busca = {};

  if(nomeCliente) busca.nomeCliente = {$regex: nomeCliente, $options: 'i'};
  if(numeroPedido) busca.numeroPedido = {$regex: numeroPedido, $options: 'i'};

}

export default PedidoController;