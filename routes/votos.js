import express from "express";
import VotosController from '../controllers/votos.js';

const route = express.Router();


route.route('/:id/votes')
    .get(VotosController.TraerVotosController)
    .post(VotosController.AgregarVotosController)

export default route