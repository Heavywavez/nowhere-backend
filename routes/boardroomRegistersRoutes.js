const { getBoardrooms, getBoardroom, updateBoardroom, deleteBoardroom, createRegisterBoardroom, getRegisterByDay } = require('../controllers/boardroomsRegistersControllers');
const router = require('express').Router();
const { verifyToken } = require('../config/jwt');

router.get('/', getBoardrooms)
router.post('/create', createRegisterBoardroom)
router.get('/:boardroomId', getBoardroom)
router.get('/day/:date', getRegisterByDay)
router.patch('/:boardroomId', updateBoardroom)
router.delete('/:boardroomId', deleteBoardroom)

module.exports = router