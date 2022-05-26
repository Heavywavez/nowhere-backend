const Boardroom = require('../models/BoardroomRegister')


exports.getBoardrooms = (req, res) => {
    const {boardroomId} = req.params
    Boardroom.findById(boardroomId)
    .then(boardroom => res.status(201).json({boardroom}))
    .catch(err => res.status(500).json({err}))
}

exports.getBoardroom = (req,res) => {
    const {boardroomId} = req.params
    Boardroom.findById ({name: nameBoardroom})
    .then(boardroom => res.status(200).json({boardroomId}))
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
