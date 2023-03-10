const User = require('./model')
const send = require('../../../utils/response')
const log = require('../../../utils/log')
const moment = require('moment')
const bcrypt = require('bcrypt');

function users(req, res, next) {
    User.find((error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res, data)
        }
        send.response200(res, data)
    })
}

function user(req, res) {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res, data)
        }

        send.response200(res, data)
    })
}

function create(req, res) {
    let hashedPassword = bcrypt.hashSync(req.body.password, Number(process.env.SALT))

    const usuario = new User({
        _id: req.body._id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: hashedPassword,
        email: req.body.email,
        siguiendo: [],
        hora: moment().format('HH:mm:ss').toString(),
        fecha: moment().format('DD/MM/YYYY').toString()
    })

    usuario.save((error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        } 
        if(!data){
            return send.response404(res)
        }
        send.response201(res, data)
    })
}

function remove(req, res) {
    User.findByIdAndRemove(req.params.id, (error, data) => {
        if(error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        } 
        send.response200(res, data)
    })
}

function update(req, res) {
    if(req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, Number(process.env.SALT))
    }

    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (error, data) => {
        if(error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        } 
        send.response200(res, data)
    })
}

function follow(req,  res) {
    User.findByIdAndUpdate(req.params.id, { $push: { siguiendo: req.body.user } }, { new: true }, (error, data) =>{
        if(error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        } 
        send.response200(res, data)
    })
}

function unfollow(req,  res) {
    User.findByIdAndUpdate(req.params.id, { $pull: { siguiendo: req.body.user } }, { new: true }, (error, data) =>{
        if(error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        } 
        send.response200(res, data)
    })
}

module.exports = {
    users: (req, res) => users(req, res),
    user: (req, res) => user(req, res),
    create: (req, res) => create(req, res),
    remove: (req, res) => remove(req, res),
    update: (req, res) => update(req, res),
    follow: (req, res) => follow(req, res),
    unfollow: (req, res) => unfollow(req, res)
}