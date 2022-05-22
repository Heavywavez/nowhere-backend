const { getClients, getClient, updateClient, deleteClient } = require('../controllers/clientsControllers');
const router = require('express').Router();

router.get('/', getClients)
router.get('./:id', getClient)
router.patch('./id', updateClient)
router.delete('./id', deleteClient)

module.exports = router