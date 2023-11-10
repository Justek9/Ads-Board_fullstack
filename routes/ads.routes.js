const express = require('express')
const router = express.Router()

const ads = require('../controllers/ads.controller')
const authMiddlware = require('../utils/authMiddlware')
const imageUpload = require('../utils/imageUploads')

router.get('/ads', ads.getAll)
router.get('/ads/:id', ads.getById)
router.get('/ads/search/:searchPhrase', ads.getBySearchPhrase)
router.post('/ads', authMiddlware, imageUpload.single('avatar'), ads.add)
router.delete('/ads/:id', authMiddlware, ads.delete)
router.put('/ads/:id', authMiddlware, imageUpload.single('avatar'), ads.edit)

module.exports = router
