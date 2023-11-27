import express from 'express';
import RestauranteController from '../controllers/RestauranteController.js';
import paginar from '../middlewares/paginar.js';

const routes = express.Router();

routes.get('/restaurantes', RestauranteController.listarRestaurantes, paginar);
routes.get('/restaurantes/busca', RestauranteController.listarRestaurantePorFiltro, paginar);
routes.get('/restaurantes/:id', RestauranteController.listarRestaurantePorId);
routes.post('/restaurantes', RestauranteController.cadastrarRestaurante);
routes.put('/restaurantes/:id', RestauranteController.atualizarRestaurante);
routes.delete('/restaurantes/:id', RestauranteController.removerRestaurante);

export default routes;