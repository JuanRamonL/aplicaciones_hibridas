import express from 'express';
import routejuegos from './routes/juegos.js';
import routejueces from './routes/jueces.js';

const app = express();

app.get('/', (req, res) => {
        // Use the req parameter if needed
        // For example, you can access query parameters using req.query
        res.send('Helanda, ¡Estás conectado a la base de datos!. 😺😺😺');
});
app.use(express.json());

app.use(routejuegos);
app.use(routejueces);

app.listen(2023, function () {
    console.log('Servidor corriendo en: http://localhost:2023')
});