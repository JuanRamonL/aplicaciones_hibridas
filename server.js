import express from 'express';
import routejuegos from './routes/juegos.js';
import routejueces from './routes/jueces.js';

const app = express();
app.use(express.static('public')); 
app.use(express.json());

app.use(routejuegos);
app.use(routejueces);

app.listen(2023, function () {
    console.log('Servidor corriendo en: http://localhost:2023')
});