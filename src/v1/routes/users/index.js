const express = require('express');
const router = express.Router();

const { asyncHandler, requireAuth } = require('../../auth/checkAuth')
const userController = require('../../controllers/user.controller')

router.get('/me', requireAuth, asyncHandler(userController.getMyInfo))

module.exports = router;
