
import datosServicios from '../services/servicios.js';
import serviciosVotos from '../services/serviciosVotos.js';


function traerJuegosController(req, res) {
    datosServicios.getDatos(datosServicios.juegos, req.query)
        .then(function (juegos) {
            const promesasVotos = juegos.map(async juego => {

                const id = (juego._id).toString();
                

                const votes = await serviciosVotos.getDatosVotos(id);

                //console.log("Votos:", votos);
                console.log(id)
                return {
                    juego: juego,
                    votos: votes
                };
            });
            return Promise.all(promesasVotos);
        })
        .then(function (juegosConVotos) {
            const resultadoFinal = juegosConVotos.map(item => {
                const juegoInfo = {
                    name: item.juego.name,
                    genre: item.juego.genre,
                    edition: item.juego.edition,
                    members: item.juego.members
                };

                const votosJuego = item.votos.map(voto => {
                    return {
                        id_juez: voto.id_juez,
                        id_voto: voto._id,
                        jugabilidad: voto.jugabilidad,
                        arte: voto.arte,
                        sonido: voto.sonido,
                        afinidad_a_la_tematica: voto.afinidad_a_la_tematica,
                        Promedio: (voto.jugabilidad + voto.arte + voto.sonido + voto.afinidad_a_la_tematica) / 4
                    };
                });

                return {
                    juego: juegoInfo,
                    votos: votosJuego
                };
            });

            res.json(resultadoFinal);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ msg: err.msg });
            } else {
                res.status(500).json({ msg: "ta' re quebrado tu código" });
            }
        });
}


function traerJuegosPorIdController(req, res) {
    let juego, votosJuego = '';

    Promise.all([
        datosServicios.getDatosById(datosServicios.juegos, req.params.id),
        serviciosVotos.getDatosVotos(req.params.id),
        datosServicios.getDatos(datosServicios.jueces),
    ])
    .then(function (results) {
        const product = results[0];
        const votos = results[1];
        const jueces = results[2];

        juego = {
            name: product.name,
            genre: product.genre,
            edition: product.edition,
            members: product.members
        };
        
        // Construir el objeto para los votos
        votosJuego = votos.map(voto => {
            const juezEncontrado = jueces.find(juez => juez._id == voto.id_juez);

            return {
                id_juez: voto.id_juez,
                nombre_juez: juezEncontrado ? juezEncontrado.nombre : null,
                id_voto: voto._id,
                jugabilidad: voto.jugabilidad,
                arte: voto.arte,
                sonido: voto.sonido,
                afinidad_a_la_tematica: voto.afinidad_a_la_tematica,
                Promedio: (voto.jugabilidad + voto.arte + voto.sonido + voto.afinidad_a_la_tematica) / 4
            };
        });

        if (votosJuego.length === 0) {
            votosJuego = [];
        }

        // Enviar la respuesta como JSON
        res.json({
            juego: juego,
            votos: votosJuego
        });
    })
    .catch(function (err) {
        if (err?.code) {
            res.status(err.code).json({ msg: err.msg });
        } else {
            res.status(500).json({ msg: "ta' re quebrado tu código" });
        }
    });
}

