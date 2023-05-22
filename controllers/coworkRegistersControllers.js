const Cowork = require('../models/CoworkRegister')
const moment = require('moment-timezone')


exports.getCoworks = async (req, res) => {
    const registers = await Cowork.find().populate('coworkId').populate('customerId').catch(err => console.log(err))
    const response = registers.map(register => {
        const searchStart = moment(new Date(register.startDate)).subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ssZ')
        const searchEnd = moment(new Date(register.endDate)).subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ssZ')
        register.startDate = searchStart
        register.endDate = searchEnd
        return register
    })
    res.status(200).json({ registers: response })
}

exports.getRegisterByDay = async (req, res) => {
    const searchStart = moment(new Date(req.params.date)).add(5, 'hours').format('YYYY-MM-DDT00:00:00Z')
    const searchEnd = moment(new Date(req.params.date)).add(5, 'hours').format('YYYY-MM-DDT23:59:59Z')
    Cowork.find({
        $and: [{
            $or: [
                { $or: [{ startDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }] },
                { $or: [{ endDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }] }
            ]
        }]
    }).populate('coworkId').populate('customerId').sort('startDate')
        .then(coworks => {
            console.log('coworks', coworks)
            res.status(200).json({ coworks })
        })
        .catch(err => console.log(err))
}

exports.createRegisterCowork = async (req, res) => {
    const { coworkId } = req.body
    const searchStart = moment(new Date(req.body.startDate)).format('YYYY-MM-DDTHH:mm:00Z')
    const searchEnd = moment(new Date(req.body.endDate)).format('YYYY-MM-DDTHH:mm:00Z')
    const registers = await Cowork.find({
        $and: [{
            $and: [{ coworkId: { $eq: coworkId } }]
        }, {
            $or: [
                { $or: [{ startDate: { $gte: new Date(searchStart), $lte: new Date(searchEnd) } }] },
                { $or: [{ endDate: { $gte: new Date(searchStart), $lte: new Date(searchEnd) } }] }
            ]
        },
        {
            $and: [{ isActive: { $eq: true } }]
        }]

    }).catch(err => {
        res.status(500).json({ err })
    })

    if (registers.length === 15) {
        res.status(500).json({ msg: 'El área de cowork está llena' })
    } else {
        const startDate = moment.tz(new Date(req.body.startDate), 'America/Mexico_City').format('YYYY-MM-DDTHH:mm:00Z')
        const endDate = moment.tz(new Date(req.body.endDate), 'America/Mexico_City').format('YYYY-MM-DDTHH:mm:00Z')
        req.body.startDate = startDate
        req.body.endDate = endDate
        req.body.isActive = true
        Cowork.create({ ...req.body })
            .then(cowork => res.status(200).json({ cowork }))
            .catch(err => res.status(500).json({ err }))
    }

}

exports.getCowork = (req, res) => {
    const { coworkId } = req.params
    Cowork.findById(coworkId)
        .then(cowork => res.status(200).json({ cowork }))
        .catch(err => res.status(500).json({ err }))
}

exports.updateCowork = async(req, res) => {
    const { coworkId } = req.params
    const coworkInf = await Cowork.findById(coworkId).catch(err => console.log('err', err))
    const { isActive } = coworkInf
    const searchStart = moment(new Date(req.params.date)).add(5, 'hours').format('YYYY-MM-DDT00:00:00Z')
    const searchEnd = moment(new Date(req.params.date)).add(5, 'hours').format('YYYY-MM-DDT23:59:59Z')
    const registers = await Cowork.find({
        $and: [{
            $or: [
                { $or: [{ startDate: { $gte: new Date(searchStart), $lte: new Date(searchEnd) } }] },
                { $or: [{ endDate: { $gte: new Date(searchStart), $lte: new Date(searchEnd) } }] }
            ]
        },
        {
            $and: [{ isActive: { $eq: true } }]
        }]

    }).catch(err => {
        res.status(500).json({ err })
    })
    if (registers.length === 15 && isActive === false ) {
        res.status(500).json({ msg: 'El área de cowork está llena' })
    } else {
    Cowork.findByIdAndUpdate(coworkId, { isActive: !isActive }, { new: true })
        .then(cowork => res.status(200).json({ cowork }))
        .catch(err => res.status(500).json({ err }))
    }
}

exports.deleteCowork = (req, res) => {
    const { coworkId } = req.params
    Cowork.findByIdAndDelete(coworkId)
        .then(cowork => res.status(200).json({ msg: "Cowork unreserver" }))
        .catch(err => res.status(500).json({ err }))
}