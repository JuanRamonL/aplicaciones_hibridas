import yup from 'yup';

export const schemaCrear = yup.object().shape({
    id_juez: yup.string().min(24,"Esto no es un Id valido").max(24,"Esto no es un Id valido").required(),
    jugabilidad: yup.number().min(1).max(10).required(),
    arte: yup.number().min(1).max(10).required(),  
    sonido: yup.number().min(1).max(10).required(),
    afinidad_a_la_tematica: yup.number().min(1).max(10).required(),
    id_juego: yup.string().min(24,"Esto no es un Id valido").max(24,"Esto no es un Id valido").required(),
})

export default {
    schemaCrear
};