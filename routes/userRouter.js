const router = require('express').Router();
const userController = require('../controllers/userController');
// const authenticateRoute = require('../middleware/authenticateRoutes')



router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.get('/cooperatives/all', userController.getAgriCooperatives);
router.get('/farmers/all', userController.getFarmers);
router.post('/add', userController.addUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser)


module.exports = router;