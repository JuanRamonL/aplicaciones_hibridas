import VotosServicios from '../services/serviciosVotos.js';
import schemaVotos from '../schemas/votos.js';

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

    schemaVotos.schemaCrear.validate(req.body, {
        stripUnknown: true
    })
    .then(async function (value) {
        return VotosServicios.addDatosVotos( id, value)
        .then(function (product) {
            return res.status(200).json(product)
        })
        .catch(function (err) {
            res.status(500).json({msg: "ta' re quebrado tu  codigo", err})
        })
    })     
}

function VotoPorJuezController(req, res) {
    const { id } = req.params;

    VotosServicios.getDatosVotosPorJuez( id )
    .then( function(vote) {
        res.json(vote)
    })
    .catch( function(err) {
        res.status(500).json({ error: "ta' re quebrado tu codigo", err });
    })
}

export default {
    TraerVotosController,
    AgregarVotosController,
    VotoPorJuezController
}