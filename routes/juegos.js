import express from "express";
import juegosController from '../controllers/juegos.js';
import RouteVotos from './votos.js';
import {accedio} from '../middleware/acceso.js';
import middlewareJuegos from '../middleware/juegos.js'

const route = express.Router();



route.get('/games', [accedio] ,juegosController.traerJuegosController);
//Agregamos un juego
route.post('/games',[middlewareJuegos.schemaMiddleware], juegosController.agregarPostController )
//Mostramos un juego por su id
route.get('/games/:id',[accedio] , juegosController.traerJuegosPorIdController);

//Mostrar un juego por su genre
route.get('/games/edition/:edition', [accedio, middlewareJuegos.modificarMiddleware], juegosController.traerJuegosPoreditionController);

//Modificamos un juego
route.patch('/games/:id/modificar', [accedio], juegosController.modificarPatchController);

//Eliminamos un juego
route.delete('/games/:id/eliminar', [accedio], juegosController.eliminarJuegoController);

route.use('/games', RouteVotos);





export default route;