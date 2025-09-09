const express = require('express');

const { handleCreateShortUrl, handleGetUrls, handleGetAllUrls } = require('../controllers/shortUrl.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router()

router.post('/create', handleCreateShortUrl)
router.get('/recent-urls', handleGetUrls)

router.get('/all-urls', handleGetAllUrls)
module.exports = router
