const Office = require('../models/OfficeRegister')


exports.getOffices = (req, res) => {
    const {officeId} = req.params
    User.findById(officeId)
    .then(office => res.status(201).json({office}))
    .catch(err => res.status(500).json({err}))
}

exports.getOffice = (req, res) => {
    const {officeId} = req.params
    Office.findById (officeId)
    .then(office => res.status(200).json({office}))
    .catch(err => res.status(500).json({err}))
}

exports.updateOffice = (req, res) => {
    const {officeId} = req.params
    Office.findByIdAndUpdate(officeId, {...req.body}, {new: true})
    .then(office => res.status(200).json({office}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteOffice = (req, res) => {
    const {officeId} = req.params
    Office.findByIdAndDelate(officeId)
    .then(office => res.status(200).json({msg: "Office unreserver"}))
    .catch(err => res.status(500).json({err}))
}