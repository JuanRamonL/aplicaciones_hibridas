import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GameJump")// se conecta magicamente y hace un use (mentira no pasa es...xD)
const votos = db.collection('votes')


async function getDatosVotos(id){
    await client.connect()

    return votos.find({ id_juego: id }).toArray()

}


async function addDatosVotos(id, voto) {
    await client.connect();

    const nuevoVoto = {
        ...voto,
        id_juego: id, // Asigna directamente el valor del ID
    };

    await votos.insertOne(nuevoVoto);

    return nuevoVoto;
}


async function getDatosVotosPorJuez(id){
    await client.connect()

    return votos.find({ id_juez: id }).toArray()

}

export default {
    getDatosVotos,
    addDatosVotos,
    getDatosVotosPorJuez
}