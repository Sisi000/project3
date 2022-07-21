const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../db/models/productModel.js");
const { isAuth, isAdmin } = require("../utils.js");
const S3 = require("aws-sdk/clients/s3");

const productRouter = express.Router();

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: "sample name " + Date.now(),
      slug: "sample-name-" + Date.now(),
      image: "/images/no-image-found.png",
      imageS3Key: "key",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      lensWidth: 0,
      lensHeight: 0,
      bridge: 0,
      lensDiagonal: 0,
      templeLength: 0,
      eyeRatio: 0,
      earFaceRatio: 0,
      cheekChinRatio: 0,
      noseRatio: 0,
      frameColor: "color",
      prescriptionMin: 0,
      prescriptionMax: 0,
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const product = await newProduct.save();
    res.send({ message: "Product Created", product });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.imageS3Key = req.body.imageS3Key;
      product.images = req.body.images;
      product.additionalS3 = req.body.additionalS3;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.lensWidth = req.body.lensWidth;
      product.lensHeight = req.body.lensHeight;
      product.bridge = req.body.bridge;
      product.lensDiagonal = req.body.lensDiagonal;
      product.templeLength = req.body.templeLength;
      product.eyeRatio = req.body.eyeRatio;
      product.earFaceRatio = req.body.earFaceRatio;
      product.cheekChinRatio = req.body.cheekChinRatio;
      product.noseRatio = req.body.noseRatio;
      product.frameColor = req.body.frameColor;
      product.prescriptionMin = req.body.prescriptionMin;
      product.prescriptionMax = req.body.prescriptionMax;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: "Product Updated" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const S3ToDelete = product.imageS3Key;
    const additionalS3ToDelete = product.additionalS3;

    if (product) {
      const s3ImagesToDelete = [S3ToDelete, ...additionalS3ToDelete];
      const objects = [];
      for (const k in s3ImagesToDelete) {
        objects.push({ Key: s3ImagesToDelete[k] });
      }

      const options = {
        Bucket: process.env.AWS_BUCKET,
        Delete: {
          Objects: objects,
        },
      };

      s3.deleteObjects(options, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      });

      await product.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

const PAGE_SIZE = 10;

productRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.post(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const query = req.body;
    console.log("query is", query);
    const category = query.selectedCategories;
    console.log("category is", category);
    const frameColor = query.selectedFrameColors;
    console.log("frameColor is", frameColor);
    const price = query.selectedPrices;
    console.log("price is", price);
    const rating = query.selectedRatings;
    console.log("rating is", rating);

    let searchObj = {};
    if (category.length > 0) {
      searchObj.category = { $in: category };
    }
    if (frameColor.length > 0) {
      searchObj.frameColor = { $in: frameColor };
    }
    if (price.length > 0) {
      searchObj.price = {
        $gte: Number(price[0].split("-")[0]),
        $lte: Number(price[0].split("-")[1]),
      };
    }
    if (rating.length > 0) {
      searchObj.rating = {
        $gte: Number(rating[0])
      }
    }

    console.log("searchObj is", searchObj);
    const products = await Product.find(searchObj);
    // console.log("products are", products);

    let results = [];

    for (let array of products) {
      results.push(array);
    }

    // console.log("results are", results);
    res.send(results);
  })
);

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const frameColor = query.frameColor || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};

    const categoryFilter = category && category !== "all" ? { category } : {};
    const frameColorFilter =
      frameColor && frameColor !== "all" ? { frameColor } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...frameColorFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...frameColorFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRouter.get(
  "/framecolors",
  expressAsyncHandler(async (req, res) => {
    const frameColors = await Product.find().distinct("frameColor");
    res.send(frameColors);
  })
);

productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.post("/id", async (req, res) => {
  const idlist = req.body.params;
  console.log("idlist", idlist);

  const product = await Product.find({ _id: { $in: idlist } });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

module.exports = productRouter;
