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
route.get('/games/edition/:edition', [accedio], juegosController.traerJuegosPoreditionController);

//Mostrar un juego por su genre
route.get('/games/edition/:edition/:genre', [accedio], juegosController.traerJueegosPorGeneroYEdicionController);


//Modificamos un juego
route.patch('/games/:id/modificar', [accedio, middlewareJuegos.modificarMiddleware], juegosController.modificarPatchController);

//Eliminamos un juego
route.delete('/games/:id/eliminar', [accedio], juegosController.eliminarJuegoController);

route.use('/games', RouteVotos);





export default route;