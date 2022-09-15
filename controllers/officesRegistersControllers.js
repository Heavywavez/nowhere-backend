const Office = require('../models/OfficeRegister')
const moment = require('moment-timezone')
const Customer = require('../models/Customer')

exports.getOffices = async (req, res) => {
    const registers = await Office.find().populate('officeId').populate('customerId')
    const response = registers.map(register => {
        const searchStart = register.rentType === 'mes' ? moment(new Date(register.startDate)).format('YYYY-MM-DDT00:00:00Z') : moment(new Date(register.startDate)).subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ssZ')
        const searchEnd = register.rentType === 'mes' ? moment(new Date(register.endDate)).subtract(1, 'days').format('YYYY-MM-DDT00:00:00Z') : moment(new Date(register.endDate)).subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ssZ')
        register.startDate = searchStart
        register.endDate = searchEnd
        return register
    })
    res.status(200).json({ registers: response })
}

exports.getRegisterByDay = async (req, res) => {
    Office.find({datesReserved: {$eq: req.params.date}}).populate('officeId').populate('customerId').sort('startDate')
    .then(offices => res.status(200).json({ offices }))
    .catch(err => console.log(err))
}

exports.createRegisterOffice = async (req, res) => {
    const { officeId, rentType, customerId } = req.body
    let info 
    let all = []
    const initDate = moment(req.body.startDate)
    const finDate = moment(req.body.endDate).add(-1, 'day')
    const searchStart = rentType === 'mes' ? moment(new Date(req.body.startDate)).format('YYYY-MM-DDT00:00:00Z') : moment(new Date(req.body.startDate)).format('YYYY-MM-DDTHH:mm:00Z')
    const searchEnd = rentType === 'mes' ? moment(new Date(req.body.endDate)).day(1).format('YYYY-MM-DDT00:00:00Z') : moment(new Date(req.body.endDate)).format('YYYY-MM-DDTHH:mm:00Z')
    const registers = await Office.find({
        $and: [{
            $and: [{ officeId: { $eq: officeId } }]
        }, {
            $or: [
                { $or: [{ startDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }] },
                { $or: [{ endDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }] }
            ]
        }]

    }).catch(err => {
        res.status(500).json({ err })
    })

    if (registers.length > 0) {
        res.status(500).json({ msg: 'La oficina que intentas reservar ya está ocupada en ese horario' })
    } else {
        if (rentType === 'mes') {
            while (initDate.isSameOrBefore(finDate) && rentType === 'mes') {
              const date = initDate.format('DD-MM-YYYY')
              all.push(date)
              initDate.add(1, 'day');
            }
          }
          else if (rentType === 'hora') {
            const date = initDate.format('DD-MM-YYYY')
            all.push(date)
          }
        const startDate = req.body.rentType === 'mes' ? moment.tz(new Date(req.body.startDate), 'America/Mexico_City').format('YYYY-MM-DDT00:00:00Z') :
            moment.tz(new Date(req.body.startDate), 'America/Mexico_City').format('YYYY-MM-DDTHH:mm:00Z')
        const endDate = req.body.rentType === 'mes' ? moment.tz(new Date(req.body.endDate), 'America/Mexico_City').add(1, 'day').format('YYYY-MM-DDT00:00:00Z') :
            moment.tz(new Date(req.body.endDate), 'America/Mexico_City').format('YYYY-MM-DDTHH:mm:00Z')
        console.log('startDate', startDate)
        await Customer.findByIdAndUpdate(customerId, { isActive: true, rentType }, { new: true }).catch(err => console.log('err', err))
        req.body.startDate = startDate
        req.body.endDate = endDate
        req.body.datesReserved = [...all]
        console.log('req', req.body)
        Office.create({ ...req.body })
            .then(office => res.status(200).json({ office }))
            .catch(err => console.log('err', err))
    }

}

exports.getOffice = (req, res) => {
    const { officeId } = req.params
    Office.findById(officeId)
        .then(office => res.status(200).json({ office }))
        .catch(err => res.status(500).json({ err }))
}

exports.updateOffice = (req, res) => {
    const { officeId } = req.params
    Office.findByIdAndUpdate(officeId, { ...req.body }, { new: true })
        .then(office => res.status(200).json({ office }))
        .catch(err => res.status(500).json({ err }))
}

exports.deleteOffice = (req, res) => {
    const { officeId } = req.params
    Office.findByIdAndDelate(officeId)
        .then(office => res.status(200).json({ msg: "Office unreserver" }))
        .catch(err => res.status(500).json({ err }))
}