const express = require('express')
const router = express.Router()

const ads = require('../controllers/ads.controller')

router.get('/ads', ads.getAll)
router.get('/ads', ads.getById)
router.get('/ads', ads.getBySearchPhrase)
router.post('/ads', ads.add)
router.delete('/ads', ads.delete)
router.put('/ads', ads.edit)

module.exports = router
