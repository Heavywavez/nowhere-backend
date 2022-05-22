const { getOffices, getOffice, updateOffice, deleteOffice } = require('../controllers/officesControllers');
const router = require('express').Router();

router.get('/', getOffices)
router.get('./:officeId', getOffice)
router.patch('./:officeId', updateOffice)
router.delete('./:officeId', deleteOffice)


module.exports = router