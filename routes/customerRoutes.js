const { getCustomers, getCustomer, updateCustomer, deleteCustomer, createCustomers } = require('../controllers/customersControllers');
const router = require('express').Router();

router.get('/', getCustomers)
router.post('/create', createCustomers)
router.get('/:customerId', getCustomer)
router.patch('/:customerId', updateCustomer)
router.delete('/:customerId', deleteCustomer)


module.exports = router