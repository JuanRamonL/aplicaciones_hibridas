import datosServicios from '../services/servicios.js';
import serviciosVotos from '../services/serviciosVotos.js';

function TraerJuecesController(req, res) {
    datosServicios.getDatos(datosServicios.jueces, req.query)
    .then(function (jueces) {
        res.json(jueces);
    })
}

function traerJuecesPorIdController(req, res) {

    let jueces, votosJuego = '';

    Promise.all([
        datosServicios.getDatosById(datosServicios.jueces, req.params.id),
        serviciosVotos.getDatosVotosPorJuez(req.params.id),
        datosServicios.getDatos(datosServicios.juegos)
    ])
    .then(function (results) {
        const product = results[0];
        const votos = results[1];
        const juegos = results[2];

        jueces = {
            nombre: product.nombre
        };

        votosJuego = votos.map(voto => {
            const juegoEncontrado = juegos.find(juego => juego._id == voto.id_juego);
            return {
                juego: juegoEncontrado ? juegoEncontrado.name : 'juego no encontrado',
                id: voto.id_juego,
                jugabilidad: voto.jugabilidad,
                arte: voto.arte,
                sonido: voto.sonido,
                afinidad_a_la_tematica: voto.afinidad_a_la_tematica,
                Promedio: (voto.jugabilidad + voto.arte + voto.sonido + voto.afinidad_a_la_tematica) / 4,
            };
        });

        if (votosJuego.length == 0) {
            votosJuego = [];
        }

        res.json({
            jueces: jueces,
            votos_a_Juegos: votosJuego
        });
    })
}


export{
    TraerJuecesController,
    traerJuecesPorIdController
}

export default{
    TraerJuecesController,
    traerJuecesPorIdController
}
