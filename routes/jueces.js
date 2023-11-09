import express from "express";
import juecesController from '../controllers/jueces.js';

const jueces = express.Router();



jueces.get('/judges', juecesController.TraerJuecesController);

jueces.get('/judges/:id', juecesController.traerJuecesPorIdController );

jueces.post('/judges', juecesController.agregarJuezController);

jueces.put('/judges/:id',  juecesController.modificarPutJuecesController );

jueces.patch('/judges/:id', juecesController.modificarJuecesPatchController);

jueces.delete('/judges/:id', juecesController.EliminarJuezController);


export default jueces;