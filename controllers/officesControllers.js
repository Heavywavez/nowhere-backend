const Office = require('../models/Office')


exports.createOffice = (req, res) => {
    Office.create({...req.body})
    .then(office => res.status(200).json({office}))
    .catch(err => res.status(500).json({err}))
}

exports.getOffice = (req, res) => {
    const {officeId} = req.params
    Office.findOne ({name: nameOffice})
    .then(user => res.status(200).json({Office}))
    .catch(err => res.status(500).json({err}))
}

exports.updateOffice = (req, res) => {
    const {officeId} = req.params
    const {nameOffice} = req.body
    Office.findByOneAndUpdate(office, {nameOffice}, {new: true})
    .then(user => res.status(200).json({Office}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteOffice = (req, res) => {
    const {ifficeId} = req.params
    Office.findByOneAndDelete(Office)
    .then(user => res.status(200).json({msg: "Unreserved Office"}))
    .catch(err => res.status(500).json({err}))
}
