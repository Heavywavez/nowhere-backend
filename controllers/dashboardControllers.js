const Office = require('../models/OfficeRegister')
const Cowork = require('../models/CoworkRegister')
const Boardroom = require('../models/BoardroomRegister')
const moment = require('moment-timezone')
const { compareValues } = require('../utils')

exports.getAll = async (req, res) => {
    const {date} = req.params
    const searchStart =  moment(new Date(req.params.date)).add(5, 'hours').format('YYYY-MM-DDT00:00:00Z')
    const searchEnd =  moment(new Date(req.params.date)).add(5, 'hours').format('YYYY-MM-DDT23:59:59Z')    
    const dateReverse = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1')
    let response = []
    const offices = await Office.find({datesReserved: {$eq: dateReverse}}).populate('officeId').populate('customerId').catch(err => res.status(500).json({err}))
    const boardrooms = await Boardroom.find({
        $and: [{
            $or: [
                {$or: [{ startDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]},
                {$or: [{ endDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]}
            ]
        }]
    }).populate('boardroomId').populate('customerId').catch(err => res.status(500).json({err}))
    const cowork = await Cowork.find({
        $and: [{
            $or: [
                {$or: [{ startDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]},
                {$or: [{ endDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]}
            ]
        }]
    }).populate('coworkId').populate('customerId').catch(err => res.status(500).json({err}))
    const officesFormated = offices.map( e => {
        const newOffice = e.officeId.nameOffice
        const result = {
            nameArea: newOffice,
            e
        }
        return result
    })

    const boardroomsFormated = boardrooms.map(e => {
        const newBoardroom = e.boardroomId.nameBoardroom
        const result = {
            nameArea: newBoardroom,
            e
        }
        return result
    })
    const coworkFormated = cowork.map(e => {
        const newCowork = e.coworkId.nameRoom
        const hour = e.startDate
        const result = {
            nameArea: newCowork,
            hour,
            e
        }
        return result
    })
    response.push(...officesFormated, ...boardroomsFormated, ...coworkFormated)
    const responses = response.sort(compareValues('hour'))
    res.status(200).json({responses})
}

exports.deleteRegister = (req, res) => {
    const {id,type} = req.params

    if (type === "Cowork") {
        Cowork.findByIdAndDelete(id)
        .then(cowork => res.status(200).json({msg: "Cowork reservation deleted"}))
        .catch(err => res.status(500).json({err}))
    } else if (type === "Oficinas") {
        Office.findByIdAndDelete(id)
        .then(office => res.status(200).json({msg: "Office reservation deleted"}))
        .catch(err => res.status(500).json({err}))
    } else if (type === "Sala de Juntas") {
        Boardroom.findByIdAndDelete(id)
        .then(boardroom => res.status(200).json({msg: "Boardroom reservation deleted"}))
        .catch(err => res.status(500).json({err}))
    }
    
}