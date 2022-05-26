const { getCoworks, getCowork, updateCowork, deleteCowork, createCoworks } = require('../controllers/coworksControllers');
const router = require('express').Router();

router.get('/', getCoworks)
router.post('/:coworkId', createCoworks)
router.get('/:coworkId', getCowork)
router.patch('/:coworkId', updateCowork)
router.delete('/:coworkId', deleteCowork)

module.exports = router
