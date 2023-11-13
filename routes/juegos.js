import express from "express";
import juegosController from '../controllers/juegos.js';
import RouteVotos from './votos.js';
import {accedio} from '../middleware/acceso.js';

const route = express.Router();



route.get('/games', [accedio] ,juegosController.traerJuegosController);
//Agregamos un juego
route.post('/games', juegosController.agregarPostController )
//Mostramos un juego en particular
route.get('/games/:id',[accedio] , juegosController.traerJuegosPorIdController);

//Modificamos un juego
route.patch('/games/:id', [accedio], juegosController.modificarPatchController);


//Eliminamos un juego
route.delete('/games/:id', [accedio], juegosController.eliminarJuegoController);

route.use('/games', RouteVotos);





export default route;