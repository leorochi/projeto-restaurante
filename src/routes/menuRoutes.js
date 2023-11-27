import express from 'express';
import MenuController from '../controllers/menuController.js';
import paginar from '../middlewares/paginar.js';

const routes = express.Router();

routes.get('/menus', MenuController.listarMenus, paginar);
routes.get('/menus/busca', MenuController.listarMenuPorFiltro, paginar);
routes.get('/menus/:id', MenuController.listarMenuPorId);
routes.post('/menus', MenuController.cadastrarMenu);
routes.put('/menus/:id', MenuController.atualizarMenu);
routes.delete('/menus/:id', MenuController.removerMenu);

export default routes;