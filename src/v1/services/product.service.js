const ProductModel = require('../models/product.model');
const {uploadImageFromLocalToS3} = require('./upload.service');

class ProductService {
  static addProduct = async ({ name, price, image, quantity }) => {
    const imageUrl = await uploadImageFromLocalToS3({ file: image });
    const newProduct = await ProductModel.create({ name, price, image: imageUrl, quantity });
    return newProduct;
  }

  static getAllProducts = async () => {
    return await ProductModel.find({}).lean();
  }

  static getProductById = async (id) => {
    return ProductModel.findById(id).lean();
  }
}

module.exports = ProductService;
