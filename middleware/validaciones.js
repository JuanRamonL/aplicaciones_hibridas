function juezValido(req, res, next) {
    // Valida que el juez exista
    Juez.findOne({ where: { id: req.params.id } })
        .then(juez => {
            // Si no existe el juez
            if (!juez) {
                res.status(404).json({ error: 'Juez no encontrado' });
            } else {
                // Si existe, continua
                next();
            }
        });
}

function validacinVotos(req, res, next) {
    // Validamos que el voto de un juez no ezista
    Voto.findOne({ where: { juezId: req.params.id, juegoId: req.body.juegoId } })
        .then(voto => {
            // Si existe el voto
            if (voto) {
                res.status(404).json({ error: 'El voto ya existe' });
            } else {
                // Si no existe, continua
                next();
            }
        });
    
}
