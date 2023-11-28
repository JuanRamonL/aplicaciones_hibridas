import yup from 'yup';

export const schemaCrear = yup.object().shape({
    id_juez: yup.string().min(24,"Esto no es un Id valido").max(24,"Esto no es un Id valido").required(),
    jugabilidad: yup.number().required(),
    arte: yup.number().required(),  
    sonido: yup.number().required(),
    afinidad_a_la_tematica: yup.number().required(),
    id_juego: yup.string().min(24,"Esto no es un Id valido").max(24,"Esto no es un Id valido").required(),
})

export default {
    schemaCrear
};