import express from "express";
import juegosController from '../controllers/juegos.js';
import RouteVotos from './votos.js';

const route = express.Router();

function accedio(req, res, next) {
    console.log('Accedio ', req.url);
    next();
}

route.get('/games', [accedio] ,juegosController.traerJuegosController);
//Agregamos un juego
route.post('/games', juegosController.agregarPostController )
//Mostramos un juego en particular
route.get('/games/:id',[accedio] , juegosController.traerJuegosPorIdController);

route.use('/games', RouteVotos);




export default route;