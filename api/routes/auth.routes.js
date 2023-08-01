const router = require('express').Router();
const controller = require('../controllers/auth.controller');

router.post('/auth', controller.auth);

module.exports = router
