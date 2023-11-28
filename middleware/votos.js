
import { schemaCrear } from "../schemas/votos";

export function validarDatosVotos(req, res, next) {
    schemaCrear.validate(req.body, {
        stripUnknown: true,
        abortEarly: true
    })
    .then(function (value) {
        req.body = value
        next()
    })
    .catch(function (err) {
        res.status(500).json({msg: "ta' re quebrado tu  codigo", err})
    })
}

export function accedio(req, res, next) {
    console.log('Accedio ', req.url);
    next();
}

export default { 
    validarDatosVotos, 
    accedio 
}
