const router = require('express').Router();
const communityController = require('../controllers/communityController');
// const authenticateRoute = require('../middleware/authenticateRoutes')


router.get('/', communityController.getAllCommunities);
router.get('/:id', communityController.getOneCommunity);
router.post('/add', communityController.addCommunity);
router.put('/update/:id', communityController.updateCommunity);
router.delete('/delete/:id', communityController.deleteCommunity);


module.exports = router;