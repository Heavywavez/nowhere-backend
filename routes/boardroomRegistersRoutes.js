const { getBoardrooms, getBoardroom, updateBoardroom, deleteBoardroom, createRegisterBoardroom } = require('../controllers/boardroomsRegistersControllers');
const router = require('express').Router();
const { verifyToken } = require('../config/jwt');

router.get('/', getBoardrooms)
router.post('/create', verifyToken, createRegisterBoardroom)
router.get('/:boardroomId', getBoardroom)
router.patch('/:boardroomId', updateBoardroom)
router.delete('/:boardroomId', deleteBoardroom)

module.exports = router