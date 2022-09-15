const Customer = require('../models/Customer')


exports.createCustomers = (req, res) => {
    //TODO investigar como validar que no exista un registro previo
    
    Customer.create({...req.body})
    .then(customer => res.status(200).json({customer}))
    .catch(err => res.status(500).json({err}))
}

exports.getCustomers = (req, res) => {
    Customer.find()
    .then(data=> {
        const customers = data.map(e => {
            e.name = `${e.name} ${e.lastName} ${e.familyName}`
            return e
        })
        res.status(201).json({customers})
    })
    .catch(err => res.status(500).json({err}))
}

exports.getCustomer = (req, res) => {
    const {customerId} = req.params
    Customer.findById (customerId)
    .then(customer => res.status(200).json({customer}))
    .catch(err => res.status(500).json({err}))
}

exports.updateCustomer = (req, res) => {
    const {customerId} = req.params
    customer.findByIdAndUpdate(customerId, {...req.body}, {new: true})
    .then(customer => res.status(200).json({customer}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteCustomer = (req, res) => {
    const {customerId} = req.params
    console.log('customer', customerId)
    Customer.findByIdAndDelete(customerId)
    .then(customer => res.status(200).json({msg: "Customer deleted"}))
    .catch(err => res.status(500).json({err}))
}
