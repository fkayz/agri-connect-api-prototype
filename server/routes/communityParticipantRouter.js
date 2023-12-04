const router = require('express').Router();
const communityParticipantController = require('../controllers/participantController');
// const authenticateRoute = require('../middleware/authenticateRoutes')


router.get('/all/:id', communityParticipantController.getAllCommunityParticipants);
router.get('/', communityParticipantController.getAllCommunityParticipantss);
router.get('/:id', communityParticipantController.getAllCommunityParticipant);
router.get('/:id', communityParticipantController.getOneCommunityParticipant);
router.post('/add', communityParticipantController.addCommunityParticipant);
router.put('/update/:id', communityParticipantController.updateCommunityParticipant);
router.delete('/delete/:id', communityParticipantController.deleteCommunityParticipant);


module.exports = router;