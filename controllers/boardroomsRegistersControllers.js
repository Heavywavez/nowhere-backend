const Boardroom = require('../models/BoardroomRegister')
const moment = require('moment-timezone')


exports.createRegisterBoardroom = async (req, res) => {
    const { boardroomId  } = req.body
    const boardroom1 = `${process.env.BOARDROOM1}`
    const boardroom2 = `${process.env.BOARDROOM2}`
    const boardroom20 = `${process.env.BOARDROOM20}`


    const searchStart =  moment(new Date(req.body.startDate)).format('YYYY-MM-DDTHH:mm:00Z')
    const searchEnd =  moment(new Date(req.body.endDate)).format('YYYY-MM-DDTHH:mm:00Z')
    const registerBoardroom1 = await Boardroom.find({
        $and: [{
            $and: [{ boardroomId: { $eq: boardroom1 } }]
        }, {
            $or: [
                {$or: [{ startDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]},
                {$or: [{ endDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]}
            ]
        }]

    })

    const registerBoardroom2 = await Boardroom.find({
        $and: [{
            $and: [{ boardroomId: { $eq: boardroom2 } }]
        }, {
            $or: [
                {$or: [{ startDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]},
                {$or: [{ endDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]}
            ]
        }]

    })

    const registerBoardroom20 = await Boardroom.find({
        $and: [{
            $and: [{ boardroomId: { $eq: boardroom20 } }]
        }, {
            $or: [
                {$or: [{ startDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]},
                {$or: [{ endDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]}
            ]
        }]

    })

    if ((registerBoardroom1.length > 0 || registerBoardroom20.length > 0 ) && boardroomId === boardroom1 ) {
        res.status(500).json({ msg: 'La sala de juntas que intentas reservar ya está ocupada en ese horario' })
    } else if ((registerBoardroom2.length > 0 || registerBoardroom20.length > 0 ) && boardroomId === boardroom2){
        res.status(500).json({ msg: 'La sala de juntas que intentas reservar ya está ocupada en ese horario' })
    } else if ((registerBoardroom20.length > 0 || registerBoardroom2.length > 0 || registerBoardroom1.length > 0 ) && boardroomId === boardroom20){
        res.status(500).json({ msg: 'La sala de juntas que intentas reservar ya está ocupada en ese horario' })
    } else {
        const startDate = moment.tz(new Date(req.body.startDate), 'America/Mexico_City').format('YYYY-MM-DDTHH:mm:00Z')
        const endDate = moment.tz(new Date(req.body.endDate), 'America/Mexico_City').format('YYYY-MM-DDTHH:mm:00Z')
        req.body.startDate = startDate
        req.body.endDate = endDate
        Boardroom.create({ ...req.body })
            .then(boardroom => res.status(200).json({ boardroom }))
            .catch(err => {
                res.status(500).json({ err })
            })
    }

}

exports.getBoardrooms = async (req, res) => {
    const registers = await Boardroom.find().populate('boardroomId').populate('customerId')
    const response = registers.map(register => {
        const searchStart =  moment(new Date(register.startDate)).subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ssZ')
        const searchEnd = moment(new Date(register.endDate)).subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ssZ')
        register.startDate = searchStart
        register.endDate = searchEnd
        return register
    })
    res.status(200).json({ registers: response})
}

exports.getRegisterByDay = async (req, res) => {
    const searchStart =  moment(new Date(req.params.date)).add(5, 'hours').format('YYYY-MM-DDT00:00:00Z')
    const searchEnd =  moment(new Date(req.params.date)).add(5, 'hours').format('YYYY-MM-DDT23:59:59Z')

    Boardroom.find({
        $and: [{
            $or: [
                {$or: [{ startDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]},
                {$or: [{ endDate: { $gt: new Date(searchStart), $lt: new Date(searchEnd) } }]}
            ]
        }]
    }).populate('boardroomId').populate('customerId').sort('startDate')
    .then(boardrooms => res.status(200).json({ boardrooms }))
    .catch(err => console.log(err))
}

exports.getBoardroom = (req,res) => {
    const {boardroomId} = req.params
    Boardroom.findById (boardroomId)
    .then(boardroom => res.status(200).json({boardroom}))
    .catch(err => res.status(500).json({err}))
}

exports.updateBoardroom = (req,res) => {
    const {boardroomId} = req.params
    const {nameBoardroom} = red.body
    Boardroom.findByIdAndUpdate(boardroomId, {nameBoardroom}, {new: true})
    .then(boardroom => res.status(200).json({boardroom}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteBoardroom = (req,res) => {
    const {boardroomId} = req.params
    Boardroom.findByIdAndDelete(boardroomId)
    .then(boardroom => res.status(200).json({msg: "Unreserved Boardroom"}))
    .catch(err => res.status(500).json({err}))
}
