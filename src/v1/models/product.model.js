const mongoose = require('mongoose');

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
    name: {
      type:String,
      required:true,
      index:true,
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    image: {
      type: String,
      default: null
    },
    quantity: {
      type: Number,
      default: 0
    }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, productSchema);