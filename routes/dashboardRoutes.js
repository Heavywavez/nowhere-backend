const { verifyToken } = require('../config/jwt');
const { getAll, deleteRegister } = require('../controllers/dashboardControllers');
const router = require('express').Router();

router.get('/:date', getAll)
router.delete('/:id/:type', deleteRegister)

module.exports = router
