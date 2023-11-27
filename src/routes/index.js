import express from 'express';
import restaurante from './restauranteRoutes.js';
import menu from './menuRoutes.js';
import pedidos from './pedidoRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('API Restaurante'));
  app.use(express.json(), restaurante, menu, pedidos); 
}



export default routes;