const userPost = require('./model')
const send = require('../../../utils/response')
const log = require('../../../utils/log')

function posts(req, res) {
    userPost.find((error, data) => {
        if (!error) {
            send.response200(res, data)
        } else {
            send.response404(res)
        }
    })
}

function post(req, res) {
    userPost.findById(req.params.id, (err, data) => {
        if (!err) {
            send.response200(res, data)
        } else {
            send.response404(res)
        }
    })
}

function create(req, res) {
    const publicacion = new userPost({
        nombre: req.body.nombre,
        cat: req.body.cat,
        km_distancia: req.body.km_distancia,
        dificultad: req.body.dificultad,
        min_duracion: req.body.min_duracion,
        contenido: req.body.contenido,
        usuario_id: req.body.usuario_id
    })

    publicacion.save((err, data) => {
        if (!err) {
            send.response201(res,data)
        } else {
            send.response204(res)
        }
    })
}

function remove(req, res) {
    userPost.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            send.response200(res,data)
        } else {
            send.response204(res)
        }
    })
}

function update(req, res) {
    const publicacion = ({
        nombre: req.body.nombre,
        cat: req.body.cat,
        km_distancia: req.body.km_distancia,
        dificultad: req.body.dificultad,
        min_duracion: req.body.min_duracion,
        contenido: req.body.contenido,
        usuario_id: req.body.usuario_id
    })

    userPost.findByIdAndUpdate(req.params.id, { $set: publicacion }, { new: true }, (err, data) => {
        if (!err) {
            send.response200(res, data)
        } else {
            send.response204(res)
        }
    })
}

module.exports = {
    posts: (req, res) => posts(req, res),
    post: (req, res) => post(req, res),
    create: (req, res) => create(req, res),
    remove: (req, res) => remove(req, res),
    update: (req, res) => update(req, res)
}