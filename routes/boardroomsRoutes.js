const { getBoardrooms, getBoardroom, updateBoardroom, deleteBoardroom, createBoardroom, createBoardrooms } = require('../controllers/boardroomsControllers');
const router = require('express').Router();

router.get('/',getBoardrooms)
router.post('/:create',createBoardrooms)
router.get('/:boardroomId',getBoardroom)
router.patch('/:boardroomId',updateBoardroom)
router.delete('/:boardroomId',deleteBoardroom)

module.exports = router