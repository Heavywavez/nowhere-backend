const User = require('../models/User')
const {createToken} = require('../config/jwt')

exports.signUp = (req, res) => {
    User.register({...req.body}, req.body.password)
    .then(user => res.status(201).json({user}))
    .catch(err => res.status(500).json({err}))
}

exports.login = (req, res, next) => {
    const {user} = req
    const [header, payload, signature] = createToken(user)
    const accessToken = `${header}.${payload}.${signature}`
    const newUser = {
        ...user._doc,
        accessToken
    }
    res.status(200).json({user: newUser})
}

exports.loggedUser = (req, res, next) => {
    const {user} = req
    res.status(200).json({user})
}

exports.logout = (req, res, next) =>{
    res.clearCookie('headload')
    res.clearCookie('signature')
    res.status(200).json({msg: 'Unauthorized'})
}