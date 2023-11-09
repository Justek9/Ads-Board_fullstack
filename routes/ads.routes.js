const express = require('express')
const router = express.Router()

const ads = require('../controllers/ads.controller')

router.get('/ads', ads.getAll)
router.get('/ads/:id', ads.getById)
router.get('/ads//search/:searchPhrase', ads.getBySearchPhrase)
router.post('/ads', ads.add)
router.delete('/ads/:id', ads.delete)
router.put('/ads/:id', ads.edit)

module.exports = router
