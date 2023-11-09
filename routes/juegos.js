import express from "express";
import juegosController from '../controllers/juegos.js';

const route = express.Router();

route.get('/games', juegosController.traerJuegosController);

//Mostramos un juego en particular
route.get('/games/:id', juegosController.traerJuegosPorIdController);

//Agregamos un juego
route.post('/games', juegosController.modificarPostController )

// Reemplazamos un juego en particular -- Ver si es necesario Reemplaza un juego en particular
route.put('/games/:id', juegosController.modificarPutController);

//Modificamos los datos de un juego en particular
route.patch('/games/:id', juegosController.modificarPatchController);

//Marcamos un elemento cómo eleimando
route.delete('/games/:id', juegosController.eliminarJuegoController);




export default route;