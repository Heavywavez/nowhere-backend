const { updateOffice, getOffice, getOffices, deleteOffice } = require('../controllers/officesRegistersControllers');
const router = require('express').Router();

router.get('/', getOffices)
router.get('/:officeId', getOffice) 
router.patch('/:officeId', updateOffice)
router.delete('/:officeId', deleteOffice)

module.exports = router
