const Product = require("../models/Product");
const PAGE_SIZE = 5;

const productController = {};

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      size,
      name,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;

    console.log(req.body);

    if (
      !sku ||
      !name ||
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
    const { page, name } = req.query;
    const cond = name ? { name: { $regex: name, $options: "i" } } : {};
    let query = Product.find(cond);
    let response = { status: "success" };

    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      // 데이터가 총 몇개있는지
      const totalItemNumber = await Product.countDocuments(cond);
      // 페이지가 총 몇개있는지
      const totalPageNum = Math.ceil(totalItemNumber / PAGE_SIZE);

      response.totalItemNum = totalItemNumber;
      response.totalPageNum = totalPageNum;
    }

    const productList = await query.exec();
    response.data = productList;

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const reqBody = req.body;

    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { ...reqBody },
      { new: true }
    );

    if (!product) {
      return res
        .status(400)
        .json({ status: "failed", error: "item does not exist" });
    }

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = productController;
