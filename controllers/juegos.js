
import { getDatos } from '../services/servicios.js';

function traerJuegosController(req, res) {
    
    getDatos('juegos')
    .then(juegos => {
        res.status(200).json(juegos); 
    })
    .catch(err => {
        res.status(500).send('No se pudo leer el archivo');
    });
}

function traerJuegosPorIdController(req, res) {
    getDatos('juegos')
    .then(juegos => {
        let id = req.params.id;
        let juego = juegos.find(juego => juego.id == id); //find() Nos permite buscar un elemento en un array. En este caso, buscamos un juego por su id.
        if(juego && juego.estado !== 'eliminado'){
            res.status(200).json(juego); 
        }else{
            res.status(404).send('Juego no encontrado'); 
        }
    })
}

function modificarPostController(req, res) {
    getDatos('juegos')
    .then(juegos => {
        let juego = {
            id: juegos.length + 1,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }
        juegos.push(juego);
        fs.writeFile('./data/juegos.json', JSON.stringify(juegos, null, 2));
        res.status(200).json(juego);
    })
}

function modificarPutController(req, res) {
    getDatos('juegos')
    .then(juegos => {
        let id = req.params.id;
        let juego = juegos.find(juego => juego.id == id); //find() Nos permite buscar un elemento en un array. En este caso, buscamos un juego por su id.
        if(juego){
            juego.nombre = req.body.nombre;
            juego.descripcion = req.body.descripcion;
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
    modificarPostController,
    modificarPutController,
    modificarPatchController,
    eliminarJuegoController
}

export default {
    traerJuegosController,
    traerJuegosPorIdController,
    modificarPostController,
    modificarPutController,
    modificarPatchController,
    eliminarJuegoController
}