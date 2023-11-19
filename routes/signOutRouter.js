const router = require('express').Router();
const signOutController = require('../controllers/signOutController')

router.get('/', signOutController);


module.exports = router;