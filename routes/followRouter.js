const followController = require('../controllers/followController')
const router = require('express').Router()


router.get('/', followController.getAllFollows)
router.get('/:id', followController.getOneFollow)
router.post('/add', followController.addFollow)
router.put('/update/:id', followController.updateFollow)
router.delete('/delete/:id', followController.deleteFollow)

module.exports = router