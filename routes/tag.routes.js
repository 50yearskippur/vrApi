const router = require('express').Router();
const controller = require('../controllers/tags.controllers')

router.post('/createTag', controller.createTag);
router.get('/getTags', controller.getTags);

module.exports = router