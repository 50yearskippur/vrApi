const router = require('express').Router();
const tags = require('./tag.routes');
const faultTypes = require('./fault_type.routes');
const files = require('./files.routes');
const games = require('./game.routes');
const faults = require('./fault.routes');
const gameTags = require('./game_tag.routes');
const auth = require('./auth.routes');

router.use('/tags', tags);
router.use('/faultTypes', faultTypes);
router.use('/files', files);
router.use('/games', games);
router.use('/faults', faults);
router.use('/gameTags', gameTags)
router.use('/auth', auth)

module.exports = router;