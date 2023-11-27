import express from 'express';
import conectaNaDataBase from './config/dbConnect.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulador404 from './middlewares/manipulador404.js';
import routes from './routes/index.js';

const conexao = await conectaNaDataBase();

conexao.on('error', (erro) => {
  console.error('Erro de conexão', erro);
})

conexao.once('open', () => {
  console.log('Conexão feita com o banco de dados!');
});

const app = express();
routes(app);
app.use(manipuladorDeErros);
app.use(manipulador404);

export default app;