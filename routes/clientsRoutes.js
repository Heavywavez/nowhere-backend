const { getClients, getClient, updateClient, deleteClient, createClients } = require('../controllers/clientsControllers');
const router = require('express').Router();

router.get('/', getClients)
router.post('/:id',createClients)
router.get('/:id', getClient)
router.patch('/:id', updateClient)
router.delete('/:id', deleteClient)

module.exports = router