const router = require('express').Router();
const tags = require('./tag.routes');
const faultTypes = require('./fault_type.routes');

router.use('/tags', tags);
router.use('/faultTypes', faultTypes);

module.exports = router;