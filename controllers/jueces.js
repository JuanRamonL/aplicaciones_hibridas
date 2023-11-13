import datosServicios from '../services/servicios.js';
import serviciosVotos from '../services/serviciosVotos.js';

function TraerJuecesController(req, res) {
    datosServicios.getDatos(datosServicios.jueces , req.query)
    .then(function (jueces) {
        let lista = '<ul> ' 
        for(let i = 0; i < jueces.length; i++) {
            lista += `
            <li>
                <ul>
                    <li>Nombre: ${jueces[i].nombre}</li>
                    <a href="/judges/${jueces[i]._id}">Ver mas</a>
                </ul> 
            </li>`
        }
        lista += '</ul>'

        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mi web</title>
            <link rel="stylesheet" href="CSS/style.css">
        </head>
        <body>
                ${lista}
        </body>
        </html>
        `)
        
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

        jueces = `
            <div class="productos">
                <h1>Juez: ${product.nombre}</h1>
            </div>
        `;

        votosJuego = votos.map(voto => {
            const juegoEncontrado = juegos.find(juego => juego._id == voto.id_juego);
            return `
            <li style="width:200px; list-style:none">
                ${juegoEncontrado ? `<div class="productos"><h2>Juez: ${juegoEncontrado.name}</h2></div>` : 'juego no encontrado'}
                <p>Jugabilidad: ${voto.jugabilidad}</p>
                <p>Arte: ${voto.arte}</p>
                <p>Sonido:${voto.sonido}</p>
                <p>Adinidad a la temática ${voto.afinidad_a_la_tematica}</p>
                <a href="/games/${voto.id_juego}">Ver mas</a>
            </li>
            `;
        }).join('');




        if(votosJuego.length == 0){
            votosJuego = `<p>Este juez no tiene votos</p>`
        }

        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Mi web</title>
            <link rel="stylesheet" href="CSS/style.css">
        </head>
        <body>
            ${jueces}
            <ul style="display:flex;">
            ${votosJuego}
            </ul>
        </body>
        </html>
        `)
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
