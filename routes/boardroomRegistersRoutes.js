const { getBoardrooms, getBoardroom, updateBoardroom, deleteBoardroom } = require('../controllers/boardroomsRegistersControllers');
const router = require('express').Router();

router.get('/', getBoardrooms)
router.get('/:boardroomId', getBoardroom)
router.patch('/:boardroomId', updateBoardroom)
router.delete('/:boardroomId', deleteBoardroom)

module.exports = router