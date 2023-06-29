const router = require('express').Router();
const controller = require('../controllers/fault_type.controller');

router.post('/create', controller.create);
router.get('/get', controller.get);
router.put('/update', controller.update);
router.delete('/delete', controller.delete);

module.exports = router
