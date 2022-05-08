const User = require('../models/User')


exports.getUsers = (req, res) => {
    User.find()
    .then(users => res.status(201).json({users}))
    .catch(err => res.status(500).json({err}))
}

exports.getUser = (req, res) => {
    const {id} = req.params
    User.findById(id)
    .then(user => res.status(201).json({user}))
    .catch(err => res.status(500).json({err}))
}

exports.updateUser = (req, res) => {
    const {id} = req.params
    const {name} = req.body
    User.findByIdAndUpdate(id, {name}, {new: true})
    .then(user => res.status(201).json({user}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteUser = (req, res) => {
    const {id} = req.params
    User.findByIdAndDelete(id)
    .then(user => res.status(201).json({msg: "User Delete"}))
    .catch(err => res.status(500).json({err}))
}