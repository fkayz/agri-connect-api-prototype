const router = require('express').Router();
const signInController = require('../controllers/signinController.js');


router.post('/', signInController);

module.exports = router;