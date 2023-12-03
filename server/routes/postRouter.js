const router = require('express').Router();
const postController = require('../controllers/postController');
// const authenticateRoute = require('../middleware/authenticateRoutes')


router.get('/:id', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.post('/add', postController.addPost);
router.put('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);


module.exports = router;