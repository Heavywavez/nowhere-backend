const Client = require('../models/Client')

exports.createClients = (req, res) => {
    Client.create({...req.body})
    .then(client => res.status(200).json({client}))
    .catch(err => res.status(500).json({err}))
}

exports.getClients = (req,res) => {
    Client.find()
    .then(clients => res.status(201).json({clients}))
    .catch(err => res.status(500).json({err}))
}

exports.getClient = (req,res) => {
    const {id} = req.params
    Client.findById(id)
    .then(client => res.status(201).json({client}))
    .catch(err => res.status(500).json({err}))
}

exports.updateClient = (req, res) => {
    const {id} = req.params
    const {client} = req.body
    Client.findByIdAndUpdate(id, {clientName}, {new: true})
    .then(client => res.status(201).json({client}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteClient = (req, res) => {
    const {id} = req.params
    Client.findByIdAndDelete(id)
    .then(client => res.status(201).json({msg: "Client Delete"}))
    .catch(err => res.status(500).json({err}))
}