import express from 'express';
import PedidoController from '../controllers/pedidoController.js';
import paginar from '../middlewares/paginar.js';

const routes = express.Router();

routes.get('/pedidos', PedidoController.listarPedidos, paginar);
routes.get('/pedidos/busca', PedidoController.listarPedidosPorFiltro, paginar);
routes.get('/pedidos/:id', PedidoController.listarPedidoPorId);
routes.post('/pedidos', PedidoController.cadastrarPedido);
routes.put('/pedidos/:id', PedidoController.atualizarPedido);
routes.delete('/pedidos/:id', PedidoController.removerPedido);

export default routes;