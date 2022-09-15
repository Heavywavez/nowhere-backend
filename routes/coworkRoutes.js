const { getCoworks, getCowork, updateCowork, deleteCowork, createCoworks } = require('../controllers/coworkControllers');
const router = require('express').Router();

router.get('/', getCoworks)
router.post('/create', createCoworks)
router.get('/:coworkId', getCowork)
router.patch('/:coworkId', updateCowork)
router.delete('/:coworkId', deleteCowork)

module.exports = router
