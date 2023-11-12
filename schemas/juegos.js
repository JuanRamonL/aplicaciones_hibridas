import yup  from 'yup';

export const schemaCrear = yup.object().shape({
    name: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required(),
    genre: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required(),
    members: yup.array().of(yup.string().min(2,"Ponele voluntad, son 2 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required()),
    edition: yup.string().required(),
})

export const schemaModificar = yup.object().shape({
    name: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo"),
    genre: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo"),
    members: yup.array().of(yup.string().min(2,"Ponele voluntad, son 2 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo")),
    edition: yup.string(),
})

export default {
    schemaCrear,
    schemaModificar
};