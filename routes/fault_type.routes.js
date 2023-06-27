const router = require('express').Router();
const controller = require('../controllers/tags.controllers');

router.post('/create', controller.create);

module.exports = router
