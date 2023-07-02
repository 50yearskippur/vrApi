const router = require('express').Router();
const controller = require('../controllers/files.controllers');
const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage for files
const upload = multer({ storage }); // Create multer instance

router.post('/create', upload.single('file'), controller.create);
router.get('/get', controller.get);
router.put('/update', upload.single('file'), controller.update);
router.delete('/delete', controller.delete);

module.exports = router