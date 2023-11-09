
import fs from 'node:fs/promises';

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

export {
    getDatos,
    filtro,
}