import express from "express";
import juecesController from '../controllers/jueces.js';

import RouteVotos from './votos.js';

const jueces = express.Router();



jueces.get('/judges', juecesController.TraerJuecesController);
jueces.post('/judges', juecesController.agregarJuezController);
jueces.get('/judges/:id', juecesController.traerJuecesPorIdController );

jueces.use('/judges', RouteVotos);

export default jueces;