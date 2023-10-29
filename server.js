//Creamos un servidor web con ExpressJS. Esta es la forma mas simple de crear un servidor web con ExpressJS.

//Importamos el modulo http
import express from 'express';
// import path from 'node:path';

const app = express();


// Con esto le decimos a express que la carpeta public contiene todo el contenido estatico del sitio web. Con esta configuración, express va a buscar os archivos en la carpeta public y lo va a mostrar en el navegador.
app.use(express.static('public')); 

//Me permite recibir datos desde un formulario. Con esto, express va a buscar los datos en el formulario y los va a mostrar en el navegador.
app.use(express.urlencoded({extended: true}))


//Con esto pdemos  manejar los datos que nos enviaron desde  formulario. Con esto, express va a buscar los datos en el formulario y los va a mostrar en el navegador.
app.get('/form', function (req, res) {
    let nombre = req.query.nombre;// req.query es un objeto que contiene todos los parametros que se envian por la url. En este caso, el parametro nombre.
    let apellido = req.query.apellido; 


    res.send(`hola  ${nombre} ${apellido} comó estás? ENVIADO POR GET` )
});

app.post('/form', function (req, res) {
    let nombre = req.body.nombre;// req.query es un objeto que contiene todos los parametros que se envian por la url. En este caso, el parametro nombre.
    let apellido = req.body.apellido;
    
    res.send(`hola  ${nombre} ${apellido} comó estás? ENVIADO POR POST` )
});



/*
get es la acción que se ejecuta cuando se hace una petición al servidor. Recibe dos parametros: la ruta y un callback con dos parametros: request y response. El callback se ejecuta cada vez que alguien se conecta al servidor. request es lo que el navegador nos envia y response es lo que nosotros le vamos a responder.
/
app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});
app.get('/logo.avif', function (req, res) {  
    res.sendFile(path.resolve('logo.avif'));
})

app.get('/favicon.ico', function (req, res) {  
    res.sendFile(path.resolve('favicon.ico'));
});
*/
app.listen(2023, function () {
    console.log('Servidor corriendo en: http://localhost:2023')
});