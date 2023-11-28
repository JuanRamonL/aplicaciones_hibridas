import yup  from 'yup';

export const schema = yup.object().shape({
    name: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required(),
    genre: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required(),
    members: yup.array().of(yup.string().min(2,"Ponele voluntad, son 2 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo").required()),
    edition: yup.number().min(2020, "El año minimo de La edicion es 2020").max(2023, "El año maximo de la edicion es 2023").required(),
})

export const modificar = yup.object().shape({
    name: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo"),
    genre: yup.string().min(5,"Ponele voluntad, son 4 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo"),
    members: yup.array().of(yup.string().min(2,"Ponele voluntad, son 2 caracteres minimo").max(256,"Te fuiste a narnia, son 256 caracteres como maximo")),
    edition: yup.number().min(2020, "El año minimo de La edicion es 2020").max(2023, "El año maximo de la edicion es 2023"),
})

export default {
    schema,
    modificar
};