async function traerJuegosPoreditionController(req, res) {
    try {
        const edition = req.params.edition;
        console.log("Edition:", edition);

        const juegos = await datosServicios.getDatosByEdition(datosServicios.juegos, parseInt(edition));

        if (juegos.length === 0) {
            res.status(404).json({ msg: "No se encontraron juegos para la edición especificada." });
            return;
        }

        const promesasVotos = juegos.map(async juego => {
            const id = juego._id.toString();
            const votes = await serviciosVotos.getDatosVotos(id);

            const juegoInfo = {
                name: juego.name,
                genre: juego.genre,
                edition: juego.edition,
                members: juego.members
            };

            const votosJuego = votes.map(voto => {
                return {
                    id_juez: voto.id_juez,
                    id_voto: voto._id,
                    jugabilidad: voto.jugabilidad,
                    arte: voto.arte,
                    sonido: voto.sonido,
                    afinidad_a_la_tematica: voto.afinidad_a_la_tematica,
                    Promedio: (voto.jugabilidad + voto.arte + voto.sonido + voto.afinidad_a_la_tematica) / 4,
                };
            });

            const promedioTotal = votosJuego.reduce((reducir, voto) => reducir + voto.Promedio, 0) / votosJuego.length;

            return {
                juego: juegoInfo,
                votos: votosJuego,
                PuntuacionDelJuego: promedioTotal
            };
        });

        const juegosConVotos = await Promise.all(promesasVotos);

        // Ordenar los juegos de mayor a menor según la PuntuacionDelJuego
        juegosConVotos.sort((a, b) => b.PuntuacionDelJuego - a.PuntuacionDelJuego);

        res.json(juegosConVotos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
}

async function traerJueegosPorGeneroYEdicionController(req, res) {
    try {
        const genero = req.params.genre;
        const edicion = parseInt(req.params.edition);
        console.log("genero:", genero);
        console.log("edition:", edicion);

        const juegos = await datosServicios.getDatosByGenreAndEdition(datosServicios.juegos,  edicion, genero);

        if (juegos.length == 0) {
            res.status(404).json({ msg: "No se encontraron juegos para el género ("+ genero+") y la edición ("+ edicion +") especificada." });
            return;
        }

        const promesasVotos = juegos.map(async juego => {
            const id = juego._id.toString();
            const votes = await serviciosVotos.getDatosVotos(id);

            const juegoInfo = {
                name: juego.name,
                genre: juego.genre,
                edition: juego.edition,
                members: juego.members
            };

            const votosJuego = votes.map(voto => {
                return {
                    id_juez: voto.id_juez,
                    id_voto: voto._id,
                    jugabilidad: voto.jugabilidad,
                    arte: voto.arte,
                    sonido: voto.sonido,
                    afinidad_a_la_tematica: voto.afinidad_a_la_tematica,
                    Promedio: (voto.jugabilidad + voto.arte + voto.sonido + voto.afinidad_a_la_tematica) / 4,
                };
            });

            const promedioTotal = votosJuego.reduce((reducir, voto) => reducir + voto.Promedio, 0) / votosJuego.length;

            return {
                juego: juegoInfo,
                votos: votosJuego,
                PuntuacionDelJuego: promedioTotal
            };
        });

        const juegosConVotos = await Promise.all(promesasVotos);

        juegosConVotos.sort((a, b) => b.PuntuacionDelJuego - a.PuntuacionDelJuego);
        
        res.json(juegosConVotos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
}


async function agregarPostController(req, res) {
    try {
        const value = req.body;
        const product = await datosServicios.addDatos(datosServicios.juegos, value);
        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "ta' re quebrado tu codigo", err });
    }
}

async function modificarPatchController(req, res) {
    try {
        const value = req.body;
        const product = await datosServicios.modificarDatosPatch(datosServicios.juegos, req.params.id, value);
        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "ta' re quebrado tu codigo", err });
    }
}


async function eliminarJuegoController(req, res) {
    try {
        const product = await datosServicios.eliminarDatos(datosServicios.juegos, req.params.id);
        return res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ msg: "ta' re quebrado tu código", err });
    }
}


export {
    traerJuegosController,
    traerJuegosPorIdController,
    agregarPostController,
    modificarPatchController,
    eliminarJuegoController,
    traerJuegosPoreditionController,
    traerJueegosPorGeneroYEdicionController,

}

export default {
    traerJuegosController,
    traerJuegosPorIdController,
    agregarPostController,
    modificarPatchController,
    eliminarJuegoController,
    traerJuegosPoreditionController,
    traerJueegosPorGeneroYEdicionController,
}