const Boardroom = require('../models/Boardroom')



exports.createBoardrooms = (req,res) => {
    Boardroom.create({...req.body})
    .then(boardroom => res.status(200).json({boardroom}))
    .catch(err => res.status(500).json({err}))
}

exports.getBoardrooms = async (req, res) => {
    Boardroom.find()
    .then(boardrooms => res.status(201).json({boardrooms}))
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
