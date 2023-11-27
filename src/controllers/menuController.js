import menu from "../models/Menu.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class MenuController {

  static listarMenus(req, res, next) {

    try {
      const menusEncontrados = menu.find();
      req.resultado = menusEncontrados;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarMenuPorId(req, res, next) {

    try {
      const id = req.params.id;
      const menuEncontrado = await menu.findById(id);
      if(menuEncontrado !== null) {
        res.status(200).json(menuEncontrado);
      } else {
        next(new NaoEncontrado).json('ID Não encontrado');
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarMenu(req, res, next) {

    try {
      const novoMenu = await menu.create(req.body);
      res.status(201).json({message: 'Menu cadastrado com sucesso!', menu: novoMenu});
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarMenu(req, res, next) {

    try {
      const id = req.params.id;
      const menuEncontrado = await menu.findByIdAndUpdate(id, req.body);
      if(menuEncontrado !== null) {
        res.status(200).json({message: 'Menu atualizado com sucesso!', menu: menuEncontrado});
      } else {
        next(new NaoEncontrado).json('Menu não encontrado');
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async removerMenu(req, res, next) {

    try {

      const id = req.params.id;
      const menuEncontrado = await menu.findByIdAndDelete(id);

      if(menuEncontrado !== null) {
        res.status(200).json({message: 'Menu removido com sucesso!'})

      } else {
        next(new NaoEncontrado).json('Menu não encontrado');
      }

    } catch (erro) {
      next(erro);
    }
  }

  static async listarMenuPorFiltro(req, res, next) {

    try {

      const busca = await processaBusca(req.query);

      if(busca !== null) {

        const menuResultado = menu
        .find(busca);
        req.resultado = menuResultado;
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
  const {nome, tipo} = parametros;

  let busca = {};

  if(nome) busca.nome = {$regex: nome, $options: 'i'};
  if(tipo) busca.nome = {$regex: tipo, $options: 'i'};

  return busca;

}

export default MenuController;