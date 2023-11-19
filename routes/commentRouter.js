const router = require('express').Router();
const commentController = require('../controllers/commentController');
// const authenticateRoute = require('../middleware/authenticateRoutes')


router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getOneComment);
router.post('/add', commentController.addComment);
router.put('/update/:id', commentController.updateComment);
router.delete('/delete/:id', commentController.deleteComment);

module.exports = router;