const Cowork = require('../models/Cowork')

exports.createCoworks = (req,res) => {
    Cowork.create({...req.body})
    .then(cowork => res.status(200).json({cowork}))
    .catch(err => res.status(500).json({err}))
}

exports.getCoworks = (req, res) => {
    const {coworkId} = req.params
    Cowork.findById(coworkId)
    .then(cowork => res.status(201).json({cowork}))
    .catch(err => res.status(500).json({err}))
}

exports.getCowork = (req,res) => {
    const {coworkId} = req.params
    Cowork.findById ({name: nameCowork})
    .then(cowork => res.status(200).json({coworkId}))
    .catch(err => res.status(500).json({err}))
}

exports.updateCowork = (req,res) => {
    const {coworkId} = req.params
    const {nameCowork} = red.body
    Cowork.findByIdAndUpdate(coworkId, {nameCowork}, {new: true})
    .then(cowork => res.status(200).json({cowork}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteCowork = (req,res) => {
    const {coworkId} = req.params
    Cowork.findByIdAndDelete(coworkId)
    .then(cowork => res.status(200).json({msg: "Unreserved Cowork"}))
    .catch(err => res.status(500).json({err}))
}