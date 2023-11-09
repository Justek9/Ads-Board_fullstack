const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth.controller')
const authMiddlware = require('../utils/authMiddlware')

router.post('/register', auth.register)
router.post('/login', auth.login)
router.delete('/logout', authMiddlware, auth.logout)

module.exports = router
