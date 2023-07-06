const router = require('express').Router();
const controller = require('../controllers/games.controllers');

router.post('/create', controller.create);
router.get('/get', controller.get);
router.put('/update', controller.update);
router.delete('/delete', controller.delete);

module.exports = router
