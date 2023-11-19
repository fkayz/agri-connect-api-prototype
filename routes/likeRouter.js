const router = require('express').Router();
const likeController = require('../controllers/likeController');
// const authenticateRoute = require('../middleware/authenticateRoutes')


router.get('/', likeController.getAllLikes);
router.get('/:id', likeController.getOneLike);
router.post('/add', likeController.addLike);
router.put('/update/:id', likeController.updateLike);
router.delete('/delete/:id', likeController.deleteLike);

module.exports = router;