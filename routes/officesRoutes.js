const { createOffice, getOffice, updateOffice, deleteOffice } = require('../controllers/officesControllers');
const router = require('express').Router();

router.post('/', createOffice)
router.get('/:office', getOffice)
router.patch('/:office', updateOffice)
router.delete('/:office', deleteOffice)


module.exports = router