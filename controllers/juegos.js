import yup from 'yup';
import datosServicios from '../services/servicios.js';
import serviciosVotos from '../services/serviciosVotos.js';

const schema = yup.object().shape({
    name: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required(),
    genre: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required(),
    members: yup.array().of(yup.string().min(2,"Ponele voluntad, son 2 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required()),
    edition: yup.string().required(),
})

const modificar = yup.object().shape({
    name: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo"),
    genre: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo"),
    members: yup.array().of(yup.string().min(2,"Ponele voluntad, son 2 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo")),
    edition: yup.string(),
})

function traerJuegosController(req, res) {
    
    datosServicios.getDatos(datosServicios.juegos , req.query)
    .then(function (products) {
        let lista = '<ul> ' 
        for(let i = 0; i < products.length; i++) {
            lista += `
            <li>
                <ul>    
                    <li>Nombre: ${products[i].name}</li>
                    <li>Genero: ${products[i].genre}</li>
                    <li>Miembros: ${products[i].members}</li>
                    <li>Edicion: ${products[i].edition}</li>
                    <a href="/games/${products[i]._id}">Ver mas</a>
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

        juego = `
            <div class="productos">
                <h1>Juego: ${product.name}</h1>
                <p>Genero: <b>${product.genre}</b></p>
                <p>Edición: <b>${product.edition}</b></p>
                <p>Miembros: ${product.members}</p>
            </div>
        `;
        
        // Construir el HTML para los votos
        votosJuego = votos.map(voto => {
            const juezEncontrado = jueces.find(juez => juez._id == voto.id_juez);

            return `
                <li style="width:200px; list-style:none">
                    <p>Juez: ${voto.id_juez}</p>
                    <p>Jugabilidad: ${voto.jugabilidad}</p>
                    <p>Arte: ${voto.arte}</p>
                    <p>Sonido:${voto.sonido}</p>
                    <p>Adinidad a la tematica ${voto.afinidad_a_la_tematica}</p>
                    <h2>Total ${voto.jugabilidad + voto.arte + voto.sonido + voto.afinidad_a_la_tematica}</h2>
                    ${juezEncontrado ? `<div class="productos"><h2>Juez: ${juezEncontrado.nombre}</h2></div>` : ''}
                </li>
            `;
        }).join('');

        if (votosJuego.length === 0) {
            votosJuego = '<li>No hay votos</li>';
        }

        // Enviar la respuesta después de que ambas operaciones asíncronas hayan completado
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
                    ${juego}
                    <ul style="display:flex;">
                    ${votosJuego}
                    </ul>
                </body>
            </html>
        `);
    })
    .catch(function (err) {
        if (err?.code) {
            res.status(err.code).json({ msg: err.msg });
        } else {
            res.status(500).json({ msg: "ta' re quebrado tu código" });
        }
    });
}


function agregarPostController(req, res) {

    schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: true
    })
    .then(async function (value) {
        return datosServicios.addDatos(datosServicios.juegos, value)
        .then(function (product) {
            return res.status(200).json(product)
        })
        .catch(function (err) {
            res.status(500).json({msg: "ta' re quebrado tu  codigo", err})
        })
    })
    .catch(function (err) {
        res.status(400).json({msg: err})
    })
    
}

async function modificarPatchController(req, res) {

    modificar.validate(req.body, {
        stripUnknown: true,
        abortEarly: true
    })
    .then(async function (value) {
        return datosServicios.modificarDatosPatch(datosServicios.juegos, req.params.id, value)
        .then(function (product) {
            return res.status(200).json(product)
        })
        .catch(function (err) {
            res.status(500).json({msg: "ta' re quebrado tu  codigo", err})
        })
    })
    .catch(function (err) {
        res.status(400).json({msg: err})
    })
}


function eliminarJuegoController(req, res) {

    datosServicios.eliminarDatos(datosServicios.juegos, req.params.id)
    .then(function (product) {
        return res.status(200).json(product)
    })
    .catch(function (err) {
        res.status(500).json({msg: "ta' re quebrado tu  codigo", err})
    })
}



export {
    traerJuegosController,
    traerJuegosPorIdController,
    agregarPostController,
    modificarPatchController,
    eliminarJuegoController
}

export default {
    traerJuegosController,
    traerJuegosPorIdController,
    agregarPostController,
    modificarPatchController,
    eliminarJuegoController
}