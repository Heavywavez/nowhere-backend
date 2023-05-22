const Customer = require('../models/Customer')


exports.createCustomers = async (req, res) => {
    const existCustomer = await Customer.findOne({email: req.body.email})

    if (existCustomer) {
        res.status(500).json({msg: 'El correo ya se encuentra registrado'})
    } else{
        Customer.create({...req.body})
        .then(customer => res.status(200).json({customer}))
        .catch(err => res.status(500).json({err}))
    }
    
}

exports.getCustomers = (req, res) => {
    Customer.find()
    .then(data=> {
        const customers = data.map(e => {
            e.name = `${e.name} ${e.lastName ? e.lastName : ''} ${e.familyName ? e.familyName : ''}`
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
    Customer.findByIdAndUpdate(customerId, {...req.body}, {new: true})
    .then(customer => res.status(200).json({customer}))
    .catch(err => res.status(500).json({err}))
}

exports.deleteCustomer = (req, res) => {
    const {customerId} = req.params
    Customer.findByIdAndDelete(customerId)
    .then(customer => res.status(200).json({msg: "Customer deleted"}))
    .catch(err => res.status(500).json({err}))
}
