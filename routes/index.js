const router = require('express').Router();
const tags = require('./tag.routes');
const faultTypes = require('./fault_type.routes');
const files = require('./files.routes');
const games = require('./game.routes');

router.use('/tags', tags);
router.use('/faultTypes', faultTypes);
router.use('/files', files);
router.use('/games', games);

module.exports = router;