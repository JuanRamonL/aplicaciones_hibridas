import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GameJump")// se conecta magicamente y hace un use (mentira no pasa es...xD)
const juegos = db.collection('games')
const jueces = db.collection('judges');

//Esta funcion es para que el usuario pueda filtrar por los campos que quiera
function filterQueryToMongo(filter) {
    const filterMongo = {}

    for (const filed in filter) {
        if (isNaN(filter[filed])) {
        filterMongo[filed] = filter[filed]
        }
        else {
        const [field, op] = filed.split('_')

        if (!op) {
            filterMongo[filed] = parseInt(filter[filed])
        }
        else {
            if (op === 'min') {
            filterMongo[field] = {
                $gte: parseInt(filter[filed])
            }
            }
            else if (op === 'max') {
            filterMongo[field] = {
                $lte: parseInt(filter[filed])
            }
            }
        }
        }
    }

    return filterMongo
}


async function getDatos(datoDB, filter = {}){
    await client.connect()

    const filterMongo = filterQueryToMongo(filter)

    return datoDB.find(filterMongo).toArray()
}

async function getDatosById(datoDB, id){
    await client.connect()
    return datoDB.findOne({ _id: new ObjectId(id) })
}

async function addDatos(db, datos) {
    try {
        await client.connect()

        const nuevoDato = {
            ...datos
        };
        await db.insertOne(nuevoDato);

        return nuevoDato;
    } finally {
        await client.close();
    }
}

async function modificarDatosPatch(db, id, datos) {
    try {
        await client.connect();

        const buscarId = await db.findOne({ _id: new ObjectId(id) });

        if (!buscarId) {
            throw { status: 404, message: 'Documento no encontrado' };
        }

        console.log('Documento encontrado:', buscarId);

        const nuevoDato = { ...buscarId, ...datos };

        await db.updateOne({ _id: new ObjectId(id) }, { $set: datos });

        console.log('Documento actualizado:', nuevoDato);

        return nuevoDato;
    } catch (error) {
        console.error('Error:', error);
        throw { status: 500, message: 'Error al modificar el documento', error };
    } finally {
        await client.close();
        console.log('Conexión cerrada correctamente');
    }
}

//Funcion que agrega un estado a uno producto como eliminado
async function eliminarDatos(db, id) {
    await client.connect()
    const datos = await db.findOne({ _id: ObjectId(id) })
    
    if (datos) {
        await db.updateOne({ _id: ObjectId(id) }, { $set: { estado: 'eliminado' } })
    }
    
    return datos
}

export {
    addDatos,
    getDatos,
    getDatosById,
    modificarDatosPatch,
    eliminarDatos,
    juegos,
    jueces,
}

export default {
    addDatos,
    getDatos,
    getDatosById,
    modificarDatosPatch,
    eliminarDatos,
    juegos,
    jueces,
}