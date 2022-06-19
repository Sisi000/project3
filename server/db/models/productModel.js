const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true},
    imageS3Key: { type: String, required: true},
    images: [String],
    additionalS3: [String],
    brand: { type: String, required: true },
    category: { type: String, required: true },
    lensWidth: { type: Number, required: true },
    lensHeight: { type: Number, required: true },
    bridge: { type: Number, required: true },
    lensDiagonal: { type: Number, required: true },
    templeLength: { type: Number, required: true },
    eyeRatio: { type: Number, required: true },
    earFace: { type: Number, required: true },
    cheekChin: { type: Number, required: true },
    nose: { type: Number, required: true },
    frameColor: { type: String, required: true },
    prescriptionMin: { type: Number, required: true },
    prescriptionMax: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
