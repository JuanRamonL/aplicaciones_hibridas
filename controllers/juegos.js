
import datosServicios from '../services/servicios.js';

function traerJuegosController(req, res) {
    
    datosServicios.getDatos(datosServicios.juegos , req.query)
    .then(function (products) {
        let lista = '<ul> ' 
        for(let i = 0; i < products.length; i++) {
            lista += `
            <li>
                <ul>    
                    <li>Nombre: ${products[i].nombre}</li>
                    <li>Descripcion: ${products[i].descripcion}</li>
                    <li>Genero: ${products[i].genre}</li>
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
    datosServicios.getDatosById(datosServicios.juegos, req.params.id)
    .then(function (product) {
        const juego=`
            <div class="productos">
                <h1>${product.nombre}</h1>
                <p>${product.descripcion}</p>
                <p>${product.genre}</p>
                <p>${product.edition}</p>
            </div>
            `
        return res.send(`
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
        </body>
        </html>
        `)
    })
    .catch(function (err) {
        if(err?.code){
            res.status(err.code).json({msg: err.msg})
        }
        else{
            res.status(500).json({msg: "ta' re quebrado tu  codigo"})
        }
    })
}

function agregarPostController(req, res) {
    return datosServicios.addDatos(datosServicios.juegos ,req.body)
    .then(function (product) {
        return res.status(200).json(product)
    })
    .catch(function (err) {
        if(err?.code){
            res.status(err.code).json({msg: err.msg})
        }
        else{
            res.status(500).json({msg: "ta' re quebrado tu  codigo"})
        }
    })
}




function modificarPutController(req, res) {
    return datosServicios.modificarDatosPut(datosServicios.juegos, req.params.id, req.body)
    .then(function (product) {
        return res.status(200).json(product)
    })
    .catch(function (err) {
        if(err?.code){
            res.status(err.code).json({msg: err.msg})
        }
        else{
            res.status(500).json({msg: "ta' re quebrado tu  codigo"})
        }
    })
}

function modificarPatchController(req, res) {

    getDatos('juegos')
    .then(juegos => {
        let id = req.params.id;
        let juego = juegos.find(juego => juego.id == id); //find() Nos permite buscar un elemento en un array. En este caso, buscamos un juego por su id.
        if(juego){
            
            if(req.body.nombre){
                juego.nombre = req.body.nombre;
            }
            if(req.body.descripcion){
                juego.descripcion = req.body.descripcion;
            }
            fs.writeFile('./data/juegos.json', JSON.stringify(juegos, null, 2));
            res.status(200).json(juego); 
    
        }else{
            throw {
                status: 404,
                message: 'Juego no encontrado'
            };
        }
    })
    .catch(err => {
        if(err.status){
            res.status(err.status).send(err.message);
        }else{
            res.status(500).send('No se pudo modificar el archivo');
        }
    });

}

function eliminarJuegoController(req, res) {

    getDatos('juegos')
    .then(juegos => {
        let id = req.params.id;
        let juego = juegos.find(juego => juego.id == id); //find() Nos permite buscar un elemento en un array. En este caso, buscamos un juego por su id.

        if(juego){
            juego.estado = 'eliminado';
            fs.writeFile('./data/juegos.json', JSON.stringify(juegos, null, 2));
            res.status(200).json(juego);
        }
        else{
            throw {
                status: 404,
                message: 'Juego no encontrado'
            };
        }
    })
    .catch(err => {
        if(err.status){
            res.status(err.status).send(err.message);
        }else{
            res.status(500).send('No se pudo Eliminar el archivo');
        }
    });
}
export {
    traerJuegosController,
    traerJuegosPorIdController,
    agregarPostController,
    modificarPutController,
    modificarPatchController,
    eliminarJuegoController
}

export default {
    traerJuegosController,
    traerJuegosPorIdController,
    agregarPostController,
    modificarPutController,
    modificarPatchController,
    eliminarJuegoController
}