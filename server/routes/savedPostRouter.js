const router = require('express').Router();
const savedPostController = require('../controllers/savedPostController');


router.get('/', savedPostController.getAllSavedPosts);
router.post('/add', savedPostController.savePost);
router.delete('/delete/:id', savedPostController.deleteSavedPost);


module.exports = router;