const express = require('express');
const router = express.Router();
const multer = require('multer');
const reportController = require('../controller/reportController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-report', upload.single('report'), reportController.uploadReport);

module.exports = router;
