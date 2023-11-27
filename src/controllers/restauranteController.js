import mongoose from "mongoose";
import restaurante from "../models/Restaurante.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class RestauranteController {
  static listarRestaurantes (req, res, next) {

    try {
      const restaurantesEncontrados = restaurante.find();
      req.resultado = restaurantesEncontrados;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarRestaurantePorId(req, res, next) {
    
    try {
      const id = req.params.id;
      const restauranteEncontrado = await restaurante.findById(id);
      if(restauranteEncontrado !== null) {
        res.status(200).json(restauranteEncontrado);
      } else { 
        next(new NaoEncontrado).json('ID do resturante não encontrado');
      }
    } catch (erro) {
      next(erro);
    }
  }

  
  static async cadastrarRestaurante(req, res, next) {

    try {
      const novoRestaurante = await restaurante.create(req.body);
      res.status(201).json({message: 'Criado com sucesso!', restaurante: novoRestaurante});
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarRestaurante(req, res, next) {

    try {
      const id = req.params.id
      const restauranteEncontrado = await restaurante.findByIdAndUpdate(id, req.body);
      if(restauranteEncontrado !== null) {
        res.status(200).json({message: 'Restaurante atualizado com sucesso!', restaurante: restauranteEncontrado})
      } else {
        next(new NaoEncontrado('Restaurante não encontrado!'));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async removerRestaurante(req, res, next) {

    try {
      const id = req.params.id;
      const restauranteEncontrado = await restaurante.findByIdAndDelete(id);
      if(restauranteEncontrado !== null) {
        res.status(200).json({message: 'Restaurante removido com sucesso!', restaurante: restauranteEncontrado})
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarRestaurantePorFiltro (req, res, next) {

    try {
      const busca = await processaBusca(req.query);

      if(busca !== null) {
        const restauranteResultados = restaurante
        .find(busca);
        req.resultado = restauranteResultados;
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

  const {nome, cidade, estado, bairro} = parametros;

  let busca = {};

  if(nome) busca.nome = {$regex: nome, $options: 'i'};
  if(cidade) busca.cidade = {$regex: cidade, $options: 'i'};
  if(estado) busca.estado = {$regex: estado, $options: 'i'};
  if(bairro) busca.nome = {$regex: bairro, $options: 'i'};

  return busca;
  
}

export default RestauranteController;