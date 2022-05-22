const Office = require('../models/Office')


exports.createOffices = (req, res) => {
    Office.create({...req.body})
    .then(office => res.status(200).json({office}))
    .catch(err => res.status(500).json({err}))
}

exports.getOffice = (req, res) => {
    const {officeId} = req.params
    Office.findById ({name: nameOffice})
    .then(user => res.status(200).json({officeId}))
    .catch(err => res.status(500).json({err}))
}

exports.updateOffice = (req, res) => {
    const {officeId} = req.params
    const {nameOffice} = req.body
    Office.findByIdAndUpdate(officeId, {nameOffice}, {new: true})
    .then(office => res.status(200).json({office}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteOffice = (req, res) => {
    const {officeId} = req.params
    Office.findByIdAndDelate(officeId)
    .then(office => res.status(200).json({msg: "Unreserved Office"}))
    .catch(err => res.status(500).json({err}))
}
