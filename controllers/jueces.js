import datosServicios from '../services/servicios.js';


function TraerJuecesController(req, res) {
    datosServicios.getDatos(datosServicios.jueces , req.query)
    .then(function (jueces) {
        let lista = '<ul> ' 
        for(let i = 0; i < jueces.length; i++) {
            lista += `
            <li>
                <ul>
                    <li>Nombre: ${jueces[i].nombre}</li>
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

    datosServicios.getDatosById(datosServicios.jueces, req.params.id)
    .then(function (product) {
        const Juez=`
            <div class="productos">
                <h1>${product.nombre}</h1>
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
                ${Juez}
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

function agregarJuezController(req, res) {
    return datosServicios.addDatos(datosServicios.jueces ,req.body)
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




function modificarPutJuecesController(req, res) {
    getDatos('jueces')
    .then(jueces => {
        let id = req.params.id;
        let juez = jueces.find(juez => juez.id == id); //find() Nos permite buscar un elemento en un array. En este caso, buscamos un juego por su id.
        if(juez){
            juez.nombre = req.body.nombre;
            juez.descripcion = req.body.descripcion;
            fs.writeFile('./data/jueces.json', JSON.stringify(jueces, null, 2));
            res.status(200).json(juez); 
        }else{
            throw {
                status: 404,
                message: 'Juez no encontrado'
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

function modificarJuecesPatchController(req, res) {
    getDatos('jueces')
    .then(jueces => {
        let id = req.params.id;
        let juez = jueces.find(juez => juez.id == id); //find() Nos permite buscar un elemento en un array. En este caso, buscamos un juego por su id.
        if(juez){
            
            if(req.body.nombre){
                juez.nombre = req.body.nombre;
            }
            if(req.body.descripcion){
                juez.descripcion = req.body.descripcion;
            }
            fs.writeFile('./data/jueces.json', JSON.stringify(jueces, null, 2));
            res.status(200).json(juez); 
    
        }else{
            throw {
                status: 404,
                message: 'Juez no encontrado'
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

function EliminarJuezController(req, res) {
    getDatos('jueces')
    .then(jueces => {
        let id = req.params.id;
        let juez = jueces.find(juez => juez.id == id); //find() Nos permite buscar un elemento en un array. En este caso, buscamos un juego por su id.

        if(juez){
            juez.estado = 'eliminado';
            fs.writeFile('./data/jueces.json', JSON.stringify(jueces, null, 2));
            res.status(200).json(juez);
        }
        else{
            throw {
                status: 404,
                message: 'Juez no encontrado'
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

export{
    TraerJuecesController,
    traerJuecesPorIdController,
    agregarJuezController,
    modificarPutJuecesController,
    modificarJuecesPatchController,
    EliminarJuezController
}

export default{
    TraerJuecesController,
    traerJuecesPorIdController,
    agregarJuezController,
    modificarPutJuecesController,
    modificarJuecesPatchController,
    EliminarJuezController
}