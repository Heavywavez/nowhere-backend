const { getCoworks, getCowork, updateCowork, deleteCowork } = require('../controllers/coworksControllers');
const router = require('express').Router();

router.get('/', getCoworks)
router.get('./:coworkId', getCowork)
router.patch('./:coworkId', updateCowork)
router.delete('./:coworkId', deleteCowork)

module.exports = router
