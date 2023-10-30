import fs from 'node:fs/promises';
import express from 'express';
import { get } from 'node:http';

const app = express();

app.use(express.json()); //Con esto, express va a buscar los datos en el formulario y los va a mostrar en el navegador.
app.use(express.static('public')); 

//Me permite recibir datos desde un formulario. Con esto, express va a buscar los datos en el formulario y los va a mostrar en el navegador.
app.use(express.urlencoded({extended: true}))






/*Con esto podemos  manejar los datos que nos enviaron desde un formulario. Con esto, express va a buscar los datos en el formulario y los va a mostrar en el navegador.
    app.get('/form', function (req, res) {
        let nombre = req.query.nombre;// req.query es un objeto que contiene todos los parametros que se envian por la url. En este caso, el parametro nombre.
        let apellido = req.query.apellido; 
        res.send(`hola  ${nombre} ${apellido} comó estás? ENVIADO POR GET` )
    });
*/



/**
 * Esta función nos permite leer los datos de un archivo json
 * @param {nombre: string} nombre 
 * @returns 
 */
async function getDatos(nombre){
    return fs.readFile(`./data/${nombre}.json`, {encoding: 'utf-8'})
        .then(data => {
            let datos = JSON.parse(data);
            return filtro(datos);
        })
}

/**
 * Esta función filtra los datos que no tengan estado como eliminado
 * 
 * @param {datos: string} datos 
 * @returns 
 */
async function filtro(datos){
    let datosActivos = datos.filter(dato => dato.estado != 'eliminado'); //filter() Nos permite filtrar elementos de un array. En este caso, filtramos los juegos que no 
    return datosActivos;
}

app.get('/games', function (req, res) {
    
    getDatos('juegos')
    .then(juegos => {
        res.status(200).json(juegos); 
    })
    .catch(err => {
        res.status(500).send('No se pudo leer el archivo');
    });
});

//Mostramos un juego en particular
app.get('/games/:id', function (req, res) {
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
});

//Agregamos un juego
app.post('/games', function (req, res) {
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
})

// Reemplazamos un juego en particular -- Ver si es necesario Reemplaza un juego en particular
app.put('/games/:id', function (req, res) {
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
});

//Modificamos los datos de un juego en particular
app.patch('/games/:id', function (req, res) {

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

});

//Marcamos un elemento cómo eleimando
app.delete('/games/:id', function (req, res) {

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
});




app.get('/judges', function (req, res) {
    getDatos('jueces')
    .then(jueces => {
        res.status(200).json(jueces); 
    })
    .catch(err => {
        res.status(500).send('No se pudo leer el archivo');
    });
});

app.get('/judges/:id', function (req, res) {

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
});

app.post('/judges', function (req, res) {
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
});

app.put('/judges/:id', function (req, res) {
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
});

app.patch('/judges/:id', function (req, res) {
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
});

app.delete('/judges/:id', function (req, res) {
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
});







app.listen(2023, function () {
    console.log('Servidor corriendo en: http://localhost:2023')
});