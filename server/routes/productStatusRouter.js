const router = require('express').Router();
const productStatusController = require('../controllers/productStatusController');
// const authenticateRoute = require('../middleware/authenticateRoutes')


router.get('/', productStatusController.getAllProductStatus);
router.get('/:id', productStatusController.getOneProductStatus);
router.post('/add', productStatusController.addProductStatus);
router.put('/update/:id', productStatusController.updateProductStatus);
router.delete('/delete/:id', productStatusController.deleteProductStatus);



module.exports = router;