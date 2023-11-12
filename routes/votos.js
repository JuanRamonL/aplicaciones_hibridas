import express from "express";
import VotosController from '../controllers/votos.js';
import {accedio} from '../middleware/acceso.js';
const route = express.Router();


route.get('/:id/votes',[accedio], VotosController.TraerVotosController)
route.post('/:id/votes', [accedio], VotosController.AgregarVotosController)

export default route