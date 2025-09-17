const ProductService = require("../services/product.service");

class ProductController {
  addProduct = async (req, res, next) => {
    console.log("body received:", req.body); // Debug log
    // Extract form data
    const { name, price, quantity } = req.body;
    const imageFile = req.file;

    const newProduct = await ProductService.addProduct({
      name,
      price,
      quantity,
      image: imageFile,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  };

  // Additional method to get all products
  getProducts = async (req, res, next) => {
    const products = await ProductService.getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  };

  // Get single product by ID
  getProductById = async (req, res, next) => {
    console.log('id', req.params.id)
    const { id } = req.params;
    const product = await ProductService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  };
}

module.exports = new ProductController();
