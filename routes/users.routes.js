const express = require('express')
const router = express.Router()
const authMiddlware = require('../utils/authMiddlware')

const users = require('../controllers/users.controller')

router.get('/user', authMiddlware, users.getLoggedUser)

module.exports = router
