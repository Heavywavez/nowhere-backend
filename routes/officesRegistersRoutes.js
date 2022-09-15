const { verifyToken } = require('../config/jwt');
const { updateOffice, getOffice, getOffices, deleteOffice, createRegisterOffice, getRegisterByDay } = require('../controllers/officesRegistersControllers');
const router = require('express').Router();

router.get('/', getOffices)
router.get('/:officeId', getOffice) 
router.post('/create', createRegisterOffice)
router.get('/day/:date', getRegisterByDay)
router.patch('/:officeId', updateOffice)
router.delete('/:officeId', deleteOffice)

module.exports = router
