import { getDatos } from '../services/servicios.js';


function TraerJuecesController(req, res) {
    getDatos('jueces')
    .then(jueces => {
        res.status(200).json(jueces); 
    })
    .catch(err => {
        res.status(500).send('No se pudo leer el archivo');
    });
}

function traerJuecesPorIdController(req, res) {

    getDatos('jueces')
    .then(jueces => {
        let id = req.params.id;
        let juez = jueces.find(juez => juez.id == id); //find() Nos permite buscar un elemento en un array. En este caso, buscamos un juego por su id.
        if(juez && juez.estado !== 'eliminado'){
            res.status(200).json(juez); 
        }else{
            res.status(404).send('Juez no encontrado'); 
        }
    })
    .catch(err => {
        res.status(500).send('No se pudo leer el archivo');
    });
}

function agregarJuezController(req, res) {
    getDatos('jueces')
    .then(jueces => {
        let juez = {
            id: jueces.length + 1,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }
        jueces.push(juez);
        fs.writeFile('./data/jueces.json', JSON.stringify(jueces, null, 2));
        res.status(200).json(juez);
    })
    .catch(err => {
        res.status(500).send('No se pudo leer el archivo');
    });
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