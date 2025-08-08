const Product = require("../models/Product");

const productController = {};

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;

    if (
      !sku ||
      !name ||
      !size ||
      !image ||
      !category ||
      !description ||
      !price ||
      !stock ||
      !status
    ) {
      return res
        .status(400)
        .json({ status: "failed", error: "Please enter all values" });
    }

    await Product.findOne({ sku: sku }).then((product) => {
      if (product) {
        return res
          .status(400)
          .json({ status: "failed", error: "SKU already exists" });
      }
    });

    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });

    await product.save();
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

productController.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = productController;
