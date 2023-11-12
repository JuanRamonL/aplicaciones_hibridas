export function accedio(req, res, next) {
    console.log('Accedio ', req.url);
    next();
}