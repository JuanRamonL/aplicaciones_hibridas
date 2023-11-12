import VotosServicios from '../services/serviciosVotos.js';

function TraerVotosController(req, res) {
    const { id } = req.params

    VotosServicios.getDatosVotos(id)
    .then( function(vote) {
        res.json(vote)
    })
    .catch( function(err) {
        res.status(500).json({ error: "ta' re quebrado tu codigo", err });
    })
}

function AgregarVotosController(req, res) {
    const { id } = req.params;

    VotosServicios.addDatosVotos( id, req.body)
    .then(function(data) {
        res.json(data);
    })
    .catch((err) => {
        res.status(500).json({ error: err });
    });      
}

export default {
    TraerVotosController,
    AgregarVotosController
}