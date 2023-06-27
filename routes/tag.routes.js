const router = require('express').Router();
const controller = require('../controllers/tags.controllers')

router.post('/create', controller.createTag);
router.get('/get', controller.getTags);
router.put('/update', controller.updateTag);
router.delete('/delete', controller.deleteTag);

module.exports = router