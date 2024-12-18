import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountInPercent: {
    type: Number,
    default: 0,
  },
  recommended: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
