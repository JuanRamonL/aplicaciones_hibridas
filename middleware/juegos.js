import {schema, modificar} from '../schemas/juegos.js';

function modificarMiddleware (req, res, next) {

    modificar.validate(req.body)
    .then(() => {
        next();
    })
    .catch((error) => {
        res.status(400).json({ error: error.message });
    });
};

function schemaMiddleware (req, res, next)  {
    schema.validate(req.body)
    .then(() => {
        next();
    })
    .catch((error) => {
        res.status(400).json({ error: error.message });
    });
};

export default {
    modificarMiddleware,
    schemaMiddleware
};
