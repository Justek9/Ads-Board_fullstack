const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth.controller')
const authMiddleware = require('../utils/authMiddlware')
const imageUpload = require('../utils/imageUploads')

router.post('/register', imageUpload.single('avatar'), auth.register)
router.post('/login', auth.login)
router.delete('/logout', authMiddleware, auth.logout)

module.exports = router
