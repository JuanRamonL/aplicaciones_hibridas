import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GameJump")// se conecta magicamente y hace un use (mentira no pasa es...xD)
const votos = db.collection('votes')


async function getDatosVotos(id){
    await client.connect()

    return votos.find({ juego_id: new ObjectId(id) }).toArray()

}


async function addDatosVotos( id, voto) {
    await client.connect()

    const nuevoVoto = { 
        ...voto, 
        juego_id: new ObjectId(id) ,
    }

    await votos.insertOne(nuevoVoto)

    return nuevoVoto
}

export default {
    getDatosVotos,
    addDatosVotos
}