const router = require('express').Router();
const controller = require('../controllers/games.controllers');

router.post('/create', controller.create);
router.get('/get', controller.get);

module.exports = router
