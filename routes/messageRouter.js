const router = require('express').Router();
const messageController = require('../controllers/messageController');
// const authenticateRoute = require('../middleware/authenticateRoutes')


router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getOneMessage);
router.post('/add', messageController.addMessage);
router.put('/update/:id', messageController.updateMessage);
router.delete('/delete/:id', messageController.deleteMessage);


module.exports = router;