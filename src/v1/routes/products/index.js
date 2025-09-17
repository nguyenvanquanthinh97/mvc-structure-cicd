const express = require('express');
const router = express.Router();

const upload = require('../../config/multer.config')

const { asyncHandler, requireAuth } = require('../../auth/checkAuth')
const productController = require('../../controllers/product.controller')

router.get('/:id', requireAuth, asyncHandler(productController.getProductById))
router.post('/', requireAuth, upload.single('image'), asyncHandler(productController.addProduct))
router.get('/', requireAuth, asyncHandler(productController.getProducts))

module.exports = router;
