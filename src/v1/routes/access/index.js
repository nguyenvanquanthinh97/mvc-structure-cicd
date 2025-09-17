const express = require('express');
const router = express.Router();

const { asyncHandler, requireAuth } = require('../../auth/checkAuth')
const accessController = require('../../controllers/access.controller')

router.get('/googleLogin', asyncHandler(accessController.googleLogin))
router.get('/googleLogin/callback', asyncHandler(accessController.googleLoginCallback))
router.post('/logout', requireAuth, asyncHandler(accessController.logout))

module.exports = router;
