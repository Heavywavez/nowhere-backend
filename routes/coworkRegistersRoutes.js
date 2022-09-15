const { verifyToken } = require('../config/jwt');
const { updateCowork, getCowork, getCoworks, deleteCowork, createRegisterCowork, getRegisterByDay } = require('../controllers/coworkRegistersControllers');
const router = require('express').Router();

router.get('/', getCoworks)
router.get('/:coworkId', getCowork) 
router.post('/create', createRegisterCowork)
router.get('/day/:date', getRegisterByDay)
router.patch('/:coworkId/:date', updateCowork)
router.delete('/:coworkId', deleteCowork)

module.exports = router
