const { signUp } = require('../controllers/authControllers');
const router = require('express').Router();


router.post('/register', signUp)

module.exports = router