const User = require('../models/User')


exports.signUp = (req, res) => {
    User.register({...req.body}, req.body.password)
    .then(user => res.status(201).json({user}))
    .catch(err => res.status(500).json({err}))
}